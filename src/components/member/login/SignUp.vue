<template>
    <div class="login-all">
        <div class="login-one">
            <h2>LOGIN</h2>
        </div>

        <div class="tabs">
            <button class="tabs-btn-active button--normal" data-tab="login">登入</button>
            <button class="tabs-btn button--normal"  data-tab="register">註冊</button>
        </div>

        <div class="email-area">
            <!-- <form @submit.prevent="handleSubmit"> -->
                <input type="email" class="email-1" placeholder="請輸入信箱" v-model="email" required />
            <!-- </form> -->
        </div>

        <div class="password-area">
            <input type="password" class="password-1" placeholder="請輸入密碼" required>
            <!-- <span class="toggle" id="togglePassword">👁️</span> -->
        </div>

            

    </div>
</template>





<script setup></script>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.login-all{
    width: 100vw;
    height: calc(100vh - 50px);
    border: 1px solid red;

    // background-color: #000;
    background-image: url(../../assets/images/member/login-bgi.png);
    background-size: cover;
    
}
.tabs{
    display: flex;
    gap: 12px;
    justify-content: center;
    text-align: center;
    margin-top: 20px;   
}
.login-one h2{
    font-size: $pcEngFont-banner;
    color: $primaryColor-500;
    text-align: center;
    margin-top: 100px;
}

.tabs-btn-active{
    border: none;
    width: 291px;
    height: 61px;
    background-color: $primaryColor-500;
    font-size: $pcChFont-H4;
    color: $FontColor-white;
}
.tabs-btn{
    border: none;
    width: 291px;
    height: 61px;
    background-color: $primaryColor-500;   // 顏色待確認
    font-size: $pcChFont-H4;
    color: $FontColor-white;
}

// 信箱
.email-area{
   margin-top: 20px;
   

    
}
.email-1{
    width: 558px;
    height: 40px;
    padding: 16px;
    font-size: $pcChFont-H4;
}    

// 密碼
.password-1{
    width: 558px;
    height: 40px;
    padding: 16px;
    font-size: $pcChFont-H4;
}
</style>