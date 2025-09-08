import { ref } from 'vue'

const AUTH_KEY = 'token'              // 存 token 的 key
export const isLoggedIn = ref(!!localStorage.getItem(AUTH_KEY))

export function setLogin(token) {
  localStorage.setItem(AUTH_KEY, token)
  isLoggedIn.value = true
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
  isLoggedIn.value = false
}

window.addEventListener('storage', (e) => {
  if (e.key === AUTH_KEY) {
    isLoggedIn.value = !!e.newValue
  }
})











