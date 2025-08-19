<script setup>
import {ref, onMounted} from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import taiwanMap from '@/assets/images/map/starmap-taiwan.svg'

//假數據
const locationList = ref([
  { region: '南部', scene: '市郊', name:'南瀛天文館', img: '../../assets/images/map/map-tainanPhoto.jpg',score:4.7, address:"台南市大內區34-2號" ,coords:[ 385 , 380] },
  { region: '北部', scene: '山區', name:'陽明山',img: '../../assets/images/map/map-taipeiPhoto.jpg' ,score:4.5, address:"台北市士林區竹子湖" ,coords:[ 880 , 630]},
  { region: '中部', scene: '平原', name:'杉林溪',img: '../../assets/images/map/map-taichungPhoto.jpg' ,score:4.3, address:"南投縣溪頭" ,coords:[ 510 , 470]},
  { region: '東部', scene: '海邊', name:'三仙台',img: '../../assets/images/map/map-taichungPhoto.jpg' ,score:4.2, address:"台東縣" ,coords:[ 385 , 595]},
  { region: '離島', scene: '海邊', name:'蘭嶼',img: '../../assets/images/map/map-taichungPhoto.jpg' ,score:4.0, address:"台東縣蘭嶼" ,coords:[ 122 , 635]},
])


const activeIndex = ref(-1)

//li查看更多
const showMore = (index) => {
    activeIndex.value = (activeIndex.value === index ? -1 : index)  //這句三元運算子是判斷該li是不是被二次點擊 點兩次activeIndex變成-1 html內的v-show判斷要關起來
    goToMarker(index)
    scrollToListItem(index)
}

const placeholder =ref(' ')
const region = ref('') 

onMounted(()=>{
    region.value = '全台'
    placeholder.value = ''

    setMap()
})





//台灣地圖
let map, marklist = []

function setMap(){
    //地圖初始化
    map = L.map('map', {crs:L.CRS.Simple, minZoom:0, maxZoom:2 })
    const imageWidth = 1000
    const imageHeight = 1000
    const bounds = [[0,0] , [imageHeight, imageWidth]]

    //自訂地圖圖案
    L.imageOverlay( taiwanMap, bounds, ).addTo(map)
    map.fitBounds(bounds)
    map.setMaxBounds(bounds)

    //marker
    for (let i = 0; i < locationList.value.length; i++) {
        const location = locationList.value[i]
        const marker = L.marker([location.coords[0], location.coords[1]]).addTo(map)
        marker.bindPopup(location.name)
        marklist.push(marker)

        //對marker綁定點擊事件
        marker.on('click', ()=>{
            activeIndex.value = i
            scrollToListItem(i)
        })
    }    

    //滑鼠座標 確認地點座標用 寫進croods用
    const coordsDiv = L.control({position:'bottomleft'})
    coordsDiv.onAdd = ()=>{
        const div = L.DomUtil.create('div', 'mouse-coords')
        div.style.background = '#fff'
        div.style.padding = ' 3px 6px'
        div.style.fontSize = '12px'
        return div
    }
    coordsDiv.addTo(map)
    map.on('mousemove' , e=>{
        const div = document.querySelector('.mouse-coords')
        div.innerHTML = `Y:${e.latlng.lat.toFixed(0)} , X:${e.latlng.lng.toFixed(0)}`
    })

}

function goToMarker(idx) {
  const location = locationList.value[idx]
  map.flyTo([location.coords[0], location.coords[1]], 1, { duration: 1.2 })
  marklist[idx].openPopup()
}

function scrollToListItem(index){
    //因為li摺疊有動畫時間 所以設定計時器延遲幾秒後再做這函數
    setTimeout(() => {
        const locatinListBox = document.querySelector('.locatinList')
        const locationItem = document.querySelectorAll('.locatinList ul li')
        const targetItem = locationItem[index]
        
        const locatinListBoxRect = locatinListBox.getBoundingClientRect()
        const itemRect = targetItem.getBoundingClientRect()
        const topPadding = 20
        const newScrollTop = locatinListBox.scrollTop + itemRect.top - locatinListBoxRect.top - topPadding //itemRect.top - divRect.top 是li距離容器頂部的距離

        locatinListBox.scrollTo({
            top: newScrollTop,
            behavior: 'smooth'
            })
    }, 100)     
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
                    <div class="location-search">
                        <img class="map-search-icon" src="../../assets/icons/icon-map-search.svg" alt="">
                        <input type="text" id="" class="inputPlace" :disabled="region !== '全台'" :placeholder="region !== '全台' ? '選擇全台,才可輸入' : '請輸入地點名稱'">
                        <!-- 動態生成選項 -->
                        <ul v-if="false" class="starPlace-list">
                            <li>士林天文館</li>
                            <li>陽明山竹子湖</li>
                            <li>平溪嶺腳寮觀星點</li>
                            <li>合歡山武嶺</li>
                            <li>鯉魚潭</li>
                            <li>高美濕地觀景台</li>
                            <li>杉林溪森林生態渡假園區</li>
                            <li>南瀛天文館</li>
                            <li>台南關子嶺大凍山</li>
                        </ul>
                    </div>
                    
                    
                </div>

            </div>
                <!-- 地點列表 -->
                <div class="locatinList"> <!--這要動態生成-->
                    <ul>
                        <li v-for="(location, index) in locationList" :key="index" @click="showMore(index)">
                            <div class="tag">
                                <span>{{location.region}}</span>
                                <span>{{location.scene}}</span>
                            </div>
                            

                            <div class="title">
                                <h2>{{location.name}}</h2>
                                <div class="score">
                                    <!-- 之後路徑要改成  :src="location.img" -->
                                    <img src="@/assets/icons/icon-filledStar.svg" alt="">
                                    <h3>{{location.score}}</h3>   
                                </div>                    
                           
                            </div>

                            <h5>{{location.address}}</h5>

                             <!--以下點擊後才顯示-->
                            <transition name="accordion">
                                <div v-show="activeIndex === index" class="location-singlePlace-more" >
                                    <img class="location-singlePlace-photo" src="../../assets/images/map/map-tainanPhoto.jpg" alt="">

                                    <a class="seeMore" href="#">
                                        <p>更多資訊</p>
                                        <!-- <img src="../../assets/icons/closed-eyes.svg" alt=""> -->
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
    transition: all 0.3s ease;
}
.accordion-leave-active{
    transition: all 0.3s ease;
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
.locatinList{
    // flex-grow: 0.5;

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
    max-height: 355px;
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
    // z-index: 2;
    // background-image: url(../../assets/images/map/starmap-taiwan.svg);
    // background-size: cover;
}
.leaflet-container {
  background: transparent !important;
}
</style>