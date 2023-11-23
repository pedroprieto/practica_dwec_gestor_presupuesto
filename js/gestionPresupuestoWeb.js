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
        //Añadir etiquetas al div
        divEtiquetas.append(spanEti);
    }

    //Componer los divs
    divGasto.append(divDescripcion, divFecha,divValor, divEtiquetas);

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


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}