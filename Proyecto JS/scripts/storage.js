export const guardarEnStorage = (productoSeleccionados)=> localStorage.setItem("productosElegidos",JSON.stringify(productoSeleccionados));
export const leeDelStorage =(clave)=>JSON.parse(localStorage.getItem(clave));
export const limpiarStorage = (clave)=> localStorage.removeItem(clave);