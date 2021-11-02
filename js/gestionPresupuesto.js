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
                    
        // Recorro las etiquetas y las voy añadiendo
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
        //Recorre el vector etiquetas buscando si ya cumpleCondicion la etiqueta que le pasamos por parámetro
        let pos = -1;

        for ( let e of etiquetas ) {
            pos = this.etiquetas.indexOf( e );

            // Si no cumpleCondicion, lo añade
            if ( pos == -1 ) {
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

            // Si cumpleCondicion, lo borra
            if ( pos != -1 ) {
                this.etiquetas.splice( pos, 1 );
            }
        }        
    }

    this.obtenerPeriodoAgrupacion = function( periodo ) {      
        //Devuelve la agrupación de fecha pasada por parámetro
        let fecha = new Date(this.fecha).toISOString();

        switch ( periodo ){
            case "dia":
                // Resultado: "2021-09-06"
                return fecha.substr(0,10); break;

            case "mes":
                // Resultado: "2021-11"
                return fecha.substr(0,7); break;

            case "anyo":
                // Resultado: "2021"
                return fecha.substr(0,4); break;
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

    // Si cumpleCondicion, lo borra
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

// Comprueba si el objeto esta vacio (sin propiedades)
function isObjEmpty( object ) {
    return Object.keys( object ).length === 0;
}

function filtrarGastos( object ) {
    // Devolverá un subconjunto de los gastos existentes

    // Copio el array gastos en un nuevo array 'gastosFiltrados'
    // El array original no se modifica
    let gastosFiltrados = gastos.slice();

    // Si el objeto esta vacio (no se pasan parámetros) -> Devuelve el array gastos
	if ( isObjEmpty(object) ) {
        return gastosFiltrados;
    }

    // if ( object.fechaDesde) -> Si existe la propiedad 'dechaDesde' en el objeto, entra en el if
	if ( object.fechaDesde ) {        
        // gastosFiltrados.filter(condición) -> Si cumple la condición añade el gasto al array, si no pasa al siguiente
		gastosFiltrados = gastosFiltrados.filter((x) => x.fecha >= Date.parse( object["fechaDesde"] ));
    }

	if ( object.fechaHasta ) {
		gastosFiltrados = gastosFiltrados.filter((x) => x.fecha <= Date.parse( object.fechaHasta ));
	}

	if ( object.valorMinimo ) {
		gastosFiltrados = gastosFiltrados.filter((x) => x.valor > object.valorMinimo);
	}

	if ( object.valorMaximo ) {
		gastosFiltrados = gastosFiltrados.filter((x) => x.valor < object.valorMaximo);
	}

	if ( object.descripcionContiene ) {
		gastosFiltrados = gastosFiltrados.filter((x) => x.descripcion.indexOf( object.descripcionContiene ) > -1 );
	}

	if ( object.etiquetasTiene ) {
		gastosFiltrados = gastosFiltrados.filter((x) => {
			for( let valor of x["etiquetas"] ) {
				if ( object.etiquetasTiene.indexOf(valor) > -1 ) {
					return x;
				}
			}
		});
	}
	return gastosFiltrados;
}

function agruparGastos( periodo,etiquetas,fechaDesde, fechaHasta ) {
// Devuelve un objeto con los resultados de realizar una agrupación por período temporal

    // Devuelve un subconjunto de gastos filtrados según los parármetros pasados
    return filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta })

    // Ejecuta reduce sobre el subconjunto de gastos
    .reduce( function( acumulador, gasto ){
        // Para cada gasto se obtiene su período de agrupación
        let agrupacion = gasto.obtenerPeriodoAgrupacion( periodo )

        if( !acumulador[agrupacion] ) {
            acumulador[agrupacion] = 0;
        }

        acumulador[agrupacion] += gasto.valor;

        return acumulador;        
    }, 
    // El valor inicial del acumulador de reduce será un objeto vacío -> {}
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