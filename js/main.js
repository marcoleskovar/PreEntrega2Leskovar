//1-Creo los productos y algunas variables
const Productos = [
    {Producto: 'A', NombreProducto: 'Buzo', Precio: 2500},
    {Producto: 'B', NombreProducto: 'Remera', Precio: 1100},
    {Producto: 'C', NombreProducto: 'Campera', Precio: 2200}
]
const IVA = 21
let precioIVA= (( 1 + (IVA /100)))
const fechaActual = new Date()
const horaActual= fechaActual.getHours()

//2-Cuales de estos productos va a querer
const QueProducto = () =>{
    let resultado1;
    while(true){
        let IngreseProductos = prompt('Cuales de estos productos vas a querer?\n\n-Buzo (A)\n-Remera (B)\n-Campera (C)\n\nEjemplo:\nSi quiero buzos y camperas escribo "AC"\n' + '(Recuerde que si compra despues de las 18hs tiene descuento del 5%').toUpperCase();
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
    for (let rep = 0; rep <respuestaQueProductos.length; rep++){
        const Prod =  respuestaQueProductos[rep]
        let ingreseCantidad = 0
        while (isNaN(ingreseCantidad) || (ingreseCantidad)<=0){
            ingreseCantidad = prompt('Que cantidad de ' + Prod.NombreProducto + 's quiere?\nPrecio por unidad: $' + Prod.Precio + '\n\nProductos Pedidos:\n' + lista)
            if (isNaN(ingreseCantidad) || (ingreseCantidad)<=0){
                alert ('"' + ingreseCantidad + '" no es un numero valido. Reingrese')
            }
        }
        let precioPorCantidad = ingreseCantidad * Prod.Precio
        lista += Prod.NombreProducto + ': $' + (precioPorCantidad) + '\n'
        salida.push({Producto: Prod.NombreProducto, Cantidad: ingreseCantidad, PrecioPorUnidad: Prod.Precio, PrecioTotal: precioPorCantidad})
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
    let precioDescuento= (sumaPrecios2 * 0.9)
    let precioDescuentoHours = (sumaPrecios2 * 0.85)
    let precioDescuentoHours2 = (sumaPrecios2 * 0.95)
    if (horaActual>18 && sumaPrecios2 >= 10000){
        alert('Su total menos 15% + IVA es de: $' + (Math.round(precioDescuentoHours * precioIVA)) + '\n\n' + 'Lista de precios(unidad): \n'+ lista + '\n' + 'Lista de precios (cantidad por precio/unidad)\n' + lista2)
        salida.push ({PrecioFinal: (Math.round(precioDescuentoHours * precioIVA))})
    }else if (horaActual>18 && sumaPrecios2 < 10000){
        alert('Su total menos el 5% + IVA es de: $' + (Math.round(precioDescuentoHours2 * precioIVA)) + '\n\n' + 'Lista de precios(unidad): \n'+ lista + '\n' + 'Lista de precios (cantidad por precio/unidad)\n' + lista2)
        salida.push ({PrecioFinal:(Math.round(precioDescuentoHours2 * precioIVA))})
    }else if (horaActual<18 && sumaPrecios2 >= 10000){
        alert('Su total menos 10% + IVA es de: $' + (Math.round(precioDescuento * precioIVA)) + '\n\n' + 'Lista de precios(unidad): \n'+ lista + '\n' + 'Lista de precios (cantidad por precio/unidad)\n' + lista2)
        salida.push ({PrecioFinal: (Math.round(precioDescuento * precioIVA))})
    }else{
        alert('Su total + IVA es de: $' + (Math.round(sumaPrecios2 * precioIVA)) + '\n\n' + 'Lista de precios(unidad): \n'+ lista + '\n' + 'Lista de precios (cantidad por precio/unidad)\n' + lista2)
        salida.push ({PrecioFinal:(Math.round(sumaPrecios2 * precioIVA))})
    }
    return salida
}
let respuestaQuePrecio = QuePrecio(respuestaQueCantidad)
console.log (respuestaQuePrecio)