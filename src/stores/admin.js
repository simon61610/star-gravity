import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

//  這裡只要改 true/false，就能切換 (主要為測試開發使用 正式要false)
const USE_FAKE = false

export const useAuthStore = defineStore("admin",()=>{
    const isLoggedIn = ref(false)  //確認登入狀態 預設登出
    const currentUser = ref(null)  //目前使用者資訊



    //檢查登入狀態
    async function checkSession(){
        //測試開發使用
        if (USE_FAKE) {
            console.warn("DEV 模式下，假裝已登入")
            isLoggedIn.value = true
            currentUser.value = { username: "dev_admin" }
            return
        }

        //正式部屬呼叫PHP
        const res =  await axios.get(import.meta.env.VITE_AJAX_URL+'admin/admincheck.php',{withCredentials: true})  //withCredentials: true 請求這個網址時要帶上cookie

        isLoggedIn.value = res.data.success === true
        currentUser.value = res.data.user || null
    }

    //登入php   



    async function login (username,password){

        if (USE_FAKE) {   
            console.warn("DEV 模式下，跳過 PHP API，直接模擬登入成功")
            isLoggedIn.value = true
            currentUser.value = { username: "dev_admin" }
            return { success: true }
        }


        const res = await axios.post(import.meta.env.VITE_AJAX_URL+'admin/adminlogin.php',{ username, password },{ withCredentials: true })

        if(res.data.success){
            await checkSession()
            // isLoggedIn.value = true
            // currentUser.value = res.data.user // 存 res.data.user
        }
        return res.data   //回傳到該頁面讓該頁知道登入結果，顯示提示。
    }


    //登出php
    async function logout(){

        if (USE_FAKE) {
            console.warn("DEV 模式下，直接清空登入狀態")
            isLoggedIn.value = false
            currentUser.value = null
            return
        }



        const res = await axios.post(import.meta.env.VITE_AJAX_URL+'admin/adminlogout.php',{},{ withCredentials: true })

        //如果登出成功
        if(res.data.success){
            isLoggedIn.value = false
            currentUser.value = null 
        }
    }

    return { isLoggedIn, currentUser, checkSession, login, logout } //回傳方法讓個元件可以使用這些變數

})