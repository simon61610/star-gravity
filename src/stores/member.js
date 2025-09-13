/*
1. 先引入 store，以下複製貼上
    import { useMemberStore } from '@/stores/member'
    const memberStore = useMemberStore()

2. 判斷是否登入，使用 memberStore.isAuthed
    memberStore.isAuthed => boolean
    -> true 登入
    -> false 沒登入(登出狀態)

3. 取用會員資料物件，確認有哪些項目，請：
    console.log(memberStore.user)
    
    使用如下，ex.
    會員 ID：{{ memberStore.user?.ID }}
    帳號：{{ memberStore.user?.email }}

    補充：用 ?. 運算子，如果前面是 null 或 undefined，就停止，不要往下讀屬性，直接回傳 undefined
    
4. 其他方法大家用不到，負責人已經處理好了，若有需要再詢問

*/
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMemberStore = defineStore('Member', () => {
    const user = ref(null)        // 目前登入的使用者物件（未登入為 null）
    // const token = ref(localStorage.getItem('token') || null)     // 讀 localStorage，讓刷新仍保留登入狀態
    const token = ref(localStorage.getItem('token') || null)     // 讀 localStorage，讓刷新仍保留登入狀態
    const loading = ref(false)    // 登入狀態

    // 一定要 return 布林值
    const isAuthed = computed(() => 
        Boolean(user.value && token.value)  // 同時有 user 和 token 才代表登入
    )
    const userName = computed(() =>  
        user.value?.name || '訪客'         // 頁面顯示用，沒登入就顯示'訪客'
    )

    /**
    驗證 token 是否仍有效（向後端 verify.php  詢問）
    僅在後端明確回覆「無效/過期」時才做登出。
    網路錯誤或 CORS 問題 → 不主動登出，回傳 { ok:false, reason:'network' }
    */
    async function verifyToken () {
        console.log(token.value)
      if (!token.value) return { ok: false, reason: 'no-token' }
      
      try {
        const res = await fetch(import.meta.env.VITE_AJAX_URL + 'Member/verify.php', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                // 後端用這個拿 token：Authorization: Bearer <token>
                'Authorization': `Bearer ${token.value}`,
            },
            // 如果你的後端要用 Session 再一起驗證，就開啟這行
            // credentials: 'include',
            body: JSON.stringify({})   // 有些伺服器要求 POST 不能是空 body
        })
        // 後端建議固定回 200，內容長這樣：
        // { valid: true,  user: {...} }  或  { valid: false, reason: 'expired' }
        const data = await res.json().catch(() => ({}))

        if (data?.valid === true) {
            // 可選：後端若回 user，就同步更新
            if (data.user) {
                user.value = data.user
                localStorage.setItem('user', JSON.stringify(data.user))
            }
            return { ok: true }
        }

        // 明確無效/過期
        if (data?.valid === false) {
            logout()
            return { ok: false, reason: data.reason || 'invalid' }
        }
        // 非預期格式，也不要亂登出
        return { ok: false, reason: 'bad-format' }
      } catch (err) {
        // 網路/CORS/預檢錯誤都進這裡：不要登出
        console.warn('[verifyToken] network error:', err)
        return { ok: false, reason: 'network', error: err }
      }
    }

    async function loginByEmail({ email, password}) {
        loading.value = true
        try {
            const res =await fetch(import.meta.env.VITE_AJAX_URL + 'Member/login2.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })                                                            // 成功時把 user、token 同步存到 store + localStorage
            const data = await res.json()
            if(!data.success) throw new Error(data.message || '登入失敗')
            
            // 後端回傳需要含 user 與 token
            user.value = data.user
            token.value = data.token
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            return { ok: true, data }                                  // 成功：把 user、token 存進 store 與 localStorage，讓重新整理也記得
        } catch (err) {
            return { ok: false, error: err.message || String(err) }
        } finally {
            loading.value = false     // 送出 loading = true，等結束 finally 設回 false。
        }
    }

    // 註冊
    async function register(formData) {
        loading.value = true
        try {
            const res = await fetch(import.meta.env.VITE_AJAX_URL + 'Member/register.php', {
                method: 'POST',
                credentials: 'omit',
                headers: { Accept: 'application/json' },
                body: formData,
            })
            const contentType = res.headers.get('content-type') || ''
            let data = null
            let text = ''
            if (contentType.includes('application/json')) {
                data = await res.json().catch(() => null)
            } else {
                text = await res.text().catch(() => '')
            }

            // 統一成功條件：success=true 或 ok=true 或 code===0
            const successFlag =
                (data && (data.success === true || data.ok === true || data.code === 0)) // 定義 successFlag（原本未宣告就使用）
                || (!data && res.ok && /成功/.test(text))
            if (!successFlag) {
                const msg =
                    (data && (Array.isArray(data.errors) && data.errors[0])) ||
                    (data && (data.message || data.error)) ||
                    (text || `註冊失敗（HTTP ${res.status}）`)
                return { ok: false, error: msg, raw: { status: res.status, data, text } }
            }
            return { ok: true, data: data ?? { message: text } }
        } catch (err) {
            return { ok: false, error: err.message || '伺服器發生錯誤' }
        } finally {
            loading.value = false
        }
    }

    // 登出                    // 清掉 store 和 localStorage，變回未登入
    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    // 網頁重新整理後，呼叫 hydrate() 就能把 user 從 localStorage 補回來
    /* function hydrate() {
        const raw = localStorage.getItem('user')
        if (raw) {
            try {
                user.value = JSON.parse(raw)
            } catch {}
        }
    } */

    function hydrate() {
    const storageUser = localStorage.getItem('user')
    const storageToken = localStorage.getItem('token')

    if (storageUser) {
        user.value = JSON.parse(storageUser)
    }
    if (storageToken) {
        token.value = storageToken
    }
    }

    return {
        user, 
        token, 
        loading, 
        isAuthed, 
        userName, 
        loginByEmail, 
        register,
        logout, 
        hydrate,
        verifyToken
    }

})