//Que queres: buzo(A), campera(B), remera(C)
//Recibe A, B, C / AB-BA, AC-CA, BC-CB / ABC
//Cuanta cantidad queres de cada prenda (muestra el precio de la unidad)
//Si sumas otro producto te va haciendo la lista de cuanto sale cada cosa
//Alerta de precio final

//1-Creo los productos
class Productos{
    constructor(nombreProd, precioProd){
        this.nombre = nombreProd;
        this.precio = precioProd;
    }
}
let prodA = new Productos ('buzo', 2500)
let prodB = new Productos ('remera', 1100)
let prodC = new Productos ('campera', 2200)
const IVA = 21

//2-Cuales de estos productos va a querer
const QueProducto = () =>{
    while(true){
        let productos = []
        let inserteProducto = prompt('Cuales de estos productos vas a querer?\n\n-Buzo (A)\n-Remera (B)\n-Campera (C)\n\nEjemplo:\nSi quiero buzos y camperas escribo "AC"').toUpperCase();
        if (inserteProducto == 'A'){
            productos.push (prodA)
        }else if (inserteProducto == 'B'){
            productos.push (prodB)
        }else if (inserteProducto == 'C'){
            productos.push (prodC)
        }else if (inserteProducto == 'AB' || inserteProducto == 'BA'){
            productos.push (prodA, prodB)
        }else if (inserteProducto == 'AC' || inserteProducto == 'CA'){
            productos.push (prodA, prodC)
        }else if (inserteProducto == 'BC' || inserteProducto == 'CB'){
            productos.push (prodB, prodC)
        }else if (inserteProducto == 'ABC' || inserteProducto == 'ACB' || inserteProducto == 'BAC' || inserteProducto == 'BCA' || inserteProducto == 'CAB' || inserteProducto == 'CBA'){
            productos.push (prodA, prodB, prodC)
        }else{
            alert ('"' + inserteProducto + '" no es valido. Reingrese')
            continue
        }
        return productos
    }
}
const respuestaQueProductos = QueProducto();
console.log(respuestaQueProductos);

//3-Preguntar cantidades
const QueCantidad = (respuestaQueProductos) =>{
    salida = []
    let lista = ''
    for (let rep = 0; rep <respuestaQueProductos.length; rep++){        //Que se repita el ciclo en base al numero de elementos del array que dejo la funcion anterior
        const Prod =  respuestaQueProductos[rep]
        let ingreseCantidad = 0
        while (isNaN(ingreseCantidad) || (ingreseCantidad)<=0){     //Mientras que ingreseCantidad sea isNaN o <= 0, que la condicion sea true y se ejecute el while
            ingreseCantidad = prompt('Que cantidad de ' + Prod.nombre + 's quiere?\nPrecio por unidad: $' + Prod.precio + '\n\nProductos Pedidos:\n' + lista)
            if (isNaN(ingreseCantidad) || (ingreseCantidad)<=0){        //Por eso cuando ingresas un valor isNaN o <= 0 la condicion es true por eso te manda la alerta y vuelve a iniciar el ciclo hasta que ingreses algo distinto de isNaN o 0
                alert (ingreseCantidad + ' no es un numero valido. Reingrese')
            }
        }
        let precioPorCantidad = ingreseCantidad * Prod.precio       //Multiplica la cantidad que elegiste por sus respectivos precios
        lista += Prod.nombre + ': $' + (precioPorCantidad) + '\n'       //Crea una lista que te va diciendo cuanto te esta costando
        salida.push({Producto: Prod.nombre, Cantidad: ingreseCantidad, PrecioPorUnidad: Prod.precio, PrecioTotal: precioPorCantidad})       //Pushea en un array los objetos que vos hayas ingresado
    }
    return salida
}
const respuestaQueCantidad = QueCantidad(respuestaQueProductos)
console.log(respuestaQueCantidad)

//4-Lista de precios
const QuePrecio = (respuestaQueCantidad) =>{
    let lista = ''
    let lista2 = ''
    let sumaPrecios = 0
    let precioDescuento = 0
    let precioIVA = 0
    let salida = []
    for (let i=0; i<respuestaQueCantidad.length; i++){      //Se crea un bucle en base al numero de elementos que nos dejo el array de la funcion anterior
        const QueElemento = respuestaQueCantidad [i]        //En esta constante se guarda un numero de elemento especifico que va creciendo segun el numero de iteraciones
        const PrecioTotal = QueElemento.Cantidad * QueElemento.PrecioPorUnidad      //En esta constante se multiplica el precio de la unidad por la cantidad
        lista += '-' + QueElemento.Producto + ': $' + QueElemento.PrecioPorUnidad + '\n'        //Se crea una lista que contiene todos los productos y sus precios por unidad
        lista2 += QueElemento.Producto + 's (' + QueElemento.Cantidad + '): $' + PrecioTotal + '\n'     //Se crea una lista que te muestra el precio tuyo en base a la cantidad y el producto elegido
        sumaPrecios += PrecioTotal      //En cada iteracion se suma el PrecioTotal para mostrarte el valor bruto de todo junto
        precioDescuento= ((sumaPrecios * 0.9) * ( 1 + (IVA /100)))
        precioIVA= (sumaPrecios * ( 1 + (IVA /100)))
    }
    if (sumaPrecios >=10000){       //Si tu compra es mayor a 10.000 te descuenta el 10% sino solo te lo deja el precio bruto + IVA
        alert('Su compra supera los $10000 por eso tiene un descuento del 10%\n' + 'Su total menos 10% + IVA es de: $' + precioDescuento + '\n\n' + 'Lista de precios(unidad): \n'+ lista + '\n' + lista2)
        salida.push ({PrecioFinal: precioDescuento})
        return salida
    }else{
        alert('Su total + IVA es de: $' + precioIVA + '\n\n' + 'Lista de precios(unidad): \n'+ lista + '\n' + lista2)
        salida.push ({PrecioFinal: precioIVA})
        return salida
    }
}
let respuestaQuePrecio = QuePrecio(respuestaQueCantidad)
console.log (respuestaQuePrecio)