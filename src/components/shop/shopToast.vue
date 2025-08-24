<script setup>


</script>


<template>
    <section class="shop-toast">
        <div>已成功加入購物車！</div>
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .shop-toast {
        position: fixed;
        top: 12px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        padding: 16px 40px;
        background-color: $primaryColor-500;
        opacity: .8;
        z-index: 1000;
        border-radius: 16px;
    }



</style>