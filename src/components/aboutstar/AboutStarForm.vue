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
                        <tr><td>-1</td><td class="bright">非常非常亮</td><td class="bright-1">非常明顯，都市也可見</td></tr>
                        <tr><td>0</td><td class="bright">非常亮</td><td class="bright-1">都市夜空清楚可見</td></tr>
                        <tr><td>1</td><td class="bright">亮</td><td class="bright-1">普遍可見</td></tr>
                        <tr><td>2</td><td class="bright">稍亮</td><td class="bright-1">光害少時可見</td></tr>
                        <tr><td>3</td><td class="bright">稍暗</td><td class="bright-1">鄉村可見，都市較難</td></tr>
                        <tr><td>4</td><td class="bright">更暗</td><td class="bright-1">幾乎看不見</td></tr>
                        <tr><td>5</td><td class="bright">超暗</td><td class="bright-1">需在無光害地區觀看</td></tr>
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
    background-color: $bgColor-shop;
}
.container{
    max-width: 1200px;
    margin: 0 auto;
}
.magnitude{
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

//-------------------------斷點開始----------------------------------------------
/* 斷點901 */
@media screen and (max-width:901px) {

    .container {
        padding: 0 10px;              // 手機左右留白
    }
    .magnitude {
        width: 95%;
        margin-left: 7px;               // 取消固定左距
        padding: 15px;                // 內距讓內容不貼邊
        flex-direction: column;       // 左右改上下
        align-items: center;         
        gap: 20px;
        border-radius: 15px;
    }
    .magnitude-left {
        width: 100%;
        padding-top: 10px;
        text-align: center;
    }
    .magnitude-left h2 {
        font-size: $pcChFont-H2;            // 標題稍微縮小
        text-align: center;
    }
    .magnitude-left p {
        font-size: $pcChFont-p;
        line-height: 1.5;
        padding-top: 20px;
    }
    /* 移除段落內 <br> 的強制換行，手機行寬較窄時更好讀 */
    .magnitude-left p br {
        display: none;
    }
    /* 表格：滿版 + 可橫向滑動（避免擠到斷行） */
    .star-rating-table {
        width: 100%;
        display: block;               // 讓 overflow-x 生效
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        border-collapse: separate;
        table-layout: fixed;
        min-width: 520px;             // 保留基本欄寬，超出時可滑
        font-size: $pcChFont-p;
        justify-items: center;
    }
    .star-rating-table thead th, .star-rating-table tbody td {
        padding: 10px 12px;           // 縮小內距
    }
    /* 欄寬微調：第一欄變寬一點、說明欄更易讀 */
    .star-rating-table thead th:nth-child(1),
    .star-rating-table tbody td:nth-child(1) {
        width: 12%;
    }
    .star-rating-table thead th:nth-child(2),
    .star-rating-table tbody td:nth-child(2) {
        width: 38%;
    }
    .star-rating-table thead th:nth-child(3),
    .star-rating-table tbody td:nth-child(3) {
        width: 50%;
    }
}

/* 斷點651 */
@media screen and (max-width:653px) {

    .magnitude {
        flex-direction: column;    // 改成上下堆疊
        width: 85%;
        margin-left: 30px;
        padding: 16px;
        gap: 20px;
        border-radius: 20px;
    }
    .magnitude-left {
        width: 80%;
        padding: 0;
        text-align: center;
    }
    .magnitude-left h2 {
        padding-top: 5px;
        font-size: 1.7rem;         
    }
    .magnitude-left p {
        font-size: 0.98rem;
        line-height: 1.5;
    }
    /* 移除 <br>，小螢幕行寬自動換行即可 */
    .magnitude-left p br {
        display: none;
    }
    .star-rating-table {
        width: 100%;
        display: block;            // 允許 overflow-x
        -webkit-overflow-scrolling: touch;
        min-width: 400px;          // 保留欄寬，避免擠爆
        font-size: 0.9rem;
    }
    .star-rating-table thead th,
    .star-rating-table tbody td {
        padding: 8px 10px;         // 減少 padding
    }
}

/* 斷點430 */
@media screen and (max-width: 433px) {
    /* 父容器改直向，拿掉固定寬與左邊距 */
    .magnitude{
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
        width: 92%;
        margin-left: 0;
        border-radius: 20px;
    }
    /* 左側說明區：滿版、置中 */
    .magnitude-left{
        width: 100%;
        padding: 8px 0 0;
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
    .bright{
        width: 100px;
    }
    .bright-1{
        width: 90px;
    }
}

</style>

<script setup>
// import AboutStarSecond from './AboutStarSecond.vue';
</script>