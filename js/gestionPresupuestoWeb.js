//Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado:
//idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
//valor - El valor a mostrar.
function mostrarDatoEnId(idElemento, valor)
{   
    //Tal como dice el manual, si un elemento tiene el atributo id, podemos obtener el elemento usando este método sin importar donde se encuentre.
    //Después, la propiedad innerHTML nos permitirá obtener el html dentro del elemento como un string. Con el =valor lo reemplazamos. 
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb()
{

}

function mostrarGastosAgrupadosWeb()
{

}

//El código de este fichero hará uso de la teoría explicada en la sección Documento del tutorial de JavaScript. El fichero deberá exportar las siguientes funciones:
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}