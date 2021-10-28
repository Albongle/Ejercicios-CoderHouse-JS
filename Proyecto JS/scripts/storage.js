export const guardarEnStorage = (clave,productoSeleccionados)=> localStorage.setItem(clave,JSON.stringify(productoSeleccionados));
export const leeDelStorage =(clave)=>JSON.parse(localStorage.getItem(clave));
export const limpiarStorage = (clave)=> localStorage.removeItem(clave);