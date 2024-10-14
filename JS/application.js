function logOut() {
    sessionStorage.clear();
    changePage("login-page");
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function showRecipe(recipeArrStr) {
    let newHTML = ``;
    const recipeArr = JSON.parse(recipeArrStr);
    for (let recipeObj of recipeArr) {
        for (let key in recipeObj) {
            if (key != "steps") {
                newHTML += `<h2>${capitalize(key)}: ${recipeObj[key]}<h2>`;
            } else {
                for (let step of recipeObj["steps"]) newHTML += `<p>${step}</p>`;
            }
        }
    }

    document.getElementById("application-text").innerHTML = newHTML;
}
// not working
let myRecipes = [];
let currentUserId = sessionStorage.getItem("current user");
let userRequest = new FAJAX();
userRequest.open("get", `duck/API/users/${currentUserId}`);
userRequest.onload = () => {
    console.log("userRequest.response: ", userRequest.response);
    let myRecipesId = userRequest.response.recipes;
    for (let item of myRecipesId) {
        let recipeRequest = new FAJAX();
        console.log("recipeRequest: ", recipeRequest);
        recipeRequest.open("get", `duck/API/recipe/${item}`);
        recipeRequest.onload = () => {
            myRecipes.push(recipeRequest.response);
            console.log("[item].response: ", recipeRequest.response);
        };
        recipeRequest.send();
    }
    console.log(myRecipes);
};
userRequest.send();
