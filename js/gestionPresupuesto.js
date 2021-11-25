"use strict";

//Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(presupuestoActualizado) { 

    let presupuestoAuxiliar = presupuestoActualizado;

    if (presupuestoAuxiliar >= 0) {   
        presupuesto = presupuestoAuxiliar;    
        } else {
            presupuestoAuxiliar = -1;     
        }

    return presupuestoAuxiliar;               
}


function mostrarPresupuesto() {
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    if (fecha)
    {
        this.fecha = Date.parse(fecha);  
    }   
    else
    {
        this.fecha = Date.now(fecha);  
    }

    if (etiquetas === null)
    {
        this.etiquetas = [];
    }
    else
    {
        this.etiquetas = etiquetas;
    }
    
    this.mostrarGastoCompleto = function()
    {
        let fechaFormatoLocalizado = new Date(this.fecha);

        let gasto = (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaFormatoLocalizado.toLocaleString()}\nEtiquetas:\n- ${etiquetas.join ("\n- ")}\n`);

        return gasto;
    }

    this.actualizarFecha = function(fecha)
    {
        if (fecha = Date.parse(fecha))
        {
            this.fecha = fecha;
        }        
    }

    this.anyadirEtiquetas = function(...etiquetas)
    {
        for (let el of etiquetas)
        {
            if (!this.etiquetas.includes(el))
            {
                this.etiquetas.push(el);
            }
        }  
    }

    this.borrarEtiquetas = function(...etiquetas)
    {
        let indice;  
        for (let el of etiquetas)
        {
            indice = this.etiquetas.indexOf(el); 

            if (indice >=0)
            {
                this.etiquetas.splice(indice, 1);  
            }          
        }
    }


    this.mostrarGasto = function() {
        let gasto = (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        return gasto;
    }

    this.actualizarDescripcion = function (descripcionActualizada) {
        this.descripcion = descripcionActualizada;
    }

    this.actualizarValor = function (valorActualizado) {
        if (valorActualizado > 0) {
            this.valor = valorActualizado;
        }
    }

    this.obtenerPeriodoAgrupacion = function (periodo)
    {
        let fechaAux = new Date(this.fecha);

        fechaAux = fechaAux.toISOString();

        if (periodo == "dia")
        {           
            fechaAux = fechaAux.slice(0,10);
        }  

        else if (periodo == "mes")
        {
            fechaAux = fechaAux.slice(0,7);
        }

        else if (periodo == "anyo")
        {
            fechaAux = fechaAux.slice(0,4);
        }
           
        return fechaAux;
    }
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gastoAnyadido)
{
    gastoAnyadido.id = idGasto;

    idGasto++;

    gastos.push(gastoAnyadido);
}

function borrarGasto(gastoBorrado)
{    
    let indice;  
    indice = gastos.findIndex(item => item.id == gastoBorrado);
    
    if (indice >= 0)
    {
        gastos.splice(indice, 1);
    }    
}

function calcularTotalGastos()
{
    let totalGastos = 0;

    for (let i=0; i < gastos.length; i++)
    {
        totalGastos = totalGastos + gastos[i].valor;
    }

    return totalGastos;
}

function calcularBalance()
{
    let balance;

    balance = presupuesto - calcularTotalGastos();

    return balance;
}


function filtrarGastos (opciones)
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

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta)
{  
    let etiquetasTiene = etiquetas; 
    let gastosFiltrados = filtrarGastos({etiquetasTiene, fechaDesde, fechaHasta});
      
    return gastosFiltrados.reduce(function(acc, gasto)
    {
        
        let pA = gasto.obtenerPeriodoAgrupacion(periodo);   

        acc[pA] = (acc[pA] || 0) + gasto.valor;
    
        return acc;       
    }, {});
}

/*Información relevante tutoria 15 nov
let regexp = /gusta/i;

let str = "me gusta javascript";

Sólo se muestran ejemplos del manual. No se hace hincapié.

Información relevante tutoría 22 nov.
regular expression:
/[a-zA-Z0-9]/g
*/

//La función se utilizará para transformar el listado de etiquetas que introduzca el usuario en el formulario.
//pistas https://es.javascript.info/regexp-methods#str-match-regexp
//pistas https://es.javascript.info/regexp-character-sets-and-ranges#rangos
function transformarListadoEtiquetas(etiquetasTiene)
{
    //https://es.javascript.info/regexp-quantifiers
    //Antes de llegar a las tareas del final de página, vemos exactamente nuestro caso, ¿Podemos usar <\w+> o necesitamos <[a-z][a-z0-9]*>?
    //Dice que <[a-z][a-z0-9]*> es más confiable, sin embargo, no pasa el test, por lo que utilizo la otra opción.
    let regexp = /\w+/g;
    // \w es lo mismo que [a-zA-Z0-9_]
    //Si la expresion regular (regexp) tiene la bandera g, retorna un array de todas las coincidencias como cadenas.

    let resultado = etiquetasTiene.match(regexp);

    return resultado;
}

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
    //Por último, se deberá exportar la función transformarListadoEtiquetas para poder testearla.
    transformarListadoEtiquetas
}