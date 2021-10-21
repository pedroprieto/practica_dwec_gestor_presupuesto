// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

//------------------------------------------------------------//

// CONSTRUCTOR
function CrearGasto( descripcion, valor, fecha, ...etiquetas ) {
    
    // Propiedades

    this.descripcion = descripcion;
    this.valor = ( valor >= 0 ) ? valor : 0;    
    this.etiquetas = [];    

    if ( fecha ){
        fecha = Date.parse( fecha );
    }
    else {
        fecha = Date.now();        
    }
    this.fecha = fecha;


    // Métodos

    this.mostrarGasto = function() {  
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function( descripcion ) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function( valor ) {
        if ( !isNaN( valor ) && valor >= 0 ){
            this.valor = valor;
        }
    }
}

//------------------------------------------------------------//

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);    
}

function listarGastos(){
    return gastos;
}

//------------------------------------------------------------//

function actualizarPresupuesto( valor ) {
    // Actualiza la variable global presupuesto
    if ( !isNaN( valor ) && valor >= 0 ){    
        return presupuesto = valor;
    }
    else {
        return -1;
    }
}

function anyadirGasto( g ){    
    // Añade propiedad id al objeto gasto
    g.id = idGasto;
    idGasto++;

    // Añadir el objeto gasto a la variable global gastos
    gastos.push(g);
}

function borrarGasto( id ){     
    //Recorre el vector gastos buscando un objeto cuyo id coincida con el pasado por parámetro
    for ( let g of gastos ){
        let pos = gastos.indefOf( g.id );
    }

    // Si existe, lo borra
    if ( pos != -1 ){
        gastos.splice( pos, 1 )
    }
}


function calcularTotalGastos(){}
function calcularBalance(){}

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
    calcularBalance
}