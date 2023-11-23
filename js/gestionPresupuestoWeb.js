// Adrián Romero Alonso 2DAWY 53978049Q
"use strict";
import * as gP from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener('click', actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener('click', nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener('click', nuevoGastoWebFormulario)


function mostrarDatoEnId(idElemento, valor) {
    let element = document.getElementById(idElemento);
    element.innerHTML = `<p>${valor}</p>` 
}

function mostrarGastoWeb(idElemento, gasto) {
    
    let element = document.getElementById(idElemento);                                //Obtención del div del HTML ARA

    let divGasto = document.createElement("div");                                    //Zona de Creación de Divs ARA
    divGasto.className = 'gasto';
    divGasto.setAttribute('id', `gasto-${gasto.id}`)

    let divGDesc = document.createElement("div");
    divGDesc.className = 'gasto-descripcion';
    divGDesc.textContent = gasto.descripcion;

    let divGFecha = document.createElement("div");
    divGFecha.className = 'gasto-fecha';
    divGFecha.textContent = gasto.fecha;

    let divGValor = document.createElement("div");
    divGValor.className = 'gasto-valor';
    divGValor.textContent = gasto.valor;
        
    let divGEtiq = document.createElement("div"); 
    divGEtiq.className = 'gasto-etiquetas';

    gasto.etiquetas.forEach((etiqueta, index) => {
       
        let spanEtiq = document.createElement("span");                                  //Zona Span y decoracion ARA
        spanEtiq.className = 'gasto-etiquetas-etiqueta';

        if (gasto.etiquetas.length - 1 === index) {
            spanEtiq.textContent = `${etiqueta}`;
        }
        else {
            spanEtiq.textContent = `${etiqueta} | `
        }

        let tagHandler = new BorrarEtiquetasHandle();                                   //Creación del objeto controlador del evento ARA
        tagHandler.gasto = gasto;
        tagHandler.etiqueta = etiqueta;
        spanEtiq.addEventListener('click', tagHandler);

        divGEtiq.append(spanEtiq);                                                      
    });

    divGasto.append(divGDesc, divGFecha, divGValor, divGEtiq);                          //Asignacion de divs al div padre gastos ARA

        if (idElemento === 'listado-gastos-completo') {                                  
        let buttonEdit = document.createElement("button");                              //Creacion del boton y su objeto manejador de eventos ARA
        buttonEdit.className = 'gasto-editar';
        buttonEdit.textContent = 'Editar';
        
        let editHandler = new EditarHandle();
        editHandler.gasto = gasto;
        buttonEdit.addEventListener('click', editHandler);

        let buttonDelete = document.createElement("button");                            //Creacion del boton de borrar y su objeto manejador de eventos ARA
        buttonDelete.className = 'gasto-borrar'
        buttonDelete.textContent = 'Borrar';

        let deleteHandler = new BorrarHandle();
        deleteHandler.gasto = gasto;
        buttonDelete.addEventListener('click', deleteHandler);

        let buttonEditForm = document.createElement("button");                          //Creacion del boton de editar gasto mediante formulario ARA
        buttonEditForm.className = 'gasto-editar-formulario';
        buttonEditForm.setAttribute('id', `gasto-editar-formulario-${gasto.id}`);
        buttonEditForm.textContent = 'Editar (Formulario)';

        let editFormHandler = new EditarHandleFormulario();
        editFormHandler.gasto = gasto;
        buttonEditForm.addEventListener('click', editFormHandler);

        divGasto.append(buttonEdit, buttonDelete, buttonEditForm);                       
    }

    element.append(divGasto);                                                            
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {                        //Función que muestra la agrupación de gastos ARA
    let element = document.getElementById(idElemento);
    let keys =  Object.keys(agrup);
    let values = Object.values(agrup);
    let agrupDato = "";
    let periodoString = "";

    switch (periodo) {
        case "dia":
            periodoString = "día";
            break;
        case "mes":
            periodoString = "mes";
            break;
        case "anyo":
            periodoString = "año";
            break;
    }

    keys.forEach((key, index) => {
        agrupDato += 
            `<div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${key}</span>
                <span class="agrupacion-dato-valor">${values[index]}</span>
             </div>`;
    });

    element.innerHTML += 
        `<div class="agrupacion">
            <h1>Gastos agrupados por ${periodoString}</h1>
            ${agrupDato}
        </div>`;
}

function repintar () {                                                                  //Mostrar los datos en el div funcion repintar ARA
    
    document.getElementById("presupuesto").innerHTML = "";
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());

    document.getElementById("gastos-totales").innerHTML = "";
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());

    document.getElementById("balance-total").innerHTML = "";
    mostrarDatoEnId("balance-total", gP.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";                                   //Borrado de elementos en el div#listado-gastos-completo y reimpresion ARA
    for (let gasto of gP.listarGastos()) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
    
}

function actualizarPresupuestoWeb() {                                                                     //Funcion para actualizar el presupuesto ARA

    gP.actualizarPresupuesto(parseFloat(prompt("Introduce un nuevo presupuesto:")));

    repintar();                                                                                          //Reimpresion de los datos con el nuevo presupuesto ARA
} 

function nuevoGastoWeb() {
    
    let descripcion = prompt("Introduzca la descripción del nuevo gasto: ");                            //Solicitud de datos para la creación del gasto ARA
    let valor = parseFloat(prompt("Introduzca el valor del nuevo gasto: "));
    let fecha = Date.parse(prompt("Introduzca la fecha del nuevo gasto: "));
    let etiquetas = prompt("Introduzca las etiquetas del nuevo gasto separadas por , : ").split(',');

    gP.anyadirGasto(new gP.CrearGasto(descripcion,valor,fecha,etiquetas));                               //Creación y adición del gasto creado a la lista de gastos ARA

    repintar();                                                                                         //Reimpresion de los datos s con el nuevo objeto ARA
}

function EditarHandle () {
    this.handleEvent = function() {                                                                     //Soicitar al usuario la información necesaria para editar el gasto y su posterior actualización ARA
        this.gasto.actualizarDescripcion( 
            prompt("Introduzca la descripción nueva: "));
        
        this.gasto.actualizarValor( 
            parseFloat(prompt("Introduzca el valor nuevo: ")));
        
        this.gasto.actualizarFecha( 
            Date.parse(prompt("Introduzca la fecha nueva: ")));

        let etiquetas = prompt("Introduzca las nuevas etiquetas separadas por , : ");
            
        if(typeof etiquetas != "undefined" ) {
            this.gasto.anyadirEtiquetas(etiquetas.split(','))
        }
    
        repintar();                                                                                 
    }
}

function BorrarHandle() {
    this.handleEvent = function(event) {
        gP.borrarGasto(this.gasto.id);                                                              //Funcion para borrar gasto ARA
        repintar();                                                                                 
    }
 }

function BorrarEtiquetasHandle() {
    this.handleEvent = function(event) {
        this.gasto.borrarEtiquetas(this.etiqueta);                                                  //Funcion para borrar etiqueta ARA
        repintar();                                                                                 
    }
}

function nuevoGastoWebFormulario() {                                                                            //Funcion clonación y creación del formulario ARA
    let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
    document.getElementById("controlesprincipales").append(form);
    document.getElementById('anyadirgasto-formulario').disabled = true;                                         
    
    let submitEvent = new submitHandle();                                                                       //Creación del objeto manipulador de eventos del boton enviar ARA
    form.addEventListener('submit', submitEvent);

    let cancelarEvent = new cancelarHandle();                                                                   //Creación del objeto manipulador de eventos del boton cancelar ARA
    cancelarEvent.formulario = form;
    form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);
}

function submitHandle() {
    this.handleEvent = function(event) {
        event.preventDefault();                                                                                 //Prevencion del efecto por defecto del formulario ARA

        let descripcion = event.currentTarget.descripcion.value;                                                //Zona de recogida de datos del formulario ARA
        let valor = event.currentTarget.valor.value;
        let fecha = event.currentTarget.fecha.value;
        let etiquetas = event.currentTarget.etiquetas.value;

        if (typeof etiquetas !== 'undefined') {                                                                  //Separación de las etiquetas a un array ARA
            etiquetas = etiquetas.split(",");
        }

        let gasto = new gP.CrearGasto(descripcion, valor, fecha, etiquetas);                                    //Creación de gasto con los datos recogidos ARA

        gP.anyadirGasto(gasto);                                                                                 //Adición del gasto a la lista ARA

        repintar();                                                                                             

        document.getElementById('anyadirgasto-formulario').disabled = false;                                    //Activación del boton de añadir gasto de nuevo ARA
    }
}

function cancelarHandle () {
    this.handleEvent = function() {
        this.formulario.remove();                                                                               //Eliminacion  del formulario creado ARA
        document.getElementById("anyadirgasto-formulario").disabled = false;                                    //Reactivación del boton de añadir gastos ARA
    }
}

function EditarHandleFormulario() {                                                                                     //Función clonación y creación del formulario mediante el template ARA
    this.handleEvent = function(event) {
        let form = document.getElementById("formulario-template").content.cloneNode(true).querySelector("form");
        document.getElementById(`gasto-${this.gasto.id}`).append(form);

        document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = true;                           

        form.descripcion.value = this.gasto.descripcion;                                                                //Recogida y representación de datos del gasto en el formulario ARA
        form.valor.value = this.gasto.valor;

        let fecha = new Date(this.gasto.fecha);                                                                          //Recogida y representación de la fecha del gasto ARA
        let fechaFormateda = fecha.toISOString().substring(0,10);
        form.fecha.value = fechaFormateda;

        let etiquetaString = "";                                                                                        //Recogida y representacion de las etiquetas del gasto ARA
        this.gasto.etiquetas.forEach((etiqueta, index) => {
            if (this.gasto.etiquetas.length - 1 === index) {
                etiquetaString += etiqueta;
            }
            else {
                etiquetaString += etiqueta + ", ";
            }
        });
        form.etiquetas.value = etiquetaString;

        let cancelarEvent = new cancelarEditHandle();                                                                    //Creación del objeto manejador de eventos del boton cancelar ARA
        cancelarEvent.formulario = form;
        cancelarEvent.gasto = this.gasto;
        form.querySelector("button[class='cancelar']").addEventListener('click', cancelarEvent);

        let submitEvent = new submitEditHandle();                                                                        //Creación del objeto manejador de eventos del boton enviar ARA
        submitEvent.gasto = this.gasto;
        form.addEventListener('submit', submitEvent);

    }

    function submitEditHandle () {
        this.handleEvent = function(event) {
            this.gasto.actualizarDescripcion(event.currentTarget.descripcion.value);
            this.gasto.actualizarValor(parseFloat(event.currentTarget.valor.value));
            this.gasto.actualizarFecha(event.currentTarget.fecha.value);
            let etiquetas = event.currentTarget.etiquetas.value;
            if (typeof etiquetas !== "undefined") {
                etiquetas = etiquetas.split(",");
            }
            this.gasto.etiquetas = etiquetas;

            repintar();
        }
    }

    function cancelarEditHandle () {
        this.handleEvent = function() {                                                                                     //Función borrar formulario ARA
            this.formulario.remove();
            document.getElementById(`gasto-editar-formulario-${this.gasto.id}`).disabled = false;                           
        }
    }
}

export {                                                                                                                    //Funciones a exportar para el test ARA
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb, 
    repintar
}