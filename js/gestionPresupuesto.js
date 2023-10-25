// Adrián Romero Alonso 2DAWY 53978049Q
let presupuesto = 0;                                                                    //Declaración de variables globales ARA
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {                                                 //Función que acutaliza la variable global presupuesto ARA
    if(valor >= 0 && typeof valor === 'number'){
        presupuesto = valor;
        return valor;
    }else{
        console.error('Error, numero negativo');
        return -1;
    }
}

function mostrarPresupuesto() {                                                         //Función que devuelve un mensaje y la variable global presupuesto ARA  
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function listarGastos(){                                                                //Función que devuelve la variable global presupuesto ARA  
    return gastos;
}

function anyadirGasto(gasto){                                                           //Función que añade un gasto al array de gastos y actualiza el contador de ID ARA
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto)
}

function borrarGasto(id){                                                               //Función que recibe un id y elimina el gasto asociado ARA  
    for(let i = 0;i < gastos.length; i++ ){
        if(gastos[i].id == id){
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos(){                                                        //Función que devuelve el sumatorio de gastos ARA  
    let suma = 0;
    for(let i = 0;i < gastos.length; i++ ){
       suma = suma + gastos[i].valor;
    }
    return suma;
}

function calcularBalance(){                                                          //Función que devuelve el balance de presupuesto/gastos ARA
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos(){

}

function agruparGastos(){

}

function CrearGasto(descripcion,valor,fecha, ...etiquetas) {                        //Función contructor del objeto Gasto ARA
    this.descripcion = descripcion;
    this.fecha;
    this.etiquetas = [...new Set(etiquetas)];                                       //Zona de asignación de parametros
    
    if(valor >= 0 && typeof valor === 'number'){
        this.valor = valor;
    }else{
        this.valor = 0;
    }
   
    if (typeof fecha === 'string' && fecha.length === 17) {
        this.fecha = Date.parse(fecha);
    }else if(typeof fecha === 'string' && fecha.length === 10){
        this.fecha = Date.parse(fecha);
    }else{
        this.fecha = Date.now();
    }
    
    this.mostrarGasto = function(){                                                                                                 // Metodo que devuelve un texto con la descripción y valor del objeto gasto ARA
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €';
    };

    this.mostrarGastoCompleto = function(){                                                                                          //Metodo que devuelvela información detallada del objeto gasto ARA                     
        let fechaLocal = new Date(this.fecha).toLocaleString();
        let listaEtiquetas = this.etiquetas.join('\n- ');
        let mostrar = this.mostrarGasto() + '.\nFecha: ' + fechaLocal + '\nEtiquetas:\n- ' + listaEtiquetas + '\n';
        return mostrar;
      
    };
        
    this.actualizarDescripcion = function(descripcion){                                                                             // Zona de metodos de actualización de atributos ARA
        this.descripcion = descripcion;
        return descripcion;
    };

    this.actualizarValor = function(valor){
        if(valor >= 0 && typeof valor === 'number'){
            this.valor = valor;
            return valor;
        }
    };

    this.actualizarFecha = function(fecha){

        if (typeof fecha === 'string' && fecha.length === 17) {
            this.fecha = Date.parse(fecha);
        }
        if(typeof fecha === 'string' && fecha.length === 17){
            this.fecha = Date.parse(fecha);
        }
    };
    
    this.anyadirEtiquetas = function(...etiquetas){                                                                                // Zona de metodos de gestion de etiquetas ARA
        for(let i = 0; i < etiquetas.length; i++){
            let etiqueta = etiquetas[i];
            if(!this.etiquetas.includes(etiqueta)){
                this.etiquetas.push(etiqueta);
            }
        }

    };

    this.borrarEtiquetas = function(...etiquetas){
        let filtroEtiquetas = [];
        for(let i = 0; i < this.etiquetas.length; i++){
            let etiqueta = this.etiquetas[i];
            if(!etiquetas.includes(etiqueta)){
                filtroEtiquetas.push(etiqueta);
            }
        }    
        this.etiquetas = filtroEtiquetas;
    };

    this.obtenerPeriodoAgrupacion = function(periodo){
        let auxFecha = this.fecha;
        const anyo = new Date(auxFecha).getFullYear();
        const mes = String(new Date(auxFecha).getMonth() + 1).padStart(2, '0');
        const dia = String(new Date(auxFecha).getDate()).padStart(2, '0');

        if (periodo === "dia") {
            return anyo + '-' + mes + '-' + dia;
        } else if (periodo === "mes") {
            return anyo + '-' + mes;
        } else if (periodo === "anyo") {
            return anyo;
        }
    }
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo.
export   {
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    mostrarPresupuesto,
    actualizarPresupuesto,
    filtrarGastos,
    agruparGastos,
    CrearGasto
}
