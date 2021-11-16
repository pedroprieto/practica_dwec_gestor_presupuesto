import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{
    document.getElementById("idElemento").innerHTML = valor;
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