export class Producto{
    #gamasPosibles = ["Alta", "Media", "Baja"];
    #tiposPosibles =["Telefono","Auricular","Tablet","SmartWatch"];
    constructor(id,urlImg,desc,nombre,marca,gama,tipo,precio,cuotas){
        this.id = id;
        this.urlImg = urlImg || "./img/notfind.png";
        this.desc= desc || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, explicabo, facilis consequuntur doloremque, quae saepe voluptatem sapiente eius";
        this.nombre=nombre || "Sin Nombre";
        this.marca = marca || "Sin Marca";
        this.tipo = tipo || "Sin Tipo";
        this.gama=gama || "Media";
        this.precio=precio||0;
        this.cuotas=cuotas||0;
    }
    //#region  Propiedades
    get Id(){
        return this.id;
    }
    get Imagen(){
        return this.urlImg;
    }
    set Imagen (value){
        if(value!="" && value!= undefined){
            this.urlImg == value
        }
        else{
            throw Error("Imagen invalida");
        }
        
    }
    get Descripcion(){
        return this.desc;
    }
    set Descripcion (value){
        if(value!="" && value!= undefined){
            this.desc == value
        }
        else{
            throw Error("Descripcion Invalida");
        }
        
    }
    get Nombre(){
        return this.nombre;
    }
    set Nombre (value){
        if(value!="" && value!= undefined){
            this.nombre == value
        }
        else{
            throw Error("Nombre Invalido");
        }
        
    }
    get Cuotas(){
        return this.cuotas;
    }
    set Cuotas(value){

        if(!isNaN(value) && value>-1 && value<13){
            this.cuotas= value;
        }
        else{
            throw Error("Cantidad de cuotas invalidas, solo se puede establecer entre 0 y 12");
        }
    }
    get Marca(){
        return this.marca;
    }
    set Marca(value){
        if(value!="" && value!= undefined){
            this.marca=value;
        }
        else{
            throw Error("Marca Invalida");
        }
    }
    get Gama(){
        return this.gama;
    }
    set Gama(value){
        if(value!="" && value!=undefined && this.#gamasPosibles.includes(value,0)){
            this.gama = value;
        }
        else{
            throw Error(`"Gama Invalida, solo permitido ${this.#gamasPosibles.forEach(element=> element)}"`)
        }
    }
    get Tipo(){
        return this.tipo;
    }
    set Tipo (value){
        if(value!="" && value!= undefined && this.#tiposPosibles.includes(value,0)){
            this.tipo=value;
        }
        else{
            throw Error(`"Tipo Invalido, solo permitido ${this.#tiposPosibles.forEach(element=> element)}"`);
        }
    }

    get Precio(){
        return this.precio;
    }
    set Precio(value){
        if(!isNaN(value) && value >-1){
            this.precio = value;
        }
        else{
            throw Error("Precio invalido");
        }
    }

    //#endregion
    
}