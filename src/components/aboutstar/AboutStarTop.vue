<template>
    <section class="guide">
        <div class="container">
            <!----------1. 攜帶物品---------------->
            <div class="section"> 
                <span class="idx">1.</span>
                <h2>需要攜帶的物品</h2>
            </div>
            <!----------卡片區塊---------------->
            <div class="cards">
                <article class="card">
                    <div class="card-top">
                        <img src="../../assets/icons/aboutstar-star.svg" alt="星星在哪裡?" class="icon" />
                        <h3>星星在哪裡</h3>
                    </div>
                    <ul class="list">
                        <li>手機星圖 APP</li>
                        <li>星座圖</li>
                    </ul>
                </article>
                <article class="card">
                    <div class="card-top">
                        <img src="../../assets/icons/aboutstar-telescope.svg" alt="新手必備設備" class="icon" />
                        <h3>新手必備設備</h3>
                    </div>
                    <ul class="list">
                        <li>望遠鏡</li>
                        <li>手電筒</li>
                        <li>指南針</li>
                    </ul>
                </article>
                <article class="card">
                    <div class="card-right">
                        <img src="../../assets/icons/aboutstar-bags.svg" alt="其他小物" class="icon"/>
                        <h3>其他小物</h3>
                    </div>
                    <ul class="list">
                        <li>飲用水和零食</li>
                        <li>保暖衣物</li>
                        <li>筆記本和筆</li>
                    </ul>
                </article>
            </div>
            <!----------2. 觀看月相的方式---------------->
            <div class="container-two">
                <div class="moon">
                    <img src="../../assets/images/aboutstar/Mask group.png" alt="moon"> 
                </div>
                <div class="lookmoonall">
                    <div class="section">
                        <span class="idx">2.</span>
                        <h2>觀看月相的方式</h2>
                    </div>
                    <div class="tips">
                        <p class="tip">
                            <span class="tip-label">新月期間：</span>
                            <span class="tip-text">月亮的光害最小，是觀星的好時機。</span>
                        </p>
                        <p class="tip">
                            <span class="tip-label">滿月期間：</span>
                            <span class="tip-text">月光太亮，會影響觀測星空，但可以欣賞月亮的隕石坑和盆地。</span>
                        </p>
                    </div>
                </div>
            </div>
            <!----------3. 看星星的地方---------------->
            <div class="container-third">
                <div class="spaceall">
                    <div class="section">
                        <span class="idx">3.</span>
                        <h2>看星星的地方</h2>
                    </div>
                    <div class="tips">
                        <p class="tip">
                            <span class="tip-label">遠離光害：</span>
                            <span class="tip-text">城市的光害會嚴重影響觀星效果，<br>應選擇遠離市區、光害較少的地方。</span>
                        </p>
                        <p class="tip">
                            <span class="tip-label">地勢較高：</span>
                            <span class="tip-text">山區或高原地區，空氣稀薄，視野開<br>闊，是理想的觀星地點。</span>
                        </p>
                        <p class="tip">
                            <span class="tip-label">空曠地區：</span>
                            <span class="tip-text">開闊的草原、海邊等，視野無遮擋，<br>也適合觀星。</span>
                        </p>
                    </div>
                </div>
                <div class="starsapce">
                    <img src="../../assets/images/aboutstar/star space.png" alt="star">
                </div>
            </div>
            <!----------4. 觀星好季節---------------->
            <div class="container-four">
                <div class="season">
                    <img src="../../assets/images/aboutstar/constellation-4.png" alt="season">
                </div>
                <div class="seasonall">
                    <div class="section">
                        <span class="idx">4.</span>
                        <h2>觀星好季節</h2>
                    </div>
                    <div class="tips">
                        <p class="tip">
                            <span class="tip-label">春：</span>
                            <span class="tip-text">看獅子座、室女座</span>
                        </p>
                        <p class="tip">
                            <span class="tip-label">夏：</span>
                            <span class="tip-text">看天蠍座、銀河、牛郎織女星</span>
                        </p>
                        <p class="tip">
                            <span class="tip-label">秋：</span>
                            <span class="tip-text">看飛馬座、仙女座</span>
                        </p>
                        <p class="tip">
                            <span class="tip-label">冬：</span>
                            <span class="tip-text">看獵戶座、金牛座、天狼星(天空最亮)</span>
                        </p>
                        <div class="notion">
                            <p class="note">TIPS</p>
                            <p class="notetext"> 建議觀星時間為晚上 9 點～凌晨 3 點，夏季需注意夏季多雨，且光害較重</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.guide{
    width: 100%;
    box-sizing: border-box;
    background-color: $bgColor-shop;
    // height: 2000px;
}
.container{
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
}
// 1.區塊標題
.section{
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 10px;
    color: $primaryColor-500;
}
.idx{
    font-size: $pcEngFont-title;
}
.section h2{   
    font-size: $pcChFont-H2;
    position: relative;      // 讓偽元素定位在 h2 裡
    display: inline-block;   // 線長度就會跟著文字寬度
    line-height: 1.1;
    padding: 4px 10px;
}
/* 上下兩條線（顏色與距離自己調） */
.section h2::before,
.section h2::after{
  content: "";
  position: absolute;
  left: 0; 
  right: 0;       // 線寬 = 文字寬 + padding
  height: 2px;
  background: rgba(255,255,255,.25);
}
.section h2::before{ 
    top: -6px;     // 線距離文字頂部 6px
}   
.section h2::after { 
    bottom: -6px;  // 線距離文字底部 6px
} 
// 卡片區塊
.cards{    // 3張卡片
    width: 900px;
    margin: 10px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}    
.card{
    border: 1px solid #8378B4;
    border-radius: 20px;
    width: 220px;
    padding: 20px 16px;
}
.card-top{
    background-color: #8378B4;
    border-radius: 20px;
    margin-left: 20px;
    width: 180px;
}
.card-top h3{
    color: $primaryColor-900;
    font-size: $pcChFont-H3;
    text-align: center;
    padding-bottom: 20px;
}
.card-top img{ 
    padding-left: 25px;
}
.list{
    width: 130px;
    margin-top: 10px;
    margin-left: 40px;
}
.list li{
    font-size: $pcChFont-p;
    line-height: $linHeight-p;
    color: $FontColor-gray;
    text-align: center;
}
.card-right{
    background-color: #8378B4;
    border-radius: 20px;
    margin-left: 20px;
    width: 180px;
}
.card-right img{
    padding-left: 42px;
}
.card-right h3{
    color: $primaryColor-900;
    font-size: $pcChFont-H3;
    text-align: center;
    padding-bottom: 20px;
}
// 2.觀看月相
.container-two{
    width: 900px;
    display: flex;
    gap: 184px;
    margin: 0 auto;
}
.container-two img{
    width: 230px;
    height: 230px;
    padding-left: 20px;
    padding-top: 10px;
}
.lookmoon{
    align-items: center;
    display: flex;
    gap: 10px;
}
.idx{
    font-size: $pcEngFont-numberTitle;
    color: $primaryColor-500;
}
.lookmoonall{
    padding-left: 20px;
    padding-top: 10px;
}
.lookmoon h3{
    font-size: $pcChFont-H2;
    color: $primaryColor-500;
}
// 文字區
.tips{
    font-size: $pcChFont-p;
    margin-top: 20px;
    margin-right: 5px;
}
.tip{
    line-height: $linHeight-p;
    margin-top: 5px;
    display: flex;
    align-items: flex-start; 
    margin-bottom: 8px;
}
.tip-label{
    color: $primaryColor-500;
}
.tip-text{
    color: $FontColor-white;    
    flex: 1;
    margin-left: 4px; 
}
// 3. 星星地方
.container-third{
    width: 900px;
    display: flex;
    gap: 85px;
    margin: 0 auto;
}
.spaceall{
    width: 400px;
    padding-left: 16px;
    margin-top: 5px;
}
.space{
    align-items: center;
    display: flex;
    gap: 10px;
}
.container-third h3{
    color: $primaryColor-500;
    font-size: $pcChFont-H2;
}
.starsapce img{
    width: 350px;
    padding-top: 40px;
}
// 4. 觀星季節
.container-four{
    width: 900px;
    display: flex;
    gap: 100px;
    margin: 0 auto;
}
.season img{
    width: 350px;
    height: 250px;
    margin-top: 50px;
}
.seasonall{
    margin-top: 5px;
}
.seasontitle{
    align-items: center;
    display: flex;
    gap: 10px;
}
.seasontitle h3{
    color: $primaryColor-500;
    font-size: $pcChFont-H2;
}
.notion{
    display: flex;
    gap: 10px;
    margin-top: 10px;
    color: $FontColor-white;
}
.note{
    font-size: $pcChFont-p;
    padding-top: 15px;
}
.notetext{
    font-size: $pcChFont-p;
    line-height: $linHeight-p;
}

/* 斷點430 */
@media screen and (max-width: 433px) {
    /* 卡片：3欄 → 單欄 */
    .cards{
        width: 100%;
        grid-template-columns: 1fr;
        gap: 16px;
    }
    .card{
        width: 100%;
        padding: 16px;
        max-width: 220px;
        margin: 0 auto;
    }
    .card-top, .card-right{
        width: 100%;
        max-width: 200px;
        margin-left: 7px;
        text-align: center;
    }
    .card-right img{
        padding-left: 10px;
    }
    .list{
        width: 100%;
        margin: 10px auto 0;
    }
    /* 月相：左右 → 上下 */
    .container-two{
        width: 100%;
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }
    .container-two img {
        width: 250px;
        height: auto;
        padding-top: 20px;
        margin: 0 auto; 
    }
    .lookmoonall{
        // padding: 0;
    }
    /* 文字區 */
    .tips{
        font-size: $pcChFont-p;
        text-align: start;
        margin-right: 0;
        padding-left: 16px;
    }
    /* 看星星的地方：左右 → 上下 */
    .container-third {
        width: 100%;
        flex-direction: column-reverse;
        gap: 20px;
        text-align: center;
    }
    .spaceall{
        // width: 100%;
        // padding: 0;
        // margin: 0;
    }
    .starsapce img{
        width: 80%;
        max-width: 280px;
        margin: 0 auto;
        padding-top: 20px;
    }
    /* 觀星季節：左右 → 上下 */
    .container-four{
        width: 100%;
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }
    .season img{
        width: 80%;
        max-width: 280px;
        height: auto;
        margin: 0 auto;
    }
    .seasonall {
        // margin-top: 10px;
    }
    


}





</style>