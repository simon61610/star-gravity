import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginPromptStore = defineStore('loginPrompt', () => {
    const isOpen = ref(false)
    const redirectPath = ref('/')

    const open = (path = window.location.pathname) => {
        redirectPath.value = path
        isOpen.value = true
    }

    const close = () => {
        isOpen.value = false
    }

    return { isOpen, redirectPath, open, close }
})