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

// 新增：哪些 API 需要帶 Authorization / Cookie
function shouldAttachAuth(url) {
  return (
    typeof url === 'string' &&
    (
      url.endsWith('/PDO/Member/profile.php') ||        // 需要登入
      url.endsWith('/PDO/Member/update_profile.php')    // 需要登入
    )
  )
}

// 從回應 JSON 取出 token 欄位
function pickToken(data) {
  if (!data || typeof data !== 'object') return ''
  return data.token || data.access_token || ''
}

// ---- fetch 包裝：自動帶 Authorization；登入回應自動 setLogin ----
if (typeof window !== 'undefined' && window.fetch && !window.__AUTH_FETCH_INSTALLED__) {
  window.__AUTH_FETCH_INSTALLED__ = true
  const _fetch = window.fetch.bind(window)       // 綁定 this，避免某些瀏覽器報錯
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : (input && input.url) || ''
    // 非登入 API → 自動帶 Authorization
    try {
      const t = localStorage.getItem(AUTH_KEY)
      // 只對「需要驗證」的 API 才帶 token
      if (t && url && shouldAttachAuth(url))  {
        init = init || {}
        init.headers = init.headers || {}
        if (init.headers instanceof Headers) {
          init.headers.set('Authorization', 'Bearer ' + t)
        } else if (typeof init.headers === 'object') {
          init.headers['Authorization'] = 'Bearer ' + t
        } else {
          init.headers = { Authorization: 'Bearer ' + t }
        }
      }
      // Cookie 也只在需要驗證的 API 預設帶上
      if (shouldAttachAuth(url)) {
        if (!init || !('credentials' in init)) {
          init = init || {}
          init.credentials = 'include'
        }
      }
    }  catch (e) {}

    // 關鍵：回傳 _fetch 的 Promise，永遠把 Response 往外傳
    return _fetch(input, init)
    .then((res) => {
      // 登入回應 → 解析 JSON → 存 token（不影響回傳值）
      try {
        if (url && isLoginUrl(url) && res && res.ok) {
          const ct = res.headers.get('content-type') || ''
          if (ct.indexOf('application/json') !== -1) {
            res.clone().json().then((data) => {
              const token = pickToken(data)
              if (data && data.success && token) setLogin(token)
            }) .catch(() => {})
          }
        }
      } catch (e) {}
      return res
    })
    .catch((err) => {
      console.error('[fetch error]', url, err)   // 方便除錯
      throw err                                 // 把錯往外丟，讓呼叫端 .catch()
    })
  }
}

// if (typeof window !== 'undefined' && window.fetch ) {
//     const _fetch = window.fetch
//     window.fetch = async function (input, init) {
//         const url = typeof input === 'string' ? input : (input && input.url) || ''
//         // 非登入 API → 自動帶 Authorization
//         try {
//             // const t = localStorage.getItem(LS_TOKEN)
//             const t = localStorage.getItem(AUTH_KEY)
//             if (t && url && !isLoginUrl(url)) {
//                 init = init || {}
//                 init.headers = init.headers || {}
//                 if (typeof init.headers === 'object') {
//                     init.headers['Authorization'] = 'Bearer ' + t
//                 }
//             }
//         } catch (e) {}

//         // const res = await _fetch(input, init)
//         // console.log('[fetch call]', url, res?.status)

//         // try {
//         //   res = await _fetch(input, init)
//         // } catch (err) {
//         //   console.error('[fetch error]', url, err)  // 方便你在 console 看到真正錯誤
//         //   throw err
//         // }

//         // 登入回應 → 解析 JSON → 存 token
//         try {
//             if (url && isLoginUrl(url) && res && res.ok) {
//                 const clone = res.clone()
//                 const ct = clone.headers.get('content-type') || ''
//                 if (ct.indexOf('application/json') !== -1) {
//                     const data = await clone.json().catch(() => null)
//                     const token = pickToken(data)
//                     if (data && data.success && token) setLogin(token)
//                 }
//             }
//         } catch (e) {}

//         // return res
//     }
// }

// ---- axios 攔截：自動帶 Authorization；登入回應自動 setLogin ----
if (axios && axios.interceptors && !axios.__AUTH_INTERCEPTOR_INSTALLED__) {
  axios.__AUTH_INTERCEPTOR_INSTALLED__ = true

  // axios 也只對需要驗證的 API 預設帶 Cookie（其餘照請求自行決定）
  axios.defaults.withCredentials = false

  // 請求前：帶上 Authorization（登入 API 除外）
  axios.interceptors.request.use(function (config) {
    try {
      const t = localStorage.getItem(AUTH_KEY)
      // 只在需要驗證的 API 帶 Authorization
      if (t && config && config.url && shouldAttachAuth(config.url)) {
        // if (t && config && config.url && !isLoginUrl(config.url))
        config.headers = config.headers || {}
        config.headers['Authorization'] = 'Bearer ' + t
        // 需要驗證的 API 也開 Cookie
        config.withCredentials = true
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





