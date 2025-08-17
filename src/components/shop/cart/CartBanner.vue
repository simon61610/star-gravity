<script setup>



</script>


<template>
    <div class="cart-banner">
        <div class="title-box">
            <p class="decTitle--medium">SHOPPING CART</p>
            <p class="cnTitle--h5">購物車</p>
        </div>
    </div>
</template>


<style scoped lang="scss">
@import '@/assets/styles/main.scss';

    .cart-banner {
        aspect-ratio: 6 / 1;
        background-color: $primaryColor-900;
        color: $primaryColor-500;

        display: flex;
        justify-content: center;
        align-items: flex-end;
        
        .title-box {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            padding-bottom: 32px;
        }
        
        
    }


</style>