<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import eventlist from "@/data/eventlist";
import axios from "axios";



//假數據
/* const activities =ref([
    {
        id: 1,
        date: '2025.05.20',
        name: '活動名稱1',
        description: '這是第一個活動描述這是第一個活動描述這是第一個活動描述',
        image: '../assets/images/aboutstar/star space.png'
    },
    {
        id: 2,
        date: '2025.05.21',
        name: '活動名稱2',
        description: '這是第二個活動描述這是第二個活動描述這是第二個活動描述',
        image: '../assets/images/aboutstar/star space.png'
    },
    {
        id: 3,
        date: '2025.05.22',
        name: '活動名稱3',
        description: '這是第三個活動描述這是第三個活動描述這是第三個活動描述',
        image: '../assets/images/aboutstar/star space.png'
    },
    {
        id: 4,
        date: '2025.05.23',
        name: '活動名稱4',
        description: '這是第四個活動描述這是第四個活動描述這是第四個活動描述',
        image: '../assets/images/aboutstar/star space.png'
    },
    {
        id: 5,
        date: '2025.05.24',
        name: '活動名稱5',
        description: '這是第五個活動描述這是第五個活動描述這是第五個活動描述',
        image: '../assets/images/aboutstar/star space.png'
    },
    {
        id: 6,
        date: '2025.05.28',
        name: '活動名稱6',
        description: '這是第六個活動描述這是第六個活動描述這是第六個活動描述',
        image: '../assets/images/aboutstar/star space.png'
    }
]) */

//定義響應式變數
const currentIndex = ref(0)  //頁面中活動區塊,左邊第一個活動的索引, 起始為0
const isMobile = ref(false)  // 是否為手機大小
const showSatrshoot = ref(false) //控制流星的class: active 是否啟動
const itemsPerPage = ref('')  //不同視窗大小 活動顯示數量不同
const activities = ref([]) //資料庫活動資訊

//活動列表顯示的計算屬性 手機板是一次放全部左右滑 pc版靠左右按鈕改變'起始索引'來控制渲染出來的活動
const showActivities = computed(()=>{  
    if( isMobile.value === true ){
        return activities.value
    }else{                             
        return activities.value.slice(currentIndex.value, currentIndex.value + itemsPerPage.value )
    } 
})
const canSlidePrev = computed(()=>{
    return currentIndex.value > 0
})
const canSlideNext = computed(()=>{
    return currentIndex.value < activities.value.length - itemsPerPage.value
})




//事件監聽
function slidePrev (){
    if(canSlidePrev.value){
        currentIndex.value--
    }
    console.log(showActivities.value);
    
}
function slideNext (){
    if(canSlideNext.value){
        currentIndex.value++
    }
}

function checkScreenSize(){
    if( window.innerWidth <= 435 ){
        isMobile.value = true
        itemsPerPage.value = activities.value.length
    }else if( window.innerWidth > 435 &&  window.innerWidth <= 700){
        itemsPerPage.value = 1
    }else if( window.innerWidth > 700 &&  window.innerWidth < 1100 ){
        itemsPerPage.value = 2
    }else{
        itemsPerPage.value = 3
    }
}

function controlStar(){
    const homeContentBlock = document.querySelector('.home-contentBlock')
    const homeBlockRectTop = homeContentBlock.getBoundingClientRect().top
    if(homeBlockRectTop < 1200){
        showSatrshoot.value = true
    }
}

//生命週期
onMounted(()=>{
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    window.addEventListener('scroll', controlStar)
    window.scrollTo({
        top: 0,
    })

    getEventLists()
})
onUnmounted(()=>{
    window.removeEventListener('resize', checkScreenSize)
    window.removeEventListener('scroll', controlStar)
})


//--------後端串接取資料---------
const getEventLists = async ()=>{
    try{
        const resp = await axios.get( import.meta.env.VITE_AJAX_URL + "map/getEventLists.php" )
        //console.log(resp.data);
        activities.value = resp.data;

    }catch(error){
        console.log('取得活動資料失敗');
    }
}

const getFirstImage = (imageData) => {
  try {
    const images = JSON.parse(imageData)
    //要確認images是不是陣列 且 長度大於0 
    return Array.isArray(images) && images.length > 0 ? images[0] : ''
  } catch (error) {
    console.error('解析圖片數據失敗:', error)
    return ''
  }
}




</script>


<template>
    <!-- 緣起? -->
    <div class="home-begining">
        <!-- 背景小星星 -->
        <img class="begining-bgStars" src="@/assets/images/home/index-stars.svg" alt="">
        <!-- 人類 -->
        <img class="begining-person" src="@/assets/images/home/index-people.svg" alt="人類">

        <!-- 流星 -->
        <div class="testbox"    
            :class="{ 'active' : showSatrshoot }">
            <!-- <img class="begining-starShot" src="../assets/images/home/index-starShot.svg" alt="流星"> -->
        </div>
        

        <div class="begining-text">
            <h1 class="decTitle--medium">ABOUT</h1>
            <h2 class="cnTitle--h2">緣起</h2>
            <!-- <p class="cnContent--18px">一段崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是一段崩潰的團專之旅，</p> -->
            <p class="cnContent--18px">
                觀星聽起來浪漫又遙遠，其實只要有一點指引，就能輕鬆抬頭看見屬於自己的宇宙。
                <br><br>
                「星引力」的誕生，正是希望讓這件事變得簡單、親近又有趣。
                <br><br>
                不需要昂貴的器材，也不需要專業背景，只要保有一點時間與好奇心，就能重新認識夜晚，並被滿天星斗深深吸引。
            </p>
        </div>

    </div>
    <!-- 大div 包裹四區塊-->
    <div class="home-contentBlock">
        <!-- 第一區 觀星指南 -->
        <div class="home-guide">
            <!-- 標題 -->
            <div class="home-guideTitle">
                <h1 class="guideTitle-en decTitle--medium">GUILD</h1>
                <h2 class="guideTitle-cn cnTitle--h2 ">觀星指南</h2>
                <!-- <button class="guideTitle-button button--normal">查看更多</button> -->
            </div>
            
            <!-- 指南三項 -->
            <div class="home-guildExtract">
                <ul class="guildExtract-block">
                    <li>
                        <img src="@/assets/images/home/index_bigIcon1.svg" alt="指南1">
                    </li>
                    <li>
                        <h2 class=" cnTitle--h2">觀星初學指南</h2>
                    </li>
                    <li>
                        <!-- <p class="cnContent--18px">這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述</p> -->
                        <p class="cnContent--18px">我們提供入門知識與觀測技巧，讓初學者能快速掌握重點，一起踏入觀星的行列。我們提供清晰的指引，幫助任何人都能抬頭看見熟悉的星空，感受宇宙的魅力。</p>
                    </li>
                </ul>
                <ul class="guildExtract-block">
                    <li>
                        <img src="@/assets/images/home/index_bigIcon2.svg" alt="指南2">
                    </li>
                    <li>
                        <h2 class=" cnTitle--h2">星據點</h2>
                    </li>
                    <li>
                        <!-- <p class="cnContent--18px">這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述</p> -->
                        <p class="cnContent--18px">在星據點，你可以找到適合觀星的地點資訊，包含交通便利性、天氣與地點評價，讓星空愛好者能更輕鬆找到理想的觀測場所。我們提供貼近需求的建議，避免盲目摸索，讓觀星體驗更順利。</p>
                    </li>
                </ul>
                <ul class="guildExtract-block">
                    <li>
                        <img src="@/assets/images/home/index_bigIcon3.svg" alt="指南3">
                    </li>
                     <li>
                        <h2 class=" cnTitle--h2">星空小舖</h2>
                    </li>
                    <li>
                        <!-- <p class="cnContent--18px">這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述</p> -->
                        <p class="cnContent--18px">精選多樣望遠鏡、雙筒鏡與觀星配件，搭配清楚的介紹與比較，幫助初學者找到合適的工具。我們提供方便的一站式選購，讓準備觀星不再繁瑣，簡單就能踏出探索宇宙的第一步。</p>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 天文快訊 -->
        <div class="home-news">
            <!-- 左邊照片 -->
             <img class="home-news-photo" src="@/assets/images/aboutstar/lunar eclipse.png" alt="天文快訊">
            <!-- 右邊描述 -->
            <div class="home-news-rightSide">
                <h1 class="news-rightSide-title decTitle--medium">NEWS</h1>
                <h2 class="news-rightSide-title2 cnTitle--h2">天文快訊</h2>
                <p class="news-rightSide-text cnContent--18px">最新的天文觀測與星象消息，包含流星雨、行星衝、日食與月食等第一手資訊，讓抬頭看星不再錯過精彩瞬間。天文快訊將提供清楚的時間、地點與觀測建議，幫助愛好者在最佳時刻捕捉夜空的美麗。</p>
                <!-- <button class="news-rightSide-button button--normal">查看更多</button> -->
                <router-link class="news-rightSide-button" to="/Newpage">查看更多</router-link>
            </div>
        </div>

        <!-- 星空模擬 -->
        <div class="home-sky">
            <!-- 左邊描述 -->
            <div class="home-sky-leftSide">
                <h1 class="sky-leftSide-title decTitle--medium">FOUR SEASONS</h1>
                <h2 class="sky-leftSide-title2 cnTitle--h2">星視野</h2>
                <p class="sky-leftSide-text cnContent--18px">以互動星空圖呈現十二星座的樣貌，不僅能清楚看到星座的樣子，還能點擊圖示展開「星連星」的效果，讓星座線條一目了然，一起快速理解星座的形狀與故事，享受觀星的樂趣與臨場感。</p>
                <!-- <button class="sky-leftSide-button button--normal">查看更多</button> -->
                <router-link class="sky-leftSide-button" to="/gamesky">查看更多</router-link>
            </div>
            <!-- 右邊圖片 -->
            <img class="home-sky-photo" src="@/assets/images/aboutstar/constellation-4.png" alt="四季星空">
        </div>

        <!-- 活動資訊 -->
        <div class="home-activity">
            <!-- 英文字 -->
            <h1 class="activity-title decTitle--medium">EVENT INFORMATION</h1>
            <!-- 中文字 -->
            <h2 class="activity-title2 cnTitle--h2">活動資訊</h2>
            <!-- 下方左右選單 -->
            <div class="activity-content">
                <!-- 左滑鍵 -->
                <a class="activity-a"
                    v-if="!isMobile"
                    @click="slidePrev"
                    :class="{ 'disable': !canSlidePrev }">
                    <img class="activity-a-img" src="@/assets/images/news/article-content-back.svg" alt="上一個">
                </a>
                <!-- 近日活動清單 -->
                <div class="activity-list">
                    <a v-for="activity in showActivities" 
                        class="list-singleInfo" 
                        href="#" >
                        <router-link :to="`/events/${activity.ID}`" class="router-link">

                            <img class="singleInfo-photo" :src="getFirstImage(activity.image)" alt="活動資訊圖">
                            <div class="singleInfo-content">
                                <!-- <h3 class="activity-list-datetime">{{activity.date}}</h3> -->
                                <h3 class="activity-list-datetime">{{activity.event_start}}</h3>
                                <!-- <h3 class="activity-list-activityName">{{activity.name}}</h3> -->
                                <h3 class="activity-list-activityName">{{activity.event_name}}</h3>
                                <!-- <p class="activity-list-info cnConten--18px">{{ activity.description }}</p> -->
                                <p class="activity-list-info cnConten--18px">{{ activity.event_description }}</p>
                            </div>
                        </router-link>
                    </a>
                </div>
                <!-- 右滑鍵 -->
                <a class="activity-a"
                    v-if="!isMobile"
                    @click="slideNext"
                    :class="{ 'disable': !canSlideNext }">
                    <img class="activity-a-img2" src="@/assets/images/news/article-content-back.svg" alt="下一個">
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

// -------------------PC----------------------
.router-link{
    text-decoration: none;
    color: inherit;
}


//緣起
.home-begining{
    width: 100%;
    height: 105vh;
    background-image: url(@/assets/images/home/index-bg02.svg);

    position: relative;
}
.begining-bgStars{
    height: 75vh;

    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}
.begining-text{
    width: 45vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: $FontColor-white;

    position: absolute;
    bottom: 15%;
    left: 40%;
    z-index: 100;
}
.begining-text h1{
    color: $primaryColor-500;
}

.begining-person{
    height: 75vh;

    position: absolute;
    bottom: 0;
    left: 50%;
    translate: -100%;
    z-index: 30;
}
.begining-starShot{
    width: 80vh;

    position: absolute;
    top: 2.5vh;
    left: 41%;

    transform: translate(50vw, -30vh) rotate(45deg);
    
    z-index: 25;

    // animation: moveX 2.5s linear forwards;
    animation: moveStar 2s linear forwards; 
}

 @keyframes moveStar {
    0% {
        /* 起始位置：右上方外面 */
        transform: translate(50vw, -30vh) rotate(20deg);
    }
    20% {
        /* 中間路徑 */
        transform: translate(40vw, -25vh) rotate(15deg);
    }
    50% {
        /* 接近目標 */
        transform: translate(25vw, -15vh) rotate(10deg);
    }
    70% {
        /* 幾乎到達 */
        transform: translate(15vw, -10vh) rotate(5deg);
    }
    100% {
        /* 最終位置：完全對準目標點 */
        transform: translate(0, 0) rotate(0deg);
    }
}

.testbox{
    // border: 1px solid #fff;
    width: 80vh;
    height: 32vh;
    background-image: url(@/assets/images/home/index-starShot.svg);

    position: absolute;
    top: 8vh;
    left: 41%;

    transform: translate(65vw, -30vh) rotate(24deg);
    
    z-index: 25;
}

.active{
    animation: moveStar 2s linear forwards;
}

.testbox::after{
    content: "";
    width: 20vh;
    height: 20vh;

    display: block;
    // border: 1px solid red;
    background-image: url(@/assets/images/home/index-starLightCycle1.svg);

    position: absolute;
    top: 40%;
    left: -1%; 

    animation: starlight1 2s 2s linear infinite ;
}
.testbox::before{
    content: "";
    width: 23vh;
    height: 23vh;

    display: block;
    // border: 1px solid red;
    background-image: url(@/assets/images/home/index-starLight01.svg);

    position: absolute;
    top: 35%;
    left: -3%; 

    opacity: 0;
    animation: starlight 2s 2s linear infinite ;
}

 @keyframes starlight1 {
    0% {
        transform: scale(1);
    }
    50%{
        transform: scale(0.95);
        opacity: 0.5;
    }
    100% {
        transform: scale(1);
    }
}

 @keyframes starlight {
    0% {
        transform: scale(1);
        opacity: 0.5;
    }
    100% {
        transform: scale(1.2);
        opacity: 1;
    }
}

//--------------------------------------------------


//包裹四大區
.home-contentBlock {
    background-color: $bgColor-shop;

    // 第一區 觀星指南
    .home-guide {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 72px 0;
    }
    //標題
    .home-guideTitle {
        display: flex;
        margin-top: 48px;
        gap: 24px;
        align-items: end;
        justify-content: center;
    }
    .guideTitle-en {
        color: $primaryColor-500;
        line-height: 105px;
    }
    .guideTitle-cn {
        padding-bottom: 20px;
        color: $FontColor-white;
    }
    .guideTitle-button{
        margin: 0 100px 20px;
        
    }
    //指南三項
    .home-guildExtract {
        padding: 0 60px;
        display: flex;
        justify-content: center;
        gap: 60px;
        color: $FontColor-white;
    }
    .guildExtract-block {
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 20px;
    }
    .guildExtract-block img {
        width: 15vw;
        aspect-ratio: 1 / 1;
        display: block;
        margin: 0 auto;
    }
    .guildExtract-block h2 {
        text-align: center;
    }

    

    //第二區 天文快訊
    .home-news {
        max-width: 85vw;
        display: flex;
        justify-content: center;
        gap: 10vw;
        margin: 0 auto;
        padding: 100px 0;

        &-photo {
            max-height: 420px;
            border-radius: 20px;
        }

        &-rightSide {
            max-width: 500px;
            display: flex;
            flex-direction: column;
            // justify-content: space-around;
            gap: 16px;
            color: $FontColor-white;

            .news-rightSide-title {
                color: $primaryColor-500;
            }

            .news-rightSide-button {
                border: none;
                text-align: center;
                text-decoration: none;
                width: 216px;
                height: 60px;
                font-size: 24px;
                line-height: 55px;
                border-radius: 999px;
                background-color: $primaryColor-500;
                color: $primaryColor-900;
            }
            .news-rightSide-button:hover {
                background-color: $primaryColor-100;
                color: $primaryColor-500;
            }
        }
    }

    // 第三區 觀星指南
    .home-sky {
        max-width: 85vw;
        display: flex;
        justify-content: center;
        gap: 10vw;
        margin: 0 auto;
        padding: 100px 0;

        &-leftSide {
            max-width: 500px;
            display: flex;
            flex-direction: column;
            // justify-content: space-around;
            gap: 16px;
            color: $FontColor-white;

            .sky-leftSide-title {
                color: $primaryColor-500;
            }
        }

        &-photo {
            width: 450px;
            height: 450px;
            border-radius: 999px;
        }

        .sky-leftSide-button {
            border: none;
            text-align: center;
            text-decoration: none;
            width: 216px;
            height: 60px;
            font-size: 24px;
            line-height: 55px;
            border-radius: 999px;
            background-color: $primaryColor-500;
            color: $primaryColor-900;
        }
        .sky-leftSide-button:hover {
            background-color: $primaryColor-100;
            color: $primaryColor-500;
        }
    }

    // 第四區 活動資訊
    .home-activity {
        max-width: 85vw;
        color: $FontColor-white;
        margin: 0 auto;
        padding: 100px 0;

        .activity-title {
            color: $primaryColor-500;
            text-align: right;

            &2 {
                text-align: right;
                margin-bottom: 24px;
            }
        }

        .activity-content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;

            .activity-a {
                cursor: pointer;
                display: block;
                width: 28px;
                height: 28px;

                &.disable{
                    opacity: 0.05;
                    cursor: not-allowed;
                    
                    &:hover img{
                        transform:scaleX(-1) scale(1)
                    }

                }

                &-img {
                    display: block;
                    width: 28px;
                    height: 28px;
                    transform: scaleX(-1);
                    
                    &:hover{
                        transform:scaleX(-1) scale(1.5) ;
                    }

                    &2 {
                        transform: none;
                        width: 28px;
                        height: 28px;

                        &:hover{
                            transform: scale(1.5);
                        }
                    }
                }
            }
        }

        // 精選活動清單
        .activity-list {
            display: flex;

            .list-singleInfo {
                max-width: 430px;

                display: flex;
                flex-direction: column;
                gap: 18px;
                padding: 24px;
                box-sizing: border-box;
                text-decoration: none;
                color: $FontColor-white;
                border-radius: 20px;

                //活動hover效果
                &:hover {
                    // background-color: #9187b98d;
                    background-color: #9187b98d;
                    animation: starTwinkle 2s infinite;
                }

                .singleInfo-photo { 
                    align-self: center;
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    border-radius: 20px;
                }

                h3 {
                    font-size: $pcChFont-H3;
                    line-height: 1.2;
                }

                .singleInfo-content {
                    padding: 12px 16px 0;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    .activity-list-info {
                        display: -webkit-box;
                        line-height: 1.5;
                        // display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 4;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                }
            }
        }
    }
}

// 整體閃爍效果
@keyframes starTwinkle {
    0%, 100% {
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    }
    50% {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 
                    0 0 30px rgba(145, 135, 185, 0.4);
    }
}


//...........RWD.............
@media screen and (max-width:901px) {
    .home-contentBlock{
    
        .home-news{
            width: 100%;   
            gap: 60px;
            padding: 100px 0px;

            &-photo{
                height: 30vw;
            }
        }

        .home-sky{
            width: 100%;
            gap: 60px;
            padding: 100px 0px;
            
            &-photo{
                width: 35vw;
                height: 35vw;
            }
        }

        
    }
}

@media screen and (max-width:651px) {
    .home-contentBlock{
        .home-guildExtract{
            padding: 0;
            flex-direction: column;
            align-items: center;
            gap: 0;
        }
        .home-news{
            flex-direction: column;

            &-photo{
                width: 80vw;
                height: auto;
            }
        }
        .home-sky{
            flex-direction: column-reverse;

            &-photo{
                width: 60vw;
                height: 60vw;
                align-self: center;
            }
        }
    }
}

@media screen and (max-width:431px) {
    .home-contentBlock button{
        width: 100%;
    }

    .home-begining{
        overflow: hidden;
    }
    .begining-person{
        height: 70vh;
        left: 50%;
        translate: -70%;
        z-index: 1;
    }
    .begining-bgStars{
        display: none;
    }
    .testbox{
        top:12vh;
        left:47%;
        z-index: 0;

    }
    .testbox::before{
        top: 35%;
    }
    .begining-text{
        width: 430px;
        padding: 24px;
        box-sizing: border-box;
        top: auto;
        left: 0;
        bottom: 20%;
        z-index: 10;
    }
    .home-guide{
        max-width: 85vw;
        margin: 0 auto;
    }
    .home-contentBlock .home-guideTitle{
        margin-top:24px;
        flex-direction: column;
        align-items: start;
        gap: 16px;
    }
    .home-contentBlock .home-guildExtract{
        flex-direction: column;
        padding:0px;
        gap:0px;
    }
    .home-contentBlock .guideTitle-cn{
        padding-bottom: 0;
    }

    .home-contentBlock .guideTitle-button{
        margin: 0;
        align-self: start;
    }

    .home-contentBlock .home-news{
        flex-direction: column;
        gap: 12px;
    }
    .home-contentBlock .home-news-rightSide{
        gap: 16px;
    }
    .home-contentBlock .home-sky{
        flex-direction: column-reverse;
        gap: 12px;
    }
    .home-contentBlock .home-sky-leftSide{
        justify-content: start;
        gap: 16px;
    }
    .home-contentBlock .home-sky-photo{
        width: 380px;
        height: 380px;
    }
    .home-contentBlock .home-activity .activity-title2{
        margin-top: 12px;
        text-align: left;
    }
    .home-contentBlock .home-activity .activity-title{
        text-align: left;
    }

    .home-contentBlock .home-activity{
        width: 85vw;
        padding: 0px 0px 36px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

    }
    .home-contentBlock .home-activity .activity-content{
        justify-content: start;
        overflow-x: auto;
    }
    .home-contentBlock .home-activity .activity-title{
        font-size: 88px;
    }
    .home-contentBlock .home-activity .activity-content .activity-a{
        display: none;
    }
    // .home-contentBlock .home-activity .activity-list{
    //     width: 100%;
    // }
    .home-contentBlock .home-activity .activity-list .list-singleInfo{
        min-width: 85vw;
    }


}



</style>