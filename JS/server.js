// try {
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
                    return sendResponse(fajax, 200, neededDB.addItem(JSON.parse(fajax.body)));
                }
            } else return sendResponse(fajax, 400);

        case "put":
            if (isIdInURL(fajax.URL)) {
                neededDB.addRecipe(id, fajax.body);
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
    if (URL.match(/duck\/API\/userValidation\/*[0-9]*/)) {
        return "validation";
    } else if (URL.match(/duck\/API\/users\/*[0-9]*/)) {
        return "users";
    } else if (URL.match(/duck\/API\/recipes\/*[0-9]*/)) {
        return "recipes";
    } else {
        throw new Error("400");
    }
}
// } catch (e) {
//     sendResponse(e);
// }

function sendResponse(fajax, status, response = null) {
    fajax.status = status;
    fajax.response = response;
    return fajax;
}
