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



    if(Date.parse(fecha)){ //Aprovechamos que los parse suelen devolver un bool, aplicando el que nos han pedido
        this.fecha = Date.parse(fecha);       //Si se cumple, lo usamos como fecha
    }
    else{
        this.fecha = Date.parse(new Date()); //Si no se cumple, cogemos la fecha del momento
    }

    this.etiquetas = etiquetas;

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €` //Método que nos cuenta un poco del gasto
    }

    this.actualizarDescripcion = function(descripcion){ //Podemos actualizar la descripción
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(valor){ //Con este método podríamos actualizar el valor del gasto
        if (valor >= 0){
            this.valor = valor;
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

    this.anyadirEtiquetas = function(...etiquetas){ //Anyadimos etiquetas
        etiquetas.forEach((item) => {
            if (!this.etiquetas.includes(item)){ //Nos aseguramos de que, en caso de que nuestro array de etiquetas incluya alguna de las que queremos añadir, no lo haga
                this.etiquetas.push(item);
            }
        })
    }

    this.borrarEtiquetas = function(...etiquetas){ //Borramos etiquetas
        etiquetas.forEach((item, index) => {    
            if(this.etiquetas.includes(item)){ //En este caso, lo que tratamos es de se ordene borrar solo en caso de que exista el objetivo de eliminación
                this.etiquetas.splice(this.etiquetas.indexOf(item), 1);
            }
        })

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
    gastos.splice(gastos.findIndex(item => item.id == id), 1) //Aplicamos un splice con deleteCount de 1, en el indice donde coincida la propiedad id
}

function calcularTotalGastos(){ //Podemos llevarnos el susto, al calcular el total de todos los gastos...
    return gastos.reduce((sum, current) => sum + current.valor, 0); //Inicializamos el contador sum a 0, a la que vamos añadiendo cada propiedad valor de cada parametro
}

function calcularBalance(){ //Un simple balance, en el que restamos los gastos totales aprovechando la función que lo calcula, al presupuesto que tenemos
    return presupuesto - calcularTotalGastos();
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
    calcularBalance
}
