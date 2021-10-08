"use strict";
// No se si quieres que usemos la forma "moderna". En el manual habla de omitirlo cuando utilicemos todo clases y módulos, pero por ahora lo dejo si no me dices lo contrario. 

let presupuesto = 0;
// Variable global

/* Función de 1 parámetro que se encargará de actualizar la variable global presupuesto.
Esta función comprobará que el valor introducido es un número no negativo: en caso de que sea un dato válido, 
actualizará la variable presupuesto y devolverá el valor del mismo; en caso contrario, mostrará un error por pantalla y devolverá el valor -1*/
function actualizarPresupuesto(dineroIntroducido) { 
    /* if (dineroIntroducido > 0)
        {   
        presupuesto = dineroIntroducido;    
        }
     else
        {
            presupuesto = -1;
        }

    return presupuesto;  

     Tengo una duda de estilo y es que en 1º en C# utilizaba las llaves de la forma de arriba pero en los manuales de JS se trabaja como abajo. 
     Ambos funcionan igual. ¿Debo intentar acostumbrarme a utilizar el formato de JS o es indiferente y le estoy dando demasiadas vueltas a algo nimio?
    */

     // ¿Entiendo que no haría falta poner dineroIntroducido >= 0 porque no tendria sentido introducir 0? Siempre tendrá que introducir superior a 0, aunque sean céntimos. Ambas pasan la prueba...
    if (dineroIntroducido > 0) {   
        presupuesto = dineroIntroducido;    
        } else {
        presupuesto = -1;     
        }

    return presupuesto;               
}

// Función sin parámetros que se encargará de devolver el texto siguiente: Tu presupuesto actual es de X €, siendo X el valor de la variable global presupuesto.
function mostrarPresupuesto() {
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
    //return "Tu presupuesto actual es de " + x + " €"; Utilizamos ${} para simplificarlo pero ambos funcionan.
}

/* Función constructora que se encargará de crear un objeto gasto. Esta función devolverá un objeto de tipo gasto. 
Deberá comprobar que el valor introducido sea un número no negativo; en caso contrario, asignará a la propiedad valor el valor 0.*/
function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    // Almacenará la descripción del gasto en formato cadena

    if(valor>0){
        this.valor = valor;
    } else {
        this.valor = 0;
    }
    // Almacenará el valor del gasto en formato númerico

    // TODO
    // Metodos mostrarGasto, actualizarDescripcion, actualizarValor
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
