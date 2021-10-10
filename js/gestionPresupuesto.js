

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto=0;
let gastos=[];
let idGasto=0;

function actualizarPresupuesto(valor) {
    // TODO
    let cantidad=-1;
    if ( valor >= 0)
    {
        presupuesto=valor;
        cantidad=valor;
    }
    return cantidad;
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, value, fecha, ...etiqueta) {
    // TODO
    this.mostrarGasto=function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    //'es-Es',{timeZone: 'UTC'}
    this.mostrarGastoCompleto=function(){
        let texto_etiquetas='';
        let texto_info=`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
        `Fecha: ${new Date(this.fecha).toLocaleString()}\n`+
        'Etiquetas:\n';
        for(let etiqueta of this.etiquetas){
            texto_etiquetas+=`- ${etiqueta}\n`
        }
        return texto_info + texto_etiquetas;
    }
    this.actualizarDescripcion =function (descripcion){
        this.descripcion=descripcion;
    }

    this.actualizarValor=function(dato){
        if ( !isNaN(dato) ){
			if ( dato >=  0 ){
				this.valor=dato;
			}
		}
    }
    this.actualizar =function(dato){
        if ( !isNaN(dato) ){
            return this.valor=dato < 0 ? 0:dato;
        }
        else {
            return this.valor=0;
        }
    }
    //VALIDAR FECHA
    this.FechaValida=function(fechastring){
        let fecha_correcta=Date.parse(fechastring);
        if ( isNaN(fecha_correcta) ){
            fecha_correcta=Date.now();
        }
        return fecha_correcta;
    }
    //ACTUALIZAR FECHA
	this.actualizarFecha=function(fechastring){
		let fecha_correcta=Date.parse(fechastring);
		if ( !isNaN(fecha_correcta) ){
			this.fecha=fecha_correcta;
        }
	}

    this.anyadirEtiquetas=function(...values){
        for (let etiqueta of values){
            if ( this.etiquetas.indexOf(etiqueta) == -1){
                this.etiquetas.push(etiqueta);
            }
        }
    }
    this.borrarEtiquetas=function(...values){
        let indice=0;
        for (let elemento of values){
            indice=this.etiquetas.indexOf(elemento)
            if ( indice !== -1) {
                this.etiquetas.splice(indice,1);
            }
        }
    }

    this.valor=this.actualizar(value);
    this.descripcion=descripcion;
	this.fecha=this.FechaValida(fecha);
	this.etiquetas=etiqueta;

}

function listarGastos(){
	return gastos;

}
function anyadirGasto(gasto){
	gasto["id"]=idGasto;
	idGasto++;
	gastos.push(gasto);
}
function borrarGasto(idGasto){
	let indice=0;
	for(let gasto of  gastos){
		if ( gasto["id"] === idGasto )
		{
			gastos.splice(indice,1);
		}
		indice++;
	}
}
function calcularTotalGastos(){
	let suma=0;
	for ( let gasto of gastos){
		suma = suma + gasto.valor;
	}
	return suma;
}

function calcularBalance(){
    let totalgasto=calcularTotalGastos();
	return ( presupuesto - totalgasto);
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export  {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
};
