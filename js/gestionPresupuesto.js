// ----------------  VARIABLES GLOBALES   -------------------------------
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// ----------------  FUNCIONES  -------------------------------
function actualizarPresupuesto(nuevoPresupuesto) {
    return nuevoPresupuesto >= 0 && !isNaN(nuevoPresupuesto) ? presupuesto = nuevoPresupuesto : -1;
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
function borrarGasto(idgasto){
    let posicion = gastos.findIndex(gasto => gasto.id === idgasto);
    gastos.splice(posicion, 1);
}
function calcularTotalGastos(){
    let sumaGastosTotales = gastos.reduce((acumulador, gasto) => acumulador + gasto.valor, 0);
    return sumaGastosTotales;
}
function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}
function filtrarGastos(opciones){ // opciones será un objeto, por lo cual se le puede añadir propiedades
    let fechaDesde = opciones.fechaDesde;
    let fechaHasta = opciones.fechaHasta;
    let valorMinimo = opciones.valorMinimo;
    let valorMaximo = opciones.valorMaximo;
    let descripcionContiene = opciones.descripcionContiene;
    let etiquetasTiene = opciones.etiquetasTiene;

    return gastos.filter(objeto => {
        return ( 
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
function agruparGastos(){

}


// ----------------  OBJETOS GASTO Y SUS METODOS  --------------
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = !isNaN(valor) && valor > 0 ? valor : 0;
    // se comprueba si la fecha existe y tambien se comprueba que no sea nula o indefinida
    this.fecha = fecha && Date.parse(fecha) ? Date.parse(fecha) : Date.now();
    this.etiquetas = etiquetas ? etiquetas : [];

    // ----------------  METODOS  ------------------------------
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function(nuevoValor){
        this.valor = !isNaN(nuevoValor) && nuevoValor > 0 ? nuevoValor: this.valor;
    }
    this.mostrarGastoCompleto = function(){
        let fechaLocal = new Date(this.fecha).toLocaleString(); 
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`;
        texto += `\nFecha: ${fechaLocal}`;
        texto += `\nEtiquetas:\n`;
        for (let etiqueta of this.etiquetas){
            texto += `- ${etiqueta}\n`;
        }
        return texto
    }
    this.actualizarFecha = function(nuevaFecha){
        this.fecha = nuevaFecha && Date.parse(nuevaFecha) ? Date.parse(nuevaFecha) : this.fecha;
    }
    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        nuevasEtiquetas.forEach(etiqueta => {
            if(!this.etiquetas.includes(etiqueta)){
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
        });
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
        else
            console.log("Periodo erroneo");
    }
}


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
