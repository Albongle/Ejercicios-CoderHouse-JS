import { carrito, productos } from "./globales.js";
import { getDatosAjax } from "./ajax.js";
import { addAnuncio, createRangoDePrecios, addCarrito} from "./funciones.js";
import { leeDelStorage } from "./storage.js";




$("document").ready( ()=> {
  getDatosAjax("http://localhost:3000/Anuncios")
    .then((datos) => {
      productos.push(...datos); // pusheo los datos de la api al array
      addAnuncio($("#anuncios"), productos);
      createRangoDePrecios(datos,"precio");
      $("#rango-precio").on("change click",handlerFiltrarPrecio);
      let storage = leeDelStorage("productos");
      if(storage){
        storage.forEach(element => {
          addCarrito($("#carrito-productos"),element);
        });
      }
      $("#btn-cierra-carrito").on("click",handlerCierraCarrito);
      $("#btn-abre-carrito").on("click",handlerAbreCarrito);
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

function handlerCierraCarrito(event) {
  event.target.parentNode.parentNode.setAttribute("hidden","true");
}
function handlerAbreCarrito(event) {

  $("#container-carrito").removeAttr("hidden");
}

