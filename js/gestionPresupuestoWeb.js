import * as gesPres from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);

    if(elemento) {
        return elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {

    const elemento = document.getElementById(idElemento);

    if(elemento){

        /*Primero creo el elmento div con createElemt....
        y luego con classList creo la clase gasto, y lo agrego!*/ 
        const contenidoGasto = document.createElement('div');
        contenidoGasto.classList.add('gasto');

        /*Creo el elemento div, le agrego la clase gasto-descrpcion
        una vez creada el elemento y la clase, le agrego el contendio
        que seria la descripcion del gasto en este caso*/ 
        const divGastoDescripcion = document.createElement('div');
        divGastoDescripcion.classList.add('gasto-descripcion');
        divGastoDescripcion.textContent = gasto.descripcion;
        contenidoGasto.appendChild(divGastoDescripcion);

        const divFecha = document.createElement('div');
        divFecha.classList.add('gasto-fecha');
        divFecha.textContent = gasto.fecha;
        contenidoGasto.appendChild(divFecha);

        const divValorGasto = document.createElement('div');
        divValorGasto.classList.add('gasto-valor')
        //Le agrego el signo euro, ya que en un video dijo que lo agregemos si no daria error
        //No se si en esta parte daria igual, pero lo agrego
        divValorGasto.textContent = gasto.valor + '€';
        contenidoGasto.appendChild(divValorGasto);

        const divGastoEtiquetas = document.createElement('div');
              divGastoEtiquetas.classList.add('gasto-etiquetas');
              contenidoGasto.appendChild(divGastoEtiquetas);

        if(gasto.etiquetas && Array.isArray(gasto.etiquetas)){

            for(const etique of gasto.etiquetas) {
                const spanEtiquetas = document.createElement('span');
                spanEtiquetas.classList.add('gasto-etiquetas-etiqueta');
                spanEtiquetas.textContent = etique;

                let borrarEtiquetaMan = new BorrarEtiquetasHandle();
                borrarEtiquetaMan.gasto = gasto;
                borrarEtiquetaMan.etique = etique;
                spanEtiquetas.addEventListener('click', borrarEtiquetaMan);
                divGastoEtiquetas.appendChild(spanEtiquetas);
            }

            let botonEditar = document.createElement("button");
	              botonEditar.classList.add("gasto-editar");
	              botonEditar.type = "button";
	              botonEditar.textContent = "Editar";

            let editarMan = new EditarHandle();
                editarMan.gasto = gasto;

                botonEditar.addEventListener('click' , editarMan);
                contenidoGasto.appendChild(botonEditar);


            let botonBorrar = document.createElement("button");
                botonBorrar.classList.add("gasto-borrar");
                botonBorrar.type = "button";
                botonBorrar.textContent = "Borrar";

            let borrarMan = new BorrarHandle();
                borrarMan.gasto = gasto;

                botonBorrar.addEventListener('click', borrarMan);
                contenidoGasto.appendChild(botonBorrar);


                let botonFormulario = document.createElement('button');
                    botonFormulario.classList.add('gasto-editar-formulario');
                    botonFormulario.type = "button";
                    botonFormulario.textContent = "Editar Formulario";

                let botonForm = new EditarHandleFormulario();
                    botonForm.gasto = gasto;

                    botonFormulario.addEventListener('click', botonForm);
                    contenidoGasto.appendChild(botonFormulario);
        }
        elemento.appendChild(contenidoGasto);

    }

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        const divAgrupacion = document.createElement('div');
        divAgrupacion.classList.add('agrupacion');
  
        const h1Periodo = document.createElement('h1');
        h1Periodo.textContent = 'Gastos agrupados por ' + periodo;
        divAgrupacion.appendChild(h1Periodo);
  
        for (const clave in agrup) {
            if (agrup.hasOwnProperty(clave)) {
                const divDato = document.createElement('div');
                divDato.classList.add('agrupacion-dato');
  
                const spanClave = document.createElement('span');
                spanClave.classList.add('agrupacion-dato-clave');
                spanClave.textContent = clave;
                divDato.appendChild(spanClave);
  
                const spanValor = document.createElement('span');
                spanValor.classList.add('agrupacion-dato-valor');
                spanValor.textContent = agrup[clave];
                divDato.appendChild(spanValor);
  
                divAgrupacion.appendChild(divDato);
            }
        }
  
        elemento.appendChild(divAgrupacion);
    }
  }

  function repintar(){

    const presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', presupuesto);
  

    const totalGastos = gestionPresupuesto.calcularTotalGastos();
    const balanceTotal = gestionPresupuesto.calcularBalance();

    mostrarDatoEnId('gastos-totales', totalGastos);
    mostrarDatoEnId('balance-total', balanceTotal);
  
    let listado = document.getElementById('listado-gastos-completo'); 
  
  
    listado.innerHTML = ""; 

    const listadoGastos = gestionPresupuesto.listarGastos(); // Declaración e inicialización de listadoGastos
     listadoGastos.forEach((gasto) => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
     });
  }

  function actualizarPresupuestoWeb(){
    let presupuestoWeb = prompt('Actualiza el presupuesto: ', 0); 
    presupuestoWeb = parseFloat(presupuestoWeb); 
    gestionPresupuesto.actualizarPresupuesto(presupuestoWeb); 
    repintar(); 
}

function nuevoGastoWeb() {

	let descripcion = prompt("Introduce la descripción del gasto")
	let valor = prompt("Introduce el valor del gasto")
	let fecha = prompt("Introduce la fecha del gasto")
	let etiquetas = prompt("Introduce las etiquetas separadas por comas (,)")


	valor = parseFloat(valor)

	let arrayEtiquetas = etiquetas.split(", ")

	let nuevoGasto = new gesPres.CrearGasto(descripcion, valor, fecha, arrayEtiquetas)

	gestionPresupuesto.anyadirGasto(nuevoGasto)

	repintar()
}

function EditarHandle() {
	this.handleEvent = function (event) {

		let descripcion = prompt("Introduce la descripción del gasto", this.gasto.descripcion)
		let valor = prompt("Introduce el valor del gasto", this.gasto.valor)
		let fecha = prompt("Introduce la fecha del gasto en formato yyyy-mm-dd", new Date(this.gasto.fecha).toISOString().slice(0, 10))
		let etiquetas = prompt("Introduce las etiquetas separadas por comas (,)", this.gasto.etiquetas.join(", "))

		valor = parseFloat(valor)


		let arrayEtiquetas = etiquetas.split(", ")


		this.gasto.actualizarDescripcion(descripcion)
		this.gasto.actualizarValor(valor)
		this.gasto.actualizarFecha(fecha)


		this.gasto.borrarEtiquetas(...this.gasto.etiquetas)


		this.gasto.anyadirEtiquetas(...arrayEtiquetas)

		repintar()
	}
}

function BorrarHandle() {
	this.handleEvent = function (e) {

		let idBorrar = this.gasto.id

		gestionPresupuesto.borrarGasto(idBorrar)
		repintar()
	}
}

function BorrarEtiquetasHandle() {
	this.handleEvent = function (event) {
		this.gasto.borrarEtiquetas(this.etiqueta)

		repintar()
	}
}

function nuevoGastoWebFormulario() {
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    
  var formulario = plantillaFormulario.querySelector("form");

  let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
	let botonCancelar = formulario.querySelector("button.cancelar");

  formulario.addEventListener('submit', manejadorEvento);

  let botonCancelarMan = new CancelarFormularioHandle(formulario, botonAnyadirGastoFormulario);
  botonCancelar.addEventListener('click', botonCancelarMan);

  botonAnyadirGastoFormulario.setAttribute('disabled', '');

  let divControles = document.getElementById("controlesprincipales")
	    divControles.appendChild(plantillaFormulario)
}

function manejadorEvento(event) {

  event.preventDefault();

  var newGasto = event.currentTarget;

  let descrip = newGasto.descripcion.value;
  let valor = parseFloat(newGasto.valor.value);
  let fecha = newGasto.fecha.value;
  let etiquetas = newGasto.etiqueta.value;

  let arrEtiquetas = etiquetas.split(", ");

  let gastoNuevo = new gestionPresupuesto.CrearGasto(descrip,valor,fecha,arrEtiquetas)
  gestionPresupuesto.anyadirGasto(gastoNuevo);
  repintar();

  let botonGastoFormu = document.getElementById('anyadirgasto-formulario');
  botonGastoFormu.removeAttribute('disabled');
}

function CancelarFormularioHandle(formulario, botonAnyadir) {
	// Creamos el handleEvent que se ejecutará al hacer click en el botón cancelar
	this.handleEvent = function () {
		// Eliminamos el formulario
		formulario.remove()
		// Activamos el botón de añadir gasto eliminando el atributo disabled
		botonAnyadir.removeAttribute("disabled")
	}
}

function EditarHandleFormulario(gasto) {

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
		var formulario = plantillaFormulario.querySelector("form");

	this.gasto = gasto
	this.handleEvent = function (event) {

		let botonEditarFormulario = event.target;
		botonEditarFormulario.setAttribute("disabled", "");

	
		let descripcion = this.gasto.descripcion;
		let valor = this.gasto.valor;
		let fecha = new Date(this.gasto.fecha).toISOString().slice(0, 10);
		let etiquetas = this.gasto.etiquetas.join(", ") ;

		
		let divGasto = event.target.parentNode ;
		divGasto.appendChild(plantillaFormulario);

		formulario.querySelector("#descripcion").value = descripcion;
		formulario.querySelector("#valor").value = valor;
		formulario.querySelector("#fecha").value = fecha;
		formulario.querySelector("#etiquetas").value = etiquetas;

		let botonCancelar = formulario.querySelector("button.cancelar");
		let manejadorCancelar = new CancelarFormularioHandle(formulario, botonEditarFormulario);
		botonCancelar.addEventListener("click", manejadorCancelar);
	}
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    CancelarFormularioHandle,
    EditarHandleFormulario
  };