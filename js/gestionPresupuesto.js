// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let gastos = [];
let idGasto = 0;
let presupuesto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if(nuevoPresupuesto >= 0){
        presupuesto=nuevoPresupuesto;
        return nuevoPresupuesto;
    }else{
        
        return -1;       
    }
}

function mostrarPresupuesto() {    
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor,fecha, ...etiquetas) {
    
    this.mostrarGasto=function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion=function(descripcion){
        this.descripcion=descripcion;
    }
    this.actualizarValor=function(valor){
        if(valor>=0){
            this.valor=valor;
        }
    }
    this.mostrarGastoCompleto=function(){
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
        for (let etiqueta of this.etiquetas){
            texto +=`- ${etiqueta}\n`
        }
        return texto
    }
    this.actualizarFecha=function(fecha){
        if(Date.parse(fecha)){
            this.fecha=Date.parse(fecha);
        }
    }
    this.anyadirEtiquetas=function(...etiquetasNuevas){
        for(let etiqueta of etiquetasNuevas){
            if(this.etiquetas.indexOf(etiqueta) == -1){
                this.etiquetas.push(etiqueta)
            }
        }

    }
    this.borrarEtiquetas=function(...etiquetasBorrar){
        let nuevaLista=[]
        for(let etiqueta of this.etiquetas){  
            if( etiquetasBorrar.indexOf(etiqueta) == -1){
                nuevaLista.push(etiqueta)
            }
        }
        this.etiquetas=nuevaLista;
    }
    this.descripcion=descripcion;
    if(valor>=0){
        this.valor=valor;
    }else{
        this.valor=0;
    }
    this.etiquetas=[];
    this.anyadirEtiquetas(...etiquetas);
    
    if(Date.parse(fecha)){
        this.fecha=Date.parse(fecha)
    }else{
        this.fecha=Date.parse(new Date())
    }
}
function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id=idGasto;
    idGasto++;
    gastos.push(gasto)
}
function borrarGasto(idGasto){
    gastos.forEach((gasto,index)=>{
        if(gasto.id==idGasto){
            gastos.splice(index,1)
        }
    })
}
function calcularTotalGastos(){
    let gastosTotales=0;
    gastos.forEach(x=> gastosTotales+= x.valor)
    return gastosTotales;
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
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
