
function mostrarDatoEnId(idElemento,valor){

    let textBox = document.getElementById(idElemento);
    textBox.textContent = valor;
}
function mostrarGastoWeb (idElemento, gasto){


    let divGen = document.createElement('div');
    divGen.className = "gasto"; 

    let divDes = document.createElement('div');
    divDes.className = "gasto-descripcion";
    divDes.append(gasto.descripcion);

    let divFech = document.createElement('div');
    divFech.className = "gasto-fecha";
    divFech.append(gasto.fecha);


    let divVal = document.createElement('div');
    divVal.className = "gasto-valor";
    divVal.append(gasto.valor)

    let divEti = document.createElement('div');
    divEti.className = "gasto-etiquetas";

    divGen.append(divDes, divFech, divVal, divEti);
  
    for (let etiqueta of gasto.etiquetas)
    {
         
        let spanEti = document.createElement('span');
        spanEti.className = "gasto-etiquetas-etiqueta";
        
        spanEti.append(`${etiqueta},`);
        
        divEti.append(spanEti);
    }

      
     let contenido = document.getElementById(idElemento);

     
    contenido.append(divGen);    
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let div = document.createElement('div');
    let h1 = document.createElement('h1');

    div.className = "agrupacion";  
    h1.innerHTML = "Gastos agrupados por " + periodo;
    div.append(h1);

    for (let [key, value] of Object.entries(agrup))
    {
        let div1 = document.createElement('div');
        let span = document.createElement('span');
        let span1 = document.createElement('span');   

        div1.className = "agrupacion-dato";       
        span.className = "agrupacion-dato-clave";           
        span1.className = "agrupacion-dato-valor";

        

        span.append("key: " + key);
        span1.append(" Value: " + value);
        
        div1.append(span);
        div1.append(span1);
        div.append(div1);
    }   
     
    let contenido = document.getElementById(idElemento);

    contenido.append(div);
}
export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};


