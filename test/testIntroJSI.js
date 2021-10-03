// Importar librería Chai para realizar aserciones
import {assert} from "chai";

// Importar código de la aplicación sobre la que se realizarán los tests
import {actualizarPresupuesto, mostrarPresupuesto, CrearGasto} from '../js/gestionPresupuesto.js';


// Función actualizarPresupuesto
describe("Función actualizarPresupuesto", function() {
    it("Actualiza presupuesto con valor válido", function() {
        assert.equal(actualizarPresupuesto(1000), 1000);
        assert.equal(actualizarPresupuesto(2050.25), 2050.25);
    });

    it("Devuelve -1 si el valor no es un número positivo", function() {
        assert.equal(actualizarPresupuesto(-1000), -1);
        assert.equal(actualizarPresupuesto(-150.42), -1);
        assert.equal(actualizarPresupuesto("blabla"), -1);
        assert.equal(actualizarPresupuesto(true), -1);
        assert.equal(actualizarPresupuesto({}), -1);
    });

});

// Función mostrarPresupuesto
describe("Función mostrarPresupuesto", function() {
    it("Devuelve 0 si no se ha modificado el presupuesto (valor por defecto)", function() {
        assert.equal(mostrarPresupuesto(), "Tu presupuesto actual es de 0 €");
    });

    it("Devuelve el valor correcto tras realizar actualizaciones del presupuesto", function() {
        actualizarPresupuesto(2000);
        assert.equal(mostrarPresupuesto(), "Tu presupuesto actual es de 2000 €");
        actualizarPresupuesto(14000.25);
        assert.equal(mostrarPresupuesto(), "Tu presupuesto actual es de 14000.25 €");
        actualizarPresupuesto("valor incorrecto");
        assert.equal(mostrarPresupuesto(), "Tu presupuesto actual es de 14000.25 €");
        actualizarPresupuesto("false");
        assert.equal(mostrarPresupuesto(), "Tu presupuesto actual es de 14000.25 €");
    });

});

// Función CrearGasto y funcionamiento de objeto gasto
describe("Función CrearGasto y funcionamiento de objeto gasto", function() {
    it("CrearGasto devuelve objeto gasto si los parámetros son correctos", function() {
        var valor = 50;
        var descripcion = "Ejemplo de gasto 1";
        var gasto1 = CrearGasto(descripcion, valor);
        assert.equal(gasto1.valor, valor);
        assert.equal(gasto1.descripcion, descripcion);
        valor = 43.4;
        var gasto2 = CrearGasto(descripcion, valor);
        assert.equal(gasto2.valor, valor);
        assert.equal(gasto2.descripcion, descripcion);
    });

    it("CrearGasto devuelve null si los parámetros no son correctos", function() {
        var valor = "novalido";
        var descripcion = "Ejemplo de gasto 1";
        var gasto1 = CrearGasto(descripcion, valor);
        assert.equal(gasto1, null);
        valor = -40;
        var gasto2 = CrearGasto(descripcion, valor);
        assert.equal(gasto2, null);
    });

    it("Método 'mostrarGasto' del objeto gasto", function() {
        var valor = 20.33;
        var descripcion = "Ejemplo de gasto 1";
        var gasto1 = CrearGasto(descripcion, valor);
        assert.equal(gasto1.mostrarGasto(), "Gasto correspondiente a Ejemplo de gasto 1 con valor 20,33 €");
    });

    it("Método 'actualizarDescripcion' del objeto gasto", function() {
        var valor = 20.33;
        var descripcion = "Ejemplo de gasto 1";
        var gasto1 = CrearGasto(descripcion, valor);
        assert.equal(gasto1.descripcion, descripcion);
        var nuevadesc = "Nueva descripción de gasto 1";
        gasto1.actualizarDescripcion(nuevadesc);
        assert.equal(gasto1.descripcion, nuevadesc);
    });

    it("Método 'actualizarValor' del objeto gasto", function() {
        var valor = 20.33;
        var descripcion = "Ejemplo de gasto 1";
        var gasto1 = CrearGasto(descripcion, valor);
        assert.equal(gasto1.valor, valor);

        var nuevovalor = 100.58;
        gasto1.actualizarValor(nuevovalor);
        assert.equal(gasto1.valor, nuevovalor);

        var valornovalido = "novalido";
        gasto1.actualizarValor(valornovalido);
        assert.equal(gasto1.valor, nuevovalor);
        valornovalido = -38.45;
        gasto1.actualizarValor(valornovalido);
        assert.equal(gasto1.valor, nuevovalor);

        nuevovalor = 39.22;
        gasto1.actualizarValor(nuevovalor);
        assert.equal(gasto1.valor, nuevovalor);
    });
});
