/**
Alumno: Alejandro Bongioanni
Clase 03
>> Consigna: Tomando como base los ejemplos anteriores de la estructura for y while, crear un algoritmo que repita un bloque de instrucciones. En cada repetición es necesario efectuar una operación o comparación para obtener una salida por alerta o consola.
>>Aspectos a incluir en el entregable:
Archivo HTML y Archivo JS, referenciado en el HTML por etiqueta <script src="js/miarchivo.js"></script>, que incluya la definición de un algoritmo en JavaScript que emplee bucles e instrucciones condicionales.

*/

let nombre;
let apellido;
let contUsuarios=0;
let edad;
let acumEdad=0;
let promEdades;
let mensaje;
let numeroAzar;
let contDivisibles=0;
let flag;

do {
    contUsuarios++;

    nombre = prompt(`Ingrese el nombre del usuario numero ${contUsuarios}`);
    while(!nombre || !isNaN(nombre)){
        nombre = prompt(`Error!!!. Ingrese el nombre del usuario numero ${contUsuarios}`);
    }

    apellido = prompt(`Ingrese el apellido del usuario numero ${contUsuarios}`);
    while(!apellido || !isNaN(apellido)){
        apellido = prompt(`Error!!!. Ingrese el apellido del usuario numero ${contUsuarios}`);
    }

    do {
        edad = parseInt(prompt(`Ingrese la edad del usuario numero ${contUsuarios}`));
    } while (edad < 0 || edad > 100 || isNaN(edad));

    acumEdad+=edad;
    
} while (confirm("Desea seguir ingresando datos?"));


if(contUsuarios>0){
    promEdades = acumEdad/contUsuarios;
    mensaje = `El promedio de edades es: ${promEdades}`;
}else{
    mensaje = "No se ingresaron usuarios";
}

alert(mensaje);

mensaje = "";


do{
    numeroAzar = parseInt(prompt(`Ingrese un numero mayor igual a 2, para determinar los numeros primos`));
}while(numeroAzar<2 || isNaN(numeroAzar));


for (let i = 2; i <= numeroAzar; i++) {
    flag = true;
    contDivisibles = 0; 
    for (let j = 1; j <=numeroAzar; j++) {
        if((i%j)==0){
            contDivisibles++;
            if(contDivisibles>2){
                flag = false;
                break;
            }
        }
    }

    if(flag){
        mensaje += `${i}\n`;
    }
       
}

alert(`Los numeros primos hasta el rango seleccionado son\n${mensaje}`);

