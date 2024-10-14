class User {
    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.recipes = [];
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

class Database {
    constructor(type) {
        this.type = type;
        this.contentArr = JSON.parse(localStorage.getItem(this.type));
    }

    get() {
        // Returns entire array of type content
        return JSON.parse(localStorage.getItem(this.type));
    }
    getById(id) {
        // returns a specific item with given ID
        for (let obj of this.contentArr) {
            if (obj.id === id) return obj;
        }
    }
    getArrOfIds() {
        const arrOfIds = [];
        for (let element of this.contentArr) arrOfIds.push(element.id);
        return arrOfIds;
    }
    getAvailableId() {
        const availableId = JSON.parse(localStorage.getItem("IDsIndex")) + 1;
        JSON.stringify();
    }

    addItem(obj) {
        //TODO: ID Adds a new item in the database
        this.contentArr.push(obj);

        localStorage.setItem(this.type, JSON.stringify(this.contentArr));
    }

    editItem(id, property, content) {
        // changes a property of item.
        const obj = this.getById(id);
        const index = this.contentArr.indexOf(obj);
        obj[property] = content; // update
        this.contentArr[index] = obj;
        localStorage.setItem(this.type, JSON.stringify(this.contentArr));
    }

    validation(obj) {
        return this.contentArr.includes(obj);
        //TODO: return true or false, if obj exists  in array of content
    }

    delete(id) {
        //TODO: remove item from array of content
    }
}

class DatabaseUsers extends Database {
    constructor() {
        super("users");
    }
}

class DatabaseRecipes extends Database {
    constructor() {
        super("recipes");
    }
}

localStorage.clear();

localStorage.setItem("IDsIndex", "1");

localStorage.setItem(
    "recipes",
    JSON.stringify([
        new Recipe(0, "Pizza", "Dessert", "30m", ["1.", "2.", "3.", "4."]),
        new Recipe(1, "French people", "Brunch", "10m", [
            "1. put in oven",
            "2. cook until well done",
            "3. yummy",
            "4. another step, step on the french",
        ]),
    ])
);

// let db = new DatabaseRecipes()
// db.put(1, 'name', 'Italian People')
// console.log(localStorage.getItem('recipes'))
const DBUsers = new DatabaseUsers();
const DBRecipes = new DatabaseRecipes();
