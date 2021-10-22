import { getDatosAjax} from "./ajax.js";
import { creaAnuncio } from "./anuncio.js";
import { addRangoDePrecios, addFiltroDeNombres } from "./controles.js";
const productos = [];
let productosAux;
let filtrarPrecio;
const filtraMarca = document.querySelectorAll("#select-marca");
const anuncios = document.getElementById("anuncios");


window.addEventListener("DOMContentLoaded",(event)=>{


  getDatosAjax("http://localhost:3000/Anuncios")
  .then((datos) => {

    productos.push(...datos); // pusheo los datos de la api al array
    productosAux = datos;

    addRangoDePrecios(datos,"precio");
    filtrarPrecio = document.getElementById("rango-precio");
    filtrarPrecio.addEventListener("change",handlerFiltroPrecio);
    filtraMarca.forEach(element=> element.addEventListener("click", handlerFiltromarca));
    productos.forEach(element=> anuncios.appendChild(creaAnuncio(element)));

  })
  .catch((error) => {
    console.error(error);
  });



})


const handlerFiltroPrecio = (event)=>{
  filtraMarca.forEach(opcion => opcion.checked = false);
  while (anuncios.hasChildNodes()) 
  {
    anuncios.removeChild(anuncios.firstChild);
  }
  

  productosAux = productos.filter(element => parseInt(element.precio) >= parseInt(event.target.value) );
  productosAux.forEach(element=> anuncios.appendChild(creaAnuncio(element)));

};

const handlerFiltromarca = (event)=>{
  filtrarPrecio.value= filtrarPrecio.min;
  let flag = true;
  while (anuncios.hasChildNodes()) 
  {
    anuncios.removeChild(anuncios.firstChild);
  }
  filtraMarca.forEach(opcion =>{
    if(opcion.checked){
      if(flag){
        productosAux = productos.filter(element => element.marca.toLowerCase() === opcion.name.toLowerCase());
        flag = false;
      }
      else{
        productosAux.push(...productos.filter(element => element.marca.toLowerCase() === opcion.name.toLowerCase()));
      }
    }
  });

  if(flag){
    productosAux = productos;
  }
  productosAux.forEach(element=> anuncios.appendChild(creaAnuncio(element)));
  
};
