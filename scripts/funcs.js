import { Producto, Carrito } from "./carrito.js";




export function addProduct(nombre, precio){
    const carrito = new Carrito();
    
    carrito.anadirProductos(new Producto(nombre, precio))

    localStorage.setItem("productos", JSON.stringify(carrito.mostrarProductos()));
    let prods = JSON.parse(localStorage.getItem("productos"))
    
    let cont = document.querySelectorAll(".contador");
    cont.forEach(c => {
        c.innerHTML = prods.length;
    })
    console.log(prods.length)

}