// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let Gastos = [];
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

        this.valor = (valor >=0) ? valor : this.valor;
    }

    this.mostrarGastoCompleto = function()
    {
        let comenta = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €." +
        "Fecha: " + new Date(this.fecha).toLocaleString() +
        "Etiquetas:\n";
        
        for(let etiq of this.etiquetas)
        {
            comenta = comenta + " - " + etiq + "\n";
        }
        return comenta;
    }

    this.actualizarFecha = function(fecha)
    {
        let fech = Date.parse(fecha);
        if(fech)
        {
            this.fecha = fech;
        }
    }

    this.anyadirEtiquetas = function(...etiquet)
    {
        for(let etiq of etiquet)
        {
            if(this.etiquetas.indexof(etiq) == -1)
            {
                this.etiquetas.push(etiq);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquet)
    {
        let nuevo = [];
        for(let etiq of this.etiquetas)
        {
            if(etiquet.indexof(etiq) == -1)
            {
                nuevo.push(etiq);
            }
        }
        this.etiquetas = nuevo;
    }

    this.descripcion = descripcion;
    this.valor = (valor >=0) ? valor : 0;

    let fech = Date.parse(fecha);
    if (fech)
    {
        this.fecha = fecha;
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
    return Gastos;
}

function anyadirGastos(gastos)
{
    gastos.id = idGasto++;
    Gastos.push(gastos);
}

function borrarGastos(idGasto)
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
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGastos,
    borrarGastos,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}
