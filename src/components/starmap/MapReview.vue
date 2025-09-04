<script setup>
import { ref, defineEmits ,defineProps, onMounted, onUnmounted, computed} from 'vue'
//向父組件發送事件
const emit = defineEmits()

function closeModel(){
    emit('closeModel')
}
function backToDetail(){
    emit('backToDetail')
}
function writeReview(){
    emit('writeReview')
}

//接收父組件傳來資料
const props = defineProps(["selectedLocation","selectedLocationId", 'locationReviews'])

//定義響應式變數
const showSelect = ref(false)
const sortType = ref('newest')

//監聽標籤事件
function showSelectUl(){
    showSelect.value = !showSelect.value
}
function clickOutside( e ){
    const selectElement = document.querySelector('.review-select')
    if( selectElement && !selectElement.contains( e.target ) ){
        showSelect.value = false
    }
}
function changeSortType(newType, e) {
    sortType.value = newType
    e.stopPropagation();
    showSelect.value = false
}
const sortedReviews = computed(()=>{
    if( !props.locationReviews){
        return []
    }else{
        //避免改到雙向資料 所以要幫評論陣列建個副本
        const reviews = [...props.locationReviews]

        switch(sortType.value){
            case "newest": 
                console.log('📅 按最新排序完成')
                return reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))                
            case "rating_low": 
                console.log('⭐ 按評分低到高排序完成')
                return reviews.sort((a, b) => a.score - b.score)  
            case "rating_high": 
                console.log('⭐ 按評分高到低排序完成')
                return reviews.sort((a, b) => b.score - a.score)
            default:
                console.log('📝 使用預設排序')
                return reviews   
        }
    }
})
function enlargePhoto(el){
    el.requestFullscreen()
}



//生命週期
//掛載時即執行
onMounted( ()=>{
    document.addEventListener('click', clickOutside)
})
onUnmounted( ()=>{
    document.removeEventListener('click', clickOutside)
})





</script>

<template>
    <!-- 內容彈窗 -->
    <div class="map-reviewBox">
         <!-- 叉叉按鈕 -->
        <img class="mapbox-close" src="../../assets/icons/icon-map-close.svg" alt="" @click="closeModel">
        <img class="mapbox-close2" src="../../assets/icons/icon-map-cross2.svg" alt="" @click="closeModel">
        <h3 class="mapbox-back"  @click="backToDetail">
            <img class="mapbox-backTo" src="../../assets/icons/icon-map-goToBack.svg" alt="">
            返回上頁
        </h3>
        
   
        <!-- 左半邊 -->
        <div class="mapreview-left">
            <div class="mapreview-title">
                <h1>{{selectedLocation.location_name}}</h1>
                <h3>
                    <img src="../../assets/icons/icon-map-whitestar.svg" alt="">
                    {{selectedLocation.score}}
                </h3>
            </div>
            <button class="mapreview-btn button--normal" @click="writeReview">
                <img src="" alt="">
                撰寫評論
            </button>
        </div>

        <!-- 右半邊 -->
        <div class="mapreview-right">
            <!-- 排序 -->
            <div class="review-select" @click="showSelectUl">
                <div class="review-select-title" >
                    <img src="" alt="">
                    <h5>排序</h5>
                </div>
                <ul v-show="showSelect" class="review-select-detail">
                    <li @click="changeSortType('newest', $event)">最新評論</li>
                    <li @click="changeSortType('rating_low', $event)">評論低到高</li>
                    <li @click="changeSortType('rating_high', $event)">評論高到低</li>
                </ul>
            </div>
            <!-- 評論列表 -->
            <ul class="mapreview-list">
                <li v-for="review in sortedReviews">
                    <h4>{{review.name}}</h4>
                    <span class="review-score"> <!--到時候img 用v-for跑 評論幾分跑幾次-->
                        <img v-for="value in review.score" src="../../assets/icons/icon-filledStar.svg" alt="星星">
                    </span>
                    <p class="cnContent--18px">
                        {{review.content}}
                    </p>
                    <img v-if="review.圖片" class="review-photo" src="../../assets/images/map/map-reviewleft.jpg" alt="" @click="enlargePhoto($event.target)">
                    <h6>{{review.created_at}}</h6>
                </li>  
            </ul>
        </div>
   </div>

    
</template>

<style scoped lang="scss">
@import '../../assets/styles/main.scss';



//評論彈窗
.map-reviewBox {
    width: min(90vw, 1200px);  
    max-height: 90vh;  
    // padding: clamp(20px, 3vw, 40px); 

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
.mapbox-close, .mapbox-close2{
    height: 32px;

    position: absolute;
    top: 12px;
    right: 16px;
}
.mapbox-close2{
    display: none;
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

    background-image: url(@/assets/images/map/map-reviewleft.jpg);
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
.review-select-detail{
    width: 100%;
    border: 1px solid $primaryColor-100;
    box-sizing: border-box;
    background-color: $bgColor-white;

    position: absolute;
    top: 26px;
    
}
.review-select-detail li{
    padding: 4px;
    border-bottom: 1px solid $primaryColor-100;

    // display: none;

    &:hover{
        color: $secondaryColor-orange;
    }
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

@media screen and (max-width:430px) {
    .map-reviewBox{
        flex-direction: column;
    }    
    .mapbox-close{
        display: none;
    }
    .mapbox-close2{
        display: block;
    }
    .mapreview-title{
        margin-bottom: 12px;
    }
    .mapreview-left{
        width: 100%;
        padding: 60px 24px 16px;
        align-items: start;
        box-sizing: border-box;
    }
    .mapreview-btn{
        align-self: center;
    }

    .mapreview-right{
        width: 100%;
        padding: 12px 24px 24px;
        height:58vh;
        box-sizing: border-box;
    }
}

</style>