document.getElementById("name").addEventListener("change", (event) => handleChangeRecipeCreator(event));

document.getElementById("type").addEventListener("change", (event) => handleChangeRecipeCreator(event));

document.getElementById("time").addEventListener("change", (event) => handleChangeRecipeCreator(event));

document.getElementById("steps").addEventListener("change", (event) => handleChangeRecipeCreator(event));

function handleChangeRecipeCreator(event) {
    event.preventDefault();
    recipeCreatorValues[event.target.id] = event.target.value;
    console.log(event.target.value);
}

function splitStepsLine() {
    let stepsArr = recipeCreatorValues.steps.split("\n");
    recipeCreatorValues.steps = stepsArr;
}

function createRecipe(event) {
    event.preventDefault();
    splitStepsLine();
    console.log(recipeCreatorValues);
    let newRecipeRequest = new FAJAX();
    newRecipeRequest.open("post", "duck/API/recipes");
    newRecipeRequest.onload = () => {
        let recipeID = newRecipeRequest.response;
        console.log("recipeID: ", recipeID);
        let addRecipeRequest = new FAJAX();
        addRecipeRequest.open("put", `duck/API/users/${currentUserId}`);
        addRecipeRequest.onload = () => {
            changePage("application");
            showAllUserRecipes();
        };
        addRecipeRequest.send(recipeID);
    };
    newRecipeRequest.send(JSON.stringify(recipeCreatorValues));
}
