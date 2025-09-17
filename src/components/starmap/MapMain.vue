<script setup>
// ========== IMPORTS ==========
import { ref, onMounted, computed, watch, defineProps, defineEmits, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import taiwanMap from '@/assets/images/map/starmap-taiwan.svg'
import customMarker from '@/assets/icons/icon-map-pin.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png' 

// ========== PROPS & EMITS ==========
const { locationList } = defineProps(["locationList"])
const emit = defineEmits(['show-detail'])

// ========== 響應式數據 ==========
const region = ref('全台')
const selectedScenes = ref([])
const searchText = ref('')
const placeholder = ref('')
const isMobile = ref(window.innerWidth <= 430) 
//避免打包後路徑錯誤
const API_IMAGESURL = import.meta.env.VITE_AJAX_IMAGESURL

// ========== template狀態數據 ==========
const isEntering = ref(true)
const activeIndex = ref(-1)
const placeList = ref(false)

// ========== 計算屬性 ==========
const filteredLocationList = computed(() => {
    let newLocationList = locationList   //複製一份避免改到資料

    // 地區篩選
    if (region.value !== '全台') {
        newLocationList = newLocationList.filter(item => item.region === region.value)
    }
    
    // 場景篩選
    if (selectedScenes.value.length > 0) {
        newLocationList = newLocationList.filter(item => selectedScenes.value.includes(item.scene))
    }
    
    // 搜尋篩選
    if (searchText.value.trim() !== '') {
        newLocationList = newLocationList.filter(item => 
            item.location_name.includes(searchText.value) ||
            item.address.includes(searchText.value)
        )
    }

    return newLocationList
})

// ========== 監視地點清單 ==========
watch(filteredLocationList, (newFilteredList) => {
    // 地圖存在時更新標記
    if (map && !isMobile.value) {
        updateMapMarkers(newFilteredList)
    }
    activeIndex.value = -1
}, { deep: true })


// ========== 生命週期 ==========
onMounted(() => {
    region.value = '全台'
    placeholder.value = ''

    if( !isMobile.value ){
        setMap()
    }

    window.addEventListener('resize', handleResize)
})

onUnmounted(()=>{
    window.removeEventListener('resize', handleResize)
    if (map) {
        map.remove()
        map = null
    }
})

// ========== 視窗大小變化 ==========
function handleResize (){
    const newIsMobile = window.innerWidth <= 430

    // 從桌面版切換到手機版
    if (!isMobile.value && newIsMobile) {
        if (map) {
            map.remove()
            map = null
            marklist = []
        }
    }
    // 從手機版切換到桌面版
    else if (isMobile.value && !newIsMobile) {
        setMap()
    }
    
    isMobile.value = newIsMobile
}

// ========== 地圖相關方法 ==========
let map, marklist = []
function setMap() {
    //地圖生成前檢查
    if (isMobile.value) return

    if (map) {
        map.remove()
    }
    
    // 地圖初始化
    map = L.map('map', { crs: L.CRS.Simple, minZoom: 0, maxZoom: 2 })
    const imageWidth = 1000
    const imageHeight = 1000
    const bounds = [[0, 0], [imageHeight, imageWidth]]

    // 自訂地圖圖案
    L.imageOverlay(taiwanMap, bounds).addTo(map)
    map.fitBounds(bounds)
    map.setMaxBounds(bounds)

    // 初始化標記
    updateMapMarkers(locationList)
    //滑鼠座標
    addMouseCoordinateDisplay()
}

// 滑鼠座標顯示（開發用）
function addMouseCoordinateDisplay() {
    const coordsDiv = L.control({ position: 'bottomleft' })
    coordsDiv.onAdd = () => {
        const div = L.DomUtil.create('div', 'mouse-coords')
        div.style.background = '#fff'
        div.style.padding = '3px 6px'
        div.style.fontSize = '12px'
        return div
    }
    coordsDiv.addTo(map)
    
    map.on('mousemove', e => {
        const div = document.querySelector('.mouse-coords')
        div.innerHTML = `Y:${e.latlng.lat.toFixed(0)}, X:${e.latlng.lng.toFixed(0)}`
    })
}

function updateMapMarkers(locations) {
    // 移除現有標記
    marklist.forEach(marker => {
        map.removeLayer(marker)
    })
    marklist = []
    
    const customIcon = L.icon({
        iconUrl: customMarker,
        iconSize: [45, 45],
        iconAnchor: [22.5, 45],
        popupAnchor: [0, -45],
        shadowUrl: markerShadow,
        shadowSize: [50, 50],
        shadowAnchor: [16, 51]
    });

    // 重新添加標記
    locations.forEach((location, index) => {
        const marker = L.marker([location.coords_y, location.coords_x], {icon: customIcon}).addTo(map)
        marker.bindPopup(location.location_name)
        marklist.push(marker)

        // 綁定點擊事件
        marker.on('click', () => {
            const filteredIndex = filteredLocationList.value.findIndex(item => item === location)
            scrollToListItem(filteredIndex)
            showMore(filteredIndex)
        })
    })
}

function goToMarker(idx) {
    const location = locationList[idx]
    map.flyTo([location.coords_y, location.coords_x], 1, { duration: 1.2 })

    const filteredIndex = filteredLocationList.value.findIndex(item => item === location)
    if (filteredIndex !== -1 && marklist[filteredIndex]) {
        marklist[filteredIndex].openPopup()
    }
}

// ==========地點列表 ==========
function showMore(index) {
    // 找到原始索引
    const originalIndex = locationList.findIndex(item => item === filteredLocationList.value[index])
    
    // 切換展開狀態
    activeIndex.value = (activeIndex.value === originalIndex ? -1 : originalIndex)
    
    // pin飛到對應位置
    goToMarker(originalIndex)
    
    // 滾動到對應項目
    scrollToListItem(index)
}

function scrollToListItem(index) {
    setTimeout(() => {
        const locationListBox = document.querySelector('.locationList')
        const locationItem = document.querySelectorAll('.locationList ul li')
        const targetItem = locationItem[index]
        
        if (!targetItem) return
        
        const locationListBoxRect = locationListBox.getBoundingClientRect()
        const itemRect = targetItem.getBoundingClientRect()
        const topPadding = 20
        const newScrollTop = locationListBox.scrollTop + itemRect.top - locationListBoxRect.top - topPadding

        locationListBox.scrollTo({
            top: newScrollTop,
            behavior: 'smooth'
        })
    }, 100)
}

// console.log(location)

function showLocationDetail(location) {
    emit('show-detail', location)
    
}

// ========== 搜尋框方法 ==========
function focusLocation(index) {
    const originalIndex = locationList.findIndex(item => item === filteredLocationList.value[index])
    activeIndex.value = originalIndex
    goToMarker(originalIndex)
    scrollToListItem(index)
    placeList.value = false
}

function handleFocus(e) {
    placeList.value = true
    e.target.style.borderRadius = '10px 10px 0px 0px'
}

function handleBlur(e) {
    setTimeout(() => {
        placeList.value = false
        e.target.style.borderRadius = '10px 10px 10px 10px'
    }, 300)
}

function handleSceneChange(scene, event) {
    if (event.target.checked) {
        selectedScenes.value.push(scene)
    } else {
        const index = selectedScenes.value.indexOf(scene)
        if (index > -1) {
            selectedScenes.value.splice(index, 1)
        }
    }
}
</script>



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
                        <input type="radio" id="all" value="全台" v-model="region">
                        <label for="all" >全台</label>
                        
                        <ul >
                            <li>
                                <input type="radio" id="beibu" value="北部" v-model="region">
                                <label for="beibu">北部</label>
                            </li>
                            <li>
                                <input type="radio" id="zhongbu" value="中部" v-model="region">
                                <label for="zhongbu">中部</label>
                            </li>
                            <li>
                                <input type="radio" id="nanbu" value="南部" v-model="region">
                                <label for="nanbu">南部</label>
                            </li>
                            <li>
                                <input type="radio" id="dongbu" value="東部" v-model="region">
                                <label for="dongbu">東部</label>
                            </li>
                            <li>
                                <input type="radio" id="lidao" value="離島" v-model="region">
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
                            <input type="checkbox" id="shan" value="山間" @change="handleSceneChange('山間' ,$event )">
                            <label for="shan">山間</label>
                        </li>
                        <li>
                            <input type="checkbox" id="beach" value="海邊" @change="handleSceneChange('海邊' ,$event )">
                            <label for="beach">海邊</label>
                        </li>
                        <li>
                            <input type="checkbox" id="city" value="市區" @change="handleSceneChange('市區' ,$event )">
                            <label for="city">市區</label>
                        </li>
                        <li>
                            <input type="checkbox" id="suburbs" value="市郊" @change="handleSceneChange('市郊' ,$event )">
                            <label for="suburbs">市郊</label>
                        </li>                                      
                     </ul>
                </div>
                
                <!-- 搜尋框 -->
                <div class="locationSection">
                    <div class="location-search">
                        <img class="map-search-icon" src="@/assets/icons/icon-map-search.svg" alt="">
                        <input type="text" id="" class="inputPlace" :disabled=" region !== '全台'" :placeholder="region !== '全台' ? '選擇全台,才可輸入' : '請輸入地點名稱'" v-model="searchText" @focus="handleFocus" @blur="handleBlur">
                        <!-- 動態生成選項 -->
                        <ul v-if="placeList" class="starPlace-list">
                            <li v-if="filteredLocationList.length > 0" v-for="(location, index) in filteredLocationList  " :key="index" @click="focusLocation(index)">{{location.location_name}}</li>
                            <!-- 無結果時顯示 -->
                            <li v-if="filteredLocationList.length === 0" class="no-result">查無資訊</li>
                        </ul>
                    </div>
                    
                    
                </div>

            </div>
                <!-- 地點列表 -->
                <div class="locationList">
                    <ul>
                        <li v-if="filteredLocationList.length === 0" class="no-result">很遺憾，此類型地點從缺，請改選其他偏好</li>
                        <li v-for="(location, index) in filteredLocationList " :key="index">
                            <div class="tag" @click="showMore(index)">
                                <span>{{location.region}}</span>
                                <span>{{location.scene}}</span>
                            </div>
                            

                            <div class="title" @click="showMore(index)">
                                <h2>{{location.location_name}}</h2>
                                <div class="score">
                                    <img src="@/assets/icons/icon-filledStar.svg" alt="">
                                    <h3>{{location.score}}</h3>   
                                </div>                    
                           
                            </div>

                            <h5 @click="showMore(index)">{{location.address}}</h5>

                             <!--以下點擊後才顯示-->
                            <transition name="accordion">
                                <div v-show="activeIndex === locationList.findIndex(item => item === location)" class="location-singlePlace-more" >
                                                                                 <!-- ↓ 路徑打包後有亂掉 所以加這個環境變數去抓路徑 -->
                                    <img class="location-singlePlace-photo" :src="API_IMAGESURL + location.image" alt="" @click="showLocationDetail(location)">

                                    <a class="seeMore" href="#" @click.prevent="showLocationDetail(location)">
                                        更多資訊
                                    </a>
                                    <img class="closeArrow" src="@/assets/icons/icon-map-prupleArrow.svg" alt="" @click="showMore(index)">
                                </div>
                            </transition>
                            
                            <!----------------------->

                            <div class="map-decorateLine"></div> <!-------裝飾線-------->
                        </li>

                    </ul> 


                </div>
                

            
        </div>
        
        <!-- 右半邊台灣地圖容器 -->
         <div id="map" class="map-rightBlock"></div>

        <!-- 右下裝飾字 -->
        <div class="map-decorate">
            <p>精選觀星地點</p>
            <h1>STAR<br>MAP</h1>
        </div>
    </div>
</template>


<style scoped lang="scss">
@import '@/assets/styles/main.scss';


//地點列表點擊後的展開的動畫
.accordion-enter-active {
    transition: all 0.4s ease;
}
.accordion-leave-active{
    transition: all 0.4s ease;
}

.accordion-enter-from, .accordion-leave-to {
    opacity: 0;
    // max-height: 0;
    // transform: translateY(-10px);
}

.accordion-enter-to, .accordion-leave-from {
    opacity: 1;
    max-height: 355px; 
    transform: translateY(0);
}

.location-singlePlace-more {
    transition: all 0.3s ease;
}




.wrapper{
    padding: 12px 0;
    // background-color: $primaryColor-900;
    background-image: radial-gradient(ellipse at top , #080e21 0%,  #1b2735 95%);

    display: flex;
    justify-content: center;
    gap: 24px;

    position: relative;
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
    text-align: center;
}




/* 左半邊 */
.map-leftBlock{
    // border: 2px solid red;
    box-sizing: border-box;
    max-width: 430px;
    // max-height: calc(100vh - 74px);
    height: 90vh;

    font-family: $chFont ;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    // margin-left:10vw;
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
    position:relative;    
}
.location-search{
    position: relative;
    
    box-sizing: border-box;
    
}
.map-search-icon{
    position: absolute;
    top: 10px;
    right: 10px;
    
}
.inputPlace{
    width: 100%;
    height: 40px;
    
    border-radius: 10px;
    // border-color:$primaryColor-100 ;
    box-sizing: border-box;

    padding: 0px 20px;    
}
input[type="text"]:disabled {
  background-color: $FontColor-gray;
//   color: #fffff;
  cursor: not-allowed;
}
.starPlace-list{
    width: 100%;
    max-height: 20vh;
    position: absolute;
    top: 38px;
    background-color: $bgColor-white;
    color: $FontColor-black;
    border-radius: 0 0 10px 10px;
    overflow-y: auto;


    padding: 4px 20px;
    box-sizing: border-box;
    border: 3px solid $primaryColor-500;
    box-sizing: border-box;
}
.starPlace-list li{
    padding: 12px 16px;
    font-size:$pcChFont-p ;
    border-bottom: 1px solid $primaryColor-500;
}
.starPlace-list li:hover{
    background-color: $primaryColor-100;
}


/*地點列表*/
.locationList{
    // flex-grow: 0.5;

    width: 100%;
    border: 2px solid $primaryColor-100;
    box-sizing: border-box;
    
    background-color: $FontColor-white;
    border-radius: 5px;
    

    overflow-y: auto;

    &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background: $primaryColor-500;
            border-radius: 10px;
            /* 重點：加邊框讓滾軸往內縮 */
            border: 1px solid transparent;
            background-clip: content-box;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }


}
.locationList ul{
    cursor: pointer;
    display: flex;
    gap: 24px;
    flex-direction: column;
    padding: 24px;
    margin-bottom: 24px;    
}
.locationList ul li{
    /* border: 1px solid blue; */
    // max-height: 355px;
    display: flex;
    flex-direction: column;
}
.tag{
    display: flex;
    gap: 4px;

    margin-bottom: 8px;
}
.locationList ul li span{
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

.locationList h5{
    font-size: $pcChFont-p;
    line-height: 150%;

    margin-bottom: 16px;
}
/*點擊後顯示*/
.location-singlePlace-photo{
    display: block;
    border-radius: 20px;

    width: 100%;
    height: 150px;
    object-fit:cover;

    margin: 0 auto 12px;
}
.seeMore{
    text-decoration: none;
    color: $FontColor-black;

    display: flex;
    gap: 4px;
    align-items: center ;
    justify-content: end;

    animation: seeMoreShink 4s ease-in-out infinite ;
}
.seeMore:hover{
    color: $secondaryColor-orange;
    animation:none;
    font-weight: 500;
}
.closeArrow{
    width: 28px;
    display: block;
    justify-self: center;
}
@keyframes seeMoreShink{
    0%{ 
        color: $FontColor-black;
    }
    50%{
        color: $secondaryColor-orange;
    }
    100%{
        color: $FontColor-black;
    }
}

/*裝飾線*/
.map-decorateLine{
    height: 2px;
    background-color: $primaryColor-100;
    margin: 4px 0 0;
}

/*右半邊台灣*/
.map-rightBlock{
    width: 50vw;
    height: 90vh;
    // background-color: #ccc;
    z-index: 2;
    // background-image: url(@/assets/images/map/starmap-taiwan.svg);
    // background-size: cover;
}
.leaflet-container {
  background: transparent !important;
}



//------------RWD-------------
@media screen and (max-width:651px) {
    .wrapper{
        padding: 12px;
        gap: 0;
    }
    .loFilterList h4{
        display: none;
    }
    .regionChoice{
        flex-direction: column;
    }
    .sceneChoice{
        flex-direction: column;
    }
}
@media screen and (max-width:430px) {
    .map-rightBlock, .map-decorate{
        display: none;
    }
    .loFilterList h4{
        display: block;
    }
    .regionChoice{
        flex-direction: row;
    }
    .sceneChoice{
        flex-direction: row;
    }
}
</style>