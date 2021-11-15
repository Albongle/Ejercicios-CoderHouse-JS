import { productos, carrito } from "./globales.js";
import { guardarEnStorage, limpiarStorage } from "./storage.js";

export const addAnuncio = (contenedor, elementos) => {
  contenedor.empty();
  elementos.forEach((element) => {
    $(contenedor).append(`
            <article class="anuncios__anuncio">
                <img src="${element.Imagen}" class="anuncio__img" alt="telefono"></img>
                <div class="anuncio__detalle">
                    <p>${element.Marca} - ${element.Nombre}</p>
                    <p class="detalle__precio">$${element.Precio.toLocaleString()}</p>
                    <p class="detalle__cuotas">Hasta ${element.Cuotas} sin interés</p>
                    <p class="detalle__descripcion">${element.Descripcion}</p>                    
                </div>
                <button id="btn-compra-${element.Id}" value="${element.Id}" type="button" class="anuncio__btn btn-comprar">Comprar</button>
            </article>
    `);
  });

  $(".btn-comprar").on("click", handlerComprarProducto);
};

export const notAnuncio = (contenedor) => {
  contenedor.empty();
    $(contenedor).append(`
            <article class="anuncios__anuncio-not">
                <img src="./img/notfind.png" class="anuncio__img" alt="telefono"></img>
                <div class="anuncio__detalle">
                  <p class="detalle__descripcion">No se encontraron coincidencias!!!</p>                    
                </div>
            </article>
    `);
};

function handlerComprarProducto() {
  let comprado = productos.find((element) => element.Id === parseInt(this.value));
  addElementCarrito($("#carrito-productos"),comprado);
}

export const addElementCarrito = (contenedor, producto) => {

  if (!carrito.find((element) => element.Id === producto.Id)) {
    carrito.push(producto);

    guardarEnStorage("productos",carrito);
  }
  $("#carrito-cantidad").html(carrito.length);
  showCarrito(contenedor,carrito);
};

export const deleteCarrito=()=>{
  carrito.splice(0,carrito.length);
  renderizarCarrito();
  limpiarStorage("productos");
}


export const showCarrito = (contenedor,productos)=>{
  contenedor.empty();
  if(productos.length===0){
    $(contenedor).append(`<article class="productos__producto">                         
                              <div class="producto__detalle">
                                <p class="detalle__marca">El Carrito esta vacio</p>
                              </div>
                          </article>`);
  }
  else{
    productos.forEach(producto=>{
      $(contenedor).append(`<article class="productos__producto">
                                <button class="btn-quitar" id="btn-quitar-${producto.Id}" value="${producto.Id}"><i class="fa fa-trash" aria-hidden="true" class"btn-quitar"></i></button>
                                <img src="${producto.Imagen}" class="producto__img" alt="telefono-carrito">
                                <div class="producto__detalle">
                                  <p class="detalle__marca">${producto.Marca}</p>
                                  <p class="detalle__precio">$${parseInt(producto.Precio).toLocaleString()}</p>
                                </div>
                            </article>`);
    });
    $(".btn-quitar").on("click",handlerRemoveElementCarrito);
  }  
};


function handlerRemoveElementCarrito(){
  carrito.splice(carrito.findIndex(element=>element.Id===parseInt(this.value)),1);
  guardarEnStorage("productos",carrito);
  renderizarCarrito();
};

function renderizarCarrito(){
  $("#carrito-cantidad").html(carrito.length);
  showCarrito($("#carrito-productos"),carrito);
  if(carrito.length === 0){
    $("#container-carrito").attr("hidden", "true");
  }
}


export const createRangoDePrecios = (elementos)=>{
  let saltos = 1000;
  let max = Math.max(...(elementos.map(element => element.Precio)));
  let min = Math.min(...(elementos.map(element => element.Precio)));

  $("#controles").append(`<div class="controles__rango">
                          <h2 class="rango__titulo">Precio</h2>
                          <div class="rango__container">
                            <label>$${parseInt(min).toLocaleString()}</label>
                            <input id="rango-precio" type="range" min="${min}" max="${max}" step="${saltos}" value="${min}">
                            <label for="rango-precio">$${parseInt(max).toLocaleString()}</label>
                          </div>
                        </div>`);
};

export const createFiltroTipo = (elementos)=>{

  let tipos = elementos.reduce((acum,actual)=>{
    if(!acum.some(element=> element === actual.Tipo)){
      acum.push(actual.Tipo);
    }
    return acum;
  },[]);

  $("#controles").append(`<div class="controles__tipo">
                            <h2 class="tipo__titulo">Tipo</h2>
                            <div class="tipo__container" id="checkbox-tipos">

                            </div>
                        </div>`);

  tipos.forEach((element,index)=>{
    $("#checkbox-tipos").append(`<div class="container__item"><label for="${element}-${index}">${element.toUpperCase()}</label><input type="checkbox" id="${element}-${index}" class="check-tipo" value="${element}"></div>`)
  })

  
};