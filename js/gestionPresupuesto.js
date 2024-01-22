//Código de gestor de presupuesto por DVS curso 2023/2024...

let presupuesto = 0;
let gastos = [];
let idGasto = 0;



function actualizarPresupuesto(nuevoPresu) {
    if (nuevoPresu >= 0){  //Comprobamos que el presupuesto sea no negativo...
        presupuesto = nuevoPresu;
        return nuevoPresu;
    }
    else{
        console.log("ERROR: no deberias tener un presupuesto negativo");
        return -1;
    }
    
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`; //Mostramos el presupuesto...
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {  //Constructor con los parámetros demandados, incluido el array variable de etiquetas

    //Parámetros por orden de aparición

    this.descripcion = descripcion;

    if (valor >= 0){ //Comprobamos si el valor es negativo
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }



    if(Date.parse(fecha)){ //Aprovechamos que nos devolveria un NaN si la fecha no fuera correcta
        this.fecha = Date.parse(fecha);       //Si se cumple, lo usamos como fecha
    }
    else{
        this.fecha = Date.parse(new Date()); //Si no se cumple, cogemos la fecha del momento
    }

    this.etiquetas = etiquetas;

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €` //Método que nos cuenta un poco del gasto
    }

    this.actualizarDescripcion = function(nuevaDescripcion){ //Podemos actualizar la descripción
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){ //Con este método podríamos actualizar el valor del gasto
        if (nuevoValor >= 0){
            this.valor = nuevoValor;
        }
    }

    this.mostrarGastoCompleto = function(){ //Una muestra algo más completa sobre el gasto
        return `${this.mostrarGasto()}.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:
- ${etiquetas.join("\n- ")}
`
    }

    this.actualizarFecha = function(fecha){ //También podemos actualizar la fecha
        if(Date.parse(fecha)){  //La parseamos, para que no se cambie en caso de no ser timestamp correcta...
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function(...etiquetaNueva){ //Anyadimos etiquetas
        etiquetaNueva.forEach(function(item){
            if (!etiquetas.includes(item)) etiquetas.push(item);
        })
    }

    this.borrarEtiquetas = function(...etiquetas){ //Borramos etiquetas
        etiquetas.forEach((item) => {    
            if(this.etiquetas.includes(item)){ //En este caso, lo que tratamos es de se ordene borrar solo en caso de que exista el objetivo de eliminación
                this.etiquetas.splice(this.etiquetas.indexOf(item), 1);
            }
        })

    }

    this.obtenerPeriodoAgrupacion = function (periodo){
        
        let fecha = new Date(this.fecha);

        let anyo = fecha.getFullYear();

        let mes = fecha.getMonth() + 1;

        if (mes < 10){
            mes = '0' + mes;
        }

        let dia = fecha.getDate();

        if (dia < 10){
            dia = '0' + dia;
        }

        if (periodo === "dia"){
            return `${anyo}-${mes}-${dia}`;
        }
        if (periodo === "mes"){
            return `${anyo}-${mes}`
        }
        if (periodo === "anyo"){
            return `${anyo}`;
        }
    }

}   


function listarGastos(){
    return gastos; //Muy sencillo, listamos los gastos "a pelo"
}

function anyadirGasto(gasto){  //Anyadimos un gasto nuevo al array gastos, con su correspondiente id, que será único e irrepetible
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){ //Podemos borrar un gasto, localizando por su id, ya que es único como hemos comentado
    gastos.splice(gastos.findIndex(function(item){
        if (item.id == id) return true;
    }), 1) //Aplicamos un splice con deleteCount de 1, en el indice donde coincida la propiedad id
}

function calcularTotalGastos(){ //Podemos llevarnos el susto, al calcular el total de todos los gastos...
    return gastos.reduce((sum, current) => sum + current.valor, 0); //Inicializamos el contador sum a 0, a la que vamos añadiendo cada propiedad valor de cada parametro
}

function calcularBalance(){ //Un simple balance, en el que restamos los gastos totales aprovechando la función que lo calcula, al presupuesto que tenemos
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(objetoFiltro){ //A ver si me consigo explicar... aqui pasamos de parámetro un objeto, de momento sin parámetros, al que se los iremos añadiendo si procede
    let filtrado = gastos.filter(function(gasto){  //Vamos a aplicar el gasto... menudo cacao para entender como funciona el filter
        let pasaFiltro = true; //Esta variable sera la encargada de decir si el current gasto pasa el filtro o no, vamos a aplicar la logica 
                               //De dejarlo default en si, y pasarlo a false en caso de que el valor no deba ser filtrado
        if (objetoFiltro.fechaDesde){  //Vemos si existe la propiedad fechaDesde
            let fecha = Date.parse(objetoFiltro.fechaDesde);  //La parseamos, pues trabajamos con timestamp

            if (fecha > gasto.fecha) pasaFiltro = false; //Y filtramos, con la lógica de "ver si no pasa el filtro"
        }
        
        if (objetoFiltro.fechaHasta){ //Idem para fechaHasta
            let fecha = Date.parse(objetoFiltro.fechaHasta);

            if (fecha < gasto.fecha) pasaFiltro = false;
        }

        if (objetoFiltro.valorMinimo){  //Y lo mismo para valorMinimo
            if (objetoFiltro.valorMinimo > gasto.valor ) pasaFiltro = false;
        }

        if (objetoFiltro.valorMaximo){ //Y valor maximo
            if (objetoFiltro.valorMaximo < gasto.valor ) pasaFiltro = false;
        }

        if (objetoFiltro.descripcionContiene){ //Aqui comprobamos si existe propiedad de descripcionContiene
            let descr = objetoFiltro.descripcionContiene.toLowerCase(); //Y la pasamos a minusculas
            if (!(gasto.descripcion.toLowerCase().includes(descr))){ //Para comparar con la tambien pasada a minusculas propiedad correspondientes del current gasto
                pasaFiltro = false;
            }
        }

        if (objetoFiltro.etiquetasTiene){ //Comprobamos que exista la propiedad...

            let etiquetasFiltro = objetoFiltro.etiquetasTiene.map(function (item){ //Mapeamos, para pasar todas las etiquetas a minusculas, favoreciendo la no distincion may/min
                return item.toLowerCase();
            })

            let etiquetasGasto = gasto.etiquetas.map(function(item){ //Tambien mapeamos las etiquetas del current gasto
                return item.toLowerCase();
            })
            

            function contienen(uno, dos){ //Aqui implementamos una funcion, para ver si coincide alguna etiqueta, no se si es buena idea o seria mejor implementarla fuera y luego llamarla
                return uno.some(function (eti){ //Pero como tampoco quiero escribir mas funciones de las que toca, lo dejamos aqui
                    return dos.includes(eti);
                })
            }

           if (!contienen(etiquetasFiltro, etiquetasGasto)) pasaFiltro = false;

        }

        return pasaFiltro; //Si ningun filtro ha dicho "por aqui no pasas", el pasaFiltro permanecería true, y el current gasto pasaria el filtro
    })

    return filtrado;
}


function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){

    let objetoFiltro = {etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta}; //Aqui es donde me he comido mucho la cabeza
    //No paraba de poner if, como en filtrar gastos, para comprobar si existian las propiedades, y venga a darme fallo....
    //Tras 40342 ifs y 345243242352 pruebas, me doy cuenta que si etiquetas esta undefined, en filtrar gastos actuaria como si no existen etiquetas
    //Por lo que podemos declarar el objeto directamente como lo estoy haciendo, no declarando un objeto {} al que luego se le van añadiendo propiedades 
    //si no existe, que es lo que trataba de hacer en un principio----
    
    (Date.parse(objetoFiltro.fechaHasta)) ? objetoFiltro.fechaHasta : objetoFiltro.fechaHasta = `${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth() + 1}-${new Date(Date.now()).getDate()}`;
        
    
    return filtrarGastos(objetoFiltro).reduce(function(acc, actual){ //Y esto otro quebradero, pero una vez que comprendes la lógica, es entendible y práctico

        let perio = actual.obtenerPeriodoAgrupacion(periodo);

        let hayFechaDesde = false;
    
        if (Date.parse(fechaDesde)){                //Hemos mejorado el control de filtro, para añadirle el comportamiento en caso que no tenga fecha desde/hasta
            objetoFiltro.fechaDesde = fechaDesde;
            hayFechaDesde = true;
        }
        
        let controlFecha = true;

        if (hayFechaDesde && (actual.fecha < Date.parse(fechaDesde))){
            controlFecha = false;
        }

        if(controlFecha){
            if (acc[perio]){
            acc[perio] = acc[perio] + actual.valor;
            }
            else{
            acc[perio] = actual.valor;
            }
        }

        return acc;

    }, {})

}

function transformarListadoEtiquetas(etiquetas){
    let resultado = etiquetas.match(/\w+/gi);

    return resultado;
}


function cargarGastos(gastosAlmacenamiento){
    gastos = [];

    for (let g of gastosAlmacenamiento){

        let gastoRehidratado = new CrearGasto();

        Object.assign(gastoRehidratado, g);

        gastos.push(gastoRehidratado);
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
