const socketClient = io();

const formulario = document.getElementById("form");
const code = document.getElementById("code");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const category = document.getElementById("category");
const status = document.getElementById("status");
const parrafoNuevo = document.getElementById("prod");

function generateUUID() {
  var d = new Date().getTime();
  var uuid = "xxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

form.onsubmit = (e) => {
  e.preventDefault();
  const codigo = code.value;
  const titulo = title.value;
  const descripcion = description.value;
  const precio = price.value;
  const cantidad = stock.value;
  const categoria = category.value;
  const estado = status.value;
  let id = generateUUID();

  socketClient.emit("enviar", {
    codigo,
    titulo,
    descripcion,
    precio,
    cantidad,
    categoria,
    estado,
    id,
  });
};
socketClient.on("respuesta", (mensajes) => {
  let prod = "";
  mensajes.forEach((m) => {
    prod += `<p>id: ${m.id}</p> <p>code: ${m.codigo}</p><p>title: ${m.titulo}</p><p>description: ${m.descripcion}</p><p>price: $${m.precio}</p><p>stock: ${m.cantidad}</p><p>category: ${m.categoria}</p><p>status: ${m.estado}</p><button id=${m.id}>x</button></br>`;
  });
  // console.log(prod);
  parrafoNuevo.innerHTML = prod;
  const botones = document.querySelectorAll("button");
  console.log(botones);

  botones.forEach((boton) => {
    boton.onclick = (e) => {
      console.log(e.target.id);
      socketClient.emit("eliminar", e.target.id);
    };
  });
});
