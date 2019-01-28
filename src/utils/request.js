const JSON_HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};
const FORM_HEADERS = {
    "Content-type": "application/x-www-form-urlencoded"
};
const isJSON = response => {
    const contentType = response.headers.get("content-type");
    return contentType && contentType.toLowerCase().indexOf("application/json")>=0;
};
const serialize = jsonData => {
    let qString = "";
    if(!jsonData || typeof(jsonData)!=="object")
        return qString;
    Object.keys(jsonData).forEach(key => {
        if (jsonData[key] instanceof Array) {
            jsonData[key].forEach(value => {
                qString += key + "=" + value + "&";
            });
        } else {
            qString += key + "=" + jsonData[key] + "&";
        }
    });
    if(!qString)
        return qString;
    qString = qString.slice(0, qString.length - 1);
    return qString;
};
const getFormData = jsonData => {
    const fd = new FormData();
    if(!jsonData || typeof(jsonData)!=="object")
        return fd;
    Object.keys(jsonData).forEach(key => {
        fd.append(key, jsonData[key]);
    });
    return fd;
};
/**
* @param String url
* @param {Object} options
*   @param {String} [type="GET"] - HTTP request type
*   @param {String} [dataType] - "json" | "form"
*   @param {Object|FormData} [options.data]
                            - JSON for GET requests
                            - JSON for dataType=json
                            - FormData for dataType=form or unknown dataType
*   @param {Object) [headers] - HTTP headers
*/
const request = async (url, options={}) => {
    if(!url) {
        throw new Error("URL required");
    }
    const params = {
        method: options.type || options.method || "GET",
        headers: options.headers
    };
    params.method = params.method.toUpperCase();
    
    if(options.sendCredentials) {
        params.credentials = "include";
    }
    if(params.method !== "GET") {
        if(options.dataType === "form") {
            params.headers = {
                ...FORM_HEADERS,
                ...params.headers
            };
        }
        if(options.dataType === "json") {
            params.headers = {
                ...JSON_HEADERS,
                ...params.headers
            };
            if(options.data)
                params.body = JSON.stringify(options.data);
        }
        if(!params.body) {
            if(options.data instanceof FormData)
                params.body = options.data;
            else
                params.body = getFormData(options.data);
        }
    } else if(options.data && typeof(options.data) === "object") {
        // add query params
        let qString = serialize(options.data);
        if(url.indexOf("?") > 0) {
            qString = "&" + qString;
        } else {
            qString = "?" + qString;
        }
        url += qString;
    }
    const response = await fetch(url, params)
    const text = await response.text();
    if(response.ok) {
        if(isJSON(response)) {
            try {
                const json = JSON.parse(text);
                return {
                    status: response.status,
                    statusText: response.statusText,
                    text,
                    json,
                };
            } catch(ex) {
                throw new Error({
                    status: response.status,
                    statusText: response.statusText,
                    text
                });
            }
        }
        return {
            status: response.status,
            statusText: response.statusText,
            text
        };
    }
    // process error
    if(isJSON(response)) {
        try {
            const errorJSON = JSON.parse(text);
            throw new Error({
                status: response.status,
                statusText: response.statusText,
                text,
                json: errorJSON
            });
        } catch(ex) {
            throw new Error({
                status: response.status,
                statusText: response.statusText,
                text
            });
        }
    }
    throw new Error({
        status: response.status,
        statusText: response.statusText,
        text
    });
}

export default request;
