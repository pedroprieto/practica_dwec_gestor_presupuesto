let presupuesto = 0;

function actualizarPresupuesto(nuevoPresu){
  if (nuevoPresu < 0){
    console.log("ERROR: Has introducido un número negativo");
    return -1;
  }
  else{
    presupuesto = nuevoPresu;
    return nuevoPresu;
  }
}

function mostrarPresupuesto(){
  console.log(`Tu presupuesto actual es de ${presupuesto}€`);
}


function CrearGasto(valor, descripcion){
  
  this.descripcion = descripcion;
  
  actualizarValor(valor);
  
  function actualizarValor(valor){
    if (valor < 0){
      this.valor = 0;
    }
    else{
      this.valor = valor;
    }
  }

  function mostrarGasto(){
    `Gasto correspondiente a ${this.descripcion} con valor de ${this.valor}`;
  }

  function actualizarDescripcion(descripcion){
    this.descripcion = descripcion;

  }
}
//ME QUEDO EN EL PUNTO DE CrearGasto, en fundamentos 1