/**
Alumno: Alejandro Bongioanni
Clase 02
>> Consigna: Crea un algoritmo que solicite al usuario uno o más valores ingresados por prompt(), compare las entradas y, en función de ciertas condiciones, muestre por consola o alert() el resultado según los valores ingresados y las condiciones cumplidas.
>>Aspectos a incluir en el entregable:
Archivo HTML y Archivo JS, referenciado en el HTML por etiqueta <script src="js/miarchivo.js"></script>, que incluya la definición de un algoritmo en JavaScript que emplee instrucciones condicionales.
>>Ejemplo:
Pedir número mediante prompt y si es mayor a 1000 mostrar un alert.
Pedir un texto mediante prompt, y si es igual a "Hola" mostrar un alerta por consola.
Pedir un número por prompt y evaluar si está entre 10 y 50. En caso positivo mostrar un alert.

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
if (dia < 0 || dia > 31 || isNaN(dia)) {
  alert("Error, valores no permitidos para dia, se asignara el 01 por defecto");
  dia = 1;
  console.log(`Se asigno ${dia} a dia`);
}

mes = parseInt(prompt("Ingrese el mes de su nacimiento"));

if (mes < 1 || dia > 12 || isNaN(mes)) {
  alert("Error, valores no permitidos para mes, se asignara el 01 por defecto");
  mes = 1;
  console.log(`Se asigno ${mes} a mes`);
}

anio = parseInt(prompt("Ingrese el año de su nacimiento"));

if (isNaN(anio)) {
    alert(
        "Error, valor no permitido para año, se asignara por defecto 1900"
      );
    anio = 1900;

} else if (anio < 1900) {
  alert(
    "Error, es demasiado viejo para estar vivo, se asignara por defecto 1900"
  );
  anio = 1900;
} else if (anio > 2022) {
  alert("Error, usted ve el futuro, se asignara por defecto 1900");
  anio = 1900;
  //repito codigo solo a fines de demostrar el conocimiento en la sentencia
}

fecha = new Date(anio, mes, dia);
hoy = new Date(Date.now());

edad = hoy.getFullYear() - fecha.getFullYear();

if(edad === 121){
    console.log("Increible que este usando una computadora");
}

console.log(edad);
alert(`Bienvenido ${nombre.toUpperCase() + ", " + apellido.toUpperCase()}\nUsted tiene ${edad} años`);
