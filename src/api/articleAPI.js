
import axios from "axios";

const base = "http://localhost/start";

export function articleAPI(action,data={}){
    switch (action) {
        case "get":
            return axios.get(`${base}/articlesearch.php`)

        case "add":
            return axios.post(`${base}/articleadd.php`, data, {    //語法 axios.post(url, data, config)
                headers: { "Content-Type": "application/json" }
            })

        case "update":
            return axios.post(`${base}/articleupdata.php`, data, {    //語法 axios.post(url, data, config)
                headers: { "Content-Type": "application/json" }
            })

    }
}
