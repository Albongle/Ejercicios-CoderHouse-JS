import "./node_modules/jquery/dist/jquery.min.js";

let saludo = "Hola Mundo";

$(".contenedor").append(`<h1>${saludo}</h1>`);
$(".contenedor").prepend(`<h2>${saludo}</h2>`);
$(".contenedor").append(`<h1>${saludo}</h1>`);