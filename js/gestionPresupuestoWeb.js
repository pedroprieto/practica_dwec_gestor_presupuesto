
function mostrarDatoEnId(idElemento, valor){
  const elemento = document.getElementById(idElemento);
  elemento.textContent = valor;
}


function mostrarGastoWeb(idElemento, gasto){
  
  let targetElement = document.getElementById(idElemento);
  let gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto");
  targetElement.append(gastoTag);
  

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-descripcion");
  gastoTag.textContent = gasto.descripcion;
  targetElement.append(gastoTag);

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-fecha");
  gastoTag.textContent = gasto.fecha;
  targetElement.append(gastoTag);

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-valor");
  gastoTag.textContent = gasto.valor;
  targetElement.append(gastoTag);

  targetElement = document.querySelector(`#${idElemento} .gasto:last-child`);
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-etiquetas");
  targetElement.append(gastoTag);

  targetElement = targetElement.querySelector(".gasto-etiquetas");
  
  for (let eti in gasto.etiquetas){
    gastoTag = document.createElement("span");
    gastoTag.classList.add("gasto-etiquetas-etiqueta");
    gastoTag.textContent = gasto.etiquetas[eti];
    targetElement.append(gastoTag);
  }
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){


  let targetElement = document.getElementById(idElemento);
  let gastoTag = document.createElement("div");
  gastoTag.classList.add("agrupacion");
  
  targetElement.append(gastoTag);
  gastoTag = document.createElement("h1");
  gastoTag.textContent = `Gastos agrupados por ${periodo}`
  targetElement = document.querySelector(".agrupacion");
  targetElement.append(gastoTag);
 

  for (let grupo in agrup){
    let agrupacionDato = document.createElement("div");
    agrupacionDato.classList.add("agrupacion-dato");

    let claveTag = document.createElement("span");
    claveTag.classList.add("agrupacion-dato-clave");
    claveTag.textContent = grupo;

    let valorTag = document.createElement("span");
    valorTag.classList.add("agrupacion-dato-valor");
    valorTag.textContent = agrup[grupo];

    agrupacionDato.append(claveTag, valorTag);

    targetElement = document.querySelector("h1");
    targetElement.after(agrupacionDato);
  }

}




export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}