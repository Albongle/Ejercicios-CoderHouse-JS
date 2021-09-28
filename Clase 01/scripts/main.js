/**
 * Alumnos: Alejandro Bongioanni
 * Clase 01
 * >> Consigna: Crea un script en JS que le solicite al usuario ingresar uno o más datos. Luego, con JavaScript, realiza operaciones matemáticas o de concatenación sobre las * entradas teniendo en cuenta el tipo de dato. Al finalizar mostrar el resultados con alert() o console.log()
 * >>Aspectos a incluir en el entregable:
 * Archivo HTML con código JavaScript entre etiquetas <script></script>, que incluya la definición de un algoritmo.
 */
let nombre;
let apellido;
let edad;
let dia;
let mes;
let anio;
let fecha;
let hoy;
nombre = prompt("Ingrese su nombre:");
apellido = prompt("Ingrese su apellido");
dia = parseInt(prompt("Ingrese el dia de su nacimiento"));
mes = parseInt(prompt("Ingrese el mes de su nacimiento"));
anio = parseInt(prompt("Ingrese el año de su nacimiento"));

fecha = new Date(anio,mes,dia);
hoy = new Date(Date.now());

edad = (hoy.getFullYear() - fecha.getFullYear());

console.log(edad);
alert(`Bienvenido ${nombre + ", " + apellido}\nUsted tiene ${edad} años`);
