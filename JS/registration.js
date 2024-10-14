document.getElementById("new-username").addEventListener("change", (event) => handleChangeRegister(event));

document.getElementById("new-password").addEventListener("change", (event) => handleChangeRegister(event));

document.getElementById("confirm-password").addEventListener("change", (event) => handleChangeRegister(event));

function handleChangeRegister(event) {
    event.preventDefault();
    registerValues[event.target.id] = event.target.value;
    console.log(event.target.value);
}

// to-do: try regex
function register(event) {
    event.preventDefault();
    if (registerValues["new-password"] === registerValues["confirm-password"]) {
        if (registerValues["new-password"].length >= 3 && registerValues["confirm-password"].length >= 3) {
            let registrationRequest = new FAJAX();
            registrationRequest.open("post", "duck/API/users");
            registrationRequest.onload = () => changePage("login-page");
            registrationRequest.send(registerValues);
        } else {
            alert("Username or password is not valid");
        }
    } else {
        alert("password is not confirmed");
    }
}
