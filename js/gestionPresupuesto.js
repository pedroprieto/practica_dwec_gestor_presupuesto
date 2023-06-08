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
        let anyo = fechaFormateada.slice(0,4);                    //
        let mes = fechaFormateada.slice(5,7);
        let dia = fechaFormateada.slice(8,10);

        if(periodo === "dia")
            return `${anyo}-${mes}-${dia}`;
        else if (periodo === "mes")
            return `${anyo}-${mes}`;
        else if (periodo == "anyo")
            return `${anyo}`;
        else
            console.log("Periodo erroneo");
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

function filtrarGastos(opciones){ // opciones sera un objeto, por lo cual se le puede añadir propiedades
    let fechaDesde = opciones.fechaDesde;
    let fechaHasta = opciones.fechaHasta;
    let valorMinimo = opciones.valorMinimo;
    let valorMaximo = opciones.valorMaximo;
    let descripcionContiene = opciones.descripcionContiene;
    let etiquetasTiene = opciones.etiquetasTiene;

    return gastos.filter(objeto => { // --> NO OLVIDAR ESTE RETURN TAMPOCO !!!!
        return ( // --> NO OLVIDAR EL RETURN -.-
           //se comprueba si la opcion no es nula, undefined o vacia (?) si se cumple se comprueba la condicion (la cual devolvera trueo o false)
           // : si la opcion esta vacia se devuelve true, es decir no se le aplica el filtro
          (fechaDesde ? objeto.fecha >= Date.parse(fechaDesde) : true) &&
          (fechaHasta ? objeto.fecha <= Date.parse(fechaHasta) : true) &&
          (valorMinimo ? objeto.valor >= valorMinimo : true) &&
          (valorMaximo ? objeto.valor <= valorMaximo : true) &&
          (descripcionContiene ? objeto.descripcion.toUpperCase().includes(descripcionContiene.toUpperCase()) : true) &&
          (etiquetasTiene ? objeto.etiquetas.some(etiqueta => etiquetasTiene.includes(etiqueta)): true)
        );
    });   
}

/*
let gasto1 = new CrearGasto("Comida", 50, "2022-01-15", "patatas", "carne");
let gasto2 = new CrearGasto("Transporte", 20, "2022-02-05", "transporte");
let gasto3 = new CrearGasto("Ropa", 100, "2022-03-10", "moda");
let gasto4 = new CrearGasto("Entretenimiento", 30, "2022-04-20", "moda", "diversión");

console.log("GASTOS:\n" + filtrarGastos({}));
*/
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
