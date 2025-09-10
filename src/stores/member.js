import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMemberStore = defineStore('Member', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)
    const loading = ref(false)

    // 一定要 return 布林值
    const isAuthed = computed(() => 
        Boolean(user.value && token.value)
    )
    const userName = computed(() => 
        user.value?.name || '訪客'
    )

    async function loginByEmail({ email, password}) {
        loading.value = true
        try {
            const res =await fetch(import.meta.env.VITE_AJAX_URL + 'Member/login2.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if(!data.success) throw new Error(data.message || '登入失敗')
            
            // 後端回傳需要含 user 與 token
            user.value = data.user
            token.value = data.token
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            return { ok: true, data }
        } catch (err) {
            return { ok: false, error: err.message || String(err) }
        } finally {
            loading.value = false
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
                (data && (data.success === true || data.ok === true || data.code === 0)) // ✅ 定義 successFlag（原本未宣告就使用）
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

    // 登出
    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    // 重新整理後把 user 補回來（token 已在 state 初始化取過）
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