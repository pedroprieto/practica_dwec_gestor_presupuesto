// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let gastos = [];
let idGasto = 0;
let presupuesto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if(nuevoPresupuesto >= 0){
        presupuesto=nuevoPresupuesto;
        return nuevoPresupuesto;
    }else{
        return -1;       
    }
}

function mostrarPresupuesto() {    
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor,fecha, ...etiquetas) {
    
    this.mostrarGasto=function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion=function(descripcion){
        this.descripcion=descripcion;
    }
    this.actualizarValor=function(valor){
        if(valor>=0){
            this.valor=valor;
        }
    }
    this.mostrarGastoCompleto=function(){
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
        for (let etiqueta of this.etiquetas){
            texto +=`- ${etiqueta}\n`
        }
        return texto
    }
    this.actualizarFecha=function(fecha){
        if(Date.parse(fecha)){
            this.fecha=Date.parse(fecha);
        }
    }
    this.anyadirEtiquetas=function(...etiquetasNuevas){
        for(let etiqueta of etiquetasNuevas){
            if(this.etiquetas.indexOf(etiqueta) == -1){
                this.etiquetas.push(etiqueta)
            }
        }

    }
    this.borrarEtiquetas=function(...etiquetasBorrar){
        let nuevaLista=[]
        for(let etiqueta of this.etiquetas){  
            if( etiquetasBorrar.indexOf(etiqueta) == -1){
                nuevaLista.push(etiqueta)
            }
        }
        this.etiquetas=nuevaLista;
    }
    this.obtenerPeriodoAgrupacion= function(filtro){
        let fecha= new Date(this.fecha).toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric"})
        let fechaSimple= fecha.split("/")
        let anyo = fechaSimple[2]
        let mes,dia
        if(fechaSimple[0]<10){
            mes ="0" + fechaSimple[0]
        }else{
            mes = fechaSimple[0]
        }
        if(fechaSimple[1]<10){
            dia ="0" + fechaSimple[1]
        }else{
            dia = fechaSimple[1]
        }
        
        switch(filtro){
            case 'anyo':
               return  `${anyo}`
            break;
            case 'mes':
                return  `${anyo}-${mes}`
            break;
            case 'dia':
                return  `${anyo}-${mes}-${dia}`
            break;
            default:
                return 'Valor introducido erroneo'
            break;
        }

    }
    //PROPIEDADES
    this.descripcion=descripcion;
    valor>=0? this.valor=valor: this.valor=0;
    this.etiquetas=[];
    this.anyadirEtiquetas(...etiquetas);
    Date.parse(fecha)?this.fecha=Date.parse(fecha):this.fecha=Date.parse(new Date());
}
function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id=idGasto;
    idGasto++;
    gastos.push(gasto)
}
function borrarGasto(idGasto){
    gastos.forEach((gasto,index)=>{
        if(gasto.id==idGasto){
            gastos.splice(index,1)
        }
    })
}
function calcularTotalGastos(){
    let gastosTotales=0;
    gastos.forEach(x=> gastosTotales+= x.valor)
    return gastosTotales;
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos(filtroDatos){
    let results = gastos.filter(function(g){
        var valido = true;
        if(filtroDatos.fechaDesde){
            var fechaFiltro = Date.parse(filtroDatos.fechaDesde);
            valido= valido && (g.fecha >= fechaFiltro);
        }
        if(filtroDatos.fechaHasta){
            var fechaFiltro = Date.parse(filtroDatos.fechaHasta);
            valido= valido && (g.fecha <= fechaFiltro);
        }
        if(filtroDatos.valorMinimo){
            valido = valido && (g.valor >= filtroDatos.valorMinimo);
        }
        if(filtroDatos.valorMaximo){
            valido = valido && (g.valor <= filtroDatos.valorMaximo);
        }
        if(filtroDatos.descripcionContiene){
            valido = valido && (g.descripcion.indexOf(filtroDatos.descripcionContiene)> -1);
        }
        if(filtroDatos.etiquetasTiene){
            var etiSi = false;
            filtroDatos.etiquetasTiene.forEach((valor)=>{
                if(g.etiquetas.indexOf(valor) > -1){
                    etiSi = true;
                }
            })

            valido = valido && etiSi;
        }
        return valido;
    })
    return results;
}
function agruparGastos(periodo = mes,etiquetas,fechaDesde,fechaHasta){
    let listaFiltrada;
    if((etiquetas == undefined)&& fechaDesde && fechaHasta){
        listaFiltrada=gastos;
    }else{
        listaFiltrada= filtrarGastos({etiquetasTiene:etiquetas,fechaDesde:fechaDesde,fechaHasta:fechaHasta})
    }
    
    return listaFiltrada.reduce(function(acc,gasto){

        let per = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acc[per]) {
            acc[per] = acc[per] + gasto.valor;
        } else {
            acc[per] = gasto.valor;
        }

        return acc;
    },{})
}


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
