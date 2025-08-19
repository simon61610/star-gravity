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
}
.cards{
    margin-top: 20px;
    margin-left: 100px;
    display: flex;
    gap: 5px;
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
</style>

