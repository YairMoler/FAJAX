const changePage = (pageName) => {
    let display = document.getElementById("display");
    display.innerHTML = "";
    let newPage = document.getElementById(pageName);
    let clone = newPage.content.cloneNode(true);
    display.appendChild(clone);
    // console.log("hi");
};
changePage("login-page");
// window.onload = (x) => changePage("login-page");
