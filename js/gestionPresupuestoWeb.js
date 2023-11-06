
function mostrarDatoEnId(idElemento, valor) {

    const elemento = document.getElementById(idElemento);

    if(elemento) {
        return elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {

    const elemnt = document.getElementById(idElemento);

    if(elemnt){

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


        /*Creo como venimos haciedno el div, con su clase gasto-etiquetas*/ 
        const divGastoEtiquetas = document.createElement('div');
            divGastoEtiquetas.classList.add('gasto-etiquetas');
        /*Con un for recorro lo que hay gasto.etiquetas, y por cada elemento encontrado
        crea un span, con su clase gasto-etiquetas-etiqueta,
        una vez echo eso, el contenido que se cre es el elemnto etique
        que es sacado de gasto.etiquetas
        y con el appendChild lo guarda al final, y lo recorre hast no encontrar ninguno mas*/ 
        for(const etique of gasto.etiquetas) {
            const spanEtiquetas = document.createElement('span');
            spanEtiquetas.classList.add('gasto-etiquetas-etiqueta');
            spanEtiquetas.textContent = etique;
            divGastoEtiquetas.appendChild(spanEtiquetas);
        }
        contenidoGasto.appendChild(divGastoEtiquetas);

        //Al final guardamos todo lo que hay en contenidoGasto
        //en el elemtno creado al pricipio, y lo guardamos al final
        elemnt.appendChild(contenidoGasto);
    }else{
        console.error("No hay ningun elemento");
    }

}