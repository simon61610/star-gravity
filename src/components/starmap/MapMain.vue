<script setup>
// ========== 1.import ==========
import { ref, onMounted, computed, watch, defineProps, defineEmits } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import taiwanMap from '@/assets/images/map/starmap-taiwan.svg'
import customMarker from '@/assets/icons/icon-map-pin.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png' 

// ========== 2. Props & Emits ==========
const { locationList } = defineProps(["locationList"])
const emit = defineEmits(['show-detail'])

// ========== 3. 響應式數據 ==========
// 3.1 頁面動畫狀態
const isEntering = ref(true)

// 3.2 地圖相關
let map, marklist = []

// 3.3 篩選條件
const region = ref('全台')
const selectedScenes = ref([])
const searchText = ref('')
const placeholder = ref('')

// 3.4 UI 狀態
const activeIndex = ref(-1)
const placeList = ref(false)

// ========== 4. 計算屬性 ==========
const filteredLocationList = computed(() => {
    let newLocationList = locationList

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
            item.name.includes(searchText.value) ||
            item.address.includes(searchText.value)
        )
    }

    return newLocationList
})

// ========== 5. 監聽器 ==========
// 監聽篩選變化，更新地圖標記
watch(filteredLocationList, (newFilteredList) => {
    updateMapMarkers(newFilteredList)
    activeIndex.value = -1 // 關閉展開的項目
}, { deep: true })

// ========== 6. 生命週期 ==========
onMounted(() => {
    region.value = '全台'
    placeholder.value = ''
    setMap()

})

// ========== 7. 地圖相關方法 ==========
// 7.1 初始化地圖
function setMap() {

    if (map) {
        map.remove()   // 清掉舊的 map
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

    // 滑鼠座標顯示（開發用）
    addMouseCoordinateDisplay()
}

// 7.2 滑鼠座標顯示
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

// 7.3 更新地圖標記
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
        shadowUrl: markerShadow, // 可以選擇要不要加陰影
        shadowSize: [50, 50],
        shadowAnchor: [16, 51]
    });

    // 重新添加標記
    locations.forEach((location, index) => {
        //有資料庫後                          ↓croods_y　　　　　↓croods_ｘ
        const marker = L.marker([location.coords[0], location.coords[1]] , {icon: customIcon }).addTo(map)
        marker.bindPopup(location.name)
        marklist.push(marker)

        // 找到原始列表索引
        const originalIndex = locationList.findIndex(item => item === location)

        // 綁定點擊事件
        marker.on('click', () => {
            const filteredIndex = filteredLocationList.value.findIndex(item => item === location)
            scrollToListItem(filteredIndex)
            showMore(filteredIndex)
        })
    })
}

// 7.4 飛行到指定標記
function goToMarker(idx) {
    const location = locationList[idx]
    map.flyTo([location.coords[0], location.coords[1]], 1, { duration: 1.2 })

    const filteredIndex = filteredLocationList.value.findIndex(item => item === location)
    if (filteredIndex !== -1 && marklist[filteredIndex]) {
        marklist[filteredIndex].openPopup()
    }
}

// ========== 8. 列表相關方法 ==========
// 8.1 展開/收起地點詳情
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

// 8.2 滾動到指定列表項
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

// ========== 9. 搜尋相關方法 ==========
// 9.1 聚焦到特定地點
function focusLocation(index) {
    const originalIndex = locationList.findIndex(item => item === filteredLocationList.value[index])
    activeIndex.value = originalIndex
    goToMarker(originalIndex)
    scrollToListItem(index)
    placeList.value = false
}

// 9.2 搜尋框焦點事件
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

// ========== 10. 篩選相關方法 ==========
// 10.1 場景複選框變化處理
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

// ========== 11. 事件處理方法 ==========
// 11.1 顯示地點詳情（發送給父組件）
function showLocationDetail(location) {
    emit('show-detail', location)  //傳該地點的ID回父組件
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
                            <li v-if="filteredLocationList.length > 0" v-for="(location, index) in filteredLocationList  " :key="index" @click="focusLocation(index)">{{location.name}}</li>
                            <!-- 無結果時顯示 -->
                            <li v-if="filteredLocationList.length === 0" class="no-result">查無資訊</li>
                        </ul>
                    </div>
                    
                    
                </div>

            </div>
                <!-- 地點列表 -->
                <div class="locationList"> <!--這要動態生成-->
                    <ul>
                        <li v-for="(location, index) in filteredLocationList " :key="index">
                            <div class="tag" @click="showMore(index)">
                                <span>{{location.region}}</span>
                                <span>{{location.scene}}</span>
                            </div>
                            

                            <div class="title" @click="showMore(index)">
                                <h2>{{location.name}}</h2>
                                <div class="score">
                                    <!-- 之後路徑要改成  :src="location.img" -->
                                    <img src="@/assets/icons/icon-filledStar.svg" alt="">
                                    <h3>{{location.score}}</h3>   
                                </div>                    
                           
                            </div>

                            <h5 @click="showMore(index)">{{location.address}}</h5>

                             <!--以下點擊後才顯示-->
                            <transition name="accordion">
                                <div v-show="activeIndex === locationList.findIndex(item => item === location)" class="location-singlePlace-more" >
                                    <img class="location-singlePlace-photo" src="@/assets/images/map/map-tainanPhoto.jpg" alt="" @click="showMore(index)">

                                    <a class="seeMore" href="#" @click.prevent="showLocationDetail(location)">
                                        更多資訊
                                    </a>
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
    max-height: 355px;
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
    justify-content: end;

    margin-bottom: 24px;
}
.seeMore:hover{
    color: $secondaryColor-orange;
}
.seeMore img{
    height: 16px;
}

/*裝飾線*/
.map-decorateLine{
    height: 2px;
    background-color: $primaryColor-100;
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
@media screen and (max-width:430px) {
    .map-rightBlock, .map-decorate{
        display: none;
    }
}
</style>