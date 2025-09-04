import axios from "axios";

const base = "pdo/news";
// const base = "http://localhost/start";

export function tagAPI(action,data={}){
    switch (action) {

        case "add":
            return axios.post(`${base}/tagsadd.php`, data, {    //語法 axios.post(url, data, config)
                headers: { "Content-Type": "application/json" }
            })

        case "get":
            return axios.get(`${base}/tagssearch.php`, data, {    //語法 axios.post(url, data, config)
                
            })
          

    }
}