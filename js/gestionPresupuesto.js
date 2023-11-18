// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
// Asignación e inicialización de la variable presupuesto
let presupuesto = 0;
console.log("Presupuesto inicial igual a " + presupuesto);
let gastos = [];
let idGasto = 0;

// EJECUCIÓN DEL PROGRAMA

// Llamada a las funciones de la práctica: Fundamentos de JavaScript I
actualizarPresupuesto(0);
mostrarPresupuesto()

// Se crea el objeto
let gasto = new CrearGasto("Ejemplo de gasto 1", 20.33);

// Ejecución de las funciones del objeto
console.log(gasto.mostrarGasto());
gasto.actualizarDescripcion("Gastos imprevistos");
gasto.actualizarValor(100.58);
console.log(gasto.mostrarGasto());
gasto.actualizarDescripcion("Gasto erróneo");
gasto.actualizarValor(-200);
console.log(gasto.mostrarGasto());

// Llamada a las funciones de la práctica: Fundamentos de JavaScript II


// FUNCIONES

// FUNCIONES de la práctica: Fundamentos de JavaScript I

// Función actualizarPresupuesto
function actualizarPresupuesto(numero) {
    if ((numero >= 0) && (!isNaN(numero))){
        presupuesto = numero
        return numero;
    } else {
        console.log("Error: número menor que cero o carácter no numérico");
        return -1;
    }
}

// Función mostrarPresupuesto
function mostrarPresupuesto() {
        return "Tu presupuesto actual es de " + presupuesto + " €";
}

// Función CrearGasto
function CrearGasto(descripcion, valor) {

            this.descripcion = descripcion;
            this.valor = (valor >=0) ? valor : 0;

        // Este bloque if no pasa el test
        /* if (valor < 0){
                this.valor = 0;
            } else {
                this.valor = valor;
            } */

            this.mostrarGasto = function(){
                //console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor);
                return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
            }

            this.actualizarDescripcion = function (nuevaDescripcion){
                this.descripcion = nuevaDescripcion;
            }

            this.actualizarValor = function (nuevoValor){
                if ((nuevoValor >= 0) && (!isNaN(nuevoValor))){
                    this.valor = nuevoValor;
                } else {
                    return 0;
                }
              }      


        };

// FUNCIONES de la práctica: Fundamentos de JavaScript II

        function listarGastos(){

        }
        function anyadirGasto(){

        }
        function borrarGasto(){

        } 
        function calcularTotalGastos(){

        }
        function calcularBalance(){

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
