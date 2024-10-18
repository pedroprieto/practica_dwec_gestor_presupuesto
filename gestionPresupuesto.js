let presupuesto = 0; // variable global

function ActualizarPresupuesto (numero){
    if (numero>=0){
        return presupuesto=presupuesto+numero;
    }
    else{ 
        console.log("Has introducido un numero negativo");
        return -1;
    };
}

function MostrarPresupuesto (){
    return `Tu presupuesto actual es de ${presupuesto}`;
}


 function CrearGasto (valor, descripcion){//funcion constructora
    this.descripcion=descripcion;
    if (valor>=0){
        this.valor=valor;
        }
        else{
        this.valor=0;
        console.log("Has introducido un gasto negativo. Error.")
        }

     this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(descripcionNueva){
        this.descripcion=descripcionNueva;
    }

    this.actualizarValor= function(valor){
        if (valor>=0){
        this.valor=valor;
        }
        else{//no se modifica el valor.
        console.log("Has introducido un gasto negativo. No se generarán cambios.")
        }
    }

 }