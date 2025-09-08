<template>
    <div class="wrapper">
        <!-- 列表與地圖 -->
        <MapMain 
            :locationList="locationList" 
            @show-detail="handleShowDetail"
        />

        <div v-show=" showLayout " class="layout"></div>
        <div v-show=" showLayout2 " class="layout2"></div>

        <!-- 地點詳細彈窗 -->
        <MapDetail 
            v-show="detailShow" 
            @closeModel="closeModel"
            @showReview="showReview"  
            :selectedLocation="selectedLocation"
            :selectedLocationId="selectedLocationId"
            :locationReviews="locationReviews"
        />

        <!-- 地點評論 -->
        <MapReview 
            v-show="reviewShow" 
            @closeModel="closeModel"
            @backToDetail="backToDetail"
            @writeReview="writeReview"
            :selectedLocation="selectedLocation"
            :selectedLocationId="selectedLocationId"
            :locationReviews="locationReviews"
        />

        <!-- 評論填寫框 -->
        <ReviewPlace 
            v-show="reviewPlaceShow"
            :selectedLocationId="selectedLocationId"
            @cencelReview="cencelReview"
        />
        
    </div>
</template>

<script setup>
import {computed, reactive, ref} from 'vue'
import MapMain from '@/components/starmap/MapMain.vue';
import MapDetail from '@/components/starmap/MapDetail.vue';
import MapReview from '@/components/starmap/MapReview.vue';
import ReviewPlace from '@/components/starmap/ReviewPlace.vue';
import { componentSizes } from 'element-plus';

// 假數據
const locationList = ref([])
// const locationList = ref([
//   { id: 1, region: '南部', scene: '市郊', name:'南瀛天文館', image: 'starmapPhoto01.jpg', features:'親子友善、望遠鏡觀測、設施完善', reminders:'建議傍晚入園，攜帶防蚊用品' ,score:4.7, address:"台南市大內區34-2號", publicTrans:1 ,coords:[ 385 , 380], lat: 23.11786, lon: 120.39165, city:'臺南市', coords_y:385, coords_x:380},
//   { id: 2, region: '北部', scene: '山間', name:'陽明山', image: 'starmapPhoto02.jpg', features:'高海拔清涼、星空視野佳、適合拍攝星軌', reminders:'搭乘台灣好行小9公車，末班車 22:50（平日與假日相同），務必搭此班返程。' ,score:4.5, address:"台北市士林區竹子湖", publicTrans:1 ,coords:[ 880 , 630], lat: 25.16925, lon: 121.57635, city:'臺北市', coords_y:880, coords_x:630},
//   { id: 3, region: '中部', scene: '山間', name:'杉林溪', image: 'starmapPhoto03.jpg', features:'自然環境清幽、住宿方便', reminders:'園區需付費，夜晚氣溫較低' ,score:4.3, address:"南投縣溪頭", publicTrans:1 ,coords:[ 510 , 470], lat: 23.63708, lon: 120.79492, city:'南投縣', coords_y:510, coords_x:470},
//   { id: 4, region: '東部', scene: '海邊', name:'三仙台', image: 'starmapPhoto04.jpg', features:'海岸風光、星空與拱橋同框', reminders:'地面不平、夜晚需照明設備' ,score:4.2, address:"台東縣", publicTrans:0 ,coords:[ 385 , 595], lat: 22.06348, lon: 121.52598, city:'臺東縣', coords_y:385, coords_x:595},
//   { id: 5, region: '離島', scene: '海邊', name:'蘭嶼', image: 'starmapPhoto05.jpg', features:'適合觀測銀河、流星雨與夏季星座', reminders:'當地尊重原民文化，避免夜間喧嘩' ,score:4.0, address:"台東縣蘭嶼", publicTrans:0 ,coords:[ 122 , 635], lat: 23.12393, lon: 121.40900, city:'臺東縣', coords_y:122, coords_x:635},
// ])


// 向後端發出請求
fetch('http://localhost:80/star/map/getLocationList.php')
// fetch('pdo/map/getLocationList.php')
    .then( resp => resp.json())
    .then( list => {
        // console.log(list)
        locationList.value = list
    })



const detailShow = ref(false)
const showLayout = ref(false)
const showLayout2 = ref(false)
const reviewShow = ref(false)
const reviewPlaceShow = ref(false)
const selectedLocation = ref('') 
const selectedLocationId = ref('')   //抓到當前選擇地點的ID
const locationReviews = ref([])

function handleShowDetail(location) {
    selectedLocation.value = location  //從main那邊點選後 傳來的值 本身就是該地點的物件 { id: 1, region: '南部', scene: '市郊', name:'南瀛天文館', img: '../../assets/images/map/map-tainanPhoto.jpg',score:4.7, address:"台南市大內區34-2號" ,coords:[ 385 , 380] }
    selectedLocationId.value = selectedLocation.value.ID
    detailShow.value = true              
    showLayout.value = true
    
    fetch('http://localhost:80/star/map/getLocationReview.php',{
    // fetch('pdo/map/getLocationReview.php',{
        method: 'POST' ,
        headers:{'Content-Type' : 'application/json'} ,
        body: JSON.stringify({
                locationIndex: selectedLocationId.value ,
            })
    })
    .then( resp => resp.json() )
    .then( reviews => { 
        locationReviews.value = reviews
     })
    // console.log(selectedLocationId.value)    //確認選擇的location id
}
function closeModel(){
    detailShow.value = false
    showLayout.value = false
    reviewShow.value = false
}
function showReview(){
    reviewShow.value = true   
}
function backToDetail(){
    reviewShow.value = false
}
function writeReview(){
    reviewPlaceShow.value = true
    showLayout2.value = true
    showLayout.value = false
}
function cencelReview(){
    reviewPlaceShow.value = false
    showLayout2.value = false
    showLayout.value = true
}




</script>

<style scoped>
.wrapper{
    height: calc( 100vh - 50px) ;
    position: relative;
    box-sizing: border-box;
}
.layout{
    width: 100%;
    height: calc( 100vh - 50px);
    background-color: #080d27ad;

    position: absolute;
    top: 0;
    z-index: 5;
}  
.layout2{
    width: 100%;
    height: calc( 100vh - 50px);
    background-color: #080d27ad;

    position: absolute;
    top: 0;
    z-index: 300;
}
</style>
