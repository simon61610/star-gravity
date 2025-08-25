<template>      <!-----忘記密碼輸入驗證碼------->
        <div class="all2">
            <div class="forget-two" >
                <h2>忘記密碼</h2>
            </div>

            <div class="codeTo">
                <input v-model="code" type="text" class="codeto" placeholder="請輸入驗證碼"/> 

                <button class="btnbtn" @click="resend" :disabled="countdown > 0">
                    {{ countdown>0 ? countdown+'秒後' : '重新發送' }}
                </button>
            </div>

            <div class="btntwo">
                <button class="btn" type="button" @click="changeEmail" :disabled="loading">重新輸入信箱</button>
                <button class="btn" type="button" @click="submit" :disabled="loading || !isCodeValid">送出</button>
            </div>
            
        </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.all2{
    padding-top: 50px;
}
.forget-two{
    // background-color: $primaryColor-800;
    width: 280px;
    height: 50px;
    border-radius: 8px;
    margin: 0px auto;
}
.forget-two h2{
    font-size: $pcChFont-H4;
    color: $FontColor-white;
    line-height: 50px;
    text-align: center;
}
.codeTo{
    width: 500px;
    display: flex;
    gap: 15px;
    margin: 0 auto;
    justify-content: center;
    margin-top: 20px;
}
.codeto{
    width: 320px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 10px;
}
.btnbtn{    // 重新發送
    width: 80px;
    height: 35px;
    margin-top: 10px;
}
.btntwo{
    margin: 0 auto;
    width: 500px;
    margin-top: 10px;
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
    
    import { ref, computed, onBeforeUnmount } from 'vue'
    import { useRouter, useRoute } from 'vue-router'

    const router = useRouter()
    const route  = useRoute()
    /* ------ 狀態 --------- */
    const code = ref('')               // 使用者輸入的驗證碼
    const loading = ref(false)       // 與後端互動時的 loading
    const countdown = ref(0)           // 重新發送倒數（秒）
    let timer = null                   // setInterval 參考

    // 這裡用 6 碼英數
    const isCodeValid = computed(() => /^[z0-9]{6}$/.test(code.value))
    
    /* ----- 行為 -------- */
    // 重新發送驗證碼（並開始倒數）
    function resend() {
        if (countdown.value > 0) return
        countdown.value = 10
        timer = setInterval(() => {
            countdown.value--
            if (countdown.value <= 0) clearInterval(timer)
        }, 1000)
        console.log('重新發送驗證碼')
    }

    // 送出驗證碼 → 成功後導到「重設密碼」頁
    async function submit () {
        if (!isCodeValid.value) {
            alert('請輸入 6 碼驗證碼')
            return
    }
        loading.value = true
        try {
            // TODO: 呼叫後端驗證驗證碼
            // await api.verifyCode({ email: route.query.email, code: code.value })

            // 導頁到 resetpassword（子路由）
            router.push('/loginfirst/resetpassword')
        } finally {
            loading.value = false
        }
    }

    // 回到「輸入信箱」頁
    function changeEmail () {
        router.push('/loginfirst/forget')
    }

    /* 離開頁面時，記得把計時器清掉 */
    onBeforeUnmount(() => {
        if (timer) clearInterval(timer)
    })


</script>