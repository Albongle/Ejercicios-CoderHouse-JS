import { getDatosAjax} from "./ajax.js";
import { addAnuncio } from "./anuncio.js";
import { addRangoDePrecios, addFiltroDeNombres } from "./controles.js";
import { guardarEnStorage, leeDelStorage } from "./storage.js";
const productos = [];
const anuncios = document.getElementById("anuncios");
const cantidadEnCarrito = document.getElementById("cantidad-carrito");
const fotoCarrito = document.getElementById("foto-carrito");
const productosElegidos = leeDelStorage("productosElegidos") || [] ;
let productosFiltrados;
let filtrarPrecio;
let filtraMarca;

window.addEventListener("DOMContentLoaded",(event)=>{

  actualizarCarrito(productosElegidos);
  getDatosAjax("http://localhost:3000/Anuncios")
  .then((datos) => {

    productos.push(...datos); // pusheo los datos de la api al array

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

  document.addEventListener("click",handlerAddCarrito);



})


const handlerAddCarrito = (event)=>{
  
  
  let compra = false;
  let idProducto;


  if(event.target.matches("img") && event.target.classList.contains("anuncio__img")){
    idProducto = parseInt(event.target.parentNode.dataset.id) ;
    compra = true;
  }else if(event.target.matches("p") && event.target.parentNode.classList.contains("anuncio__detalle")){
    idPorudcto = parseInt(event.target.parentNode.parentNode.dataset.id);
    compra = true;  
  }


  if(compra){
    addProductosElegidos(idProducto);
  }
}

const addProductosElegidos=(idProducto)=>{

  if(!productosElegidos.find(element=> element.id === idProducto)){
    productosElegidos.push(productos.find(element=> element.id === idProducto));
  }
  actualizarCarrito(productosElegidos);
  guardarEnStorage(productosElegidos);
}


const actualizarCarrito = (productosElegidos)=>{
  if(productosElegidos.length>0){
    fotoCarrito.src="./img/carrito_lleno.ico";
    cantidadEnCarrito.textContent = productosElegidos.length;
  }
  else{
    fotoCarrito.src="./img/carrito_vacio.ico";
    cantidadEnCarrito.textContent = "X";
  }
  
}


const handlerFiltroPrecio = (event)=>{
  filtraMarca.forEach(opcion => opcion.checked = false);
  while (anuncios.hasChildNodes()) 
  {
    anuncios.removeChild(anuncios.firstChild);
  }

  const productosFiltrados = productos.filter(element => parseInt(element.precio) >= parseInt(event.target.value) );
  productosFiltrados.forEach(element=> anuncios.appendChild(addAnuncio(element)));

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
        productosFiltrados = productos.filter(element => element.marca.toLowerCase() === opcion.name.toLowerCase());
        flag = false;
      }
      else{
        productosFiltrados.push(...productos.filter(element => element.marca.toLowerCase() === opcion.name.toLowerCase()));
      }
    }
  });

  if(flag){
    productosFiltrados = productos;
  }
  productosFiltrados.forEach(element=> anuncios.appendChild(addAnuncio(element)));
  
};
