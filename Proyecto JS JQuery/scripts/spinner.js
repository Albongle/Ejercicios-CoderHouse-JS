export default{ 
    
    setSpinner: function (contenedor) {
    $(contenedor).append(`<div class="row" id="img-spinner"><button class="btn btn-primary" type="button" disabled>
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    Loading...
  </button></div>
`);
  },

   removeSpinner: function (contenedor,node) {
    $(contenedor).remove();
  }
}