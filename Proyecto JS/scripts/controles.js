

export const addRangoDePrecios = (elementos,filtro)=>{
    let saltos = 1000;
    const divControlPrecio = document.getElementById("control-precio");
    const divInput = document.createElement("div");
    const titulo = document.createElement("h3");

    let max = Math.max(...(elementos.map(element => element[filtro])));
    let min = Math.min(...(elementos.map(element => element[filtro])));

    titulo.textContent = "Precio";
    divInput.classList.add("precio__input");
    divInput.innerHTML=
    `<label for="rango-precio">${min}</label>
    <input id="rango-precio" type="range" min="${min}" max="${max}" step="${saltos}" value="${min}">
    <label for="rango-precio">${max}</label>`;
    
    divControlPrecio.appendChild(titulo);
    divControlPrecio.appendChild(divInput);
};

export const addFiltroDeNombres = (elementos)=>{
    const divControlMarca = document.getElementById("control-marca");
    const titulo = document.createElement("h3");
    const divSelectMarca = document.createElement("div");
    const marcas = [];
    divSelectMarca.classList.add("marca__select");
    elementos.forEach((element)=>{
        if(!marcas.includes(element.marca)){
            marcas.push(element.marca);
        }
    })

    for (const marca of marcas) {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type="checkbox";
        input.id ="select-marca-"+marca.toLowerCase();
        input.name = marca.toLowerCase();
        input.classList.add("select-marca");
        label.textContent = marca;
        label.setAttribute("for",`select-marca-${marca.toLowerCase()}`);
        divSelectMarca.appendChild(label);
        divSelectMarca.appendChild(input);
        
        
    }
    titulo.textContent = "Marca";
    divControlMarca.appendChild(titulo);
    divControlMarca.appendChild(divSelectMarca);
    console.log(marcas);



};