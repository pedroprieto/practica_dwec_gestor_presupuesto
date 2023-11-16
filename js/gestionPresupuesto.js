// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
console.log("Presupuesto igual a " + presupuesto);


// EJECUCIÓN DEL PROGRAMA: LLAMADA A LAS FUNCIONES
let numero = actualizarPresupuesto(2000);

console.log(mostrarPresupuesto(numero));


// Primera llamada a la función crearGasto: crea el objeto.
let gasto1 = new CrearGasto("Gastos ordinarios", 350);
gasto1.mostrarGasto();
gasto1.actualizarDescripcion("Gastos imprevistos");

// FUNCIONES

// 1 función actualizarPresupuesto
function actualizarPresupuesto(numero) {
    if ((numero >= 0) && (!isNaN(numero))){
        presupuesto = numero
        return numero;
    } else if (numero == presupuesto){
        return 0;
    }
    else {
        console.log("Error: número menor que cero o carácter no numérico");
        return -1;
    }
}


function mostrarPresupuesto() {
    if ((numero >= 0) && (!isNaN(numero))){
        return "Tu presupuesto actual es de " + presupuesto + " €";
    }
}

function CrearGasto(descripcion, valor) {
        let gasto = {
            descripcion: descripcion,
            valor: valor,

            mostrarGasto: function(){
                console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor);
            },

            actualizarDescripcion: function (nuevaDescripcion){
                this.descripcion = nuevaDescripcion;
                this.mostrarGasto();
            },

            actualizarValor: function (nuevoValor){
                if ((nuevoValor >= 0) && (!isNaN(nuevoValor))){
                    this.valor = nuevoValor;
                }  
                this.mostrarGasto();
            }      


        };

        if (gasto.valor < 0){
            gasto.valor = 0;
            return gasto;
        }

        return gasto;
    }

/*

        


        gasto.

 
        }*/






// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
