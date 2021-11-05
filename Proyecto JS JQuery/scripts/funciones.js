export const addAnuncio = (contenedor, elementos) => {
  elementos.forEach((element) => {
    $(contenedor).append(`
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3 m-2">
            <div class="card shadow p-3 mb-5 bg-body rounded">
                <img src="${element.urlImg}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-title fs-5">${element.marca} - ${element.nombre}</p>
                    <p class="card-text text-success fs-4">$${parseInt(element.precio).toLocaleString()}</p>
                    <p class="card-text"><span class="badge rounded-pill bg-info text-dark">Hasta ${element.cuotas} sin interés</span></p>
                    <p class="card-text">${element.desc}</p>                    
                </div>
                <button  id="${element.id}" type="button" class="btn btn-outline-danger btn-comprar">Comprar</button>
            </div>
        </div>
    `);

  });

  $(".btn-comprar").on("click",function () {
    alert(`Comprado ${this.id}`);
  });


};
