// Variables globales
    let presupuesto = 0;
    let gastos = [];
    let idGasto = 0;

// Funciones
function actualizarPresupuesto(valor) {
    if (valor >= 0) {
        presupuesto=valor;
        return presupuesto;
    } else {
        console.log(`Error. ${valor} es negativo`);
        return -1;
    }
}

function mostrarPresupuesto() {
    let x = presupuesto;
    return 'Tu presupuesto actual es de '+x+' €';
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    this.descripcion=descripcion;

    if (valor >= 0) {
        this.valor=valor;
    } else {
        this.valor=0;
    }

    fecha = Date.parse(fecha);

    if (fecha === undefined) {
        this.fecha = Date.now(fecha);
    } else if (isNaN(fecha)) {
        this.fecha = Date.now(fecha);
    } else {
        this.fecha = fecha;
    }

    //inicializar etiquetas, así si está vacío se muestra tal cual, porque con if me daba muchos fallos
    this.etiquetas=etiquetas;

    this.anyadirEtiquetas = function(...etiq_Nueva) {
    //si las etiquetas ya existen no se pueden añadir, bucle para comparar y borrar la etiqueta que sobra
    for (let i=0; i<etiq_Nueva.length; i++) {
        if (this.etiquetas.includes(etiq_Nueva[i])) {
            etiq_Nueva.splice(i,1);
        }
    }
    //añadir nuevas etiquetas
    this.etiquetas.push(...etiq_Nueva);
   }

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function() {
        //almacenar fecha en formato local
        let fechalocal = new Date(this.fecha).toLocaleString();

        //almacenar etiquetas para mostrarla en el formato deseado
        let mostraretiquetas="";
            for (let etiqueta of this.etiquetas) {
                mostraretiquetas = mostraretiquetas + "\n- " + etiqueta;
            };
        
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor +
        " €.\nFecha: " + fechalocal + "\n" + 
        "Etiquetas:" + String(mostraretiquetas) + "\n";
    }

    this.actualizarDescripcion = function(descripcion) {
        this.descripcion=descripcion;
    }

    this.actualizarValor = function(valor){
        if (valor>=0) {
            this.valor=valor;
        } else {
            this.valor=this.valor;
        }
    }

    this.actualizarFecha = function(fecha_actual) {
        fecha_actual = Date.parse(fecha_actual);
        
        if (isNaN(fecha_actual)) {
            //si no es valida, no se hacen modificaciones;
            this.fecha;
        } else {
            this.fecha = fecha_actual;
        }
    }
}

function listarGastos() {
    if (gastos.length==0) {
        return String(gastos);
    } else {
        //para mostrar los gastos en forma de lista
        for (let gasto of gastos) { 
            console.log(gasto);
        }
    }
}

function anyadirGasto(){

}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

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
