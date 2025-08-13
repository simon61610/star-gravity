<template>
    <!-- 內容彈窗 -->
    <div class="map-contentBox">
        <!-- 叉叉按鈕 -->
        <img class="mapbox-close" src="../../assets/images/Logout.svg" alt="">

        <!-- 上面資訊欄 -->
        <div class="mapbox-Up">
            <!-- 四個區域用gird排列 -->
            <!-- 1. 地點名稱 -->
            <div class="map-detial-title">
                <h1 class="cnTitle--h1">南瀛天文館</h1>
                <h3 class="cnTitle--h5">台南市大內區34-2號</h3>
            </div>
            <!-- 2. 景點特色等文字介紹 -->
            <div class="map-detial-trait">
                <div class="trait1">
                    <h5>景點特色</h5>
                    <p>親子友善、停車方便、可排隊使用天文望遠鏡</p>
                </div>

                <div class="trait2">
                    <div class="transportation">
                        <h5>交通方式</h5>
                        <div class="transport">
                            <span>
                                <img src="../../assets/logo.svg" alt="">
                                大眾運輸
                            </span>
                            <span>
                                <img src="../../assets/logo.svg" alt="">
                                自行開車
                            </span>
                        </div>
                    </div>
                    <p>小提醒 ：搭乘大眾運輸務必搭乘22:00(藍40路線)返程</p>
                </div>

                <div class="trait3">
                    <h5>揪團活動</h5>
                    <p>敬請期待</p>
                </div>
            </div>
            <!-- 3. 氣象 -->
            <div class="map-detail-weather">
                <!-- 即時天氣 -->
                <div class="weather-now">
                    <h5>即時天氣</h5>
                    <div class="live-weather">
                        <img src="../../assets/logo.svg" alt="">
                        <div>32°C</div>
                    </div>
                </div>
                <!-- 五天預報 -->
                <div class="weather-5days">  <!--共五個div排列-->
                    <div>
                        <h5>週五</h5>
                        <div class="weather-icon">
                            <img src="../../assets/images/shoppingcart.svg" alt=""></img>
                        </div>
                        
                    </div>

                    <div>
                        <h5>週六</h5>
                        <img src="" alt="">
                    </div>

                    <div>
                        <h5>週日</h5>
                        <img src="" alt="">
                    </div>

                    <div>
                        <h5>週一</h5>
                        <img src="" alt="">
                    </div>

                    <div>
                        <h5>週二</h5>
                        <img src="" alt="">
                    </div>
               </div>
            </div>

            <!-- 4. google map -->
            <div class="map-detail-googleMap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.439320800984!2d120.39162959999999!3d23.1176119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e637f463eae97%3A0xdd0aaa4d9685c88d!2z5Y2X54Cb5aSp5paH6aSo!5e0!3m2!1szh-TW!2stw!4v1754911767971!5m2!1szh-TW!2stw" width="600" height="450" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

        </div>

        <!-- 裝飾線 -->
        <div class="mapbox-decorateLine"></div>
        
        <!-- 下方評論顯示區 -->
        <div class="mapbox-below">
            <!-- 評論標題 -->
            <div class="mapbox-review-title">
                <h3>地點評論</h3>

                <div class="mapbox-review-score"> <!--先隨便用一個logo-->
                    <img src="../../assets/logo.svg" alt="星星">
                    <h3>4.7</h3>
                </div>
            </div>
            <!-- 評論顯示區 -->
            <div class="mapbox-reviewList">
                <!-- 單一評論顯示小格 -->
                <div class="mapbox-singleReview">
                    <!-- 左邊文字評論 -->
                    <div class="singleReview-leftContent">
                        <h5>Skye</h5>
                        <span> <!--到時候img 用v-for跑 評論多少跑幾次-->
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                        </span>
                        <p class="cnContent--14px">新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星</p>
                    </div>
                    <!-- 右邊照片 -->
                    <div class="singleReview-rightPhoto">
                        <img src="" alt="">
                    </div>
                </div>

                <div class="mapbox-singleReview">
                    <!-- 左邊文字評論 -->
                    <div class="singleReview-leftContent">
                        <h5>Skye</h5>
                        <span> <!--到時候img 用v-for跑 評論多少跑幾次-->
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                        </span>
                        <p class="cnContent--14px">新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星</p>
                    </div>
                    <!-- 右邊照片 -->
                    <div class="singleReview-rightPhoto">
                        <img src="" alt="">
                    </div>
                </div>

                <div class="mapbox-singleReview">
                    <!-- 左邊文字評論 -->
                    <div class="singleReview-leftContent">
                        <h5>Skye</h5>
                        <span> <!--到時候img 用v-for跑 評論多少跑幾次-->
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                        </span>
                        <p class="cnContent--14px">新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星</p>
                    </div>
                    <!-- 右邊照片 -->
                    <div class="singleReview-rightPhoto">
                        <img src="" alt="">
                    </div>
                </div>

                <div class="mapbox-singleReview">
                    <!-- 左邊文字評論 -->
                    <div class="singleReview-leftContent">
                        <h5>Skye</h5>
                        <span> <!--到時候img 用v-for跑 評論多少跑幾次-->
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                            <img src="../../assets/logo.svg" alt="星星">
                        </span>
                        <p class="cnContent--14px">新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星</p>
                    </div>
                    <!-- 右邊照片 -->
                    <div class="singleReview-rightPhoto">
                        <img src="" alt="">
                    </div>
                </div>

                

            </div>
            <!-- 更多評論 -->
            <div class="mapbox-seeMore">
                <p>更多評論</p>
                <img src="../../assets/logo.svg" alt="">
            </div>
        </div>
    </div>


</template>

<style scoped lang="scss">
@import '../../assets/styles/main.scss';



// 地點彈窗
.map-contentBox {
    width: 1200px;
    height: calc( 100vh - 80px);
    overflow-y: auto;
    // height: 820px;

    border: 2px solid $primaryColor-500;
    background-color:$bgColor-white ;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    gap: 24px;

    position: fixed;
    margin: auto;
    top: 64px;
    right: 0;
    left: 0;
    padding: 60px 50px 30px;
    box-sizing: border-box;
}
.mapbox-close{
    height: 32px;

    position: absolute;
    top: 12px;
    right: 16px;
}


//上方地點詳細
.mapbox-Up{
    font-family: $chFont ;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 120px 170px;
}
    // 1. 地點名稱
.map-detial-title{
    grid-column: 1/2;
    grid-row: 1/2;
    align-self: start;

    display: flex;
    flex-direction: column;
    gap: 12px;
}
.map-detial-title h1{
    font-weight: bold;
}
    //2. 景點特色等文字介紹
.map-detial-trait{
    grid-column:  1/2;
    grid-row: 2/3;
    align-self: start;
    // border: 1px solid red;

    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: $pcChFont-p;
}
.trait1,.transportation, .trait3{
    display: flex;
    gap: 36px;
}
.trait2{
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.transport{
    display: flex;
    gap: 12px;
}
.transport span{
    display: flex;
}
.transport span img{
    width: 18px;
}

.trait2 p{
    font-size:$pcChFont-small ;
}

    // 3. 預報
.map-detail-weather{
    grid-column: 2/3;
    grid-row: 1/2;
    align-self: start;

    display: flex;
    gap: 32px;
    justify-content: center;
    align-items: center;
}
    //即時天氣
.weather-now{
    display: flex;
    flex-direction: column;
    

    // border: 1px solid red;
    overflow: hidden;
    border-radius: 10px ;
    width: 170px;
    text-align: center;
}
.weather-now h5{
    font-size: $pcChFont-p ;
    height: 30px;
    line-height: 30px;

    background-color: $primaryColor-500;
    color: $FontColor-white;
}
.live-weather{
    height: 70px;
    display: flex;
    justify-content:space-around;
    align-items: center;
    font-size:$pcChFont-H1 ;
    background-color: $primaryColor-800;
    color: $FontColor-white;
}
.live-weather img {
    width: 50px;
}
    //五天預報
.weather-5days{
    display: flex;
    gap:2px;
}
.weather-5days h5{
    font-size:$pcChFont-p ;
    line-height: 150%;
    background-color: $primaryColor-500;
    color:$FontColor-white;
    padding: 0 4px;
}
.weather-icon {
    // border: 1px solid red ;

    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.weather-icon img{
    width: 36px;
}


    //google 地圖
.map-detail-googleMap{
    justify-items: center;
    align-self: center;
}
.map-detail-googleMap iframe{
    display: block;

    width: 450px;
    height: 170px;

    
}

//裝飾線
.mapbox-decorateLine{
    width: 100%;
    height: 2px;
    background-color: $primaryColor-100;
}



//下方評論顯示區
.mapbox-below{
    display: flex;
    flex-direction: column;

    font-family: $chFont;
}
    //評論區標題
.mapbox-review-title{
    // border: 1px solid blue;
    display: flex;
    align-items: center;
    gap: 8px;

    margin-bottom: 16px;
}
.mapbox-review-score{
    // border: 1px solid red;
    display: flex;
}
.mapbox-review-title h3{
    font-size: $pcChFont-H3 ;
    // margin-left: 8px;
}
.mapbox-review-score img{
    width: 24px;
    height: 24px;
}

    //評論列表
.mapbox-reviewList{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}
    //單一評論小格
.mapbox-singleReview{
    
    
    padding: 10px;
    border: 1px solid $primaryColor-100;
    box-sizing: border-box;

    display: flex;
    gap: 12px;;
}
    //單一小格左邊文字
.singleReview-leftContent{
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 4px ;
}
.singleReview-leftContent h5{
    font-size: $pcChFont-p;
}
.singleReview-leftContent span img{
    width: 12px;
}


    //單一小格右邊照片
.singleReview-rightPhoto{
    width: 160px;
    height: 120px;
    background-color:$FontColor-gray ;
}
.singleReview-rightPhoto img{
    display: block;
    width: 160px;
    height: 120px;
}

//查看更多
.mapbox-seeMore{
    align-self: self-end;

    margin: 10px 10px 0 0;
    display: flex;
    align-items: center;
}
.mapbox-seeMore p{
    font-size: $pcChFont-p;
}
.mapbox-seeMore:hover{
    color:$secondaryColor-orange ;
}
.mapbox-seeMore img{
    width: 18px;
}

</style>