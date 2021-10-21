

export const addRangoDePrecios = (elemetos,filtro)=>{
    const controlPrecio = document.getElementById("control-precio");
    const inputRange = document.createElement("input");
    const primerLabel = document.createElement("label");
    const segundoLabel = document.createElement("label");
    let max = Math.max(...(elemetos.map(element => element[filtro])));
    let min = Math.min(...(elemetos.map(element => element[filtro])));
    primerLabel.setAttribute("for","rango-precio");
    primerLabel.textContent = min;
    segundoLabel.setAttribute("for","rango-precio");
    segundoLabel.textContent = max;
    controlPrecio.appendChild(primerLabel);
    inputRange.setAttribute("id","rango-precio");
    inputRange.setAttribute("type","range");
    inputRange.setAttribute("min",min);
    inputRange.setAttribute("max",max);
    inputRange.setAttribute("step","1000");
    inputRange.value = min;
    controlPrecio.appendChild(inputRange);
    controlPrecio.appendChild(segundoLabel);
};