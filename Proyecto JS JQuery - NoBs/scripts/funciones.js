import { productos, carrito } from "./globales.js";
import { guardarEnStorage } from "./storage.js";

export const addAnuncio = (contenedor, elementos) => {
  contenedor.empty();
  elementos.forEach((element) => {
    $(contenedor).append(`
            <article class="anuncios__anuncio">
                <img src="${element.urlImg}" class="anuncio__img" alt="telefono"></img>
                <div class="anuncio__detalle">
                    <p class="">${element.marca} - ${element.nombre}</p>
                    <p class="detalle__precio">$${parseInt(element.precio).toLocaleString()}</p>
                    <p class="detalle__cuotas>Hasta ${element.cuotas} sin interés</p>
                    <p class="detalle__descripcion">${element.desc}</p>                    
                </div>
                <button id="btn-compra-${element.id}" value="${element.id}" type="button" class="anuncio__btn btn-comprar">Comprar</button>
            </article>
    `);
  });

  $(".btn-comprar").on("click", comprarProducto);
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

function comprarProducto() {
  let comprado = productos.find((element) => element.id === parseInt(this.value));
  addCarrito($("#carrito-productos"), comprado);
}

export const addCarrito = (contenedor, producto) => {
  if (!carrito.find((element) => element.id === producto.id)) {

    carrito.push(producto);
    guardarEnStorage("productos",carrito);
  }
  $("#carrito-cantidad").html(carrito.length);
  showCarrito(contenedor,carrito);
};



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
                                <button class="btn-quitar" id="btn-quitar-${producto.id}" value="${producto.id}"><i class="fa fa-trash" aria-hidden="true" class"btn-quitar"></i></button>
                                <img src="${producto.urlImg}" class="producto__img" alt="telefono-carrito">
                                <div class="producto__detalle">
                                  <p class="detalle__marca">${producto.marca}</p>
                                  <p class="detalle__precio">$${parseInt(producto.precio).toLocaleString()}</p>
                                </div>
                            </article>`);
    });
    $(".btn-quitar").on("click",removeCarrito);
  }  
};


function removeCarrito(){
  carrito.splice(carrito.findIndex(element=>element.id===parseInt(this.value)),1);
  guardarEnStorage("productos",carrito);
  $("#carrito-cantidad").html(carrito.length);
  showCarrito($("#carrito-productos"),carrito);
  if(carrito.length === 0){
    $("#container-carrito").attr("hidden", "true");
  }
  
};


export const createRangoDePrecios = (elementos,filtro)=>{
  let saltos = 1000;
  let max = Math.max(...(elementos.map(element => element[filtro])));
  let min = Math.min(...(elementos.map(element => element[filtro])));

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
    if(!acum.some(element=> element === actual.tipo)){
      acum.push(actual.tipo);
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