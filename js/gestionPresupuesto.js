// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {

    // let x = presupuesto;

    if (cantidad >= 0){
        presupuesto = cantidad;
        //return `Tu presupuesto actual es de ${presupuesto} €`:
        return presupuesto;
    } else{
        
        return -1;
    };
};

function mostrarPresupuesto() {
    
    // let x = presupuesto;
    return `Tu presupuesto actual es de ${presupuesto} €`
};

function listarGastos(){
    return gastos;
};

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    this.fecha = (!fecha) ? new Date() : Date.parse(fecha);
    //this.fecha = (!fecha) ? new Date() : fecha;
    this.etiquetas = (!etiquetas) ? "" : etiquetas;
    /* if (valor < 0){
        this.valor = 0;
    } else {
        this.valor = valor;
    };*/
    // this.valor = valor;
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    this.actualizarDescripcion = function (nueva_decripcion){
        this.descripcion = nueva_decripcion;
    };
    this.actualizarValor = function (nuevo_valor){
        if (nuevo_valor >= 0){
            this.valor = nuevo_valor;
        };
    };
    this.mostrarGastoCompleto = function(){

        let resultado = `Gasto correspondiente a ${descripcion} con valor ${valor} €.\n`;
        resultado += `Fecha: `;
        //return fecha.toLocaleString("es");
        resultado += new Date(this.fecha).toLocaleString();
        //resultado += Date.parse(fecha);
        //resultado += fecha.toString();
        //let f = new Date(fecha).toLocaleString();
        //resultado += `Fecha: ${f} `;
        resultado += `\nEtiquetas:\n`;
        for (let etiqueta of this.etiquetas){
            resultado += `- ${etiqueta}\n`;
        };
        return resultado;
        /*return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
        return `Fecha ${fecha.toLocaleString()}`;
        return `Etiquetas`;
        for (let etiqueta of etiquetas){
            return `- ${etiqueta}`
        };*/
    };
    this.actualizarFecha = function (nueva_fecha){

        let f = Date.parse(nueva_fecha);        
        //return `${nueva_fecha} - f - ${fecha}`;
        //console.log(Date.parse(fecha));
        //console.log(Date.parse(nueva_fecha));
        //console.log(nueva_fecha instanceof Date);
        //console.log(f);

        //this.fecha = (!(nueva_fecha instanceof Date)) ? this.fecha : new Date(nueva_fecha);
        //if (nueva_fecha instanceof Date){
        if (!isNaN(f)){
            this.fecha = Date.parse(nueva_fecha);
        }


        //console.log(valueOf f);
        //this.fecha = (nueva_fecha = !NaN) ? nueva_fecha : fecha;
        //this.fecha = (!NaN(f)) ? fecha : Date.parse(nueva_fecha);
        //if ((typeof f) == NaN){
        //if ((typeof nueva_fecha) == NaN){
        /*if (f == !NaN){
            //this.fecha = nueva_fecha;
            this.fecha = this.fecha;
        }
        else {
            //this.fecha = this.fecha;
            this.fecha = nueva_fecha;
        };*/
        //this.fecha = f;
    };
    this.anyadirEtiquetas = function(...nuevas_etiquetas){

        //bucle que recorra las etiquetas (array) introducidas en nuevas_etiquetas
        // y que compruebe para cada una si existe en etiquetas, y si no que la añada

        for (let etiqueta of nuevas_etiquetas){
            //resultado += `- ${etiqueta}\n`;
            //console.log(etiqueta);

            if (!(etiquetas.includes(etiqueta))){
                etiquetas.push(etiqueta);
            };
        };
    };
    this.borrarEtiquetas = function(...borrar_etiquetas){

        //bucle que recorra las borrar_etiquetas y que compruebe si existen en etiquetas
        // y en caso afirmativo que las borre
     
        for (let etiqueta of borrar_etiquetas){
            //resultado += `- ${etiqueta}\n`;
            //console.log(etiqueta);

            if (this.etiquetas.indexOf(etiqueta) >= 0){
            //if (etiquetas.includes(etiqueta)){
                //etiquetas.push(etiqueta);

                let x = this.etiquetas.indexOf(etiqueta);
                this.etiquetas.splice(x, 1);

                /*
                for (let i = 0; i < this.etiquetas.length; i++){
                    if (etiqueta == this.etiquetas[i]){
                        this.etiquetas.splice(i, 1);
                    };
                };*/
            };
        };
    };
    this.obtenerPeriodoAgrupacion = function(periodo){
        // Metodo para obtener una agrupación de los objetos gasto
        // Se agrupan por fecha (dia, mes, año)

        let resultado = "";
        let temp = "";
        //console.log(periodo);
        //console.log(fecha.toLocaleString());
        temp = fecha.toLocaleString();

        //for (let objeto of gastos){
            
            if (periodo == "anyo"){
                //temp = gasto.fecha.toISOString;

                //resultado = this.fecha.slice(0, 4);
                //resultado = this.fecha.toLocaleString.slice(0, 4);
                resultado = temp.slice(0,4);
            };
            if (periodo == "mes"){
                //resultado = this.fecha.slice(0, 7);
                resultado = temp.slice(0,7);
            };
            if (periodo == "dia"){
                //resultado = this.fecha.slice(0, 10);
                resultado = temp.slice(0,10);
            };
            
            //console.log(resultado);
            return resultado;
            //total += objeto.valor;
            //console.log(`valor ${objeto.valor}`);
        //};
    };
};

function anyadirGasto(objeto){
    
    //let objeto = `gasto`+idGasto;
    //console.log(`idGasto=${idGasto}`);

    //let `gasto${idGasto}` = new CrearGasto{descripcion, valor, fecha, ...etiquetas};
    //objeto = CrearGasto(descripcion, valor, fecha, ...etiquetas);
    //objeto = new CrearGasto(objeto);
    objeto.id = idGasto;

    gastos.push(objeto);

    //console.log(objeto);
    

    idGasto++;
};

function borrarGasto(id_a_borrar){
    // funcion que tiene que recorrer el array gastos, y buscar el objeto que tiene el mismo id que se pasa como parámetro
    // y borrarlo.

    let x = 0;

    /* for (let i = 0; i < gastos.length; i++){
        console.log(gastos[i].id);
        if (gastos[i].id === id_a_borrar){
            gastos.splice(i, 1);
        }; 
        //console.log(gastos.id);
    }; */
    //console.log(`id a borrar - ${id_a_borrar}`);
    for (let objeto of gastos){

        //console.log(objeto);
        if (objeto.id == id_a_borrar){
            //console.log(`encontrado!!!! - objeto.id=${objeto.id} - x - ${x}`);
            //console.log(x);
            gastos.splice(x, 1);
        } //else {
            
            x++;
        //};

        
    };
    //gastos.forEach(function(objeto, index, gastos){

        //console.log(objeto.id);
        //console.log(`x - ${x}`)

        
        //if (objeto.id = id_a_borrar){

            /* let x = this.etiquetas.indexOf(etiqueta);
            this.etiquetas.splice(x, 1); */
            //let x = this.gastos.indexOf(objeto);
            //objeto.splice(index, 1);
            //console.log(index);
            //console.log(objeto.id);
            //console.log(`id a borrar ${id_a_borrar}`);
            //console.log(`x ${x}`);
            //gastos.splice(x, 1);
            //console.log(`x ${x}`);
            //console.log(objeto);
        //};
        
    
};

function calcularTotalGastos(){

    let total = 0;

    for (let objeto of gastos){
        total += objeto.valor;
        //console.log(`valor ${objeto.valor}`);
    };

    return total;
    
};

function calcularBalance(){

    //let saldo = 0;
    let saldo = presupuesto - calcularTotalGastos();
    return saldo;
    
};

function filtrarGastos(parametros){
    // funcon que filtra los ojetos según parametros indicados

    let resultado = [];
    
    for (let gasto of gastos){

        let valido = true;

        if (parametros.fechaDesde){
            // aqui se evalua el parametro en caso de que exista
            //console.log(`fecha a evaluar ${gasto.fecha}`);
            //let f = parametros.fechaDesde.toLocaleString();
            //let f = Date.parse(parametros.fechaDesde);
            //console.log(`Fecha desde ${f}`);
            
            // aqui se evalua si la fecha del objeto es menor que el parametro
            if (gasto.fecha < Date.parse(parametros.fechaDesde)){               
                // en el caso de que sea falso, la variable de válido pasa a ser false, por
                // lo que de esta manera en el resto de condiciones no se continuarán evaluando
                valido = false;
            } else {
                
            };
            //resultado.push(gasto);
        };

        
        if (parametros.fechaHasta){
            if (gasto.fecha > Date.parse(parametros.fechaHasta)){
                valido = false;
            };
        };
        
        if (parametros.valorMinimo){
            //console.log(`Valor actual ${gasto.valor}`);
            //console.log(`VAlor minimo ${parametros.valorMinimo}`);
            if (gasto.valor < parametros.valorMinimo){
                valido = false;
            };
        };

        if (parametros.valorMaximo){
            if (gasto.valor > parametros.valorMaximo){
                valido = false;
            };
        };
        
        if (parametros.descripcionContiene){
            if (!gasto.descripcion.includes(parametros.descripcionContiene)){
                valido = false;
            }
        };

        if (parametros.etiquetasTiene){

            let contador = 0;
            //let valido = true;

            for (let etiqueta of parametros.etiquetasTiene){
            //for (let etiqueta of gasto.etiquetas){
                if(gasto.etiquetas.includes(etiqueta)){
                    contador++;
                }
            };
            
            if (contador == 0){
                valido = false;
            }
            //valido = (contador = 0) ? false : true;
        };

        

        if (valido){
            resultado.push(gasto);
        }
        //resultado.push(gasto);
    };
    //resultado.push(gasto);

    //console.log(resultado);

    return resultado;

};

function agruparGastos(){

};

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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
