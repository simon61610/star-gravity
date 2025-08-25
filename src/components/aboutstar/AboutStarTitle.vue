<template>     
    <div class="about-wrapper">
        <div class="wrapper">
            <div class="banner-left-one decTitle--big">
                <h1>NEWBIE</h1>
                <h2>觀星初學指南</h2>
            </div>
            <div class="banner-right">
                <img src="@/assets/images/aboutstar/guide-banner.svg" alt="">
            </div>

        </div>
    </div>


</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.about-wrapper{
    width: 100%;
    box-sizing: border-box;
    background-color: $bgColor-shop;
    // min-height: calc(100vh - 350px);
}
.wrapper{
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    // justify-content: center;
    // padding-left: 20px;
    // display: flex;
    // gap: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 0 20px;
}
.banner-left-one{
    height: 200px;
    padding-top: 80px;
}
.banner-left-one h1{
    color: $primaryColor-500;
}
.banner-left-one h2{
    font-size: $pcChFont-H2;
    color: $primaryColor-500;
    // border: 1px solid $primaryColor-500;
    // width: 200px;   
}
.banner-right img{
    width:550px;
    height: auto;
}


/* 斷點430 */
@media screen and (max-width: 433px) {
    .wrapper{
        flex-direction: column;
        text-align: center;
        gap: 20px;
        padding: 0 0;
    }
    .banner-left-one{
        height: auto;
        padding-top: 40px;
        text-align: start;
    }
    .banner-left-one h1{
        font-size: 105px;
    }
    .banner-left-one h2{
        font-size: $pcChFont-p;
    }
    .banner-right img{
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }
}
</style>

<script setup>
</script>