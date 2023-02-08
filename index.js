document.addEventListener("DOMContentLoaded", function(){

    const email = {
        email:"",
        asunto:"",
        mensaje:""
    }

    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const btnSubmit = document.querySelector('#form button[type = "submit"]');
    const btnReset = document.querySelector('#form button[type = "reset"]');
    const formulario = document.querySelector("#form");
    const spinner = document.querySelector("#spinner");
    const inputCC = document.querySelector("#cc");

    //Asignar eventos
    inputEmail.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);
    inputCC.addEventListener("input", validar);

    formulario.addEventListener("submit", enviarEmail)


    btnReset.addEventListener("click", function(e){
        e.preventDefault();
        resetFormulario();
    })


    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.remove("spin");

       setTimeout(() => {
            spinner.classList.add("spin");

        //Reiniciar el object
        email.email = "";
        email.asunto = "";
        email.mensaje = "";

        formulario.reset();
        comprobarEmail();

        //Crear una alerta
        const alertaExito = document.createElement("P");
        alertaExito.textContent = "Mensaje enviado correctamente";
        alertaExito.classList.add("msj-enviado");

        formulario.appendChild(alertaExito);

        setTimeout(() => {
            alertaExito.remove();
             
        }, 3500);
        
       }, 3500);

        
    }

    function validar(e){
        if(e.target.value.trim() === "" && e.target.id !== "cc"){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        } 

        if( e.target.id === "email" && !validarEmail (e.target.value) ){
            mostrarAlerta("El email es incorrecto", e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }

        if(e.target.id === "cc" && !validarEmail(e.target.value)){
            mostrarAlerta("El email es incorrecto", e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }

        

        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //Comprobar el object de email
        comprobarEmail();
    }


    //Mostrar alerta roja
    function mostrarAlerta(mensaje,referencia){
        //Comprobar si ya existe una alerta y la elimina
        limpiarAlerta(referencia);

      //Generar alerta en el HTML

      const error = document.createElement("P");
      error.textContent = mensaje;
      error.classList.add("alerta-roja");
      

      //Inyectar la alerta al formulario
      referencia.appendChild(error)
    }


    function limpiarAlerta(referencia){
        //Comprobar si ya existe una alerta y la elimina
        const alerta = referencia.querySelector(".alerta-roja");
        if(alerta){
            alerta.remove();
        }
    }


    //validar email con regex
    function validarEmail(email){
        const regex = /^\w+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2,3})?$/;
        const resultado = regex.test(email); //.test retorna true o false
        return resultado;
    }


    function comprobarEmail(){
       
        if(Object.values(email).includes("")){
            btnSubmit.disabled = true;
            btnSubmit.classList.add("opacity")
        } else{
            btnSubmit.disabled = false;
            btnSubmit.classList.remove("opacity")
        }
    }


    function resetFormulario(){
        //Reiniciar el object
        email.email = "";
        email.asunto = "";
        email.mensaje = "";

        limpiarAlerta(inputEmail.parentElement);
        limpiarAlerta(inputAsunto.parentElement);
        limpiarAlerta(inputMensaje.parentElement);
        limpiarAlerta(inputCC.parentElement);

        formulario.reset();
        comprobarEmail();
    }

    
})

