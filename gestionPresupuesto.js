var presupuesto = 0;

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

//ME QUEDO EN EL PUNTO DE CrearGasto, en fundamentos 1