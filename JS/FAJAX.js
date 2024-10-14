class FAJAX {
    onload = null;

    open(method, URL) {
        this.method = method;
        this.URL = URL;
    }
    send(body = null) {
        this.body = body;
        this.response = transferToServer(this);
    }
}

let request = new FAJAX();
request.open("get", "duck/API/users");
request.onload = () => {
    console.log(request);
};
request.send();
