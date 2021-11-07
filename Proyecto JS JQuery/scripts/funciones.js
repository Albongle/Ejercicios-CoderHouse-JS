import { productos, carrito } from "./globales.js";
import { guardarEnStorage } from "./storage.js";

export const addAnuncio = (contenedor, elementos) => {
  contenedor.empty();
  elementos.forEach((element) => {
    $(contenedor).append(`
        <div class="col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-3 m-2">
            <div class="card shadow anuncio p-3 mb-5 bg-body rounded">
                <img src="${element.urlImg}" class="card-img-top" alt="telefono"></img>
                <div class="card-body">
                    <p class="card-title fs-5">${element.marca} - ${element.nombre}</p>
                    <p class="card-text text-success fs-4">$${parseInt(element.precio).toLocaleString()}</p>
                    <p class="card-text"><span class="badge rounded-pill bg-info text-dark">Hasta ${element.cuotas} sin interés</span></p>
                    <p class="card-text">${element.desc}</p>                    
                </div>
                <button id="btn-compra-${element.id}" value="${element.id}" type="button" class="btn btn-outline-primary btn-comprar">Comprar</button>
            </div>
        </div>
    `);
  });

  $(".btn-comprar").on("click", comprarProducto);
};

function comprarProducto() {
  let comprado = productos.find((element) => element.id === parseInt(this.value));
  addCarrito($("#carrito-productos"), comprado);
}

export const addCarrito = (contenedor, producto) => {
  if (!carrito.find((element) => element.id === producto.id)) {
    // alert(`Usted agrego al carrito ${producto.marca}-${producto.nombre}`);
    carrito.push(producto);
    guardarEnStorage("productos",carrito);
  }
  $("#carrito-cantidad").html(carrito.length);
  showCarrito(contenedor,carrito);
};



export const showCarrito = (contenedor,productos)=>{
  contenedor.empty();
  productos.forEach(producto=>{
    $(contenedor).append(`<div class="col-xxl-4 col-xl-6 col-md-12 mt-2">
                            <div class="card p-1">
                              <button id="btn-quitar-${producto.id}" value="${producto.id}" type="button"  class="col-4 btn btn-close btn-outline-danger btn-quitar align-self-center"></button>
                              <img src="${producto.urlImg}" class="card-img-top" alt="telefono-carrito">
                              <p class="card-text text-primary text-center">${producto.marca}</p>
                              <div class="card-footer">
                                <p class="card-text text-success fs-6 text-center">$${parseInt(producto.precio).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>`);
  });
  $(".btn-quitar").on("click",removeCarrito);
};


function removeCarrito(){
  carrito.splice(carrito.findIndex(element=>element.id===parseInt(this.value)),1);
  guardarEnStorage("productos",carrito);
  $("#carrito-cantidad").html(carrito.length);
  showCarrito($("#carrito-productos"),carrito);
};


export const createRangoDePrecios = (elementos,filtro)=>{
  let saltos = 1000;
  let max = Math.max(...(elementos.map(element => element[filtro])));
  let min = Math.min(...(elementos.map(element => element[filtro])));

  $("#controles").append(`<div class="shadow p-3 mb-5 bg-body rounded col-4 justify-content-center">
                          <h2 class="text-center"><span class="badge bg-primary">Precio</span></h2>
                          <div class="row">
                            <label class="col-4 text-end" for="rango-precio">${min}</label>
                            <input class="col-4" id="rango-precio" type="range" min="${min}" max="${max}" step="${saltos}" value="${min}">
                            <label class="col-4 text-start" for="rango-precio">${max}</label>
                          </div>
                        </div>`);
};