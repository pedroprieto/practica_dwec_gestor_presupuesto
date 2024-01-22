import * as gestionPresupuesto from "./gestionPresupuesto.js";

// Función para mostrar un valor en un elemento HTML por su ID
function mostrarDatoEnId(idElemento, valor) {
  return (document.getElementById(idElemento).innerText = valor);
}

// Función para mostrar un gasto en un elemento HTML por su ID
function mostrarGastoWeb(idElemento, gasto) {
  let elemento = document.getElementById(idElemento);

  // crear Div .gasto
  let divGasto = document.createElement("div");
  divGasto.classList.add("gasto");
  elemento.appendChild(divGasto);

  //<div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
  let divDescripcion = document.createElement("div");
  divDescripcion.classList.add("gasto-descripcion");
  divDescripcion.textContent = "DESCRIPCIÓN DEL GASTO :" + gasto.descripcion;
  divGasto.appendChild(divDescripcion);

  //<div class="gasto-fecha">FECHA DEL GASTO</div>
  let divFecha = document.createElement("div");
  divFecha.classList.add("gasto-fecha");
  let fecha = new Date(gasto.fecha).toLocaleDateString(); // parse de timestamp a fecha corta
  divFecha.textContent = "FECHA DEL GASTO: " + fecha;
  divGasto.appendChild(divFecha);

  //<div class="gasto-valor">VALOR DEL GASTO</div>
  let divValor = document.createElement("div");
  divValor.classList.add("gasto-valor");
  divValor.textContent = gasto.valor;
  divGasto.appendChild(divValor);

  //<div class="gasto-etiquetas">
  let divEtiquetas = document.createElement("div");
  divEtiquetas.classList.add("gasto-etiquetas");
  divGasto.appendChild(divEtiquetas);

  //<span class="gasto-etiquetas-etiqueta"> en bucle
  for (let etiqueta of gasto.etiquetas) {
    //!for (const item of )

    let spanEtiquetas = document.createElement("span");
    spanEtiquetas.classList.add("gasto-etiquetas-etiqueta");
    spanEtiquetas.innerText = "Etiqueta :" + etiqueta;
    spanEtiquetas.addEventListener(`click`, new BorrarEtiquetasHandle(gasto, etiqueta)
    );
    divEtiquetas.appendChild(spanEtiquetas);
    //divGasto.appendChild(divEtiquetas);
  }
  elemento.appendChild(divGasto);

  //Botón editar

  let btnEditar = document.createElement(`button`);
  btnEditar.classList.add(`gasto-editar`);
  btnEditar.innerText = `Editar`;

  btnEditar.addEventListener(`click`, new EditarHandle(gasto)); // Asigna EditarHandle con el gasto correspondiente

  divGasto.appendChild(btnEditar); // agrego bton
  elemento.appendChild(divGasto); //agrego div

  //Botón borrar
  let btnBorrar = document.createElement(`button`);
  btnBorrar.classList = `gasto-borrar`;
  btnBorrar.innerText = `Borrar`;

  btnBorrar.addEventListener(`click`, new BorrarHandle(gasto)); // Asigna BorrarHandle con el gasto correspondiente

  divGasto.appendChild(btnBorrar); // agrego bton
  elemento.appendChild(divGasto); //agrego div

  // Botón borrar gasto API
  let btnBorrarApi = document.createElement("button");
  btnBorrarApi.classList.add("gasto-borrar-api");
  btnBorrarApi.innerText = "Borrar Api";

  let borrarApi = new borrarApiHandle();
  borrarApi.gasto = gasto;

  btnBorrarApi.addEventListener("click", borrarApi);
  divGasto.appendChild(btnBorrarApi); // agrego bton

  //Boton gasto-editar-formulario
  let btnEditarFormulario = document.createElement("button");
  btnEditarFormulario.classList.add("gasto-editar-formulario");
  btnEditarFormulario.innerText = "Editar Gasto formulario";

  btnEditarFormulario.gasto = gasto; //!referencia gasto para pasar al boton
  btnEditarFormulario.addEventListener("click", new EditarHandleFormulario(gasto)
  );
  divGasto.appendChild(btnEditarFormulario); // agrego bton
}

// Función para mostrar gastos agrupados en un elemento HTML por su ID
function mostrarGastosAgrupadosWeb(idElemento, periodo) {
  let agrup = gestionPresupuesto.agruparGastos(periodo); // resultado de agrupar el total de gastos por período temporal (ejecución de la función agruparGastos
  let divContenedor = document.getElementById(idElemento);

  let divAgrupacion = document.createElement("div");
  divAgrupacion.classList.add("agrupacion");
  divContenedor.appendChild(divAgrupacion);

  let h1 = document.createElement("h1");
  h1.textContent = `Gastos agrupados por ${periodo}`;
  divAgrupacion.appendChild(h1);

  for (let item of Object.entries(agrup)) { //! gstosAgrupados es un objeto
    /* 
     1- (let item in agrup)
     2- for (let item of Object.entries(agrup)) { // Utilizar Object.entries para obtener pares clave-valor
         let [clave, valor] = item; // Desestructurar el par clave-valor
          spanDatoClave.textContent = clave;
          spanDatoValor.textContent = valor;

    */
    let [clave, valor] = item; // Desestructurar el par clave-valor en un array

    //div de cada agrupacion
    let agrupacionDato = document.createElement("div");
    agrupacionDato.classList.add("agrupacion-dato");
    divAgrupacion.appendChild(agrupacionDato);

    // span con el nombre del grupo
    let spanDatoClave = document.createElement("span");
    spanDatoClave.classList.add("agrupacion-dato-clave");
    spanDatoClave.textContent = clave + " = "; // agrup.clave
    agrupacionDato.appendChild(spanDatoClave);

    // span con el valor del grupo
    let spanDatoValor = document.createElement("span");
    spanDatoValor.classList.add("agrupacion-dato-valor");
    spanDatoValor.textContent = valor;
    agrupacionDato.appendChild(spanDatoValor);

    divContenedor.appendChild(divAgrupacion);
  }
  divContenedor.appendChild(divAgrupacion);
}

//crear toda la estructura HTML que refleje los cambios realizados en el modelo de datos.
function repintar() {
  let presupuesto = gestionPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", presupuesto);

  let gastosTotales = gestionPresupuesto.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", gastosTotales);

  let calcularBalance = gestionPresupuesto.calcularBalance();
  mostrarDatoEnId("balance-total", calcularBalance);

  let listadoGastosCompletos = document.getElementById(
    "listado-gastos-completo"
  );
  listadoGastosCompletos.innerHTML = ""; //borro el listado

  let listGastos = gestionPresupuesto.listarGastos();
  listGastos.forEach((gasto) => {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  });
}

// manejadora de eventos del botón actualizarpresupuesto del código HTML.
function actualizarPresupuestoWeb() {
  let presupuesto = prompt(" Introduzca el nuevo  presupuesto");
  presupuesto = Number(presupuesto);

  gestionPresupuesto.actualizarPresupuesto(presupuesto);

  repintar();
}

function nuevoGastoWeb() {
  let descripcion = prompt("Añade la descripción del gasto:");

  let valor = prompt("Introduzca nuevo valor");
  valor = Number(valor);

  let fecha = prompt(" Introduzca nueva Fecha Año/Mes/Dia");
  fecha = Date.parse(fecha);

  let Etiquetas = prompt("Introduzca nueva Etiqueta.Si son varias separa por Coma"
  );
  let arrrayEtiquetas = Etiquetas.split(", "); //dividir la cadena de texto por una coma

  let nuevoGasto = new gestionPresupuesto.CrearGasto(
    descripcion,
    valor,
    fecha,
    arrrayEtiquetas
  ); // creo nuevogasto con array etiq
  gestionPresupuesto.anyadirGasto(nuevoGasto);

  repintar();
}

// funcion  objeto manejador de eventos para editar un gasto.basado en su prototipo, y referenciado al gasto que stamos editando
function EditarHandle(gasto) {
  this.gasto = gasto;

  this.handleEvent = function (event) {
    // Pedir al usuario la información
    let nuevaDescripcion = prompt(
      "Añade la descripción del gasto:",
      this.gasto.descripcion
    );

    let nuevoValor = prompt("Introduzca nuevo valor", this.gasto.valor);
    nuevoValor = Number(nuevoValor);

    let nuevaFecha = prompt(
      " Introduzca nueva Fecha aaaa/mm/dd ",
      this.gasto.fecha
    );
    nuevaFecha = Date.parse(nuevaFecha);

    let nuevasEtiquetas = prompt(
      "Introduzca nueva Etiqueta.Si son varias separadas por , Comas",
      this.gasto.etiquetas
    );
    let arrrayEtiquetas = nuevasEtiquetas.split(","); //dividir la cadena de texto por una coma

    // actualizar datos
    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarValor(nuevoValor);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.anyadirEtiquetas(arrrayEtiquetas);

    repintar();
  };
}
function BorrarHandle(gasto) {
  this.gasto = gasto;

  this.handleEvent = function (event) {
    gestionPresupuesto.borrarGasto(this.gasto.id);

    repintar();
  };
}

function BorrarEtiquetasHandle(gasto, etiqueta) {
  this.gasto = gasto;
  this.etiqueta = etiqueta;

  this.handleEvent = function (event) {
    this.gasto.borrarEtiquetas(this.etiqueta);

    repintar();
  };
}

let botonAnyadirForm = document.getElementById("anyadirgasto-formulario"); //localiza botn
botonAnyadirForm.addEventListener("click", nuevoGastoWebFormulario);

function nuevoGastoWebFormulario(event) {
  //alert( "evento gasto")
  event.target.disabled = true; // desactivo el botn par evitar añadir mas formularios

  let plantillaFormulario = document
    .getElementById("formulario-template")
    .content.cloneNode(true);

  let formulario = plantillaFormulario.querySelector("form"); //almacena el nodo formulario que vamos a crear.

  let controlesprincipales = document.getElementById("controlesprincipales"); // añado de la plantilla en sitio
  controlesprincipales.append(plantillaFormulario);

  formulario.addEventListener(`submit`, enviarGastoFormulario); //escuchadora submit/enviar formulario

  let cancelarFormulario = document.querySelector(`.cancelar`);
  cancelarFormulario.addEventListener(`click`, cancelarGastoFormulario); //escuchadora botn cancelar formulario


  /*/Boton enviar datos a API
  let btnEnvioApiForm = document.querySelector(`.gasto-enviar-api`);
  let manejadorEnvioApi = new envioDatosApiHandle();
  btnEnvioApiForm.addEventListener(`click`, manejadorEnvioApi); */
}

function enviarGastoFormulario(event) {
  //! event.target = submit formulario
  //Prevenir el envío del formulario
  event.preventDefault();

  //anadir gastos
  let descripcion = document.getElementById(`descripcion`).value;
  //!let descripcion = event.target.element.descripccion .value;         // acceso a traves de evento.target
  let valor = Number(document.getElementById("valor").value);
  let fecha = document.getElementById("fecha").value;
  let etiquetas = document.getElementById(`etiquetas`).value;
  let arrEtiquetas = etiquetas.split(`,`);

  // creo new gasto
  let nuevoGasto = new gestionPresupuesto.CrearGasto(
    descripcion,
    valor,
    fecha,
    arrEtiquetas
  );
  gestionPresupuesto.anyadirGasto(nuevoGasto);

  repintar();
  botonAnyadirForm.disabled = false; // activo boton de añadir
  alert("Gasto Añadido ");
}

function cancelarGastoFormulario(event) {
  //? event.target= evento.click en boton cancelar // .form = acceso al formulario // .remove()= elimino form
  event.target.form.remove();
  botonAnyadirForm.disabled = false; //activo el boton del formulario

  alert("Gasto Cancelado ");
}

function EditarHandleFormulario(gasto) {
  //! event.target = btn editar gasto
  this.gasto = gasto;

  this.handleEvent = function (event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    //alert("editando gasto individual ")
    event.target.parentElement.append(plantillaFormulario);

    event.target.disabled = true; // desativar boton editar

    formulario.elements.descripcion.value = this.gasto.descripcion;
    formulario.elements.valor.value = this.gasto.valor;
    formulario.elements.fecha.value = new Date(this.gasto.fecha)
      .toISOString()
      .substring(0, 10); //! fallaba fecha pòr el formato
    formulario.elements.etiquetas.value = this.gasto.etiquetas;

    ///manejadores de evento actualizar  y salir

    //escuchadora submit/enviarformulario
    let submitActualizarGasto = new actualizaGastoFormulario();
    submitActualizarGasto.gasto = this.gasto;
    formulario.addEventListener(`submit`, submitActualizarGasto);

    //escuchadora botn cancelarActualizacionGastoFormulario
    let cancelarFormulario = document.querySelector(`.cancelar`);
    let manejadorCancelar = new cancelarActualizarGasto();
    manejadorCancelar.btnEditarFormulario = event.target;
    cancelarFormulario.addEventListener(`click`, manejadorCancelar);

    // btn enviar datos API
    let btnEnviaApiForm = document.querySelector(`.gasto-enviar-api`);
    let enviarAPI = new envioDatosApiHandle();
    enviarAPI.gasto = this.gasto;
    btnEnviaApiForm.addEventListener(`click`, enviarAPI);


    //Boton actualizar datos API
    let btnActualizarApiForm = document.querySelector(`.gasto-actualizar-api`);
    let editarAPI = new actualizarDatosApiHandle();
    editarAPI.gasto = this.gasto;
    btnActualizarApiForm.addEventListener(`click`, editarAPI);



  };
}
function actualizaGastoFormulario() {
  this.handleEvent = function (event) {
    //Prevenir el envío del formulario
    event.preventDefault();

    //alert("editando GASTO individual form");
    //console.log(this.gasto);
    //console.log(event.target);

    this.gasto.descripcion = document.getElementById(`descripcion`).value;
    this.gasto.valor = Number(document.getElementById("valor").value);
    this.gasto.fecha = document.getElementById("fecha").value;

    let etiquetas = document.getElementById(`etiquetas`).value;
    let arrEtiquetas = etiquetas.split(`,`);
    this.gasto.etiquetas = arrEtiquetas;

    //console.log(this.gasto);

    repintar();
    alert("Gasto Actualizado ");
  };
}
function cancelarActualizarGasto() {
  this.handleEvent = function (event) {
    event.target.form.remove();
    this.btnEditarFormulario.disabled = false; // accedo por el manejadorCancelar.btnEditarFormulario = event.target;
    alert("Actualizar Gasto Cancelado");
  };
}
let filterGastos = new filtrarGastosWeb();
let filtrado = document.getElementById("formulario-filtrado");
filtrado.addEventListener("submit", filterGastos);

function filtrarGastosWeb() {
  this.handleEvent = function (event) {
    event.preventDefault();
    alert("editando filtro GASTOs ");
    alert(event.target);

    let plantillaFormulario = document.getElementById("filtrar-gastos");
    let formulario = plantillaFormulario.querySelector("form");

    let fechaDesde =
      formulario.elements["formulario-filtrado-fecha-desde"].value;
    let fechaHasta =
      formulario.elements["formulario-filtrado-fecha-hasta"].value;
    let valorMinimo =
      formulario.elements["formulario-filtrado-valor-minimo"].value;
    let valorMaximo =
      formulario.elements["formulario-filtrado-valor-maximo"].value;
    let descripcionContiene =
      formulario.elements["formulario-filtrado-descripcion"].value;
    let etiquetasTiene =
      formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

    if (etiquetasTiene != null) {
      etiquetasTiene =
        gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene);
    }

    let objeto = {
      fechaDesde,
      fechaHasta,
      valorMinimo,
      valorMaximo,
      descripcionContiene,
      etiquetasTiene,
    };

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let filtroGastos = gestionPresupuesto.filtrarGastos(objeto);

    for (let gasto of filtroGastos) {
      mostrarGastoWeb("listado-gastos-completo", gasto);
    }
  };
}

let btnGuardarGstos = document.getElementById("guardar-gastos");
btnGuardarGstos.addEventListener("click", guardarGastosWeb);
function guardarGastosWeb() {
  let listaGstos = gestionPresupuesto.listarGastos();

  let gastosListaString = JSON.stringify(listaGstos);

  localStorage.setItem("GestorGastosDWEC", gastosListaString); // Guardar la cadena JSON en el localstorage con la clave 'GestorGastosDWEC'
}

let btnCargarGstos = document.getElementById("cargar-gastos");
btnCargarGstos.addEventListener("click", cargarGastosWeb);
function cargarGastosWeb() {
  const gastosString = localStorage.getItem("GestorGastosDWEC"); //cadena JSON almacenada en el localstorage con clave 'GestorGastosDWEC'

  if (gastosString) {
    // Verificar si la cadena JSON existe en el localstorag

    const gastos = JSON.parse(gastosString); // Convertir la cadena JSON a un array de gastos

    gestionPresupuesto.cargarGastos(gastos); // Cargar los gastos utilizando la función cargarGastos

    repintar();
  } else {
    // Si no existe  clave en almacenamiento, cargarGastos con un array vacío

    gestionPresupuesto.cargarGastos([]);

    repintar();
  }
}

let btnCargarApi = document.getElementById("cargar-gastos-api");
btnCargarApi.addEventListener("click", cargarGastosApi);

async function cargarGastosApi() {
  let user = document.getElementById("nombre_usuario").value;
  const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;

  let resultado = await fetch(url);
  //alert("🚀🚀🚀🚀 Datos Cargados correctamente🚀🚀🚀🚀🚀");

  if (resultado.ok) {
    let datos = await resultado.json();
    gestionPresupuesto.cargarGastos(datos);
    repintar();
  } else {
    throw "Error en la solicitud de Api:" + resultado.statusText;
  }
}

function borrarApiHandle() {
  this.handleEvent = async function (event) {
    let user = document.getElementById("nombre_usuario").value;
    const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;

    let resultado = await fetch(url,
      { method: "DELETE" });
    if (resultado.ok) {
      alert("🚀🚀🚀🚀 Gasto borrado con exito🚀🚀🚀🚀", (resultado.ok))
      cargarGastosApi();
    } else {
      throw "Error en borrado del gasto:" + resultado.status;
    }
  };
}

function envioDatosApiHandle() {
  this.handleEvent = async function (event) {
    //console.log("🚀 ~ event:", event.target);
    //! EVENT.TARGET  = boton gasto enviar api

    //datos formulario  
    let formulario = event.target.closest('form'); //!busca el form mas cercano al evento.target
    let descripcionApi = formulario.elements.descripcion.value;
    let valorApi = formulario.elements.valor.value;
    let fechaApi = formulario.elements.fecha.value;
    let etiquetasApi = formulario.elements.etiquetas.value;
    valorApi = parseFloat(valorApi);
    fechaApi = +new Date(fechaApi);
    let arrayEtiquetas = etiquetasApi.split(",");

    let datosApi = {
      descripcion: descripcionApi,
      valor: valorApi,
      fecha: fechaApi,
      etiquetas: arrayEtiquetas,
    };

    let user = document.getElementById("nombre_usuario").value;
    const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;

    let respuesta = await fetch(url, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(datosApi)
    });

    if (respuesta.ok) {
      cargarGastosApi();
      alert(" 🚀🚀🚀🚀 Datos enviados 🚀🚀🚀🚀")

      //TODO cerrar el fomulario
    } else {
      alert("Error-HTTP: " + respuesta.status);
    }

  };
}


function actualizarDatosApiHandle() {
  this.handleEvent = async function (event) {
    console.log("🚀 ~ event:", event.target);

    //datos formulario
    let formulario = event.target.closest('form');
    let descripcionApi = formulario.elements.descripcion.value;
    let valorApi = formulario.elements.valor.value;
    let fechaApi = formulario.elements.fecha.value;
    let etiquetasApi = formulario.elements.etiquetas.value;
    valorApi = parseFloat(valorApi);
    fechaApi = +new Date(fechaApi);
    let arrayEtiquetas = etiquetasApi.split(",");

    let datosApi = {
      descripcion: descripcionApi,
      valor: valorApi,
      fecha: fechaApi,
      etiquetas: arrayEtiquetas,
    };

    let user = document.getElementById("nombre_usuario").value;
    const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;

    let respuesta = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(datosApi),
    })

    if (respuesta.ok) {
      cargarGastosApi();
      alert("Datos Actualizados")

      //TODO cerrar el fomulario
    } else {
      alert("Error-HTTP: " + respuesta.status);
    }

  };
}


export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb,
  repintar,
  actualizarPresupuestoWeb,
  nuevoGastoWeb,
  nuevoGastoWebFormulario,
  EditarHandle,
  BorrarEtiquetasHandle,
  EditarHandleFormulario,
  cargarGastosApi,
};
