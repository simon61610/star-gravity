<script setup>

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// 組件
import CartBanner from '@/components/shop/cart/CartBanner.vue';
import CheckoutStepper from '@/components/shop/cart/CheckoutStepper.vue';

// 進度條: 傳屬性值讓子組件接收並套用
const route = useRoute()

const step = computed(() => { // 控制 process
  if (route.name == 'cartform') return 2
  if (route.name == 'cartsuccess') return 3
  return 1
})

const steps = ['準備結帳', '填寫資料', '完成訂單'] // 步驟內容

</script>


<template>
    <CartBanner />
    <section class="container">
        <div>
            <CheckoutStepper :current="step" :steps="steps"/>
        </div>

        <div class="page-change-box">
            <router-view />
        </div>

        <!-- 假路徑 -->
        <!-- <p><router-link to="/cartpage/cart">跳到購物車頁</router-link></p>
        <p><router-link to="/cartpage/cartform">跳到表單頁</router-link></p>
        <p><router-link to="/cartpage/cartsuccess">跳到完成頁面</router-link></p> -->
    </section>
    

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 16px;

        .page-change-box {
            padding: 20px 0;
        }
    }


</style>