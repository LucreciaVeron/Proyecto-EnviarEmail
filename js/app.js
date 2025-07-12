document.addEventListener('DOMContentLoaded', function(){
    //seleccionar los elementos de la interfaz
    const email = {
        email: '',
        asunto: '',
        mensaje: '',
        CC: ''                      //extra
    }

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type = "submit"]');
    const btnReset = document.querySelector('#formulario button[type = "reset"]');
    const spinner = document.querySelector('#spinner');


    //agregar evenListener
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function (e){
        e.preventDefault();

        //reiniciar el objeto
        resetFormulario();
    })

    
    function enviarEmail(e){
        //cuando se preciona enviar el spinner aparece
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');


   

        //el spinner desaparece despues de 3 segundos
        setTimeout(() =>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            //reiniciar el objeto una vez que se envio
            resetFormulario();

            //Alerta
            const alertaExito = document.createElement('P');
            alertaExito.textContent = 'El email se envio exitosamente.';
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            formulario.appendChild(alertaExito);

            setTimeout(()=>{
                alertaExito.remove();
            },3000)

        }, 3000)
    }


    function validar(e){ 
        //------------------------------------------EXTRA--------------------------------------------------------
        //Validamos el input para CC primero
            if(e.target.id === 'inputCC'){

            //El campo CC es opcional: si está vacío, no se valida
                if (e.target.value ===''){

                    //limpia la alerta si es que hay una porque ya se borro el contenido
                    limpiarAlerta(e.target.parentElement);
                    email[e.target.name] = '';
                    comprobarEmail();
                    return;
                }

                //si se va a escribir un mail en CC envia una alerta si esta mal escrito
                if (!validarEmail(e.target.value)){
                    mostrarAlerta('Email invalido.', e.target.parentElement);
                    email[e.target.name] = 'invalido';
                    comprobarEmail();
                    return;
                }
        }
        //------------------------------------------------------------------------------------------------------------


        //Si esta vacio envia una alerta 
        if(e.target.value.trim() ===''){
             mostrarAlerta(`Por favor, complete el campo ${e.target.id}.`, e.target.parentElement);
             email[e.target.name] = '';
             comprobarEmail();
             return;
        }

        //Validamos que el email este bien escrito sino manda una alerta
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('Email invalido.', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }


        //Si los campos no estan vacios se limpian las alertas si es que las hay
        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //Comprobar objeto Email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){
        //Comprobamos si la alerta ya existe
        limpiarAlerta(referencia);

        //Generar html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //Inyectar error debajo de los inputs
        referencia.appendChild(error);
    }


    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return(regex.test(email));
    }


    function comprobarEmail(){
        //--------PARA EL EXTRA EXCLUIMOS EL CC-------------------------------
        const camposObligatorios = { ...email};
        delete camposObligatorios.CC;

        //-----------------------primero comprobamos si CC es invalido para que no se envie----------------------
        if(email.CC === 'invalido'){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        //-----------------------------------------------------------------------------

        //Comprobamos que no esten vacios el resto de los campos obligatorios
        if(Object.values(camposObligatorios).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario(){
        email.email= '';
        email.asunto= '';
        email.mensaje= '';
        email.CC= '';

        //reiniciar el objeto
        formulario.reset();
        comprobarEmail();
    }


    //--------------------------------------------------EXTRA AÑADIR CC-------------------------------------
    //CREAMOS EL HTML
    if (!document.querySelector('#inputCC')) {

        //creamos el div que contiene a CC
        const contenedorCC = document.createElement('div');
        contenedorCC.classList.add('flex', 'flex-col', 'space-y-2');

        //creamos el label de CC
        const labelCC = document.createElement('label');
        labelCC.textContent = 'CC:';
        labelCC.name= 'labelCC';
        labelCC.id='labelCC';
        labelCC.setAttribute('for', 'inputCC');
        labelCC.classList.add('font-regular', 'font-medium');

        //creamos el input del CC
        const inputCC = document.createElement('input');
        inputCC.type='email';
        inputCC.placeholder = "Email CC, ej: mkt@empresa.com";
        inputCC.id='inputCC';
        inputCC.name= 'CC';
        inputCC.classList.add('border', 'border-gray-300', 'px-3', 'py-2', 'rounded-lg');

        //añadimos el label y el input en el div
        contenedorCC.appendChild(labelCC);
        contenedorCC.appendChild(inputCC);

        //vamos a insertar el div de CC debajo del div de email y encima del asunto
        const divAsunto = inputAsunto.parentElement;
        divAsunto.parentElement.insertBefore(contenedorCC, divAsunto);

        //validamos que se este insertando el mail correctamente en el input
        inputCC.addEventListener('blur', validar);
    }

});