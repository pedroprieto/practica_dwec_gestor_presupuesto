let presupuesto = 0;

function actualizarPresupuesto(valor) {

    if ( valor > 0){
        presupuesto = valor;
        return presupuesto;
    } else {
        return valor = -1;
        alert('Valor Negativo')
    }
    
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(desc,num) {

    this.descripcion = desc;    

    if(isNaN(num)|| num<0){
        this.valor = 0;
    } else{
        this.valor = num;
    }

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }
    this.actualizarDescripcion = function(desc){
        this.descripcion = desc;
    }
    this.actualizarValor = function(num){
        if(isNaN(num)|| num<0){
            this.valor = this.valor;
        } else {
            this.valor = num;
        }
    }
}
let gasto = new CrearGasto();
gasto.mostrarGasto();
gasto.actualizarDescripcion();
gasto.actualizarValor();

export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}