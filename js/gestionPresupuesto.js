
var presupuesto = 0;
let gastos;
let idGastos = 0;
var arraygastos = []

function actualizarPresupuesto(pre) {

    
    if (pre > 0)
    {
        return pre;
    }    

    else
    {
        return -1 
    }

   
}

function mostrarPresupuesto() {
    
   
    let x = presupuesto;
    
     return('Tu presupuesto actual es de '+ x + ' €') ;
}




function CrearGasto(valor, fecha, tipo) {

        if (valor > 0){
        this.valor=valor }
        else{
        this.valor = 0;
        }

        this.fecha=fecha,  //fecha Almacenará la fecha en que se crea el gasto en forma de timestamp
        this.tipo=tipo;
        var etiquetas = [];

    this.mostrarGastoCompleto = function(){

        let texto = 'Gasto correspondiente a DESCRIPCION con valor' + this.valor +'€.'
        
            //Función sin parámetros que devuelva el texto multilínea siguiente (ejemplo para un gasto con tres etiquetas)
          //Gasto correspondiente a DESCRIPCION con valor VALOR €.
          texto = texto + 'Fecha: ' + this.fecha;//Fecha: FECHA_EN_FORMATO_LOCALIZADO
          texto = texto + 'Etiquetas: /n';//Etiquetas:
          texto = texto + 'Etiqueta 1: ' + this.etiquetas[0];//- ETIQUETA 1
          texto = texto + 'Etiqueta 2: ' + this.etiquetas[1]; //- ETIQUETA 2
          texto = texto + 'Etiqueta 3: ' + this.etiquetas[2];//- ETIQUETA 3  
          

        return(texto)
         
       
    }
    this.actualizarFecha = function(fecha){

        //Función de 1 parámetro que actualizará la propiedad fecha del objeto.
        // Deberá recibir la fecha en formato string que sea entendible por la función Date.parse.
        // Si la fecha no es válida, se dejará sin modificar.
    }
   this.anyadirEtiquetas = function(etiqueta){

        if(etiquetas.indexOf(etiqueta) !== -1){
           return('Esta etiqueta ya existe')
        } else{
           etiquetas.push(etiqueta);
        }

    }
    this.borrarEtiquetas = function(etiqueta){

        if(etiquetas.indexOf(etiqueta) !== -1){
            etiquetas.delete(etiqueta);
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
        return("<p>" + arraygastos[i] + "</p>");}
    }
    else
    return arraygastos;
}

function anyadirGasto(gasto){

    arraygastos.push(gasto);
    

    //Añadir al objeto gasto pasado como parámetro una propiedad id cuyo valor será el valor actual de la variable global idGasto.
    //Incrementar el valor de la variable global idGasto.
     //Añadir el objeto gasto pasado como parámetro a la variable global gastos. El gasto se debe añadir al final del array.
}
function borrarGasto(id){

//Función de 1 parámetro que eliminará de la variable global gastos el objeto gasto cuyo id haya sido pasado como parámetro.
// Si no existe un gasto con el id proporcionado, no hará nada.

}
function calcularTotalGastos(){

    let suma = 0;
    let i;
    for(i = 0; i < arraygastos.length; i++){
        suma = suma  + arraygastos[i];}

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