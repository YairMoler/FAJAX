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
request.open("get", "duck/API/recipes/1");
request.onload = () => {
    console.log(request);
};
request.send();
