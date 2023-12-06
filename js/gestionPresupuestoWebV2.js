//Importar el fichero de la logica del proyecto
import * as gestPresupuesto from './gestionPresupuesto.js';

// Capa para mostrar el total de gastos
let divTotal = document.getElementById("total");

// Formulario de creación
let divForm = document.getElementById("formcreacion");

let form = document.createElement("form");

// Campo 'descripcion', con etiqueta
let divDesc = document.createElement("div");
divDesc.classList.add("form-control");
let campoDesc = document.createElement("input");
campoDesc.setAttribute("name", "descripcion");
campoDesc.setAttribute("id", "descripcion");
let labelDesc = document.createElement("label");
labelDesc.textContent = "Descripción";
labelDesc.setAttribute("for", "descripcion");
divDesc.append(labelDesc, campoDesc);

// Campo 'valor', con etiqueta
let divValor = document.createElement("div");
divValor.classList.add("form-control");
let campoValor = document.createElement("input");
campoValor.setAttribute("name", "valor");
campoValor.setAttribute("type", "number");
campoValor.setAttribute("id", "valor");
let labelValor = document.createElement("label");
labelValor.textContent = "Valor";
labelValor.setAttribute("for", "valor");
divValor.append(labelValor, campoValor);

// Campo 'fecha', con etiqueta
let divFecha = document.createElement("div");
divFecha.classList.add("form-control");
let campoFecha = document.createElement("input");
campoFecha.setAttribute("name", "fecha");
campoFecha.setAttribute("id", "fecha");
campoFecha.setAttribute("type", "date");
let labelFecha = document.createElement("label");
labelFecha.textContent = "Fecha";
labelFecha.setAttribute("for", "fecha");
divFecha.append(labelFecha, campoFecha);

// Campo 'etiquetas', con etiqueta
let divEtiquetas = document.createElement("div");
divEtiquetas.classList.add("form-control");
let campoEtiquetas = document.createElement("input");
campoEtiquetas.setAttribute("name", "etiquetas");
campoEtiquetas.setAttribute("id", "etiquetas");
let labelEtiquetas = document.createElement("label");
labelEtiquetas.textContent = "Etiquetas";
labelEtiquetas.setAttribute("for", "etiquetas");
divEtiquetas.append(labelEtiquetas, campoEtiquetas);

// Botón de envío
let botonEnvio = document.createElement("button");
botonEnvio.setAttribute("type", "submit");
botonEnvio.textContent = "Crear";

// Añadir todos los componentes al formulario
form.append(divDesc, divValor, divFecha, divEtiquetas, botonEnvio);

// Manejador de eventos del formulario de creación
form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    let desc = evento.target.elements.descripcion.value;
    let valor = parseFloat(evento.target.elements.valor.value);
    let fecha = evento.target.elements.fecha.value;
    let etiquetas = evento.target.elements.etiquetas.value.split(" ");
    console.log(etiquetas);
    let nuevoGasto = new gestPresupuesto.CrearGasto(desc, valor, fecha, ...etiquetas);
    gestPresupuesto.anyadirGasto(nuevoGasto);
    // Repintamos
    pintarGastosWeb();
});

divForm.append(form);


// Clase para el elemento personalizado <mi-gasto>
class MiGasto extends HTMLElement {
    constructor() {
	super();
    }

    connectedCallback() {
	// Creamos el Shadow DOM
	const shadow = this.attachShadow({mode: 'open'});

	// Cargamos la plantilla
	let plantilla = document.getElementById('gastoPlantilla'); // Elemento <template>
	let plantillaContenido = plantilla.content; // Contenido de la plantilla (nodo tipo 'DocumentFragment')

	// Se añade al Shadow DOM una COPIA de la plantilla
	shadow.append(plantillaContenido.cloneNode(true));

	// Datos
	shadow.querySelector(".gasto-descripcion").textContent = this.gasto.descripcion;
	shadow.querySelector(".gasto-valor").textContent = this.gasto.valor;
	shadow.querySelector(".gasto-fecha").textContent = new Date(this.gasto.fecha).toISOString().substring(0,10);
	shadow.querySelector(".gasto-etiquetas").textContent = this.gasto.etiquetas;

	//Formulario de edición
	let formEdicion = shadow.querySelector("form");

	// Botón editar
	let botonEditar = shadow.querySelector(".gasto-editar-formulario");
	botonEditar.addEventListener("click", (evento) => {
	    // Rellenamos el formulario de edición con los datos del objeto 'gasto'
	    formEdicion.elements.descripcion.value = this.gasto.descripcion;
	    formEdicion.elements.valor.value = this.gasto.valor;
	    formEdicion.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);
	    formEdicion.elements.etiquetas.value = this.gasto.etiquetas.join(",");

	    // Mostramos el formulario de edición
	    formEdicion.classList.toggle("oculto");
	});

	// Botón cancelar
	let botonCancelar = shadow.getElementById("cancelar");
	botonCancelar.addEventListener("click", (evento) => {
	    // Ocultamos el formulario de edición
	    formEdicion.classList.toggle("oculto");
	});

	// Botón borrar
	let botonBorrar = shadow.querySelector(".gasto-borrar");
	botonBorrar.addEventListener("click", (evento) => {
	    // Confirmación
	    if (confirm("¿Seguro que desea borrar?")) {
		// Accedemos al gasto asociado y lo borramos
		gestPresupuesto.borrarGasto(this.gasto.id);

		// Repintamos
		pintarGastosWeb();

	    }
	});

	// Botón enviar (actualizamos datos de objeto 'gasto')
	formEdicion.addEventListener("submit", (evento) => {
	    this.gasto.actualizarDescripcion(evento.target.elements.descripcion.value);
	    // ¡¡Convertimos a número!!
	    this.gasto.actualizarValor(Number(evento.target.elements.valor.value));
	    this.gasto.actualizarFecha(evento.target.elements.fecha.value);
	    this.gasto.etiquetas = evento.target.elements.etiquetas.value.split(",");
	    // Repintamos
	    pintarGastosWeb();
	});
    }
}

//Funcion limpiar formulario
function limpiarFormulario () {
    //divDescripcion.innerText = "vacio";
    campoDesc.value = "";
    campoValor.value = "";
    campoFecha.value = "";
    campoEtiquetas.value = "";
    //console.log(divDescripcion);
    console.log(campoDesc.value);
}

// Registro del componente personalizado
customElements.define('mi-gasto', MiGasto);

// Capa para mostrar el listado de gastos
let divLista = document.getElementById("listado");
let divDescripcion = document.getElementById("descripcion");

// Función para repintar el listado de gastos
function pintarGastosWeb() {
    // Borramos la lista existente
    divLista.innerHTML = "";
    
        //Limpiamos el formulario
        limpiarFormulario();
    

    // Creamos el listado nuevo
    for (let gasto of gestPresupuesto.listarGastos()) {
	// Creamos un elemento <mi-gasto>
	let gastoEl = document.createElement("mi-gasto");

	// Pasamos el parámetro 'gasto' con el objeto 'gasto' correspondiente
	gastoEl.gasto = gasto;

	// Añadimos a la lista
	divLista.append(gastoEl);
    }

    // Mostramos nuevo total
    divTotal.innerHTML = `<h1>Total: ${gestPresupuesto.calcularTotalGastos()} €</h1>`;
}

// El programa muestra el listado de gastos al cargarse
pintarGastosWeb();
