class Producto{
    constructor(id,nombre,precio){
        this.id=id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

const productos = [];
productos.push(new Producto(1,"DONA",65));
productos.push(new Producto(2,"PAN",125));
productos.push(new Producto(3,"MEDIA LUNA",165));
productos.push(new Producto(4,"CHURROS",265));
productos.push(new Producto(5,"CHIPA",85));

const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");

for (const element of productos) {
    let div = document.createElement("div");
    div.innerHTML=  `<h2>${element.nombre}</h2><h3>${element.precio}</h3><button id='${element.id}'>COMPRAR</button>`;
    contenedorProductos.appendChild(div);   
}