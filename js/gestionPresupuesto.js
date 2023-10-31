
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGastos = 0;

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
  return `Tu presupuesto actual es de ${presupuesto} €`;
}
//Funcion que lista los gastod del array 
function listarGastos() {
  return gastos;
};

//Funcion que Añade un gasto al array
function anyadirGasto(valor) {
  valor.id = idGastos;
  idGastos++;
  gastos.push(valor);
};

//Funcion que borra un gasto de array por id
function borrarGasto(idgasto) {
  let posicion = gastos.findIndex((item) => item.id == idgasto); // si devueleve -1 no existe id
  if (posicion !== -1) {
    gastos.splice(posicion, 1);
  }
};

//Funcion que calcula los gastos totales que hay ne l array
function calcularTotalGastos() {
  let gastosTotales = 0;
  for (let iterator of gastos) {
    gastosTotales += iterator.valor;
  }
  return gastosTotales;
};

//Funcion que calcula el balance 
function calcularBalance() {
  let balance = presupuesto - calcularTotalGastos();
  return balance;
};
function filtrarGastos(objeto) {
  let fechaDesde = objeto.fechaDesde;
  let fechaHasta = objeto.fechaHasta;
  let valorMinimo = objeto.valorMinimo;
  let valorMaximo = objeto.valorMaximo;
  let descripcionContiene = objeto.descripcionContiene;
  let etiquetasTiene = objeto.etiquetasTiene;


  if (objeto.length == 0 || objeto == null) {
    return gastos;
  } else {
    return gastos.filter(function (gasto) { 
      let agrupacion = true;
      if (fechaDesde) {
        if (gasto.fecha < Date.parse(fechaDesde)) {
          return false;
        }
      }

      if (fechaHasta) {
        if (gasto.fecha > Date.parse(fechaHasta)) {
          return false;
        }
      }

      if (valorMinimo) {
        if (gasto.valor < valorMinimo) {
          return false;
        }
      }

      if (valorMaximo) {
        if (gasto.valor > valorMaximo) {
          return false;
        }
      }

      if (descripcionContiene) {
        if (gasto.descripcion.indexOf(descripcionContiene) == -1) {  // Si no se encuentra una coincidencia, indexOf devuelve el valor -1. 
            return false;                                            //Si se encuentra una coincidencia, devuelve la posición en la cadena 
          
        }
      }
      if (etiquetasTiene) {
        let encontrado = false;
        for (let i = 0; i < gasto.etiquetas.length; i++) {
          for (let j = 0; j < etiquetasTiene.length; j++) {
            if (gasto.etiquetas[i] == etiquetasTiene[j]) {
              return true;
            }
          }
        }
        if (!encontrado) {
          return false;
        }
      }
      return agrupacion;
    });
  }

}


function agruparGastos(periodo ,fechaDesde,fechaHasta, etiquetas) { 

  let filtro =filtrarGastos({fechaDesde:fechaDesde ,fechaHasta:fechaHasta, etiquetasTiene:etiquetas});// filtro fecha de objeto con propiedades
  
  let agrupacionGastos = filtro.reduce(function (acumulador, gasto) {
      let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);//obtengo gasto por periodo 
      acumulador[periodoAgrupacion] += gasto.valor;
  
      return acumulador;
  
  }, {} );  //inicializacion con objeto vacio
  
    return agrupacionGastos;
  }


//Función constructora que se encargará de crear un objeto gasto

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

  this.descripcion = descripcion;
  this.valor = valor > 0 ? (this.valor = valor) : (this.valor = 0);

  // etiquetas
  this.etiquetas=etiquetas;   //! en serio
  if (this.etiquetas == null) {
    this.etiquetas = [];
  }

 // fechas
  fecha = Date.parse(fecha);
  if (fecha == null || isNaN(fecha)) {
      this.fecha = +new Date();
  } else {
      this.fecha = fecha;
  }
 
   //actualizar fechas
  this.actualizarFecha = function (nuevaFecha) {        
  nuevaFecha = Date.parse(nuevaFecha);
  if (isNaN(nuevaFecha)) {
      this.fecha = fecha;
  } else {
      this.fecha = +new Date(nuevaFecha);
    }
  };

 // Funcion que muestra el objeto Gasto con descripcion y valor
  this.mostrarGasto = function () {
    let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    return texto;
  };

 //Funcion que actualiza la propiedad  descripcion del objeto
  this.actualizarDescripcion = function (descripcion) {
    this.descripcion = descripcion;
  };

   //Funcion que actualiza la propiedad  descripcion del objeto
  this.actualizarValor = function (valor) {
    if (valor > 0) {
      this.valor = valor;
    }
  };
 //Funcion que muestra el gastocompleto del objeto
  this.mostrarGastoCompleto = function () {
   let fecha1 = new Date(fecha).toLocaleString(); 
    let etiq = "";
    for (let iterator of etiquetas) {
      etiq += `- ${iterator}\n`;
    }
    let mensaje = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €." + "\n" +
      "Fecha: " + fecha1 + "\n" + 
      "Etiquetas:\n" + etiq;
    return mensaje;
  };

 //Funcion que añade etiquetas al objeto
  this.anyadirEtiquetas = function (...etiquetasN) {
    for (let etiq of etiquetasN) {
        if (!this.etiquetas.includes(etiq)) {
            this.etiquetas.push(etiq);
        }
    }
    return this.etiquetas;
};

 //Funcion que borra etiquetas al objeto
this.borrarEtiquetas = function (...etiquetasABorrar) {
  for (let i = 0; i < etiquetasABorrar.length; i++) {
    for (let j = 0; j < this.etiquetas.length; j++) {
      if (etiquetasABorrar[i] == etiquetas[j]) {
        this.etiquetas.splice(j, 1);
      }
    }
  }
};
this.obtenerPeriodoAgrupacion = function (periodo) {

  //fecha= new Date(this.fecha).toDateString();//! no estoy seguro de que lo pase a string correcto  (Wed Jun 28 1993)
  fecha = new Date(this.fecha).toISOString(); //? Devuelve 2011-10-05T14:48:00.000Z
  let resultadoAgrup = "Resultado :";

  switch (periodo) { //sobre 10 

    case "dia": // aaaa-mm-dd;
      resultadoAgrup = fecha.substring(0, 10); //?  .substring extrae caracteres desde indiceA hasta indiceB sin incluirlo
      break;
    case "mes":  //aaaa-mm
      resultadoAgrup = fecha.substring(0, 7);
      break;
    case "anyo":  //aaaa
      resultadoAgrup = fecha.substring(0, 4);
      break;
  }
  return resultadoAgrup;
};

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
  
  mostrarPresupuesto,
  actualizarPresupuesto,
  CrearGasto,
  listarGastos,
  anyadirGasto,
  borrarGasto,
  calcularTotalGastos,
  calcularBalance, 
  filtrarGastos, 
  agruparGastos,
  
};
