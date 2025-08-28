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

//假數據
const locationList = ref([
  { id: 1, region: '南部', scene: '市郊', name:'南瀛天文館', img: '../../assets/images/map/map-tainanPhoto.jpg', features:'親子友善、望遠鏡觀測、設施完善', reminders:'建議傍晚入園，攜帶防蚊用品' ,score:4.7, address:"台南市大內區34-2號", publicTrans:1 ,coords:[ 385 , 380], lat: 23.11786, lon: 120.39165, city:'臺南市'},
  { id: 2, region: '北部', scene: '山間', name:'陽明山',img: '../../assets/images/map/map-taipeiPhoto.jpg', features:'高海拔清涼、星空視野佳、適合拍攝星軌', reminders:'搭乘台灣好行小9公車，末班車 22:50（平日與假日相同），務必搭此班返程。' ,score:4.5, address:"台北市士林區竹子湖", publicTrans:1 ,coords:[ 880 , 630], lat: 25.16925, lon: 121.57635, city:'臺北市'},
  { id: 3, region: '中部', scene: '山間', name:'杉林溪',img: '../../assets/images/map/map-taichungPhoto.jpg', features:'自然環境清幽、住宿方便', reminders:'園區需付費，夜晚氣溫較低' ,score:4.3, address:"南投縣溪頭", publicTrans:1 ,coords:[ 510 , 470], lat: 23.63708, lon: 120.79492, city:'南投縣'},
  { id: 4, region: '東部', scene: '海邊', name:'三仙台',img: '../../assets/images/map/map-taichungPhoto.jpg', features:'海岸風光、星空與拱橋同框', reminders:'地面不平、夜晚需照明設備' ,score:4.2, address:"台東縣", publicTrans:0 ,coords:[ 385 , 595], lat: 22.06348, lon: 121.52598, city:'臺東縣'},
  { id: 5, region: '離島', scene: '海邊', name:'蘭嶼',img: '../../assets/images/map/map-taichungPhoto.jpg', features:'適合觀測銀河、流星雨與夏季星座', reminders:'當地尊重原民文化，避免夜間喧嘩' ,score:4.0, address:"台東縣蘭嶼", publicTrans:0 ,coords:[ 122 , 635], lat: 23.12393, lon: 121.40900, city:'臺東縣'},
])
const mockReviews = ref([
    // 地點ID: 1 (南瀛天文館) - 2筆評論
    {
        id: 1,
        locationId: 1,                    // 地點ID
        會員名稱: 'StarGazer123',          // 會員名稱
        評論分數: 5,                      // 評論分數 (1-5分)
        評論內容: '新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。設備很齊全！', // 評論內容
        圖片: '../../assets/images/map/map-reviewleft.jpg', // 圖片路徑
        時間: '2025/07/01'                // 時間
    },
    {
        id: 2,
        locationId: 1,                    // 地點ID: 1
        會員名稱: 'MoonHunter',
        評論分數: 1,
        評論內容: '很棒的天文教育場所，帶小朋友來學習天文知識很不錯。不過假日人比較多，建議平日來訪。',
        圖片: '',                         // 沒有圖片
        時間: '2025/07/05'
    },
        {
        id: 3,
        locationId: 1,                    // 地點ID: 1
        會員名稱: '我世人',
        評論分數: 4,
        評論內容: '很棒的天文教育場所，帶小朋友來學習天文知識很不錯。不過假日人比較多，建議平日來訪。',
        圖片: '',                         // 沒有圖片
        時間: '2025/07/10'
    },
        {
        id: 4,
        locationId: 1,                    // 地點ID: 1
        會員名稱: '團專真可怕',
        評論分數: 4,
        評論內容: '很棒的天文教育場所，帶小朋友來學習天文知識很不錯。不過假日人比較多，建議平日來訪。',
        圖片: '',                         // 沒有圖片
        時間: '2025/07/15'
    },
        {
        id: 5,
        locationId: 1,                    // 地點ID: 1
        會員名稱: '我世人',
        評論分數: 4,
        評論內容: '很棒的天文教育場所，帶小朋友來學習天文知識很不錯。不過假日人比較多，建議平日來訪。',
        圖片: '',                         // 沒有圖片
        時間: '2025/07/20'
    },
        {
        id: 6,
        locationId: 1,                    // 地點ID: 1
        會員名稱: '團專真可怕',
        評論分數: 4,
        評論內容: '很棒的天文教育場所，帶小朋友來學習天文知識很不錯。不過假日人比較多，建議平日來訪。',
        圖片: '',                         // 沒有圖片
        時間: '2025/07/25'
    },

    // 地點ID: 2 (陽明山) - 2筆評論
    {
        id: 3,
        locationId: 2,                    // 地點ID: 2
        會員名稱: 'MountainStar',
        評論分數: 5,
        評論內容: '台北最佳觀星地點！遠離了市區的光害，可以清楚看到銀河。山上風景也很美，白天晚上都適合來。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/22'
    },
    {
        id: 4,
        locationId: 2,                    // 地點ID: 2
        會員名稱: 'UrbanAstro',
        評論分數: 4,
        評論內容: '不錯的觀星體驗，但要注意保暖！山上晚上很冷，記得帶外套。開車上山要小心，山路比較彎曲。',
        圖片: '',
        時間: '2025/07/12'
    },
     {
        id: 3,
        locationId: 2,                    // 地點ID: 2
        會員名稱: 'Mounar',
        評論分數: 5,
        評論內容: '台北最佳觀星地點！遠離了市很美，白天晚上都適合來。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/22'
    },
    {
        id: 4,
        locationId: 2,                    // 地點ID: 2
        會員名稱: 'Urbantro',
        評論分數: 4,
        評論內容: '不錯的觀星體驗，但要注意保暖！山上晚上很冷，記得帶外套。開車上山要小心，山路比較彎曲。',
        圖片: '',
        時間: '2025/08/12'
    },

    // 地點ID: 3 (杉林溪) - 2筆評論
    {
        id: 5,
        locationId: 3,                    // 地點ID: 3
        會員名稱: 'ForestSky',
        評論分數: 5,
        評論內容: '高山觀星的絕佳選擇！海拔高、空氣清新，星空非常清晰。建議住一晚，可以體驗完整的夜空變化。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/05'
    },
    {
        id: 6,
        locationId: 3,                    // 地點ID: 3
        會員名稱: 'NatureLover',
        評論分數: 4,
        評論內容: '很棒的觀星地點，森林環境很舒服。住宿設施不錯，餐廳的食物也很好吃。就是交通比較不便。',
        圖片: '',
        時間: '2025/06/28'
    },
    {
        id: 5,
        locationId: 3,                    // 地點ID: 3
        會員名稱: 'ForestSky',
        評論分數: 5,
        評論內容: '高山觀星的絕佳選擇！海拔高、空氣清新，星空非常清晰。建議住一晚，可以體驗完整的夜空變化。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/05'
    },
    {
        id: 6,
        locationId: 3,                    // 地點ID: 3
        會員名稱: 'NatureLover',
        評論分數: 4,
        評論內容: '很棒的觀星地點，森林環境很舒服。住宿設施不錯，餐廳的食物也很好吃。就是交通比較不便。',
        圖片: '',
        時間: '2025/06/28'
    },
    {
        id: 5,
        locationId: 3,                    // 地點ID: 3
        會員名稱: 'ForestSky',
        評論分數: 5,
        評論內容: '高山觀星的絕佳選擇！海拔高、空氣清新，星空非常清晰。建議住一晚，可以體驗完整的夜空變化。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/05'
    },
    {
        id: 6,
        locationId: 3,                    // 地點ID: 3
        會員名稱: 'NatureLover',
        評論分數: 4,
        評論內容: '很棒的觀星地點，森林環境很舒服。住宿設施不錯，餐廳的食物也很好吃。就是交通比較不便。',
        圖片: '',
        時間: '2025/06/28'
    },

    // 地點ID: 4 (三仙台) - 2筆評論
    {
        id: 7,
        locationId: 4,                    // 地點ID: 4
        會員名稱: 'OceanStar',
        評論分數: 4,
        評論內容: '海邊觀星別有一番風味！聽著海浪聲看星星很浪漫。就是風比較大，要注意保暖和設備固定。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/01'
    },
    {
        id: 8,
        locationId: 4,                    // 地點ID: 4
        會員名稱: 'EastCoastFan',
        評論分數: 5,
        評論內容: '台東最美的觀星地點！海天一色的夜空真的很震撼。建議提早到，可以先看夕陽再等星星出現。',
        圖片: '',
        時間: '2025/06/25'
    },
    {
        id: 7,
        locationId: 4,                    // 地點ID: 4
        會員名稱: 'OceanStar',
        評論分數: 4,
        評論內容: '海邊觀星別有一番風味！聽著海浪聲看星星很浪漫。就是風比較大，要注意保暖和設備固定。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/01'
    },
    {
        id: 8,
        locationId: 4,                    // 地點ID: 4
        會員名稱: 'EastCoastFan',
        評論分數: 5,
        評論內容: '台東最美的觀星地點！海天一色的夜空真的很震撼。建議提早到，可以先看夕陽再等星星出現。',
        圖片: '',
        時間: '2025/06/25'
    },
    {
        id: 7,
        locationId: 4,                    // 地點ID: 4
        會員名稱: 'OceanStar',
        評論分數: 4,
        評論內容: '海邊觀星別有一番風味！聽著海浪聲看星星很浪漫。就是風比較大，要注意保暖和設備固定。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/01'
    },
    {
        id: 8,
        locationId: 4,                    // 地點ID: 4
        會員名稱: 'EastCoastFan',
        評論分數: 5,
        評論內容: '台東最美的觀星地點！海天一色的夜空真的很震撼。建議提早到，可以先看夕陽再等星星出現。',
        圖片: '',
        時間: '2025/06/25'
    },

    // 地點ID: 5 (蘭嶼) - 2筆評論
    {
        id: 9,
        locationId: 5,                    // 地點ID: 5
        會員名稱: 'IslandStar',
        評論分數: 5,
        評論內容: '台灣最棒的觀星地點沒有之一！完全沒有光害，銀河清晰可見。島上的原住民文化也很有趣。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/06/20'
    },
    {
        id: 10,
        locationId: 5,                    // 地點ID: 5
        會員名稱: 'RemoteExplorer',
        評論分數: 4,
        評論內容: '遠離塵囂的觀星天堂！不過交通比較不便，需要搭船。建議安排2-3天的行程比較充實。',
        圖片: '',
        時間: '2025/06/15'
    },
    {
        id: 10,
        locationId: 5,                    // 地點ID: 5
        會員名稱: 'RemoteExplorer',
        評論分數: 4,
        評論內容: '遠離塵囂的觀星天堂！不過交通比較不便，需要搭船。建議安排2-3天的行程比較充實。',
        圖片: '',
        時間: '2025/06/15'
    }
])





const detailShow = ref(false)
const showLayout = ref(false)
const showLayout2 = ref(false)
const reviewShow = ref(false)
const reviewPlaceShow = ref(false)
const selectedLocation = ref('') 
const selectedLocationId = ref('')   //抓到當前選擇地點的ID
const locationReviews =ref([])

function handleShowDetail(location) {
    selectedLocationId.value = location.id
    selectedLocation.value = location  //從main那邊點選後 傳來的值 本身就是該地點的物件 { id: 1, region: '南部', scene: '市郊', name:'南瀛天文館', img: '../../assets/images/map/map-tainanPhoto.jpg',score:4.7, address:"台南市大內區34-2號" ,coords:[ 385 , 380] }
    detailShow.value = true              
    showLayout.value = true
    
    locationReviews.value = getReviewsByLocationId(selectedLocationId.value)
    
    // console.log(selectedLocationId.value)    //確認選擇的location id
}
function closeModel(){
    detailShow.value = false
    showLayout.value = false
    reviewShow.value = false
}
function showReview(location){
    reviewShow.value = true
    // selectedLocation = location    
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

//之後要在這邊補上分數的算法 抓完整數據後設一個地區陣列 數據跑回圈 每次都用array.reduce((acc, cur) => acc + cur, 0)

function getReviewsByLocationId(selectId){
    return mockReviews.value.filter(review => review.locationId === selectId)
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
