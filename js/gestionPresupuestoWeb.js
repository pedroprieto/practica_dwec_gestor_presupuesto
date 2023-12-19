function mostrarDatoEnId(idElemento, valor){

let elemento = document.getElementById(idElemento);
if (elemento){
    elemento.textContent = valor;
} else {
    console.error('El elemento con el id '+ idElemento + 'no fue encontrado.' );
}

}

function mostrarGastoWeb(idElemento, gasto){
  // Obtener el elemento HTML por su id
  let estructura = document.getElementById(idElemento);

  // Verificar si el contenedor existe antes de intentar modificarlo
  if (estructura) {
      // Crear un nuevo elemento div para representar el gasto
      let nuevoGasto = document.createElement('div');
      nuevoGasto.classList.add('gasto');

      // Añadir descripción del gasto
      let descripcion = document.createElement('div');
      descripcion.classList.add('gasto-descripcion');
      descripcion.textContent = gasto.descripcion;
      nuevoGasto.appendChild(descripcion);

      // Añadir fecha del gasto
      let fecha = document.createElement('div');
      fecha.classList.add('gasto-fecha');
      fecha.textContent = gasto.fecha;
      nuevoGasto.appendChild(fecha);

      // Añadir valor del gasto
      let valor = document.createElement('div');
      valor.classList.add('gasto-valor');
      valor.textContent = gasto.valor;
      nuevoGasto.appendChild(valor);

      // Añadir etiquetas del gasto
      let etiquetas = document.createElement('div');
      etiquetas.classList.add('gasto-etiquetas');
      
      gasto.etiquetas.forEach(function(etiqueta) {
          let spanEtiqueta = document.createElement('span');
          spanEtiqueta.classList.add('gasto-etiquetas-etiqueta');
          spanEtiqueta.textContent = etiqueta;
          etiquetas.appendChild(spanEtiqueta);
      });

      nuevoGasto.appendChild(etiquetas);

      // Añadir el nuevo gasto al contenedor
      contenedor.appendChild(nuevoGasto);
  } else {
      console.error('El contenedor con el id ' + idElemento + ' no fue encontrado.');
  }

}






export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
