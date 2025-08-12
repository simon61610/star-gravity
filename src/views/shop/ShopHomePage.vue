<!-- 商城主頁 -->
<script setup>
    import HeroBanner from '@/components/shop/shophome/HeroBanner.vue';
    import CategoryGrid from '@/components/shop/shophome/CategoryGrid.vue';

</script>


<template>
    <section class="shop-home">
        <HeroBanner />
        <CategoryGrid />
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';
    .shop-home {
        background-color: $bgColor-shop;
    }

</style>