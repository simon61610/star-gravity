<template>    <!-----忘記密碼1------->
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
    font-size: $pcChFont-p;
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
</style>

<script setup>
    // 新增
    import { useRouter } from 'vue-router'
    import { ElMessage } from 'element-plus' 
    import { ref } from 'vue'

    const router = useRouter()
    const email = ref('')
    const loading = ref(false)
    
    // email檢查
    const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v)
    // 返回登入鈕
    function goLogin() {
        router.push('/loginfirst') // 直接到登入頁
    }

    async function sendData() {
        if (!isValidEmail(email.value)) {
            ElMessage ? ElMessage.error('請輸入有效的 Email') : alert('請輸入有效的 Email')
            return
        }
        loading.value = true
        try {
            // TODO: 換成真的 API
            // await axios.post('/api/auth/forgot', { email: email.value })
            await new Promise((r) => setTimeout(r, 500)) // 模擬呼叫

            // FIX: 導到「第二步」的 forgot 子頁，路徑在 /loginfirst/forgot
            router.push({
                path: '/loginfirst/forgot',
                query: { sent: '1', email: email.value } // NOTE: 看你要不要在下一頁讀取這些 query
            })

            // 帶著參數到 ForgotPage，進頁後會彈出「驗證碼已發送」
            // router.push({ path: '/forgot', query: { sent: '1', email: email.value } })
        } catch (e) {
            ElMessage ? ElMessage.error('傳送失敗，請稍後再試') : alert('傳送失敗，請稍後再試')
        } finally {
            loading.value = false
        }
    }

</script>