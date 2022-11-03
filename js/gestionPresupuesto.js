// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoValor) {
    if (nuevoValor >= 1) {

        presupuesto = nuevoValor
        return presupuesto

    } else {

        console.log("El valor es negativo")
        return -1
    }

}

function mostrarPresupuesto() {
    // TODO
    let text = `Tu presupuesto actual es de ${presupuesto} €`
    return text

}
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    this.descripcion = descripcion;

    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0
    }

    let dataFecha = Date.parse(fecha)

    if (!dataFecha) {

        this.fecha = Date.parse(new Date())

    } else {

        this.fecha = dataFecha;
    }

    if (!etiquetas) {
        this.etiquetas = [];
    } else {
        this.etiquetas = etiquetas;
    }


    this.mostrarGasto = function () {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.mostrarGastoCompleto = function () {
     
        let fgasto=`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +`Fecha: ${new Date(this.fecha).toLocaleString()}\n`+"Etiquetas:\n"
        
        for (let i=0; i<this.etiquetas.length; i++){
          fgasto +="- " + this.etiquetas[i] +  "\n";
        }
        return fgasto;
    }

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function (valor) {
        if (valor >= 0) {
            this.valor = valor;
        }
    }
    this.actualizarFecha = function (fecha) {

        let dataFecha = Date.parse(fecha)

        if (dataFecha) {
            this.fecha = dataFecha;
        }
    }
    this.anyadirEtiquetas = function (...etiquetas) {
        for (let i = 0; i < etiquetas.length; i++){

            let etiqueta = etiquetas[i];

            if(this.etiquetas.indexOf(etiqueta) === -1){
                
                this.etiquetas.push(etiqueta)
            }
        }
    }
    this.borrarEtiquetas = function (...etiquetas) {
        for (let i = 0; i < etiquetas.length; i++){

            let etiqueta = etiquetas[i];
            let posicion = this.etiquetas.indexOf(etiqueta);

            if (posicion >= 0) {
                this.etiquetas.splice(posicion, 1);
            }
        }
    }
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

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto += 1;
    gastos.push(gasto);
}



function borrarGasto(id) {

    for (let i = 0; i < gastos.length; i++) {

        if (gastos[i].id == id) {
            gastos.splice(i, 1)
        }
    }
}

function calcularTotalGastos() {
    let sumaGastos = 0;

    for (let i = 0; i < gastos.length; i++) {

        sumaGastos = sumaGastos + gastos[i].valor
    }
    return sumaGastos
}

function calcularBalance() {
    let gastostotales = calcularTotalGastos()
    let balance = presupuesto - gastostotales;
    return balance
}


function filtrarGastos(opciones)
{
    
     return gastos.filter(function(gasto) 
    {
        let resultado = true;

        if (opciones.fechaDesde)
        {
            if (gasto.fecha < Date.parse(opciones.fechaDesde))
            {
                resultado = false;
            }
        }

        if (opciones.fechaHasta)
        {
            if(gasto.fecha > Date.parse(opciones.fechaHasta))
            {
                resultado = false;
            }
        }

        if (opciones.valorMinimo) 
        {
            if (gasto.valor < opciones.valorMinimo) 
            {
                resultado = false;
            }
        }
        
        if (opciones.valorMaximo)
        {
            if (gasto.valor > opciones.valorMaximo)
            {
                resultado = false;
            }
        }

        if (opciones.descripcionContiene)
        {
            if (!gasto.descripcion.includes(opciones.descripcionContiene))
            {
                resultado = false;
            }
        }

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



function agruparGastos(){

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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}


// gasto1.obtenerPeriodoAgrupacion("mes");
// // Resultado: "2021-09"
// gasto1.obtenerPeriodoAgrupacion("anyo");
// // Resultado: "2021"
// gasto1.obtenerPeriodoAgrupacion("dia");
// // Resultado: "2021-09-06"

// Ejecuciones

// let gasto1 = new CrearGasto("1 Compra carne", 10, "2021-10-06", "casa", "comida" );
// let gasto2 = new CrearGasto("2 Compra fruta y verdura", 10, "2021-09-06", "supermercado", "comida" );
// let gasto3 = new CrearGasto("3 Bonobús", 30, "2020-05-26", "transporte" );
// let gasto4 = new CrearGasto("4 Gasolina", 40, "2021-10-08", "transporte", "gasolina" );
// let gasto5 = new CrearGasto("5 Seguro hogar", 50, "2021-09-26", "casa", "seguros" );
// let gasto6 = new CrearGasto("6 Seguro coche", 60, "2021-10-06", "transporte", "seguros" );
// anyadirGasto(gasto1);
// anyadirGasto(gasto2);
// anyadirGasto(gasto3);
// anyadirGasto(gasto4);
// anyadirGasto(gasto5);
// anyadirGasto(gasto6);



// const awe = filtrarGastos({etiquetasTiene: ["comida"]})

// console.log( awe )



// fechaDesde - Fecha mínima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse.
// fechaHasta - Fecha máxima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse.
// valorMinimo - Valor mínimo del gasto.
// valorMaximo - Valor máximo del gasto.
// descripcionContiene - Trozo de texto que deberá aparecer en la descripción. Deberá hacerse la comparación de manera que no se distingan mayúsculas de minúsculas.
// etiquetasTiene