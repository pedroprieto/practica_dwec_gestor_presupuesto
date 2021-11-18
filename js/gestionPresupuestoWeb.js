import * as gesPres from "./gestionPresupuesto.js";

function repintar()
{
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gasos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    let borrar = document.getElementById("listado-gastos-completo");

    borrar.innerHTML = "";

    for (let g of gesPres.listarGastos())
    {
        mostrarGastoWeb("listado-gastos-completo", g);
    }
}

//Manejadora de eventos
function actualizarPresupuestoWeb()
{
    let presu = parseInt(prompt("Introduzca un presupuesto"));

    gesPres.actualizarPresupuesto(presu);

    repintar();
}

//Manejadora de eventos
function nuevoGastoWeb()
{
    let desc = prompt("Introduce una descripcion");
    let valor = parseInt(prompt("Introduce un valor"));
    let fecha = prompt("introduce una fecha");

    let etiqsPrompt = prompt("introduce las etiquetas");

    let etiqs = etiqsPrompt.split(",");

    let g1 = new gesPres.CrearGasto(desc, valor, fecha, ...etiqs);

    gesPres.anyadirGasto(g1);

    repintar();
}

//Constructora y eventos
function EditarHandle()
{
    this.handleEvent = function()
    {
        let des = prompt("Introduce una descripcion");
        let val = parseInt(prompt("Introduce un valor"));
        let fech = prompt("introduce una fecha");

        let etiqsPrompt = prompt("introduce las etiquetas");

        let etiq = etiqsPrompt.split(",");

        this.gasto.actualizarValor(val);
        this.gasto.actualizarDescripcion(des);
        this.gasto.actualizarFecha(fech);
        this.gasto.anyadirEtiquetas(...etiq);

        repintar();
    }
}

function BorrarHandle()
{
    this.handleEvent = function()
    {
        gesPres.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function mostrarDatoEnId(idElemento, valor)
{
    let contenedor = document.getElementById(idElemento);
    
    contenedor.innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let div4 = document.createElement("div");
    let div5 = document.createElement("div");

    div1.className = "gasto";

    div2.className = "gasto-descripcion";
    div2.append(gasto.descripcion);

    div3.className = "gasto-fecha";
    div3.append(gasto.fecha);

    div4.className = "gasto-valor";
    div4.append(gasto.valor);

    div1.append(div2);
    div1.append(div3);
    div1.append(div4);

    div5.className = "gasto-etiquetas";

    for (let e of gasto.etiquetas)
    {
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";

        span.append(e);
        div5.append(span);
    }

    div1.append(div5);

    let contenido = document.getElementById(idElemento);
    contenido.append(div1);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let div1 = document.createElement("div");
    let h1 = document.createElement("h1");
    
    div1.className = "agrupacion";

    h1.innerHTML = `Gastos agrupados por ${periodo}`;

    div1.append(h1);

    for (let [clave, valor] of Object.entries(agrup))
    {
        let div = document.createElement("div");
        div.className = "agrupacion-dato";

        let span1 = document.createElement("span");
        let span2 = document.createElement("span");

        span1.className = "agrupacion-dato-clave";
        span1.append(`Clave: ${clave}`);
        div.append(span1);

        span2.className = "agrupacion-dato-valor";
        span2.append(`Valor: ${valor}`);
        div.append(span2);

        div1.append(div);
    }

    let contenido = document.getElementById(idElemento);

    contenido.append(div1);
}

export
{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}