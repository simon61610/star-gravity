<script setup></script>

<template>
    <div class="wrapper">
        <!-- 左半邊 -->
        <div class="map-leftBlock">            
            <!-- 上方checkbox -->
            <div class="loFilterList">
                
                <!--篩選標題-->
                <h4>地點篩選</h4>
               
                <!-- 地區 -->
                <div class="regionChoice">
                    <h5>地區：</h5>
                    <div class="radioList">
                        <input type="radio" id="all" name="region">
                        <label for="all">全台</label>
                        
                        <ul >
                            <li>
                                <input type="radio" id="beibu" name="region">
                                <label for="beibu">北部</label>
                            </li>
                            <li>
                                <input type="radio" id="zhongbu" name="region">
                                <label for="zhongbu">中部</label>
                            </li>
                            <li>
                                <input type="radio" id="nanbu" name="region">
                                <label for="nanbu">南部</label>
                            </li>
                            <li>
                                <input type="radio" id="dongbu" name="region">
                                <label for="dongbu">東部</label>
                            </li>
                            <li>
                                <input type="radio" id="lidao" name="region">
                                <label for="lidao">離島</label>
                            </li>
                        </ul>
                        
                    </div>
                </div>

                <!-- 場景 -->
                <div class="sceneChoice">
                    <h5>場景：</h5>
                    <ul class="checkboxList">
                        <li>
                            <input type="checkbox" id="shan" value="山間">
                            <label for="shan">山間</label>
                        </li>
                        <li>
                            <input type="checkbox" id="beach" value="海邊">
                            <label for="beach">海邊</label>
                        </li>
                        <li>
                            <input type="checkbox" id="city" value="市區">
                            <label for="city">市區</label>
                        </li>
                        <li>
                            <input type="checkbox" id="suburbs" value="市郊">
                            <label for="suburbs">市郊</label>
                        </li>                                      
                     </ul>
                </div>
                
                <!-- 搜尋框 -->
                <div class="locationSection">
                    <input type="text" id="" class="inputPlace" >
                    <div>
                        <!-- 動態生成選項 -->
                    </div>
                </div>

            </div>
                <!-- 地點列表 -->
                <div class="locatinList"> <!--這要動態生成 先寫三個意思意思-->
                    <ul>
                        <li>
                            <div class="tag">
                                <span>南部</span>
                                <span>市郊</span>
                            </div>
                            

                            <div class="title">
                                <h2>南瀛天文館</h2>
                                <div class="score">
                                    <!-- <img src="image/star.svg" alt=""> -->
                                    <h3>4.7</h3>   
                                </div>                    
                           
                            </div>

                            <h5>台南市大內區34-2號</h5>

                             <!--以下兩個點擊後才顯示-->
                            <!-- <img src="image/tainan.jpg" alt=""> -->

                            <!-- <a class="seeMore" href="#">
                                <p>更多資訊</p>
                                <img src="image/arrow.svg" alt="">
                            </a> -->

                            <!----------------------->
                            <div class="map-decorateLine"></div> <!-------裝飾線-------->
                        </li>
                        
                        <li>
                            <div class="tag">
                                <span>南部</span>
                                <span>市郊</span>
                            </div>
                            

                            <div class="title">
                                <h2>南瀛天文館</h2>
                                <div class="score">
                                    <!-- <img src="image/star.svg" alt=""> -->
                                    <h3>4.7</h3>   
                                </div>                    
                           
                            </div>

                            <h5>台南市大內區34-2號</h5>

                             <!--以下兩個點擊後才顯示-->
                            <!-- <img src="image/tainan.jpg" alt="">

                            <div class="seeMore">
                                <p>更多資訊</p>
                                <img src="image/arrow.svg" alt="">
                            </div> -->
                            <!----------------------->
                            <div class="map-decorateLine"></div> <!-------裝飾線-------->
                        </li>

                        <li>
                            <div class="tag">
                                <span>南部</span>
                                <span>市郊</span>
                            </div>
                            

                            <div class="title">
                                <h2>南瀛天文館</h2>
                                <div class="score">
                                    <!-- <img src="image/star.svg" alt=""> -->
                                    <h3>4.7</h3>   
                                </div>                    
                           
                            </div>

                            <h5>台南市大內區34-2號</h5>

                             <!--以下兩個點擊後才顯示-->
                            <!-- <img src="image/tainan.jpg" alt="">

                            <div class="seeMore">
                                <p>更多資訊</p>
                                <img src="image/arrow.svg" alt="">
                            </div> -->
                            <!----------------------->
                            <div class="map-decorateLine"></div> <!-------裝飾線-------->
                        </li>


                    </ul> 


                </div>
                

            
        </div>
        
        <!-- 左半邊台灣 -->
         <div class="map-rightBlock"></div>

        <!-- 右下裝飾字 -->
        <div class="map-decorate">
            <p>精選觀星地點</p>
            <h1>STAR<br>MAP</h1>
        </div>
    </div>
</template>


<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.wrapper{
    padding: 12px 0;
    background-color: $primaryColor-900;
}

/*右下裝飾字體*/
.map-decorate{
    color: $FontColor-white;
    display: flex;
    flex-direction: column;

    position: absolute;
    right: 1%;
    bottom: 1%;
}
.map-decorate p{
    font-family: $chFont ;

    display: block;
    width: 230px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid $FontColor-white;

    text-align: center;
    line-height: 70px;

    font-size: $pcChFont-H3;

    font-weight: bold;
}
.map-decorate h1{
    font-family:$enFont ;
    font-size: $pcEngFont-numberTitle;
    line-height: 100%;
}




/* 左半邊 */
.map-leftBlock{
    border: 2px solid red;
    box-sizing: border-box;
    max-width: 430px;
    max-height: calc(100vh - 74px);
    font-family: $chFont ;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    margin-left:160px;
}

/*上方篩選區*/
.loFilterList{
    color: $FontColor-white;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.loFilterList h4{
    font-size: $pcChFont-H4;
}

input{
    margin: 0;
    width: 16px;
    height: 16px;
    
}

/* 地區 */
.regionChoice{
    display: flex;
    gap: 12px;

    font-size: $pcChFont-p;
}
.radioList ul{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;

    font-size: $pcChFont-p;
}

/* 場景 */
.sceneChoice{
    display: flex;
    gap: 12px;

    font-size: $pcChFont-p;

}
.checkboxList{
    display: flex;
    gap: 8px;

    font-size: $pcChFont-p;
}


/*搜尋框*/
.locationSection{
    width: 100%;
    align-self: center;
   
    
}
.inputPlace{
    width: 100%;
    height: 40px;
    border-radius: 999px;
    border-color:$primaryColor-100 ;
    box-sizing: border-box;

    padding-left: 24px;

    
}

/*地點列表*/
.locatinList{
    width: 100%;
    border: 2px solid $primaryColor-100;
    box-sizing: border-box;
    
    background-color: $FontColor-white;
    border-radius: 20px;
    

    overflow-y: auto;
}
.locatinList ul{
    
    display: flex;
    gap: 24px;
    flex-direction: column;
    padding: 24px;
    margin-bottom: 24px;    
}
.locatinList ul li{
    /* border: 1px solid blue; */

    display: flex;
    flex-direction: column;
}
.tag{
    display: flex;
    gap: 4px;

    margin-bottom: 8px;
}
.locatinList ul li span{
    padding: 0px 10px;
    background-color: $primaryColor-800;
    border-radius: 999px;

    color: $FontColor-white;
    font-size: $pcChFont-p;
    line-height: 150%;
}
.title{
    display: flex;
    justify-content: space-between;

    margin-bottom: 4px;
}
.title h2{
    font-size: $pcChFont-H2;
    line-height: 120%;

    font-weight: bold;

}
.title h3{
    font-size: $pcChFont-H3;
    font-weight: bold;
}
.score{
    display: flex;
    gap: 8px;

    align-items: end ;
}
.score img{
    width: 24px;
}

.locatinList h5{
    font-size: $pcChFont-p;
    line-height: 150%;

    margin-bottom: 16px;
}
/*點擊後顯示*/
.locatinList ul li > img{
    display: block;
    border-radius: 20px;

    width: 100%;
    height: 180px;
    object-fit:cover;

    margin-bottom: 12px;
}
.seeMore{
    text-decoration: none;
    color: $FontColor-black;

    display: flex;
    gap: 4px;
    align-items: center ;

    align-self: flex-end;

    margin-bottom: 24px;
}
/*裝飾線*/
.map-decorateLine{
    height: 2px;
    background-color: $primaryColor-100;
}
</style>