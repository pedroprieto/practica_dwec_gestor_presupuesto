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

function calcularBalance(){                                                          //Funcion que devuelve el balance de presupuesto/gastos ARA
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos(filtros) {                                                                       //Funcion que recibe un objeto con parametros de filtro y devuelve los gastos que cumplan las condiciones ARA

    let gastosFiltrados = [...gastos];                                                                  //Genera un array que recibe la cantidad de gastos que tenemos (indeterminado)

    if (filtros.fechaDesde) {                                                                           //Combrobamos que exista parametro si es == true cumple la condicion
        let fechaDesde = Date.parse(filtros.fechaDesde);
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha >= fechaDesde);                   //Sustituye el array por un sub array con los elementos que cumplan gasto.fecha >= fechaDesde
    }

    if (filtros.fechaHasta) {                                                                           //Combrobamos que exista parametro si es == true cumple la condicion
        let fechaHasta = Date.parse(filtros.fechaHasta);
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha <= fechaHasta);                   //Sustituye el array por un sub array con los elementos que cumplan gasto.fecha <= fechaHasta
    }

    if (filtros.valorMinimo !== undefined) {                                                            //Combrobamos que exista parametro si es !== undefined cumple la condicion
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor >= filtros.valorMinimo);          //Sustituye el array por un sub array con los elementos que cumplan gasto.valor >= filtros.valorMinimo
    }

    if (filtros.valorMaximo !== undefined) {                                                            //Combrobamos que exista parametro si es !== undefined cumple la condicion
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor <= filtros.valorMaximo);          //Sustituye el array por un sub array con los elementos que cumplan gasto.valor <= filtros.valorMaximo
    }

    if (filtros.descripcionContiene) {                                                                                             //Combrobamos que exista parametro si es == true cumple la condicion
        let descripcionContiene = filtros.descripcionContiene.toLowerCase();                                                       //Pasaremos las dos descripciones a comparar a minusculas para que tengan mismo formato
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.descripcion.toLowerCase().includes(descripcionContiene));          //No comprobamos igualdad al uso en realidad comrpobamos que la descripcion pasada como filtro esta incluida en la descripcion del gasto
    }

    if (filtros.etiquetasTiene) {                                                                                                                   //Generamos una copia en minusculas para hacer la comparacion en el mismo formato
        let etiquetasTiene = filtros.etiquetasTiene.map(etiqueta => etiqueta.toLowerCase());                                                        //Como en el filtro anterior comprobamos si esta incluido
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.etiquetas.some(etiqueta => etiquetasTiene.includes(etiqueta.toLowerCase())));       //Usamos some para ver si hay almenos una etiqueta que coincida
    }

    return gastosFiltrados;
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde = "", fechaHasta = "") {                                                         //Funcion  para agrupar gastos segun filtros, Se declaran valores Default por si no introducen parametros
       let gastosFiltrados = gastos;                                                                                                                //Inicialmente trabajamos con todos los gastos.

    if (etiquetas.length > 0 || fechaDesde) {                                                                                                      //Si han introducido filtros solo trabajaremos con los gastos que los cumplan
        gastosFiltrados = filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde, fechaHasta });
    }

    let resultado = gastosFiltrados.reduce((acc, gasto) => {                                                                                     //Para cada gasto obtendremos el sumatorio de su periodo de agrupacion               
        let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);                                                                                                                                               
        if (!acc[periodoAgrupacion]) {                                                                                                             //Si no existe una sumatorio el resultado sera el valor del gasto
            acc[periodoAgrupacion] = gasto.valor;           
        } else {                                                                                                                                   //Si Existe sumaremos el valor al conjunto
            acc[periodoAgrupacion] += gasto.valor;
        }
        return acc;
    }, {});

    return resultado;
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

    this.obtenerPeriodoAgrupacion = function(periodo){                                                                         //Metodo que devuelve un formato de fecha segun un periodo ARA
        let auxFecha = this.fecha;                                                                                             //OJO! this.fecha no puede hacer uso de las funciones .getFY, getM y .getD
        const anyo = new Date(auxFecha).getFullYear();                                                                         //La implementacion de un objeto auxiliar Date nos permite tranajar con ellas
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
