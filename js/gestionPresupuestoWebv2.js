import * as gestionPresupuesto from './gestionPresupuesto.js';
//contenedor padre de los gastos
let listadoGastos = document.getElementById("listado-gastos-completo");
//elemento personalisado 'mi-gasto'
class MiGasto extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        //creando un nodo de shadowDOM
        const shadow = this.attachShadow({ mode: 'open'});
        //añadiendo estilos:
        let enlace = document.createElement("link");
        enlace.setAttribute('rel', 'stylesheet');
        enlace.setAttribute('href', './css/estilosShadow.css');
        shadow.append(enlace);
        //creando la estructura para mostrar el gasto:
        //div.gasto
        const divGasto = document.createElement("div");
        divGasto.classList.add("gasto");
        divGasto.classList.add("width100");
        let gastoCorriente = this.gasto;
        //Creamos el contenedor <div class="gasto-descripcion">
        let divDescripcion = document.createElement("div");
        divDescripcion.className = "gasto-descripcion";
        divDescripcion.textContent = "Descripcion del gasto: " + gastoCorriente.descripcion;
        divGasto.append(divDescripcion);
        //Creamos el contenedor <div class="gasto-fecha">
        let divFecha = document.createElement("div");
        divFecha.className = "gasto-fecha";
        //* convirtiendo la fecha al formato yyyy-mm-dd:
        let fechaFormatoDate = new Date(gastoCorriente.fecha);
        let fechaFormatoAdecuado = fechaFormatoDate.toISOString().slice(0, 10);
        divFecha.textContent = "Fecha: " +fechaFormatoAdecuado;
        divGasto.append(divFecha);
        //Creamos el contenedor <div class="gasto-valor">
        let divValor = document.createElement("div");
        divValor.className = "gasto-valor";
        divValor.textContent = "Valor: " + gastoCorriente.valor + "€";
        divGasto.append(divValor);
        //Creamos el contenedor <div class="gasto-etiquetas">
        let divEtiquetas = document.createElement("div");
        divEtiquetas.className = "gasto-etiquetas";
        divEtiquetas.textContent = "Etiquetas:";
        divGasto.append(divEtiquetas);
        let ulEtiquetas = document.createElement("ul");
        ulEtiquetas.className = "lista-etiquetas";
        divEtiquetas.append(ulEtiquetas);
        for (let e of gastoCorriente.etiquetas) { //*Creamos un contenedor para cada etiqueta
            let liEtiqueta = document.createElement("li");
            liEtiqueta.className = "gasto-etiquetas-etiqueta";
            liEtiqueta.textContent = e;
            ulEtiquetas.append(liEtiqueta);
            liEtiqueta.addEventListener("click", function() {
                let etiquetaBorrar = this.textContent; // this = liEtiqueta
                let respuestaUsuario = confirm("Confirme la borración de la etiqueta, por favor.");
                if (respuestaUsuario) {
                    gastoCorriente.borrarEtiquetas(etiquetaBorrar);
                }
                repintar();
            })
        }
        //añadir botones
        let divBotones = document.createElement("div");
        divBotones.className = "gasto-botones";
        divGasto.append(divBotones);
        let botonEditarGasto = document.createElement("button");
        botonEditarGasto.textContent = "Editar";
        botonEditarGasto.className = "gasto-editar-formulario";
        divBotones.append(botonEditarGasto);
        let botonBorrarGasto = document.createElement("button");
        botonBorrarGasto.textContent = "Borrar";
        botonBorrarGasto.className = "gasto-borrar";
        divBotones.append(botonBorrarGasto);
        shadow.append(divGasto);
        //creando una copia del formulario
        let plantilla = document.getElementById("formulario-template");
        let contenidoPlantilla = plantilla.content;
        //añadiendo la copia del formulario al 'mi-gasto'
        shadow.append(contenidoPlantilla.cloneNode(true));
        //la variable del formulario dentro del shadowroot:
        let formularioEditarGasto = this.shadowRoot.querySelector("form");
        //ocultar formulario
        formularioEditarGasto.classList.toggle("width0");
        formularioEditarGasto.classList.toggle("oculto");
        //rellenar formulario:
        formularioEditarGasto.elements.descripcion.value = gastoCorriente.descripcion;
        formularioEditarGasto.elements.valor.value = parseFloat(gastoCorriente.valor);
        let fechaGasto = new Date(gastoCorriente.fecha)
        formularioEditarGasto.elements.fecha.value = fechaGasto.toISOString().slice(0, 10);
        formularioEditarGasto.elements.etiquetas.value = gastoCorriente.etiquetas.join(', ');
        //añadir eventListeners a los botones:
        botonEditarGasto.addEventListener("click", function() {
                divGasto.classList.add("width40");
                divGasto.classList.remove("width100");
                formularioEditarGasto.classList.toggle("oculto");
                formularioEditarGasto.classList.remove("width0");
                formularioEditarGasto.classList.add("width60");
                // bloqueamos los botones "Editar gasto"
                bloquearBotonesGasto();            
        })        
        botonBorrarGasto.addEventListener("click", function() {
            let respuestaUsuario = confirm("Al pulsar 'Acceptar' se borrará el gasto actual\n¿Usted está seguro?");  
            if(respuestaUsuario) {
                gestionPresupuesto.borrarGasto(gastoCorriente.id);
                repintar();
                alert('El gasto ha sido eliminado con éxito.')
            }
        })
        function visualizarEditarCancelar() {
            divGasto.classList.add("width100");
            divGasto.classList.remove("width40");
            formularioEditarGasto.classList.toggle("oculto");
            formularioEditarGasto.classList.add("width0");
            formularioEditarGasto.classList.remove("width60");
            bloquearBotonesGasto();
        }
        formularioEditarGasto.addEventListener("submit", function(event) {
            event.preventDefault();
            gastoCorriente.actualizarDescripcion(formularioEditarGasto.descripcion.value);
            gastoCorriente.actualizarValor(parseFloat(formularioEditarGasto.valor.value));
            gastoCorriente.actualizarFecha(formularioEditarGasto.fecha.value);
            let etiquetasActualizar = formularioEditarGasto.etiquetas.value.split(', ');
            let etiquetasCorrientes = gastoCorriente.etiquetas;
            gastoCorriente.borrarEtiquetas(...etiquetasCorrientes);
            gastoCorriente.anyadirEtiquetas(...etiquetasActualizar);
            //visualización
            visualizarEditarCancelar();
            repintar();
            window.alert('El gasto corriente ha sido actualizado con éxito.');
        })
        let botonCancelar = this.shadowRoot.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", () => visualizarEditarCancelar());       
    }
}
customElements.define('mi-gasto', MiGasto);
function bloquearBotonesGasto() {
    //definir elemento padre del ShadowDOM
    let miGastoLista = document.querySelectorAll("mi-gasto");
    for (let i = 0; i < miGastoLista.length; i++) {
        //abrir acceso al ShadowDOM
        let shadowR = miGastoLista[i].shadowRoot;
        let botonesEditarConFormulario = shadowR.querySelectorAll("button.gasto-editar-formulario");
        for (let i = 0; i < botonesEditarConFormulario.length; i++) {
            if (!botonesEditarConFormulario[i].disabled) {
                botonesEditarConFormulario[i].disabled = true;
            } else {
                botonesEditarConFormulario[i].disabled = false;
            }
        }
        let botonesBorrar = shadowR.querySelectorAll("button.gasto-borrar");
        for (let i = 0; i < botonesBorrar.length; i++) {
            if (!botonesBorrar[i].disabled) {
                botonesBorrar[i].disabled = true;
            } else {
                botonesBorrar[i].disabled = false;
            }
        }
    }
    //bloquear/desbloquear los botones del formulario también
    if (!botonAnyadirGastoForm.disabled){
        botonAnyadirGastoForm.disabled = true;
    } else {           
        botonAnyadirGastoForm.disabled = false;
    }
    if (!botonActualizarPresupuesto.disabled) {
        botonActualizarPresupuesto.disabled = true; 
                         
    } else {
        botonActualizarPresupuesto.disabled = false;   
    }
}
let controlesPrincipales = document.getElementById("controlesprincipales");
function mostrarDatoEnId(valor, contenedor, idElemento) {
    let elemento = document.getElementById(idElemento);
    while(elemento.lastChild) {
        elemento.removeChild(elemento.lastChild);
    }
    let contenedorNuevo = document.createElement(contenedor);
    contenedorNuevo.textContent = valor;
    elemento.append(contenedorNuevo);    
}
function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    //Creamos el contenedor <div class="gasto">
    let contenedor_gasto = document.createElement("div");
    contenedor_gasto.className = "gasto";
    elemento.append(contenedor_gasto); //Insertamos este div al contenedor principal
    //Creamos el contenedor <div class="gasto-descripcion">
    let descripcion = document.createElement("div");
    descripcion.className = "gasto-descripcion";
    descripcion.textContent = gasto.descripcion;
    contenedor_gasto.append(descripcion);
    //Creamos el contenedor <div class="gasto-fecha">
    let fecha = document.createElement("div");
    fecha.className = "gasto-fecha";
    //* convirtiendo la fecha al formato yyyy-mm-dd:
    let fechaFormatoDate = new Date(gasto.fecha);
    let fechaFormatoAdecuado = fechaFormatoDate.toISOString().slice(0, 10);
    fecha.textContent = fechaFormatoAdecuado;
    contenedor_gasto.append(fecha);
    //Creamos el contenedor <div class="gasto-valor">
    let valor = document.createElement("div");
    valor.className = "gasto-valor";
    valor.textContent = gasto.valor;
    contenedor_gasto.append(valor);
    //Creamos el contenedor <div class="gasto-etiquetas">
    let etiquetas = document.createElement("div");
    etiquetas.className = "gasto-etiquetas";
    contenedor_gasto.append(etiquetas);
    for (let e of gasto.etiquetas) { //*Creamos un contenedor para cada etiqueta
        let etiqueta = document.createElement("span");
        etiqueta.className = "gasto-etiquetas-etiqueta";
        etiqueta.textContent = e;
        etiquetas.append(etiqueta);
    }
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento);
    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
    elemento.append(divAgrupacion);

    let header = document.createElement("h1");
    let nombrePeriodo = ""; //! nombre del periodo en español (anyo -> año, dia -> día)
    switch (periodo) {
        case "anyo":
            nombrePeriodo = "año";
            break;
        case "dia":
            nombrePeriodo = "día";
            break;
        default:
            nombrePeriodo = "mes";
            break;
    }
    header.textContent = "Gastos agrupados por " + nombrePeriodo;
    divAgrupacion.append(header);

    let arrayAgrup = Object.entries(agrup); //! Convertiendo el objeto agrup al array iterable
    // ^ agrup = {
    // ^ "2021-09": 5, => arrayAgrup = [["2021-09", 5], ["2021-10", 39]]
    // ^ "2021-10": 39
    // ^ }

    for (let [clave, valor] of arrayAgrup) {
        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";
        divAgrupacion.append(divDato);

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave;
        divDato.append(spanClave);

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = valor;
        divDato.append(spanValor);
    }
}
function repintar () {
    //* Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), "h1", "presupuesto");
    //* Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId(gestionPresupuesto.mostrargastosTotales(), "h2", "gastos-totales");
    //* Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId(gestionPresupuesto.mostrarBalance(), "h2", "balance-total");
    //* Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente
    //* no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    
    listadoGastos.innerHTML = "";
    while (listadoGastos.firstChild) {
        listadoGastos.removeChild(listadoGastos.firstChild);
    }
    //* Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    let gastos = gestionPresupuesto.listarGastos();
    for (let gasto of gastos) {
        let gastoCorriente = document.createElement('mi-gasto');
        gastoCorriente.gasto = gasto;
        listadoGastos.append(gastoCorriente);
    }
}
function actualizarPresupuestoWeb () {
    //* Pedir al usuario que introduzca un presupuesto mediante un prompt.
    let presupuestoString = prompt("Introduzca el presupuesto, por favor:");
    //* Convertir el valor a número (recuerda que prompt siempre devuelve un string).
    let presupuestoFloat = parseFloat(presupuestoString);
    //* Actualicar el presupuesto (función actualizarPresupuesto)
    gestionPresupuesto.actualizarPresupuesto(presupuestoFloat);
    //* Llamar a la función repintar para que se muestre la información actualizada en el archivo HTML.
    //* Recuerda que actualizar el presupuesto provoca cambios en el balance, por lo que al ejecutar
    //* repintar se actualizarán ambos campos.
    repintar();
}
//^ manejadores de eventos globales:
var formulario;
let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
let botonAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoForm.addEventListener("click", nuevoGastoWebFormulario);
function nuevoGastoWebFormulario () {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    formulario = plantillaFormulario.querySelector("form"); 
    controlesPrincipales.appendChild(formulario);
    //crear botones "Enviar" y "Cancelar"
    let botonCancelar = document.getElementsByClassName("cancelar")[0];
    //bloquear el botón "Añadir gasto formulario"
    formulario.addEventListener("submit", botonEnviarClick) //! corregido
    bloquearBotonesGasto();
    botonCancelar.addEventListener("click", function() {
        formulario.remove();
        bloquearBotonesGasto();
        repintar();
    })
}
function botonEnviarClick(event) {
    event.preventDefault();
    bloquearBotonesGasto();
    let descripcionGasto = formulario.querySelector("#descripcion");
    let valorGasto = formulario.querySelector("#valor"); 
    let fechaGasto = formulario.querySelector("#fecha");
    let etiquetasGasto = formulario.querySelector("#etiquetas");
    let etiquetasGastoArray = etiquetasGasto.value.split(', ');
    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcionGasto.value, parseFloat(valorGasto.value), fechaGasto.value, ...etiquetasGastoArray)
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    formulario.remove();
    repintar();
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}