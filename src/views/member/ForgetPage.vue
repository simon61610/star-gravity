<script setup>
    // 新增
    import { useRouter } from 'vue-router'
    import { ElMessage } from 'element-plus' 
    import { ref } from 'vue'
    import axios from 'axios'

    const router = useRouter()
    const email = ref('')
    const loading = ref(false)
    const message = ref('')
    
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

        checkEmailCurrent()

        // loading.value = true
    }    


    //驗證碼彈跳
    const alertIsShow = ref(false)
    function alertCancel(){
        alertIsShow.value =false
    }
    const checkEmailCurrent = async()=>{
        try{   
            const res = await axios.post(import.meta.env.VITE_AJAX_URL + 'Member/checkEmailCurrent.php',
                { email: email.value }
            )
            console.log(123);
            console.log(res.data.exist);
            message.value = res.data.message
            alertIsShow.value = true            
        }catch(error){
            console.log("取資料失敗");
        }
        alertIsShow.value = true
    }

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

        <!-- 重設密碼彈跳窗 -->
        <section class="alert-prompt" v-if="alertIsShow">
            <div class="box">
                <h3>{{message}}</h3>
                <div class="btns">
                    <button @click="alertCancel">確認</button>
                </div>
            </div>
        </section>
        
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

//重設密碼彈跳窗
.alert-prompt {
        position: fixed;
        inset: 0;
        display: flex;
        background: rgba(0,0,0,0.5);
        justify-content: center;
        align-items: center;

        z-index: 600;  //至少要500 地點那邊才跳得出來

        .box {
            padding: 24px;
            background-color: $primaryColor-900;
            border-radius: 12px;
            text-align: center;

            h3 {
                margin-bottom: 40px;
                font-size: 24px;
                color: white;
            }
            .btns {
                display: flex;
                justify-content: center;
                gap: 20px;
                button {
                    font-size: 16px;
                    border: none;
                    background-color: $secondaryColor-orange;
                    color: white;
                    padding: 8px 20px;
                    cursor: pointer;
                    border-radius: 999px;
                }
            }
        }
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

