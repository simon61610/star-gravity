<script setup>
import  logoadmin from '@/assets/logos/logo-admin.svg'
import { ref } from 'vue'
const inputpass = ref('')
const input = ref('')
</script>

<template>
    <section class="admin-login-section">
        <figure class="admin-login-logo" >
            <img :src="logoadmin" alt="">
        </figure>

        <div class="admin-login-input">

            <div class="admin-login-h4">
                <h4>星引力後台管理系統</h4>
            </div>

            <div class="admin-login-account">
                <el-input v-model="input" style="width: 460px" placeholder="請輸入帳號" />
            </div>

            <div>
                <el-input class="admin-login-password"
                    v-model="inputpass"
                    style="width: 460px"
                    type="password"
                    placeholder="請輸入密碼"
                    show-password/>
            </div>
            <div class="admin-login-button">
                <router-link to="/AdminHomePage"><button>登入</button></router-link>
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