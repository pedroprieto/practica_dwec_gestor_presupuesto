//Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado:
//idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
//valor - El valor a mostrar.
function mostrarDatoEnId(idElemento, valor)
{   
    //Tal como dice el manual, si un elemento tiene el atributo id, podemos obtener el elemento usando este método sin importar donde se encuentre.
    //Después, la propiedad innerHTML nos permitirá obtener el html dentro del elemento como un string. Con el =valor lo reemplazamos. 
    document.getElementById(idElemento).innerHTML = valor;
}

//Función de dos parámetros que se encargará de añadir dentro del elemento HTML 
//con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro:
//idElemento - Hará referencia al id del elemento HTML donde se insertará el conjunto de estructuras HTML que se crearán para cada gasto.
//gasto - Objeto gasto
function mostrarGastoWeb(idElemento, gasto)
{
    //Ejmplo tutoria 8 nov. 
    //var div1 = document.createElement('div');
    //var div2 = document.createElement('div');
    //div2.innerHTML = "Hola mundo";
    //div1.append(div2);

    //Buscamos la capa que ya debe existir en el documento HTML
    //let contenido = document.getElementById(idElemento);
    //Dentro le metemos el div1 y a ese div1 le habiamos metido antes el div2
    //contenido.append(div1);

    //div.contenido
    //  div (div1)
    //    div2
    //      Hola mundo
    //    /div2
    //  /div
    ///div.contenido

    //Por tanto, extrapolando datos e información vista en el manual y en la tutoría:
    //1. Crear elemento <div>
    //let div = document.createElement('div'); lo repetimos las veces que necesitamos para crear todos los divs
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');

    // 2. Establecer su clase a "alert"
    //div.className = "alert"; Le damos el nombre a las clases.
    div.className = "gasto";   
    div1.className = "gasto-descripcion";
    div2.className = "gasto-fecha";
    div3.className = "gasto-valor";
    div4.className = "gasto-etiquetas";

    //Hemos creado el elemento. Pero hasta ahora solamente está en una variable llamada div, no aún en la página, y no la podemos ver.
    //document.body.append(div); podemos llamar append sobre cualquier elemento y poner otro dentro de el.
    div1.append(gasto.descripcion);
    div2.append(gasto.fecha);
    div3.append(gasto.valor);
    //div4.append(gasto.etiquetas);
    //Si dejamos directamente como div, nos mostrará un div pero no llegamos a crear el span como en el ejemplo. Las comas salen correctamente separando las etiquetas. 
    
    //Después los añadimos al primer div que es el que contendrá todos. 
    div.append(div1);
    div.append(div2);
    div.append(div3);
    div.append(div4);

    /*
    let span=document.createElement('span');
    span.className="gasto-etiquetas-etiqueta";
    span.append(gasto.etiquetas);
    div4.append(span);

    De esta forma, parece que el archivo es correcto (pero no pasará la prueba). Si inspeccionamos la página, veremos <div class="gasto-etiquetas"> y dentro 
    un <span class="gasto.etiquetas-etiqueta">casa, comida</span>. No los estamos separando un span por cada etiqueta.
    */
    
    //Por tanto, vamos a recorrer todas las etiquetas y añadiendo por separado.
    for (let etiqueta of gasto.etiquetas)
    {
        //Hacemos el mismo proceso que con DIV pero esta vez utilizamos SPAN. 
        let span = document.createElement('span');
        span.className = "gasto-etiquetas-etiqueta";
        //Si no añadimos la , no podremos separar las diferentes etiquetas como sale cuando únicamente lo haces con div4.append(gasto.etiquetas)
        span.append(`${etiqueta},`);
        //Ahora no queremos meter dentro el gasto.etiquetas, si no el span que hemos creado con su etiqueta.
        div4.append(span);
    }
    
    //Por último buscamos la capa que ya debe existir en el documento HTML  
    let contenido = document.getElementById(idElemento);
    
    //Dentro le insertamos el div. (Este div ya viene con todos los anteriores insertados en él)
    contenido.append(div);      
}

//Función de tres parámetros que se encargará de crear dentro del elemento 
//HTML con id idElemento indicado una estructura HTML para el objeto agrup que se pase como parámetro:
//idElemento - Hará referencia al id del elemento HTML donde se insertará el conjunto de estructuras HTML que se creará para cada gasto.
//agrup - Objeto que contendrá el resultado de agrupar el total de gastos por período temporal (ejecución de la función agruparGastos 
//desarrollada en la práctica anterior). Recordemos un ejemplo del formato que puede tener agrup en el caso de agrupar por mes:
//periodo - Período temporal por el que se habrá realizado la agrupación. Recordemos que puede ser mes, dia o anyo.
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    //Al igual que en la funcion anterior, creamos los elementos, les damos nombres e introducimos cada uno en su lugar.
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    
    //h2 creado para pruebas a ver si está llegando porque me esta dando errores cypress y no logro saber que está pasando... 
    //let h2 = document.createElement('h2');
    //h1.innerHTML = "pruebah1";

    div.className = "agrupacion";  
    h1.innerHTML = "Gastos agrupados por " + periodo;

    //h1.className = "Gastos agrupados por " + periodo;
    //Estaba dándole un nombre a h1 y no escribiendo sobre ella para mostrarlo, de ahí que me daba un error el test.
    
    div.append(h1);

    //Tal y como menciona la práctica, nos enlaza al manual la opción: object.keys, values, entries: 
    //https://es.javascript.info/keys-values-entries#object-keys-values-entries
    //En nuestro caso necesitamos usar Object.entries(obj) porque queremos devolver [propiedad, valor] del objeto dado. 
    //He utilizado el siguiente link como referencia para más ejemplos de uso:
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    /*Siguiendo esta página, he probado a realizarlo con foreach y con for..of. El código de dentro es el mismo por lo que ambos funcionan correctamente.

    Object.entries(agrup).forEach(([key, value]) =>  
    {
        let div1 = document.createElement('div');
        let span = document.createElement('span');
        let span1 = document.createElement('span');   

        div1.className = "agrupacion-dato";       
        span.className = "agrupacion-dato-clave";           
        span1.className = "agrupacion-dato-valor";

        span.append("Clave: " + key);
        span1.append(" Valor: " + value);
        div1.append(span);
        div1.append(span1);
        div.append(div1);
    });
    */
    
    //for (let [key, value] of Object.entries(agrup)) He modificado el nombre a key y value para ver si era irrelevante o es palabra reservada para esto sí o sí.
    for (let [clave, valor] of Object.entries(agrup))
    {
        //Una vez que realizamos el bucle, el resto es igual, creamos elemento, nombramos y añadimos cada cosa en su lugar.
        let div1 = document.createElement('div');
        let span = document.createElement('span');
        let span1 = document.createElement('span');   

        div1.className = "agrupacion-dato";       
        span.className = "agrupacion-dato-clave";           
        span1.className = "agrupacion-dato-valor";

        //Trás una hora de modificar cosas por todas partes... y pese a que suena muy absurdo, el fallo lo tenia en que estaba haciendo span = "agrupacion-dato-clave" y 
        //no dándole el nombre: span.className = "..."; 
        //h2.innerHTML = "pruebaH2";
        //div.append(h2);

        span.append("Clave: " + clave);
        span1.append(" Valor: " + valor);
        //Añado clave y valor con espacios para dejarlo "mejor" visualmente y no ver todo seguido en la web.
        
        div1.append(span);
        div1.append(span1);
        div.append(div1);
    }   
     
    //Por último buscamos la capa que ya debe existir en el documento HTML  
    let contenido = document.getElementById(idElemento);

    //Dentro le insertamos el div. (Este div ya viene con todos los anteriores insertados en él)
    contenido.append(div);
}

//El código de este fichero hará uso de la teoría explicada en la sección Documento del tutorial de JavaScript. El fichero deberá exportar las siguientes funciones:
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}