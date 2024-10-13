localStorage.setItem(
    "myItem",
    JSON.stringify([{
        name: "Hi",
        type: "Dessert",
        time: "1H",
        steps: ["1", "2", "3", "4"],
    },
    {
        name: "Hello",
        type: "Brunch",
        time: "10m",
        steps: ["1", "2", "3", "3"],
    }])
);

function showRecipe(recipeArrStr) {
    let newHTML = ``;
    const recipeArr = JSON.parse(recipeArrStr);
    for (let recipeObj of recipeArr) {
        for (let key in recipeObj) {
            if (key != "steps") {
                newHTML += `<h2>${key}: ${recipeObj[key]}<h2>`;
            } else {
                for (let step of recipeObj["steps"]) newHTML += `<p>${step}</p>`;
            }
        }
    }

    document.getElementById("application-text").innerHTML = newHTML;
}

showRecipe(localStorage.getItem("myItem"));
