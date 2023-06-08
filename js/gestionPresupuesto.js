// ----------------  VARIABLES GLOBALES   -------------------------------

let presupuesto = 0;
let gastos = [];
let idGasto = 0;


// ----------------  OBJETO GASTOS Y SUS METODOS  ------------------
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = !isNaN(valor) && valor > 0 ? valor : 0;
                //comprueba si fecha existe y no es nulo o indefinido
    this.fecha = fecha && Date.parse(fecha) ? Date.parse(fecha) : Date.now(); 
    this.etiquetas = etiquetas ? etiquetas: [];

 
// ----------------  METODOS  --------------------------------   

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        this.valor = !isNaN(nuevoValor) && nuevoValor > 0 ? nuevoValor: this.valor; // NO olvidar usar this. !!!!!
    }

    this.mostrarGastoCompleto = function(){
        let fechaLocal = new Date(this.fecha).toLocaleString(); 
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`;
        texto += `\nFecha: ${fechaLocal}`;
        texto += `\nEtiquetas:`;
        for (let etiqueta of this.etiquetas){
            texto += `\n- ${etiqueta}`;
        }
        return texto
    }

    this.actualizarFecha = function(nuevaFecha){
        this.fecha = nuevaFecha && Date.parse(nuevaFecha) ? Date.parse(nuevaFecha) : this.fecha;
    }

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(etiqueta => {
          if (!this.etiquetas.includes(etiqueta)) 
          {
            this.etiquetas.push(etiqueta);
          }
        });
    }

    this.borrarEtiquetas = function(...borrarEtiquetas){
        borrarEtiquetas.forEach(etiqueta =>{
            let posicion = this.etiquetas.findIndex(element => element === etiqueta);
            if (posicion != -1){
                this.etiquetas.splice(posicion, 1);
            }
        })
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let fechaFormateada = new Date(this.fecha).toISOString(); // --> AAAA-MM-DDTHH:mm:ss.sssZ
        let anyo = fechaFormateada.slice(0,4);
        let mes = fechaFormateada.slice(5,7);
        let dia = fechaFormateada.slice(8,10);

        if(periodo === "dia")
            return `${anyo}-${mes}-${dia}`;
        else if (periodo === "mes")
            return `${anyo}-${mes}`;
        else if (periodo == "anyo")
            return `${anyo}`;
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

// suma de los valores de todos los gastos
function calcularTotalGastos(){
    let sumaGastosTotales = gastos.reduce((acumulador, gasto) => acumulador + gasto.valor, 0);
    return sumaGastosTotales;
}

function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos(){

}

function agruparGastos(){

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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
