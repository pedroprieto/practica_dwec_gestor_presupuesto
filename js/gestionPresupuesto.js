// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// la creamos con let
let presupuesto = 0;
//Creación de array gastos e idGasto
let gastos = [];
let idGasto = 0;




    
// TODO: Variable global


function actualizarPresupuesto(valor) {
    // TODO
    if (typeof valor === 'number' && valor >=0) {
        presupuesto = valor;
        return presupuesto;
    }
    else {
        console.log("El valor introducido no es válido.");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}



//función CrearGasto porqeu es un constructor y va en en mayúsculas.
// Para objeto gasto creamos dentro de Crear Gasto los métodos qeu nos piden

class CrearGasto {
  constructor(descripcion, valor = 0, fecha, ...etiquetas) {
    // TODO
    //propiedades
    this.descripcion = descripcion;
    this.valor = typeof valor === 'number' && valor >= 0 ? valor : 0;


    // Métodos 
    this.mostrarGasto = function () {
      return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    this.actualizarDescripcion = function (nuevaDescripcion) {
      this.descripcion = nuevaDescripcion;
    };
    this.actualizarValor = function (nuevoValor) {
      if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
        this.valor = nuevoValor;
      }
    };
    this.etiquetas = [];

    this.anyadirEtiquetas(...etiquetas);

    let f = Date.parse(fecha);
    if (isNaN(f)) {
      this.fecha = Date.now();
    }
    else {
      this.fecha = f;
    }
    
    this.borrarEtiquetas = function(...etiquetas) {
      let newEti= []; // 
                            
      for (let eti of this.etiquetas) { 
    if (etiquetas.indexOf(eti) == -1) { 
                                   
              newEti.push(eti); 
                                    
    }
      }
      this.etiquetas = newEti; 
  }
  //hemos cambiado la función gasto completo y tiene this para referenciar al objeto gasto.
  this.mostrarGastoCompleto = function() {
    let fechaLocalizada = new Date(this.fecha).toLocaleString();
    let texto = `Gasto correspondiente a ${descripcion} con valor ${valor} €.\nFecha: ${fechaLocalizada}\nEtiquetas:\n`
    for (let key of etiquetas)
    {
        texto = texto + "- " + key + "\n";
    }
    return texto;
  }


  }
  obtenerPeriodoAgrupacion(periodo) {

    let newDate = new Date(this.fecha);
    let anyo = newDate.getFullYear();
    let mes = newDate.getMonth() + 1;
    let dia = newDate.getDate();
    let periodoAgrupacion;
    if (periodo === "anyo") {
      periodoAgrupacion = `${anyo}`;
    } else if (periodo === "mes") {
      if (mes < 10) {
        mes = "0" + mes.toString();
      }

      periodoAgrupacion = `${anyo}-${mes}`;
    } else if (periodo === "dia") {
      if (mes < 10) {
        mes = "0" + mes.toString();
      }
      if (dia < 10) {
        dia = "0" + dia.toString();
      }
      periodoAgrupacion = `${anyo}-${mes}-${dia}`;
    } else {
      periodoAgrupacion = `Fecha no válida.`;
    }
    return periodoAgrupacion;
  }

  actualizarFecha(nuevaFecha) {
    let parsedDate = Date.parse(nuevaFecha);
    if (!isNaN(parsedDate)) {
      this.fecha = parsedDate;
    }
  }
  anyadirEtiquetas(...etiquetas) {
    etiquetas.forEach(etiqueta => {
      let etiquetaExistente = false;
      for (let i = 0; i < this.etiquetas.length; i++) {
        if (this.etiquetas[i] === etiqueta) {
          etiquetaExistente = true;
          break;
        }
      }

      if (!etiquetaExistente) {
        this.etiquetas.push(etiqueta);
      }
    });
  }
  /*
borrarEtiquetas(...etiquetasABorrar) {
    this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasABorrar.includes(etiqueta));
  }*/
  
}



  function anyadirGasto(gasto){
      gasto.id = idGasto++;
        // Añadir el objeto gasto al final del array gastos
      gastos.push(gasto);

}

function borrarGasto(idGastoABorrar){
    let index = gastos.findIndex(gasto => gasto.id === idGastoABorrar);
    if (index !== -1) {
      gastos.splice(index, 1);
    }
}

function calcularTotalGastos(){
 return gastos.reduce((total, gasto) => total + gasto.valor, 0);   
}
function calcularBalance(){
return presupuesto - calcularTotalGastos();
}
function filtrarGastos(filtros)
{
return gastos.filter((gasto) =>{
    // Aquí metemos las condiciones
    if (filtros.fechaDesde){
        let fechaDesde = Date.parse(filtros.fechaDesde);
        
        if (isNaN(fechaDesde) || gasto.fecha < fechaDesde) {
            return false;
        }
    }
    if (filtros.fechaHasta){
        let fechaHasta = Date.parse(filtros.fechaHasta);
        if (isNaN(fechaHasta) || gasto.fecha > fechaHasta) {
            return false;
        }
    }
    if (filtros.valorMinimo && gasto.valor < filtros.valorMinimo) {
        return false;
      }
  
      
      if (filtros.valorMaximo && gasto.valor > filtros.valorMaximo) {
        return false;
      }
      if (
        filtros.descripcionContiene &&
        !gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())
      ) {
        return false;
      }
      if (
        filtros.etiquetasTiene &&
        Array.isArray(filtros.etiquetasTiene) &&
        filtros.etiquetasTiene.length > 0 &&
        !filtros.etiquetasTiene.some((etiqueta) =>
          gasto.etiquetas.includes(etiqueta.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });
}

function transformarListadoEtiquetas (textoEtiquetas){
  //la cadena tendrá no tendra en cuetna todos estos carácteres, además hemos incluido la coma
  let regex = /[^~;.\s:,]+/gi ;
    // Se divide el texto en un array utilizando la expresión regular
  let etiquetas = textoEtiquetas.match(regex);

    // Se eliminan los posibles espacios vacíos del array
    return etiquetas;

}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
  // Filtrar gastos según los parámetros proporcionados
  let gastosFiltrados = filtrarGastos({
      fechaDesde: fechaDesde,
      fechaHasta: fechaHasta,
      etiquetasTiene: etiquetas
  });

  // Utilizar reduce para agrupar gastos por período
  let resultado = gastosFiltrados.reduce((acumulador, gasto) => {
      let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
      acumulador[periodoAgrupacion] = ((acumulador[periodoAgrupacion] || 0) + gasto.valor);
      return acumulador;
  }, {});

  return resultado;
}



function listarGastos() {
  return gastos;
  }
  function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
}










// Lo que haríamos es un nuevo objeto llamado gasto, podríamos haberlo creaado en la función también.



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
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
