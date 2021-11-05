import {productos,carrito} from "./globales.js";
import { getDatosAjax } from "./ajax.js";
import { addAnuncio } from "./funciones.js";




$("document").ready( ()=> {
  getDatosAjax("http://localhost:3000/Anuncios")
    .then((datos) => {
      productos.push(...datos); // pusheo los datos de la api al array
      addAnuncio($("#anuncios"), productos);
    })
    .catch((error) => {
      console.error(error);
    });
});

