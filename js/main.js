//Que queres: buzo(A), campera(B), remera(C)
//Recibe A, B, C / AB-BA, AC-CA, BC-CB / ABC
//Cuanta cantidad queres de cada prenda (muestra el precio de la unidad)
//Si sumas otro producto te va haciendo la lista de cuanto sale cada cosa
//Alerta de precio final

//1-Creo los productos
const Productos = [
    {Producto: 'A', NombreProducto: 'Buzo', Precio: 2500},
    {Producto: 'B', NombreProducto: 'Remera', Precio: 1100},
    {Producto: 'C', NombreProducto: 'Campera', Precio: 2200}
]
const IVA = 21

//2-Cuales de estos productos va a querer
const QueProducto = () =>{
    let resultado1;
    while(true){
        let IngreseProductos = prompt('Cuales de estos productos vas a querer?\n\n-Buzo (A)\n-Remera (B)\n-Campera (C)\n\nEjemplo:\nSi quiero buzos y camperas escribo "AC"').toUpperCase();
        let valido = true
        for (let i = 0; i<IngreseProductos.length; i++){
            if (!['A', 'B', 'C'].includes(IngreseProductos[i])){
                valido = false;
                break
            }
        }
        if (valido){
            resultado1 = Productos.filter(elemento => IngreseProductos.includes(elemento.Producto))
            break
        }else{
            alert('"' + IngreseProductos + '" no es valido, reingrese')
        }
    }
    return resultado1   
}
let respuestaQueProductos = QueProducto()
console.log(respuestaQueProductos)

//3-Preguntar cantidades
const QueCantidad = (respuestaQueProductos) =>{
    salida = []
    let lista = ''
    for (let rep = 0; rep <respuestaQueProductos.length; rep++){        //Que se repita el ciclo en base al numero de elementos del array que dejo la funcion anterior
        const Prod =  respuestaQueProductos[rep]
        let ingreseCantidad = 0
        while (isNaN(ingreseCantidad) || (ingreseCantidad)<=0){     //Mientras que ingreseCantidad sea isNaN o <= 0, que la condicion sea true y se ejecute el while
            ingreseCantidad = parseInt(prompt('Que cantidad de ' + Prod.NombreProducto + 's quiere?\nPrecio por unidad: $' + Prod.Precio + '\n\nProductos Pedidos:\n' + lista))
            if (isNaN(ingreseCantidad) || (ingreseCantidad)<=0){        //Por eso cuando ingresas un valor isNaN o <= 0 la condicion es true por eso te manda la alerta y vuelve a iniciar el ciclo hasta que ingreses algo distinto de isNaN o 0
                alert (ingreseCantidad + ' no es un numero valido. Reingrese')
            }
        }
        let precioPorCantidad = ingreseCantidad * Prod.Precio       //Multiplica la cantidad que elegiste por sus respectivos precios
        lista += Prod.NombreProducto + ': $' + (precioPorCantidad) + '\n'       //Crea una lista que te va diciendo cuanto te esta costando
        salida.push({Producto: Prod.NombreProducto, Cantidad: ingreseCantidad, PrecioPorUnidad: Prod.Precio, PrecioTotal: precioPorCantidad})       //Pushea en un array los objetos que vos hayas ingresado
    }
    return salida
}
const respuestaQueCantidad = QueCantidad(respuestaQueProductos)
console.log(respuestaQueCantidad)

//4-Lista de precios
const QuePrecio = (respuestaQueCantidad) =>{
    let lista = ''
    let lista2 = ''
    let salida = []
    const sumaPrecios2 = respuestaQueCantidad.reduce((acumulador, elemento) =>{
        const CantidadXPrecio= elemento.Cantidad * elemento.PrecioPorUnidad;
        lista += '-' + elemento.Producto + ': $' + elemento.PrecioPorUnidad + '\n'
        lista2 += elemento.Producto + 's (' + elemento.Cantidad + '): $' + CantidadXPrecio + '\n'
        return acumulador + CantidadXPrecio
    } , 0)
    let precioDescuento= ((sumaPrecios2 * 0.9) * ( 1 + (IVA /100)))
    let precioIVA= (sumaPrecios2 * ( 1 + (IVA /100)))
    if (sumaPrecios2 >=10000){       //Si tu compra es mayor a 10.000 te descuenta el 10% sino solo te lo deja el precio bruto + IVA
        alert('Su total menos 10% + IVA es de: $' + (Math.round(precioDescuento)) + '\n\n' + 'Lista de precios(unidad): \n'+ lista + '\n' + lista2)
        salida.push ({PrecioFinal: (Math.round(precioDescuento))})
    }else{
        alert('Su total + IVA es de: $' + (Math.round(precioIVA)) + '\n\n' + 'Lista de precios(unidad): \n'+ lista + '\n' + lista2)
        salida.push ({PrecioFinal:(Math.round(precioIVA))})
    }
    return salida
}
let respuestaQuePrecio = QuePrecio(respuestaQueCantidad)
console.log (respuestaQuePrecio)