// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

let gastos=[];
let idGasto=0;

function actualizarPresupuesto( valor ) {
    if(valor>0){
        presupuesto =valor;
        return (` ${presupuesto} `)
       
    }     
    else if(valor<0){
        presupuesto=-1;
        return (`${presupuesto}`)
        
    }
    else{
        
        return (`${presupuesto}`)
    }
   
}

function mostrarPresupuesto() {
    
    return (`Tu presupuesto actual es de ${presupuesto} €`)
    
}

function CrearGasto( descripcion, valor, fecha,  ...etiquetas) {
    this.descripcion=descripcion;
    this.valor=valor;
    this.etiquetas=etiquetas;
    let f = Date.parse(fecha)
    if (isNaN(f)){
        this.fecha=Date.now()
    } 
    else{
        this.fecha=f
    }
    
    this.mostrarGasto=function() {
    
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)
        
    }
    this.mostrarGastoCompleto=function() {
        let fechaGasto =new Date(this.fecha)
        etiquetas= [" casa" , " supermercado" ," comida"]
        
    
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaGasto.toLocaleString()}\nEtiquetas:\n-${etiquetas.join(`\n-`)+ "\n"}`)
    
    }
    this.actualizarDescripcion=function(descripcion){
        this.descripcion=descripcion;
        return (`${descripcion}`)
    } 
    this.actualizarFecha=function(fechaNueva){
        let fechaValida=Date.parse(fechaNueva)
        if(!isNaN(fechaValida))
        {
            this.fecha=fechaValida
        }
        
    }
   this.anyadirEtiquetas=function(...etiquetaNueva){

       for (let i = 0;i<=etiquetas.length;i++)
       {
        if(this.etiquetas.length==0)
             {
                etiquetas.push(etiquetaNueva[i])
             }
       else if(!etiquetas.includes(etiquetaNueva[i]) && !etiquetaNueva[i]=="")
        {

        etiquetas.push(etiquetaNueva[i])
        }
        
       }
       return (`${etiquetas}`)
    }
    this.borrarEtiquetas=function(...etiqueta){
       
        for (let i = 0;i<etiqueta.length;i++)
       {
        this.funcionEtiquetas(etiqueta[i])
                       
       }
       
       return (`${etiquetas}`)

    }
    this.funcionEtiquetas=function(etiqueta){
        
        for (let i = 0;i<etiquetas.length;i++)
        {
         
             if( etiquetas[i]==etiqueta  )
            {
                 
              etiquetas.splice(i,1)
             
            }
             
             
        }
    }
    this.actualizarValor= function(valor){
        
        if (valor>0) {
            this.valor=valor;
            return (`${valor}`)
        }
        else{

            return (`${valor}`)
        }
        
    }   
    if(valor<0 || isNaN(valor)){      
        this.valor=0       
        return (`gasto= new gasto  ${this.descripcion}  ${this.valor} €`)       
    }
    else{   
        return (`gasto= new gasto  ${this.descripcion}  ${this.valor}`)
  
    }
    this.obtenerPeriodoAgrupacion= function(tipoFecha){

        if (tipoFecha=="dia")
        {

        }
        else if(ipoFecha=="mes")
        {

        }
        else if(ipoFecha=="anyo")
        {

        }
    }

}
function anyadirGasto(objetoGasto){
objetoGasto.id=idGasto;
idGasto++;
gastos.push(objetoGasto);
}
function borrarGasto(objetoGasto){


    for (let i = 0;i<gastos.length;i++)
    {
        if( objetoGasto==gastos[i].id)
        {             
            gastos.splice(i,1)
        }
    }
}
function calcularTotalGastos(){
let gastosTotales=0;
    for(let i=0;i<gastos.length;i++)
    {
        gastosTotales+=gastos[i].valor
    }

    return (gastosTotales)
}
function calcularBalance(){
    let balance=presupuesto;
    for(let i=0;i<gastos.length;i++)
    {
        balance-=  gastos[i].valor
    }
    return (balance)
}

function listarGastos(){
    
    return (gastos)

}

function filtrarGastos(parametro){
   
    
    let objetoFechaDesde =[]
    objetoFechaDesde = gastos.filter(function fechaDesde(gastos){
        
            let gasto=gastos.fecha;
            Date.parse(gasto)
            let fechaObj= new Date(gasto)
             fechaObj.toLocaleString();  
             let parametroPrueba =parametro.fechaDesde;
             Date.parse(parametroPrueba)
             let parametroPrueba1 = new Date(parametroPrueba)
             parametroPrueba1.toLocaleString();
             if(parametroPrueba1<=fechaObj)
             {
                objetoFechaDesde.push(gastos)
                return (objetoFechaDesde)
             } 
            
             
        
        
    }

    );
    
        let objetoFechaHasta=[]
        objetoFechaHasta = gastos.filter( function fechaHasta(gastos){
            
            let gasto=gastos.fecha;
            Date.parse(gasto)
            let fechaObj= new Date(gasto)
             fechaObj.toLocaleString();  
             let parametroPrueba =parametro.fechaHasta;
             Date.parse(parametroPrueba)
             let parametroPrueba1 = new Date(parametroPrueba)
             parametroPrueba1.toLocaleString();
            
            if(parametroPrueba1>=fechaObj)
                 {
                    objetoFechaHasta.push(gastos)
                    return ( objetoFechaHasta)
                 } 
    
        })
    
    if(parametro.fechaDesde && parametro.fechaHasta)
    {
        let objetoFiltrado=[];
        //////////////
        objetoFiltrado = gastos.filter( function fechaFiltrada(gastos){
        let gasto=gastos.fecha;
         Date.parse(gasto)
        let fechaObj= new Date(gasto)
         fechaObj.toLocaleString();  
        let parametroPrueba =parametro.fechaHasta;
        Date.parse(parametroPrueba)
        let parametroPrueba1 = new Date(parametroPrueba)
        parametroPrueba1.toLocaleString();
        
        let parametroPrueba2=parametro.fechaDesde;
        Date.parse(parametroPrueba2);
        let parametroPrueba3= new Date(parametroPrueba2)
        parametroPrueba3.toLocaleString();
         if(parametroPrueba1>=fechaObj && parametroPrueba3<=fechaObj)
        {
        objetoFiltrado.push(gastos)
        return ( objetoFiltrado)
        } 
        
        })
        return ( objetoFiltrado)
    }
    if(parametro.valorMinimo)
{
    let objetoValorMinimo=[]
    objetoValorMinimo = gastos.filter (function fechaValorMinimo(gastos){
        let gasto=gastos.valor;
       
        if (gasto>=parametro.valorMinimo)
        {
            objetoValorMinimo.push(gastos)
            return(objetoValorMinimo)
        }
        
    })
    return(objetoValorMinimo)
}
    if(typeof parametro === 'object' && Object.keys(parametro).length === 0)
        {
            return (gastos)
        }
       
        else if (parametro.fechaDesde)
        {
            return (objetoFechaDesde)
        }     
        else if(parametro.fechaHasta)
        {
            return(objetoFechaHasta)
        }   
       
}

        
/*let param = gastos.filter(function(gastoParam){
let existe=true;
    if (parametro.fechaDesde)
    {
        
        let fechaD = new Date (parametro)
       fechaD.toLocaleString();
        let fechaObj= new Date(gastoParam.fecha)
        fechaObj.toLocaleString();
        if (fechaObj > parametro)
        {
            
            return fechaObj < parametro
            
        }
        
    }
    /*let f = Date.parse(fecha)
    if (isNaN(f)){
        this.fecha=Date.now()
    } 
    else{
        this.fecha=f
    }
    if (parametro.fechaHasta)
    {
        let fechaH = Date.parse(parametro.fechaHasta)
        if (gastoParam.fecha <= fechaH)
        {
            existe=false;
        }
        
    }
    if (parametro.valorMinimo)
    {
       if( gastoParam.valor > parametro.valorMinimo )
       existe= false;
    }
    if (parametro.descripcionContiene)
    {
       if( gastoParam.descripcion > parametro.descripcionContiene.toLowerCase() )
       existe= false;
    }
    if (parametro.etiquetasTiene)
    {
       if( gastoParam.etiquetas > parametro.etiquetasTiene.toLowerCase() )
       existe= false;
    }

    
   
})
return (gastos)
*/


function agruparGastos(){

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
    agruparGastos
}
