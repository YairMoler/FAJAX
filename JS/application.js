function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1)
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

showRecipe(localStorage.getItem("myItem"));
