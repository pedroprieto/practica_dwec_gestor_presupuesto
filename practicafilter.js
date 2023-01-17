

let fechas=[];
fechas.push(Date.parse("2021-10-06"))
fechas.push(Date.parse("2021-09-06"))
fechas.push(Date.parse("2020-05-26"))
fechas.push(Date.parse("2021-10-08"))
fechas.push(Date.parse("2021-09-26"))
fechas.push(Date.parse("2021-10-06"))

let fechashasta=fechas.filter( (x) => x >= Date.parse("2021-09-15") );
let fechasfin=fechashasta.filter( (x) => x <= Date.parse("2021-10-06")  )

function transformaListadoEtiqueta(etiquetas){
  return etiquetas.split(/[:,.; ]/ig).filter( elem => elem != "");
}


function Fecha(){
    let now= new Date();
    mensaje(now);
    return now;
}

function ParseFecha(){
    let fechaEntera=Fecha();
    let year=fechaEntera.getFullYear(), month=fechaEntera.getMonth(), day=fechaEntera.getDate();
    return `${year} ${month} ${day}`;
}

function FechaValida(fechastring){
    let fecha_correcta=Date.parse(fechastring);
    if ( isNaN(fecha_correcta) ){
        fecha_correcta=Date.now();
    }
    return fecha_correcta;
}

function mensaje(mensaje){
    console.log(mensaje);
}



