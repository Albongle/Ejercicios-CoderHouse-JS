import { carrito, CARRITO_PRODUCTOS, CONTAINER_ANUNCIOS, CONTAINER_CARRITO, productos, TIEMPO_RESPUESTA, TIEMPO_RESPUESTA_PORTADA} from "./globales.js";
import { addAnuncio,notAnuncio, createRangoDePrecios, addElementCarrito, createFiltroTipo, deleteCarrito} from "./funciones.js";
import { leeDelStorage } from "./storage.js";
import { Producto } from "./modules/producto.js";
//import { getDatosAjax } from "./ajax.js";

let imgPortada=1;


$("document").ready(()=> {
    
    //getDatosAjax("http://localhost:3000/Anuncios")
    $.get("http://localhost:3000/anuncios") // uso el metodo get de JQuery
    .done((datos) => {

      datos.forEach(p=>{
        productos.push(new Producto(p.id,p.urlImg,p.desc,p.nombre,p.marca,p.gama,p.tipo,p.precio,p.cuotas)); // pusheo los datos de la api al array
      });
      addAnuncio(CONTAINER_ANUNCIOS, productos);//agrego la vista de anuncios al DOM
      createRangoDePrecios(productos); //creo el rango de precio en base a los datos obtenidos desde la api
      createFiltroTipo(productos); //creo el filtro de tipo en base a los datos obtenidos desde la api
  
      $("#rango-precio").on("change click",handlerFiltrarPrecio); //agrego manejador al filtro de precio
      $(".check-tipo").on("click",handlerFiltrarTipo);//agrego manejador al filtro de tipo
      $("#txt-buscar").on("change keyup paste",handlerBuscar);//agrego manejador al txt para poder buscar por nombre
      $("#oferta").fadeIn(TIEMPO_RESPUESTA_PORTADA,handlerOferta);
      let storage = leeDelStorage("productos"); //leo el storage
      if(storage){
        storage.forEach(p=> {
          addElementCarrito(CARRITO_PRODUCTOS,new Producto(p.id,p.urlImg,p.desc,p.nombre,p.marca,p.gama,p.tipo,p.precio,p.cuotas));//si tengo datos desde el storage los agrego al carrito
        });


      }

      $("#btn-cierra-carrito").on("click",handlerCierraCarrito);//agrego manejador al btn para cerrar la vista del carrito
      $("#btn-abre-carrito").on("click",handlerAbreCarrito);//agrego manejador a la foto del carrito para abrirlo
      $("#btn-enviar-carrito").on("click", handlerEnviarCarrito);//agrego manejador al boton del carrito para hacerl el envio a la BD
      $("#btn-cierra-dailogo").on("click",handlerCerrarDialogo);//agrego manejador al boton parar cerrar el dialogo
    })
    .fail((error) => {
      console.error(error);
    });
    
});

function handlerEnviarCarrito(){


if(carrito.length>0){
  if(confirm("Desea procesar la compra?")){
    $.post("http://localhost:3000/enviarCarrito", {carrito:JSON.stringify(carrito)})
    .done((datos)=>{
      if(datos.type == "ok"){
        $("#dialogo").attr("open","true");
        deleteCarrito();
      }
      else{
        throw Error ("No se pudo procesar la compra");
      }
    })
    .fail((error)=>{
      console.error(error);
    })
  }
}
}


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
      let filtro = productos.filter(element=>element.Marca.toLowerCase().includes(expresion.toLowerCase()));
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
    let filtro = productos.filter(element=>element.Precio >= parseInt(this.value));
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
        filtro.push(...productos.filter(element=> element.Tipo === item.value));
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

function handlerCerrarDialogo(){
  $("#dialogo").removeAttr("open");
}

