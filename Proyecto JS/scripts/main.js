import { getDatosAjax} from "./ajax.js";
import { addAnuncio } from "./anuncio.js";
import { addRangoDePrecios, addFiltroDeNombres } from "./controles.js";
const productos = [];
let productosAux;
let filtrarPrecio;
let filtraMarca;
const anuncios = document.getElementById("anuncios");


window.addEventListener("DOMContentLoaded",(event)=>{


  getDatosAjax("http://localhost:3000/Anuncios")
  .then((datos) => {

    productos.push(...datos); // pusheo los datos de la api al array
    productosAux = datos;

    addRangoDePrecios(datos,"precio");
    addFiltroDeNombres(datos);
    filtrarPrecio = document.getElementById("rango-precio");
    filtrarPrecio.addEventListener("change",handlerFiltroPrecio);
    filtraMarca = document.querySelectorAll(".select-marca");
    filtraMarca.forEach(element=> element.addEventListener("click", handlerFiltromarca));
    productos.forEach(element=> anuncios.appendChild(addAnuncio(element)));

  })
  .catch((error) => {
    console.error(error);
  });

  document.addEventListener("click",handlerClick);



})


const handlerClick = (event)=>{

  if(event.target.matches("img")){
    console.log(event.target.parentNode.dataset.id);
  }else if(event.target.matches("p")){
    console.log(event.target.parentNode.parentNode.dataset.id);
  }
}


const handlerFiltroPrecio = (event)=>{
  filtraMarca.forEach(opcion => opcion.checked = false);
  while (anuncios.hasChildNodes()) 
  {
    anuncios.removeChild(anuncios.firstChild);
  }
  

  productosAux = productos.filter(element => parseInt(element.precio) >= parseInt(event.target.value) );
  productosAux.forEach(element=> anuncios.appendChild(addAnuncio(element)));

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
  productosAux.forEach(element=> anuncios.appendChild(addAnuncio(element)));
  
};
