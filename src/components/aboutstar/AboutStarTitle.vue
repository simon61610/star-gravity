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
}
.wrapper{
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
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
}
.banner-right img{
    width:550px;
    height: auto;
}

//-------------------------斷點開始----------------------------------------------
/* 斷點901 */
@media screen and (max-width:901px) {

    .wrapper {
        flex-direction: row;   // 左右改上下
        gap: 20px;
        padding-bottom: 30px;
    }
    .banner-left-one {
        height: auto;
        padding-top: 40px;        // 減少 padding
    }
    .banner-left-one h1 {
        font-size: 160px;        
    }
    .banner-left-one h2 {
        font-size: 44px;
    }
    .banner-right img {
        width: 100%;              // 圖片縮小
        max-width: 450px;        // 避免太大
        height: auto;
    }
}

/* 斷點651 */
@media screen and (max-width:652px) {
    
    .wrapper {
        flex-direction: column;    // 左右改上下
        gap: 20px;
        text-align: center;        // 文字置中
        padding: 0 12px;
    }
    .banner-left-one {
        height: auto;
        padding-top: 40px;         // 減少 padding
    }
    .banner-left-one h1 {
        font-size: 125px;         // 縮小標題字體
    }
    .banner-left-one h2 {
        font-size: 35px;         // 次標題字體縮小
    }
    .banner-right img {
        width: 100%;                // 縮小圖片
        max-width: 380px;          // 限制最大寬度
        height: auto;
        margin: 0 auto;
        margin-bottom: 20px;
    }
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