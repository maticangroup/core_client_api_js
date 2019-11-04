class Request {


    static send(Server, Entity, Action, _response, instance = null, method = null) {
        console.log("request is sent");
        let url = core_url;
        let server = Helper.ucfirst(Server);
        let entity = Helper.ucfirst(Entity);
        let action = Helper.lcfirst(Action);
        url += server + "/" + entity + "/" + action;
        // console.log(url);
        let http = new XMLHttpRequest;
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                let response = JSON.parse(http.responseText);
                if (response.status === 108) {
                    // similar behavior as an HTTP redirect
                    window.location.replace(login_page_url);
                }
                _response(response);
            }
        };

        let requestUrl = url + Request.convertModelToQueryString(instance, url);
        if (current_user_token) {
            let current_user = new UserModel();
            current_user.setUserPassword(current_user_token);
            requestUrl += Request.convertModelToQueryString(current_user, requestUrl);
        }

        if (method === null) {
            method = "GET";
        }
        console.log(requestUrl);
        http.open(method, requestUrl, true);
        http.send();
    }

    static convertParam(key, value) {
        return key + "=" + value;
    }

    static convertModelToQueryString($instance, $url) {
        // console.log($instance);
        if ($instance) {
            let params = "";
            let obj = $instance;
            let objectArray = Object.keys(obj).map(function (key) {
                return [key, obj[key]];
            });

            let objectPropertyCount = objectArray.length;
            objectArray.forEach(function (value, key) {
                // console.log(value);
                let search_result = $url.search(/\?+[a-zA-Z0-9]+=+[a-zA-Z0-9]+/);
                if (search_result === -1) {
                    params += "?";
                }
                params += Request.convertParam(value[0], value[1]);
                if (key + 1 === objectPropertyCount) {
                    params += "&";
                }

            });
            return params;
        } else {
            return "";
        }

    }
}


// $request = new Request(
//     "http://core.maticangroup.com/Repository/Person/all",
//     "GET",
//     function($response){
//         // console.log($response);
//     }
// );