/**
 * Metodos que establecen y retiran el spinner para simular la carga en un servidor
 */
export default{ 
    
    setSpinner: function (contenedor) {
    let img = document.createElement("img");
    img.setAttribute("src", "./img/jesus-dancing.gif");
    img.setAttribute("alt", "spinner");
    img.setAttribute("id", "img-spinner");
    contenedor.appendChild(img);
  },

   removeSpinner: function (contenedor,node) {
    contenedor.removeChild(node);
  }
}