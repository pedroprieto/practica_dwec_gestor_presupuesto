// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valorActual) {
    // TODO
    
    if (valorActual >= 0){
        presupuesto =  valorActual;
        console.log(`Valor de la variable presupuesto es de ${presupuesto} €`);
        return presupuesto;
    } else{
        console.log("Valor no valido");
        return -1;
    }

}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
gasto.id = idGasto;
idGasto = idGasto + 1;
gastos.push(gasto);
}

function borrarGasto(id){
let idnum = Number(id);
let indice = 0;

for (let g of gastos){
    if (g.id == idnum){ 
        indice = gastos.indexOf(g);
        gastos.splice(indice,1);
    }
}
}

function calcularTotalGastos(){
let sumagastos = 0;
for (let g of gastos){
    sumagastos = sumagastos + g.valor; 
    }
    return sumagastos;
}

function calcularBalance(){
let gastosTotal = calcularTotalGastos();
let balance = 0;

balance = presupuesto - gastosTotal;
return balance;

}


function mostrarPresupuesto() {
    // TODO
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){

return gastos.filter(function(gasto){
    let resultado = true;

    if (fechaDesde){
        if(gasto.fecha < Date.parse(fechaDesde)){
            resultado = false;
        }
        } 
    if (fechaHasta){
        if(gasto.fecha > Date.parse(fechaHasta)){
            resultado = false;
        }
        }
    if (valorMinimo){
        if(gasto.valor < valorMinimo){
            resultado = false;
        }
    }
        
    if (valorMaximo){
        if(gasto.valor > valorMaximo){
            resultado = false;
        }
    }
    if (descripcionContiene){
        if(!gasto.descripcion.includes(descripcionContiene)){
            resultado = false;
        }
        }
    if (etiquetasTiene){
        let encontrado = false;
        for (let g of gasto.etiquetas){
            for (let e of etiquetasTiene){
                if (g == e){
                    encontrado = true;
                }
            }
        }
        if (encontrado == false){
            resultado = false;
        }
    }
    
        return resultado;
}); 
}

function agruparGastos(periodo,etiquetas,fechaDesde,fechaHasta){

    let etiquetasTiene = etiquetas;

    if(!periodo){
        periodo = "mes";
    }

    if(!fechaDesde){
        fechaDesde = "2000-01-01";
    }

    if(!fechaHasta){
        fechaHasta = new Date();
    }


    let gastosFiltrados = filtrarGastos({etiquetasTiene,fechaDesde,fechaHasta});
    

    return gastosFiltrados.reduce(function(acum, gasto){
        let pa = gasto.obtenerPeriodoAgrupacion(periodo);
        

        if (!acum[pa]){
            acum[pa] = 0;
        }
            acum[pa] = acum[pa] + gasto.valor;
        
        return acum;

    },{});
      
}


function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    if(valor>=0)
    {
    this.valor = valor;
    }else{
        this.valor = 0;
    }

    if(!fecha)
    {
        fecha = Date.parse(new Date());
        this.fecha = fecha;
    }else{
        fecha = Date.parse(fecha)
        this.fecha = fecha;
    }

    if(!etiquetas)
    {
        this.etiquetas = [];
    }else{
        this.etiquetas = etiquetas;
    }
    


    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    }

    this.mostrarGastoCompleto = function(){
        let fecha2 = new Date(fecha).toLocaleString();
        let textoTotal = `Gasto correspondiente a ${descripcion} con valor ${valor} €.\nFecha: ${fecha2}\nEtiquetas:\n`
        
        for(let eti of etiquetas){
            textoTotal = textoTotal + "- " + eti+ "\n";
        }
        
        return textoTotal;  
    }

    this.anyadirEtiquetas = function(...etiquetasNuevas){
        for(let eti of etiquetasNuevas){
                if(etiquetas.indexOf(eti) == -1){
                    this.etiquetas.push(eti);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetasBorrar){
        let indice = -1;
        for(let eti of etiquetasBorrar){
                if(etiquetas.indexOf(eti) != -1){
                    indice = etiquetas.indexOf(eti);
                    this.etiquetas.splice(indice, 1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let fechaPer;

        if (periodo == "dia"){
            fechaPer = new Date(fecha).toISOString();
            fechaPer = fechaPer.substring(0,10);
            return fechaPer;
        }
        if (periodo == "mes"){
            fechaPer = new Date(fecha).toISOString();
            fechaPer = fechaPer.substring(0,7);
            return fechaPer;
        }
        if (periodo == "anyo"){
            fechaPer = new Date(fecha).toISOString();
            fechaPer = fechaPer.substring(0,4);
            return fechaPer;
        }
    }

    this.actualizarDescripcion = function(descripcionNueva){
        this.descripcion = descripcionNueva;
    }

    this.actualizarValor = function(valorNuevo){
        if (valorNuevo >= 0){
            this.valor = valorNuevo;
        }
    }

    this.actualizarFecha = function(fechaNueva){
        fechaNueva = Date.parse(fechaNueva);
        if (fechaNueva){
            this.fecha = fechaNueva;
        }
    }
 
}

function transformarListadoEtiquetas(etiquetasTotal){

    let arrayFiltrado = etiquetasTotal.match(/[a-z][a-z0-9]*/gi);
    return arrayFiltrado;
}

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
