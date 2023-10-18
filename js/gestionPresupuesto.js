let presupuesto=0;

function actualizarPresupuesto(valor) {
    if(valor>=0){
        presupuesto=valor;
        return presupuesto;
    }
    else{
        window.alert("Error, numero introducido no valido");
        presupuesto=-1;
        return presupuesto
    }
}

function mostrarPresupuesto() {
   console.log(" Tu presupuesto actual es de " + presupuesto+" € ")
}

function CrearGasto(valor,descripcion) {
    if(valor>=0){
       let objeto={
        descripcion:descripcion || "",
        valor:valor,
        mostrarGasto:function(){
            mostrarPresupuesto();
        },
        actualizarDescripcion:function(descripcion){
            this.descripcion=descripcion;
        },
        actualizarValor:function(valor){
            this.valor=valor;
        }

       }
       return objeto;
    }
    else{
        let objeto={
            descripcion:descripcion || "",
            valor:0,
            mostrarGasto:function(){
                mostrarPresupuesto();
            },
            actualizarDescripcion:function(descripcion){
                this.descripcion=descripcion;
            },
            actualizarValor:function(valor){
                this.valor=valor;
            }
    
           }
           return objeto;

    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}






