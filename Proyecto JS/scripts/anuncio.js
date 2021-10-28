export const addAnuncio = (producto)=>{
    let {urlImg,desc,nombre,cuotas,tipo,precio,id} = producto;
    const divAnuncio = document.createElement("div");
    divAnuncio.setAttribute("data-id",id);  
    divAnuncio.setAttribute("id",`anuncio-${tipo}`);
    divAnuncio.classList.add("anuncios__anuncio");   
    const img = document.createElement("img");
    img.classList.add("anuncio__img");
    img.setAttribute("src",urlImg);
    img.setAttribute("alt",nombre);

    const divDetalle = document.createElement("div");

    divDetalle.innerHTML = `<p class="detalle__precio">$${parseInt(precio).toLocaleString()}</p>
    <p class="detalle__cuotas">Hasta ${cuotas} sin interés</p>
    <p class="detalle__descripcion">${desc}</p>`;

    divDetalle.classList.add("anuncio__detalle");


    divAnuncio.appendChild(img);
    divAnuncio.appendChild(divDetalle);
    return divAnuncio;
}