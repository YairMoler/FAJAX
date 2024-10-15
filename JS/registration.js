document.getElementById("name").addEventListener("change", (event) => handleChangeRegister(event));

document.getElementById("password").addEventListener("change", (event) => handleChangeRegister(event));

document.getElementById("confirm-password").addEventListener("change", (event) => handleChangeRegister(event));

function handleChangeRegister(event) {
    event.preventDefault();
    registerValues[event.target.id] = event.target.value;
}

// to-do: try regex
function register(event) {
    event.preventDefault();
    if (registerValues["password"] === registerValues["confirm-password"]) {
        if (registerValues["password"].length >= 3 && registerValues["name"].length >= 3) {
            let registrationRequest = new FAJAX();
            registrationRequest.open("post", "duck/API/users");
            registrationRequest.onload = () => changePage("login-page");
            registrationRequest.send(JSON.stringify(registerValues));
        } else {
            alert("Username or password is not valid");
        }
    } else {
        alert("password is not confirmed");
    }
}
