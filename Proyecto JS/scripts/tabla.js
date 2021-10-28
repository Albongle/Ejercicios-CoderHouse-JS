import { leeDelStorage, guardarEnStorage,limpiarStorage } from "./storage.js";
export function handlerLoadTable(items, contenedor) {
  mostrarTabla(crearTabla(items), contenedor);
}


// recibe una tabla y el contenedor, limpia los datos del contenedor y asigna lo recibido
function mostrarTabla(tabla, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
  if (tabla) {
    contenedor.appendChild(tabla);
  }
}

/**
 * Crea la tabla
 */
function crearTabla(items) {
  const tabla = document.createElement("table");
  tabla.appendChild(crearThead(items[0]));
  tabla.appendChild(crearTbody(items));
  return tabla;
}

function crearThead(items) {
  const thead = document.createElement("thead");
  thead.setAttribute("id", "thead");
  const fila = document.createElement("tr");
  if (items) {
    for (const key in items) {
      if (key != "id") {
        const columna = document.createElement("th");
        if (key === "urlImg") {
          columna.textContent = "FOTO";
        } else {
          columna.textContent = key.toUpperCase();
        }
        fila.appendChild(columna);
      }
    }
    const colEliminar = document.createElement("th");
    colEliminar.textContent = "QUITAR";
    fila.appendChild(colEliminar);
    thead.appendChild(fila);
  }

  return thead;
}

function crearTbody(items) {
  const tbody = document.createElement("tbody");
  tbody.setAttribute("id", "tbody"); // le agrego un ID para poder controlarlo
  items.forEach((element) => {
    const fila = document.createElement("tr");
    for (const key in element) {
      if (key === "id") {
        fila.setAttribute("data-id", element[key]); //lo seteo para ocultar el ID
      } else {
        const columna = document.createElement("td");

        if (key === "urlImg") {
          columna.innerHTML = `<img src="${element[key]}" alt="telefono" class="img-telefono">`;
        } else {
          columna.textContent = element[key];
        }
        fila.appendChild(columna);
      }
    }

    const colImg = document.createElement("td");
    const img = document.createElement("img");
    img.setAttribute("src", "./img/cancelar.png");
    img.setAttribute("id", "img-accion");
    img.classList.add("img-accion");
    img.addEventListener("click",handlerEliminarItem);
    colImg.appendChild(img);
    fila.appendChild(colImg);
    tbody.appendChild(fila);
  });
  return tbody;
}


const handlerEliminarItem =(event)=>{
  let trSeleccionado = event.target.parentNode.parentNode;
  trSeleccionado.parentNode.removeChild(trSeleccionado);
  let p = leeDelStorage("productosElegidos");
  p = p.filter(element=> element.id != parseInt(trSeleccionado.dataset.id));
  guardarEnStorage("productosElegidos",p);
  location.reload();
 
}
