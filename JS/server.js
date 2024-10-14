function handleRequest(fajax) {
    const urlRequest = handleURL(fajax.URL);
    const id = isIdInURL(fajax.URL) ? getIdFromURL(fajax.URL) : null;
    // Obj --> ?
    switch (fajax.type) {
        case "get":
            if (isIdInURL(fajax.url)) {
                DATABASEGET(urlRequest);
            } else {
                DATABASEGETBYID(urlRequest, id);
            }
            break;
        case "post":
            if (urlRequest === "validation") {
                DATABASEVALIDATION(fajax.body);
            } else {
                DATABASSEPOST(urlRequest, fajax.body);
            }
            break;
        case "put":
            if (isIdInURL(fajax.URL)) {
                DATABASEPUT(urlRequest, id, fajax.body);
            } // else respond with error
        case "delete":
            if (isIdInURL(fajax.URL)) {
                DATABASEDELETE(urlRequest, id);
            } // else respond with error
            break;
    }
}

function isIdInURL(URL) {
    return URL.match(/.{1,}\/.{1,}\/.{1,}\/[0-9]{1,}/);
}

function getIdFromURL(URL) {
    return URL.slice(URL.lastIndexOf("/") + 1);
}

// duck\/API\/(users|userAdd|recipes)\/*[0-9]*
function handleURL(URL) {
    switch (URL) {
        case URL.match(/duck\/API\/userValidation\/*[0-9]*/):
            return "validation";
        case URL.match(/duck\/API\/users\/*[0-9]*/):
            return "users";
        case URL.match(/duck\/API\/recipes\/*[0-9]*/):
            return "recipes";
    }
}

function sendResponse(){
    
}   