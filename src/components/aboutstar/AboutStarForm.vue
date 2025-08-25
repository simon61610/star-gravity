<template>
    <div class="wrapper">
        <div class="container">
            <AboutStarSecond/>

            <div class="magnitude">
                <div class="magnitude-left">
                    <h2>( 甚麼是星等 )</h2>
                    <p>星等是天文學中用來衡量星體亮度<br>的單位，數值越小表示星體越亮，<br>數值越大則表示星體越暗。星等最<br>初是根據肉眼觀測的亮度劃分，但<br>現在的星等定義是基於光度的對數<br>更加精確。</p>
                </div>
                <!---------表格---------->
                <table class="star-rating-table">
                    <thead>
                        <tr>
                            <th scope="col">星等</th>
                            <th scope="col">亮度說明</th>
                            <th scope="col">是否容易看見</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>-1</td><td>非常非常亮</td><td>非常明顯，都市也可見</td></tr>
                        <tr><td>0</td><td>非常亮</td><td>都市夜空清楚可見</td></tr>
                        <tr><td>1</td><td>亮</td><td>普遍可見</td></tr>
                        <tr><td>2</td><td>稍亮</td><td>光害少時可見</td></tr>
                        <tr><td>3</td><td>稍暗</td><td>鄉村可見，都市較難</td></tr>
                        <tr><td>4</td><td>更暗</td><td>幾乎看不見</td></tr>
                        <tr><td>5</td><td>超暗</td><td>需在無光害地區觀看</td></tr>
                    </tbody>

                </table>
            </div>
        </div>


    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.wrapper{
    width: 100%;
    box-sizing: border-box;
    // height: 1000px;
    background-color: $bgColor-shop;
}
.container{
    max-width: 1200px;
    margin: 0 auto;
}
.magnitude{
    // margin-top: 30px;    // 如果有加別的檔案再打開
    // padding-top: 30px;
    margin-left: 40px;
    width: 1100px;
    background-color: $primaryColor-900;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
     /* 新增：置中 + 與上方間距 */
    margin: clamp(24px, 5vw, 64px) auto 0; /* 上間距24~64px 自適應、左右auto置中 */
}


.magnitude-left{
    width: 290px;
    padding-top: 10px;
    padding-left: 16px;
}
.magnitude-left h2{
    font-size: $pcChFont-H2;
    color: $primaryColor-500;
    text-align: center;
}
.magnitude-left p{
    font-family: $chFont;
    font-size: $pcChFont-p;
    color: $FontColor-white;    
    line-height: $linHeight-p;
    padding-top: 10px;
}
// 表格
.star-rating-table{
    width: 500px;
    border-collapse: separate;  /* 才能控制分隔線與圓角外殼 */
    table-layout: fixed;        /* 固定欄寬避免抖動 */
    overflow: hidden;
    font-size: $pcChFont-small;
}
// 表頭
.star-rating-table thead th{
    font-weight: 600;
    color: $primaryColor-500;
    padding: 12px 14px;
    text-align: left;
    border-bottom: 2px solid rgba(255,255,255,0.25);
}
//  欄寬比例
.star-rating-table thead th:nth-child(1), .star-rating-table tbody td:nth-child(1){ 
    width: 5%; 
    text-align: center;        /* 星等置中 */
} 
.star-rating-table thead th:nth-child(2), .star-rating-table tbody td:nth-child(2){ 
    width: 25%; 
    text-align: center;
}
.star-rating-table thead th:nth-child(3), .star-rating-table tbody td:nth-child(3){ 
    width: 30%; 
    text-align: center;
}
/* 資料列 */
.star-rating-table tbody td{
    padding: 12px 14px;
    color: $FontColor-white;
    vertical-align: top;
}
// 列與列之間的細分隔線 
.star-rating-table tbody tr + tr td{
    border-top: 1px solid rgba(255,255,255,0.15);
}

@media screen and (max-width: 433px) {
    /* 父容器改直向，拿掉固定寬與左邊距 */
    .magnitude{
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
        width: 100%;
        margin-left: 0;
        border-radius: 20px;
        // padding: 12px;               /* 內距補一點空間 */
    }
    /* 左側說明區：滿版、置中 */
    .magnitude-left{
        width: 100%;
        padding: 8px 0 0;
        // text-align: center;
    }
    .magnitude-left h2{
        font-size: $pcChFont-H3;
    }
    .magnitude-left p{
        font-size: 16px;
        line-height: 1.6;
        text-align: center; 
    }
    /* 表格：可橫向滑動，避免爆版 */
    .star-rating-table {
        width: 100%;
        display: block;              /* 讓 overflow-x 生效 */
        overflow-x: auto;
        white-space: nowrap;         /* 欄位不自動換行 */
        font-size: 13px;
        border-spacing: 0;    
    }
    .star-rating-table thead, 
    .star-rating-table tbody,
    .star-rating-table tr {
        display: table;              /* 維持表格語意 */
        width: 100%;
        table-layout: fixed;
    }




}







</style>

<script setup>
// import AboutStarSecond from './AboutStarSecond.vue';
</script>