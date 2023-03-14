const socket = io();

const formulario = document.getElementById("formulario");
const inputUser = document.getElementById("user");
const inputMessage = document.getElementById("message");
const parrafo = document.getElementById("parrafo");

formulario.onsubmit = (e) => {
  e.preventDefault();
  const user = inputUser.value;
  const message = inputMessage.value;
  socket.emit("mensaje1", { user, message });
  fetch("/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, message }),
  });
};

socket.on("respuesta1", (mensajes) => {
  let info = "";
  mensajes.forEach((m) => {
    info += `<p style="color:rgb(212, 14, 107);background: #000;text-align: center;font-family: cursive;font-size: 30px;">El usuario ${m.user} dice: ${m.message} </p></br>`;
  });
  parrafo.innerHTML = info;
});
