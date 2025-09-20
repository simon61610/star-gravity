<!-- 購物車 Banner -->

<script setup>
</script>


<template>
    <div class="cart-banner">
        <div class="title-box">
            <p class="decTitle--medium m-eng">SHOPPING CART</p>
            <p class="cnTitle--h5 m-ch">購物車</p>
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
            // border: 1px solid red;

            @include respond('sm'){
                padding-top: 20px;
                padding-bottom: 20px;

                .m-eng {
                    font-size: 60px;
                }
            }

            @include respond('xs'){
                flex-direction: column;
                gap: 12px;
            }
        }
    }

    /* @media screen and (max-width: 431px) {
        .cart-banner {
            .title-box {
                padding-top: 20px;
                padding-bottom: 20px;

                .m-eng {
                    font-size: 60px;
                }
                .m-ch {
                    
                }
            }
        }
    } */


</style>