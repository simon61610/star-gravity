<!-- 購物車頁面 -->

<script setup>
    import { ref, computed, watch } from 'vue'
    import { useRoute } from 'vue-router'

    /* ========== 組件 ========== */
    import CartBanner from '@/components/shop/cart/CartBanner.vue';
    import CheckoutStepper from '@/components/shop/cart/CheckoutStepper.vue';

    /* ========== 共用 ========== */
    const route = useRoute()
    const steps = ['準備結帳', '填寫資料', '完成訂單'] // 步驟內容

    const step = computed(() => { // 控制 process
        if (route.name == 'cartform'){
            return 2
        }
        if (route.name == 'cartsuccess'){
            return 3
        }
        return 1
    })

    watch( 
        () => step.value, 
        () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
    })
</script>


<template>
    <CartBanner />
    <section class="container">

        <!-- 流程步驟條 -->
        <div>
            <CheckoutStepper :current="step" :steps="steps"/>
        </div>

        <!-- 子頁面容器 -->
        <div class="page-change-box">
            <router-view />
        </div>

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