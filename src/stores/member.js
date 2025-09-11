/*

1. 需要會員 id 的地方 → 在頁面或元件直接 memberStore.user?.id 就能取到
2. 要驗證會員身分 → 帶上 memberStore.token 給後端，後端才是最終判斷誰是誰

*/
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMemberStore = defineStore('Member', () => {
    const user = ref(null)        // 目前登入的使用者物件（未登入為 null）
    const token = ref(localStorage.getItem('token') || null)     // 讀 localStorage，讓刷新仍保留登入狀態
    const loading = ref(false)    // 登入狀態

    // 一定要 return 布林值
    const isAuthed = computed(() => 
        Boolean(user.value && token.value)  // 同時有 user 和 token 才代表登入
    )
    const userName = computed(() =>  
        user.value?.name || '訪客'         // 頁面顯示用，沒登入就顯示'訪客'
    )

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
    function hydrate() {
        const raw = localStorage.getItem('user')
        if (raw) {
            try {
                user.value = JSON.parse(raw)
            } catch {}
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
        hydrate
    }

})