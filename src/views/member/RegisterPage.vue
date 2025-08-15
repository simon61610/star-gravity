<template>      <!----註冊畫面----->
    <div class="register-all">
        <!-- <div class="login-one decTitle--medium" >
            <h2>LOGIN</h2>
        </div> -->

        <div class="tabs">
            <button class="tabs-btn-active button--normal" data-tab="login">登入</button>
            <button class="tabs-btn button--normal"  data-tab="register">註冊</button>
        </div>

        <div class="second-area">
            <form @submit.prevent="handleRegister">
                <div class="name">
                    <input type="name" class="name-1" placeholder="請輸入姓名" v-model="name" required />
                </div>
                <div class="phone">
                    <input type="phone" class="phone-1" placeholder="請輸入電話" v-model="phone" required />
                </div>
                <!------勾選性別--------->
                <div class="gender-group">
                   <label>
                   <input type="radio" value="男性" v-model="gender" />男性
                   </label>
                   <label>
                   <input type="radio" value="女性" v-model="gender" />女性
                   </label>
                   <label>
                   <input type="radio" value="第三性" v-model="gender" />第三性
                   </label>
               </div>
               <!------選擇縣市--------->
               <!------選擇區域--------->
               <!------地址--------->
               <div class="adress">
                    <input type="adress" class="adress-2" placeholder="請輸入地址" v-model="adress" required />
                </div>
               <!------信箱--------->
               <div class="email">
                    <input type="email" class="email-2" placeholder="請輸入信箱" v-model="email" required />
                </div>
                <!----可帶入element寫(暫時還沒)----->
                <div class="password">
                    <input type="password" class="password-2" placeholder="請輸入密碼" v-model='password' required>
                    <!-- <span class="toggle" id="togglePassword">👁️</span> -->
                </div>
                <div class="password">
                    <input type="password" class="password-2" placeholder="請再次輸入密碼" v-model='password' required>
                    <!-- <span class="toggle" id="togglePassword">👁️</span> -->
                </div>
                
                <div class="captcha-group-1">
                    <!-- 輸入驗證碼框 -->
                    <input v-model="captcha" type="text" class="captcha-2" placeholder="輸入驗證碼" required />
            
                    <!-- 灰色驗證碼格子 -->
                    <div class="captcha-code-1">{{ captchaCode }}</div>
            
                    <!-- 刷新按鈕 -->
                    <button class="refresh-btn-1" @click="captchaCode = genCode()">
                        <img src="../../assets/icons/refresh.svg" alt="">
                    </button>
                </div>
                <!-- 送出按鈕 -->
                <button class="register-btn" type="submit">送出</button>
                
            </form>
        </div>
    
    </div>
</template>



<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.register-all{
    width: 100%;
    height: calc(100vh + 50px);
    background-image: url(../../assets/images/member/login-bgi.png);  
    background-size: cover;
    margin-top: 0;
}
.tabs{
    display: flex;
    gap: 12px;
    justify-content: center;
    text-align: center;
    padding-top: 40px;
    
}
// .login-one h2{
//     color: $primaryColor-500;
//     text-align: center;
//     padding-top: 15px;
// }
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
.second-area{
    width: 600px;
    margin: 0 auto;
    margin-top: 10px;
    padding-left: 16px;
}
// 姓名
.name{
    margin-top: 20px;
    margin-bottom: 20px;
}
.name-1{
    width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}
// 電話
.phone{
    margin-top: 20px;
    margin-bottom: 20px;
}
.phone-1{
    width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}
.gender-group{
    display: flex;
    gap: 15px;
}
.gender-group label{
    color: $FontColor-white;
    font-size: $pcChFont-p;
}
.adress{
    margin-top: 20px;
    margin-bottom: 20px;
}
.adress-2{
    width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}
.email{
    margin-top: 20px;
    margin-bottom: 20px;
}
.email-2{
    width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}
.password{
    margin-top: 20px;
    margin-bottom: 20px;
}
.password-2{
    width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}
.captcha-group-1{
    display: flex;
    gap: 10px;
    margin: 0 auto;
    margin-top: 20px;
}
.captcha-2{
    width: 385px;
    height: 45px;
    font-size: $pcChFont-small;
    padding-left: 12px;
}
.captcha-code-1{
    background-color: $FontColor-gray;
    font-size: $pcChFont-small;
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
}
.refresh-btn-1{
    background-color: transparent;
    border: none;
}
.refresh-btn-1 img{
    width: 30px;
}
.register-btn{
    background-color: $primaryColor-500;
    color: $FontColor-white;
    font-size: $pcChFont-p;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 60px;
    width: 470px;
    height: 45px;
}
</style>

<script setup>
    import { ref } from 'vue'
    
    // 勾選性別
    const gender = ref('')
    

    const tab = ref('login')
    const email = ref('')
    const password = ref('')
    const captcha = ref('')
    const showPassword = ref(false)
    const captchaCode = ref('TJD102')

    const handleRegister = () => {
    alert('註冊成功！（假資料測試）')
    }

</script>

