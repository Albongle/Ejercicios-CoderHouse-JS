import mySpinner from "./spinner.js";
import Persona from "./persona.js"
import {handlerLoadTable} from "./tabla.js"




const btnGuardar = document.getElementById("btnGuardar");
const btnCierreFrm = document.getElementById("btnCierreFrm");
const btnAbrirFrm = document.getElementById("btnAbrirFrm");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const dni = document.getElementById("dni");
const tabla = document.getElementById("contenedor-tabla");
const formulario = document.getElementById("formulario");
const cajasText = document.querySelectorAll(".controles__texto");
const spinner = document.getElementById("spinner");
const personas = [];
let idSeleccionado;

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", handlerClickDOM);
  btnGuardar.addEventListener("click", handlerGuardar);
  btnCierreFrm.addEventListener("click", handlerCerrarFrm);
  btnAbrirFrm.addEventListener("click", handlerAbrirFrm);

  cajasText.forEach((element) => {
    element.addEventListener("change", handlerInput);
  });
});

/**
 * Manejandro que controla el estado de los input y cambia el color
 * @param {} event 
 */
function handlerInput(event) {
  if (
    event.target.matches("input") &&
    (event.target.type == "text" || event.target.type == "number")
  ) {
    if (event.target.value == "") {
      establecerBorde(event.target, "controles__texto incompleto");
    } else {
      establecerBorde(event.target, "controles__texto completo");
    }
  }
}

/**
 * Manejado que oculta el Frm
 * @param {*} event 
 */
function handlerCerrarFrm(event) {
  formulario.setAttribute("hidden", "true");
  limpiarFormulario();
}

/**
 * Manejandro que expone el Frm
 * @param {} event 
 */
function handlerAbrirFrm(event) {
  formulario.removeAttribute("hidden");
}


/**
 * metodo que limpia el Frm
 */
function limpiarFormulario() {
  formulario.nombre.value = "";
  formulario.apellido.value = "";
  formulario.dni.value = "";
  cajasText.forEach((element) => {
    establecerBorde(element, "controles__texto incompleto");
  });
}

function establecerBorde(element, clase) {
  element.setAttribute("class", clase);
}

/**
 * Manejador usado para eliminar registro al hacer click en imagen
 * @param {} event evento que ejecuta el metodo 
 */
function handlerClickDOM(event) {
  if (event.target.matches("img")) {
    idSeleccionado = event.target.parentNode.parentNode.dataset.id;
    console.log(idSeleccionado);
    let personaAux = personas.find(element=> element.id == parseInt(idSeleccionado));
     if(confirm("Desea eliminar a " + personaAux.mostrarDatos()))
     {
        personas = personas.filter(
            (element) => element.id != parseInt(idSeleccionado)
          );
          mySpinner.setSpinner(spinner);
      
          setTimeout(() => {
            mySpinner.removeSpinner(spinner,document.getElementById("img-spinner"));
            handlerLoadTable(event, personas, tabla);
          }, 3000);
        }

     }     
}



/**
 * Manejador que guarda un registro en el array y renderiza la tabla
 * @param {} event  evento que ejecuta el metodo
 */
function handlerGuardar(event) {
  if (dni.value != "" && nombre.value != "" && apellido.value != "") {
    let personaAux = personas.find(element=> element.id == parseInt(dni.value));
    if(personaAux){
      alert("El DNI de la persona ya existe");
      limpiarFormulario();
    }
    else{
      let persona = new Persona(dni.value,nombre.value,apellido.value,dni.value);
      handlerCerrarFrm(event);
      personas.push(persona);
      mySpinner.setSpinner(spinner);
      setTimeout(() => {
        mySpinner.removeSpinner(spinner,document.getElementById("img-spinner"));


        //Ordeno el Array por DNI de mayor a menor
        personas.sort((elementA,elementB)=> elementB.dni - elementA.dni);

        handlerLoadTable(event, personas, tabla);
      }, 3000);
    }


  } else {
    alert("Campos Incompletos");
  }
}




