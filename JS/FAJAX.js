class FAJAX {
    onload = null;

    open(method, URL) {
        this.method = method;
        this.URL = URL;
    }
    send(body = null) {
        this.body = body;
        this.response = transferToServer(this)
    }
}