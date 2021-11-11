export default{ 
    
    setSpinner: function (contenedor) {
    $(contenedor).append(`<img src="./img/spinner.gif" alt="spinner">
`);
  },

   removeSpinner: function (contenedor,node) {
    $(contenedor).empty();
  }
}