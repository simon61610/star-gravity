<template>      <!-----忘記密碼輸入驗證碼------->

    <div class="forget-all2">

        <div class="all2">
            <div class="forget-two" >
                <h2>忘記密碼</h2>
            </div>

            <div class="codeTo">
                <input v-model="code" type="text" class="codeto" placeholder="請輸入驗證碼"/> 

                <button class="btnbtn" @click="resend" :disabled="countdown>0">
                    {{ countdown>0 ? countdown+'秒後' : '重新發送' }}
                </button>
            </div>

            <div class="btntwo">
                <button class="btn" @click="changeEmail">重新輸入信箱</button>
                <button class="btn" @click="submit">送出</button>
            </div>
            
        </div>
   
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.forget-all2{
    width: 100%;
    min-height: calc(100vh - 350px);
    background-image: url(@/assets/images/member/login-bgi.png);  
    background-size: cover;
    margin-top: 0;
}
.all2{
    padding-top: 50px;
}
.forget-two{
    background-color: $primaryColor-800;
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
    gap: 20px;
    margin: 0 auto;
    margin-top: 20px;
}
.codeto{
    width: 385px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 12px;
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
    
    import { ref } from 'vue'

    // 定義響應式變數，預設空字串
    const code = ref('')

    const countdown = ref(0)
    let timer = null

    function resend() {
    if (countdown.value > 0) return
    countdown.value = 60
    timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) clearInterval(timer)
    }, 1000)
    console.log('重新發送驗證碼')
    }

    function submit() {
    console.log('送出驗證碼:', code.value)
    }

    function changeEmail() {
    console.log('重新輸入信箱')
    }




</script>