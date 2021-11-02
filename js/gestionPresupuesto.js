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
        //Corrección de profesor: modificación this.fecha.
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

    //obtenerPeriodoAgrupacion - Función de un parámetro que devolverá el período de agrupación correspondiente al parámetro periodo de la función y a la fecha del gasto. 
    //Si el período a agrupar es dia, el período de agrupación tendrá el formato aaaa-mm-dd; si es mes, tendrá el formato aaaa-mm; y si es anyo, tendrá el formato aaaa. Ejemplos:
    this.obtenerPeriodoAgrupacion = function (periodo)
    {
        //Aquí igual: tienes que poner this.fecha. Además, como this.fecha es un timestamp, antes tendrás que pasarla a cadena de texto.
        //Previa conversión a objeto Date
        let fechaAux = new Date(this.fecha);

        //El método toISOString() devuelve una cadena en el formato simplicado extendido ISO 8601 según la hora universal.
        fechaAux = fechaAux.toISOString();

        //Corrección de profesor: modificación this.fecha.
        //let fechaAux = fecha; (pasa el test pero no es correcto)
        //Si utilizamos directamente fecha, no pasará la prueba de: el día. Se quedará solamente con el formato aaaa de la última prueba: anyo.

        if (periodo == "dia")
        {           
            //str.slice y arr.slice([principio], [final]): sirven para devolver un substring o subarray copiando en el mismo los elementos que le indiquemos. 
            //Aceptan negativos y la posición es desde el final.
            fechaAux = fechaAux.slice(0,10);
            //fecha = fecha.slice(0,10);
        }  

        else if (periodo == "mes")
        {
            fechaAux = fechaAux.slice(0,7);
            //fecha = fecha.slice(0,7);
        }

        else if (periodo == "anyo")
        {
            fechaAux = fechaAux.slice(0,4);
            //fecha = fecha.slice(0,4);
        }
           
        //return fecha;
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


//Función de un parámetro que devolverá un subconjunto de los gastos existentes (variable global gastos). 
//Se deberá utilizar la función filter. El parámetro será un objeto que podrá tener las siguientes propiedades: 
//fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene.
function filtrarGastos (opciones)
{
    //Hasta que no he visto el vídeo de la tutoría del 26 de octubre no he sabido por donde cogerlo. Una vez visto el ejemplo
    //con los valores minimo y maximo, el resto es muy similar. Dejo anotadas las ayudas que has dado en el vídeo.

    //gastos.filter(); esto va a estar por algún lado
    //return gastos.filter(function(gastos) podemos hacer que lo devuelva directamente. 
    return gastos.filter(function(gasto) 
    {
        //Y aqui el código para detectar si se cumplen las condiciones dadas en opciones para el gasto que estéis procesando
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

        //Primero miramos si existe valorMinimo, si no, no hace falta que compruebe nada.
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
            //Utilizamos includes igual que hicimos con anaydir etiquetas
            if (!gasto.descripcion.includes(opciones.descripcionContiene))
            {
                resultado = false;
            }
        }

        //Al igual que en c# en 1º, utilizamos un for dentro de otro for para ver si son iguales las etiquetas.
        if (opciones.etiquetasTiene)
        {           
            let diferenteEtiqueta = true;
            //Para no utilizar el método "tradicional" con length, he probado a usar for..of y for..in
            //He utilizado breakpoints para comprobar que: for..of siempre nos va a dar el valor undefined. 
            //for..in itera sobre todas las propiedades, no sólo las númericas.
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

//Función de cuatro parámetros que devolverá un objeto con los resultados de realizar una agrupación por período temporal. 
//Los parámetros son: periodo, etiquetas, fechaDesde, fechaHasta.
function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta)
{  
    /*Al igual que con filter, iba dando palos de ciego hasta que en el vídeo de la tutoría has dado un poco de luz y has encauzado el problema.
    Las ideas que has dado son las siguientes:

    resul = arr.reduce(miAcumulador, {})
    function miAcumuladorPractica(acc, gasto) 
    {
        Para cada gasto se obtendra periodo de agrupacion.
        let pA = gasto.obtenerPeriodoAgrupacion(periodo);
      
        acc[pA] = acc[pA] + gasto.valor; esto no va a funcionar la primera vez porque acc[pA] no existe, previo a esto hay que detectarlo.

        if (acc[pA]) 
        {   
            blabla
        }
        si no, haz la asignacion
        
        acc[pA] = acc[pA] + gasto.valor;

        return acc;
    }

    A raíz de toda esta información, he ido extrapolando y haciendo comprobaciones para llegar a la solución:
    
    let etiquetasTiene = etiquetas; 
    let gastosFiltrados = filtrarGastos({etiquetasTiene, fechaDesde, fechaHasta});

    return gastosFiltrados.reduce(miAcumuladorPractica, {})

    function miAcumuladorPractica(acc, gasto) 
    {
        let pA = gasto.obtenerPeriodoAgrupacion(periodo);   
        if (!acc[pA])
        {
            acc[pA] = 0;
        }        
        acc[pA] = acc[pA] + gasto.valor; 
        
        return acc;
    }
    Sabiendo que ya funciona, he intentado comprimirlo como mencionas para no tener que llamar 
    a una función extra sino hacerlo directamente en el .reduce.

    Una vez que has ayudado con la solución, leo el enunciado por partes y parece muy "sencillo", pero para enfocarlo desde 0 he sido incapaz :(
    */

    let etiquetasTiene = etiquetas; 
    //En primer lugar se llamará a filtrarGastos para obtener el subconjunto de 
    //gastos creados entre las fechas indicadas y que tengan alguna de las etiquetas proporcionadas en el parámetro correspondiente.
    let gastosFiltrados = filtrarGastos({etiquetasTiene, fechaDesde, fechaHasta});
      
    //Ejecutar reduce sobre el conjunto de gastos filtrados. **El valor inicial del acumulador de reduce será un objeto vacío.
    return gastosFiltrados.reduce(function(acc, gasto)
    {
        //Dentro del cuerpo de la función de reduce, para cada gasto se obtendrá su período de agrupación (a través del método obtenerPeriodoAgrupacion
        //del gasto y el parámetro periodo), que se utilizará para identificar la propiedad del acumulador sobre la que se sumará su valor. 
        let pA = gasto.obtenerPeriodoAgrupacion(periodo);   

        //Así, si periodo = mes, un gasto con fecha 2021-11-01 tendrá un período de agrupación 2021-11, por lo que su valor se sumará a acc["2021-11"]     
        //(siempre que la variable del acumulador haya recibido el nombre acc en la llamada a reduce). 
        if (!acc[pA])
        {
            acc[pA] = 0;
        }
        
        acc[pA] = acc[pA] + gasto.valor; 
    
        return acc;       
    }, {});
    //{} **El valor inicial del acumulador de reduce será un objeto vacío. 
    
    //El ejemplo del manual:
    //let value = arr.reduce(function(accumulator, item, index, array) {
    //    // ...
    //  }, [initial]); de ahí la terminacion }, {});
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