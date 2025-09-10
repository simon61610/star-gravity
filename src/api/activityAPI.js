import axios from "axios";

const base = import.meta.env.VITE_AJAX_URL


export function activityAPI(action,data={}){
    switch (action) {
        case "get":
            return axios.get(`${base}activity/activityget.php`)

        case "add":
            return axios.post(`${base}activity/activityadd.php`, data, {    //語法 axios.post(url, data, config)
                headers: { "Content-Type": "application/json" }
            })

        case "update":
            return axios.post(`${base}activity/activityupdate.php`, data, {    //語法 axios.post(url, data, config)
                headers: { "Content-Type": "application/json" }
            })

    }
}