// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0; 
let gastos = []; 
let idGasto = 0; 


function actualizarPresupuesto(cantidad) {
    // TODO
    if(cantidad > 0){
       return  presupuesto = cantidad; 
    }else{
        return -1; 
    }
}

function mostrarPresupuesto() {
    // TODO

    return "Tu presupuesto actual es de " + presupuesto + " €"; 
}

function CrearGasto( descripcion, valor, fecha, ...etiquetas) {
   
    // Comprobación y ajuste del valor
    //if (typeof valor !== 'number' || valor < 0) {
      //valor = 0;
   // }

    // Métodos
    this.mostrarGasto = function() {
      return ("Gasto correspondiente a " +  this.descripcion +  " con valor " + this.valor + " €");
    }
  
    this.actualizarDescripcion = function(nuevaDescripcion) {
      this.descripcion = nuevaDescripcion;
    }
  
    this.actualizarValor = function(nuevoValor) {
      if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
        this.valor = nuevoValor;
      }
    }

    
    this.mostrarGastoCompleto = function() {
      let texto = `Gasto correspondiente a ${this.descripcion } con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`

        this.etiquetas.forEach((eti) => {
          texto += `- ${eti}\n`; 
        })
        return texto;

  };



    this.actualizarFecha = function(nuevaFecha){
      let fe = Date.parse(nuevaFecha);
        if (fe) {
            this.fecha = fe;
        }
    }

     // Método para añadir etiquetas
      this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(etiqueta => {
          if(!this.etiquetas.includes(etiqueta)){
            this.etiquetas.push(etiqueta); 
          }
        }); 
       // this.etiquetas.push(...nuevasEtiquetas);
      }

      //Borrar etiquetas

      this.borrarEtiquetas = function(...etiquetasABorrar) {
       etiquetasABorrar.forEach(etiqueta =>{
        if(this.etiquetas.includes(etiqueta)){
          this.etiquetas.splice(this.etiquetas.indexOf(etiqueta), 1); 
        }

       })
      }

        // Propiedades
      this.descripcion = descripcion;
      this.valor = (valor >=0) ? valor : 0;
      let fe = Date.parse(fecha); 
      if(fe){
        this.fecha = fe; 
      }else{
        this.fecha = new Date(); 
      }
      this.etiquetas = [];
      this.anyadirEtiquetas(...etiquetas); 
  }
  
function listarGastos(){
    return gastos; 
}

function anyadirGasto( gasto){
  gasto.id = idGasto++;
  gastos.push(gasto);  
}



function borrarGasto(id) {
  let gasto = null;
  for (let g of gastos) {
    if (g.id == id) {
      gasto = g;
}
  }
  if (gasto) {
      let pos  = gastos.indexOf(gasto);
      gastos.splice(pos, 1);
  }
}

function calcularTotalGastos(){
  let sum = 0; 

  gastos.forEach((gasto) => {
      sum += gasto.valor; 
  }
  ); 

  return sum; 
}

function calcularBalance(){

    let sumaGastos = calcularTotalGastos(); 
    let balance = presupuesto - sumaGastos; 

    return balance; 
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto, 
    listarGastos,
    anyadirGasto,
    borrarGasto, 
    calcularTotalGastos, 
    calcularBalance
    
}

