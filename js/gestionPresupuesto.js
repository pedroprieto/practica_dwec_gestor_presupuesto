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

    if ( fecha ) {
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

    this.mostrarGastoCompleto = function() {  
        let txt = "";
        let fecha = new Date( this.fecha );
        let fechaISO = fecha.toLocaleString();

        txt += (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaISO}\nEtiquetas:\n`);
                    
        for ( let e of this.etiquetas ){            
            txt += (`- ${e}\n`);         
        }
        
        return txt;
    }

    this.actualizarDescripcion = function( descripcion ) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function( valor ) {
        if ( !isNaN( valor ) && valor >= 0 ) {
            this.valor = valor;
        }
    }

    this.actualizarFecha = function( fecha ) {
        // Recibe la fecha como string
        fecha = Date.parse( fecha );

        if ( fecha ) {
            this.fecha = fecha;
        }   
    }

    this.anyadirEtiquetas = function( ...etiquetas ) {
        //Recorre el vector etiquetas buscando si ya existe la etiqueta que le pasamos por parámetro
        let pos = -1;

        for ( let e of etiquetas ) {
            pos = this.etiquetas.indexOf( e );

            // Si no existe, lo añade
            if ( pos == -1 ){
                this.etiquetas.push( e );
            }
        }        
    }
    this.anyadirEtiquetas(...etiquetas);

    this.borrarEtiquetas = function( ...etiquetas ) {         
        //Recorre el vector etiquetas buscando nombres de etiquetas pasados por parámetro
        let pos = -1;
    
        for ( let e of etiquetas ) {
            pos = this.etiquetas.indexOf( e );

            // Si existe, lo borra
            if ( pos != -1 ){
                this.etiquetas.splice( pos, 1 );
            }
        }        
    }
}

//------------------------------------------------------------//

// Funciones con solo RETURN

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);    
}

function listarGastos() {
    return gastos;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

//------------------------------------------------------------//

// FUNCIONES

function actualizarPresupuesto( valor ) {
    // Actualiza la variable global presupuesto
    if ( !isNaN( valor ) && valor >= 0 ) {    
        return presupuesto = valor;
    }
    else {
        return -1;
    }
}

function anyadirGasto( g ) {    
    // Añade propiedad id al objeto gasto pasado por parámetro
    g.id = idGasto;
    idGasto++;

    // Añadir el objeto gasto a la variable global gastos
    gastos.push( g );
}

function borrarGasto( id ) {         
    //Borra el objeto cuyo id coincida con el pasado por parámetro
    let pos = gastos.findIndex( gasto => gasto.id === id );

    // Si existe, lo borra
    if ( pos != -1 ){
        gastos.splice( pos, 1 );
    }
}

function calcularTotalGastos() {
    // Suma de todos los gastos
    let sumAll = 0;
    
    for ( let g of gastos ) {
        sumAll += g.valor;
    }

    return sumAll;
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
    calcularBalance
}