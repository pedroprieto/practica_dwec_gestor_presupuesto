// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(numero) {
    if(numero > 0)
    {
     return presumento +=numero;
    }
    else{
        alert("Error, el valor introducido es negativo");
        return -1
    }
}

function mostrarPresupuesto() {
    alert("Tu presupuesto es "+presupuesto)
}

function CrearGasto(numero) {
    
    if (numero > 0){
        let gasto = {}
        gasto = {
            descripcion = '',
            valor = numero
        }
    }
    else{
        descripcion = '',
        valor = 0
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
