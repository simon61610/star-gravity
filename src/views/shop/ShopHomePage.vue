<!-- 商城首頁 - Banner & 分類 -->
 
<script setup>
    /* ========== 組件 ========== */
    import HeroBanner from '@/components/shop/shophome/HeroBanner.vue';
    import CategoryGrid from '@/components/shop/shophome/CategoryGrid.vue';
</script>


<template>
    <!-- 商城首頁主要區塊 -->
    <section class="shop-home">
        <HeroBanner />      <!-- Banner 輪播 -->
        <CategoryGrid />    <!-- 商品分類 -->
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';
    .shop-home {
        background-color: $bgColor-shop;
    }
</style>