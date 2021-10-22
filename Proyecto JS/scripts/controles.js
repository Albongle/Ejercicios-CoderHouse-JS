

export const addRangoDePrecios = (elementos,filtro)=>{
    const divControlPrecio = document.getElementById("control-precio");
    const divInput = document.createElement("div");
    const titulo = document.createElement("h3");
    const inputRange = document.createElement("input");
    const primerLabel = document.createElement("label");
    const segundoLabel = document.createElement("label");
    let max = Math.max(...(elementos.map(element => element[filtro])));
    let min = Math.min(...(elementos.map(element => element[filtro])));

    titulo.textContent = "Precio";
    divInput.classList.add("precio__input");
    primerLabel.for="rango-precio";
    primerLabel.textContent = min;
    segundoLabel.for="rango-precio";
    segundoLabel.textContent = max;
    inputRange.setAttribute("id","rango-precio");
    inputRange.setAttribute("type","range");
    inputRange.setAttribute("min",min);
    inputRange.setAttribute("max",max);
    inputRange.setAttribute("step","1000");
    inputRange.value = min;
    divInput.appendChild(primerLabel);
    divInput.appendChild(inputRange);
    divInput.appendChild(segundoLabel);
    divControlPrecio.appendChild(titulo);
    divControlPrecio.appendChild(divInput);
};

export const addFiltroDeNombres = (elementos)=>{
    const divControlMarca = document.getElementById("control-marca");
    const titulo = document.createElement("h3");




};