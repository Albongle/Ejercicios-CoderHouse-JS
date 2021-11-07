import { productos } from "./globales.js";
import { getDatosAjax } from "./ajax.js";
import { addAnuncio, createRangoDePrecios} from "./funciones.js";




$("document").ready( ()=> {
  getDatosAjax("http://localhost:3000/Anuncios")
    .then((datos) => {
      productos.push(...datos); // pusheo los datos de la api al array
      addAnuncio($("#anuncios"), productos);
      createRangoDePrecios(datos,"precio");
      $("#rango-precio").on("change click",handlerFiltrarPrecio);
    })
    .catch((error) => {
      console.error(error);
    });
    $("#txt-buscar").on("change keyup paste",handlerBuscar);
});


function handlerBuscar(event) {
    let expresion = `${this.value}`;
    let filtro = productos.filter(element=>element.marca.toLowerCase().includes(expresion.toLowerCase()));
    addAnuncio($("#anuncios"),filtro);   
}

function handlerFiltrarPrecio(event) {
  let filtro = productos.filter(element=>element.precio >= parseInt(this.value));
  addAnuncio($("#anuncios"),filtro);   
}

