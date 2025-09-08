
import axios from "axios";

const base = import.meta.env.VITE_AJAX_URL
// const base = "pdo/news";
// const base = "http://localhost/start";

export function articleAPI(action,data={}){
    switch (action) {
        case "get":
            return axios.get(`${base}news/articlesearch.php`)

        case "add":
            return axios.post(`${base}news/articleadd.php`, data, {    //語法 axios.post(url, data, config)
                headers: { "Content-Type": "application/json" }
            })

        case "update":
            return axios.post(`${base}news/articleupdata.php`, data, {    //語法 axios.post(url, data, config)
                headers: { "Content-Type": "application/json" }
            })

    }
}
