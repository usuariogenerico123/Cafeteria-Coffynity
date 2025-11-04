import { addProduct } from "./funcs.js";



const button = document.querySelectorAll(".boton-anadir");

button.forEach(b => {
    b.addEventListener("click", (e)=>{
        let div = e.target.parentElement
        let nombre = div.querySelector("h3").textContent;
        let precio;
        try{
            precio = div.querySelector("strong").textContent;
            console.log(precio);
        }catch(err){
            precio = 0;
        }
        addProduct(nombre, precio)
        console.log("pedido anadido");
    })
})











