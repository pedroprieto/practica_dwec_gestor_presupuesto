
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

}

function mostrarGastosAgrupadosWeb()
{

}

export
{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}