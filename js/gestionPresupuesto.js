// Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

//-------------------------------------------> FUNCIONES <-------------------------------------
 
function actualizarPresupuesto(num) {
    if(num >= 0){
        presupuesto = num;
        return presupuesto;
    }
    else{
        console.log("No se puede introducir un número negativo.");
        return -1;
    }
}

// 
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

// OBJETO GASTO
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    // Métodos
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return descripcion;
    }

    this.actualizarValor = function(valor){
        if(valor >= 0){
            this.valor = valor;
            return valor;
        }
        else{
            valor = this.valor;
            return valor;
        }
    }

    this.mostrarGastoCompleto = function(){
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
            for(let e of this.etiquetas){
                texto += `- ${e}\n`
            }
            return texto;
    }

    this.actualizarFecha = function(fecha) {
        let f = Date.parse(fecha);
        if (f) {
            this.fecha = f;
        }
    }

    this.anyadirEtiquetas = function(...etiqueta){
        for(let e of etiqueta){
            if(this.etiquetas.indexOf(e) == -1){
                this.etiquetas.push(e);
            }
        }
    }
    
    this.borrarEtiquetas = function(...etqs) {
        let newetiquetas = []; // Crea un nuevo array donde se van a meter las etiquetas que
                               // no estén en el array existente 'etiquetas'

        for (let e of this.etiquetas) { // Recorre el array 'etiquetas' existente
	    if (etqs.indexOf(e) == -1) { // Comprueba si cada una de las etiquetas existentes 
                                     //está en el nuevo array etqs mediante indexOf, == -1 si no está 
                newetiquetas.push(e); // Añade al nuevo array creado cada etiqueta 
                                      //que no esté en el array existente
	    }
        }
        this.etiquetas = newetiquetas; // 
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let f = new Date(this.fecha).toISOString();
        if(periodo == "dia"){
            let fechaDia = f.slice(0,10);
            return fechaDia;
        }
        if(periodo == "mes"){
            let fechaMes = f.slice(0,7);
            return fechaMes;
        }
        if(periodo == "anyo"){
            let fechaAnyo = f.slice(0,4);
            return fechaAnyo;
        }
    }

    // Propiedades
    this.descripcion = descripcion;
    this.valor = (valor >=0) ? valor : 0;
    let f = Date.parse(fecha);
    if(f){
        this.fecha = f;
    }
    else{
        this.fecha = Date.parse(new Date());
    }
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);
}


// FUNCIONES
// 
function listarGastos(){
    return gastos;
}

// 
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

// 
function borrarGasto(idGasto){
    for(let g of gastos){
        if(g.id == idGasto){
            gastos.splice(gastos.indexOf(g), 1);
        }
    }
}

// 
function calcularTotalGastos(){
    let sumaGastos = 0;
    for (let g of gastos){
        sumaGastos += g.valor;
    }
    return sumaGastos;
}

// 
function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

// He copiado la solución porque no me pasaba los test pero no entiendo muy bien.
// En el enunciado dice que tiene que " devolverá un subconjunto de los gastos existentes "
// pero en la solución devuelve result, que está almacenando un booleano...?
function filtrarGastos (filtroGasto){
    return gastos.filter(function(filtrado){
        var resul = true;
        if (filtroGasto.fechaDesde) {
            var f = Date.parse(filtroGasto.fechaDesde);
            resul = resul && (filtrado.fecha >= f);
        }
        if (filtroGasto.fechaHasta) {
            var f = Date.parse(filtroGasto.fechaHasta);
            resul = resul && (filtrado.fecha <= f);
        }
        if (filtroGasto.valorMinimo) {
            resul = resul && (filtrado.valor >= filtroGasto.valorMinimo);
        }
        if (filtroGasto.valorMaximo) {            
            resul = resul && (filtrado.valor <= filtroGasto.valorMaximo);
        }
        if (filtroGasto.descripcionContiene) {
            resul = resul && (filtrado.descripcion.indexOf(filtroGasto.descripcionContiene) > -1);
        }
        if (filtroGasto.etiquetasTiene) {
            let etiqSi = false;
            for (let e of filtroGasto.etiquetasTiene) {
                if (filtrado.etiquetas.indexOf(e) > -1) {
                    etiqSi = true;
                }
            }
            resul = resul && etiqSi;
        }
        return resul;
    })
}
/* ------- Así es como lo había hecho
function filtrarGastos (filtroGasto){
    return gastos.filter(function(filtrado){
        let conjunto_datos = {};
        if (filtroGasto.fechaDesde) {
            var f = Date.parse(filtroGasto.fechaDesde);
            conjunto_datos.fechaDesde = filtrado.fecha >= Date.parse(filtroGasto.fechaDesde);
        }
        if (filtroGasto.fechaHasta) {
            var f = Date.parse(filtroGasto.fechaHasta);
            conjunto_datos.fechaHasta = filtrado.fecha <= Date.parse(filtroGasto.fechaHasta);
        }
        if (filtroGasto.valorMinimo) {
            conjunto_datos.valorMinimo = filtrado.valor >= filtroGasto.valorMinimo;
        }
        if (filtroGasto.valorMaximo) {
            conjunto_datos.valorMaximo = filtrado.valor <= filtroGasto.valorMaximo;
        }
        if (filtroGasto.descripcionContiene) {
            conjunto_datos.descripcionContiene = filtrado.descripcion.indexOf(filtroGasto.descripcionContiene) > -1;
        }
        if (filtroGasto.etiquetasTiene) {
            for (let e of filtroGasto.etiquetasTiene) {
                if (filtrado.etiquetas.indexOf(e) > -1) {
                    conjunto_datos.etiquetasTiene = filtrado.etiquetas[e];
                }
            }
        }
        return conjunto_datos;
    })
}*/
// Copiada
function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){
    let gastos_filtrados = filtrarGastos({etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta});
    // Función reduce --> valor inicial acc(objeto) = objeto vacío
    return gastos_filtrados.reduce(
        function(acc, g){
            // Obtener periodo de agrupación del gasto
            let per = g.obtenerPeriodoAgrupacion(periodo);
            // Comprueba si existe en el acumulador una entrada para el período de agrupación actual
            if(acc[per]){
                // Si existe, le sumamos el valor del gasto actual
                acc[per] += g.valor;
            }else{
                // Si no existe, la creamos con el valor del gasto actual
                acc[per] = g.valor;
            }
            return acc;
        },
        {});
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
