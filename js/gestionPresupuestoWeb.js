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
    let fecha_convertida = gasto.fecha;
    // div_fecha.innerHTML = gasto.fecha;
    div_fecha.innerHTML = fecha_convertida;
    
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
        manejadorEditarGasto.gasto_actual = this.gasto;
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
        formularioEditarGasto.getElementById("fecha").value = this.gasto_actual.fecha.toLocaleString();
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
        e.target.append(formularioEditarGasto);
        // this.div_actual.append(formularioEditarGasto.content.cloneNode(true));
        // div_gasto.append(formularioEditarGasto);

        
    };
};

function editarGastoHandle() {
    this.handleEvent = function(e) {

        // Prevenir la recarga de la web
        e.preventDefault();

         
        // this.gasto_actual.actualizarDescripcion(formularioEditarGasto.getElementById("descripcion").value);
        // this.gasto_actual.actualizarValor(parseFloat(formularioEditarGasto.getElementById("valor").value));
        // this.gasto_actual.actualizarFecha(formularioEditarGasto.getElementById("fecha").value);
        // this.gasto_actual.anyadirEtiquetas(formularioEditarGasto.getElementById("etiquetas").value);

        repintar();

        // e.target.form.remove();
        e.target.remove();
        // this.botonCrearFormulario.form.remove();
        // this.botonCrearFormulario.disabled = "";
    }
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

        let gasto = new gespres.CrearGasto(descripcion,valor, fecha, etiquetas);

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