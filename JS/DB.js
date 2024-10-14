class User {
    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.recipes = [];
    }

    addRecipe(id) {
        this.recipes.push(id);
    }
}

class Recipe {
    constructor(id, name, type, time, steps) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.time = time;
        this.steps = steps;
    }
}

function dataBaseGet(content) {
    // Returns entire array of type content
}

function dataBaseGetId(content, id) {
    // returns a specific item with given ID
}

function getAvailableId(content){

}

function dataBasePost(content, obj) {
    // Adds a new item in the database
}

function dataBasePut(content, id, property) {
    // changes a property of item.
}

function dataBaseValidation(content, obj) {
    // return true or false, if obj exists  in array of content
}

function dataBaseDelete(content, id) {
    // remove item from array of content
}

localStorage.setItem(
    "recipes",
    JSON.stringify([{
        name: "Pizza",
        type: "Dessert",
        time: "1H",
        steps: ["1", "2", "3", "4"],
    },
    {
        name: "French people",
        type: "Brunch",
        time: "10m",
        steps: ["1. put in oven", "2. cook until well done", "3. yummy", "4. another step, step on the french"],
    }])
);