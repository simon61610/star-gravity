<template>
    <section class="wrapper">
        <div class="container">
            <div class="container-five"> 
                <span class="idx">5.</span>
                <h2>可觀測到的現象</h2>
            </div>
            <!--------下方四個圖片-------------->
            <div class="cards">
                <div class="cardall">
                    <img src="@/assets/images/aboutstar/Meteor.png" alt="流星雨">
                    <div class="area">
                        <h4>流星雨</h4>
                        <p>流星是由太空岩石進入地球大氣層燃燒形成的。在流星雨期間，例如英仙座流星雨(8月)或雙子座流星雨(12月)，可以觀察到大量的流星。</p>
                    </div>
                </div>
                <div class="cardall">
                    <img src="@/assets/images/aboutstar/Milky Way.png" alt="銀河">
                    <div class="area">
                        <h4>銀河</h4>
                        <p>銀河系在夏季的夜晚，尤其是在光害較少的地方，肉眼可見一條 明亮的白色光帶，這就是銀河系的核心。</p>
                    </div>
                </div>
                <div class="cardall">
                    <img src="@/assets/images/aboutstar/constellation.png" alt="星座">
                    <div class="area">
                        <h4>星座</h4>
                        <p>星座是由恆星組成的圖案，可以用肉眼辨認。根據不同的季節和時間，可以觀測到不同的星座，例如夏季的天蠍座和射手座，冬季的獵戶座和金牛座。</p>
                    </div>
                </div>
                <div class="cardall">
                    <img src="../../assets/images/aboutstar/lunar eclipse.png" alt="月全食">
                    <div class="area">
                        <h4>月全食</h4>
                        <p>月全食期間看星星，就像在沒有月光的夜晚一樣，可以欣賞到更豐富的星空，但不會因為月亮而有額外的光害影響。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
.container-five{
    padding-top: 30px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 10px;
    color: $primaryColor-500;
}
.idx{
    font-size: $pcEngFont-numberTitle;
}
.container-five h2{
    font-size: $pcChFont-H2;
    position: relative;     /* 讓偽元素定位在 h2 內 */
    display: inline-block;  /* 線長度 = 文字寬度 */
    line-height: 1.1;
    padding: 4px 10px; 
}
.container-five h2::before,
.container-five h2::after{
    content: "";
    position: absolute;
    left: 0; right: 0;      /* 線寬 = 文字寬 + padding */
    height: 2px;            /* 線的粗細 */
    background: rgba(255,255,255,.25); /* 線的顏色（可調） */
}
.container-five h2::before{ 
    top: -6px; 
}     
.container-five h2::after { 
    bottom: -6px; 
}
.cards{
    width: 100%;
    margin-top: 30px;
    margin-left: 80px;
    display: flex;
    gap: 15px;
}
.cardall{
    position: relative;               
    width: 250px;                     /* 與圖片相同寬度，避免位移 */
    height: 380px;                    /* 與圖片相同寬度，避免位移 */
}
.cardall img{
    width: 100%;                      
    height: 100%;                     
    object-fit: cover;                /* 等比裁切填滿 */
    display: block;                   /* 去除底部行內元素空白 */
    filter: saturate(1.08) contrast(1.05) brightness(1.03);  /* 讓圖片更鮮明 */
    transition: filter .25s ease, transform .25s ease;       /* 平滑過渡 */
}
.cardall:hover img{        /* NEW：滑過更凸顯 */
    transform: scale(1.03);
    filter: saturate(1.22) contrast(1.12) brightness(1.06);
}
.area{
    position: absolute;               /* 鋪在圖片上 */
    inset: 0;                         /* top/right/bottom/left = 0 */
    padding: 12px;                    /* 改為四周內距，避免貼邊 */
    display: grid;                    /* 用 grid 置中最簡單 */           
    place-items: center;              /* 水平＋垂直置中 */
    text-align: center;               /* 文字置中 */
    color: $FontColor-white;                
    background: linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.35));   /*半透明遮罩，讓字更清楚 */ 
    box-sizing: border-box;           /* 含 padding 計算寬高 */
    z-index: 1;                       /* 確保在圖片之上 */
}
.area h4{
    font-size: $pcChFont-H4;
    margin: 15px 0 0;            /* 清掉預設外距並留下面距 */
}
.area p{
    margin: 0;                /* 清掉預設外距 */
    max-width: 95%;           /* 限制行寬避免太貼邊 */
    font-size: $pcChFont-p;
    line-height: $linHeight-p;
}

//-------------------------斷點開始----------------------------------------------
/* 斷點901 */
@media screen and (max-width:901px) {

    .cards {
        flex-wrap: wrap;             // 允許換行
        justify-content: center;     // 卡片置中
        margin-left: 0;              // 移除左邊固定空間
        gap: 20px;
    }
    .cardall {
        width: 45%;                  // 兩張並排
        height: auto;                // 高度隨內容
        min-width: 220px;            // 避免太小
    }
    .cardall img {
        height: auto;                // 圖片高度自適應
    }
    .area {
        position: absolute;          // 繼續覆蓋在圖片上
        inset: 0;
        padding: 10px;
        display: flex;               // 直向排列文字
        flex-direction: column;
        justify-content: center;   // 文字靠下疊
        text-align: center;
        background: linear-gradient(180deg, rgba(0,0,0,.5), rgba(0,0,0,.35));
    }
    .area h4 {
        margin: 0 0 8px;
        font-size: $pcChFont-H4;
    }
    .area p {
        font-size: $pcChFont-p;
        line-height: 1.5;
    }
}

/* 斷點651 */
@media screen and (max-width:652px) {

    .cards {
        margin-left: 0;                 /* 移除桌機的左偏移 */
        display: flex;
        gap: 15px;
        padding: 0 12px 12px;           /* 內距避免貼邊 */
        scroll-snap-type: x mandatory;  /* 片片對齊停駐 */
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain; /* 阻擋外層跟著滾 */
    }
    .cardall {
        flex: 0 0 220px;                /* 卡片寬度（可調 200–260）*/
        height: 300px;                  /* 固定比例高度（可調） */
        scroll-snap-align: start;       /* 每張卡片對齊左側 */
        border-radius: 16px;
    }
    /* 若想用比例自適應高度，改用下面這行、並移除上面的固定 height
        .cardall { aspect-ratio: 3 / 4; }
    */
    .cardall img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    /* 文字仍在圖上，略縮字級，以免擠 */
    .area {
        padding: 12px;
        background: linear-gradient(180deg, rgba(0,0,0,.5), rgba(0,0,0,.35));
    }
    .area h4 { 
        font-size: 1rem; 
        margin: 8px 0; 
    }
    .area p { 
        font-size: .85rem; 
        line-height: 1.5; 
    }
    /* 可選：細化滑動條外觀（支援度取決於瀏覽器） */
    .cards::-webkit-scrollbar { 
        height: 6px; 
    }
    .cards::-webkit-scrollbar-thumb { 
        background: rgba(255,255,255,.2); 
        border-radius: 3px; 
    }

}

/* 斷點430 */
@media screen and (max-width: 433px) {
    /* 整體容器：讓卡片可以左右滑動 */
    .cards {
        margin: 16px 0 0;              /* 拿掉左側 100px，改用小外距 */
        padding: 0 12px;               /* 左右留白當作內邊距 */
        gap: 12px;                     /* 卡片間距大一點比較好滑 */
        overflow-x: auto;              /* 橫向卷軸 */
        overflow-y: visible;
        scroll-snap-type: x mandatory; /* 捲動對準卡片 */
        -webkit-overflow-scrolling: touch;
    }
    /* 隱藏捲軸（仍可滑動） */
    .cards::-webkit-scrollbar {
        display: none;
    }
    .cards {
        scrollbar-width: none; 
    }
    /* 每張卡片：固定視窗寬度的 80%，滑動時對齊置中 */
    .cardall{
        flex: 0 0 65vw;                /* 佔 80% 視窗寬 */
        max-width: 300px;              /* 上限避免超大 */
        height: auto;                  /* 高度跟著內容 */
        aspect-ratio: 5 / 7;           /* 大致比例接近原設計 */
        scroll-snap-align: center;     /* 對齊中心 */
        border-radius: 16px;           /* 手機圓角更柔和 */
    }
    .cardall img {
        height: 100%;
        border-radius: 16px;
    }
    /* 文字區塊調整：縮小字級、提升可讀性 */
    .area {
        padding: 10px;
        background: linear-gradient(180deg, rgba(0,0,0,.48), rgba(0,0,0,.32));
    }
    .area h4{
        font-size: $pcChFont-p;
        margin-top: 10px;
    }
    .area p{
        font-size: 16px;
        line-height: 1.6;
    }
    /* 標題行（5. 可觀測到的現象）微調間距 */
    .container-five{
        padding-top: 30px;
        gap: 8px;
    }
    .container-five h2{
        padding: 2px 8px;
    }
}

</style>

