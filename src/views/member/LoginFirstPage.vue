<script setup>   
    import { useRoute, useRouter } from 'vue-router'
    import { ref, computed, onMounted } from 'vue'
    import { useMemberStore } from '@/stores/member'
    import shopToast from '@/components/common/shopToast.vue'         
    import { showToast } from '@/composables/useToast'

    const router = useRouter()
    const route = useRoute()
    const memberStore = useMemberStore()
    memberStore.hydrate()

    const errMsg = ref('')  // 錯誤訊息顯示用

    // localStorage key：只存 token（是否登入就看有沒有 token）
    // const LS_TOKEN = 'token'

    const email = ref('')
    const pwd1 = ref('')
    const captcha = ref('')
    const loading = computed(() => 
        memberStore.loading
    )
    // const loading = ref(false)

    // 驗證碼
    const captchaCode = ref('')
    const genCode = () => Math.random().toString(36).slice(2, 8).toUpperCase()

    // 頁面載入時驗證碼會重新跑一次
    onMounted(() => {
        captchaCode.value = genCode()  
    })

    function refreshCode() {
        captchaCode.value = genCode()
    }

    /* 信箱、密碼基本檢查樣式 */
    const MIN_PWD_LEN = 6
    const emailRe = /\S+@\S+\.\S+/

    // 判斷在哪頁
    const isLogin    = computed(() => route.path === '/loginfirst')
    const isRegister = computed(() => route.path === '/loginfirst/register')
    const isAuthBg   = computed(() => isLogin.value || isRegister.value) // ← 登入/註冊都有 LOGIN 大字與背景

    /* 按下確認才會執行 */
    const handleSubmit = async () => {
        if (!emailRe.test(email.value)) {
            showToast('請輸入有效的 Email')
            return
        }
        if (pwd1.value.length < MIN_PWD_LEN) {
            showToast(`密碼至少 ${MIN_PWD_LEN} 碼`) 
            return
        }
        if (captcha.value.trim().toUpperCase() !== captchaCode.value.trim().toUpperCase()) {
            showToast('驗證碼錯誤')  
            refreshCode()  // 驗證碼錯誤就刷新
            errMsg.value = '驗證碼錯誤'
            return
        }

        // loading.value = true

        // 呼叫 Pinia 的登入
        const res = await memberStore.loginByEmail({
            email: email.value,
            password: pwd1.value,
        })

        // 停權
        if (res?.code === 'SUSPENDED') {
            const msg = res?.error || res?.message || '此帳號已被停權，請洽客服人員'
            // alert(msg)
            showToast(msg)
            errMsg.value = msg
            refreshCode()
            return
        }

        // 其他登入失敗
        if (!res?.ok) {
            const msg = res?.error || res?.message || '登入失敗'
            // alert(msg)
            showToast(msg)
            errMsg.value = msg
            refreshCode() // 失敗就重產驗證碼
            return
        }
        errMsg.value = ''    // 成功時清空錯誤訊息
        
        // 登入成功 → 導回原頁或預設頁
        const back = route.query.redirect || '/membercenter/personal'
        router.replace(back)
    }

    function handleLoginSuccess (result){
        localStorage.setItem('user', JSON.stringify(result.user))
        setTimeout(() => {
            router.push('/membercenter/personal')
        }, 500)
    }

    
</script>

<template>     
    <div class="login-all" >
        <shopToast />

        <div class="login-one decTitle--big" v-if="isAuthBg">
            <h2>LOGIN</h2>
        </div>

        <div class="tabs" v-if="isAuthBg">
            <RouterLink class="tab" to="/loginfirst" data-tab="login">登入</RouterLink>
            <RouterLink class="tab" to="/loginfirst/register" data-tab="register">註冊</RouterLink>
        </div>

        <div class="area" v-if="isLogin">
            <form @submit.prevent="handleSubmit">
                <div class="email-area">
                    <input type="email" class="email-1" placeholder="請輸入信箱" v-model="email" required />
                </div>
                <!----輸入密碼----->
                <div class="password-area">
                    <el-input
                      v-model="pwd1"
                      class="custom-placeholder"
                      style="width: 578px; height: 50px; font-size: 14px;"
                      type="password"
                      placeholder="請輸入密碼(至少6碼)"
                      show-password
                    />
                </div> 
                        
                <div class="captcha-group">
                    <!-- 輸入驗證碼框 -->         
                    <input v-model="captcha" type="text" class="captcha-1" placeholder="輸入驗證碼(不分大小寫)" required />
            
                    <!-- 灰色驗證碼格子 -->
                    <div class="captcha-code">{{ captchaCode }}</div>
            
                    <!-- 刷新按鈕 -->
                    <button type="button" class="refresh-btn" @click.prevent="refreshCode">
                        <img src="@/assets/icons/refresh.svg" alt="" />
                    </button>
                </div>
                <div class="forget-area">
                    <!--登入按鈕 -->
                    <button class="login-btn" type="submit" :disabled="loading">確認</button>
                    <!--忘記密碼 --> 
                    <div class="forgot">
                        <RouterLink class="forget-link"   to="/loginfirst/forget">忘記密碼?</RouterLink>
                    </div>
                </div>
            </form>

            <div class="or">
                <span>OR</span>
            </div>

            <!--社群登入 -->   
            <div class="social-login">
                <button class="google">
                    <img src="@/assets/images/member/login-google.png" alt="Google">
                </button>
                <button class="line">
                    <img src="@/assets/images/member/line.svg" alt="Line">
                </button>
                <button class="facebook">
                    <img src="@/assets/images/member/facebook.svg" alt="Facebook">
                </button>
            </div>
        </div> 
        <section class="content" v-else>
            <RouterView />
        </section>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.login-all{
    font-family: $chFont;
    width: 100%;
    height: auto;               /* 讓內容自然長高 */
    min-height: 100dvh;         /* 撐滿視窗 */
    overflow: visible;          /* 不在此層產生卷軸 */
    box-sizing: border-box;
    background-image: url(@/assets/images/member/login-bgi.png);
    background-size: cover;
    background-position: center;
    margin-top: 0;
}
.tabs{
    display: flex;
    gap: 12px;
    justify-content: center;
    text-align: center;
    margin-top: 15px;   
}
.login-one h2{
    color: $primaryColor-500;
    text-align: center;
    padding-top: 15px;
}
/*------登入、註冊鈕------------*/
.tab{   
    border: none;
    width: 280px;
    height: 45px;
    background-color: $primaryColor-500; 
    font-size: $pcChFont-H4;
    color: $FontColor-white;
    display: inline-flex;  
    align-items: center;
    justify-content: center;
    text-decoration: none;  
    border-radius: 999px; 
}
.tab:hover{ 
    filter: brightness(1.05); 
}
/* 當前所在頁：變淺紫（表示已選中）*/
.tabs .tab.router-link-exact-active{
    background: #5C4B90;        
    cursor: default;              /* 提示不可點 */
    filter: none;
}
.area{
    width: 600px;
    margin: 0 auto;
    margin-top: 20px;
    padding-left: 16px;
}
/*------信箱------------*/
.email-area{
   margin-top: 20px;
   margin-bottom: 20px;
}
.email-1{
    width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}    
/*------密碼------------*/
.password-1{
    width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}
.custom-placeholder ::v-deep(.el-input__inner::placeholder) {
    color: #000; 
    opacity: 0.5; 
}
/*------驗證碼------------*/
.captcha-group{
    display: flex;
    gap: 10px;
    margin: 0 auto;
    margin-top: 20px;
}
.captcha-1{
    width: 385px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 12px;
}
/*------灰色驗證碼------------*/
.captcha-code{   
    background-color: $FontColor-gray;
    font-size: $pcChFont-small;
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
}
.refresh-btn{
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.refresh-btn img{
    width: 30px;
}
.forget-area{
    display: flex;
    gap: 12px; 
}
.login-btn{
    background-color: $primaryColor-500;
    color: $FontColor-white;
    font-size: $pcChFont-p;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 16px;
    width: 245px;
    height: 45px;
}
.login-btn:disabled {
    opacity: .6;
    cursor: not-allowed;
}
.forgot{
    font-size: $pcChFont-p;
    margin-top: 16px;
    width: 295px;
    height: 61px;
    text-align: center;
    line-height: 50px;
}
.forgot a{
    color: #ffffff;
    text-decoration: none;
}
.forget-link {
  color: #ffffff;
  text-decoration: none;
}
.or {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: $pcChFont-H4;
    color: $FontColor-white;
}
.or::before, .or::after {
    content: "";
    flex: 1;
    border-top: 1px solid #ccc;
    margin: 20px 10px;
}
.social-login{
    display: flex;
    gap: 30px;
    justify-content: center;
}
.google{
    background-color: transparent;
    border: none;
}
.google img{
    width: 35px;
    height: 35px;
}
.line{
    background-color: transparent;
    border: none;
}
.line img{
    width: 35px;
    height: 35px;
}
.facebook{
    background-color: transparent;
    border: none;
}
.facebook img{
    width: 35px;
    height: 35px;
}

/*----------斷點------------*/
@media screen and (max-width: 901px) {

    .login-all{
        min-height: 100dvh;
        overflow-x: hidden;            /* 保險，避免殘留橫向卷軸 */
        padding: 0 10px 40px;
        background-position: center top;
    }
    .tabs{
        gap: 8px;
        padding: 0 8px;
    }
    .tab{
        width: 100%;
        max-width: 300px;
        height: 44px;
        font-size: 16px;
    }
    .area{
        width: 100%;
        margin-top: 12px;
        padding: 0 12px;
        box-sizing: border-box;
    }
    /* 信箱 input → 全寬 */
    .email-1{
        width: 100%;
        height: 48px;
        font-size: 16px;
        padding-left: 12px;
        box-sizing: border-box;
    }
    /* 密碼 el-input 三層全寬 */
    .custom-placeholder{
        display: block;
        width: 100% !important;
    }
    .custom-placeholder :deep(.el-input){
        width: 100% !important;
    }
    .custom-placeholder :deep(.el-input__wrapper){
        width: 100% !important;
        height: 48px;
        padding: 0 12px;
        box-sizing: border-box;
    }
    .custom-placeholder :deep(.el-input__inner){
        height: 48px;
        font-size: 16px;
    }
    /* 驗證碼區塊 → grid，讓三格不撐爆 */
    .captcha-group{
        display: grid;
        grid-template-columns: 1fr 100px 32px;
        column-gap: 8px;
        align-items: center;
        margin-top: 12px;
    }
    .captcha-1{
        width: 100%;
        height: 48px;
        font-size: 16px;
        padding-left: 12px;
        box-sizing: border-box;
    }
    .captcha-code{
        width: 100%;
        height: 48px;
        line-height: 48px;
        font-size: 16px;
    }
    .refresh-btn img{
        width: 24px;
        height: 24px;
    }
    /* 登入按鈕／忘記密碼：垂直排列、全寬 */
    .forget-area{
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 12px;
        align-items: center;
    }
    .login-btn{
        width: 100%;
        height: 48px;
        margin: 12px 0 0 0;
        font-size: 16px;
        border-radius: 999px;
    }
    .forgot{
        margin: 0;
        width: 100%;
        height: auto;
        line-height: 1.6;
        text-align: center;
    }
}

@media screen and (max-width: 651px) {
    
    .login-all{
        padding: 0 8px 40px;
        overflow-x: hidden;              /* 保險：避免殘留橫向卷軸 */
        background-position: center top;
    }
    /* 標籤列：允許換行，兩個 Tab 平均分配 */
    .tabs{
        gap: 8px;
        padding: 0 6px;
        flex-wrap: wrap;
    }
    .tab{
        flex: 1 1 0;
        max-width: none;
        height: 44px;
        font-size: 16px;
    }
    /* 內容區 */
    .area{
        width: 100%;
        margin-top: 12px;
        padding: 0 8px;
        box-sizing: border-box;
    }
    /* Email 輸入：全寬 + 縮小高度/字級 */
    .email-1{
        width: 100%;
        height: 44px;
        font-size: 14px;
        padding-left: 12px;
        box-sizing: border-box;
    }
    /* 密碼 el-input 三層全寬，並縮高度/字級 */
    .custom-placeholder{
        display: block;
        width: 100% !important;
    }
    .custom-placeholder :deep(.el-input){
        width: 100% !important;
    }
    .custom-placeholder :deep(.el-input__wrapper){
        width: 100% !important;
        height: 44px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 0;
    }
    .custom-placeholder :deep(.el-input__inner){
        height: 44px;
        font-size: 14px;
    }
    /* 驗證碼：用 grid 避免撐爆，三欄分別是 輸入框 / 顯示碼 / 刷新鈕 */
    .captcha-group{
        display: grid;
        grid-template-columns: 1fr 96px 28px;
        column-gap: 8px;
        align-items: center;
        margin-top: 10px;
    }
    .captcha-1{
        width: 100%;
        height: 44px;
        font-size: 14px;
        padding-left: 12px;
        box-sizing: border-box;
    }
    .captcha-code{
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
    }
    .refresh-btn img{
        width: 22px;
        height: 22px;
    }
    /* 登入按鈕 / 忘記密碼：改為直向排列、全寬 */
    .forget-area{
        display: grid;
        grid-template-columns: 1fr auto; /* 左：按鈕，右：連結 */
        column-gap: 12px;
        align-items: center;
    }
    .login-btn{
        width: 95%;
        height: 48px;
        margin: 12px 0 0 0;     /* 與連結同一基準線 */
        font-size: 16px;
        border-radius: 999px;
    }
    .forgot{
        margin: 0;
        width: 100%;
        height: auto;
        line-height: 1.6;
        text-align: center;
    }
    /* OR 分隔線與社群按鈕微調 */
    .or{ 
        font-size: 18px; 
    }
    .or::before, .or::after{
        margin: 16px 8px;
    }
    .social-login{
        gap: 20px;
    }
    .social-login img{
        width: 30px;
        height: 30px;
    }
}

@media screen and (max-width: 433px) {
    .login-all{
        height: auto;
        min-height: calc(100vh - 50px);
        padding: 16px 12px 40px;
        background-size: cover;
        background-position: center;
        overflow-y: visible;
    }
    .login-one h2{
        padding-top: 8px;
        font-size: 100px; 
        line-height: 1.1;
    }
    .tabs{
        gap: 8px;
        padding: 0 4px;
        margin-top: 12px;
    }
    .tab{
        flex: 1 1 auto;
        width: auto;
        height: 40px;
        font-size: 16px;
        border-radius: 999px;
    }
    /* 內容區：改為全寬 */
    .area{
        width: 100%;
        margin-top: 16px;
        padding: 0 4px;
    }
    /* 表單欄位 */
    .email-1, .captcha-1{
        width: 100%;
        height: 44px;
        font-size: 14px;
        padding-left: 12px;
        box-sizing: border-box;
    }
    /* 覆蓋 el-input 在 template 內的 inline 寬度*/
    .custom-placeholder{
        width: 100% !important;
        height: auto !important;
    }
    /* Element Plus v2（wrapper）/ v1（inner）都一起照顧到 */
    .custom-placeholder ::v-deep(.el-input__wrapper){
        width: 100% !important;
        height: 44px;
        padding-left: 12px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .custom-placeholder ::v-deep(.el-input__inner){
        height: 44px;
        font-size: 14px;
    }
     /* 驗證碼區 */
    .captcha-group{
        display: grid;
        grid-template-columns: 1fr 96px 32px;
        column-gap: 8px;
        align-items: center;
        margin-top: 12px;
    }
    .captcha-code{
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: $pcChFont-small;
    }
    .refresh-btn img{
        width: 24px;
        height: 24px;
    }
    /* 登入與忘記密碼 */
    .forget-area{
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
    }
    .login-btn{
        width: 100%;
        height: 44px;
        margin: 16px 0 0 0;    /* 移除左邊距 */
        font-size: 16px;
    }
    .forgot{
        margin: 0;
        width: 100%;
        height: auto;
        text-align: right;
        line-height: normal;
        font-size: 14px;
    }
    .forget-link{ 
        text-decoration: underline; 
        padding-right: 5px;
    }
    .or{
        font-size: 16px;
        margin-top: 8px;
    }
    .or::before, .or::after{
        margin: 16px 8px;
    }
    .social-login{
        gap: 20px;
        margin-top: 6px;
    }
    .google img, .line img, .facebook img{
        width: 32px;
        height: 32px;
    }

}
</style>

