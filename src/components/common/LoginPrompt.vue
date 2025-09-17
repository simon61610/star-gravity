<script setup>

    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter()
    const route = useRoute()

    const emit = defineEmits(['close'])

    const goLogin = () => {
        router.push({
            path: "/loginfirst",
            query: { backTo: route.fullPath } // 帶參數導回原本的頁面
        })
    }

    const cancel = () => {
        emit('close')
    }

</script>



<template>
    <section class="login-prompt">
        <div class="box">
            <h3>請先登入會員</h3>
            <div class="btns">
                <button @click="goLogin">馬上登入</button>
                <button @click="cancel">稍後登入</button>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .login-prompt {
        position: fixed;
        inset: 0;
        display: flex;
        background: rgba(0,0,0,0.5);
        justify-content: center;
        align-items: center;

        z-index: 5000;

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


</style>