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
        tempFAJAX(loginValues);
    } else {
        alert("Username or password is not valid");
    }
}
