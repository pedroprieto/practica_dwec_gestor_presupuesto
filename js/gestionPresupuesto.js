
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
            this.fecha = fecha;

                                                                              //toISOString() para que añada el 0 delante del dia
        this.etiquetas = [];

    this.mostrarGastoCompleto = function(){


        
        let texto = 'Gasto correspondiente a DESCRIPCION con valor' + this.valor +'€.'
        
            //Función sin parámetros que devuelva el texto multilínea siguiente (ejemplo para un gasto con tres etiquetas)
          //Gasto correspondiente a DESCRIPCION con valor VALOR €.
          texto = texto + 'Fecha: ' + this.fecha;//Fecha: FECHA_EN_FORMATO_LOCALIZADO
          texto = texto + 'Etiquetas: /n';//Etiquetas:
          texto = texto + 'Etiqueta 1: ' + this.etiquetas[0] ;//- ETIQUETA 1 aqui hay que hacer un bucle.
          texto = texto + 'Etiqueta 2: ' + this.etiquetas[1]; //- ETIQUETA 2
          texto = texto + 'Etiqueta 3: ' + this.etiquetas[2];//- ETIQUETA 3  
          

        return(texto)
         
       
    }
    this.actualizarFecha = function(fecha){

        //Función de 1 parámetro que actualizará la propiedad fecha del objeto.
        // Deberá recibir la fecha en formato string que sea entendible por la función Date.parse.
        // Si la fecha no es válida, se dejará sin modificar.
    }
   this.anyadirEtiquetas = function(...etiqueta){

        if(etiquetas.indexOf(etiqueta) !== -1){
           return('Esta etiqueta ya existe')
        } else{
           for (let e of etiquetas)
           etiquetas.push(etiqueta);
        }

    }
    this.borrarEtiquetas = function(etiqueta){

        if(etiquetas.indexOf(etiqueta) !== -1){
           // etiquetas.splice(etiqueta); //se elimina por nombre
            return('Etiqueta eliminada')
          

         } else{
            return('Etiqueta no encontrada')
         } 
     }
}

function listarGastos(){

    let texto;
    let i;
    if (arraygastos.length > 0)
    {
    for( i = 0; i < arraygastos.length; i++){
        return(arraygastos[i].valor + "\n");}
    }
    else
    return arraygastos;
}

function anyadirGasto(...gasto){

    for (let g of gasto){
    arraygastos.push(gasto)};
    

    //Añadir al objeto gasto pasado como parámetro una propiedad id cuyo valor será el valor actual de la variable global idGasto.
    //Incrementar el valor de la variable global idGasto.
     //Añadir el objeto gasto pasado como parámetro a la variable global gastos. El gasto se debe añadir al final del array.
}
function borrarGasto(id){

//Función de 1 parámetro que eliminará de la variable global gastos el objeto gasto cuyo id haya sido pasado como parámetro.
// Si no existe un gasto con el id proporcionado, no hará nada.

//se elimina por if y splice

}
function calcularTotalGastos(){

   let suma = 0;
    let i;
    for(i = 0; i < arraygastos.length; i++){
        suma = suma  + arraygastos[i].valor;}

    return suma;

   // arraygastos.reduce(function(acc,item) {return acc + item}, 0)

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