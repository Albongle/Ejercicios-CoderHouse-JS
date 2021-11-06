import {productos} from "./globales.js";
import { getDatosAjax } from "./ajax.js";
import { addAnuncio} from "./funciones.js";




$("document").ready( ()=> {
  getDatosAjax("http://localhost:3000/Anuncios")
    .then((datos) => {
      productos.push(...datos); // pusheo los datos de la api al array
      addAnuncio($("#anuncios"), productos);
    })
    .catch((error) => {
      console.error(error);
    });
    $("#txt-buscar").change(handlerBuscar);
    $("#txt-buscar").keyup(handlerBuscar);
});


function handlerBuscar(event) {
    let expresion = `${this.value}`;
    let filtro = productos.filter(element=>element.marca.toLowerCase().includes(expresion.toLowerCase()));
    addAnuncio($("#anuncios"),filtro);    
}

