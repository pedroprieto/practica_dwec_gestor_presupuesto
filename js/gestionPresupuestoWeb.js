
export function mostrarDatoEnId(idElemento, valor) {                                        // Función que escribe el valor recibiendo el id  ARA                          
    const elemento = document.getElementById(idElemento);
    if (elemento) {
      elemento.textContent = valor;
    }
  }
  
 
  export function mostrarGastoWeb(idElemento, gasto) {                                      // Función muestra el gasto segun el id ARA
    const elemento = document.getElementById(idElemento);
    if (elemento) {
      const gastoElemento = document.createElement("div");
      gastoElemento.classList.add("gasto");
  
      const descripcionElemento = document.createElement("div");
      descripcionElemento.classList.add("gasto-descripcion");
      descripcionElemento.textContent = gasto.descripcion;
      gastoElemento.appendChild(descripcionElemento);
  
      const fechaElemento = document.createElement("div");
      fechaElemento.classList.add("gasto-fecha");
      fechaElemento.textContent = gasto.fecha;
      gastoElemento.appendChild(fechaElemento);
  
      const valorElemento = document.createElement("div");
      valorElemento.classList.add("gasto-valor");
      valorElemento.textContent = gasto.valor;
      gastoElemento.appendChild(valorElemento);
  
      const etiquetasElemento = document.createElement("div");
      etiquetasElemento.classList.add("gasto-etiquetas");
      gasto.etiquetas.forEach((etiqueta) => {
        const span = document.createElement("span");
        span.classList.add("gasto-etiquetas-etiqueta");
        span.textContent = etiqueta;
        etiquetasElemento.appendChild(span);
      });
      gastoElemento.appendChild(etiquetasElemento);
  
      elemento.appendChild(gastoElemento);
    }
  }
  
  // Función mostrarGastosAgrupadosWeb
  export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {                // Función que muestra la agrupacion de gastos ARA
    const elemento = document.getElementById(idElemento);
    if (elemento) {
      const agrupacionElemento = document.createElement("div");
      agrupacionElemento.classList.add("agrupacion");
  
      const h1Elemento = document.createElement("h1");
      h1Elemento.textContent = `Gastos agrupados por ${periodo}`;
      agrupacionElemento.appendChild(h1Elemento);
  
      Object.keys(agrup).forEach((clave) => {
        const datoElemento = document.createElement("div");
        datoElemento.classList.add("agrupacion-dato");
  
        const claveElemento = document.createElement("span");
        claveElemento.classList.add("agrupacion-dato-clave");
        claveElemento.textContent = clave;
        datoElemento.appendChild(claveElemento);
  
        const valorElemento = document.createElement("span");
        valorElemento.classList.add("agrupacion-dato-valor");
        valorElemento.textContent = agrup[clave];
        datoElemento.appendChild(valorElemento);
  
        agrupacionElemento.appendChild(datoElemento);
      });
  
      elemento.appendChild(agrupacionElemento);
    }
  }
  