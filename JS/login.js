let loginValues = {};

document.getElementById("username").addEventListener("change", (event) => handleChange(event));

document.getElementById("password").addEventListener("change", (event) => handleChange(event));

const handleChangeLogIn = (event) => {
    event.preventDefault();
    loginValues[event.target.id] = event.target.value;
    console.log(event.target.value);
};

const tempFAJAX = () => {
    changePage("application");
};

// to-do: try regex
const logIn = (event) => {
    event.preventDefault();
    if (loginValues.username.length >= 3 && loginValues.password.length >= 3) {
        tempFAJAX(loginValues);
    } else {
        alert("Username or password is not valid");
    }
};
