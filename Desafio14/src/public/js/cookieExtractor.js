const buttonInfo = document.getElementById("buttonInfo");
//Cookies // enviarInfo
// buttonInfo.onclick =  () => {
//     fetch("http://localhost:8080/users/cookieExtractor", {
//       method: "GET",
//       headers: {
//         "content-Type": "application/json",
//       },
//     });
//   };
const infoCookies = document.getElementById('infoCookies')
const userContainer = document.getElementById("userContainer");


  infoCookies.onclick =  () => {
    fetch("http://localhost:8080/api/session/cookieExtractor", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    })
  };
  
  // infoCookies.onclick = () => {
  //   fetch("http://localhost:8080/api/session/cookieExtractor", {
  //     method: "GET",
  //     headers: {
  //       "content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const { user } = data;
  //       const userHtml = `
  //         <div>
  //           <h2>User Info:</h2>
           
  //           <p>Email: ${user.email}</p>
  //           <p>role: ${user.role}</p>
  //         </div>
  //       `;
  //       userContainer.innerHTML = userHtml;
  //     })
  //     .catch((error) => console.error(error));
  // };
  