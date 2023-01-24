const socket = io()

const formulario = document.getElementById('form')
const code = document.getElementById('code')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category= document.getElementById('category')
const status = document.getElementById('status')
const parrafoNuevo = document.getElementById('prod')

form.onsubmit = (e)=>{
    e.preventDefault()
    const codigo = code.value
    const titulo = title.value
    const descripcion = description.value
    const precio = price.value
    const cantidad = stock.value
    const categoria = category.value
    const estado = status.value
    socket.emit('enviar', {codigo,titulo,descripcion,precio,cantidad,categoria,estado})
}
socket.on('respuesta1',(mensaje)=>{
    let prod = ''
    mensaje.forEach(m=>{
        prod += `</br> code: ${m.codigo} </br> title: ${m.titulo} </br> description: ${m.descripcion} </br>
        price: $${m.precio} </br> stock: ${m.cantidad} </br>
        category: ${m.categoria} </br> status: ${m.estado} </br>`
    })
    parrafoNuevo.innerHTML = prod
})