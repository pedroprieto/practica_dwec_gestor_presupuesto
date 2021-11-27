// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

//Funcion constructora
function CrearGasto(descripcion, valor, fecha, ...etiquetas) 
{
    // TODO
    //Propiedades
    this.descripcion = descripcion;
    this.etiquetas = [];

    if(!isNaN(valor) && valor >= 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    if (fecha)
    {
        fecha = Date.parse(fecha);
    }
    else
    {
        fecha = Date.now();
    }
    this.fecha = fecha;


    //Metodos
    this.mostrarGasto = function (){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function (){
        let nuevaFecha = new Date(this.fecha);
        let fechaL = nuevaFecha.toLocaleString();
        let texto = "";

        texto += (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaL}\nEtiquetas:\n`);

        //para cada etiqueta la mostramos
        for (let e of etiquetas){
            texto += `- ${e}\n`;
        }
        return texto;
    }
    this.actualizarDescripcion = function(nuevaDescripcion){
        if (nuevaDescripcion != descripcion)
        {
            this.descripcion = nuevaDescripcion;
        }
    }

    this.actualizarValor = function (nuevoValor){
        if(nuevoValor >= 0)
        {
            this.valor = nuevoValor;
        }
    }
    
    this.actualizarFecha = function(fecha){
        //pasamos la fecha en modo string
        fecha = Date.parse(fecha);

        if(fecha)
        {
            this.fecha = fecha;
        }
    }

    this.anyadirEtiquetas = function(...etiquetas){
        let posicion = -1;

        //recorremos las etiquetas buscando a ver si ya existen
        for (let e of etiquetas)
        {
            posicion = this.etiquetas.indexOf(e);

            //si no existe la añadiremos
            if(posicion == -1)
            {
                this.etiquetas.push(e);
            }
        }
    }
    this.anyadirEtiquetas(...etiquetas);

    this.borrarEtiquetas = function(...etiquetas){
        let posicion = -1;

        //recorremos las etiquetas
        for (let e of etiquetas)
        {
            posicion = this.etiquetas.indexOf(e);

            //si existen las eliminamos
            if(posicion != -1)
            {
                this.etiquetas.splice(posicion, 1)
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo)
    {
        let fecha = new Date(this.fecha);

        let dia = fecha.getDate();
        let mes = fecha.getMonth()+1;
        let anyo = fecha.getFullYear();

        if (mes < 10)
        {
            mes = `0${mes}`
        }
        if (dia < 10)
        {
            dia = `0${dia}`
        }

        if (periodo == "mes")
        {
            return `${anyo}-${mes}`;
        }
        else if (periodo == "anyo")
        {
            return `${anyo}`;
        }
        else if (periodo == "dia")
        {
            return `${anyo}-${mes}-${dia}`;
        }
        else
        {
            return `${anyo}- ${mes}-${dia}`;
        }
    }
}

//FUNCIONES
function actualizarPresupuesto(nuevoPresupuesto) 
{
    // TODO
    if (!isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0) //controlamos que nuevoPresupuesto sea un numero y mayor = que 0
    {
        presupuesto = nuevoPresupuesto;
    }
    else
    {
        nuevoPresupuesto = -1;
        console.log("Error en el presupuesto");
    }

    return nuevoPresupuesto;
}

function mostrarPresupuesto() 
{
    // TODO
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}
function listarGastos()
{
    return gastos;
}
function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;

    //añadimos el objeto a la variable gastos al final del array
    gastos.push(gasto);
}
function borrarGasto(id)
{
    let posicion = gastos.findIndex(gasto => gasto.id === id);

    if (posicion != -1)
    {
        gastos.splice(posicion, 1);
    }
}
function calcularTotalGastos()
{
    let suma = 0;

    for (let g of gastos)
    {
        suma += g.valor;
    }

    return suma;
}
function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}

let gastosFiltrados = [];
function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene})
{
    gastosFiltrados =  gastos.filter(function(gasto)
    {
        let resultado = true;

        if (fechaDesde)
        {
            if (gasto.fecha < Date.parse(fechaDesde))
            {
                resultado = false;
            }
        }

        if (fechaHasta)
        {
            if (gasto.fecha > Date.parse(fechaHasta))
            {
                resultado = false;
            }
        }

        if (valorMinimo)
        {
            if (gasto.valor < valorMinimo)
            {
                resultado = false;
                return resultado;
            }
        }

        if (valorMaximo)
        {
            if (gasto.valor > valorMaximo)
            {
                resultado = false;
                return resultado;
            }
        }

        if(etiquetasTiene)
        {
            var tieneAlguna = false;

            for ( let e of etiquetasTiene)
            {
                if (gasto.etiquetas.indexOf(e) > -1)
                {
                    tieneAlguna = true;
                    break;
                }
            }
            if (!tieneAlguna)
            {
                resultado = false;
            }
        }

        if (descripcionContiene)
        {
            if (gasto.descripcion.indexOf(descripcionContiene) == -1)
            {
                resultado = false;
            }
        }

        return resultado;
    });

    return gastosFiltrados;
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta)
{
    return filtrarGastos({etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta})

    .reduce(function(acc, gasto)
    {
        let agrupar = gasto.obtenerPeriodoAgrupacion(periodo)

        if (!acc[agrupar])
        {
            acc[agrupar] = 0;
        }

        acc[agrupar] += gasto.valor;

        return acc;
    },
    {});
}

function transformarListadoEtiquetas(etiquetasTiene) 
{                                  //usamos + porque las etiquetas se pueden repetir, si no lo pusieramos no se podria repetir la etiqueta casa por ejemplo
    let palabras = /[a-z0-9]+/gi; //Todas las coincidencias de letras sin distinguir mayus y minusculas. Tambien pueden llevar numeros
    let resul = etiquetasTiene.match(palabras);

    return resul;
}

function cargarGastos(arrayGastos)
{
    gastos = arrayGastos;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   
{
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
