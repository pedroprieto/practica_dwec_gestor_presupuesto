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
        div_fecha.innerHTML = gasto.fecha;
        
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
        }
    // }

    // Crear los botones de editar y borrar
    // Boton editar
    let btn_editar = document.createElement("button");
    // btn_editar.setAttribute("type", "button");
    btn_editar.type = "button";
    btn_editar.className = "gasto-editar"
    btn_editar.innerHTML = "Editar";
    contenedor.append(btn_editar);
    let editar_gasto = new editarHandle();
    editar_gasto.gasto_actual = gasto;
    btn_editar.addEventListener("click", editar_gasto);   

    // Boton borrrar
    let btn_borrar = document.createElement("button");
    // btn_borrar.setAttribute("type", "button");
    btn_borrar.type = "button";
    btn_borrar.className = "gasto-borrar";
    btn_borrar.innerHTML = "Borrar";
    contenedor.append(btn_borrar);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

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
}

function repintar() {

    // Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId("presupuesto", gespres.mostrarPresupuesto());

    // Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId("gastos-totales", gespres.calcularTotalGastos());

    // Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId("balance-total", gespres.calcularBalance());

    // Borrar el contenido de div#listado-gastos-completo
    // gespresweb.mostrarGastosAgrupadosWeb("listado-gastos-completo");
    // let contenedor = document.getElementById("listado-gastos-completo");
    // contenedor.innerHTML = "";
    document.getElementById("listado-gastos-completo").innerHTML = "";


    // Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    for (let g of gespres.listarGastos()) {
        mostrarGastosWeb("listado-gastos-completo", g);
    };

};
// document.getElementById("actualizarpresupuesto").addEventListener("click", actulizarPresupuestoWeb());
// actualizarpresupuesto.addEventListener("click", actulizarPresupuestoWeb());


function actualizarPresupuestoWeb() {

    let presupuesto = prompt("Introduzca un nuevo presupuesto");

    presupuesto = parseFloat(presupuesto);

    gespres.actualizarPresupuesto(presupuesto);

    repintar();
};

    // Capturamos el click del boton actualizar presupuesto, y si se presiona 
    let btn_act_presupuesto = document.getElementById('actualizarpresupuesto');
    btn_act_presupuesto.addEventListener("click", actualizarPresupuestoWeb);

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

// Capturamos el click del boton actualizar presupuesto, y si se presiona 
let btn_anyadir_gasto = document.getElementById('anyadirgasto');
btn_anyadir_gasto.addEventListener("click", nuevoGastoWeb);

function editarHandle() {
    this.handleEvent = function(e) {

        let nueva_descripcion = prompt("Nueva descripcion para el gasto");
        // this.gasto_actual.CrearGasto.actu
        this.gasto_actual.descripcion = gespres.actualizarDescripcion(nueva_descripcion);
        

        let nuevo_valor = prompt("Nueva cantidad para el gasto");
        nuevo_valor = parseFloat(nuevo_valor);
        this.gasto_actual.valor = gespres.actualizarValor(nuevo_valor);

        let nueva_fecha = prompt("Nueva fecha del gasto (AAAA-MM-DD)");
        this.gasto_actual.fecha = gespres.actualizarFecha(nueva_fecha);

        let nuevas_etiquetas = prompt("Nuevas etiquetas del gasto (separadas por coma");
        nuevas_etiquetas = nuevas_etiquetas.split(",");
        this.gasto_actual.etiquetas = gespres.anyadirEtiquetas(nuevas_etiquetas);

    };
};

// Exportamos las funciones del documento
export {
    mostrarDatoEnId,
    mostrarGastosWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    editarHandle
}