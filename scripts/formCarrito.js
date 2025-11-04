import { Carrito, Producto } from "./carrito.js";

const p = (algo) => {console.log(algo)}




const div = document.querySelector(".carrito-productos");
const precioTotal = document.getElementById("total-precio");
const productosTotal = document.getElementById("total-productos");
const form = document.getElementById("form");
const botonHacerPedido = document.getElementById("boton-pedido");


let totalPre = 0;
let totalPro = 0;
if(localStorage.getItem("productos")){
    const productos = new Array(JSON.parse(localStorage.getItem("productos")));

    
    

    // p(totalProductos)
    // p(totalProductos[0].length)
    for(let i=0; i<productos[0].length; i++){

        let divItem = document.createElement("div")
        divItem.className = "carrito-item";
        let product = document.createElement("p")
        product.innerText = productos[0][i].nombre

        let precio = document.createElement("strong");
        precio.innerText = productos[0][i].precio + " Bs";
        totalPre += parseInt(productos[0][i].precio);

        divItem.appendChild(product);
        divItem.appendChild(precio);

        div.appendChild(divItem);
        //console.log(totalProductos[0][i].nombre);
    }
    
    precioTotal.innerText = totalPre;
    productosTotal.innerText = productos[0].length;
    totalPro = productos[0].length;

}else{
    const siu = document.createElement("h2");
    siu.innerText = "Aun no hay productos en el carrito";
    div.appendChild(siu);
}


const buttonDelete = document.querySelectorAll(".carrito-item");
buttonDelete.forEach(item => {
    item.addEventListener("click", (event)=>{
        let producto = event.target.querySelector("p").textContent;
        let precio = event.target.querySelector("strong").textContent.replace(" Bs", "");
        item.remove();
        productosTotal.innerText -= 1;
        precioTotal.innerHTML  -= parseInt(precio);
        totalPre = precioTotal.innerText;
        totalPro = productosTotal.innerText;
        deleteItem(producto);
        updateData();
        p(precio);
    })
})



function deleteItem(nombre){
    const carr = new Carrito();
    carr.eliminarProducto(nombre);

}

function updateData(){
    
    const h2 = document.querySelector("h2");

    
    if(totalPro == 0 && !h2){
        try{
            deleteTag(".carrito-item")
            
        }catch(e){
            return
        }
        const siu = document.createElement("h2");
        siu.innerText = "Aun no hay productos en el carrito";
        div.appendChild(siu);
    }
    
}
updateData();





//-hacer pedido
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    p(totalPro)
    if(parseInt(totalPro) === 0){
        alert("No hay productos en el carrito");
        return  
    };
    
    sendPedido();
    form.reset();
    
    
})





async function sendPedido(){
    const productis =  localStorage.getItem("productos");
    const data = JSON.parse(productis);

    
    let carrito = {}

    let total_precio = 0

    data.forEach(s => {
        const itm = s.nombre
        const pre = parseInt(s.precio)
        
        if(carrito[itm]){
            
            carrito[itm].precio += pre;
            carrito[itm].cantidad += 1;
            total_precio += pre;
            
        }else{
            carrito[itm] = {cantidad : 1, precio: pre }
            total_precio += pre;
        }

    })  
    carrito["total_precio"]= total_precio;
    carrito["total_cantidad"] = data.length;

    const pedido = await sendData(carrito)
    if(await pedido){
        alert("Gracias por comprar en coffinty, hemos recibido tu pedido")
        localStorage.clear()
        totalPro = 0;
        precioTotal.innerText = 0;
        productosTotal.innerText = 0;
        updateData();
        
    }
    //p(carrito)
        
    
}

function ordenarProductos(lista){
    let carrito = {};

    for(let i=0; i < lista.length; i++){
        const item = lista[i];
        if(carrito[item]){
            carrito[item] += 1;
        }else{
            carrito[item] = 1;
        }
    }
    return carrito;
}


async function sendData(data){
    const token = "8350818484:AAGvuj6aEmiOSrFzCTq1CINvEOEiUAgiVSc";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const chat_id = 8410639525
    const datos_cliente = datosCliente();
    //p(datos_cliente)

    const resp = await fetch(`${url}?chat_id=${chat_id}&text=NUEVO PEDIDO ${encodeURIComponent(datos_cliente)} %0A ORDEN  <pre>${JSON.stringify(data)}</pre> &parse_mode=HTML`)
    if(await resp.status){
        p(await resp.json());
        return true
    }
}


function datosCliente(){
    const [nombre, apellido, email, telefono, direccion] = [
        document.getElementById("nombre").value,
        document.getElementById("apellido").value,
        document.getElementById("email").value,
        document.getElementById("telefono").value,
        document.getElementById("direccion").value
    ]
    const datos = `<pre>
    DATOS CLIENTE
    ------------------------
    nombre: ${nombre}
    apellidos: ${apellido}
    correo: ${email}
    telefono: ${telefono}
    direccion: ${direccion}
    ------------------------
    </pre>
    `

    return datos;
}



function deleteTag(tag){
    const doc = document.querySelectorAll(tag)
    if(doc.length > 1){
        doc.forEach(t => {
            t.remove()}
        )
        return 
    }
    doc.remove();

}