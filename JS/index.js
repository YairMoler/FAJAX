const changePage = (pageName) => {
    let display = document.getElementById("display");
    display.innerHTML = "";
    let newPage = document.getElementById(pageName);
    let clone = newPage.content.cloneNode(true);
    display.appendChild(clone);
};

window.onload = (x) => changePage("application");




