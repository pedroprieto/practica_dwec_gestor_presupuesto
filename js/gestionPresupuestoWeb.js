console.log("gestionPresupuestoWeb")

// Importaciones de modulos
import { CrearGasto, agruparGastos, anyadirGasto } from '/js/gestionPresupuesto.js';


//Texto
function mostrarDatoEnId(valor,id){
    document.getElementById(id).innerText = valor;
}

//HTML
function mostrarGastoWeb(idElement, gasto){

    let elementObjetive = document.getElementById(idElement);

    //PARA CREA UN ELEMENTO DIV
    let divGasto = document.createElement('div');
    let divGasDescripcion = document.createElement('div');
    let divGasFecha = document.createElement('div');
    let divGasValor =  document.createElement('div');
    let divGasEtiquetas =  document.createElement('div')
    
    //Para ponerle clase a ese elemento
    divGasto.className = "gasto"

    divGasDescripcion.className = "gasto-descripcion"
    divGasDescripcion.innerText = gasto.descripcion

    let fechaCorta = new Date(gasto.fecha).toLocaleDateString()
    divGasFecha.className = "gasto-fecha"
    divGasFecha.innerText = fechaCorta
    
    divGasValor.className = "gasto-valor"
    divGasValor.innerText = gasto.valor
    
    divGasEtiquetas.className = "gastos-etiquetas"

    
    for(let etiqueta of gasto.etiquetas){
        let divEtiqueta =  document.createElement('span')
        divEtiqueta.className="gasto-etiquetas-etiqueta"
        divEtiqueta.append(`${etiqueta},`)
        divGasEtiquetas.append(divEtiqueta)
    }

    divGasto.append(divGasDescripcion)
    divGasto.append(divGasFecha)
    divGasto.append(divGasValor)
    divGasto.append(divGasEtiquetas)
   
   
    elementObjetive.append(divGasto)

    

}

// let gasto = new CrearGasto("2 Compra fruta y verdura", 10, "2021-09-06", "supermercado", "comida" );

// console.log( gasto )

// mostrarGastoWeb('presupuesto', gasto)


function mostrarGastoAgrupadosWeb(id,periodo){

    let elementObjetive = document.getElementById(id)

    let divAgrupacion = document.createElement('div')
    let h1Agruparmes = document.createElement('h1')
 

    divAgrupacion.className = "gasto-agrupacion"
    h1Agruparmes.innerText = "Gastos agrupados por " + periodo
    
    divAgrupacion.append(h1Agruparmes)

    elementObjetive.append(divAgrupacion)

    let gastosAgrupados = agruparGastos(periodo)
 
    for(let [fechaKey, valor] of Object.entries(gastosAgrupados)){

        let divagrupacionDatos = document.createElement('div')
        let divAgrupacionclave =  document.createElement('span')
        let divAgrupacioncvalor =  document.createElement('span')

        divagrupacionDatos.className = "agrupacion-dato"
        divAgrupacionclave.className = "agrupacion-dato-clave"
        divAgrupacioncvalor.className = "agrupacion-dato-valor"
        divAgrupacionclave.append("Fecha: " + fechaKey + " ")
        divAgrupacioncvalor.append("Valor: " + valor + " ")
        divagrupacionDatos.append(divAgrupacionclave)
        divagrupacionDatos.append(divAgrupacioncvalor)
        divAgrupacion.append(divagrupacionDatos)

    }

   
   
    
}

// let gasto0 = new CrearGasto("Seguro coche 1", 10, "2021-08-01", "supermercado", "comida" );
// let gasto1 = new CrearGasto("Seguro coche 2", 15, "2021-09-02", "supermercado", "comida" );
// let gasto2 = new CrearGasto("Seguro coche 3", 20, "2021-10-03", "supermercado", "comida" );
// let gasto3 = new CrearGasto("Seguro coche 4", 25, "2021-11-04", "supermercado", "comida" );
// let gasto4 = new CrearGasto("Seguro coche 5", 50, "2021-11-05", "supermercado", "comida" );
// let gasto5 = new CrearGasto("Seguro coche 6", 55, "2021-11-06", "supermercado", "comida" );

// anyadirGasto(gasto0)
// anyadirGasto(gasto1)
// anyadirGasto(gasto2)
// anyadirGasto(gasto3)
// anyadirGasto(gasto4)
// anyadirGasto(gasto5)



// let gastosAgrupados = agruparGastos("mes")
// console.log(gastosAgrupados)



// for(let fechaKey of Object.keys(gastosAgrupados)){

//     console.log(fechaKey, gastosAgrupados[fechaKey] )

// }

// // // console.log( gasto )
// // // console.log( gasto6 )

// mostrarGastoAgrupadosWeb('presupuesto', "mes")

