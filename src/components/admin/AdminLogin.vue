<script setup>
import  logoadmin from '@/assets/logos/logo-admin.svg'
import { useAuthStore } from '@/stores/admin.js'   // 匯入你剛剛的 store
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// const account = ref('')
// const password = ref('')
const router = useRouter()
const admin = useAuthStore()

//表單狀態
const username = ref('')
const password = ref('')
const errorMsg = ref('')  // 錯誤提示訊息


// 登入事件
async function Login() {
  const result = await admin.login(username.value, password.value)  
  // login() return res.data，所以這裡可以拿到 success / message

  if (result.success == true) {
    // 登入成功
    console.log('登入成功，準備跳轉', result)
    router.push({ name: 'AdminMemberPage' }) // 測試成功後導到後台首頁
    console.log('當前路由：', router.currentRoute.value)
  } else {
    // 登入失敗
    console.log('登入失敗', result)
    errorMsg.value = result.message || '帳號或密碼錯誤'
  }
}








// function login(){
//     if(account.value === 'tjd102' && password.value === '20250827'){
//         localStorage.setItem('admin_token', 'fake_admin_token=123456789') //設置一個假的token 名字admin_token ,值fake_admin_token=123456789
//         router.push('/AdminMemberPage') //正確就跳轉管理頁面 等於({ path: '/AdminMemberPage' })
//     }
//     else{
//         alert('登入失敗請離開')
//     }
// }

</script>

<template>
    <section class="admin-login-section">
        <figure class="admin-login-logo" >
            <router-link to="/"><img :src="logoadmin" alt=""></router-link>
        </figure>

        <div class="admin-login-input">

            <div class="admin-login-h4">
                <h4>星引力後台管理系統</h4>
            </div>

            <div class="admin-login-account">
                <el-input v-model= "username" style="width: 460px" placeholder="請輸入帳號" />
            </div>

            <div>
                <el-input class="admin-login-password"
                    v-model="password"
                    style="width: 460px"
                    type="password"
                    placeholder="請輸入密碼"
                    show-password/>
            </div>
            <div class="admin-login-button">
                <button @click="Login">登入</button>
                <!-- <router-link to="/AdminMemberPage"></router-link> -->
            </div>
        </div>
    </section>
     
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
.admin-login-section{
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    box-sizing: border-box;
    .admin-login-logo{
    
        max-width: 250px;
        width: 100%;
        img{
            
            width: 100%;
            height: auto;
        }
    }
.admin-login-input{
   
    .admin-login-h4{
        margin-top: 55px;
        margin-bottom: 40px;
        display: flex;
        justify-content: center;
    }
    .admin-login-account{
        margin-bottom: 20px;
    }

    .admin-login-password{
        margin-bottom: 40px
    }
    .admin-login-button{
        width: 100%;
       
        display: flex;
        justify-content: center;
     
        button{
            border-radius: 20px;
            width: 150px;
            height: 36px;
            &:active{
            transform: translate(4px,4px);
            }
            &:hover{
            cursor: pointer;
            font-weight: bold;
            
            }

        }
    }
}
}
</style>