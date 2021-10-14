"use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;


function actualizarPresupuesto(valorIntroducido) {
    
    let numero;
    if(valorIntroducido >= 0 && typeof valorIntroducido === 'number' )
    {
        presupuesto = valorIntroducido;
        numero = presupuesto;
    }
    else{
      numero = -1;
    }
    
    return numero;
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion,valor) {
    // TODO
    this.descripcion = descripcion;
    this.valor = valor;

    if(valor >= 0 && typeof valor === 'number' ){
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
       }

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function (valor) {
        if(valor >= 0 && typeof valor === 'number')
        {
          this.valor = valor;
        }
    }
    
}


let gastos = {
    
    descripcion : " ",
    valor: 0,

    mostrarGasto(){
       return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
      },

      actualizarDescripcion(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
      },

      actualizarValor(nuevoValor){
          if(valor >= 0 && typeof valor === 'number')
          {
            this.valor = nuevoValor;
          }
        
      }

};






// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
