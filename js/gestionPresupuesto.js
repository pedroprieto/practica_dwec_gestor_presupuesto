// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(resultt)
 {
    if (resultt >= 0)
    {
        presupuesto = resultt;
        return resultt;
    } 
    else
    {
        return -1;
    }
}

function mostrarPresupuesto()
{
    // TODO
    let resulttado = "Tu presupuesto actual es de " + presupuesto + " €";
    
    return resulttado;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas)
{
    // TODO
    this.mostrarGasto = function()
    {
        let resulttado = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
        return resulttado;
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

    this.obtenerPeriodoAgrupacion = function(periodo)
    {
        let fech = new Date(this.fecha);
        if((periodo == "mes") || !periodo)
        {
            return fech.toISOString().substr(0,7);
        }
        if((periodo == "anyo") || !periodo)
        {
            return fech.toISOString().substr(0,4);
        }
        if((periodo == "dia") || !periodo)
        {
            return fech.toISOString().substr(0,10);
        }
        return fech.toISOString().substr(0,7);
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

function filtrarGastos(datos)
{
    return gastos.filter(function(dat)
    {
        let result = true;
        if (datos.fechaDesde)
        {
            var fech = Date.parse(datos.fechaDesde);
            result = result && (dat.fecha >= fech);
        }
        if (datos.fechaHasta)
        {
            var fech = Date.parse(datos.fechaHasta);
            result = result && (dat.fecha <= fech);
        }
        if (datos.valorMinimo)
        {
            result = result && (dat.valor >= datos.valorMinimo);
        }
        if (datos.valorMaximo)
        {
            result = result && (dat.valor <= datos.valorMaximo);
        }
        if (datos.descripcionContiene)
        {
            result = result && (dat.descripcion.indexOf(datos.descripcionContiene) >= 0);
        }
        if (datos.etiquetasTiene)
        {
            let tieneeti = false;
            for (let eti of datos.etiquetasTiene)
            {
                if (dat.etiquetas.indexOf(eti) >= 0)
                {
                 tieneeti = true;
                }
            }
            result = result && tieneeti;
        }
        return result;
    }
    )
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta)
{
    let gastosfiltrados = filtrarGastos({etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta});
    return gastosfiltrados.reduce(function(acumulador, gasto)
    {
        let rango = gasto.obtenerPeriodoAgrupacion(periodo);
        if(acumulador[rango])
        {
            acumulador[rango] = acumulador[rango] + gasto.valor;
        }
        else
        {
            acumulador[rango] = gasto.valor;
        }
        return acumulador;
    },
    {}
    )
}



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
    CrearGasto,
    filtrarGastos,
    agruparGastos

}
