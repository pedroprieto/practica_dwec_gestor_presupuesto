// ----------------  VARIABLES GLOBALES   -------------------------------

let presupuesto = 0;
let gastos = [];
let idGasto = 0;


// ----------------  OBJETO GASTOS Y SUS METODOS  ------------------
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = !isNaN(valor) && valor > 0 ? valor : 0;
                //comprueba si fecha existe y no es nulo o indefinido
    this.fecha = fecha && Date.parse(fecha) ? fecha : Date.now(); 
    this.etiquetas = etiquetas ? etiquetas: [];

 
// ----------------  METODOS  --------------------------------   
// CURIOSIDADES: al crear un objeto se ejecutan automaticamente todos los métodos ya que estos 
// se han agegado al objeto como propiedades. Motivo por el cual las etiquetas se añaden al objeto
// aunque etiquetas se inicializan con una lsita vacia.
// es como iniciar la lista y despues con el metodo se rellena la lista

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        this.valor = !isNaN(nuevoValor) && nuevoValor > 0 ? nuevoValor: this.valor; // NO olvidar usar this. !!!!!
    }

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(etiqueta => {
          if (!this.etiquetas.includes(etiqueta)) 
          {
            this.etiquetas.push(etiqueta);
          }
        });
    }

}


// ----------------       FUNCIONES     --------------------------------

function actualizarPresupuesto(nuevoPresupuesto) {
    
    if(!isNaN(nuevoPresupuesto) && nuevoPresupuesto > 0){
        presupuesto = nuevoPresupuesto;
        return presupuesto;  
    }
    else{
        return -1;
        console.log("Presupuesto erroneo, debe ser un número positivo");
    }

}


function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);

}

function borrarGasto(gastoId){
    let posicion = gastos.findIndex(gasto => gasto.id === gastoId);
    gastos.splice(posicion, 1);
}

function calcularTotalGastos(){

}

function calcularBalance(){

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
