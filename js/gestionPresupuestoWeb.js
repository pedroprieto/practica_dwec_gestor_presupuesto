import { mostrarGastosAgrupadosWeb } from '../../../1º DAW/Mari/CLIENTE/Práctica 1º evaluación/practica_dwec_gestor_presupuesto-master/js/gestionPresupuestoWeb';
import * as gestionPresupuesto from './gestionPresupuesto'

// función mostrarDatoEnId
function mostrarDatoEnId(idElemento, valor){
    let mostrarGasto = document.getElementById(idElemento);
    mostrarGasto = `${valor}`;
}

//función mostrarGastoWeb
function mostrarGastoWeb(idElemento, gasto){

    let body = document.getElementById(idElemento);

//<div class="gasto">
    let divGasto = document.createElement ('div');
    divGasto.className = "gasto";

  //<div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
    let divDescripcion = document.createElement('div');
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.innerHTML = `${gasto.descripcion}`;

  //<div class="gasto-fecha">FECHA DEL GASTO</div> 
    let divFecha = document.createElement('div');
    divFecha.className = "gasto-fecha";
    divFecha.innerHTML = `${gasto.fecha}`;

  //<div class="gasto-valor">VALOR DEL GASTO</div> 
    let divValor = document.createElement('div');
    divValor.className = "gasto-valor";
    divValor.innerHTML = `${gasto.valor}`;

  //<div class="gasto-etiquetas">
    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = "gasto-etiquetas";
    //<span class="gasto-etiquetas-etiqueta">
      //ETIQUETA 1
    //</span>
    //<span class="gasto-etiquetas-etiqueta">
      //ETIQUETA 2
    //</span>
    //<!-- Etcétera -->
  //</div> 
//</div>
}

function mostrarGastosAgrupadosWeb(){

}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
} 