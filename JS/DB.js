class User {
    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.recipes = [0, 1];
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
        localStorage.setItem("IDsIndex", JSON.stringify(availableId));
        return availableId;
    }

    addItem(obj) {
        //Adds a new item in the database
        if (!this.validation(obj)) {
            let newItem;
            if (this.type === "users") {
                newItem = new User(this.getAvailableId(), obj.name, obj.password);
            } else {
                newItem = new Recipe(this.getAvailableId(), obj.name, obj.type, obj.time, obj.steps);
            }

            this.contentArr.push(newItem);
            localStorage.setItem(this.type, JSON.stringify(this.contentArr));
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
}

class DatabaseRecipes extends Database {
    constructor() {
        super("recipes");
    }
}

localStorage.clear();

localStorage.setItem("IDsIndex", "1");

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

// let db = new DatabaseRecipes()
// db.put(1, 'name', 'Italian People')
// console.log(localStorage.getItem('recipes'))
const DBUsers = new DatabaseUsers();
const DBRecipes = new DatabaseRecipes();

let ram = { name: "ram", password: "123" };
DBUsers.addItem(ram);

console.log(DBUsers.validation({ name: "ram", password: "123" }));

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
