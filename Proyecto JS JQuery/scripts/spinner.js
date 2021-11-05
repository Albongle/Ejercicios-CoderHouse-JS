export default{ 
    
    setSpinner: function (contenedor) {
    $(contenedor).append(`<img src="./img/jesus-dancing.gif" alt="spinner" id="img-spinner" class="col-2 align-self-center">`);
  },

   removeSpinner: function (contenedor,node) {
    contenedor.removeChild(node);
  }
}