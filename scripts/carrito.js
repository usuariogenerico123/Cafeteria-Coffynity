

export class Carrito{
    constructor (){
        
        this.productos = new Array();
        this.loadStorage();
    }

    loadStorage(){
        const data = localStorage.getItem("productos");
        if (data) {
            const parsed = JSON.parse(data);
            parsed.map(p => this.productos.push(new Producto(p.nombre, p.precio)));
        }
    }

    eliminarProducto(nombre){

        let nom = nombre;
        for(let i=0; i<this.productos.length; i++){

            if(nom === this.productos[i].nombre){
                
                //this.productos[i] = "";
                this.productos.splice(i, 1);
                i=0;
                nom = "";
            }
            
            
            
        }
        localStorage.setItem("productos", JSON.stringify(this.productos));
        return true;
    }

    anadirProductos(producto){
        this.productos.push(producto)
        return true;
    }
    mostrarProductos(){
        return this.productos;
    }



}



export class Producto {
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio != null ? precio: 1;

    }
}



