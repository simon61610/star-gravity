import { ref } from 'vue'
import axios from 'axios' 

// ====== 基本：token 狀態 ======
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

// 跨分頁同步登入狀態
window.addEventListener('storage', (e) => {
  if (e.key === AUTH_KEY) {
    isLoggedIn.value = !!e.newValue
  }
})

// 判斷是否為登入 API
function isLoginUrl(url) {
  return typeof url === 'string' && url.endsWith('/PDO/Member/login2.php')
  // if (!url) return false
  // return url.endsWith('/PDO/Member/login2.php') || url.endsWith('/PDO/Member/login2.php')
}

// 從回應 JSON 取出 token 欄位
function pickToken(data) {
  if (!data || typeof data !== 'object') return ''
  return data.token || data.access_token || ''
}

// ---- fetch 包裝：自動帶 Authorization；登入回應自動 setLogin ----
if (typeof window !== 'undefined' && window.fetch) {
    const _fetch = window.fetch
    window.fetch = async function (input, init) {
        const url = typeof input === 'string' ? input : (input && input.url) || ''
        // 非登入 API → 自動帶 Authorization
        try {
            // const t = localStorage.getItem(LS_TOKEN)
            const t = localStorage.getItem(AUTH_KEY)
            if (t && url && !isLoginUrl(url)) {
                init = init || {}
                init.headers = init.headers || {}
                if (typeof init.headers === 'object') {
                    init.headers['Authorization'] = 'Bearer ' + t
                }
            }
        } catch (e) {}

        // const res = await _fetch(input, init)

        // try {
        //   res = await _fetch(input, init)
        // } catch (err) {
        //   console.error('[fetch error]', url, err)  // 方便你在 console 看到真正錯誤
        //   throw err
        // }

        // 登入回應 → 解析 JSON → 存 token
        try {
            if (url && isLoginUrl(url) && res && res.ok) {
                const clone = res.clone()
                const ct = clone.headers.get('content-type') || ''
                if (ct.indexOf('application/json') !== -1) {
                    const data = await clone.json().catch(() => null)
                    const token = pickToken(data)
                    if (data && data.success && token) setLogin(token)
                }
            }
        } catch (e) {}

        // return res
    }
}

// ---- axios 攔截：自動帶 Authorization；登入回應自動 setLogin ----
if (axios && axios.interceptors && !axios.__AUTH_INTERCEPTOR_INSTALLED__) {
  axios.__AUTH_INTERCEPTOR_INSTALLED__ = true
  // 請求前：帶上 Authorization（登入 API 除外）
  axios.interceptors.request.use(function (config) {
    try {
      const t = localStorage.getItem(AUTH_KEY)
      if (t && config && config.url && !isLoginUrl(config.url)) {
        // if (t && config && config.url && !isLoginUrl(config.url))
        config.headers = config.headers || {}
        config.headers['Authorization'] = 'Bearer ' + t
      }
    } catch (e) {}
    return config
  })

  // 回應後：若是登入 API 的成功回應，抓 token 存起來
  axios.interceptors.response.use(function (res) {
    try {
      const url = res && res.config && res.config.url
      if (url && isLoginUrl(url) && res && res.data && res.data.success) {
        const token = pickToken(res.data)
        if (token) setLogin(token)
      }
    }  catch (e) {}
    return res
  })











}





