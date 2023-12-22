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

      this.obtenerPeriodoAgrupacion = function(periodo){

        var fe = new Date(this.fecha); 
        if (periodo === 'dia') {
          return fe.getFullYear() + '-' + (fe.getMonth() + 1).toString().padStart(2, '0') + '-' + fe.getDate().toString().padStart(2, '0');
        } else if (periodo === 'mes') {
          return fe.getFullYear() + '-' + (fe.getMonth() + 1).toString().padStart(2, '0');
        } else if (periodo === 'anyo') {
          return fe.getFullYear().toString();
        }
      
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

function filtrarGastos(filtros) {
  return gastos.filter(gasto => {
    // Filtra por la fecha mínima
    if (filtros.fechaDesde && new Date(gasto.fecha) < new Date(filtros.fechaDesde)) {
      return false;
    }

    // Filtra por la fecha máxima
    if (filtros.fechaHasta && new Date(gasto.fecha) > new Date(filtros.fechaHasta)) {
      return false;
    }

    // Filtrar por el valor mínimo
    if (filtros.valorMinimo !== null && gasto.valor < filtros.valorMinimo) {
      return false;
    }

    // Filtrar por el valor máximo
    if (filtros.valorMaximo !== null && gasto.valor > filtros.valorMaximo) {
      return false;
    }

    // Filtrar por descripción
    if (filtros.descripcion && !gasto.descripcion.toLowerCase().includes(filtros.descripcion.toLowerCase())) {
      return false;
    }

    // Filtrar por etiquetas
    if (filtros.etiquetasTiene && filtros.etiquetasTiene.length > 0) {
      const etiquetasFiltrar = filtros.etiquetasTiene.map(etiqueta => etiqueta.toLowerCase());
      const gastoEtiquetas = gasto.etiquetas.map(etiqueta => etiqueta.toLowerCase());
      if (!etiquetasFiltrar.some(etiqueta => gastoEtiquetas.includes(etiqueta))) {
        return false;
      }
    }

    return true;
  });
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
  let gastosFiltrados = filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta });

  return gastosFiltrados.reduce(function (acumulador, gasto) {
    let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);

    if (acumulador[periodoAgrupacion]) {
      acumulador[periodoAgrupacion] += gasto.valor; 
    } else {
      acumulador[periodoAgrupacion] = gasto.valor;
    }

    return acumulador;
  }, {});
}


function transformarListadoEtiquetas(etiquetas){
  // Definir patrón de expresión regular para identificar los diferentes separadores
  var patron = /[~,.:; ]+/;

  // Utilizar la expresión regular para dividir la cadena en palabras
  var etiquetas = etiquetas.split(patron);

  // Eliminar elementos vacíos del resultado
  etiquetas = etiquetas.filter(function (etiqueta) {
      return etiqueta !== "";
  });

  return etiquetas;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    gastos,
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
    transformarListadoEtiquetas
    
}

