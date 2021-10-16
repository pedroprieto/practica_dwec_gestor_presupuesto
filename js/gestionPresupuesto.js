"use strict";
// No se si quieres que usemos la forma "moderna". En el manual habla de omitirlo cuando utilicemos todo clases y módulos, pero por ahora lo dejo si no me dices lo contrario. 

// Variable global
let presupuesto = 0;

/* Función de 1 parámetro que se encargará de actualizar la variable global presupuesto.
Esta función comprobará que el valor introducido es un número no negativo: en caso de que sea un dato válido, 
actualizará la variable presupuesto y devolverá el valor del mismo; en caso contrario, mostrará un error por pantalla y devolverá el valor -1*/
function actualizarPresupuesto(presupuestoActualizado) { 

    let presupuestoAuxiliar = presupuestoActualizado;

    if (presupuestoAuxiliar >= 0) {   
        presupuesto = presupuestoAuxiliar;    
        } else {
            presupuestoAuxiliar = -1;     
        }

    return presupuestoAuxiliar;               
}

// Función sin parámetros que se encargará de devolver el texto siguiente: Tu presupuesto actual es de X €, siendo X el valor de la variable global presupuesto.
function mostrarPresupuesto() {
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

/* Función constructora que se encargará de crear un objeto gasto. Esta función devolverá un objeto de tipo gasto. 
Deberá comprobar que el valor introducido sea un número no negativo; en caso contrario, asignará a la propiedad valor el valor 0.*/
function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    // Almacenará la descripción del gasto en formato cadena.

    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }
    // Almacenará el valor del gasto en formato númerico.

    // mostrarGasto - Función sin parámetros que muestre el texto: 
    // Gasto correspondiente a DESCRIPCION con valor VALOR €, siendo VALOR y DESCRIPCION las propiedades del objeto correspondientes.
    this.mostrarGasto = function() {
        let gasto = (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        return gasto;
    }

    // actualizarDescripcion - Función de 1 parámetro que actualizará la descripción del objeto.
    this.actualizarDescripcion = function (descripcionActualizada) {
        this.descripcion = descripcionActualizada;
    }

    // actualizarValor - Función de 1 parámetro que actualizará el valor del objeto. 
    // Se encargará de comprobar que el valor introducido sea un número no negativo; en caso contrario, dejará el valor como estaba.
    this.actualizarValor = function (valorActualizado) {
        if (valorActualizado > 0) {
            this.valor = valorActualizado;
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
