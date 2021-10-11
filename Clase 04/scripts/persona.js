export default class Persona {
    constructor(id, nombre, apellido, dni) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
    }

   mostrarDatos (){
     return this.apellido + ", " + this.nombre;
  }
}