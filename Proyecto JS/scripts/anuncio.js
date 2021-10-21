export const creaAnuncio = (producto)=>{
    let {urlImg,desc,nombre,cuotas,tipo,precio,id} = producto;
    const divAnuncio = document.createElement("div");
    divAnuncio.setAttribute("data-id",id);  
    divAnuncio.setAttribute("id",`anuncio-${tipo}`);
    divAnuncio.setAttribute("class","anuncios__anuncio");   
    const img = document.createElement("img");
    img.setAttribute("class","anuncio__img");
    img.setAttribute("src",urlImg);
    img.setAttribute("alt",nombre);


    const divDetalle = document.createElement("div");
    divDetalle.setAttribute("class","anuncio__detalle");
    const pPrecio = document.createElement("p");
    pPrecio.textContent = `\$${parseInt(precio).toLocaleString()}`;
    pPrecio.setAttribute("class","detalle__precio");
    const pCuotas = document.createElement("p");
    pCuotas.setAttribute("class","detalle__cuotas");
    pCuotas.textContent = `Hasta ${cuotas} sin interés`;
    const pDesc = document.createElement("p");
    pDesc.setAttribute("class","detalle__descripcion");
    pDesc.textContent = desc;

    divDetalle.appendChild(pPrecio);
    divDetalle.appendChild(pCuotas);
    divDetalle.appendChild(pDesc);

    divAnuncio.appendChild(img);
    divAnuncio.appendChild(divDetalle);
    return divAnuncio;
}