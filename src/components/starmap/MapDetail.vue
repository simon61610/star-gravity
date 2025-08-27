<script setup>
import { ref, defineEmits, defineProps, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import sunnyIcon from "@/assets/icons/icon-map-sunny.svg"
import cloudyIcon from "@/assets/icons/icon-map-cloudy.svg"
import rainIcon from "@/assets/icons/icon-map-rainy.svg"
import thunderIcon from "@/assets/icons/icon-map-thunder.svg"
import sunnrRainyIcon from "@/assets/icons/icon-map-sun&rainy.svg"

const emit = defineEmits(['closeModel', 'showReview'])
const props = defineProps(["selectedLocation","selectedLocationId", 'locationReviews'])
const API_KEY = "CWA-CF702105-AC4A-4F92-9483-D47FBE37A110"
const weatherData = ref([])  //預報資料
const temperature = ref('')
const weather = ref('')
const sixDaysArray = ref([])

//取評論列表的前四個
const fourReviewList = computed(()=>{
    if( !props.locationReviews || props.locationReviews.length === 0){
        return []
    }else{
        return props.locationReviews.slice(0 , 4)
    }
})
//取得預報的天氣圖案
function getWeatherIcon(weather) {
    if(weather.includes('雷')|| weather.includes('陣')){
        return thunderIcon
    }else if(weather.includes('雨') && weather.includes('晴')){
        return sunnrRainyIcon
    }else if(weather.includes('雨') ){
        return rainIcon
    }else if(weather.includes('雲') || weather.includes('陰')){
        return cloudyIcon
    }else if(weather.includes('晴')){
        return sunnyIcon
    }
}

//事件監聽
    //關閉彈窗
function closeModel(){
    emit('closeModel')
}
   //開啟更多評論
function showReview(){
    emit('showReview')
}
function getSixDays(){
    if (!weatherData.value.records) return;
    let tem = ''
    let wea = ''
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    let weekDay = ''
    let date = ''
    sixDaysArray.value = []
    for( let i=1 ; i<7 ; i++){
        let j = i*2
        tem = weatherData.value.records.Locations[0].Location[0].WeatherElement[0].Time[j].ElementValue[0].Temperature //當天氣溫
        wea = weatherData.value.records.Locations[0].Location[0].WeatherElement[12].Time[j].ElementValue[0].Weather //當天氣溫
        date = weatherData.value.records.Locations[0].Location[0].WeatherElement[12].Time[j].StartTime
        const dayIndex = new Date(date).getDay();
        weekDay = weekdays[dayIndex]

        sixDaysArray.value.push({ 溫度:tem, 天氣:wea, 星期:weekDay})

        // 0: {溫度: '32', 天氣: '陰時多雲', 星期: '一'}
        // 1: {溫度: '31', 天氣: '多雲', 星期: '二'}
        // 2: {溫度: '30', 天氣: '陰時多雲', 星期: '三'}
        // 3: {溫度: '30', 天氣: '多雲時陰', 星期: '四'}
        // 4: {溫度: '30', 天氣: '多雲時陰短暫陣雨', 星期: '五'}
        // 5: {溫度: '30', 天氣: '陰短暫陣雨', 星期: '六'}
    }
}

const getWeather = async()=>{
    try{
        const response = await axios.get('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWA-CF702105-AC4A-4F92-9483-D47FBE37A110', {
            params: {
            Authorization: API_KEY,
            LocationName: props.selectedLocation.city,
            format: 'JSON',
            }   
        })
        weatherData.value = response.data //該縣市整包資訊
        temperature.value = weatherData.value.records.Locations[0].Location[0].WeatherElement[0].Time[0].ElementValue[0].Temperature //當天氣溫
        weather.value = weatherData.value.records.Locations[0].Location[0].WeatherElement[12].Time[0].ElementValue[0].Weather //當天天氣

    }catch (error) {
        console.error('API 錯誤:', error)
    }
}

watch(() => props.selectedLocation, async (newLocation) => {
    if (newLocation) {
        await getWeather()
        getSixDays()
    }
} )
    


//暫時除錯用
const locationId = ref('')  //用來賦值父組件過來的selectedLocationId
function aaa(){
    locationId.value = props.selectedLocationId
    // console.log(locationId.value);
    // console.log(fourReviewList.value);
    console.log(weatherData.value);
    // console.log(temperature.value);
    // console.log(weather.value);
    console.log(sixDaysArray.value);
    
    // console.log(weatherData.value.records.Locations[0].Location[0].WeatherElement[0].Time[0].ElementValue[0].Temperature);
    // console.log(weatherData.value.records.Locations[0].Location[0].WeatherElement[12].Time[0].ElementValue[0].Weather);

}


</script>

<template>
    <!-- 內容彈窗 -->
    <div class="map-contentBox" @load="getReviewsByLocationId">
          <!-- 叉叉按鈕 -->
        <img class="mapbox-close" src="../../assets/icons/icon-map-close.svg" alt="??" @click="closeModel">
        
        <div class="map-contentInsideBox">
          
             <!-- 上面資訊欄 -->
            <div class="mapbox-Up">
                <!-- 四個區域用分上下兩個flexbox排列 -->
                <!-- 第一排 -->
                <div class="mapbox-Up-row1">
                    <!-- 地點名稱 -->
                    <div class="map-detial-title">
                        <h1 class="cnTitle--h1" @click="aaa">{{props.selectedLocation.name}}</h1>
                        <h3 class="cnTitle--h5">{{props.selectedLocation.address}}</h3>
                    </div>

                    <!-- 氣象 -->
                    <div class="map-detail-weather">
                        <!-- 即時天氣 -->
                        <div class="weather-now">
                            <h5>即時天氣</h5>
                            <div class="live-weather">
                                <img src="@/assets/icons/icon-map-sunny.svg" alt="">
                                <div>{{temperature}}°C</div>
                            </div>
                        </div>
                        <!-- 六天預報 -->
                        <div class="weather-6days">  
                            <div v-for="(day, index) in sixDaysArray" class="daily-weather">
                                <h5>週{{day['星期']}}</h5>
                                <!-- <p class="cnContent--18px">{{day['溫度']}}</p> -->
                                <img class="weather-icon" :src="getWeatherIcon(day.天氣)"></img>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- 第二排 -->
                <div class="mapbox-Up-row2">
                    <!-- 景點特色等文字介紹 -->
                    <div class="map-detial-trait">
                        <div class="trait1">
                            <h5>景點特色</h5>
                            <p>{{props.selectedLocation.features}}</p>
                        </div>

                        <div class="trait2">
                            <div class="transportation">
                                <h5>交通方式</h5>
                                <div class="transport">
                                    <span v-if="props.selectedLocation.publicTrans">
                                        <img src="@/assets/icons/icon-map-bus.svg" alt="">
                                        大眾運輸
                                    </span>
                                    <span>
                                        <img src="@/assets/icons/icon-map-car.svg" alt="">
                                        自行開車
                                    </span>
                                </div>
                            </div>
                            <span>{{props.selectedLocation.reminders}}</span>
                            
                        </div>

                        <div class="trait3">
                            <h5>揪團活動</h5>
                            <p>敬請期待</p>
                        </div>
                    </div>

                    <!-- 4. google map -->
                    <div class="map-detail-googleMap">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.439320800984!2d120.39162959999999!3d23.1176119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e637f463eae97%3A0xdd0aaa4d9685c88d!2z5Y2X54Cb5aSp5paH6aSo!5e0!3m2!1szh-TW!2stw!4v1754911767971!5m2!1szh-TW!2stw" width="600" height="450" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>


                </div>

            </div>

            <!-- 裝飾線 -->
            <div class="mapbox-decorateLine"></div>
            
            <!-- 下方評論顯示區 -->
            <div class="mapbox-below">
                <!-- 評論標題 -->
                <div class="mapbox-review-title">
                    <h3>地點評論</h3>

                    <div class="mapbox-review-score">
                        <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
                        <h3>4.7</h3>
                    </div>
                </div>
                <!-- 評論顯示區 -->
                <div class="mapbox-reviewList">
                    <!-- 單一評論顯示小格 -->
                    <div v-for="review in fourReviewList" class="mapbox-singleReview">
                        <!-- 左邊文字評論 -->
                        <div class="singleReview-leftContent">
                            <h5>{{review.會員名稱}}</h5>
                            <span> <!--到時候img 用v-for跑 評論多少跑幾次-->
                                <img v-for="value in review.評論分數" src="@/assets/icons/icon-guide_star.svg" alt="星星">
                            </span>
                            <p class="cnContent--14px">{{ review.評論內容 }}</p>
                        </div>
                        <!-- 右邊照片 -->
                        <div v-if="!review.圖片" class="singleReview-rightPhoto">
                            <img src="../../assets/images/map/map-reviewleft.jpg" alt="">
                        </div>
                    </div>

                </div>
                <!-- 更多評論 -->
                <div class="mapbox-seeMore" @click.prevent="showReview">
                    <p>更多評論</p>
                    <img src='@/assets/icons/icon-map-goToBack.svg' alt="">
                </div>
            </div>
        </div>
    </div>


</template>

<style scoped lang="scss">
@import '../../assets/styles/main.scss';


// 地點彈窗
.map-contentBox{
    width: min(90vw, 1200px);  
    max-height: 90vh;  
    padding: clamp(20px, 3vw, 40px);  

    border: 2px solid $primaryColor-500;
    background-color:$bgColor-white ;
    border-radius: 20px;

    // padding: 40px 50px 40px;
    box-sizing: border-box;

    //讓內容物在任何螢幕尺寸都能置中
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;


    position: absolute;
    margin: auto;
    top: 0px;
    bottom: 0;
    right: 0;
    left: 0;
}
.map-contentInsideBox {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color:$bgColor-white ;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    &::-webkit-scrollbar {
            width: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background: $primaryColor-500;
            border-radius: 10px;
            /* 重點：加邊框讓滾軸往內縮 */
            border: 1px solid transparent;
            background-clip: content-box;
        }

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

    display: flex;
    flex-direction: column;
    gap: 20px;
}

//第一排
.mapbox-Up-row1, .mapbox-Up-row2{
    display: flex;
    // flex-wrap: wrap; 
    gap: 20px;
    align-items: flex-start;
    box-sizing: border-box;
}
//第二排
    // 1. 地點名稱
.map-detial-title{
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.map-detial-title h1{
    font-weight: bold;
}
    //2. 景點特色等文字介紹
.map-detial-trait{
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: $pcChFont-p;
}
.trait1,.transportation, .trait3{
    display: flex;
    // flex-direction: column;
    gap: 12px;
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

.trait2 p , .trait2 > span{
    font-size:$pcChFont-small ;
}

    // 3. 預報
.map-detail-weather{
    width: 100%;
    justify-items: center;
    flex-grow: 1;

    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; 
    // margin-right: 24px;
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
    border: 2px solid $primaryColor-500;
    // background-color: $primaryColor-800;
    border-radius: 0 0 10px 10px ;
    color: $primaryColor-800;
}
.live-weather img {
    width: 65px;
}
    //五天預報
.weather-6days{
    display: flex;
    gap:2px;
}
.weather-6days h5{
    font-size:$pcChFont-p ;
    line-height: 150%;
    background-color: $primaryColor-500;
    color:$FontColor-white;
    padding: 0 4px;
}
.daily-weather{
    display: flex;
    flex-direction: column;
    align-items: center;

}
.weather-icon{
    width: 36px;
    display: block;
    margin: 0 auto;
}
.weather-icon img{
    width: 36px;
}


    //google 地圖
.map-detail-googleMap{
    width: 100%;
    justify-items: center;
    align-self: center;
}
.map-detail-googleMap iframe{
    display: block;

    width: 90%;
    max-width: 500px;
    height: 160px;

    
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
    // max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 4px ;
}
.singleReview-leftContent h5{
    font-size: $pcChFont-p;
    // color: $primaryColor-800;
}
.singleReview-leftContent p{
    color: $primaryColor-500;
}
.singleReview-leftContent span img{
    width: 12px;
}


    //單一小格右邊照片
.singleReview-rightPhoto{
    width: 160px;
    height: 120px;
    background-color:transparent ;
}
.singleReview-rightPhoto img{
    display: block;
    width: 160px;
    height: 120px;
}

//查看更多
.mapbox-seeMore{
    align-self: self-end;
    cursor: pointer;

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
    transform: rotate(180deg);
}

@media screen and (max-width:430px) {
    .mapbox-Up-row1, .mapbox-Up-row2{
        flex-direction: column;
        gap: 36px;
    }
    .map-detail-weather{
        flex-wrap: nowrap;

    }
    .weather-6days h5{
        font-size: 14px;
    }
    .live-weather{
        font-size: 36px;
    }

    .map-detial-trait{
        gap: 24px;
    }
    .trait1, .mapbox-below , .transportation{
        flex-direction: column;
        gap: 10px;
    }
    .map-detail-googleMap{
        width: 100%;
    }

    .mapbox-below{
        margin-top: 48px;
    }
    .mapbox-reviewList{
        grid-template-columns:1fr;
    }
    .mapbox-singleReview{
        flex-direction: column;
    }
}


</style>