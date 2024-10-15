function logOut() {
    sessionStorage.clear();
    changePage("login-page");
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function addRecipe() {}

function showRecipe(recipeArr) {
    let newHTML = ``;
    for (let recipeObj of recipeArr) {
        for (let key in recipeObj) {
            if (key !== "id") {
                if (key != "steps") {
                    newHTML += `<h2>${capitalize(key)}: ${recipeObj[key]}<h2>`;
                } else {
                    for (let step of recipeObj["steps"]) newHTML += `<p>${step}</p>`;
                }
            }
        }
    }

    document.getElementById("application-text").innerHTML = newHTML;
}

function showAllUserRecipes() {
    let userRequest = new FAJAX();
    userRequest.open("get", `duck/API/users/${currentUserId}`);

    userRequest.onload = () => {
        let myRecipes = [];
        let myRecipesId = userRequest.response.recipes;

        for (let item of myRecipesId) {
            let recipeRequest = new FAJAX();
            recipeRequest.open("get", `duck/API/recipes/${item}`);

            recipeRequest.onload = () => {
                myRecipes.push(recipeRequest.response);
            };

            recipeRequest.send();
            console.log(recipeRequest)
        }

        showRecipe(myRecipes);
    };


    userRequest.send();
}

currentUserId = sessionStorage.getItem("current user");
showAllUserRecipes();

function openRecipeCreator() {
    let recipeCreatorDisplay = document.getElementById("recipe-creator-display");
    recipeCreatorDisplay.innerHTML = "";
    let recipeCreator = document.getElementById("recipe-creator");
    let clone = recipeCreator.content.cloneNode(true);
    display.appendChild(clone);
}
