

// Función para mostrar un valor en un elemento HTML por su ID
function mostrarDatoEnId(idElemento, valor) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
      return elemento.textContent = valor;
  }
}

// Función para mostrar un gasto en un elemento HTML por su ID
function mostrarGastoWeb(idElemento, gasto) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
      const divGasto = document.createElement('div');
      divGasto.classList.add('gasto');

      const divDescripcion = document.createElement('div');
      divDescripcion.classList.add('gasto-descripcion');
      divDescripcion.textContent = gasto.descripcion;
      divGasto.appendChild(divDescripcion);

      const divFecha = document.createElement('div');
      divFecha.classList.add('gasto-fecha');
      divFecha.textContent = gasto.fecha;
      divGasto.appendChild(divFecha);

      const divValor = document.createElement('div');
      divValor.classList.add('gasto-valor');
      divValor.textContent = gasto.valor + ' €';
      divGasto.appendChild(divValor);

      if (gasto.etiquetas && Array.isArray(gasto.etiquetas)) {
        const divEtiquetas = document.createElement('div');
        divEtiquetas.classList.add('gasto-etiquetas');
        gasto.etiquetas.forEach(etiqueta => {
          const spanEtiqueta = document.createElement('span');
          spanEtiqueta.classList.add('gasto-etiquetas-etiqueta');
          spanEtiqueta.textContent = etiqueta;
          divEtiquetas.appendChild(spanEtiqueta);
        });
        divGasto.appendChild(divEtiquetas);
      }

      elemento.appendChild(divGasto);
  }
}

// Función para mostrar gastos agrupados en un elemento HTML por su ID
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

// Exporta las funciones
export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
};