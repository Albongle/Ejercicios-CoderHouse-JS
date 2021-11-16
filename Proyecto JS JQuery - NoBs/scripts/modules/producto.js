export class Producto{
    #gamasPosibles = ["Alta", "Media", "Baja"];
    #tiposPosibles =["Telefono","Auricular","Tablet","SmartWatch"];
    constructor(id,urlImg,desc,nombre,marca,gama,tipo,precio,cuotas){
        this.id = id;
        this.urlImg = this.#Imagen(urlImg) || "./img/notfind.png";
        this.desc= this.#Descripcion(desc) || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, explicabo, facilis consequuntur doloremque, quae saepe voluptatem sapiente eius";
        this.nombre=this.#Nombre(nombre) || "Sin Nombre";
        this.marca = this.#Marca(marca) || "Sin Marca";
        this.tipo =this.#Tipo(tipo) || "Sin Tipo";
        this.gama=this.#Gama(gama) || "Media";
        this.precio=this.#Precio(precio)||0;
        this.cuotas=this.#Cuotas(cuotas)||0;
    }
    //#region  Metodos Privados

    #Imagen (value){
        if(value!="" && value!= undefined){
            return value
        }
        else{
            throw Error("Imagen invalida");
        }
        
    }

    #Descripcion (value){
        if(value!="" && value!= undefined){
            return value;
        }
        else{
            throw Error("Descripcion Invalida");
        }
        
    }

    #Nombre (value){
        if(value!="" && value!= undefined){
            return value;
        }
        else{
            throw Error("Nombre Invalido");
        }
        
    }

    #Cuotas(value){

        if(!isNaN(value) && value>-1 && value<13){
            return value;
        }
        else{
            throw Error("Cantidad de cuotas invalidas, solo se puede establecer entre 0 y 12");
        }
    }

    #Marca(value){
        if(value!="" && value!= undefined){
            return value;
        }
        else{
            throw Error("Marca Invalida");
        }
    }

    #Gama(value){
        if(value!="" && value!=undefined && this.#gamasPosibles.includes(value,0)){
            return value;
        }
        else{
            throw Error(`"Gama Invalida, solo permitido ${this.#gamasPosibles.forEach(element=> element)}"`)
        }
    }

    #Tipo (value){
        if(value!="" && value!= undefined && this.#tiposPosibles.includes(value,0)){
            return value;
        }
        else{
            throw Error(`"Tipo Invalido, solo permitido ${this.#tiposPosibles.forEach(element=> element)}"`);
        }
    }


    #Precio(value){
        if(!isNaN(value) && value >-1){
            return value;
        }
        else{
            throw Error("Precio invalido");
        }
    }

    //#endregion
    
}