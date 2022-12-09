// TODO: Crear las funciones, objetos y variables indicadas en el enunciado


// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
   if (!isNaN(valor) && valor>0){
     return presupuesto = valor;
   }
   else{
    return -1
   }
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`)
}

function CrearGasto( descripcion, valor, fecha, ...etiquetas ) {
    //Función constructora
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    this.etiquetas = [];

    if (fecha){
        fecha = Date.parse(fecha);
    }
    else {
        fecha = Date.now();
    }
    this.fecha = fecha;

    //Método mostrarGasto
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    //Método actualizarDescripcion
    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    }

    //Método actualizarValor
    this.actualizarValor = function (valor){
        if ( !isNaN (valor) && valor >= 0) {
            this.valor = valor;
        }       
    }

    //Método anyadirEtiquetas
    this.anyadirEtiquetas = function( ...etiquetas ) {
        let pos = -1;

        for ( let e of etiquetas ) {
            pos = this.etiquetas.indexOf( e );

            if ( pos == -1 ) {
                this.etiquetas.push( e );
            }
        }        
    }
    this.anyadirEtiquetas(...etiquetas);

    //Método borrarEtiquetas
    this.borrarEtiquetas = function( ...etiquetas ) {         
        let pos = -1;
    
        for ( let e of etiquetas ) {
            pos = this.etiquetas.indexOf( e );

            if ( pos != -1 ) {
                this.etiquetas.splice( pos, 1 );
            }
        }        
    }

    //Método mostrarGastoCompleto
    this.mostrarGastoCompleto = function() {  
        let txt = "";
        let fecha = new Date( this.fecha );
        let fechaLocal = fecha.toLocaleString();

        txt += (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocal}\nEtiquetas:\n`);
                    
        for ( let e of this.etiquetas ){            
            txt += (`- ${e}\n`);         
        }
        
        return txt;
    }

    //Método actualizarFecha
    this.actualizarFecha = function (fecha){
        fecha = Date.parse (fecha);

        if (fecha){
            this.fecha = fecha;
        }
    }

    //Método obtenerPeriodoAgrupación
    this.obtenerPeriodoAgrupacion = function (periodo){
        let fecha = new Date (this.fecha).toISOString();

        switch (periodo) {
            case "dia":
                return fecha.substr(0,10);
                break;

            case "mes":
                return fecha.substr(0,7);
                break;
            
            case "anyo":
                return fecha.substr(0,4);
                break;
        }

    }
}

    //Función listarGastos
    function listarGastos(){
        return gastos;
    }

    //Función anyadirGasto
    function anyadirGasto (gasto){
        gasto.id = idGasto;

        idGasto++

        gastos.push(gasto);
    }

    //Función borrarGasto
    function borrarGasto(id){
        let pos = gastos.findIndex(gasto => gasto.id === id);

        if(pos !=-1){
            gastos.splice(pos,1);
        }
    }

    //Función calcularTotalGastos
    function calcularTotalGastos (){
        let total = 0;

        for (let g of gastos){
            total += g.valor;
        }
        return total;
    }

    //Función calcularBalance
    function calcularBalance (){
        return presupuesto - calcularTotalGastos();
    }

    //Función filtrarGastos
    function filtrarGastos( {fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene} ){

        return gastos.filter( function( gasto ) {
    
            let resultado = true;
        
            if ( fechaDesde ){
                if( gasto.fecha < Date.parse( fechaDesde )){
                    resultado = false;
                }
            } 
    
            if ( fechaHasta ){
                if( gasto.fecha > Date.parse( fechaHasta )){
                    resultado = false;
                }
            }
    
            if ( valorMinimo ){
                if( gasto.valor < valorMinimo ){
                    resultado = false;
                }
            }
        
            if ( valorMaximo ){
                if( gasto.valor > valorMaximo ){
                    resultado = false;
                }
            }
    
            if (descripcionContiene){
                if( gasto.descripcion.indexOf( descripcionContiene ) == -1){
                    resultado = false;
                }
            }
    
            if (etiquetasTiene){
                let encontrado = false;
    
                for ( let a of gasto.etiquetas ){
                    for ( let b of etiquetasTiene ){
    
                        if ( a == b ){
                            encontrado = true;
                        }
                    }
                }
                if ( !encontrado ){
                    resultado = false;
                }
            }
        
            return resultado;
        }); 
    }
    


    //Función agruparGastos
    function agruparGastos (periodo, etiquetas, fechaDesde, fechaHasta){

        return filtrarGastos ({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta })

        .reduce (function (acc, gasto) {
            let grupo = gasto.obtenerPeriodoAgrupacion (periodo);

            acc [grupo] = (acc[grupo] || 0) + gasto.valor;

            return acc;
        },

        {})
    }
    
    //https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
        //function groupBy(data, key){   
        //return data
        //.reduce(     (acc, cur) => {
        //acc[cur[key]] = acc[cur[key]] || []; 
        // if the key is new, initiate its value to an array, otherwise keep its own array value         
        //acc[cur[key]].push(cur);         
        //return acc;     
        //}, 
        //[]) 
        //} 

        //Función transformarListadoEtiquetas
        function transformarListadoEtiquetas( etiquetas ){
            // \w – es lo mismo que [a-zA-Z0-9_]
            // i Con esta bandera, la búsqueda no distingue entre mayúsculas y minúsculas
            // g Con esta bandera, la búsqueda encuentra todas las coincidencias
            let etiquetasfiltrado = etiquetas.match(/[\w]+/gi);
            return etiquetasfiltrado;
        }

        //Función cargarGastos
        function cargarGastos(gastosAlmacenamiento) {
            // gastosAlmacenamiento es un array de objetos "planos"
            // No tienen acceso a los métodos creados con "CrearGasto":
            // "anyadirEtiquetas", "actualizarValor",...
            // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
          
            // Reseteamos la variable global "gastos"
            gastos = [];
            // Procesamos cada gasto del listado pasado a la función
            for (let g of gastosAlmacenamiento) {
                // Creamos un nuevo objeto mediante el constructor
                // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
                // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
                let gastoRehidratado = new CrearGasto();
                // Copiamos los datos del objeto guardado en el almacenamiento
                // al gasto rehidratado
                // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
                Object.assign(gastoRehidratado, g);
                // Ahora "gastoRehidratado" tiene las propiedades del gasto
                // almacenado y además tiene acceso a los métodos de "CrearGasto"
                  
                // Añadimos el gasto rehidratado a "gastos"
                gastos.push(gastoRehidratado)
            }
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
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
