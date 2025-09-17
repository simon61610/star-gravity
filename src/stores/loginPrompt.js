import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginPromptStore = defineStore('loginPrompt', () => {
    const isOpen = ref(false)
    const redirectPath = ref('/')
    const afterLoginAction = ref(null) // 儲存登入後要執行的動作(例如: 地點組件可以打開到評論)

    const open = (path = window.location.pathname , action = null) => {
        redirectPath.value = path
        isOpen.value = true
        afterLoginAction.value = action //儲存login當下的地點ID資訊
    }

    const close = () => {
        isOpen.value = false
    }

    const clearAction = () => {
        afterLoginAction.value = null //清空儲存的資料
    }

    return { isOpen, redirectPath, afterLoginAction, open, close, clearAction }
})