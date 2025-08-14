<template>    <!-----忘記密碼1------->
    <div class="forget-all">
        <div class="all">
            <div class="forget-one" >
                <h2>忘記密碼</h2>
            </div>

            <div class="email-input">
                <input type="email" class="email-3" placeholder="請輸入信箱" v-model="email" required />
            </div>

            <div class="button-forger">
                <button class="btn" @click="goLogin">回到登入畫面</button>
                <button class="btn" @click="sendData">傳送</button>
            </div>
        </div>
        
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.forget-all{
    width: 100%;
    height: calc(100vh - 350px);
    background-image: url(../../../assets/images/member/login-bgi.png);  
    background-size: cover;
    margin-top: 0;
}
.all{
    padding-top: 50px;
}
.forget-one{
    background-color: $primaryColor-800;
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
.button-forger{
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
    import { ref } from 'vue'

    // 定義一個響應式變數 email
    const email = ref('')

    function goLogin() {
    console.log("回到登入畫面");
    // 這裡可以加上路由跳轉，例如：
    // router.push('/login')
    }

    function sendData() {
    console.log("資料已送出");
    // 這裡可以觸發送資料的 API
    }
</script>