import { productos, carrito } from "./globales.js";

export const addAnuncio = (contenedor, elementos) => {
  elementos.forEach((element) => {
    $(contenedor).append(`
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3 m-2">
            <div class="card shadow p-3 mb-5 bg-body rounded">
                <img src="${element.urlImg}" class="card-img-top" alt="telefono"></img>
                <div class="card-body">
                    <p class="card-title fs-5">${element.marca} - ${element.nombre}</p>
                    <p class="card-text text-success fs-4">$${parseInt(element.precio).toLocaleString()}</p>
                    <p class="card-text"><span class="badge rounded-pill bg-info text-dark">Hasta ${element.cuotas} sin interés</span></p>
                    <p class="card-text">${element.desc}</p>                    
                </div>
                <button id="btn-compra-${element.id}" value="${element.id}" type="button" class="btn btn-outline-success btn-comprar">Comprar</button>
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

const addCarrito = (contenedor, producto) => {
  if (!carrito.find((element) => element.id === producto.id)) {
    alert(`Comprado`);
    carrito.push(producto);
  }
  $("#carrito-cantidad").html(carrito.length);
  showCarrito(contenedor,carrito);
};



const showCarrito = (contenedor,productos)=>{
  contenedor.empty();
  productos.forEach(producto=>{
    $(contenedor).append(`<div class="col mt-1">
    <div class="card">

    <button id="btn-compra-${producto.id}" value="${producto.id}" type="button"  class="col-3 btn btn-close btn-outline-danger btn-quitar align-self-center"></button>
      <img src="${producto.urlImg}" class="card-img-top" alt="telefono-carrito">
      <p class="card-text text-primary text-center">${producto.marca}</p>
      <div class="card-footer">
        <p class="card-text text-success fs-6 text-center">$${parseInt(producto.precio).toLocaleString()}</p>
        <p class="card-text"><span class="badge rounded-pill bg-info text-dark">Hasta ${producto.cuotas} sin interés</span></p>
      </div>
    </div>
  </div>`);
  });
  $(".btn-quitar").on("click",removeCarrito);
};


function removeCarrito(){
  carrito.splice(carrito.findIndex(element=>element.id===parseInt(this.value)),1);
  $("#carrito-cantidad").html(carrito.length);
  showCarrito($("#carrito-productos"),carrito);
};