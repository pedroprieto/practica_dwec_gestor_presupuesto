// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// la creamos con let
let presupuesto = 0;
//Creación de array gastos e idGasto
let gastos = [];
let idGasto = 0;

function listarGastos() {
    return gastos;
    }


    
// TODO: Variable global


function actualizarPresupuesto(valor) {
    // TODO
    if (typeof valor === 'number' && valor >=0) {
        presupuesto = valor;
        return presupuesto;
    }
    else {
        console.log("El valor introducido no es válido.");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}



//función CrearGasto porqeu es un constructor y va en en mayúsculas.
// Para objeto gasto creamos dentro de Crear Gasto los métodos qeu nos piden

function CrearGasto(descripcion, valor = 0 , fecha, ... etiquetas) {
    // TODO

    //propiedades
   
    this.descripcion = descripcion;
    this.valor = typeof valor === 'number' && valor >=0 ? valor: 0; 
    

    // Métodos 
    this.mostrarGasto = function () {
       return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function (nuevoValor){
        if(typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }
    this.etiquetas = [];

   // this.anyadirEtiquetas(...etiquetas);

    let f = Date.parse(fecha);
    if (isNaN(f)) {
        this.fecha = Date.now();
    }
    else {
        this.fecha = f;
    }

    

}

CrearGasto.prototype.obtenerPeriodoAgrupacion = function(periodo){
    let newDate = new Date(this.fecha);
    let anyo = newDate.getFullYear();
    let mes = newDate.getMonth() + 1;
    let dia = newDate.getDate();
    let periodoAgrupacion;
    if (periodo === "anyo"){
        periodoAgrupacion = `${anyo}`;
    }else if (periodo === "mes"){
        if(mes<10){
          mes = "0" + mes.toString();   
        }

        periodoAgrupacion = `${anyo}-${mes}`;
    }else if (periodo === "dia"){
        if(mes < 10){
            mes = "0" + mes.toString();   
          }
          if(dia < 10){
            dia = "0" + dia.toString();   
          }
        periodoAgrupacion = `${anyo}-${mes}-${dia}`;
    }else {
        periodoAgrupacion = `Fecha no válida.`;
    }
    return periodoAgrupacion;
}


CrearGasto.prototype.mostrarGastoCompleto = function () {
    let fechaLocalizada = new Date(this.fecha).toLocaleString();
    let etiquetasList = '';
    for (const etiqueta of this.etiquetas) {
      etiquetasList += `- ${etiqueta}\n`;
    }
  
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocalizada}\nEtiquetas:\n${etiquetasList}`;
  };

CrearGasto.prototype.actualizarFecha = function (nuevaFecha) {
    let parsedDate = Date.parse(nuevaFecha);
    if (!isNaN(parsedDate)) {
      this.fecha = parsedDate;
    }
  };





CrearGasto.prototype.anyadirEtiquetas = function (...etiquetas) {
    etiquetas.forEach(etiqueta => {
        let etiquetaExistente = false;
        for (let i = 0; i < this.etiquetas.length; i++) {
            if (this.etiquetas[i] === etiqueta) {
                etiquetaExistente = true;
                break;
            }
        }

        if (!etiquetaExistente) {
            this.etiquetas.push(etiqueta);
        }
    })
}

CrearGasto.prototype.borrarEtiquetas = function (...etiquetasABorrar) {
    this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasABorrar.includes(etiqueta));
  };

  function anyadirGasto(gasto){
      gasto.id = idGasto++;
        // Añadir el objeto gasto al final del array gastos
      gastos.push(gasto);

}

function borrarGasto(idGastoABorrar){
    let index = gastos.findIndex(gasto => gasto.id === idGastoABorrar);
    if (index !== -1) {
      gastos.splice(index, 1);
    }
}

function calcularTotalGastos(){
 return gastos.reduce((total, gasto) => total + gasto.valor, 0);   
}
function calcularBalance(){
return presupuesto - calcularTotalGastos();
}
function filtrarGastos()
{

}
function agruparGastos(){

}










// Lo que haríamos es un nuevo objeto llamado gasto, podríamos haberlo creaado en la función también.



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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
