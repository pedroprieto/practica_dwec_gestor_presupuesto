
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


function agruparGastos(periodo, fechaDesde, fechaHasta, ...etiquetas){

    let objetoFiltro = {etiquetasTiene: etiquetas} //Aqui es donde me he comido mucho la cabeza
    //No paraba de poner if, como en filtrar gastos, para comprobar si existian las propiedades, y venga a darme fallo....
    //Tras 40342 ifs y 345243242352 pruebas, me doy cuenta que si etiquetas esta undefined, en filtrar gastos actuaria como si no existen etiquetas
    //Por lo que podemos declarar el objeto directamente como lo estoy haciendo, no declarando un objeto {} al que luego se le van añadiendo propiedades 
    //si no existe, que es lo que trataba de hacer en un principio----
    
    
   if(Date.parse(fechaHasta)){
   	objetoFiltro.fechaHasta = fechaHasta;
   }
   else{
   	objetoFiltro.fechaHasta = `${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth() + 1}-${new Date(Date.now()).getDate()}`;
   }
   
   console.log(objetoFiltro);
   
   
   if(Date.parse(fechaDesde)){
   	objetoFiltro.fechaDesde = fechaDesde;
   }
   
   console.log(objetoFiltro);
   /*console.log(hayFechaDesde);
   
   (objetoFiltro.fechaDesde) ? hayFechaDesde = true : hayFechaDesde = false;
   
   console.log(hayFechaDesde);*/
    
    return filtrarGastos(objetoFiltro).reduce(function(acc, actual){ //Y esto otro quebradero, pero una vez que comprendes la lógica, es entendible y práctico
    
    		console.log("ENTRAMOS EN FILTRAR");
        let perio = actual.obtenerPeriodoAgrupacion(periodo);
        
        console.log(perio);

        let controlFecha = true;
        

        //(hayFechaDesde && (actual.fecha < fechaDesde) ) ? controlFecha = false : controlFecha = true;
        

        if(controlFecha){
            if (acc[perio]){
            acc[perio] = acc[perio] + actual.valor;
            }
            else{
            acc[perio] = actual.valor;
            }
            console.log(acc);
        }
		
        return acc;

    }, {})

}

let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

agruparGastos("dia", "2022-10-10");