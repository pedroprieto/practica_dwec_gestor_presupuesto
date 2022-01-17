// Javascript 4 - Interaccion con HTML

// Importamos gestionPresupuesto.js
import * as gespres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){

    let contenedor = document.getElementById(idElemento);
    //let elemento = document.createElement("div");
    //presupuesto.setAttribute("class", "presupuesto");
    //contenedor.appendChild(elemento);
    //elemento.append(valor);
    contenedor.innerHTML = valor;
    //contenedor.append(valor);
}

function mostrarGastosWeb(idElemento, gasto){

    let contenedor = document.getElementById(idElemento);

    // for (let g of gasto){
    let div_gasto = document.createElement("div");
    div_gasto.className = "gasto";
    // div_gasto.setAttribute("class", "gasto");
    contenedor.appendChild(div_gasto);
    
    let div_descripcion = document.createElement("div");
    div_descripcion.className = "gasto-descripcion";
    div_gasto.appendChild(div_descripcion);
    // div_descripcion.setAttribute("class", "gasto-descripcion");
    // div_descripcion.append(gasto.descripcion);
    div_descripcion.innerHTML = gasto.descripcion;
    
    let div_valor = document.createElement("div");
    // div_valor.setAttribute("class", "gasto-valor");
    div_valor.className = "gasto-valor";
    div_gasto.appendChild(div_valor);
    // div_valor.append(gasto.valor);
    div_valor.innerHTML = gasto.valor;
    
    let div_fecha = document.createElement("div");
    // div_fecha.setAttribute("class", "gasto-fecha");
    div_fecha.className = "gasto-fecha";
    div_gasto.appendChild(div_fecha);
    // div_fecha.append(gasto.fecha);
    let fecha_convertida = new Date(gasto.fecha);
    // let fecha = new Date(this.gasto_actual.fecha);
    // formularioEditarGasto.getElementById("fecha").value = fecha.toISOString().substr(0,10);
    // div_fecha.innerHTML = gasto.fecha;
    div_fecha.innerHTML = fecha_convertida.toLocaleString().substr(0,10);
    
    let div_etiqueta = document.createElement("div");
    // div_etiqueta.setAttribute("class", "gasto-etiquetas");
    div_etiqueta.className = "gasto-etiquetas";
    div_gasto.appendChild(div_etiqueta);
    
    //let listado_etiquetas = g.etiquetas.split(",");

    for (let etiq of gasto.etiquetas) {
        let div_etiqs = document.createElement("span");
        // div_etiqs.setAttribute("class", "gasto-etiquetas-etiqueta");
        div_etiqs.className = "gasto-etiquetas-etiqueta";
        div_etiqueta.appendChild(div_etiqs);
        // div_etiqs.append(etiq);
        div_etiqs.innerHTML = etiq;
        let etiq_borrar = new borrarEtiquetasHandle();
        etiq_borrar.gasto_actual = gasto;
        etiq_borrar.etiqueta = etiq;
        div_etiqs.addEventListener("click", etiq_borrar);
    }
    // }

    // Crear los botones de editar y borrar
    // Boton editar
    let btn_editar = document.createElement("button");
    // btn_editar.setAttribute("type", "button");
    btn_editar.type = "button";
    btn_editar.className = "gasto-editar"
    btn_editar.innerHTML = "Editar";
    div_gasto.append(btn_editar);
    let editar_gasto = new editarHandle();
    editar_gasto.gasto_actual = gasto;
    btn_editar.addEventListener("click", editar_gasto);   

    // Boton borrrar
    let btn_borrar = document.createElement("button");
    // btn_borrar.setAttribute("type", "button");
    btn_borrar.type = "button";
    btn_borrar.className = "gasto-borrar";
    btn_borrar.innerHTML = "Borrar";
    div_gasto.append(btn_borrar);
    let borrar_gasto = new borrarHandle();
    borrar_gasto.gasto_actual = gasto;
    btn_borrar.addEventListener("click", borrar_gasto);

    // Boton editar formulario
    let btn_editar_form = document.createElement("button");
    btn_editar_form.type = "button";
    btn_editar_form.className ="gasto-editar-formulario";
    btn_editar_form.innerHTML = "Editar (formulario)";
    div_gasto.append(btn_editar_form);
    let editar_gasto_form = new editarHandleFormulario();
    editar_gasto_form.gasto_actual = gasto;
    // editar_gasto_form.div_actual = e.currentTarget.parentNode.getElementById("gasto");
    btn_editar_form.addEventListener("click", editar_gasto_form);

    // Boton borrar API
    let btn_borrar_api = document.createElement("button");
    // btn_borrar.setAttribute("type", "button");
    btn_borrar_api.type = "button";
    btn_borrar_api.className = "gasto-borrar-api";
    btn_borrar_api.innerHTML = "Borrar (API)";
    div_gasto.append(btn_borrar_api);
    let borrar_gasto_api = new borrarApiHandle();
    borrar_gasto_api.gasto_actual = gasto;
    btn_borrar_api.addEventListener("click", borrar_gasto_api);

}

function editarHandleFormulario() {
    this.handleEvent = function(e) {

        let plantillaFormulario_editar_gasto = document.getElementById("formulario-template");

        let formularioEditarGasto = plantillaFormulario_editar_gasto.content.cloneNode("true");

        // Descativamos el boton de crear formulario
        e.target.disabled = "disabled";


        // Funcionalidad para boton enviar formulario
        let manejadorEditarGasto = new editarGastoHandle();
        manejadorEditarGasto.botonCrearFormulario = e.target;
        // let botonEnvio = formularioNuevoGasto.querySelector("button[type=submit");
        // botonEnvio.addEventListener("click", manejadorEnvio); 
        manejadorEditarGasto.gasto_actual = this.gasto_actual;
        let botonEditarGasto = formularioEditarGasto.querySelector("form");
        botonEditarGasto.addEventListener("submit", manejadorEditarGasto);


        // Funcionalidad para boton cancelar - SE REUTILIZA EL CODIGO DEL BOTON CANCELAR
        // DEL FORMULARIO DE NUEVO GASTO -> TAMBIEN REUTILIZA EL HANDLEEVENT
        let manejadorCancelar = new manejadorCancelarNuevoGastoWeb();
        // Le pasamos al boton cancelar el boton de nuevo formulario para que lo pueda
        // volver a activar
        manejadorCancelar.botonCrearFormulario = e.target;
        let botonCancelar = formularioEditarGasto.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", manejadorCancelar);

        // Desactivar el boton de borrar gasto
        // formularioEditarGasto.querySelector("button.gasto-borrar").disabled = "disabled";
        // btn_editar_form.disabled = "disabled";

        // Mostramos en el formulario los datos del gasto
        formularioEditarGasto.getElementById("descripcion").value = this.gasto_actual.descripcion;
        formularioEditarGasto.getElementById("valor").value = this.gasto_actual.valor;
        let fecha = new Date(this.gasto_actual.fecha);
        formularioEditarGasto.getElementById("fecha").value = fecha.toISOString().substr(0,10);
        // formularioEditarGasto.getElementById("fecha").value = this.gasto_actual.fecha.format('yyy-mm-dd');
        // formularioEditarGasto.getElementById("fecha").value = toLocaleString(this.gasto_actual.fecha);
        formularioEditarGasto.getElementById("etiquetas").value = this.gasto_actual.etiquetas;

        // Añadimos el formualrio a la web
        // document.getElementById("formulario_nuevo_gasto").append(formularioNuevoGasto);
        // document.getElementById(this.idElemento).appendChild(formularioEditarGasto);
        // document.append(formularioEditarGasto);
        // formularioEditarGasto.getElementById(this.div_actual).append(formularioNuevoGasto);
        // e.append(formularioEditarGasto);
        // let edit_gasto_form = document.createElement("div");
        e.target.parentNode.append(formularioEditarGasto);
        // this.div_actual.append(formularioEditarGasto.content.cloneNode(true));
        // div_gasto.append(formularioEditarGasto);

        
    };
};

function editarGastoHandle() {
    this.handleEvent = function(e) {

        // Prevenir la recarga de la web
        e.preventDefault();

        if (e.target.elements.descripcion.value != this.gasto_actual.descripcion || 
            e.target.elements.descripcion.value != "") {
                this.gasto_actual.actualizarDescripcion(e.target.elements.descripcion.value);
        }
        
        if (parseFloat(e.target.elements.valor.value) != this.gasto_actual.valor || 
            parseFloat(e.target.elements.valor.value) != "") {
                this.gasto_actual.actualizarValor(parseFloat(e.target.elements.valor.value));
            }
        
        if (e.target.elements.fecha.value != this.gasto_actual.fecha || 
            e.target.elements.fecha.value != "") {
                this.gasto_actual.actualizarFecha(e.target.elements.fecha.value);
            }
        
        
        // let nuevas_etiquetas = prompt("Nuevas etiquetas del gasto (separadas por coma) (Actual: " + this.gasto_actual.etiquetas +")");
        // nuevas_etiquetas = nuevas_etiquetas.split(",");
        // this.gasto_actual.etiquetas = gespres.anyadirEtiquetas(nuevas_etiquetas);
        // console.log("etiq: " + e.target.elements.etiquetas.value);
        let nuevas_etiquetas = e.target.elements.etiquetas.value;
        nuevas_etiquetas = nuevas_etiquetas.split(",");
        // console.log(nuevas_etiquetas);
        if (e.target.elements.etiquetas.value != "") {
            this.gasto_actual.anyadirEtiquetas(...nuevas_etiquetas);
        }
        // if (!this.gasto_actual.anyadirEtiquetas(nuevas_etiquetas)) {
        //     this.gasto_actual.anyadirEtiquetas(nuevas_etiquetas);
        // }

        
        // this.gasto_actual.anyadirEtiquetas(e.target.elements.etiquetas.value);
        // this.gasto_actual.anyadirEtiquetas(nuevas_etiquetas.value);
        repintar();

        // e.target.form.remove();
        e.target.remove();
        // this.botonCrearFormulario.form.remove();
        // this.botonCrearFormulario.disabled = "";
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";


    let contenedor = document.getElementById(idElemento);

    let div_agrupacion = document.createElement("div");
    // div_agrupacion.setAttribute("class", "agrupacion");
    div_agrupacion.className = "agrupacion"
    contenedor.appendChild(div_agrupacion);

    let div_period = document.createElement("h1");
    // periodo.setAttribute("class", "periodo");
    // div_period.append("Gastos agrupados por " + periodo);
    div_period.innerHTML = "Gastos agrupados por " + periodo;
    div_agrupacion.appendChild(div_period);

    // let texto_prueba = document.createElement("h1");
    // // texto_prueba.innerHTML = Objects.values(agrup);
    // texto_prueba.innerHTML = "Hola";
    // div_agrupacion.appendChild(texto_prueba);

    // for (let value of agrup.acum) {
    for (let [key, value] of Object.entries(agrup)) {

        let div_agrupacion_dato = document.createElement("div");
        div_agrupacion_dato.setAttribute("class", "agrupacion-dato");
        div_agrupacion.appendChild(div_agrupacion_dato);

        // for (let valores of Object.values(value)) {

            let div_agrupacion_dato_clave = document.createElement("span");
            div_agrupacion_dato_clave.setAttribute("class", "agrupacion-dato-clave");
            div_agrupacion_dato.appendChild(div_agrupacion_dato_clave);
            // div_agrupacion_dato_clave.append(key);
            div_agrupacion_dato_clave.innerHTML = key;

            let div_agrupacion_dato_valor = document.createElement("span");
            div_agrupacion_dato_valor.setAttribute("class", "agrupacion-dato-valor");
            div_agrupacion_dato.appendChild(div_agrupacion_dato_valor);
            //div_agrupacion_dato_valor.append(value);
            div_agrupacion_dato_valor.innerHTML = value;
        // }
    }

    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
    // Crear elemento <canvas> necesario para crear la gráfica
    // https://www.chartjs.org/docs/latest/getting-started/
    let chart = document.createElement("canvas");
    // Variable para indicar a la gráfica el período temporal del eje X
    // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
    let unit = "";
    switch (periodo) {
    case "anyo":
        unit = "year";
        break;
    case "mes":
        unit = "month";
        break;
    case "dia":
    default:
        unit = "day";
        break;
    }

    // Creación de la gráfica
    // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
    const myChart = new Chart(chart.getContext("2d"), {
        // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
        type: 'bar',
        data: {
            datasets: [
                {
                    // Título de la gráfica
                    label: `Gastos por ${periodo}`,
                    // Color de fondo
                    backgroundColor: "#555555",
                    // Datos de la gráfica
                    // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                    data: agrup
                }
            ],
        },
        options: {
            scales: {
                x: {
                    // El eje X es de tipo temporal
                    type: 'time',
                    time: {
                        // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                        unit: unit
                    }
                },
                y: {
                    // Para que el eje Y empieza en 0
                    beginAtZero: true
                }
            }
        }
    });
    // Añadimos la gráfica a la capa
    divP.append(chart);

}

function repintar() {

    // Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId("presupuesto", gespres.mostrarPresupuesto());

    // Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId("gastos-totales", "Total gastos: " + gespres.calcularTotalGastos() + " €");

    // Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId("balance-total", "Balance actual: " + gespres.calcularBalance() + " €");

    // Borrar el contenido de div#listado-gastos-completo
    // gespresweb.mostrarGastosAgrupadosWeb("listado-gastos-completo");
    // let contenedor = document.getElementById("listado-gastos-completo");
    // contenedor.innerHTML = "";
    document.getElementById("listado-gastos-completo").innerHTML = "";


    // Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    for (let g of gespres.listarGastos()) {
        mostrarGastosWeb("listado-gastos-completo", g);
    };

    // Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
    gespresweb.mostrarGastosAgrupadosWeb("agrupacion-dia", gespres.agruparGastos("dia"), "día");

    // Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
    gespresweb.mostrarGastosAgrupadosWeb("agrupacion-mes", gespres.agruparGastos("mes"), "mes");

    // Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
    gespresweb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gespres.agruparGastos("anyo"), "año");

};

function actualizarPresupuestoWeb() {

    let presupuesto = prompt("Introduzca un nuevo presupuesto");

    presupuesto = parseFloat(presupuesto);

    gespres.actualizarPresupuesto(presupuesto);

    repintar();
};

function nuevoGastoWeb() {

    // Pedimos al usuario los datos referentes al nuevo gasto
    let descripcion = prompt("DEscripcion para el gasto");
    let valor = prompt("Cantidad del gasto");
    valor = parseFloat(valor);
    let fecha = prompt("Fecha del gasto (AAAA-MM-DD)");
    let etiquetas = prompt("Etiquetas del gasto (separadas por coma");
    etiquetas = etiquetas.split(",");

    // Creamos el gasto nuevo
    let gasto = new gespres.CrearGasto(descripcion, valor, fecha, etiquetas);

    // Añadimos el nuevo gasto creado al array que contiene todos los gastos
    gespres.anyadirGasto(gasto);

    // REcargamos la página con el nuevo gasto, y resto de datos actualizados
    repintar();
};

function editarHandle() {
    this.handleEvent = function(e) {

        let nueva_descripcion = prompt("Nueva descripcion para el gasto (Actual: " + this.gasto_actual.descripcion +")");
        // this.gasto_actual.CrearGasto.actu
        // this.gasto_actual.descripcion = gespres.actualizarDescripcion(nueva_descripcion);
        if (nueva_descripcion != ""){
            if (nueva_descripcion != this.gasto_actual.descripcion) {
                this.gasto_actual.actualizarDescripcion(nueva_descripcion);
            };
        }; 
        
        
        let nuevo_valor = prompt("Nueva cantidad para el gasto (Actual: " + this.gasto_actual.valor +")");
        nuevo_valor = parseFloat(nuevo_valor);
        // this.gasto_actual.valor = gespres.actualizarValor(nuevo_valor);
        if (nuevo_valor != "") {
            if (nuevo_valor != this.gasto_actual.valor) {
                this.gasto_actual.actualizarValor(nuevo_valor);
            }
        } 
        

        let nueva_fecha = prompt("Nueva fecha del gasto (Formato: AAAA-MM-DD) (Actual: " + this.gasto_actual.fecha +")");
        // this.gasto_actual.fecha = gespres.actualizarFecha(nueva_fecha);
        if (nueva_fecha != "") {
            if (nueva_fecha != this.gasto_actual.fecha) {
                this.gasto_actual.actualizarFecha(nueva_fecha);
            }
        } 
        

        let nuevas_etiquetas = prompt("Nuevas etiquetas del gasto (separadas por coma) (Actual: " + this.gasto_actual.etiquetas +")");
        nuevas_etiquetas = nuevas_etiquetas.split(",");
        // this.gasto_actual.etiquetas = gespres.anyadirEtiquetas(nuevas_etiquetas);
        if (nuevas_etiquetas != "") {
            this.gasto_actual.anyadirEtiquetas(nuevas_etiquetas);
        }
        
        repintar();

    };
};

function borrarHandle() {
    this.handleEvent = function(e) {

        //console.log(gasto_actual);
        gespres.borrarGasto(this.gasto_actual.id);

        repintar();
    }
};

function borrarEtiquetasHandle() {
    this.handleEvent = function(e){

        this.gasto_actual.borrarEtiquetas(this.etiqueta);
        repintar();
    }
};

function nuevoGastoWebFormulario() {
    this.handleEvent = function(e) {
        //alert("Boton form");

        // console.log("formulario");
        let plantillaFormulario = document.getElementById("formulario-template");

        let formularioNuevoGasto = plantillaFormulario.content.cloneNode("true");

        // Funcionalidad para boton enviar formulario
        let manejadorEnvio = new manejadorEnvioNuevoGastoWeb();
        manejadorEnvio.botonCrearFormulario = e.target;
        // let botonEnvio = formularioNuevoGasto.querySelector("button[type=submit");
        // botonEnvio.addEventListener("click", manejadorEnvio); 
        let botonEnvio = formularioNuevoGasto.querySelector("form");
        botonEnvio.addEventListener("submit", manejadorEnvio);

        // Funcionalidad para boton cancelar
        let manejadorCancelar = new manejadorCancelarNuevoGastoWeb();
        // Le pasamos al boton cancelar el boton de nuevo formulario para que lo pueda
        // volver a activar
        manejadorCancelar.botonCrearFormulario = e.target;
        let botonCancelar = formularioNuevoGasto.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", manejadorCancelar);

        // Funcionalidad para boton enviar API
        let manejadorAPI = new manejadorEnviarAPI();
        manejadorAPI.botonCrearFormulario = e.target;
        let botonEnviarAPI = formularioNuevoGasto.querySelector("button.gasto-enviar-api")
        botonEnviarAPI.addEventListener("click", manejadorAPI);

        // Descativamos el boton de crear formulario
        e.target.disabled = "disabled";

        // Añadimos el formualrio a la web
        // document.getElementById("formulario_nuevo_gasto").append(formularioNuevoGasto);
        document.getElementById("controlesprincipales").append(formularioNuevoGasto);

        // let gasto = new gespres.CrearGasto(descripcion, valor, fecha, etiquetas);
        // formulario_nuevo_gasto.getElementById("descripcion");
        // let desc = formularioNuevoGasto.getElementById("descripcion").value;
        // let g = new gespres.CrearGasto(desc);
        // Funcionalidad para el boton cancelar
        // manejadorEnvio.desc = this.desc;
        // console.log(desc);
        // manejadorEnvio.prueba = "prueba2"
        // console.log(this.prueba);
    }
}

function manejadorEnviarAPI() {

    this.handleEvent = function(e) {

        // e.preventDefault();

        let url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/";
        url += document.getElementById("nombre_usuario").value
        // url += document.getElementById("nombre_usuario").value + "/" + this.gasto_actual.gastoId;
        
        
        // console.log("Boton enviar API formulario - nuevo gasto");

        let descripcion = document.getElementById("descripcion").value;
        let valor = parseInt(document.getElementById("valor").value);
        let fecha = document.getElementById("fecha").value;
        let etiquetas = document.getElementById("etiquetas").value;
        etiquetas = etiquetas.split(",");
        // let gasto = new gespres.CrearGasto(descripcion,valor, fecha, ...etiquetas);
       
        // let gasto = "{" + '"descripcion": ' + descripcion + '",valor": ' + valor + "}"; 
        let gasto = {
            "descripcion": descripcion,
            "valor": valor
        };
        // {
        //     "descripcion": "desc1",
        //     "valor": "20"
        //   }
        // let user = {
        //     nombre: 'Juan',
        //     apellido: 'Perez'
        // };

        url += "/" + gasto;

        console.log(url);

        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(gasto)
          });

        // cargarGastosAPI();
    } 
}

function manejadorEnvioNuevoGastoWeb() {
    this.handleEvent = function(e) {
        // Prevenir la recarga de la web
        e.preventDefault();
       
        // alert("descripcion: " + document.getElementById("descripcion").value + 
        // "\nvalor: " + document.getElementById("valor").value + 
        // "\nfecha: " + document.getElementById("fecha").value + 
        // "\netiquetas: " + document.getElementById("etiquetas").value);

        let descripcion = document.getElementById("descripcion").value;
        let valor = parseInt(document.getElementById("valor").value);
        let fecha = document.getElementById("fecha").value;
        let etiquetas = document.getElementById("etiquetas").value;
        // let etiquetas = gespres.transformarListadoEtiquetas(document.getElementById("etiquetas").value);
        // let etiquetas = document.getElementById("etiquetas").value;
        etiquetas = etiquetas.split(",");
        let gasto = new gespres.CrearGasto(descripcion,valor, fecha, ...etiquetas);
        console.log(gasto);

        // alert("Gasto: " + gasto);

        gespres.anyadirGasto(gasto);

        // manejadorCancelarNuevoGastoWeb();
   
        repintar();

        // e.target.form.remove();
        e.target.remove();
        // this.botonCrearFormulario.form.remove();
        this.botonCrearFormulario.disabled = "";
    }
}

function manejadorCancelarNuevoGastoWeb() {
    this.handleEvent = function(e) {

        // alert("cancelar");
        // Borramos el formulario
        e.target.form.remove();
        // Activamos el boton de nuevo formulario
        this.botonCrearFormulario.disabled = "";
    }
}

function filtrarGastosWeb() {
    this.handleEvent = function(e) {

        // Prevenir la recarga de la web
        e.preventDefault();

        // let cadenaBusqueda = "";
        // let busqueda = new Object();
        let busqueda = {};
        // e.target.elements.descripcion.value
        // let descripcion = document.getElementById("formulario-filtrado-descripcion").value;
        if (document.getElementById("formulario-filtrado-descripcion").value != "") {
            // cadenaBusqueda += "descripcionContiene: " + descripcion;
            busqueda.descripcionContiene = document.getElementById("formulario-filtrado-descripcion").value;
        }

        // console.log(document.getElementById("formulario-filtrado-descripcion").value);

        // let valorMinimo = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        if (document.getElementById("formulario-filtrado-valor-minimo").value != "") {
            busqueda.valorMinimo = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
            // if (cadenaBusqueda == ""){
            //     cadenaBusqueda += "valorMinimo: " + valorMinimo;
            // } else {
            //     cadenaBusqueda += ", valorMinimo: " + valorMinimo;
            // }            
        }

        // let valorMaximo = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        if (document.getElementById("formulario-filtrado-valor-maximo").value != "") {
            busqueda.valorMaximo = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
            // if (cadenaBusqueda == ""){
            //     cadenaBusqueda += "valorMaximo: " + valorMaximo;
            // } else {
            //     cadenaBusqueda += ", valorMaximo: " + valorMaximo;
            // }
        }

        // let fechaDesde = document.getElementById("formulario-filtrado-fecha-desde").value;
        if (document.getElementById("formulario-filtrado-fecha-desde").value != "") {
            busqueda.fechaDesde = document.getElementById("formulario-filtrado-fecha-desde").value
            // if (cadenaBusqueda == ""){
            //     cadenaBusqueda += "fechaDesde: " + fechaDesde;
            // } else {
            //     cadenaBusqueda += ", fechaDesde: " + fechaDesde;
            // }
        }

        // let fechaHasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
        if (document.getElementById("formulario-filtrado-fecha-hasta").value != "") {
            busqueda.fechaHasta = document.getElementById("formulario-filtrado-fecha-hasta").value
            // if (cadenaBusqueda == ""){
            //     cadenaBusqueda += "fechaHasta: " + fechaHasta;
            // } else {
            //     cadenaBusqueda += ", fechaHasta: " + fechaHasta;
            // }
        }

        // let etiquetas = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
        if (document.getElementById("formulario-filtrado-etiquetas-tiene").value != "") {
            // etiquetas = gespres.transformarListadoEtiquetas(document.getElementById("formulario-filtrado-etiquetas-tiene").value);
            // busqueda.etiquetasTiene = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
            let etiquetas = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
            etiquetas = gespres.transformarListadoEtiquetas(etiquetas);
            busqueda.etiquetasTiene = etiquetas;

            // if (cadenaBusqueda == ""){
            //     cadenaBusqueda += "etiquetasTiene:[" + etiquetas.split(",") + "]";
            // } else {
            //     cadenaBusqueda += ",etiquetasTiene:[" + etiquetas.split(",") + "]";
            // }
            // if (cadenaBusqueda == ""){
            //     cadenaBusqueda += "etiquetasTiene:" + etiquetas;
            // } else {
            //     cadenaBusqueda += ", etiquetasTiene:" + etiquetas;
            // }
        }

        //fechaDesde: "2021-09-15", fechaHasta: "2021-10-06"
        
        // gespres.filtrarGastos(cadenaBusqueda);
        // mostrarGastosWeb("listado-gastos-completo", gespres.filtrarGastos(cadenaBusqueda))
        // Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
        // document.removeChild(document.getElementById("listado-gastos-completo"));
        //e.target.form.remove();

        // Borramos el contenido del div para mostrar el resultado del filtrado
        document.getElementById("listado-gastos-completo").innerHTML = "";

        // Filtramos los datos según los valores introducidos en el formulario
        // cadenaBusqueda = JSON.parse(cadenaBusqueda);
        // cadenaBusqueda = "{" + cadenaBusqueda + "}"
        // let resultado = gespres.filtrarGastos(cadenaBusqueda);
        // let listado_etiquetas = g.etiquetas.split(",");
        // let resultado = "({" + gespres.filtrarGastos(cadenaBusqueda.split(",")) + "})";
        // resultado = gespres.filtrarGastos({etiquetasTiene: ["comida", "gasolina"], fechaDesde: "2021-10-06"});
        // let resultado = gespres.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["transporte"]});


        // let busqueda = new Object();
        // busqueda.descripcionContiene = document.getElementById("formulario-filtrado-descripcion").value;
        // busqueda.valorMinimo = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        // busqueda.valorMaximo = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);

        // console.log(busqueda);
        let resultado = gespres.filtrarGastos(busqueda);
        
        // let cadenaBusqueda1 = cadenaBusqueda.split(",");
        // cadenaBusqueda1 = "{" + cadenaBusqueda1 + "}";
        // console.log(cadenaBusqueda1);
        // let resultado =  gespres.filtrarGastos({cadenaBusqueda1});

        // console.log(resultado);
        // Iteramos los resultados para mostrarlos en el div
        for (let g of resultado) {
            mostrarGastosWeb("listado-gastos-completo", g);
        };
    }
}

function guardarGastosWeb() {
    // this.handleEvent = function(e) {

        // console.log("Pulsado guardar");
        // localStorage.GestorGastosDWEC = JSON.stringify(gespres.listarGastos());
        localStorage.setItem('GestorGastosDWEC', JSON.stringify(gespres.listarGastos()));
    // }
}

function cargarGastosWeb() {
    // this.handleEvent = function(e){

        // let GestorGastosDWEC;
        // console.log("Pulsado cargar");
        // gespres.cargarGastos(JSON.parse(GestorGastosDWEC));
        // let gastos_guardados = JSON.parse(GestorGastosDWEC.descripcion);
        // gespres.cargarGastos(gastos_guardados);
        // let gastos_guardados = localStorage.getItem('GestorGastosDWEC');

        // let gastos_guardados = JSON.parse(localStorage.getItem('GestorGastosDWEC'));

        // gespres.cargarGastos(gastos_guardados);

        // gespres.cargarGastos(JSON.parse(localStorage.getItem('GestorGastosDWEC')));

        let resultado = JSON.parse(localStorage.getItem('GestorGastosDWEC'));

        // if (resultado.length === 0){
        // if (Object.entries(resultado).length === 0){
        if (resultado === null){
            resultado = [];
        }

        gespres.cargarGastos(resultado);

        // console.log(resultado + " -- " + resultado.length);

        repintar();
    // }
}

async function cargarGastosAPI() {

    let url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/";
    url += document.getElementById("nombre_usuario").value;
    
    // async function cargarGastosApi() {

        let carga_datos_API = await fetch(url).then(function(response) {
            return response.json();
        }).then(function(data) {
            return data;
        });

    // }
    // console.log(carga_datos_API);
    // console.log(url);
    // carga_datos_API = JSON.parse(carga_datos_API);

    gespres.cargarGastos(carga_datos_API);

    repintar();

}

function borrarApiHandle() {
    this.handleEvent = function(e) {

        let url = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/";
        url += document.getElementById("nombre_usuario").value + "/" + this.gasto_actual.gastoId;

        // let id = this.gasto_actual.id;
        // url += "/" + id;

        // console.log(url);

        fetch(url, {
            method: 'DELETE',
            // headers: {
            //   'Content-Type': 'application/json;charset=utf-8'
            // },
            // body: JSON.stringify(user)
        });

        cargarGastosAPI();
    }
}

// Captura de click de botones 
// Capturamos el click del boton actualizar presupuesto, y si se presiona 
let btn_act_presupuesto = document.getElementById('actualizarpresupuesto');
btn_act_presupuesto.addEventListener("click", actualizarPresupuestoWeb);
// Capturamos el click del boton actualizar presupuesto, y si se presiona 
let btn_anyadir_gasto = document.getElementById('anyadirgasto');
btn_anyadir_gasto.addEventListener("click", nuevoGastoWeb);
// Capturamos el click del boton Añadir Gasto por Formulario
let botonNuevoGastoWebFormulario = document.getElementById("anyadirgasto-formulario");
let manejadorBotonFormularioNuevoGastoWeb = new nuevoGastoWebFormulario();
botonNuevoGastoWebFormulario.addEventListener("click", manejadorBotonFormularioNuevoGastoWeb);

// Captura del click del botón Filtrar GAstos
let botonFiltrarGastos = document.querySelector("form");
let manejadorBotonFiltrarGastos = new filtrarGastosWeb();
botonFiltrarGastos.addEventListener("submit", manejadorBotonFiltrarGastos);

// Captura del click del botón guardar-gastos
let btn_guardar_gastos = document.getElementById('guardar-gastos');
btn_guardar_gastos.addEventListener("click", guardarGastosWeb);

// CAptura del click del botón cargar-gastos
let btn_cargar_gastos = document.getElementById("cargar-gastos");
btn_cargar_gastos.addEventListener("click", cargarGastosWeb);

// Captura del click del boton cargar datos de API
let btn_carga_gastos_API = document.getElementById("cargar-gastos-api");
btn_carga_gastos_API.addEventListener("click", cargarGastosAPI);

// Exportamos las funciones del documento
export {
    mostrarDatoEnId,
    mostrarGastosWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    editarHandle,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosAPI

}