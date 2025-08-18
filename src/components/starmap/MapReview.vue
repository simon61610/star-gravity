<template>
    <!-- 內容彈窗 -->
    <div class="map-reviewBox">
         <!-- 叉叉按鈕 -->
        <img class="mapbox-close" src="../../assets/icons/icon-map-close.svg" alt="">
        <h3 class="mapbox-back">
            <img class="mapbox-backTo" src="../../assets/icons/icon-map-goToBack.svg" alt="">
            返回上頁
        </h3>
        
   
        <!-- 左半邊 -->
        <div class="mapreview-left">
            <div class="mapreview-title">
                <h1>南瀛天文館</h1>
                <h3>
                    <img src="../../assets/icons/icon-map-whitestar.svg" alt="">
                    4.7
                </h3>
            </div>
            <button class="mapreview-btn button--normal">
                <img src="" alt="">
                撰寫評論
            </button>
        </div>

        <!-- 右半邊 -->
        <div class="mapreview-right">
            <!-- 排序 -->
            <div class="review-select">
                <div class="review-select-title" >
                    <img src="" alt="">
                    <h5>排序</h5>
                </div>
                <ul class="review-select-detail">
                    <li>最新評論</li>
                    <li>評論低到高</li>
                    <li>最新高到低</li>
                </ul>
            </div>
            <!-- 評論列表 -->
            <ul class="mapreview-list">
                <li>
                    <h4>Ani_98</h4>
                    <span class="review-score"> <!--到時候img 用v-for跑 評論幾分跑幾次-->
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                    </span>
                    <p class="cnContent--18px">
                        新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。
                    </p>
                    <img class="review-photo" src="../../assets/images/map/map-reviewleft.jpg" alt="">
                    <h6>2025/07/25</h6>
                </li>  
                
                <li>
                    <h4>Ani_98</h4>
                    <span class="review-score"> <!--到時候img 用v-for跑 評論幾分跑幾次-->
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">

                    </span>
                    <p class="cnContent--18px">
                        新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。
                    </p>
                    <!-- <img class="review-photo" src="" alt=""> -->
                    <h6>2025/07/25</h6>
                </li> 

                <li>
                    <h4>Ani_98</h4>
                    <span class="review-score"> <!--到時候img 用v-for跑 評論幾分跑幾次-->
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                    </span>
                    <p class="cnContent--18px">
                        帶小孩來，光害少，車位是路邊白線，滿天星空真的美！
                    </p>
                    <img class="review-photo" src="../../assets/images/map/map-reviewleft.jpg" alt="">
                    <h6>2025/07/25</h6>
                </li> 

                <li>
                    <h4>Ani_98</h4>
                    <span class="review-score"> <!--到時候img 用v-for跑 評論幾分跑幾次-->
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                        <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                    </span>
                    <p class="cnContent--18px">
                        新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。
                    </p>
                    <!-- <img class="review-photo" src="" alt=""> -->
                    <h6>2025/07/25</h6>
                </li> 



            </ul>
        </div>
   
   </div>

    
</template>

<style scoped lang="scss">
@import '../../assets/styles/main.scss';



//評論彈窗
.map-reviewBox {
    width: 1200px;
    // height: 820px;
    height: 90vh;

    // border: 2px solid $primaryColor-500;
    background-color:$bgColor-white ;
    border-radius: 20px;
    overflow: hidden;

    position: absolute;
    margin: auto;
    top: 0px;
    bottom: 0;
    right: 0;
    left: 0;
    box-sizing: border-box;
    z-index: 200;

    display: flex;
}
.mapbox-close{
    height: 32px;

    position: absolute;
    top: 12px;
    right: 16px;
}
.mapbox-back{
    color: $FontColor-white;

    position: absolute;
    top: 12px;
    left: 16px;

    display: flex;
    align-items: center;
    gap: 8px;

    font-size: $pcChFont-H3;
}
.mapbox-backTo{
    height: 32px;
    border-radius: 999px;
}


//左半邊
.mapreview-left{
    width: 400px;
    height: 100%;
    padding: 100px 0 60px 0 ;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
     justify-content: space-between;

    background-image: url(../../assets/images/map/map-reviewleft.jpg);
}

.mapreview-title{
    // border: 1px solid red;


    color: $FontColor-white;
    display: flex;
    flex-direction: column;

    gap:12px;
}
.mapreview-title h1{
    font-size: $pcChFont-H1;
    font-weight: bold;
    line-height: 120%;
}
.mapreview-title h3{
    align-items: center;

    display: flex;
    align-items: center;
    gap: 4px;

    font-size: $pcChFont-H3;
    font-weight: bold;
}

.mapreview-title img{
    width: 36px;
}


//右半邊
.mapreview-right{
    font-family:$chFont ;
    // border: 1px solid red;

    width: 800px;
    height: 100%;
    color:$FontColor-black ;

    padding:50px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
   
}
    //排序
.review-select{
    // border: 1px solid blue;
    width: 90px;

    color: $pcChFont-p;
    display: flex;
    flex-direction: column;

    position: relative;

    cursor: pointer;

}
.review-select-title{
    display: flex;
    gap: 4px;
    padding: 5px;

    background-color: $primaryColor-100;
}
.review-select ul{
    width: 100%;
    border: 1px solid $primaryColor-100;
    box-sizing: border-box;
    background-color: $bgColor-white;

    position: absolute;
    top: 26px;
}
.review-select ul li{
    padding: 4px;
    border-bottom: 1px solid $primaryColor-100;

    // display: none;
}
    
    //評論攔
.mapreview-writePlace{
    position: fixed;
    z-index: 100;

    border: 2px solid $primaryColor-100;
    width: 430px;
    height: 680px;
    background-color: #ffffff;
    border-radius: 20px;
    box-sizing: border-box;
}


    //評論列表
.mapreview-list{
    display: flex;
    flex-direction: column;
    gap: 8px;

    border-top: 1px solid $primaryColor-100;

    overflow-y: auto;
    
}   
.mapreview-list li{
    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 10px 20px;
    border: 1px solid $primaryColor-100;
    box-sizing: border-box;

}  
.mapreview-list h4{
    font-size: $pcChFont-H4 ;
}

.review-score{
    display: flex;
    gap: 4px;
}
.review-score img{
    width: 20px;
}
.mapreview-list p{
    font-size: $pcChFont-p;
}
.review-photo{
    width: 180px;
    height: 135px;
    cursor: pointer;
}
.mapreview-list h6{
    font-size:$pcChFont-small ;
    align-self: flex-end;
}

</style>