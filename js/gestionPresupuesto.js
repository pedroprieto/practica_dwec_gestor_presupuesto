
var presupuesto = 0;
var idGastos = 0;
var arraygastos = []

function actualizarPresupuesto(pre) {

    
    if (pre >= 0)
    {
        presupuesto = pre;
      
    }    

    else
    {
        pre = -1 
        console.log("Error al introducir el valor");
    }

    return pre;

   
}

function mostrarPresupuesto() {
    
   
    let x = presupuesto;
    
     return `Tu presupuesto actual es de ${x} €`;
}




function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    this.descripcion=descripcion;
    
    if (valor >= 0){
    this.valor=valor}
    else{
        this.valor = 0}

        if (fecha) {
            fecha = Date.parse(fecha);
            this.fecha = fecha;
        } else {
            fecha = Date.now();
            this.fecha = fecha;}

                                           //toISOString() para que añada el 0 delante del dia
        this.etiquetas = [];

    this.mostrarGastoCompleto = function(){

        let date = new Date(this.fecha);
        let Fechax = date.toLocaleString();
        let texto = "";
        
        
        texto = texto + (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${Fechax}\nEtiquetas:\n`);
         
        for (let i = 0; i < this.etiquetas.length; i++) {
            texto = texto + ` ${this.etiquetas[i]}\n`;}
       
            return texto;
    }
    this.mostrarGasto = function() {  
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }
    this.actualizarFecha = function(fecha){


        fecha = Date.parse( fecha );

        if ( fecha ) {
            this.fecha = fecha;
        }   

    }
   this.anyadirEtiquetas = function(...etiqueta){

        

    }
    this.actualizarValor = function(valor) {
        if ( !isNaN( valor ) && valor >= 0 ) {
            this.valor = valor;
        }
    }
    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    }
    this.borrarEtiquetas = function(etiqueta){

        let pos = -1;

        for ( let e of etiquetas ) {
            pos = this.etiquetas.indexOf( e );

            
            if ( pos != -1 ){
                this.etiquetas.splice( pos, 1 );
            }
        }
         
     }
}

function listarGastos(){

    return arraygastos;
    
}

function anyadirGasto(gasto){

    gasto.id = idGastos;
    idGastos++;
    arraygastos.push(gasto);
    

}
function borrarGasto(id){

    let pos = arraygastos.findIndex( gasto => gasto.id === id );

   
    if ( pos != -1 ){
        arraygastos.splice( pos, 1 );
    }

}
function calcularTotalGastos(){

   let suma = 0;   
    for ( let gas of arraygastos ) {
        suma = suma + gas.valor;
    }

    return suma;


}
function calcularBalance(){

   
    let gastostotales = calcularTotalGastos();
     let balancetotal = presupuesto - gastostotales
    return balancetotal;

}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo


export  {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
