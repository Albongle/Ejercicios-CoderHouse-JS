$("document").ready(()=> {

    //Agregemos <h3> con jQuery ocultos con  style="display: none;"
    $("body").prepend('<h3  style="display: none" >¡Hola Coder1!</h3>');
    $("body").prepend('<h3  style="display: none" >¡Hola Coder2!</h3>');
    //Mostramos con show() todos los <h3>

    $("h3").show();
    $("h3").hide();  
    $("h3").fadeIn(); 

    
});