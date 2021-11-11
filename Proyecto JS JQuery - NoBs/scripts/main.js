import { CARRITO_PRODUCTOS, CONTAINER_ANUNCIOS, CONTAINER_CARRITO, productos, TIEMPO_RESPUESTA, TIEMPO_RESPUESTA_PORTADA} from "./globales.js";
import { getDatosAjax } from "./ajax.js";
import { addAnuncio,notAnuncio, createRangoDePrecios, addCarrito, createFiltroTipo} from "./funciones.js";
import { leeDelStorage } from "./storage.js";
let imgPortada=1;
window.addEventListener("load",function() {
  
});


$("document").ready( ()=> {
  getDatosAjax("http://localhost:3000/Anuncios")
    .then((datos) => {
      productos.push(...datos); // pusheo los datos de la api al array

      addAnuncio(CONTAINER_ANUNCIOS, productos);//agrego la vista de anuncios al DOM
      createRangoDePrecios(datos,"precio"); //creo el rango de precio en base a los datos obtenidos desde la api
      createFiltroTipo(datos); //creo el filtro de tipo en base a los datos obtenidos desde la api
      
      $("#rango-precio").on("change click",handlerFiltrarPrecio); //agrego manejador al filtro de precio
      $(".check-tipo").on("click",handlerFiltrarTipo);//agrego manejador al filtro de tipo
      $("#txt-buscar").on("change keyup paste",handlerBuscar);//agrego manejador al txt para poder buscar por nombre
      $("#oferta").fadeIn(TIEMPO_RESPUESTA_PORTADA,handlerOferta);
      let storage = leeDelStorage("productos"); //leo el storage
      if(storage){
        storage.forEach(element => {
          addCarrito(CARRITO_PRODUCTOS,element);//si tengo datos desde el storage los agrego al carrito
        });
      }

      $("#btn-cierra-carrito").on("click",handlerCierraCarrito);//agrego manejador al btn para cerrar la vista del carrito
      $("#btn-abre-carrito").on("click",handlerAbreCarrito);//agrego manejador a la foto del carrito para abrirlo
    })
    .catch((error) => {
      console.error(error);
    });
    
});

function handlerOferta() {

  imgPortada++;
  $("#oferta").fadeOut(TIEMPO_RESPUESTA_PORTADA,()=>{
    if(imgPortada>3){
      imgPortada = 1;
    }
    
    $("#oferta-img").attr("src", `./img/portada${imgPortada}.png`);

  });
  $("#oferta").fadeIn(TIEMPO_RESPUESTA_PORTADA,handlerOferta);
}

function handlerBuscar(event) {
    let expresion = `${this.value}`;
    CONTAINER_ANUNCIOS.fadeOut(TIEMPO_RESPUESTA,()=>{
      let filtro = productos.filter(element=>element.marca.toLowerCase().includes(expresion.toLowerCase()));
      if(filtro.length === 0){
        notAnuncio(CONTAINER_ANUNCIOS);
      }else{
        addAnuncio(CONTAINER_ANUNCIOS,filtro);
      } 
      CONTAINER_ANUNCIOS.fadeIn(TIEMPO_RESPUESTA);
    });
    

}

function handlerFiltrarPrecio(event) {

  CONTAINER_ANUNCIOS.fadeOut(TIEMPO_RESPUESTA,()=>{
    let filtro = productos.filter(element=>element.precio >= parseInt(this.value));
    addAnuncio(CONTAINER_ANUNCIOS,filtro); 
    CONTAINER_ANUNCIOS.fadeIn(TIEMPO_RESPUESTA);
  })
  
}

function handlerCierraCarrito(event) {

  CONTAINER_CARRITO.slideUp(TIEMPO_RESPUESTA);
}
function handlerAbreCarrito(event) {
  CONTAINER_CARRITO.fadeIn(TIEMPO_RESPUESTA);
  
}


function handlerFiltrarTipo(event) {
  let filtro =[];
  CONTAINER_ANUNCIOS.fadeOut(TIEMPO_RESPUESTA,()=> {
    for (const item of $(".check-tipo")) {
      if(item.checked){
        filtro.push(...productos.filter(element=> element.tipo === item.value));
      }
    }
    if(filtro.length === 0){
      addAnuncio(CONTAINER_ANUNCIOS,productos);
    }else{
      addAnuncio(CONTAINER_ANUNCIOS,filtro);
    }
    CONTAINER_ANUNCIOS.fadeIn(TIEMPO_RESPUESTA);
  });

    
}

