try {
    function handleRequest(fajax) {
        const urlRequest = handleURL(fajax.URL);
        const id = isIdInURL(fajax.URL) ? getIdFromURL(fajax.URL) : null;
        // Obj --> ?
        switch (fajax.type) {
            case "get":
                if (!isIdInURL(fajax.URL)) {
                    console.log("get without id");
                    DATABASEGET(urlRequest);
                } else {
                    console.log("get with id");
                    DATABASEGETBYID(urlRequest, id);
                }
                break;
            case "post":
                if (!isIdInURL(fajax.URL)) {
                    if (urlRequest === "validation") {
                        console.log("validation");
                        DATABASEVALIDATION(fajax.body);
                    } else {
                        console.log("post");
                        DATABASSEPOST(urlRequest, fajax.body);
                    }
                } else sendResponse("error");
                break;
            case "put":
                if (isIdInURL(fajax.URL)) {
                    console.log("put");
                    DATABASEPUT(urlRequest, id, fajax.body);
                } else sendResponse("error");
            case "delete":
                if (isIdInURL(fajax.URL)) {
                    console.log("delete");
                    DATABASEDELETE(urlRequest, id);
                } else sendResponse("error");
                break;
        }
    }

    function isIdInURL(URL) {
        let regex = /.{1,}\/.{1,}\/.{1,}\/[0-9]{1,}/;
        return regex.test(URL);
    }

    function getIdFromURL(URL) {
        return URL.slice(URL.lastIndexOf("/") + 1);
    }

    // duck\/API\/(users|userAdd|recipes)\/*[0-9]*
    function handleURL(URL) {
        console.log("URL: ", URL);
        if (URL.match(/duck\/API\/userValidation\/*[0-9]*/)) {
            console.log("URL: ", URL);
            return "validation";
        } else if (URL.match(/duck\/API\/users\/*[0-9]*/)) {
            console.log("URL: ", URL);
            return "users";
        } else if (URL.match(/duck\/API\/recipes\/*[0-9]*/)) {
            console.log("URL: ", URL);
            return "recipes";
        } else {
            throw new Error("404");
        }
    }
} catch (e) {
    sendResponse(e);
}

// temporary
function sendResponse() {
    console.log("error");
}

let fakeRequest = {
    type: "delete",
    URL: "duck/API/recipes/2",
    body: "hi",
};

console.log(handleRequest(fakeRequest));
