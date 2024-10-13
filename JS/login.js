let formValues = {};

document.getElementById("username").addEventListener("change", (event) => handleChange(event));

document.getElementById("password").addEventListener("change", (event) => handleChange(event));

const handleChange = (event) => {
    formValues[event.target.id] = event.target.value;
};

const tempFAJAX = () => {
    changePage(app);
};

const logIn = () => {
    tempFAJAX();
};