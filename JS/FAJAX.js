class FAJAX {
    onload = null;

    open(type, URL) {
        this.type = type;
        this.URL = URL;
    }
    send(body = null) {
        this.body = body;
        const responsedFajax = transferToServer(this);
        this.status = responsedFajax.status
        this.response = responsedFajax.response
    }
}

let request = new FAJAX();
request.open("post", "duck/API/recipes");
request.onload = () => {
    console.log(request);
};
request.send(JSON.stringify({
    name: "Yair",
    type: "Dessert",
    time: "-1H",
    steps: ["מחבר שלוש מילים", "מחמם על אש קטנה", "ורץ מהר להביא", "בצל מהשכנה", "מוסיף שני חרוזים", "קצת פלפל, קצת מלח", "מערבב שלושה כבשים", "וזורק קובייה של קרח"]
}));