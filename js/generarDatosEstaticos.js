"use strict";

import * as gp from './gestionPresupuesto';
import * as gpw from './gestionPresupuestoWeb';

gp.actualizarPresupuesto(1500);

let mpresupuesto = document.getElementById('presupuesto');
mpresupuesto.innerHTML = "Hola";

/*mpresupuesto.innerHTML = `
    ${gp.mostrarPresupuesto()}
`;*/


/*document.body.append(mpresupuesto);*/
//gp.mostrarPresupuesto();

/*gpw.mostrarDatoEnId();*/