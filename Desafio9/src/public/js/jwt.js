console.log("jwt fRONT");

const formulario = document.getElementById("form");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const buttonInfo = document.getElementById("buttonInfo");

//Form JWT LocalStorage
// formulario.onsubmit = (e) => {
//   e.preventDefault();
//   fetch("http://localhost:8080/jwt/login", {
//     method: "POST",
//     body: JSON.stringify({
//       email: inputEmail.value,
//       password: inputPassword.value,
//     }),
//     headers: {
//       "content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       localStorage.setItem("token", response.token);
//       // console.log(document.cookie);
//     });
// };

//localStorage enviarInfo
// buttonInfo.onclick = () => {
//   fetch("http://localhost:8080/jwt/loginJwtPassport", {
//     method: "GET",
//     headers: {
//       "content-Type": "application/json",
//       Authorization: "Bearer " + localStorage.getItem("token"),
//     },
//   });
// };


//form JWT Cookies 
formulario.onsubmit = (e) => {
  e.preventDefault();
  fetch("http://localhost:8080/jwt/login", {
    method: "POST",
    body: JSON.stringify({
      email: inputEmail.value,
      password: inputPassword.value,
    }),
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(document.cookie);
    });
};


//Cookies // enviarInfo
buttonInfo.onclick = () => {
    fetch("http://localhost:8080/jwt/loginJwtPassport", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
  };
  