
var presupuesto = 0;
var idGastos = 0;
var arraygastos = []

function actualizarPresupuesto(pre) {

    
    if (pre >= 0)
    {
        presupuesto = pre;}    

    else
    {
        pre = -1 
        console.log("Error al introducir el valor");}

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
            this.fecha = fecha;
        }

                                        
        this.etiquetas = [];

    this.mostrarGastoCompleto = function(){

        let date = new Date(this.fecha);
        let Fechax = date.toLocaleString();
        let texto = "";
        
        
        texto = texto + (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${Fechax}\nEtiquetas:\n`);
         
        for (let etiqueta of etiquetas) {
            texto = texto + `- ${etiqueta}\n`;}
       
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
    this.anyadirEtiquetas = function(...etiquetas) {
        let pos = -1;

        for (let etiqueta of etiquetas) {
            pos = this.etiquetas.indexOf(etiqueta);

            if ( pos == -1 ){
                this.etiquetas.push(etiqueta);
            }
        }        
    }
 	this.anyadirEtiquetas(...etiquetas);
    
    this.actualizarValor = function(valor) {
        if (valor >= 0 && !isNaN(valor)) {
            this.valor = valor;
        }
        else{
            return ('Debe ser un valor numerico')
        }
    }
    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    }
   
    this.borrarEtiquetas = function(...etiquetas) {         
        let pos = -1;
    
        for (let etiqueta of etiquetas) {
            pos = this.etiquetas.indexOf(etiqueta);

            if ( pos != -1 ){
                this.etiquetas.splice( pos, 1 );
            }
        }        
    }
    this.obtenerPeriodoAgrupacion = function(periodo) {

        let periodoFecha = new Date(fecha).toISOString();

        if (periodo == "dia"){
            
           periodoFecha = periodoFecha.slice(0,10);
        }
        if (periodo == "mes"){

            periodoFecha = periodoFecha.slice(0,7);

        }
        if (periodo == "anyo"){

            periodoFecha = periodoFecha.slice(0,4);

        }

        return periodoFecha

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

function filtrarGastos(opciones){
 
let filtro;
           
filtro = arraygastos.filter(function(gasto){

 let cumpleCondicion = true;
 if(opciones.fechaDesde){
     if(gasto.fecha < Date.parse(opciones.fechaDesde)){
        cumpleCondicion = false;
     }
 }
 if(opciones.fechaHasta){
     if(gasto.fecha > Date.parse(opciones.fechaHasta)){
        cumpleCondicion = false;
     }
 }
 if(opciones.valorMinimo){
     if(gasto.valor < opciones.valorMinimo){
        cumpleCondicion = false;
     }
 }
 if(opciones.valorMaximo){
     if(gasto.valor > opciones.valorMaximo){
        cumpleCondicion = false;
     }
 }
 if (opciones.descripcionContiene){
     if (!gasto.descripcion.includes(opciones.descripcionContiene)) {
         cumpleCondicion = false;
     }
 }
 if(opciones.etiquetasTiene){
     let tieneEtiqueta = false;                   
         for (let i = 0; i < gasto.etiquetas.length; i++) {                   
             for (let j= 0; j < opciones.etiquetasTiene.length; j++) {
                 if(gasto.etiquetas[i] == opciones.etiquetasTiene[j]){
                     tieneEtiqueta = true;
                 }                 
             }
         }
         if(tieneEtiqueta == false){
            cumpleCondicion = false;
         }  
 }

     return cumpleCondicion;
});


     return filtro;  
}
function agruparGastos(periodo, etiquetas, fechadesde, fechahasta){

 


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
    calcularBalance,
    filtrarGastos,
    agruparGastos,
}


>>>>>>> 378237db888698ad17d2a645f250a35cd40d65f1
