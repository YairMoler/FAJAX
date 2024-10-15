function transferToServer(fajaxRequest) {
    let response;
    try {
        response = handleRequest(fajaxRequest);
    } catch (e) {
        console.log(e);
    }
    try {
        fajaxRequest.onload();
    } catch (e) {
        console.log("onload is incorrect " + e);
    }

    return response;
}
