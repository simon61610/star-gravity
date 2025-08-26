<script setup>



</script>


<template>
    <div class="cart-banner">
        <div class="title-box">
            <p class="decTitle--medium">APPLICATION</p>
            <p class="cnTitle--h5">報名活動</p>
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

    @media screen and (max-width: 431px) {
        .cart-banner {
        aspect-ratio: 3 / 1;
        .title-box {
            padding-bottom: 10vw;
            .decTitle--medium {
                font-size: 60px;
            }
            .cnTitle--h5 {}
        }
    }

        
    }


</style>