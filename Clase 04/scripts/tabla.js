
export const  handlerLoadTable = function (event, items, contenedor) {
    mostrarTabla(crearTabla(items), contenedor);
  }
  
  // recibe una tabla y el contenedor, limpia los datos del contenedor y asigna lo recibido
  const mostrarTabla =  function (tabla, contenedor) {
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
 const crearTabla = (items) =>  {
    const tabla = document.createElement("table");
    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
    return tabla;
  }
  
  const crearThead= (items) =>{
    const thead = document.createElement("thead");
    const fila = document.createElement("tr");
    if (items) {
      for (const key in items) {
        if (key != "id") {
          const columna = document.createElement("th");
          columna.textContent = key.toUpperCase();
          fila.appendChild(columna);
        }
      }
      const colEliminar = document.createElement("th");
      colEliminar.textContent = "ACCION";
      fila.appendChild(colEliminar);
      thead.appendChild(fila);
    }
  
    return thead;
  }
  
  const crearTbody = (items) => {
    const tbody = document.createElement("tbody");
    items.forEach((element) => {
      const fila = document.createElement("tr");
      for (const key in element) {
        if (key === "id") {
          fila.setAttribute("data-id", element[key]); 
        } else {
          const columna = document.createElement("td");
          columna.textContent = element[key];
          fila.appendChild(columna);
        }
      }
  
      const colImg = document.createElement("td");
      const img = document.createElement("img");
      img.setAttribute("src", "./img/eliminar.png");
      colImg.appendChild(img);
      fila.appendChild(colImg);
  
      tbody.appendChild(fila);
    });
    return tbody;
  }
  