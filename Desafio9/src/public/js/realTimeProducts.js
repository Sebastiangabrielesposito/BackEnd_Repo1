const socket = io();

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

formulario.onsubmit = (e) => {
  e.preventDefault();
  const codigo = code.value;
  const titulo = title.value;
  const descripcion = description.value;
  const precio = price.value;
  const cantidad = stock.value;
  const categoria = category.value;
  const estado = status.value;
  let id = generateUUID();

  socket.emit("enviar", {
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
socket.on("respuesta", (mensajes) => {
  let prod = "";
  mensajes.forEach((m) => {
    prod += `<p style="color: silver;text-align: center;font-family: cursive;">id: ${m.id}</p> <p style="color: silver;text-align: center;font-family: cursive;">code: ${m.codigo}</p><p style="color: silver;text-align: center;font-family: cursive;">title: ${m.titulo}</p><p style="color: silver;text-align: center;font-family: cursive;">description: ${m.descripcion}</p><p style="color: silver;text-align: center;font-family: cursive;">price: $${m.precio}</p><p style="color: silver;text-align: center;font-family: cursive;">stock: ${m.cantidad}</p><p style="color: silver;text-align: center;font-family: cursive;">category: ${m.categoria}</p><p style="color: silver;text-align: center;font-family: cursive;">status: ${m.estado}</p><div style="text-align: center;">
  <button style="color:red;font-family: cursive;" id=${m.id}>x</button>
</div></br>`;
  });
  // console.log(prod);
  parrafoNuevo.innerHTML = prod;
  const botones = document.querySelectorAll("button");
  console.log(botones);

  botones.forEach((boton) => {
    boton.onclick = (e) => {
      console.log(e.target.id);
      socket.emit("eliminar", e.target.id);
    };
  });
});
