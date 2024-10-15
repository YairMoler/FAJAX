function transferToServer(fajaxRequest) {
    const response = handleRequest(fajaxRequest);
    try {
        fajaxRequest.onload();
    } catch (e) {
        console.log("onload is incorrect " + e);
    }

    return response;
}
