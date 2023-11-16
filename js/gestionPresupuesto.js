// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;




function actualizarPresupuesto( valor ) {
    if(valor>0){
        presupuesto =valor;
        return (` ${presupuesto} `)
       
    }     
    else if(valor<0){
        presupuesto=-1;
        return (`${presupuesto}`)
        
    }
    else{
        
        return (`${presupuesto}`)
    }
    mostrarPresupuesto();
}

function mostrarPresupuesto() {
    
    return (`Tu presupuesto actual es de ${presupuesto} €`)
    
}

function CrearGasto( descripcion, valor) {
    this.descripcion=descripcion;
    this.valor=valor;
    if(valor<0 || isNaN(valor)){
        this.valor=0
        return (`gasto= new gasto  ${this.descripcion}  ${this.valor} €`)
    }
    else{
       
        return (`gasto= new gasto  ${this.descripcion}  ${this.valor}`)
    }
}
function mostrarGasto(){
    return(`Gasto correspondiente a ${descripcion} con valor ${valor} €`)
}
function actualizarDescripcion(descripcion){
return (`${descripcion}`)
}
function actualizarValor(valor){
if (valor>0)
return (`${valor}`)
else
return
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
