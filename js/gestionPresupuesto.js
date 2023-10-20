
let presupuesto = 0;

//Función que toma un número por parámetro y lo asigna a la variable global presupuesto.
function actualizarPresupuesto(numero) {
    if (numero >=0){
        presupuesto = numero;
        return presupuesto;
    }
           
    else{
        console.log("Número no valido")
        // Devuelve -1 para indicar un valor no válido
        return -1
        }
    }

//Función sin parámetros que devuelve un texto con el presupuesto
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    // Comprobar si el valor introducido es un número no negativo
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }
    
    // Asignar la descripción
    this.descripcion = descripcion;
    
    // Método para mostrar el gasto
    this.mostrarGasto = function () {
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }
    
    // Método para actualizar la descripción
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    
    // Método para actualizar el valor
    this.actualizarValor = function (nuevoValor) {
        // Comprobar si el nuevo valor es un número no negativo
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }


}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}