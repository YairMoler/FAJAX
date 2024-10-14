document.getElementById("username").addEventListener("change", (event) => handleChangeLogIn(event));

document.getElementById("password").addEventListener("change", (event) => handleChangeLogIn(event));

function handleChangeLogIn(event) {
    event.preventDefault();
    loginValues[event.target.id] = event.target.value;
    console.log(event.target.value);
}

function tempFAJAX() {
    changePage("application");
}

// to-do: try regex
function logIn(event) {
    event.preventDefault();
    if (loginValues.username.length >= 3 && loginValues.password.length >= 3) {
        let loginRequest = new FAJAX();
        loginRequest.open("post", "duck/API/userValidation");
        loginRequest.onload = () => {
            if (loginRequest.response) {
                sessionStorage.setItem("current user", loginRequest.response);
                changePage("application");
            } else {
                alert("Wrong username or password");
            }
        };
        loginRequest.send(loginValues);
    } else {
        alert("Username or password is not valid");
    }
}
