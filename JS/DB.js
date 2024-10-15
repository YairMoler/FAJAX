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
        const availableId = JSON.parse(localStorage.getItem("IDsIndex")) ? JSON.parse(localStorage.getItem("IDsIndex")) + 1 : 1;
        localStorage.setItem("IDsIndex", JSON.stringify(availableId));
        console.log("availableId: ", availableId);
        return availableId;
    }

    addItem(obj) {
        //Adds a new item in the database
        if (!this.validation(obj)) {
            let newItem;
            let newId = this.getAvailableId();
            if (this.type === "users") {
                newItem = new User(newId, obj.name, obj.password);
            } else {
                newItem = new Recipe(newId, obj.name, obj.type, obj.time, obj.steps);
            }

            this.contentArr.push(newItem);
            localStorage.setItem(this.type, JSON.stringify(this.contentArr));
            return newId;
        }
    }

    editItem(id, property, content) {
        // TODO: changes a property of item.
        const obj = this.getById(id);
        const index = this.contentArr.indexOf(obj);
        obj[property] = content; // update
        this.contentArr[index] = obj;
        localStorage.setItem(this.type, JSON.stringify(this.contentArr));
    }

    validation(obj) {
        for (let item of this.contentArr) {
            let flag = true;
            for (let property in item) {
                if (property !== "id" && property !== "recipes") {
                    if (!compare(item[property], obj[property])) {
                        flag = false;
                    }
                }
            }
            if (flag) {
                return item.id;
            }
        }
    }

    delete(id) {
        let obj = this.getById(id);
        console.log("this.contentArr: ", this.contentArr);
        let index = this.contentArr.indexOf(obj);
        if (index >= 0) {
            let newArr = this.contentArr.splice(index, 1);
            console.log("newArr: ", newArr);
            console.log("this.contentArr: ", this.contentArr);
            localStorage.setItem(this.type, JSON.stringify(this.contentArr));
        }
    }
}

class DatabaseUsers extends Database {
    constructor() {
        super("users");
    }

    addRecipe(id, recipeId) {
        let user = this.getById(id);
        let userIndex = this.contentArr.indexOf(user);
        this.contentArr[userIndex].recipes.push(recipeId);
        localStorage.setItem(this.type, JSON.stringify(this.contentArr));
    }
}

class DatabaseRecipes extends Database {
    constructor() {
        super("recipes");
    }
}

function compare(a, b) {
    if (typeof a === typeof b) {
        if (typeof a === "object") {
            let l;
            if (a.length >= b.length) {
                l = a.length;
            } else {
                l = b.length;
            }
            if (a.filter((x) => b.includes(x)).length === l) {
                return true;
            } else return false;
        } else return a === b;
    } else return false;
}

function initiateLocalStorage() {
    if (!localStorage.length) {
        localStorage.setItem("users", JSON.stringify([new User(1, "Yair", "abc")]));
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
    }
}

initiateLocalStorage();

const DBUsers = new DatabaseUsers();
const DBRecipes = new DatabaseRecipes();
