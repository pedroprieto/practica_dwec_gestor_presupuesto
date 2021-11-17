//Importar librería js/gestionPresupuesto.js
import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{   
    document.getElementById(idElemento).innerHTML = valor;
}

//Modificación de la función mostrarGastoWeb
function mostrarGastoWeb(idElemento, gasto)
{
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');

    div.className = "gasto";   
    div1.className = "gasto-descripcion";
    div2.className = "gasto-fecha";
    div3.className = "gasto-valor";
    div4.className = "gasto-etiquetas";

    div1.append(gasto.descripcion);
    div2.append(gasto.fecha);
    div3.append(gasto.valor);

    div.append(div1);
    div.append(div2);
    div.append(div3);
    div.append(div4);

    //Eventos para los span de etiquetas (no crearemos botón de borrar: el borrado se producirá si el usuario hace clic encima de una etiqueta):
    for (let etiqueta of gasto.etiquetas)
    {
        let span = document.createElement('span');
        span.className = "gasto-etiquetas-etiqueta";
        span.append(`${etiqueta},`);
        div4.append(span);
        
        //Igual que los otros dos manejadores:
        //Crear un nuevo objeto a partir de la función constructora BorrarEtiquetasHandle.
        let manejadorBorrarEtiq =  new BorrarEtiquetasHandle();

        //Establecer la propiedad gasto del objeto creado al objeto gasto (recuerda que el objeto gasto es un parámetro pasado a la función mostrarGastoWeb).
        manejadorBorrarEtiq.gasto = gasto;

        //Establecer la propiedad etiqueta del objeto creado al texto de la etiqueta que se esté procesando 
        //(seguramente este valor lo tendrás disponible dentro del bucle que se encarga de pintar un elemento span para cada etiqueta).
        manejadorBorrarEtiq.etiqueta = etiqueta;

        //Añadir el objeto recién creado como objeto manejador del evento click al span de la etiqueta.
        span.addEventListener("click", manejadorBorrarEtiq);
    }   

    let contenido = document.getElementById(idElemento);
    
    contenido.append(div);  

    /*Ejemplo tutoria 8 nov.
    Lo haces sobre nuevoGastoWeb en vez de mostrarGastoWeb como pide el ejercicio.

    let butEdit = document.createElement("button");
    butEdit.type="button";

    let manejadorEdit = new EditarHandle()
    //Aquí tengo disponible manejadorEdit.handleEvent()
    manejadorEdit.migasto = g;

    // El objeto manejadorEvent puede acceder a .migasto
    butEdit.addEventListener("click", manejadorEdit);
    //En el EditarHandle() { podemos acceder a this.migasto!!! this.migasto.actualizarDescripcion, this.migasto.valor, etc}
    */
   
    //Botón editar:
    //Crear un botón con texto Editar de tipo button (<button type="button"~) con clase ~gasto-editar.
    let butEdit = document.createElement("button");
    butEdit.className = "gasto-editar";
    butEdit.type = "button";
    //No lo muestras en el ejemplo, pero hay que darle un nombre al cuadro del botón, si no, se queda un cuadrado pequeño y "feo".
    butEdit.innerHTML = "Editar";

    //Crear un nuevo objeto a partir de la función constructora EditarHandle.
    let manejadorEdit = new EditarHandle();
    
    //Establecer la propiedad gasto del objeto creado al objeto gasto (recuerda que el objeto gasto es un parámetro pasado a la función mostrarGastoWeb).
    manejadorEdit.gasto = gasto;

    //Añadir el objeto recién creado como objeto manejador del evento click al botón Editar recién creado.
    //element.addEventListener(event, handler, [options]);
    //elem.addEventListener('click', obj);
    butEdit.addEventListener("click", manejadorEdit);
    //Tras darle vueltas y no encontrar porque no hace nada el boton editar, hago el de borrar al día siguiente y este sí que funciona y lo he trabajado igual 
    //porque pones un ejemplo en la tutoría muy "mascadito". Pongo uno al lado del otro y veo que he puesto "Click" y esa mayúscula hace que no reconozca el evento 
    //click del raton. Al revisar una y otra vez lo mismo dejo de ver errores y parece que está todo perfecto. Si es un toro me embiste...

    //Añadir el botón al DOM a continuación de las etiquetas
    //contenido.append(butEdit); Si lo añadimos al contenido no esta dentro del div class="gasto" como muestra la imagen de la estructura HTML.
    div.append(butEdit);

    //Botón borrar:
    //Crear un botón con texto Borrar de tipo button (<button type="button"~) con clase ~gasto-borrar.
    let butBorrar = document.createElement("button");
    butBorrar.className = "gasto-borrar";
    butBorrar.type = "button";
    butBorrar.innerHTML = "Borrar";

    //Crear un nuevo objeto a partir de la función constructora BorrarHandle.
    let manejadorBorrar = new BorrarHandle();

    //Establecer la propiedad gasto del objeto creado al objeto gasto (recuerda que el objeto gasto es un parámetro pasado a la función mostrarGastoWeb).
    manejadorBorrar.gasto = gasto;

    //Añadir el objeto recién creado como objeto manejador del evento click al botón Borrar recién creado.
    butBorrar.addEventListener("click", manejadorBorrar);

    //Añadir el botón al DOM a continuación del botón Editar.
    div.append(butBorrar);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    div.className = "agrupacion";  
    h1.innerHTML = "Gastos agrupados por " + periodo;
 
    div.append(h1);

    for (let [clave, valor] of Object.entries(agrup))
    {
        let div1 = document.createElement('div');
        let span = document.createElement('span');
        let span1 = document.createElement('span');   

        div1.className = "agrupacion-dato";       
        span.className = "agrupacion-dato-clave";           
        span1.className = "agrupacion-dato-valor";

        span.append("Clave: " + clave);
        span1.append(" Valor: " + valor);
        
        div1.append(span);
        div1.append(span1);
        div.append(div1);
    }   
     
    let contenido = document.getElementById(idElemento);

    contenido.append(div);
}

//Crear una función repintar para actualizar la página
//Estamos desarrollando una aplicación JavaScript controlada por datos. Cada vez que se añade, 
//modifica o borra un gasto, debemos mostrar el resultado en la página HTML. Recordemos que la aplicación debe mostrar:
function repintar()
{
    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. 
    //Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    document.getElementById("listado-gastos-completo").innerHTML = "";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    let gastos = gesPres.listarGastos();

    for (let g of gastos) {
        mostrarGastoWeb("listado-gastos-completo", g);
    }
    //Al fin y al cabo estamos utilizando las mismas que utilizamos en generarDatosEstaticos sin utilizar gesPresWeb. porque ya las tenemos aquí.
}

//Esta función se utilizará como manejadora de eventos del botón actualizarpresupuesto del código HTML. Realizará las siguientes tareas:
function actualizarPresupuestoWeb()
{
    //Pedir al usuario que introduzca un presupuesto mediante un prompt.
    let presupuestoActualizado = prompt("Introduce un nuevo presupuesto");

    //Convertir el valor a número (recuerda que prompt siempre devuelve un string). Aprovecho el error de EditarHandle con parseInt para cambiarlo a parseFloat.
    presupuestoActualizado = parseFloat(presupuestoActualizado);

    //Actualicar el presupuesto (función actualizarPresupuesto)
    gesPres.actualizarPresupuesto(presupuestoActualizado);

    //Llamar a la función repintar para que se muestre la información actualizada en el archivo HTML.
    //Recuerda que actualizar el presupuesto provoca cambios en el balance, por lo que al ejecutar repintar se actualizarán ambos campos.
    repintar(); 
}

//Una vez definida la función, se añadirá como manejadora del evento click del botón actualizarpresupuesto mediante addEventListener.
//Para ello habrá que obtener el elemento botón correspondiente previamente.
//<button type="button" id="actualizarpresupuesto">
let butActualizar = document.getElementById("actualizarpresupuesto");
butActualizar.addEventListener('click', actualizarPresupuestoWeb);

//Esta función se utilizará como manejadora de eventos del botón anyadirgasto del código HTML. Realizará las siguientes tareas:
function nuevoGastoWeb()
{
    //Pedir al usuario la información necesaria para crear un nuevo gasto mediante sucesivas preguntas con prompt.
    let descripcionGastoNuevo = prompt("Introduce la descripción");
    let valorGastoNuevo = prompt("Introduce el gasto");
    let fechaGastoNuevo = prompt("Introduce la fecha");
    let etiquetasGastoNuevo = prompt("Introduce la etiqueta");

    //Convertir el valor a número (recuerda que prompt siempre devuelve un string). Aprovecho el error de de EditarHandle con parseInt para cambiarlo a parseFloat.
    valorGastoNuevo = parseFloat(valorGastoNuevo);

    //Convertir la cadena de texto de etiquetas devuelta por prompt a un array.
    //es.javascript.info/array-methods#split-y-join
    let etiquetasSeparadasSplit = etiquetasGastoNuevo.split(',');

    //Crear un nuevo gasto (función crearGasto). ¡Ojo con la manera de pasar el parámetro ~etiquetas~!
    let gastoNuevo = new gesPres.CrearGasto(descripcionGastoNuevo, valorGastoNuevo, fechaGastoNuevo, etiquetasSeparadasSplit);

    //Añadir el gasto a la lista (función anyadirGasto).
    gesPres.anyadirGasto(gastoNuevo);

    //Llamar a la función repintar para que se muestre la lista con el nuevo gasto.
    repintar();
}

//Una vez definida la función, se añadirá como manejadora del evento click del botón anyadirgasto mediante addEventListener. 
//Para ello habrá que obtener el elemento botón correspondiente previamente.
let butAnyadirGasto = document.getElementById("anyadirgasto");
butAnyadirGasto.addEventListener('click', nuevoGastoWeb);

//Ejemplo tutoria 3 noviembre.
/*
function EditarHandle()
{
    this.handleEvent =  function(e){
        //pedir al usuario datos del gasto, etc
        var desc = prompt("Por favor, introduce la descripción");
        this.gasto.actualizarDescripcion(desc);
        
let e = new CrearGasto("a", 24);

let el = new EditarHandle();
el.gasto = e;
el.handleEvent();

function mostrarGastoWeb(g){
    pintar datos del gasto en html
    crear los botones
    crea boton editar
    crea boton borrar
    creo objeto manejador de eventos
    
    let evEditar = new EditarHandle();
    evEditar.gasto = g;
    //elem.addEventListener('click, obj) --> EN EL MANUAL
    editar.addEventListener('click', evEditar);

    ademas del editar gasto de arriba, tambien habra que tener las etiquetas.
    para borrar algo parecido a:
    for (let et of g.etiquetas){
        //pintar etiqueta
        //añadir manejador de eventos de borrar etiqueta
    
        repintar();
    }
}

tutoria 8 nov
preguntar nuevos datos al usuario
a guardar en el gasto: ¿que gasto?
si tengo el id, buscar por getElementById
e.target.parentNode.id ????
this.migasto!!! 
this.migasto.actualizarDescripcion
this.migasto.valor, etc

Con toda esta información de las tutorías empezamos a trabajar.
*/

//Esta función se utilizará como objeto manejador de eventos para editar un gasto.
//La función EditarHandle será una función constructora que definirá exclusivamente un método llamado handleEvent
function EditarHandle()
{
    this.handleEvent = function(e)
    {
        //Pedir al usuario la información necesaria para editar el gasto mediante sucesivas preguntas con prompt.
        let desc = prompt("Por favor, introduce la descripción");
        let valor = prompt("Por favor, introduce el gasto");
        let fecha = prompt("Por favor, introduce la fecha");
        let etiqueta = prompt("Por favor, introduce la etiqueta");

        //Convertir el valor a número (recuerda que prompt siempre devuelve un string).
        //valor = parseInt(valor) funciona pero números enteros. La prueba espera 95,78 y le ofrecemos 95, por eso da error el test.
        valor = parseFloat(valor);

        //Convertir la cadena de texto de etiquetas devuelta por prompt a un array.
        //es.javascript.info/array-methods#split-y-join
        let etiquetasSeparadasSplit = etiqueta.split(',');

        //Actualizar las propiedades del gasto (disponible mediante this.gasto), mediante las funciones actualizarValor, 
        //actualizarDescripcion, actualizarFecha y anyadirEtiquetas.
        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        //Se comenta en la tutoría del 8 nov el error de actualizarEtiquetas
        this.gasto.anyadirEtiquetas(etiquetasSeparadasSplit);

        repintar();
    }
}

//Esta función se utilizará como objeto manejador de eventos para borrar un gasto.
//El funcionamiento de esta función es muy parecido a la anterior, con la excepción de su funcionamiento interno.
function BorrarHandle() 
{
    this.handleEvent = function (e) 
    {
        //Borrar el gasto asociado. Para ello utilizará la función borrarGasto y como parámetro utilizará el id del gasto seleccionado, disponible en this.gasto.
        gesPres.borrarGasto(this.gasto.id);

        //Llamar a la función repintar para que se muestre la lista actualizada de gastos.
        repintar();
    }
}

//Esta función se utilizará como objeto manejador de eventos para borrar etiquetas de un gasto.
function BorrarEtiquetasHandle()
{
    this.handleEvent = function (e)
    {
        //Borrar la etiqueta seleccionada del gasto asociado. Para ello utilizará la función borrarEtiquetas del gasto asociado (this.gasto)
        //y como parámetro utilizará la etiqueta seleccionada, disponible en this.etiqueta.
        this.gasto.borrarEtiquetas(this.etiqueta);

        //Llamar a la función repintar para que se muestre la lista actualizada de gastos.
        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}