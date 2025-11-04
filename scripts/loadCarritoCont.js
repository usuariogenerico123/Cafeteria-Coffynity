



const imgCarrito = document.querySelector(".contador");


if(localStorage.getItem("productos")){
    const totalProductos = JSON.parse(localStorage.getItem("productos"));
    console.log(totalProductos.length);
    imgCarrito.textContent = totalProductos.length;
    
}

