const buttonInfo = document.getElementById("buttonInfo");
//Cookies // enviarInfo
buttonInfo.onclick = () => {
    fetch("http://localhost:8080/users/cookieExtractor", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
  };
  