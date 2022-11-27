// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos  = []
let idgasto = 0

function actualizarPresupuesto(actuPresupuesto) {
   
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //actualizarPresupuesto - Función de 1 parámetro que se encargará de actualizar la variable global presupuesto. 
    //////Esta función comprobará que el valor introducido es un número no negativo: en caso de que sea un dato válido, 
    ////actualizará la variable presupuesto y devolverá el valor del mismo; en caso contrario, mostrará un error por pantalla 
    //y devolverá el valor -1.
    ///////////////////////////////////////////////////////////////////////////
    
    if(actuPresupuesto >= 1){
        presupuesto  = actuPresupuesto;
        return presupuesto
    }else{
        
        console.log("El valor es negativo")
        return -1
    }
    
}

function mostrarPresupuesto() {
    
    let textMostrarPresupuesro = `Tu presupuesto actual es de ${presupuesto} €`
    return textMostrarPresupuesro;
}
function CrearGasto(descripcion, valor,fecha,...etiquetas) {

    /////////////////////////////////////////////////////////////////////
    ///Almacenará la descripción del gasto en formato cadena
    /////////////////////////////////////////////////////////////////////////////////////////

    this.descripcion = descripcion

    //////////////////////////////////////////////////////////////////////
    ///Almacenará el valor del gasto en formato numérico
    ///////////////////////////////////////////////////////////////////////
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0
    }

    //////////////////////////////////////////////////////////////////////
    //Si no se indican los parámetros de etiquetas, se almacenará en la propiedad 
    //etiquetas un array vacío.    
    ///////////////////////////////////////////////////////////////////////

    if(!etiquetas){
        this.etiquetas = []
    }else{
        this.etiquetas = etiquetas;
    }

    ///////////////////////////////////////////////////////////////////////
    // Función de un número indeterminado de parámetros que añadirá las etiquetas pasadas como parámetro a la 
    //propiedad etiquetas del objeto. Deberá comprobar que no se creen duplicados.
    ///////////////////////////////////////////////////////////////////////

    this.anyadirEtiquetas = function (...etiquetas) {
        for (let i = 0; i < etiquetas.length; i++){

            let etiqueta = etiquetas[i];

            if(this.etiquetas.indexOf(etiqueta) === -1){
                
                this.etiquetas.push(etiqueta)
            }
        }
    }

    //////////////////////////////////////////////////////////////////////
    //Si no se indican los parámetros de etiquetas, se almacenará en la propiedad 
    //etiquetas un array vacío.    
    //////////////////////////////////////////////
   
    this.borrarEtiquetas = function(...etiquetas){
       
        for (let i = 0; i < etiquetas.length; i++){

            let etiqueta = etiquetas[i];
            let posicion = this.etiquetas.indexOf(etiqueta);

            if (posicion >= 0) {
                this.etiquetas.splice(posicion, 1);
            }
        }
    }
    //////////////////////////////////////////////////////////////////////
    //Si no se indica el parámetro fecha, se almacenará en la propiedad fecha la fecha actual.
    //El parámetro fecha deberá ser un string con formato válido que pueda entender 
    ///la función Date.parse. Si la fecha no es válida (no sigue el formato indicado), 
    //se deberá almacenar la fecha actual en su lugar.
    ///////////////////////////////////////////////
    
    let nuevaFecha = Date.parse(fecha)

    if(!nuevaFecha){
        this.fecha = Date.parse(new Date())
    }else{
        this.fecha = nuevaFecha
    }

    //////////////////////////////////////////////////////////////////////
    ///Función de 1 parámetro que actualizará la propiedad fecha del objeto. Deberá recibir la fecha en 
    //formato string que sea entendible por la función Date.parse. Si la fecha no es válida, se dejará sin modificar.
    /////////////////////////////////////////////////////////////////////
    
    this.actualizarFecha = function(fecha){

        let dataFecha = Date.parse(fecha)

        if (dataFecha) {
            this.fecha = dataFecha;
        }
    }

    //////////////////////////////////////////////////////////////////////
    ///Función sin parámetros que muestre el texto
    /////////////////////////////////////////////////////////////////////

    this.mostrarGasto = function(){
        let textoMostrarGastos = `Gasto correspondiente a ${descripcion} con valor ${valor} €`
        return textoMostrarGastos
    }

    //////////////////////////////////////////////////////////////////////
    ///mostrarGastoCompleto - Función sin parámetros que devuelva el texto multilínea siguiente (ejemplo para un gasto con tres etiquetas):
    ///////////////////////////////////////////////////////////////////
    
    this.mostrarGastoCompleto = function(){
        
        let fgasto=`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +`Fecha: ${new Date(this.fecha).toLocaleString()}\n`+"Etiquetas:\n"
        
        for (let i=0; i<this.etiquetas.length; i++){
          fgasto +="- " + this.etiquetas[i] +  "\n";
        }
        return fgasto;
    }

    //////////////////////////////////////////////////////////////////////
    ///Función de 1 parámetro que actualizará la descripción del objeto.
    /////////////////////////////////////////////////////////////////////////////////////////

    this.actualizarDescripcion = function(actualizarDescrip){
        this.descripcion= actualizarDescrip
    }

    //////////////////////////////////////////////////////////////////////
    ///Función de 1 parámetro que actualizará el valor del objeto. Se encargará de comprobar que 
    //el valor introducido sea un número no negativo; en caso contrario, dejará el valor como estaba.
    /////////////////////////////////////////////////////////////////////////////////////////

    this.actualizarValor = function(actualizaValor) {

        if(actualizaValor >= 0){
            this.valor = actualizaValor
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    //obtenerPeriodoAgrupacion - Función de un parámetro que devolverá el período de agrupación correspondiente al parámetro periodo de la
    // función y a la fecha del gasto. Si el período a agrupar es dia, el período de agrupación tendrá el formato aaaa-mm-dd; si es mes, tendrá el formato aaaa-mm; 
    //y si es anyo, tendrá el formato aaaa
    /////////////////////////////////////////////////////////////////////////////////////////
    this.obtenerPeriodoAgrupacion = function(periodo){

        let dateDia = new Date(fecha)
        
       
        if(periodo == "dia"){

          
            let text;
            let day = dateDia.getDate()
            let month = dateDia.getMonth() + 1
            let year = dateDia.getFullYear()

                                               
            if(month < 10 && day < 10){
                text = `${year}-0${month}-0${day}`
            }
            if(month > 10 && day > 10){
                text = `${year}-${month}-${day}`
            }
            if(month < 10 && day > 10){
                text = `${year}-0${month}-${day}`
            }
            if(month > 10 && day < 10){
                text =`${year}-${month}-0${day}`
            }
            
            return text;
        }

        if(periodo == "mes"){

           
            let text;
            let month = dateDia.getMonth() + 1
            let year = dateDia.getFullYear()

            if(month < 10){
                text = `${year}-0${month}`
            }else{
                text=`${year}-${month}`
            }
          
            return text;
        }
        if(periodo == "anyo"){
           
            let year = dateDia.getFullYear()
            
            return year;
        }
      
        

        
    }


}

function listarGastos() {
    return gastos
}

/////////////////////////////////////////////////////////////////////////////////////////
//Función de 1 parámetro que realizará tres tareas: Añadir al objeto gasto pasado como parámetro una propiedad id cuyo valor será el valor actual de la variable global idGasto.
//Incrementar el valor de la variable global idGasto.Añadir el objeto gasto pasado como parámetro a la 
//variable global gastos. El gasto se debe añadir al final del array.
/////////////////////////////////////////////////////////////////////////////////////////

function anyadirGasto(gasto) {

   gasto.id = idgasto
   idgasto += 1
   gastos.push(gasto)

}

function borrarGasto(id) {

    /////////////////////////////////////////////////////////////////////////////////////////
    //Función de 1 parámetro que eliminará de la variable global gastos el objeto gasto cuyo id 
    //haya sido pasado como parámetro. Si no existe un gasto con el id proporcionado, no hará nada.
    /////////////////////////////////////////////////////////////////////////////////////////

   for(let i = 0; i < gastos.length; i++){

        if(gastos[i].id == id){

            gastos.splice(i,1)

        }
   }

}

function calcularTotalGastos() {

    //// //// //// //// //// //// ////
    //Función sin parámetros que devuelva la suma de todos los gastos creados en la variable global gastos
   //// //// //// //// //// //// ////

    let suma = 0

    for(let i = 0; i < gastos.length; i++){

        suma = suma + gastos[i].valor
    }

    return suma
}

function calcularBalance() {
    
    //// //// //// //// //// //// //// //// ////
    ///Función sin paràmetros que devuelva el balance (presupuesto - gastos totales) disponible.
    //// //// //// //// //// //// //// //// ////

    let gastosTotales = calcularTotalGastos()

    let balance = presupuesto - gastosTotales

    return balance

}

////////////////////////////////////////////////////////////////////////////////////////
//Función de un parámetro que devolverá un subconjunto de los gastos existentes (variable global gastos). 
///Se deberá utilizar la función filter. El parámetro será un objeto que podrá tener las siguientes propiedades:
////////////////////////////////////////////////////////////////////////////////////////

function filtrarGastos(opciones)
{
    
     return gastos.filter(function(gasto) 
    {
        let resultado = true;

        //////////////////////
        ///Fecha mínima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse.
        //////////////////////

        if (opciones.fechaDesde)
        {
            if (gasto.fecha < Date.parse(opciones.fechaDesde))
            {
                resultado = false;
            }
        }

        //////////////////////
        ///Fecha máxima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse.
        //////////////////////

        if (opciones.fechaHasta)
        {
            if(gasto.fecha > Date.parse(opciones.fechaHasta))
            {
                resultado = false;
            }
        }

        //////////////////////
        ///Valor mínimo del gasto.
        //////////////////////

        if (opciones.valorMinimo) 
        {
            if (gasto.valor < opciones.valorMinimo) 
            {
                resultado = false;
            }
        }

        //////////////////////
        ///Valor máximo del gasto.
        //////////////////////
        
        if (opciones.valorMaximo)
        {
            if (gasto.valor > opciones.valorMaximo)
            {
                resultado = false;
            }
        }

        /////////////////////////
        ///Trozo de texto que deberá aparecer en la descripción. Deberá hacerse la comparación de manera que no se distingan mayúsculas de minúsculas.
        ////////////////////////////////////////////

        if (opciones.descripcionContiene)
        {
            if (!gasto.descripcion.includes(opciones.descripcionContiene))
            {
                resultado = false;
            }
        }

        /////////////////////////
        //Array de etiquetas: si un gasto contiene alguna de las etiquetas indicadas en este parámetro, se deberá devolver en el resultado. Deberá hacerse la comparación de manera que no se distingan mayúsculas de minúsculas.
        /////////////////////////
        
        if (opciones.etiquetasTiene)
        {           
            let diferenteEtiqueta = true;
            for (let i in opciones.etiquetasTiene)
            {
                for (let j in gasto.etiquetas)
                {
                    if (opciones.etiquetasTiene[i] == gasto.etiquetas[j])
                    {                        
                        diferenteEtiqueta = false;
                    }
                }
            }

            if (diferenteEtiqueta)
            {
                resultado = false;
            }
        }
        
        return resultado;
    });
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}




// // Ejecuciones
// let gasto1 = new CrearGasto("Gasto 1");
// let gasto2 = new CrearGasto("Gasto 2", 23.55);
// let gasto3 = new CrearGasto("Gasto 3", 23.55, "2021-10-06T13:10" );
// let gasto4 = new CrearGasto("Gasto 4", 23.55, "2021-10-06T13:10", "casa" );
// let gasto5 = new CrearGasto("Gasto 5", 23.55, "2021-10-06T13:10", "casa", "supermercado" );
// let gasto6 = new CrearGasto("Gasto 6", 23.55, "2021-10-06T13:10", "casa", "supermercado", "comida" );

// anyadirGasto(gasto1)
// anyadirGasto(gasto2)
// anyadirGasto(gasto3)
// anyadirGasto(gasto4)
// anyadirGasto(gasto5)
// anyadirGasto(gasto6)


// calcularBalance()

// console.log()