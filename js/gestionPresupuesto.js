// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
console.log(`Presupuesto inicial: ${presupuesto}`);

// FUNCIONES
function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0){
        return presupuesto = cantidad;
        } else{
            return presupuesto = -1;
            console.log("Presupuesto inferior a 0");
        }    
}
// Comprobar si funciona ------------------------------
actualizarPresupuesto(2);
console.log(`Presupuesto: + ${presupuesto}`);
console.log("\n")
//-----------------------------------------------------


function mostrarPresupuesto() {
    if (presupuesto >= 0){
        return `Tu presupuesto actual es de ${presupuesto} €`;
    }     
}
// Comprobar si funciona--
mostrarPresupuesto();
console.log("\n");
//------------------------


function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    if (valor < 0){
        this.valor = 0;
    } else{
        this.valor = valor;
    }

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${gasto.descripcion} con valor ${gasto.valor} €`;
    }

    this.actualizarDescripcion = function (descripcion){
        this.descripcion = descripcion;
        return this.descripcion;
    }

    this.actualizarValor = function (valor){
        if (valor >= 0){
            this.valor = valor;
        }
        return this.valor;
    }
}
// Comprobar si funciona ---------------------------
let gasto = new CrearGasto("Personal", -5);
console.log(`Descripcion: ${gasto.descripcion}`);
console.log(`Valor: ${gasto.valor}`);
console.log("\n")

console.log("Mostrar Gasto:")
console.log(gasto.mostrarGasto());
console.log("\n")

console.log("Actualizar Descripcion:")
gasto.actualizarDescripcion("Alquiler");
console.log(gasto.mostrarGasto());
console.log("\n");

console.log("Actualizar Valor:")
gasto.actualizarValor(22);
console.log(gasto.mostrarGasto());
//--------------------------------------------------


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
