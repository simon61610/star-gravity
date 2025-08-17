<script setup>

import { ref } from 'vue'

// 組件
import CartBanner from '@/components/shop/cart/CartBanner.vue';
import CheckoutStepper from '@/components/shop/cart/CheckoutStepper.vue';

// 進度條: 傳屬性值讓子組件接收並套用
const step = ref(1) // 目前步驟
const steps = ['準備結帳', '填寫資料', '完成訂單'] // 步驟內容

</script>


<template>
    <CartBanner />
    <section class="container">
        <div>
            <CheckoutStepper :current="step" :steps="steps"/>
        </div>








    </section>
</template>


<style scoped lang="scss">
@import '@/assets/styles/main.scss';

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 16px;



    }


</style>