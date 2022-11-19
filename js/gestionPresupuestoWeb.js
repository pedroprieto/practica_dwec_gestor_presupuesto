//Importar librería js/gestionPresupuesto.js
import * as gestPresupuesto from "./gestionPresupuesto.js";

//Funciones


function mostrarDatoEnId (idElemento, valor) {

    let datosId = document.getElementById(idElemento);
    datosId.innerText = valor;
    

}

function mostrarGastoWeb (idElemento, gasto) {

    // div gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    //div descripcion.
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.innerText = gasto.descripcion;
    //div fecha
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    let fechaString = new Date(gasto.fecha);
    divFecha.innerText = fechaString.toLocaleDateString();
    //div valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;
    //Div etiquetas
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    for ( let eti of gasto.etiquetas) {
        let spanEti = document.createElement("span");
        spanEti.className = "gasto-etiquetas-etiqueta";
        //spanEti.innerText = gasto.etiquetas;
        spanEti.innerText = eti;
        //Eventos para los span de etiquetas 
        //Crear un nuevo objeto a partir de la función constructora BorrarEtiquetasHandle.
        let objetoEtiqueta = new BorrarEtiquetasHandle();
        //Establecer la propiedad gasto del objeto creado
        objetoEtiqueta.gasto = gasto;
        //Establecer la propiedad etiqueta del objeto creado
        objetoEtiqueta.etiqueta = eti;
        //Añadir el objeto recién creado como objeto manejador del evento click al span de la etiqueta.
        spanEti.addEventListener('click', objetoEtiqueta)

        divEtiquetas.append(spanEti);
    }
    
    //componer el objeto+
    divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas);

    //Añadir gasto al div
    let contenedor = document.getElementById(idElemento);
    contenedor.append(divGasto);
    //modificar la función mostrarGastoWeb
    //Crear un botón con texto Editar de tipo
    let botonEditar = document.createElement("button");
    //clase gasto-editar.
    botonEditar.className = ("gasto-editar");
    //de tipo button
    botonEditar.type = "button";
    //con texto Editar
    botonEditar.innerHTML ="Editar";
    //Crear un nuevo objeto a partir de la función constructora EditarHandle.
    let objetoEditar = new EditarHandle();
    //Establecer la propiedad gasto del objeto creado al objeto
    objetoEditar.gasto = gasto;
    //Añadir el objeto recién creado como objeto manejador del evento click al botón Editar recién creado.
    botonEditar.addEventListener("click", objetoEditar);
    //Añadir el botón al DOM a continuación de las etiquetas
    divGasto.append(botonEditar);
    //Botón borrar: 
    let botonBorrar = document.createElement("button");
    //con clase gasto-borrar.
    botonBorrar.className="gasto-borrar";
    //de tipo button (<button type="button">)
    botonBorrar.type = "button";
    // botón con texto Borrar 
    botonBorrar.innerText = "Borrar";
    //Crear un nuevo objeto a partir de la función constructora BorrarHandle.
    let objetoBorrar = new BorrarHandle();
    //Establecer la propiedad gasto del objeto creado al objeto gasto
    objetoBorrar.gasto = gasto;
    //Añadir el objeto recién creado como objeto manejador del evento click al botón Borrar recién creado.
    botonBorrar.addEventListener("click", objetoBorrar);
    //Añadir el botón al DOM a continuación del botón Editar.
    divGasto.append(botonBorrar);

}

function mostrarGastosAgrupadosWeb ( IdElemento, agrup, periodo) {
    //div agrupacion 
    let divAgrupar = document.createElement("div");
    
    divAgrupar.className = "agrupacion";
    //crear texto h1
    let h1Periodo = document.createElement("h1");
    h1Periodo.innerHTML = `Gastos agrupados por ${periodo}`;
    divAgrupar.append(h1Periodo);
    let agrupDatos = Object.entries(agrup);
    agrupDatos.map( (movimiento) => {
        let divAgrpGasto = document.createElement("div");
        divAgrpGasto.className ="agrupacion-dato";
            let spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.append(movimiento[0]);
            let spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor";
            spanValor.append(movimiento[1]);
        divAgrpGasto.append(spanClave, spanValor);
        divAgrupar.append(divAgrpGasto);
        })
        
    let agrupacionPeriodo = document.getElementById(IdElemento);
    agrupacionPeriodo.append(divAgrupar);
}

//Crear una función repintar para actualizar la página
function repintar (){
    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId('presupuesto', gestPresupuesto.mostrarPresupuesto());
    
    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId('gastos-totales',gestPresupuesto.calcularTotalGastos());

    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId('balance-total', gestPresupuesto.calcularBalance());

    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    document.getElementById('listado-gastos-completo').innerHTML = "";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    for (let gastos of gestPresupuesto.listarGastos()){
        mostrarGastoWeb('listado-gastos-completo', gastos);
    }
}
//Función actualizarPresupuestoWeb
function actualizarPresupuestoWeb () {
    //Pedir al usuario que introduzca un presupuesto mediante un prompt.
    let nuevoPresupuesto = Number(prompt("¿Cuál es tu nuevo presupuesto ?:"));
    //Actualicar el presupuesto (función actualizarPresupuesto)
    gestPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    //Llamar a la función repintar para que se muestre la información actualizada
    repintar();
}
//manejadora del evento click del botón actualizarpresupuesto mediante addEventListener
document.getElementById('actualizarpresupuesto').addEventListener('click', actualizarPresupuestoWeb);

//Función nuevoGastoWeb
function nuevoGastoWeb () {
    //Pedir al usuario la información necesaria para crear un nuevo gasto
    let descripcion = prompt("Descripcion del gasto: ");
    let valorGasto = Number (prompt("Valor del Gasto :"));
    let fechaGasto = prompt ("Fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt ("Introduzca etiquetas separadas por comas :").split(",");
    let nuevoGasto = new gestPresupuesto.CrearGasto(descripcion, valorGasto, fechaGasto, ...etiquetas);
    gestPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}
//Una vez definida la función, se añadirá como manejadora del evento click
    document.getElementById('anyadirgasto').addEventListener('click', nuevoGastoWeb);

//La función EditarHandle
function EditarHandle () {
    
    this.handleEvent = function(event){
        //Pedir al usuario la información necesaria para editar el gasto
        let descripcion = prompt("Descripción del gasto :");
        let valorGasto = Number (prompt("Valor del Gasto :"));
        let fechaGasto = prompt ("Fecha del gasto en formato yyyy-mm-dd");
        let etiquetas = prompt ("Introduzca etiquetas separadas por comas :").split(",");
        //Actualizar las propiedades del gasto
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.ActualizarValor(valorGasto);
        this.gasto.actualizarFecha(fechaGasto);
        this.gasto.anyadirEtiquetas(etiquetas);
        //Llamar a la función repintar
        repintar();
    }
}
    //Función BorrarHandle
    function BorrarHandle () {
        this.handleEvent = function (event) {
            //Borrar el gasto asociado
            gestPresupuesto.borrarGasto(this.gasto.id);
            //Llamar a la función repintar
            repintar();
        }

    }
    //Función BorrarEtiquetasHandle
    function BorrarEtiquetasHandle () {
        this.handleEvent = function (event) {
            //Borrar la etiqueta seleccionada del gasto asociado. 
            this.gasto.borrarEtiquetas(this.etiqueta);
            //Llamar a la función repintar
            repintar();

        }
    }

// Exportar las funciones creadas
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}