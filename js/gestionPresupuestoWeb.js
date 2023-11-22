
function mostrarDatoEnId(idElemento, valor){
  const elemento = document.getElementById(idElemento);
  elemento.textContent = valor;
}


function mostrarGastoWeb(idElemento, gasto){
  let targetElement = document.getElementById(idElemento);
  let gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto");

  
  appender();

  targetElement = targetElement.querySelector(".gasto");
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-escripcion");
  gastoTag.textContent = gasto.descripcion;
  appender();
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-fecha");
  gastoTag.textContent = gasto.fecha;
  appender();
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-valor");
  gastoTag.textContent = gasto.valor;
  appender();
  gastoTag = document.createElement("div");
  gastoTag.classList.add("gasto-etiquetas");
  appender();

  targetElement = targetElement.querySelector(".gasto-etiquetas");
  for (let eti in gasto.etiquetas){
    gastoTag = document.createElement("span");
    gastoTag.classList.add("gasto-etiquetas-etiqueta");
    gastoTag.textContent = gasto.etiquetas[eti];
    appender();
  }
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

  function appender() {targetElement.append(gastoTag);}

  let targetElement = document.getElementById(idElemento);
  let gastoTag = document.createElement("div");
  gastoTag.classList.add("agrupacion");
  
  function appender() {targetElement.append(gastoTag);}

  appender();
  gastoTag = document.createElement("h1");
  gastoTag.textContent = `Gastos agrupados por ${periodo}`


  for (let grupo in agrup){
    
  }

}


let gasto1 = {
  descripcion: "Gasto de cositas",
  fecha: "2022-10-10",
  valor: 200,
  etiquetas: ["Hogar", "Perro"]
}








export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}