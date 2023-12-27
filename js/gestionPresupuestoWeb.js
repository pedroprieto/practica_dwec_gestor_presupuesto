import * as gestionPresupuesto from './gestionPresupuesto.js';

//let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
var formulario/* = plantillaFormulario.querySelector("form")*/; 
let controlesPrincipales = document.getElementById("controlesprincipales");

function mostrarDatoEnId(valor, idElemento) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
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
    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), "presupuesto");
    //* Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), "gastos-totales");
    //* Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId(gestionPresupuesto.calcularBalance(), "balance-total");
    //* Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente
    //* no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    let listadoGastos = document.getElementById("listado-gastos-completo");
    listadoGastos.innerHTML = "";
    while (listadoGastos.firstChild) {
        listadoGastos.removeChild(listadoGastos.firstChild);
    }
    //* Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    let gastos = gestionPresupuesto.listarGastos();
    for (let gasto of gastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
        let divGastos = document.getElementById("listado-gastos-completo").lastChild;
        let botonEditar = anyadirBotonEditar(gasto);
        let botonEditarForm = anyadirBotonEditarFormulario(gasto);
        let botonBorrar = anyadirBotonBorrar(gasto);
        anyadirBorrarEtiquetaHandle(divGastos, gasto); //añadomos eventHandlers a cada etiqueta del gasto
        divGastos.append(botonEditar, botonEditarForm, botonBorrar); //añadimos los botones
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
function nuevoGastoWeb () {
    /*Pedir al usuario la información necesaria para crear un nuevo gasto mediante sucesivas
    preguntas con prompt (por orden: descripción, valor, fecha y etiquetas).
    Por simplicidad, de momento no se comprobará la validez de dichos datos.
    La fecha vendrá dada en formato internacional (yyyy-mm-dd) y las etiquetas
    se introducirán en un único cuadro de texto como una lista separada por comas
    (por ejemplo, etiqueta1,etiqueta2,etiqueta3). */
    let descripcionGasto = prompt("Introduzca la descripción del gasto nuevo:");
    let valorGastoString = prompt("Introduzca el valor del gasto nuevo:");
    let fechaGasto = prompt("Introduzca la fecha del gasto nuevo en formato internacional (yyyy-mm-dd):");
    let etiquetasGasto = prompt("Introduzca las etiquetas del gasto nuevo, separadas con comas:");
    // *Convertir el valor a número (recuerda que prompt siempre devuelve un string).
    let valorGastoFloat = parseFloat(valorGastoString);
    //* Convertir la cadena de texto de etiquetas devuelta por prompt a un array.
    let etiquetasGastoArray = etiquetasGasto.split(', ');
    //* Crear un nuevo gasto (función crearGasto). ¡Ojo con la manera de pasar el parámetro ~etiquetas~!
    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcionGasto, valorGastoFloat, fechaGasto, ...etiquetasGastoArray);
    //* Añadir el gasto a la lista (función anyadirGasto).
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    //* Llamar a la función repintar para que se muestre la lista con el nuevo gasto.
    repintar();  
}
//! HANDLERS *******************************
//^ Definición de la función constructora EditarHandle:
function EditarHandle() {}
//^Haciendo el prototipo de EditarHandle:
// Método handleEvent para la edición del gasto
EditarHandle.prototype.handleEvent = function () {
    // Verificar si hay un gasto asignado
    if (!this.gasto) {
        console.error("No se ha asignado un gasto para editar.");
        return;
    }
    // Pedir al usuario la información para editar el gasto
    let nuevaDescripcion = prompt("Introduzca la nueva descripción:", this.gasto.descripcion);
    let nuevoValor = parseFloat(prompt("Introduzca el nuevo valor:", this.gasto.valor));
    //Creamos una cadena de texto con la fecha en formato yyyy-mm-dd:
    let fechaVieja = new Date(this.gasto.fecha);
    let fechaViejaConvertida = fechaVieja.toISOString().slice(0, 10);
    let nuevaFecha = prompt("Introduzca la nueva fecha:", fechaViejaConvertida);
    let nuevasEtiquetasTexto = prompt("Introduzca las nuevas etiquetas separadas por comas:");

    // Convertir la cadena de texto de etiquetas a un array
    let nuevasEtiquetas = nuevasEtiquetasTexto.split(', ');

    // Actualizar las propiedades del gasto
    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarValor(nuevoValor);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

    // Llamar a la función repintar para actualizar la lista de gastos
    repintar();
};
//^ Definición de la función constructora EditarHandleForm:
function EditarHandleForm() {}
//^Haciendo el prototipo de EditarHandleForm:
// Método handleEvent para la edición del gasto
EditarHandleForm.prototype.handleEvent = function (event) {
    // Verificar si hay un gasto asignado
    if (!this.gasto) {
        console.error("No se ha asignado un gasto para editar.");
        return;
    }
    //desactivar el botón
    event.target.disabled = true;
    //pintar un formulario
    let divCorriente = event.currentTarget.parentElement;
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    formulario = plantillaFormulario.querySelector("form"); 
    divCorriente.appendChild(formulario);
    //crear botones "Enviar" y "Cancelar"
    let botonEnviar = formulario.querySelector("button[type='submit']");
    let botonCancelar = document.getElementsByClassName("cancelar")[0];
    formulario.addEventListener("submit", (event) => botonEnviarEditarGastoClick.call(this, event)); //!corregido
    botonCancelar.addEventListener("click", botonCancelarClick);
    // Rellenamos el formulario
    formulario.elements.descripcion.value = this.gasto.descripcion;
    formulario.elements.valor.value = this.gasto.valor;
    let fechaVieja = new Date(this.gasto.fecha);
    let fechaViejaConvertida = fechaVieja.toISOString().slice(0, 10);
    formulario.elements.fecha.value = fechaViejaConvertida;
    let viejasEtiquetasTexto = this.gasto.etiquetas.join(', ');
    formulario.elements.etiquetas.value = viejasEtiquetasTexto;
    //desactivamos el botón "Añadir gasto formulario"
        botonAnyadirGastoForm.disabled = true;
    //desactivamos el botón 'Editar con el formulario'
    let botonesEditarConFormulario = document.getElementsByName("gasto-editar-formulario");
    for (let i = 0; i < botonesEditarConFormulario.length; i++) {
        if (!botonesEditarConFormulario[i].disabled) {
            botonesEditarConFormulario[i].disabled = true;
        }
    }
    let botonesEditar = document.querySelectorAll("button.gasto-editar");
    for (let i = 0; i < botonesEditar.length; i++) {
        if (!botonesEditar[i].disabled) {
            botonesEditar[i].disabled = true;
        }
    }
    let botonesBorrar = document.querySelectorAll("button.gasto-borrar");
    for (let i = 0; i < botonesBorrar.length; i++) {
        if (!botonesBorrar[i].disabled) {
            botonesBorrar[i].disabled = true;
        }
    }
};


//^ Definición de la función constructora BorrarHandle:
function BorrarHandle() {}
//^Haciendo el prototipo de BorrarHandle:
// Método handleEvent para el borrado del gasto
BorrarHandle.prototype.handleEvent = function () {
    // Verificar si hay un gasto asignado
    if (!this.gasto) {
        console.error("No se ha asignado un gasto para borrar.");
        return;
    }
    // Preguntar si el usuario está seguro si quiere borrar el gasto
    let infoGasto = this.gasto.mostrarGastoCompleto();
    let confirmacionUsuario = confirm("¿Usted está seguro que quiere borrar el gasto?\n" + infoGasto);
    if (confirmacionUsuario) {
        let idGastoBorrado = this.gasto.id;
        gestionPresupuesto.borrarGasto(idGastoBorrado);
        // Llamar a la función repintar para actualizar la lista de gastos
        repintar();
    }
};
//^ Definición de la función constructora BorrarEtiquetasHandle:
function BorrarEtiquetasHandle() {}
//^Haciendo el prototipo de BorrarEtiquetasHandle:
// Método handleEvent para el borrado de las  etiquetas del gasto
BorrarEtiquetasHandle.prototype.handleEvent = function () {
    // Verificar si hay un gasto asignado
    if (!this.gasto) {
        console.error("No se ha asignado un gasto para borrar sus etiquetas.");
        return;
    }
    // Preguntar si el usuario está seguro si quiere borrar la etiqueta del gasto
    let tituloEtiqueta = this.etiqueta;
    let respuestaUsuario = confirm("¿Usted está seguro que quiere borrar la etiqueta?\n" + tituloEtiqueta);
    if (respuestaUsuario) {
        this.gasto.borrarEtiquetas(this.etiqueta);
    }
        // Llamar a la función repintar para actualizar la lista de gastos
        repintar();  
};
//! Creación de botónes con las clases y manejadores de eventos requeridos:
//^ esta función crea y devuelve un botón para editar el gasto.
function anyadirBotonEditar(gasto) {
    // Crea el botón Editar
    let botonEditar = document.createElement("button");
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";
    // Crea una instancia de la función constructora EditarHandle
    let editarHandle = new EditarHandle();
    // Asigna el gasto al objeto EditarHandle
    editarHandle.gasto = gasto;
    // Configura el event handler usando el método handleEvent de EditarHandle
    botonEditar.addEventListener("click", editarHandle);
    // Agrega el botón al contenedor del gasto
    return botonEditar;
}
//* botón de EditarGasto utilizando el formulario:
function anyadirBotonEditarFormulario(gasto) {
    // Crea el botón Editar
    let botonEditar = document.createElement("button");
    botonEditar.className = "gasto-editar-formulario";
    botonEditar.name = "gasto-editar-formulario";
    botonEditar.textContent = "Editar con el formulario";
    // Crea una instancia de la función constructora EditarHandle
    let editarHandleForm = new EditarHandleForm();
    // Asigna el gasto al objeto EditarHandle
    editarHandleForm.gasto = gasto;
    // Configura el event handler usando el método handleEvent de EditarHandle
    botonEditar.addEventListener("click", editarHandleForm);
    // Agrega el botón al contenedor del gasto
    return botonEditar;
}

//^ esta función crea y devuelve un botón para borrar el gasto.
function anyadirBotonBorrar(gasto) {
    // Crea el botón Borrar
    let botonBorrar = document.createElement("button");
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";
    // Crea una instancia de la función constructora BorrarHandle
    let borrarHandle = new BorrarHandle();
    // Asigna el gasto al objeto BorrarHandle
    borrarHandle.gasto = gasto;
    // Configura el event handler usando el método handleEvent de BorrarHandle
    botonBorrar.addEventListener("click", borrarHandle);
    // Agrega el botón al contenedor del gasto
    return botonBorrar;
}
//^ La función que añade manejadoras de las etiquetas al contenedor (div/span) dado al gasto definido:
function anyadirBorrarEtiquetaHandle(elementoHtml, gasto) {
    // Obtén todas las etiquetas dentro del elementoHtml
    let etiquetasGasto = elementoHtml.getElementsByClassName("gasto-etiquetas-etiqueta");
    // Itera sobre cada etiqueta y añade el manejador de eventos
    for (let i = 0; i < etiquetasGasto.length; i++) {
        let etiqueta = etiquetasGasto[i];
        // Crea una instancia de BorrarEtiquetasHandle
        let borrarEtiquetasHandle = new BorrarEtiquetasHandle();
        // Asigna el gasto y la etiqueta al objeto handler
        borrarEtiquetasHandle.gasto = gasto;
        borrarEtiquetasHandle.etiqueta = etiqueta.textContent;
        // Configura el manejador de eventos utilizando el método handleEvent de BorrarEtiquetasHandle
        etiqueta.addEventListener("click", borrarEtiquetasHandle);
    }
}
//^ manejadores de eventos globales:
let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);
let botonAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoForm.addEventListener("click", nuevoGastoWebFormulario);

function nuevoGastoWebFormulario () {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    formulario = plantillaFormulario.querySelector("form"); 
    controlesPrincipales.appendChild(formulario);
    //crear botones "Enviar" y "Cancelar"
    let botonEnviar = formulario.querySelector("button[type='submit']");
    let botonCancelar = document.getElementsByClassName("cancelar")[0];
    //bloquear el botón "Añadir gasto formulario"
    botonAnyadirGastoForm.disabled = true;
    //bloquear todos los botones "Editar gasto con formulario"
    let botonesEditarConFormulario = document.getElementsByName("gasto-editar-formulario");
    for (let i = 0; i < botonesEditarConFormulario.length; i++) {
        if (!botonesEditarConFormulario[i].disabled) {
            botonesEditarConFormulario[i].disabled = true;
        }
    }
    let botonesEditar = document.querySelectorAll("button.gasto-editar");
    for (let i = 0; i < botonesEditar.length; i++) {
        if (!botonesEditar[i].disabled) {
            botonesEditar[i].disabled = true;
        }
    }
    let botonesBorrar = document.querySelectorAll("button.gasto-borrar");
    for (let i = 0; i < botonesBorrar.length; i++) {
        if (!botonesBorrar[i].disabled) {
            botonesBorrar[i].disabled = true;
        }
    }

    formulario.addEventListener("submit", botonEnviarClick) //! corregido
    botonCancelar.addEventListener("click", botonCancelarClick)

}
function botonEnviarClick(event) {
    event.preventDefault();
    botonAnyadirGastoForm.disabled = false;
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
function botonEnviarEditarGastoClick(event) {
    event.preventDefault();
    //* obtenemos los valores del formulario
    let descripcionGasto = formulario.querySelector("#descripcion").value;
    let valorGasto = parseFloat(formulario.querySelector("#valor").value); 
    let fechaGasto = formulario.querySelector("#fecha").value;
    let etiquetasGasto = formulario.querySelector("#etiquetas").value;
    let etiquetasGastoArray = etiquetasGasto.split(', ');
    //* actualizamos el gasto
    this.gasto.actualizarDescripcion(descripcionGasto);
    this.gasto.actualizarValor(valorGasto);
    this.gasto.actualizarFecha(fechaGasto);
    let etiquetasCorrientes = this.gasto.etiquetas;
    this.gasto.borrarEtiquetas(...etiquetasCorrientes);
    this.gasto.anyadirEtiquetas(...etiquetasGastoArray);
    formulario.remove();
    // desbloqueamos el botón "Añadir gasto con formulario"
    botonAnyadirGastoForm.disabled = false;
    // desbloqueamos los botones "Editar gasto"
    let botonesEditarConFormulario = document.getElementsByName("gasto-editar-formulario");
    for (let i = 0; i < botonesEditarConFormulario.length; i++) {
        if (botonesEditarConFormulario[i].disabled) {
            botonesEditarConFormulario[i].disabled = false;
        }
    }   
    repintar();
}

function botonCancelarClick() {
    botonAnyadirGastoForm.disabled = false;
    let botonEditarConFormulario = document.getElementsByName("gasto-editar-formulario");
    if (botonEditarConFormulario.disabled) {
        botonEditarConFormulario.disabled = false;
    }
    // desbloqueamos los botones "Editar gasto", si estan bloqueados
    let botonesEditarConFormulario = document.getElementsByName("gasto-editar-formulario");
    for (let i = 0; i < botonesEditarConFormulario.length; i++) {
        if (botonesEditarConFormulario[i].disabled) {
            botonesEditarConFormulario[i].disabled = false;
        }
    }
    let botonesEditar = document.querySelectorAll("button.gasto-editar");
    for (let i = 0; i < botonesEditar.length; i++) {
        if (botonesEditar[i].disabled) {
            botonesEditar[i].disabled = false;
        }
    }
    let botonesBorrar = document.querySelectorAll("button.gasto-borrar");
    for (let i = 0; i < botonesBorrar.length; i++) {
        if (botonesBorrar[i].disabled) {
            botonesBorrar[i].disabled = false;
        }
    }
    formulario.remove();
}

function filtrarGastosWeb(event) {
    event.preventDefault();
    let formularioFiltarGastos = document.getElementById("formulario-filtrado");
    let gastoDescripcion = document.getElementById("formulario-filtrado-descripcion").value;
    let gastoValorMinimo = document.getElementById("formulario-filtrado-valor-minimo").value;
    let gastoValorMaximo = document.getElementById("formulario-filtrado-valor-maximo").value;
    let gastoFechaDesde = document.getElementById("formulario-filtrado-fecha-desde").value;
    let gastoFechaHasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
    let gastoEtiquetasTiene = document.getElementById("formulario-filtrado-etiquetas-tiene").value;

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    anyadirBotonEditar,
    anyadirBotonBorrar,
    anyadirBorrarEtiquetaHandle,
    anyadirBotonEditarFormulario
}