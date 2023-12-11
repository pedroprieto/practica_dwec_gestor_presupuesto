
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function listarGastos(){
    return gastos;
}

//Función que recibe un objeto gasto por parámetro y le asigna un id.
function anyadirGasto(gasto){
    
    //Agregar una propiedad 'id' al objeto gasto
    gasto.id = idGasto;
    idGasto++;

    //Se añade el objeto gasto al final del array de gastos.
    gastos.push(gasto);

}

//Funcíon que recibe un id por parametro y elimina el objeto gasto correspondiente
function borrarGasto(id){
    //Recorremos los gastos y añadimos un indice para saber en que punto estamos.
    gastos.forEach((gasto, index) => {
        if (gasto.id === id)
            // Elimnamos el elemento que coincida, en el punto actual de la iteración.
            gastos.splice(index, 1);
    });
    

}
//Función que suma el total de los valores de los objetos gasto
function calcularTotalGastos(){
        
    let totalGastos = 0;

    gastos.forEach(gasto => {
        totalGastos += gasto.valor
    });
    
    // Formatear el resultado con dos decimales
    return totalGastos
}

//Función sin parámetros que devuelva el balance disponible
function calcularBalance(){

    let balance = presupuesto - calcularTotalGastos();

    return balance;

}


//Función que toma un número por parámetro y lo asigna a la variable global presupuesto.
function actualizarPresupuesto(numero) {
    if (numero >=0){
        presupuesto = numero;
        return presupuesto;
    }
           
    else{
        console.log("Número no valido")
        // Devuelve -1 para indicar un valor no válido
        return -1
        }
    }

//Función sin parámetros que devuelve un texto con el presupuesto
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
//Función de un parámetro (objeto que contiene los filtros) que devolverá
//un subconjunto de los gastos existentes (variable global gastos)
function filtrarGastos(filtros) {

    // Inicia la función de filtrado
    let resultado = gastos.filter((gasto) => {
      // Comprueba si la fecha mínima está presente y si es mayor que la fecha del gasto
      if (filtros.fechaDesde && Date.parse(filtros.fechaDesde) > gasto.fecha) {
        return false; // Si no cumple, excluye el gasto
      }
  
      // Comprueba si la fecha máxima está presente y si es menor que la fecha del gasto
      if (filtros.fechaHasta && Date.parse(filtros.fechaHasta) < gasto.fecha) {
        return false; // Si no cumple, excluye el gasto
      }
  
      // Comprueba si el valor mínimo está presente y si es mayor que el valor del gasto
      if (filtros.valorMinimo && filtros.valorMinimo > gasto.valor) {
        return false; // Si no cumple, excluye el gasto
      }
  
      // Comprueba si el valor máximo está presente y si es menor que el valor del gasto
      if (filtros.valorMaximo && filtros.valorMaximo < gasto.valor) {
        return false; // Si no cumple, excluye el gasto
      }
  
      // Comprueba si la descripción a buscar está presente y si no se encuentra en la descripción del gasto
      if (filtros.descripcionContiene && !gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())) {
        return false; // Si no cumple, excluye el gasto
      }
  
      // Comprueba si hay etiquetas en los filtros y si el gasto contiene al menos una de las etiquetas
      if (filtros.etiquetasTiene && filtros.etiquetasTiene.length > 0) {
        // Convierte etiquetas a minúsculas para comparación
        let etiquetasGasto = gasto.etiquetas.map((etiqueta) => etiqueta.toLowerCase());
        let etiquetasFiltro = filtros.etiquetasTiene.map((etiqueta) => etiqueta.toLowerCase());
  
        // Encuentra las etiquetas que coinciden
        let etiquetasRepetidas = etiquetasFiltro.filter((etiqueta) => etiquetasGasto.includes(etiqueta));
        
        // Si no coincide ninguna etiqueta, excluye el gasto
        if (etiquetasRepetidas.length === 0) {
          return false;
        }
      }
      return true; // Si pasa todas las comprobaciones, incluye el gasto en el resultado
    });
    return resultado;
  }
  
//Función de cuatro parámetros que devolverá un objeto con los resultados de realizar una agrupación por período temporal.
  function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
    // Define los filtros para la función de filtrado
    let filtros = {
      fechaDesde,
      fechaHasta,
      etiquetasTiene: etiquetas,
    };
  
    // Llama a la función de filtrado para obtener el subconjunto de gastos que cumple con los filtros
    let gastosFiltrados = filtrarGastos(filtros);
  
    // Inicializa el objeto acumulador
    let resultado = gastosFiltrados.reduce((acc, gasto) => {
      // Obtiene el período de agrupación para el gasto
      let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
  
      // Inicializa la propiedad en el acumulador si es la primera vez que se encuentra este período de agrupación
      if (!acc[periodoAgrupacion]) {
        acc[periodoAgrupacion] = 0;
      }
  
      // Suma el valor del gasto a la propiedad correspondiente en el acumulador
      acc[periodoAgrupacion] += gasto.valor;
  
      return acc;
    }, {});
  
    return resultado;
  }

// Función constructora para crear objetos de gasto con descripción, valor, fecha
//  y un número indeterminado de argumentos que se almacenan en el array etiquetas.
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    // Comprobar si el valor introducido es un número no negativo
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }
    
    // Asignar la descripción
    this.descripcion = descripcion;

    // Validar la fecha, si es correcta Date.parse devuelve un número valido que se evalua como true
    if (Date.parse(fecha)) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now(); // Fecha actual en formato timestamp
    }
    
        
    //Asignar array etiquetas, si no recibe el parámetro, lo inicia vacío.
    if(etiquetas === undefined)
        this.etiquetas = [];
    else
        this.etiquetas = etiquetas
    
    // Método para mostrar el gasto
    this.mostrarGasto = function () {
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }
    
    // Método para actualizar la descripción
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    
    // Método para actualizar el valor
    this.actualizarValor = function (nuevoValor) {
        // Comprobar si el nuevo valor es un número no negativo
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }
    //Metodo para mostrar el gasto, fecha y etiquetas de un objeto gasto
    this.mostrarGastoCompleto = function () {
        let listaEtiquetas = "";
        for (const etiqueta of this.etiquetas) {
            listaEtiquetas += `- ${etiqueta}\n`;
        }
        //Creamos una instancia Date válida para formatear con toLocaleString.
        let fechaFormateada = new Date(this.fecha).toLocaleString();
        //Devolvemos un texto multilinea
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${fechaFormateada}
Etiquetas:
${listaEtiquetas}`;
    }
    //Metodo para actualizar una fecha string válida introducida
    this.actualizarFecha = function(fecha){
        if (Date.parse(fecha)) {
            this.fecha = Date.parse(fecha);
        }
    }
    //Metodo que añade una etiqueta si esta no se repite
    this.anyadirEtiquetas = function(...etiquetas){

        let nuevasEtiquetas = [...etiquetas]
        //Recorremos las nuevas etiquetas y las comparamos con las que hay dentro del objeto
        for (const etiqueta of nuevasEtiquetas) {
            if(!this.etiquetas.includes(etiqueta))
                this.etiquetas.push(etiqueta)
        }
    }
    this.borrarEtiquetas = function (...etiquetas) {
        // Verificar si no se proporcionaron etiquetas
        if (etiquetas.length === 0) {
            // Si no se proporcionan etiquetas, borrar todas las etiquetas
            this.etiquetas = [];
            return;
        }
    
        // Si se proporcionan etiquetas, borrar solo las etiquetas especificadas
        let nuevasEtiquetas = [...etiquetas];
        for (const etiqueta of nuevasEtiquetas) {
            let indice = this.etiquetas.indexOf(etiqueta);
            if (indice !== -1) {
                this.etiquetas.splice(indice, 1);
            }
        }
    }
    
    //Función de un parámetro que devolverá el período de agrupación
    //correspondiente al parámetro periodo de la función y a la fecha del gasto.
    //Formato de devolución aaaa-mm-dd
    this.obtenerPeriodoAgrupacion = function(periodo){
        
        let fecha = new Date(this.fecha);
        let anyo = fecha.getFullYear();
        //Formateamos el mes para que tenga dos digitos,y cuando sea uno, inserte un 0 delante.
        let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        let dia = fecha.getDate().toString().padStart(2, '0');

        if (periodo === "anyo")
            return anyo
        else if  (periodo === "mes")
            return anyo + "-" + mes
        else if  (periodo === "dia")
            return anyo + "-" + mes + "-" + dia
        else 
            return "Periodo no válido"
    }
    
}

function transformarListadoEtiquetas(etiq){

    let etiquetas = etiq.split(/[~,.;:\s]+/);
    // Filtrar elementos vacíos en el array resultante
    etiquetas = etiquetas.filter(etiqueta => etiqueta !== "");


    return etiquetas;
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
        // Copiamos los datos del objeto guardado en el almacenamiento al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
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
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}