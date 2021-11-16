import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId( idElemento, valor ){
// Escribe el valor (texto) en el elemento HTML con id idElemento indicado
    let mostrarGasto = document.getElementById(idElemento);
    mostrarGasto.innerHTML = `${valor}`;
}

function mostrarGastosAgrupadosWeb( idElemento, agrup, periodo ){
    // Crea dentro del elemento HTML con id idElemento indicado una estructura HTML para el objeto agrup que se pase como parámetro
    
        let mostrarAgrupacion = document.getElementById(idElemento);
        let arrayAgrupacion = "";
    
        // Añado el array de los gastos agrupados por un periodo
        for( let [nombre, valor] of Object.entries( agrup ) ){
            arrayAgrupacion += `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${nombre}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                </div>
            `;
        }
    
        // Voy añadiendo la agrupacones de gastos
        mostrarAgrupacion.innerHTML = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>
                ${arrayAgrupacion}
            </div>
        `;
    }

function mostrarGastoWeb( idElemento, gasto ){
// Añade dentro del elemento HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro 

    //------------------------------------------------------------//
    // ESTRUCTURA HTML DEL GASTO
        let body = document.getElementById(idElemento);
    
        let divGasto = document.createElement('div');
        divGasto.className = "gasto";
        divGasto.id = "gasto-editar";

        let divDescripcion = document.createElement('div');
        divDescripcion.className = "gasto-descripcion";
        divDescripcion.textContent = `${gasto.descripcion}`;

        let divFecha = document.createElement('div');
        divFecha.className = "gasto-fecha";
        divFecha.textContent = `${gasto.fecha}`;

        let divValor = document.createElement('div');
        divValor.className = "gasto-valor";
        divValor.textContent = `${gasto.valor}`;

        let divEtiquetas = document.createElement('div');
        divEtiquetas.className = "gasto-etiquetas";
    //------------------------------------------------------------//

    //------------------------------------------------------------//
    // BOTÓN EDITAR GASTO
        // Crear un botón con texto Editar de tipo button
        let botonEditar = document.createElement('button');        
        botonEditar.className = "gasto-editar";
        botonEditar.id = "gasto-editar";
        botonEditar.type = "button";
        botonEditar.textContent = "Editar gasto";

        // Crear un nuevo objeto a partir de la función constructora EditarHandle
        let evEditar = new EditarHandle();

        // Establecer la propiedad gasto del objeto creado al objeto gasto
        evEditar.gasto = gasto;

        // Añade el objeto al manejador del evento click del botón Editar
        botonEditar.addEventListener("click", evEditar);
    //------------------------------------------------------------//

    //------------------------------------------------------------//
    // BOTÓN BORRAR GASTO 
        // Crear un botón con texto Borrar de tipo button
        let botonBorrar = document.createElement('button');
        botonBorrar.className = "gasto-borrar";
        botonBorrar.id = "gasto-borrar";
        botonBorrar.type = "button";
        botonBorrar.textContent = "Borrar gasto";

        // Crear un nuevo objeto a partir de la función constructora BorrarHandle
        let evBorrar = new BorrarHandle();

        // Establecer la propiedad gasto del objeto creado al objeto gasto
        evBorrar.gasto = gasto;

        // Añade el objeto al manejador del evento click del botón Borrar
        botonBorrar.addEventListener("click", evBorrar);
    //------------------------------------------------------------//

    //------------------------------------------------------------//
    // BORRAR ETIQUETAS 
        for (let e of gasto.etiquetas) {

            // Crear un elemento HTML <span></span> para las etiquetas
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = `${e}`;        
            divEtiquetas.append(spanEtiqueta);

            // Crear un nuevo objeto a partir de la función constructora BorrarEtiquetasHandle
            let evBorrarEti = new BorrarEtiquetasHandle();

            // Establecer las propiedades gasto y etiqueta  
            evBorrarEti.gasto = gasto;
            evBorrarEti.etiqueta = e;

            // Añade el objeto al manejador del evento click del span de la etiqueta
            spanEtiqueta.addEventListener('click', evBorrarEti);
        }
    //------------------------------------------------------------//

    // Añadir al DOM
    divGasto.append(divDescripcion);
    divGasto.append(divFecha);
    divGasto.append(divValor);
    divGasto.append(divEtiquetas);
    divGasto.append(botonEditar);
    divGasto.append(botonBorrar);
    body.append(divGasto);
}
//------------------------------------------------------------//

//------------------------------------------------------------//
// Esta función se utilizará como objeto manejador de eventos para editar un gasto
function EditarHandle(){

    this.handleEvent = function(e){

       // Pedir al usuario la información necesaria para editar el gasto
       let desc = prompt("Introduce una descripción", this.gasto.descripcion);
       let valor = prompt("Introduce un valor", this.gasto.valor);
       let fecha = prompt("Introduce una fecha", this.gasto.fecha);
       let etiq = prompt("Introduce una/s etiqueta/s", this.gasto.etiquetas);

       // Convertir el valor a número
       valor = parseFloat(valor);

       // Convertir string a array
       etiq = etiq.split(',');

       // Actualizar las propiedades del gasto
       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(valor);
       this.gasto.actualizarFecha(fecha);
       this.gasto.anyadirEtiquetas(...etiq);

       // Llamar a la función repintar
       repintar();
    }
}

//------------------------------------------------------------//
// Esta función se utilizará como objeto manejador de eventos para borrar un gasto
function BorrarHandle(){
    this.handleEvent = function(e){

        // Borrar el gasto asociado y llamar a la función repintar()
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

//------------------------------------------------------------//
// Esta función se utilizará como objeto manejador de eventos para borrar etiquetas de un gasto
function BorrarEtiquetasHandle(){
    this.handleEvent = function(e){

        // Borrar la etiqueta seleccionada del gasto asociado y llamar a la función repintar() 
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

//------------------------------------------------------------//
// ACTUALIZAR PRESUPUESTO
function actualizarPresupuestoWeb() {

    // Pedir al usuario que introduzca un presupuesto mediante un prompt
    let presupuestoString = prompt('Introduzca un presupuesto');

    // Convertir el valor a número
    let presupuestoNumber = parseInt(presupuestoString);

    // Actualicar el presupuesto  y llamar a la función repintar() 
    gestionPresupuesto.actualizarPresupuesto(presupuestoNumber);
    repintar();
}

// BOTÓN Actualizar Presupuesto -----
    // Obtengo el elemento botón correspondiente previamente
    let buttonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");

    // Manejadora del evento click del botón actualizarpresupuesto mediante addEventListener
    buttonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
//------------------------------------------------------------//

//------------------------------------------------------------//
// NUEVO GASTO
function nuevoGastoWeb() {

    // Pedir al usuario la información necesaria para crear un nuevo gasto
    let desc = prompt("Introduce una descripción");
    let valorString = prompt("Introduce un valor");
    let fecha = prompt("Introduce una fecha");
    let etiquetaString = prompt("Introduce una/s etiqueta/s");

    // Conversión de string a float
    let valorNumber = parseFloat(valorString);

    // Separo el string y guardo cada elemento en un array
    let arrayEtiquetas = etiquetaString.split(', ');

    // Crear el nevo gasto
    let gasto = new gestionPresupuesto.CrearGasto( desc, valorNumber, fecha, arrayEtiquetas );
    gestionPresupuesto.anyadirGasto(gasto);

    // Llamar a la función repintar
    repintar();

}

// BOTÓN Añadir Nuevo Gasto-----
    // Obtengo el elemento botón correspondiente previamente
    let buttonAnyadirGasto = document.getElementById("anyadirgasto");

    // Manejadora del evento click del botón nuevoGastoWeb mediante addEventListener
    buttonAnyadirGasto.addEventListener("click", nuevoGastoWeb);
//------------------------------------------------------------//

//------------------------------------------------------------//
function repintar() {
// Vuelve a cargar los datos en el HTML reflejando los cambios

    // Mostrar el presupuesto en el div#presupuesto
    mostrarDatoEnId( "presupuesto", gestionPresupuesto.mostrarPresupuesto() );

    // Mostrar los gastos totales en div#gastos-totales
    mostrarDatoEnId( "gastos-totales", gestionPresupuesto.calcularTotalGastos() );

    // Mostrar el balance total en div#balance-total
    mostrarDatoEnId( "balance-total", gestionPresupuesto.calcularBalance() );

    // Borro el anterior listado completo de gastos de div#listado-gastos-completo
    document.getElementById("listado-gastos-completo").innerHTML = '';

    // Mostrar el listado completo de gastos en div#listado-gastos-completo
    let gastos = gestionPresupuesto.listarGastos();

    for ( let gasto of gastos ){
        mostrarGastoWeb( "listado-gastos-completo", gasto );
    }
}
//------------------------------------------------------------//


export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
} 