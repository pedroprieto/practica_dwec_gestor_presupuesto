//Este fichero contendrá las utilidades necesarias para mostrar los datos de la aplicación
//Importar libreria de gestionPresupuesto
import * as gestPresupuesto from './gestionPresupuesto.js';

//Funciones
//Función de dos parámetros que se encargará de añadir dentro del elemento HTML 
function mostrarDatoEnId (idElemento , gasto ) {
    // Buscar el elemento
    let elemento = document.getElementById(idElemento);
    //Insertar el valor delemento buscado
    elemento.innerText = gasto;

}

//Función de dos parámetros que se encargará de añadir dentro del elemento HTML
function mostrarGastoWeb (idElemento , gasto) {
    //Formato <div class="gasto">
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    //<div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.innerText = gasto.descripcion;

    //<div class="gasto-fecha">FECHA DEL GASTO</div> 
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    //fecha en formato localizado 
    let fechaString = new Date (gasto.fecha);
    divFecha.innerText = fechaString.toLocaleDateString();

    //<div class="gasto-valor">VALOR DEL GASTO</div> 
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerText = gasto.valor;

    //<div class="gasto-etiquetas">
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    //<span class="gasto-etiquetas-etiqueta">
    for ( let eti of gasto.etiquetas) {
        let spanEti = document.createElement("span");
        spanEti.className = "gasto-etiquetas-etiqueta";
        spanEti.innerText = eti;
        //Crear un nuevo objeto a partir de la función constructora BorrarEtiquetasHandle.
        let objetoEtiqueta = new BorrarEtiquetasHandle();
        //Establecer la propiedad gasto del objeto creado al objeto gasto
        objetoEtiqueta.gasto = gasto;
        //Establecer la propiedad etiqueta del objeto creado al texto de la etiqueta que se esté procesando
        objetoEtiqueta.etiqueta = eti;
        //Añadir el objeto recién creado como objeto manejador del evento click al span de la etiqueta.
        spanEti.addEventListener("click" , objetoEtiqueta);
        //Añadir etiquetas al div
        divEtiquetas.append(spanEti);
    }

    //Modificación de la función mostrarGastoWeb
    //Botón editar: Crear un botón 
    let botonEditar = document.createElement("button");
    //con clase gasto-editar.
    botonEditar.className = "gasto-editar";
    //tipo button (<button type="button">) 
    botonEditar.type = "button";
    //con texto Editar 
    botonEditar.innerText = "Editar";
    //Crear un nuevo objeto a partir de la función constructora EditarHandle.
    let objetoBotonEditar = new EditarHandle();
    //Establecer la propiedad gasto del objeto creado al objeto gasto
    objetoBotonEditar.gasto = gasto;
    //Añadir el objeto recién creado como objeto manejador del evento click al botón Editar recién creado.
    botonEditar.addEventListener("click", objetoBotonEditar);
    //Añadir el botón al DOM a continuación de las etiquetas en componer DIVS

    //Botón borrar: Crear un botón 
    let botonBorrar = document.createElement("button");
    //con clase gasto-borrar.
    botonBorrar.className = "gasto-borrar";
    //de tipo button (<button type="button">) 
    botonBorrar.type = "button";
    //con texto Borrar 
    botonBorrar.innerText = "Borrar";
    //Crear un nuevo objeto a partir de la función constructora BorrarHandle.
    let objetoBotonBorrar = new BorrarHandle();
    //Establecer la propiedad gasto del objeto creado al objeto gasto
    objetoBotonBorrar.gasto = gasto;
    //Añadir el objeto recién creado como objeto manejador del evento click al botón Borrar recién creado.
    botonBorrar.addEventListener("click", objetoBotonBorrar);
    //Añadir el botón al DOM a continuación del botón Editar.
    //Boton Borra API Este botón tendrá un manejador de eventos 
    let botonBorrarGastoApi = document.createElement("button");
    botonBorrarGastoApi.className = "gasto-borrar-api";
    botonBorrarGastoApi.type = "button";
    botonBorrarGastoApi.innerHTML = "Borrar (API)";
    //Manejador del evento
    let manejadorBotonBorrarApi = new borrarHandleApi();
    manejadorBotonBorrarApi.gasto = gasto;
    botonBorrarGastoApi.addEventListener('click', manejadorBotonBorrarApi );
  
    //<button class="gasto-editar-formulario" type="button">Editar (formulario)</button>
    let botonEditarFormulario =document.createElement("button");
    botonEditarFormulario.className = "gasto-editar-formulario";
    botonEditarFormulario.type = "button";
    botonEditarFormulario.innerText = "Editar (formulario)";
    //Relaccionar al manejador
    let objetoEditarFormulario = new EditarHandleFormulario();
    objetoEditarFormulario.gasto = gasto;
     botonEditarFormulario.addEventListener('click', objetoEditarFormulario);


    //Componer los divs
    divGasto.append(divDescripcion, divFecha,divValor, divEtiquetas, botonEditar, botonBorrar, 
       botonEditarFormulario, botonBorrarGastoApi);

    //Añadir el div contenedor
    let divContenedor = document.getElementById(idElemento);
    divContenedor.append(divGasto);

}

//Función de tres parámetros que se encargará de crear una estructura HTML para el objeto 
function mostrarGastosAgrupadosWeb (idElemento , agrup , periodo) {
    //idElemento  Hará referencia al id del elemento HTML donde se insertará
    //<div class="agrupacion">
    let divAgrupacion = document.createElement("div");
    divAgrupacion.className ="agrupacion";
    //<h1>Gastos agrupados por mes</h1>
    let h1Periodo = document.createElement("h1");
    h1Periodo.innerHTML = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1Periodo);

    //agrup contendrá el resultado de agrupar el total de gastos por período temporal 
    //<div class="agrupacion-dato">
    for ( let dato of Object.keys(agrup)) {
        let divAgrupDato = document.createElement("div");
        divAgrupDato.className ="agrupacion-dato";
        //<span class="agrupacion-dato-clave">2021-10</span>
        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.innerText = dato;
        divAgrupDato.append(spanClave);
        //<span class="agrupacion-dato-valor">5</span>
        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.innerText = agrup[dato];
        divAgrupDato.append(spanValor);
        divAgrupacion.append(divAgrupDato);

    }

    //Periodo de agrupación segun periodo pasado
    let agrupacionPeriodo = document.getElementById(idElemento);
    agrupacionPeriodo.append(divAgrupacion);
}

    //Crear una función repintar para actualizar la página
    function repintar () {
        //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
        mostrarDatoEnId("presupuesto" , gestPresupuesto.mostrarPresupuesto());
        
        //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
        mostrarDatoEnId("gastos-totales" , gestPresupuesto.calcularTotalGastos());

        //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
        mostrarDatoEnId("balance-total", gestPresupuesto.calcularBalance());

        /*Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información.
        Puedes utilizar innerHTML para borrar el contenido de dicha capa.*/
        document.getElementById('listado-gastos-completo').innerHTML = "";

        //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
        for (let gastos of gestPresupuesto.listarGastos()){
            mostrarGastoWeb('listado-gastos-completo', gastos);
        }
    }
    //Función actualizarPresupuestoWeb
    function actualizarPresupuestoWeb () {
        //Pedir al usuario que introduzca un presupuesto mediante un prompt.
        let nuevoPresupuesto = Number(prompt("¿Cual es tú nuevo presupuesto?"));
        //Actualicar el presupuesto (función actualizarPresupuesto)
        gestPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
        //Llamar a la función repintar 
        repintar();

    }
    // manejadora del evento click del botón actualizarpresupuesto mediante addEventListener
    document.getElementById("actualizarpresupuesto").addEventListener("click" , actualizarPresupuestoWeb);

    //Función nuevoGastoWeb
    function nuevoGastoWeb () {
        //Pedir al usuario la información necesaria para crear un nuevo gasto
        let nuevaDescripcion = prompt ("Descripción del gasto?");
        //valor Convertir el valor a número
        let nuevoValor = Number(prompt("Valor del gasto:"));
        //La fecha vendrá dada en formato internacional (yyyy-mm-dd)
        let nuevaFecha = prompt("Introduce la fecha en formato yyyy-mm-dd");
        //Convertir la cadena de texto de etiquetas devuelta por prompt a un array.
        let nuevaEtiqueta = prompt("Etiquetas del gasto separadas por coma").split(",");
        //Crear un nuevo gasto (función crearGasto)
        let nuevoGasto = new gestPresupuesto.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevaEtiqueta);
        //Añadir el gasto a la lista (función anyadirGasto).
        gestPresupuesto.anyadirGasto(nuevoGasto);
        //Llamar a la función repintar
        repintar();
        
    }
        /*Una vez definida la función, se añadirá como manejadora del evento click del botón anyadirgasto mediante addEventListener.
         Para ello habrá que obtener el elemento botón correspondiente previamente.*/
        document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);

        //Función EditarHandle Esta función se utilizará como objeto manejador de eventos
        // para editar un gasto.
        function EditarHandle () {
            //definirá exclusivamente un método llamado handleEvent
            this.handleEvent = function (event) {
            //Pedir al usuario la información necesaria para editar el gasto
            let editarDescrpcion = prompt("Edita la descripción:");
            let editarValor = Number(prompt("Nuevo valor:"));
            let editarFecha = prompt("Edita la fecha del gasto yyyy-mm-dd");
            let editarEtiquetas = prompt("Edita las etiquetas por comas").split(",");
            //Actualizar las propiedades del gasto (disponible mediante this.gasto)
            this.gasto.actualizarDescripcion(editarDescrpcion);
            this.gasto.actualizarValor(editarValor);
            this.gasto.actualizarFecha(editarFecha);
            this.gasto.anyadirEtiquetas(...editarEtiquetas);

            //Llamar a la función repintar
            repintar();
            }
        }
        //Función BorrarHandle Esta función se utilizará como objeto manejador 
        //de eventos para borrar un gasto
        function BorrarHandle () {
            //definirá exclusivamente un método llamado handleEvent.
            this.handleEvent = function (event) {
                //Borrar el gasto asociado. Para ello utilizará la función borrarGasto
                // y como parámetro utilizará el id del gasto
                gestPresupuesto.borrarGasto(this.gasto.id);
                //Llamar a la función repintar
                repintar();
            }
        }

        //Función BorrarEtiquetasHandle Esta función se utilizará como objeto manejador
        //de eventos para borrar etiquetas de un gasto
        function BorrarEtiquetasHandle () {
            //definirá exclusivamente un método llamado handleEvent
            this.handleEvent = function (event) {
                //Borrar la etiqueta seleccionada del gasto asociado. Para ello utilizará la función 
                //borrarEtiquetas del gasto asociado (this.gasto) y como parámetro utilizará 
                //la etiqueta seleccionada, disponible en this.etiqueta.
                this.gasto.borrarEtiquetas(this.etiqueta);
                //Llamar a la función repintar
                repintar();
            }
        }

        //Crear y modificar gastos mediante formularios sin prompt
        function nuevoGastoWebFormulario (event) {
            //Crear una copia del formulario web definido en la plantilla HTML.
            let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
            //Acceder al elemento <form> dentro de ese fragmento de documento
            var formulario = plantillaFormulario.querySelector("form");
            //Desde este momento, la variable formulario almacena el nodo formulario que vamos a crear.

            //Crear un manejador de evento para el evento submit del formulario.
            formulario.addEventListener("submit", enviarFormulario);
            
            //desactivado al activar el formulario el boton añadir
            event.target.disabled = true;
            //Crear un manejador de evento para el evento click del botón Cancelar
            let botonCancelarFormulario = plantillaFormulario.querySelector("button.cancelar");
            //definir una función constructora que implemente handleEvent
            botonCancelarFormulario.addEventListener("click", cerrarFormulario);
            //Crear boton enviar API en formulario y manejador
            let botonEnviarGastoApi = plantillaFormulario.querySelector("button.gasto-enviar-api");
            botonEnviarGastoApi.addEventListener('click', enviarGastoFormularioApi);
            //añadir el fragmento de documento
            let controles = document.getElementById("controlesprincipales");
            controles.append(plantillaFormulario);

        }
        let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
        botonAnyadirFormulario.addEventListener("click", nuevoGastoWebFormulario);

        //Deberás crear una función manejadora de este evento enviarFormulario
        function enviarFormulario (event) {
            //Prevenir el envío del formulario mediante event.preventDefault()
            event.preventDefault();
            //Crear un nuevo gasto con la información de los campos del formulario
            //Errores, valor decimal y array de etiquetas
            let valorGasto = event.target.valor.value;
            valorGasto = parseFloat(valorGasto);
            let etiquetas = event.target.etiquetas.value;
            let arrayEtiquetas = etiquetas.split(",");
            let nuevoGastoFormulario = new gestPresupuesto.CrearGasto(event.target.descripcion.value, 
              valorGasto, event.target.fecha.value, ...arrayEtiquetas);
              //Añadir el gasto a la lista de gastos.
            gestPresupuesto.anyadirGasto(nuevoGastoFormulario);
            
            //Activar (eliminar atributo disabled) el botón anyadirgasto-formulario
            let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
            botonAnyadirFormulario.addEventListener("click", nuevoGastoFormulario);
            botonAnyadirFormulario.disabled = false;
            //Quitar formulario 
            event.target.remove();
            //Llamar a la función repintar.
            repintar();

        }
        //Crear un manejador de evento para el evento click del botón Cancelar del formulario
        function manejadorBotonCancelarFormulario () {
            //La variable formulario, para que al pulsar en cancelar se elimine el formulario.
            this.handleEvent = function(event) {
                event.currentTarget.parentNode.remove();
                //al pulsar en cancelar se vuelva a activar dicho botón
                this.botonEditar.disabled = false;

            }
        }
        //funcio EditarHandleFormulario
        function EditarHandleFormulario () {
            //definirá exclusivamente un método llamado handleEvent
            this.handleEvent = function (event) {
                //realizará las mismas tareas que nuevoGastoWebFormulario
             //Crear una copia del formulario web definido en la plantilla HTML.
             let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
             //Acceder al elemento <form> dentro de ese fragmento de documento
             var formulario = plantillaFormulario.querySelector("form");
             //Desde este momento, la variable formulario almacena el nodo formulario que vamos a crear.
            //El formulario debe quedar con los campos rellenos al abrirse 
            formulario.elements.descripcion.value = this.gasto.descripcion;
            formulario.elements.valor.value = this.gasto.valor;
            formulario.elements.fecha.value = this.gasto.fecha;
            formulario.elements.etiquetas.value = this.gasto.etiquetas;
            //añadir el formulario al final del botón editar
            event.currentTarget.after(formulario);
            //anular boton 
            let botonEditarFormulario = event.currentTarget;
            botonEditarFormulario.disabled = true;
            //botón submit
            let botonSubmitFormulario = new manejadorSubmitEditarFormulario();
            botonSubmitFormulario.gasto = this.gasto;
            formulario.addEventListener('submit', botonSubmitFormulario);
             //botón cancelar
             let botonCancelarFormulario = formulario.querySelector("button.cancelar");
             let cancelarFormulario = new manejadorBotonCancelarFormulario();
             cancelarFormulario.botonEditar = event.currentTarget; // Pasas una referencia al botón de editar
             cancelarFormulario.className = "button.cancelar"
             botonCancelarFormulario.addEventListener('click', cancelarFormulario);
             //Boton API
            let botonEditarGastoApi = new EditarApiFormulario();
            botonEditarGastoApi.gasto = this.gasto;
            let EditarApi = formulario.querySelector("button.gasto-enviar-api");
            EditarApi.addEventListener("click", botonEditarGastoApi);

            }
        }
        function manejadorSubmitEditarFormulario() {
            this.handleEvent = function(event) {
                //prevenir funcion por defecto
                event.preventDefault();
                //Limpiar el array de etiquetas
                this.gasto.etiquetas = [];
                
                let formulario = event.currentTarget;
                let descripcion = formulario.elements.descripcion.value;
                let valor = formulario.elements.valor.value;
                let fecha =  formulario.elements.fecha.value;
                let etiquetas = formulario.elements.etiquetas.value; //separar array
                let sepEtiquetas = etiquetas.split(',');
                //Actualizar los datos
                this.gasto.actualizarDescripcion(descripcion);
                this.gasto.actualizarValor(parseFloat(valor));
                this.gasto.actualizarFecha(fecha);
                this.gasto.anyadirEtiquetas(...sepEtiquetas);
                
                repintar();
            }
        }
        function cerrarFormulario (event) {
            //cerrar formulario 
            let botonCancelar = event.currentTarget;
            botonCancelar.disabled = true;
            let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
            botonAnyadirFormulario.disabled = false;
            event.currentTarget.parentNode.remove();
        }
        function filtrarGastosWeb () {
            this.handleEvent = function(event) {
                //Prevenir el envio
                event.preventDefault();
                //Recoger los datos del formulario formulario-filtrado.
                let formularioFiltrado = event.currentTarget;
                let descripcion = formularioFiltrado.elements['formulario-filtrado-descripcion'].value;
                let valorMinimo = formularioFiltrado.elements['formulario-filtrado-valor-minimo'].value;
                let valorMaximo = formularioFiltrado.elements['formulario-filtrado-valor-maximo'].value;
                let fechaDesde = formularioFiltrado.elements['formulario-filtrado-fecha-desde'].value;
                let fechaHasta = formularioFiltrado.elements['formulario-filtrado-fecha-hasta'].value;
                let etiquetas = formularioFiltrado.elements['formulario-filtrado-etiquetas-tiene'].value;
                //Pasar valores de string a numeros
                valorMinimo = parseFloat(valorMinimo);
                valorMaximo = parseFloat(valorMaximo);
                //llamar a la función transformarListadoEtiquetas para que devuelva un array de etiquetas válidas.
                if(etiquetas) {
                    etiquetas = gestPresupuesto.transformarListadoEtiquetas(etiquetas);
                }
                //Crear el objeto necesario para llamar a la función filtrarGastos 
                let filtradoFormulario = gestPresupuesto.filtrarGastos({fechaDesde : fechaDesde, 
                fechaHasta : fechaHasta, valorMinimo : valorMinimo, valorMaximo : valorMaximo, 
                descripcionContiene : descripcion, etiquetasTiene : etiquetas});
                //Actualizar la lista de gastos filtrados en la capa listado-gastos-completo
                document.getElementById('listado-gastos-completo').innerHTML = "";
                for (let gastos of filtradoFormulario) 
                {
                    mostrarGastoWeb('listado-gastos-completo', gastos);
                } 

            }
        }
        
        //deberás añadirla como manejadora del evento submit del formulario formulario-filtrado
        let filtradoFormulario = new filtrarGastosWeb();
        document.getElementById( "formulario-filtrado" ).addEventListener( "submit", filtradoFormulario );
            
        //Función guardarGastosWeb
        function guardarGastosWeb () {
            //manejadora de eventos del evento click del botón guardar-gastos.
            //Se encargará de guardar el listado de gastos
            this.handleEvent = function () {
                localStorage.GestorGastosDWEC = JSON.stringify(gestPresupuesto.listarGastos());
            }
        }
            let guardarGastosNavegador = new guardarGastosWeb();
            document.getElementById("guardar-gastos").addEventListener("click" , guardarGastosNavegador);


        //Función cargarGastosWeb
        function cargarGastosWeb () {
            //manejadora de eventos del evento click del botón cargar-gastos.
            //Se encargará de cargar el listado de gastos (función cargarGastos
            this.handleEvent = function () {
                let cargaGastosNavegador = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
                //Si no existe la clave en el almacenamiento, llamará a cargarGastos con un array vacío.
                if(!cargaGastosNavegador) {
                    gestPresupuesto.cargarGastos([]);
                }
                else {
                    gestPresupuesto.cargarGastos(cargaGastosNavegador);
                }
                //Una vez cargados los gastos deberá llamar a la función repintar
                repintar();

            }

        }
        let cargarGastosNavegador = new cargarGastosWeb();
        document.getElementById("cargar-gastos").addEventListener("click" , cargarGastosNavegador);
    
        //API funciones
        //Nueva función cargarGastosApi
        function cargarGastosApi () {
            // Se deberá crear la URL correspondiente utilizando el nombre de usuario que se haya introducido
            let nomUsuario = document.getElementById("nombre_usuario").value;
            //alert(nomUsuario);
            let cargarGastos = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nomUsuario}`
            //Peticion a la API
            if(nomUsuario != "")
            {
            fetch(cargarGastos)
                .then(response => response.json())
                .then(result => {
                    gestPresupuesto.cargarGastos(result);
                    repintar();
                })
                .catch(function(error) {
                    alert("Revisa los campos introducidos para subsanar el error.\n Error: " + error.message); 
                });   
            }
            else
            {
                alert("Es obligatorio el nombre de usuario");
            }

        }
        //manejadora de eventos del evento click del botón cargar-gastos-api.
        let botonGastosApi = document.getElementById("cargar-gastos-api");
        botonGastosApi.addEventListener("click", cargarGastosApi);

        //Manejador evento borrar API
        function borrarHandleApi () {

            this.handleEvent = function (evento) 
            {
                let nomUsuario = document.getElementById("nombre_usuario").value;
                //console.log(nombreUsuario);
                let gastoBorrar = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nomUsuario}/${this.gasto.gastoId}`;

                if (nomUsuario != "")
                {
                    fetch(gastoBorrar, {
                        method: "DELETE",
                        })
                    .then(function (response) {
                        if (response.ok) {
                            (cargarGastosApi())
                        } else {
                            alert("Error-HTTP: " + response.status);
                        }
                    })
                    .catch(function(error) {
                        alert("Revisa los campos introducidos para subsanar el error.\n Error:  " + error.message); 
                    });  
                }
                else
                {
                    alert("Es obligatorio el nombre de usuario");
                }
                
            }
        }
         //Funcion editar formulario api
    function EditarApiFormulario () {
        this.handleEvent = function (evento) 
        {
            var formulario = document.getElementById("platillaFormulario");
            //Mostrar los valores del gasto del formulario
            //console.log(formulario);
            let descripcionApi = formulario.elements.descripcion.value;
            let valorApi = formulario.elements.valor.value;
            let fechaApi = formulario.elements.fecha.value;
            let etiquetasApi = formulario.elements.etiquetas.value;
            valorApi = parseFloat(valorApi);
            let etiquetasApiSeparadas = etiquetasApi.split(',');
            let gastoNuevoApi = {
                descripcion : descripcionApi,
                valor : valorApi,
                fecha : fechaApi,
                etiquetas : etiquetasApiSeparadas,
    
            };
            let NomUsuario = document.getElementById("nombre_usuario").value;
            //console.log(usuario);
            let gastoEnviarApi = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${NomUsuario}/${this.gasto.gastoId}`;
            if (NomUsuario != "")
            {
                fetch(gastoEnviarApi, {
                method: 'PUT',
                headers: {
                   'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(gastoNuevoApi)
                })
                .then(function (response) {
                if (response.ok) {
                   (cargarGastosApi())
                } else {
                    alert("Error-HTTP: " + response.status);
                }
                })
                .catch(function(error) {
                    alert("Revisa los campos introducidos para subsanar el error.\nError:  "  + error.message); 
                });   
            }
            else
            {
                alert("Es obligatorio el nombre de usuario");
            }
        }

    }
        //Funcion formulario api
        function enviarGastoFormularioApi () {
            //Cargar formulario
            let formulario = document.querySelector("platillaFormulario");
            //Mostrar los valores del gasto del formulario
            let descripcionApi = formulario.elements.descripcion.value;
            let valorApi = formulario.elements.valor.value;
            let fechaApi = formulario.elements.fecha.value;
            let etiquetasApi = formulario.elements.etiquetas.value;
            valorApi = parseFloat(valorApi);
            let etiquetasApiSeparadas = etiquetasApi.split(',');
            let gastoNuevoApi = {
                descripcion : descripcionApi,
                valor : valorApi,
                fecha : fechaApi,
                etiquetas : etiquetasApiSeparadas,

            };
            let NomUsuario =document.getElementById("nombre_usuario").value;
            //console.log(usuario);
            let gastoEnviar = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${NomUsuario}`;
            if (NomUsuario != "")
            {
                fetch(gastoEnviar, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(gastoNuevoApi)
                })
                .then(function (response) {
                    if (response.ok) {
                        (cargarGastosApi())
                        //Quitar formulario 
                        formulario.remove();
                        //Activar boton Añadir gasto
                        let botonAnyadirFormulario = document.getElementById("anyadirgasto-formulario");
                        botonAnyadirFormulario.disabled = false;

                    } else {
                        alert("Error-HTTP: " + response.status);
                    }
                })
                .catch(function(error) {
                    alert("Revisa los campos introducidos para subsanar el error "  + error.message); 
                }); 
            }
            else
            {
                alert("Es obligatorio el nombre de usuario");
            } 

        }


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}