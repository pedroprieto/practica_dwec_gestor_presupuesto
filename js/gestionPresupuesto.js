// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// TODO: Variable global
let presupuesto = 0;


// Actualiza la variable global presupuesto
function actualizarPresupuesto(valor) {
  
  if (valor >= 0) {
    presupuesto = valor;
    return presupuesto;
  } else {
    let mensaje = "Error valor negativo,Introduce un valor positivo";
    return -1;
  }
}
//se encargará de devolver el texto siguiente: Tu presupuesto actual es de X €, siendo X el valor de la variable global presupuesto.
function mostrarPresupuesto() {
  let mensaje = `Tu presupuesto actual es de ${presupuesto} €`;
  return mensaje;
}

//Función constructora que se encargará de crear un objeto gasto
function CrearGasto(descripcion, valor) {

  this.descripcion = descripcion;
  this.valor = valor > 0 ? (this.valor = valor) : (this.valor = 0);
  
  /*  this.valor = valor;
  ///   erronea  this.valor = valor < 0  ? (this.valor = 0) : (this.valor = valor);
   this.valor = function () {
      if (valor < 0) {
        this.valor = 0;
      } else this.valor = valor;
    }; 
    /////
     if (valor < 0) {
      this.valor = 0;      
    } else this.valor = valor;
    */


// Metodos objeto

// Funcion que muestra el objeto Gasto con descripcion y valor
  this.mostrarGasto = function () {
    let mensaje=(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €,`);
    //console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €,`); xq est no  funciona
    return mensaje;
  },

//Funcion que actualiza la propiedad  descripcion del objeto
  this.actualizarDescripcion = function (descripcion) {
    this.descripcion = descripcion;
  },
  
  //Funcion que actualiza la propiedad  descripcion del objeto
  this.actualizarValor = function (valor) {
    if (valor > 0) {      
      this.valor = valor;
    }
       //else this.valor = valor;  hijo de tu real puta
  };
  
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export { mostrarPresupuesto, actualizarPresupuesto, CrearGasto };
