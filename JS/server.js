try {
    function handleRequest(fajax) {
        const urlRequest = handleURL(fajax.URL);
        const id = isIdInURL(fajax.URL) ? getIdFromURL(fajax.URL) : null;
        // Obj --> ?
        const neededDB = urlRequest === "recipes" ? DBRecipes : DBUsers;
        switch (fajax.type) {
            case "get":
                if (!isIdInURL(fajax.URL)) {
                    return sendResponse(fajax, 200, neededDB.get());
                } else {
                    return sendResponse(fajax, 200, neededDB.getById(id));
                }

            case "post":
                if (!isIdInURL(fajax.URL)) {
                    if (urlRequest === "validation") {
                        return sendResponse(fajax, 200, neededDB.validation(fajax.body));
                    } else {
                        neededDB.addItem(fajax.body);
                        return sendResponse(fajax, 200);
                    }
                } else return sendResponse(fajax, 400);

            case "put":
                if (isIdInURL(fajax.URL)) {
                    neededDB.editItem(id, body.property, body.content);
                    return sendResponse(fajax, 200);
                } else sendResponse(fajax, 400);
            case "delete":
                if (isIdInURL(fajax.URL)) {
                    neededDB.delete(id);
                } else return sendResponse(fajax, 200);
        }
    }

    function isIdInURL(URL) {
        let regex = /.{1,}\/.{1,}\/.{1,}\/[0-9]{1,}/;
        return regex.test(URL);
    }

    function getIdFromURL(URL) {
        return Number(URL.slice(URL.lastIndexOf("/") + 1));
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
function sendResponse(fajax, status, response = null) {
    console.log('response: ', response);
    
    console.log(fajax, status, response);
    fajax.status = status;
    fajax.response = response;
    console.log(fajax);
    return fajax;
}
