

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto=0;
let gastos=[];
let idGasto=0;

/*********************************************************************************/
function actualizarPresupuesto(valor) {
/*********************************************************************************/
    // TODO
    let cantidad=-1;
    if ( valor >= 0)
    {
        presupuesto=valor;
        cantidad=valor;
    }
    return cantidad;
}

/*********************************************************************************/
function mostrarPresupuesto() {
/*********************************************************************************/
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

/*********************************************************************************/
function CrearGasto(descripcion, value, fecha, ...etiqueta) {
/*********************************************************************************/
    // TODO
    this.obtenerPeriodoAgrupacion=function(periodo){
        let fecha=new Date(this.fecha);
        let year=fecha.getFullYear();
        let month=fecha.getMonth()+1;
        let day=fecha.getDate();

        if ( month < 10 ){
            month=`0${month}`
        }
        if ( day < 10 ){
            day=`0${day}`
        }

        if (periodo === "mes" ){
            return `${year}-${month}`;
        }
        else if ( periodo === "anyo" ){
            return `${year}`;
        }
        else if ( periodo === "dia" ){
            return `${year}-${month}-${day}`;
        }
        else{
            return `${year}-${month}-${day}`;
        }
    }

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
/************************************************************************************/
function filtrarGastos(object){
/************************************************************************************/
    if ( isObjEmpty(object) ){
        return gastos;
    }
    let sizeProperties=Object.entries(object).length;
    if ( sizeProperties  == 1){
        for(let item in object){
            if ( item === "fechaDesde"){
                return GestionFechaDesde(object["fechaDesde"]);
            }
            if ( item === "valorMinimo"){
                return GestionValorMimino(object["valorMinimo"])
            }

            if ( item === "etiquetasTiene"){
                let items=Object.entries(object)[0][1];
                return gastos.filter( (x) =>{
                            for(let valor of x["etiquetas"] ){
                                if ( object["etiquetasTiene"].indexOf(valor) > -1 ){
                                    return x;
                                }
                            }
                });
            }
        }
    }

    if ( sizeProperties == 2 ){
        let properties=[];
        for(let item in object){
            if ( item != "periodo")
            properties.push(item);
        }
        if ( ( properties[0] === "fechaDesde" || properties[1] === "fechaDesde") &&
             ( properties[0] === "fechaHasta" || properties[1] === "fechaHasta") ){
            return GestionFechaDesdeHasta(object["fechaDesde"], object["fechaHasta"]);
        }

        else if ( ( properties[0] === "valorMinimo" || properties[1] === "valorMinimo") &&
             ( properties[0] === "valorMaximo" || properties[1] === "valorMaximo") ){
            return GestionValorMinimoMaximo(object["valorMinimo"], object["valorMaximo"]);
        }

        else if ( ( properties[0] === "valorMaximo" || properties[1] === "valorMaximo") &&
             ( properties[0] === "etiquetasTiene" || properties[1] === "etiquetasTiene") ){
            return GestionEtiquetasValorMaximo(object["valorMaximo"], object["etiquetasTiene"]);
        }

        else if ( ( properties[0] === "fechaDesde" || properties[1] === "fechaDesde") &&
             ( properties[0] === "etiquetasTiene" || properties[1] === "etiquetasTiene") ){
            return GestionEtiquetasFechaDesdde(object["fechaDesde"], object["etiquetasTiene"]);
        }

    }

    if ( sizeProperties == 3 ){

        let properties=[];
        for(let item in object){
            properties.push(item);
        }
        if ( ( properties[0] === "fechaDesde" || properties[1] === "fechaDesde" || properties[2] === "fechaDesde") &&
             ( properties[0] === "fechaHasta" || properties[1] === "fechaHasta" || properties[2] === "fechaDesde") &&
             ( properties[0] === "valorMaximo" || properties[1] === "valorMaximo" || properties[2] === "valorMaximo") ) {

            return GestionFechasValorMaximo(object["fechaDesde"], object["fechaHasta"], object["valorMaximo"])
        }

        else if ( ( properties[0] === "etiquetasTiene" || properties[1] === "etiquetasTiene" || properties[2] === "etiquetasTiene") &&
             ( properties[0] === "fechaHasta" || properties[1] === "fechaHasta" || properties[2] === "fechaDesde") &&
             ( properties[0] === "valorMaximo" || properties[1] === "valorMaximo" || properties[2] === "valorMaximo") ) {

            return GestionFechasValorMaximoEtiquetas(object["etiquetasTiene"], object["fechaHasta"], object["valorMaximo"])
        }

        else if ( ( properties[0] === "etiquetasTiene" || properties[1] === "etiquetasTiene" || properties[2] === "etiquetasTiene") &&
             ( properties[0] === "fechaHasta" || properties[1] === "fechaHasta" || properties[2] === "fechaHasta") &&
             ( properties[0] === "fechaDesde" || properties[1] === "fechaDesde" || properties[2] === "fechaDesde") ) {
            return GestionEtiquetasFechasDesdeHasta(object["etiquetasTiene"], object["fechaDesde"], object["fechaHasta"]);
        }

        else if ( ( properties[0] === "descripcionContiene" || properties[1] === "descripcionContiene" || properties[2] === "descripcionContiene") &&
             ( properties[0] === "valorMinimo" || properties[1] === "valorMinimo" || properties[2] === "valorMinimo") &&
             ( properties[0] === "valorMaximo" || properties[1] === "valorMaximo" || properties[2] === "valorMaximo") ) {

            return GestionDescripcionValorMaximoMinimo(object["descripcionContiene"], object["valorMinimo"], object["valorMaximo"])
        }
    }
}
/*********************************************************************************/
function isObjEmpty(object){
    return Object.keys(object).length === 0;
}
/*********************************************************************************/

function agruparGastos(periodo,etiquetas,fechaDesde, fechaHasta){
    if ( fechaDesde === undefined){
        fechaDesde="2020-01-01";
    }
    if (fechaHasta === undefined){
        fechaHasta=new Date();
    }
    if ( etiquetas === undefined ){
        return filtrarGastos({ fechaDesde: fechaDesde, fechaHasta: fechaHasta})
                .reduce(function(sum,obj){
                    let key=obj.obtenerPeriodoAgrupacion(periodo)
                    if(!sum[key]){
                        sum[key]=0;
                    }
                    sum[key]+=obj.valor;
                    return sum;
                },{});
    }


    return filtrarGastos({ etiquetasTiene:etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta})
            .reduce(function(sum,obj){
                let key=obj.obtenerPeriodoAgrupacion(periodo)

                if(!sum[key]){
                    sum[key]=0;
                }
                sum[key]+=obj.valor;
                return sum;
            },{});

}
/*********************************************************************************/
function listarGastos(){
	return gastos;
}
/*********************************************************************************/

function anyadirGasto(gasto){
	gasto["id"]=idGasto;
	idGasto++;
	gastos.push(gasto);
}
/*********************************************************************************/
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
/*********************************************************************************/
function calcularTotalGastos(){
	let suma=0;
	for ( let gasto of gastos){
		suma = suma + gasto.valor;
	}
	return suma;
}
/*********************************************************************************/

function calcularBalance(){
    let totalgasto=calcularTotalGastos();
	return ( presupuesto - totalgasto);
}
/*********************************************************************************/
function GestionFechaDesde(fechadesde){
    return gastos.filter((x) => x.fecha >= Date.parse( fechadesde ));
}
/*********************************************************************************/
function GestionFechaDesdeHasta(fechadesde, fechahasta){
    return gastos.filter( (x) => x.fecha >= Date.parse(fechadesde))
                 .filter( (x) => x.fecha <= Date.parse(fechahasta));
}
/*********************************************************************************/
function GestionValorMimino(valorminimo){
    return gastos.filter( (x)=> x.valor > valorminimo )
}
/*********************************************************************************/
function GestionValorMinimoMaximo(valorMinimo, valorMaximo){
    return gastos.filter( (x) => x.valor > valorMinimo)
                 .filter( (x) => x.valor < valorMaximo);
}
/*********************************************************************************/
function GestionFechasValorMaximo(fechaDesde, fechaHasta, valorMaximo){
    return gastos.filter( (x) =>  x.fecha >= Date.parse( fechaDesde))
                 .filter( (x) =>  x.fecha <= Date.parse(fechaHasta))
                 .filter( (x) =>  x.valor < valorMaximo);
}
/*********************************************************************************/
function GestionDescripcionValorMaximoMinimo(descripcion,valorMinimo,valorMaximo){
    return gastos.filter( (x) => x.valor > valorMinimo)
                .filter( (x) => x.valor < valorMaximo)
                .filter( (x) => x.descripcion.indexOf(descripcion) != -1);
}

/*********************************************************************************/
function GestionEtiquetasValorMaximo(valorMaximo, etiquetasTiene){
    return gastos.filter( (x) =>{
                for(let valor of x["etiquetas"] ){
                    if ( etiquetasTiene.indexOf(valor) > -1 ){
                        return x;
                    }
                }
    }).filter( (x) => x.valor < valorMaximo);
}

/*********************************************************************************/
function GestionEtiquetasFechaDesdde(fechaDesde, etiquetasTiene){
    return gastos.filter( (x) => {
        for(let valor of x["etiquetas"]){
            if ( etiquetasTiene.indexOf(valor) > -1){
                return x;
            }
        }
    }).filter( (x) => x.fecha >= Date.parse(fechaDesde));
}

/*********************************************************************************/
function GestionFechasValorMaximoEtiquetas(etiquetasTiene, fechaHasta, valorMaximo){
    return gastos.filter( (x) => {
        for(let valor of x["etiquetas"]){
            if ( etiquetasTiene.indexOf(valor) > -1){
                return x;
            }
        }
    }).filter( (x) => x.fecha <= Date.parse(fechaHasta))
      .filter( (x) => x.valor < valorMaximo);
}

/*********************************************************************************/
function GestionEtiquetasFechasDesdeHasta(etiquetasTiene,fechaDesde,fechaHasta){
    return gastos.filter( (x) => {
        for(let valor of x["etiquetas"]){
            if ( etiquetasTiene.indexOf(valor) > -1){
                return x;
            }
        }
    }).filter( (x) => x.fecha >= Date.parse(fechaDesde))
      .filter( (x) => x.fecha <= Date.parse(fechaHasta));
}
/*********************************************************************************/


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
    calcularBalance,
    filtrarGastos,
    agruparGastos
};
