// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(result)
 {
    if (result >= 0)
    {
        presupuesto = result;
        return result;
    } 
    else
    {
        return -1;
    }
}

function mostrarPresupuesto()
{
    // TODO
    let resultado = "Tu presupuesto actual es de " + presupuesto + " €";
    
    return resultado;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas)
{
    // TODO
    this.mostrarGasto = function()
    {
        let resultado = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
        return resultado;
    }
    this.actualizarDescripcion = function(actualidescrip)
    {
        this.descripcion = actualidescrip;
    }

    this.actualizarValor = function(valor)
    {

        this.valor = (valor >= 0) ? valor : this.valor;
    }

    this.mostrarGastoCompleto = function()
    {
        let coment = `Gasto correspondiente a ${this.descripcion } con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`

        for (let eti of this.etiquetas)
        {
            coment = coment + `- ${eti}\n`
        }

        return coment;

    }

    this.actualizarFecha = function(fecha)
    {
        let fech = Date.parse(fecha);

        if (fech)
        {
            this.fecha = fech;
        }
    }

    this.anyadirEtiquetas = function(...etiquet)
    {
        for (let eti of etiquet)
        {
            if (this.etiquetas.indexOf(eti) == -1)
            {
                this.etiquetas.push(eti);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquet)
    {
        let nuevo = [];

        for (let eti of this.etiquetas)
        {
            if (etiquet.indexOf(eti) == -1)
            {
                nuevo.push(eti);
	        }
        }

        this.etiquetas = nuevo;
    }

    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;

    let fech = Date.parse(fecha);

    if (fech)
    {
        this.fecha = fech;
    }
    else
    {
        this.fecha = Date.parse(new Date());
    }

    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);
    
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gast)
{
    gast.id = idGasto++;

    gastos.push(gast);
}

function borrarGasto(idGasto)
{
    let gast = null;

    for (let gas of gastos)
    {
        if (gas.id == idGasto)
        {
            gast = gas;
        }
    }

    if (gast)
    {
        let despuesGasto = gastos.indexOf(gast);

        gastos.splice(despuesGasto, 1);
    }
}

function calcularTotalGastos()
{
    let Gastototal = 0;

    for (let gas of gastos)
    {
        Gastototal = Gastototal + gas.valor;
    }

    return Gastototal;
}

function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}
/*
function anyadirGasto(gastos)
{
    gastos.id = idGasto++;
    Gastos.push(gastos);
}

function borrarGasto(idGasto)
{
    let gastos = null;

    for(let gast of Gastos)
    {
        if(gast.id == idGasto)
        {
            gastos = gast;
        }
    }

    if(gastos)
    {
        let despuesgastos = Gastos.indexof(gastos);
        Gastos.splice(despuesgastos, 1);
    }
}

function calcularTotalGastos()
{
    let totalGastos = 0;

    for (let gast of Gastos)
    {
        totalGastos = totalGastos + gast.valor;
    }

    return totalGastos;
}

function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}*/



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}
