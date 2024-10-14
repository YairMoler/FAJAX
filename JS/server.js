try {
    function handleRequest(fajax) {
        const urlRequest = handleURL(fajax.URL);
        const id = isIdInURL(fajax.URL) ? getIdFromURL(fajax.URL) : null;
        // Obj --> ?
        if (!(urlRequest === "recipes")) {
            switch (fajax.type) {
                case "get":
                    if (!isIdInURL(fajax.URL)) {
                        return sendResponse(this, 200, DBUsers.get(urlRequest));
                    } else {
                        return sendResponse(this, 200, DBUsers.getByID(urlRequest, id));
                    }

                case "post":
                    if (!isIdInURL(fajax.URL)) {
                        if (urlRequest === "validation") {
                            return sendResponse(this, 200, DBUsers.validation(fajax.body));
                        } else {
                            DBUsers.addItem(fajax.body);
                            return sendResponse(this, 200);
                        }
                    } else return sendResponse(this, 400);

                case "put":
                    if (isIdInURL(fajax.URL)) {
                        DBUsers.editItem(id, body.property, body.content);
                        return sendResponse(this, 200);
                    } else sendResponse(this, 400);
                case "delete":
                    if (isIdInURL(fajax.URL)) {
                        DBUsers.delete(id);
                    } else return sendResponse(this, 200);
            }
        } else {
            switch (fajax.type) {
                case "get":
                    if (!isIdInURL(fajax.URL)) {
                        return sendResponse(this, 200, DBRecipes.get(urlRequest));
                    } else {
                        return sendResponse(this, 200, DBRecipes.getByID(urlRequest, id));
                    }
                case "post":
                    if (!isIdInURL(fajax.URL)) {
                        DBRecipes.addItem(fajax.body);
                        return sendResponse(this, 200);
                    } else return sendResponse(this, 400);
                case "put":
                    if (isIdInURL(fajax.URL)) {
                        DBRecipes.editItem(id, body.property, body.content);
                        return sendResponse(this, 200);
                    } else sendResponse(this, 400);
                case "delete":
                    if (isIdInURL(fajax.URL)) {
                        DBRecipes.delete(id);
                    } else return sendResponse(this, 200);
            }
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
            throw new Error("400");
        }
    }
} catch (e) {
    sendResponse(e);
}

// temporary
function sendResponse(fajax, status, responseText = null) {
    fajax.status = status;
    fajax.responseText = responseText;
    return fajax;
}
