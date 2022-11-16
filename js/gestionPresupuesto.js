// Variables Globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// FUNCIONES PRACTICA JAVASCRIPT I
//==============================================================================
function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0){
        return presupuesto = cantidad;
        } else{
            return -1;
            console.log("Presupuesto inferior a 0");
        }    
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;    
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // Parámetros de JavaScript I
    ////////////////////////////////////////////////////////////////////
    //descripcion
    this.descripcion = descripcion;
    //valor
    if (valor < 0 || isNaN(valor)){
        this.valor = 0;
    } else{
        this.valor = valor;
    }
    // Parámetros JavaScript II
    ////////////////////////////////////////////////////////////////////
    // fecha
    fecha = Date.parse(fecha);
    if (fecha == null || isNaN(fecha)){
        this.fecha = +new Date(); // se pasa a timestamp con el + delante
    } else{
        this.fecha = fecha; // sirve para pasar la fecha a formato timestamp
    }
    //etiqueta
    this.etiquetas = etiquetas;
    if(etiquetas == null){
        this.etiquetas = [];
    }
    
    // METODOS de JavaScript I
    //////////////////////////////////////////////////////////////////////////////////////
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (descripcion){
        this.descripcion = descripcion;
    }

    this.actualizarValor = function (valor){
        if (valor >= 0 & isNaN(valor) == false){
            this.valor = valor;
        }
    }

    // METODOS de JavaScript II
    ///////////////////////////////////////////////////////////////////////////////////////
    this.anyadirEtiquetas = function(...etiquetas){
        for (const i of etiquetas){
            // comprobar si existe en la lista, si no existe, añadirlo
            if (this.etiquetas.includes(i) == false){
                this.etiquetas.push(i);
            }
        }
    }

    this.actualizarFecha = function(nuevaFecha){
        nuevaFecha = Date.parse(nuevaFecha);
        if(!isNaN(nuevaFecha)){
            this.fecha = +new Date(nuevaFecha);
        }
    }

    this.borrarEtiquetas = function(...nuevaEtiqueta){
        for(var i = 0; i < nuevaEtiqueta.length; i++){
            for(var etiqueta = 0; etiqueta < this.etiquetas.length; etiqueta++){
                if(nuevaEtiqueta[i] == this.etiquetas[etiqueta]){
                    this.etiquetas.splice(etiqueta,1)
                }
            }
        }
    }

    this.mostrarGastoCompleto = function(){
        var fechaLocal = new Date(this.fecha).toLocaleString();
        var texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${fechaLocal}\n`;
        texto += `Etiquetas:\n`;
        this.etiquetas.forEach(function(i){
            texto += `- ${i}\n`; })
        return texto;
    }

        // METODOS de JavaScript III
    ///////////////////////////////////////////////////////////////////////////////////////
    this.obtenerPeriodoAgrupacion = function(periodo){
        var anyo = Intl.DateTimeFormat('es', {year: 'numeric'}).format(this.fecha);
        var mes = Intl.DateTimeFormat('es', {month: '2-digit'}).format(this.fecha);
        var dia = Intl.DateTimeFormat('es', {day: '2-digit'}).format(this.fecha);

        if(periodo == "anyo"){
            return anyo;
        }
        else if (periodo == "mes"){
            return anyo + "-" + mes;
        }
        else if (periodo == "dia"){
            return anyo + "-" + mes + "-" + dia;
        }
    }
}

// FUNCIONES JAVASCRIPT II
//////////////////////////////////////////////////////////////////////////////////////////
function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
    
}

function borrarGasto(id){
    for(var i = 0; i < gastos.length; i++){
        if(gastos[i].id == id){
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos(){
    var totalGasto = 0;
    for(var i = 0; i < gastos.length; i++){
        totalGasto += gastos[i].valor;
    }
    return totalGasto;
}

function calcularBalance(){
    return (presupuesto - calcularTotalGastos())
}

// FUNCIONES DE JavaScript III
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function filtrarGastos({...filtrar}){
    // me guardo en la lista resultados todos los gastos, ya que trabajare sobre ella (no quiero modificar la original)
    let resultado = gastos;

    if (Object.entries(filtrar).length === 0){ // Si el objeto esta vacio 
        return resultado; 
    }
    else{
        // Recorrer todas la propiedades del objeto
        for(var prop in filtrar){
            //console.log("propiedad: "+prop);
            //console.log("valor: "+filtrar[prop]);

            if(prop == "fechaDesde"){
                var fechaDesde = Date.parse(filtrar[prop]);
                if (!isNaN(fechaDesde)){
                    fechaDesde = +new Date(fechaDesde); // se pasa a timestamp
                    resultado = resultado.filter(gasto => gasto.fecha >= fechaDesde); // se eliminan los valore menores a la fecha Min
                }
            }
            
            if(prop == "fechaHasta"){
                var fechaHasta = Date.parse(filtrar[prop]);
                if (!isNaN(fechaHasta)){
                    fechaHasta = +new Date(fechaHasta); // se pasa a timestamp
                    resultado = resultado.filter(gasto => gasto.fecha <= fechaHasta); // se elimina los valores superiores a la fecha Max - me quedo con los menores
                }
            } 

            if(prop == "valorMinimo"){
                var valorMinimo = filtrar[prop];
                if(!isNaN(valorMinimo)){
                    resultado = resultado.filter(gasto => gasto.valor >= valorMinimo);
                }  
            }

            if(prop == "valorMaximo"){
                var valorMaximo = filtrar[prop];
                if(!isNaN(valorMaximo)){
                    resultado = resultado.filter(gasto => gasto.valor <= valorMaximo);
                }  
            }

            if(prop == "descripcionContiene"){
                let descripcionContiene = filtrar[prop].toLowerCase();
                
                // busco en que objetos se encuentra la palabra buscada
                let posicion = [];
                for (var i = 0; i < resultado.length; i++){
                    let descripcion = resultado[i].descripcion.toLowerCase();
                    if(!descripcion.includes(descripcionContiene)){
                        posicion += resultado[i].id;
                    }
                }    
                // eliminamos los objetos de la lista resultado
                for(var i = 0 ; i < posicion.length; i++){
                    for(var j = 0; j < resultado.length; j ++){
                        if(posicion[i] == resultado[j].id){
                            resultado.splice(j, 1);
                        }
                    }
                }   
            }

            if(prop == "etiquetasTiene"){
                let etiquetasTiene = filtrar[prop];
                // busco en que objetos se encuentra la palabra buscada
                let posicion = [];
                for( let etiqueta = 0; etiqueta < etiquetasTiene.length; etiqueta++){
                    let etiq = etiquetasTiene[etiqueta].toLowerCase();                    
                    
                    // recoro los objetos de la lista resultados
                    for (var i = 0; i < resultado.length; i++){
                        // recorro las etiquetas de cada objeto
                        for(var j = 0; j < resultado[i].etiquetas.length; j++){
                            let palabra = resultado[i].etiquetas[j].toLowerCase();
                            // si encuentro la etiqueta que busco me devuelve el id del objeto que la contiene
                            if(palabra.includes(etiq)){
                                posicion += resultado[i].id
                            }
                        }
                    }
                }
                // consigo los id de los objetos que no tienen las etiquetas buscadas
                let eliminar = [];
                for( var i = 0; i <=resultado.length -1; i++){
                    if(!posicion.includes(i)){
                        eliminar += i;
                    }
                }
                // elimino los objetos que no tienen las etiquetas
                for(var i = 0 ; i < eliminar.length; i++){
                    for(var j = 0; j < resultado.length; j ++){
                        if(eliminar[i] == resultado[j].id){
                            resultado.splice(j, 1);
                        }
                    }
                }
            }





        }
    }
    // PARA COMPROBAR SI EL RESULTADO OBTENIDO ES EL CORRECTO
    /*
    console.log("\n--------------Queda esto ---------------\n")
    console.log(resultado);
    console.log("\n-----------------------------\n")
    return resultado;
    */

}

function agruparGastos(){

}

// COMPROBAR SI FUNCIONA EL CODIGO

/*
let valor1 = 23.44,
    valor2 = 12.88,
    valor3 = 22.80,
    valor4 = 62.22,
    valor5 = 304.75,
    valor6 = 195.88;

let gasto1 = new CrearGasto("Compra carne", valor1, "2021-10-06", "casa", "comida" );
let gasto2 = new CrearGasto("Compra fruta y verdura", valor2, "2021-09-06", "supermercado", "comida" );
let gasto3 = new CrearGasto("Bonobús", valor3, "2020-05-26", "transporte" );
let gasto4 = new CrearGasto("Gasolina", valor4, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new CrearGasto("Seguro hogar", valor5, "2021-09-26", "casa", "seguros" );
let gasto6 = new CrearGasto("Seguro coche", valor6, "2021-10-06", "transporte", "seguros" );

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);
//console.log("Filtrados: "+filtrarGastos({fechaDesde: "2021-10-10"}));
console.log("\n++++++++++++++++++++++++++++++++\n")
console.log("Filtrados: "+ filtrarGastos({etiquetasTiene: ["comida", "gasolina"]}));

console.log("Gastos: " + gastos);
console.log("Resultados: " + filtrarGastos({etiquetasTiene: ["comida", "gasolina"]}).length)
*/








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
