<template>     <!----登入畫面----->
    <div class="login-all">
        <div class="login-one decTitle--big" >
            <h2>LOGIN</h2>
        </div>

        <div class="tabs">
            <button class="tabs-btn-active button--normal" data-tab="login">登入</button>
            <button class="tabs-btn button--normal"  data-tab="register">註冊</button>    <!----連結到註冊畫面----->
        </div>

        <div class="area">
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
                      placeholder="請輸入密碼"
                      show-password
                    />
                </div> 
                        
                <div class="captcha-group">
                    <!-- 輸入驗證碼框 -->         
                    <input v-model="captcha" type="text" class="captcha-1" placeholder="輸入驗證碼" required />
            
                    <!-- 灰色驗證碼格子 -->
                    <div class="captcha-code">{{ captchaCode }}</div>
            
                    <!-- 刷新按鈕 -->
                    <button class="refresh-btn" @click="captchaCode = genCode()">
                        <img src="@/assets/icons/refresh.svg" alt="">
                    </button>
                </div>
                <div class="forget-area">
                    <!--登入按鈕 -->
                    <button class="login-btn" type="submit">登入</button>
    
                    <!--忘記密碼 --> <!----連結到忘記密碼forget畫面----->
                    <div class="forgot">
                        <router-link to="/ ">忘記密碼?</router-link>
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
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.login-all{
    width: 100%;
    height: calc(100vh - 50px);
    background-image: url(@/assets/images/member/login-bgi.png);
    background-size: cover;
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
.tabs-btn-active{    // 登入鈕
    border: none;
    width: 280px;
    height: 45px;
    background-color: #5C4B90;
    font-size: $pcChFont-H4;
    color: $FontColor-white;
}
.tabs-btn{            // 註冊鈕
    border: none;
    width: 280px;
    height: 45px;
    background-color: #5C4B90;   
    font-size: $pcChFont-H4;
    color: $FontColor-white;
}
.area{
    width: 600px;
    margin: 0 auto;
    margin-top: 20px;
    padding-left: 16px;
}
// 信箱
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
// 密碼
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
// 驗證碼
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
// 灰色驗證碼
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
</style>

<script setup>

    import { ref } from 'vue'

    const email = ref('')
    const pwd1 = ref('')
    const captcha = ref('')

    const captchaCode = ref('TJD102')
    const genCode = () => Math.random().toString(36).slice(2, 8).toUpperCase()

    const handleSubmit = () => {
    // if (captcha.value !== captchaCode.value) return;
    alert('登入成功！')
    }

</script>