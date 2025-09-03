<script setup>
    // 新增
    import { useRouter } from 'vue-router'
    import { ElMessage } from 'element-plus' 
    import { ref } from 'vue'
    import axios from 'axios'

    const router = useRouter()
    const email = ref('')
    const loading = ref(false)
    
    // email檢查
    const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v)
    // 返回登入鈕
    function goLogin() {
        router.push('/loginfirst') // 直接到登入頁
    }

    // 呼叫後端 API 發送驗證碼
    async function sendData() {
        if (!isValidEmail(email.value)) {
            ElMessage.error('請輸入有效的 Email')
            return
        }

        loading.value = true

        try {
        // 🔑 呼叫後端 API (你需要自己在 PHP 寫一個 /api/auth/forgot 接口)
        const res = await axios.post('/api/auth/forgot', { email: email.value })
        
        // 後端回應統一用訊息，不管 email 存不存在
        if (res.data?.ok) {
        ElMessage.success('驗證碼已發送，請檢查您的信箱')
        // 跳到輸入驗證碼的頁面，例如 /loginfirst/forgot-step2
            router.push({
                path: '/loginfirst/forgot-step2',
                query: { email: email.value }
            })
        }   else {
                ElMessage.error(res.data?.msg || '傳送失敗，請稍後再試')
            }
        } catch (e) {
            console.error(e)
            ElMessage.error('系統錯誤，請稍後再試')
        } finally {
            loading.value = false
        }







    }    







    // async function sendData() {
    //     if (!isValidEmail(email.value)) {
    //         ElMessage ? ElMessage.error('請輸入有效的 Email') : alert('請輸入有效的 Email')
    //         return
    //     }
    //     loading.value = true
    //     try {
    //         await axios.post('/api/auth/forgot', { email: email.value })
    //         await new Promise((r) => setTimeout(r, 500)) // 模擬呼叫

    //         router.push({
    //             path: '/loginfirst/forgot',
    //             query: { sent: '1', email: email.value }
    //         })

    //         // 帶著參數到 ForgotPage，進頁後會彈出「驗證碼已發送」
    //         // router.push({ path: '/forgot', query: { sent: '1', email: email.value } })
    //     } catch (e) {
    //         ElMessage ? ElMessage.error('傳送失敗，請稍後再試') : alert('傳送失敗，請稍後再試')
    //     } finally {
    //         loading.value = false
    //     }
    // }

</script>

<template>   
        <div class="all">
            <div class="forget-one" >
                <h2>忘記密碼</h2>
            </div>

            <div class="email-input">
                <input type="email" class="email-3" placeholder="請輸入信箱" v-model="email" required />
            </div>

            <div class="button-forget">
                <button class="btn" type="button" @click="goLogin" :disabled="loading">回到登入畫面</button>  <!--連結到LoginFirstPage--->
                <button class="btn" type="button" @click="sendData" :disabled="loading">傳送</button>
            </div>
        </div>
        
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.all{
    padding-top: 50px;
}
.forget-one{
    // background-color: $primaryColor-800;
    width: 280px;
    height: 50px;
    border-radius: 8px;
    margin: 0px auto;
}
.forget-one h2{
    font-size: $pcChFont-H4;
    color: $FontColor-white;
    line-height: 50px;
    text-align: center;
}
.email-input{
    width: 500px;
    margin: 20px auto;
}
.email-3{
    width: 484px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 16px;
}
.button-forget{
    margin: 0 auto;
    width: 500px;
}
.btn{
    background-color: $primaryColor-500;
    color: $FontColor-white;
    font-size: $pcChFont-p;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 16px;
    width: 222px;
    height: 45px;
}

@media screen and (max-width: 433px) {
    .all{
        padding-top: 24px;
        min-height: 100vh;
        padding-bottom: 40px;
    }
    /* 標題區塊 */
    .forget-one{
        width: auto;
        height: auto;
        margin: 0 12px;
    }
    .forget-one h2{
        font-size: 20px;
        // line-height: 1.2;
        text-align: center;    
    }
    /* 輸入框 */
    .email-input, .button-forget{
        width: 100%;
        padding: 0 12px;
        margin-top: 12px;
        box-sizing: border-box;
    }
    /* Email 欄位 */
    .email-3{
        width: 100%;
        height: 44px;
        font-size: 14px;
        padding-left: 12px;
        box-sizing: border-box;
    }
    /* 按鈕 */
    .button-forget{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 16px;
    }
    .btn{
        width: 100%;
        height: 44px;
        margin: 0;           /* 移除原本的左邊距與上邊距 */
        font-size: 16px;
        border-radius: 999px;
    }
    .btn:disabled{
        opacity: .6;
        cursor: not-allowed;
    }

}



</style>

