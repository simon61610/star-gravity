<script setup>
import { computed, ref } from "vue";

//假數據
const activities =ref([
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
    }
])

//定義響應式變數
const currentIndex = ref(0)
const itemsPerPage = 3

const showActivities = computed(()=>{    
    return activities.value.slice(currentIndex.value, currentIndex.value + itemsPerPage )
})
const canSlidePrev = computed(()=>{
    return currentIndex.value > 0
})
const canSlideNext = computed(()=>{
    return currentIndex.value < activities.value.length - itemsPerPage
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


</script>


<template>
    <!-- 大div 包裹四區塊-->
    <div class="home-contentBlock">
        <!-- 第一區 觀星指南 -->
        <div class="home-guide">
            <!-- 標題 -->
            <div class="home-guideTitle">
                <h1 class="guideTitle-en decTitle--medium">GUILD</h1>
                <h2 class="guideTitle-cn cnTitle--h2 ">觀星指南</h2>
            </div>
            <!-- 指南三項 -->
            <div class="home-guildExtract">
                <ul class="guildExtract-block">
                    <li>
                        <img src="../assets/images/home/index_bigIcon1.svg" alt="指南1">
                    </li>
                    <li>
                        <h2 class=" cnTitle--h2">觀星指南1</h2>
                    </li>
                    <li>
                        <p class="cnContent--18px">這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述</p>
                    </li>
                </ul>
                <ul class="guildExtract-block">
                    <li>
                        <img src="../assets/images/home/index_bigIcon2.svg" alt="指南2">
                    </li>
                    <li>
                        <h2 class=" cnTitle--h2">觀星指南2</h2>
                    </li>
                    <li>
                        <p class="cnContent--18px">這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述</p>
                    </li>
                </ul>
                <ul class="guildExtract-block">
                    <li>
                        <img src="../assets/images/home/index_bigIcon3.svg" alt="指南3">
                    </li>
                     <li>
                        <h2 class=" cnTitle--h2">觀星指南3</h2>
                    </li>
                    <li>
                        <p class="cnContent--18px">這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述這是一段描述</p>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 天文快訊 -->
        <div class="home-news">
            <!-- 左邊照片 -->
             <img class="home-news-photo" src="../assets/images/aboutstar/lunar eclipse.png" alt="天文快訊">
            <!-- 右邊描述 -->
            <div class="home-news-rightSide">
                <h1 class="news-rightSide-title decTitle--medium">NEWS</h1>
                <h2 class="news-rightSide-title2 cnTitle--h2">天文快訊</h2>
                <p class="news-rightSide-text cnContent--18px">天文快訊內容天文快訊內容天文快訊內容天文快訊內容天文快訊內容天文快訊內容天文快訊內容天文快訊內容天文快訊內容天文快訊內容</p>
                <button class="news-rightSide-button button--normal">查看更多</button>
            </div>
        </div>

        <!-- 星空模擬 -->
        <div class="home-sky">
            <!-- 左邊描述 -->
            <div class="home-sky-leftSide">
                <h1 class="sky-leftSide-title decTitle--medium">FOUR SEASONS</h1>
                <h2 class="sky-leftSide-title2 cnTitle--h2">四季星空模擬圖</h2>
                <p class="sky-leftSide-text cnContent--18px">星空圖介紹星空圖介紹星空圖介紹星空圖介紹星空圖介紹星空圖介紹星空圖介紹星空圖介紹星空圖介紹星空圖介紹星空圖介紹星空圖介紹星空圖介紹星空圖介紹</p>
                <button class="sky-leftSide-button button--normal">查看更多</button>
            </div>
            <!-- 右邊圖片 -->
            <img class="home-sky-photo" src="../assets/images/aboutstar/constellation-4.png" alt="四季星空">
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
                    @click="slidePrev"
                    :class="{ 'disable': !canSlidePrev }">
                    <img class="activity-a-img" src="../assets/images/news/article-content-back.svg" alt="上一個">
                </a>
                <!-- 近日活動清單 -->
                <div class="activity-list">
                    <a v-for="activity in showActivities" class="list-singleInfo" href="#">
                        <img class="singleInfo-photo" src="../assets/images/aboutstar/star space.png" alt="活動資訊圖">
                        <div class="singleInfo-content">
                            <h3 class="activity-list-datetime">{{activity.date}}</h3>
                            <h3 class="activity-list-activityName">{{activity.name}}</h3>
                            <p class="activity-list-info cnConten--18px">{{ activity.description }}</p>
                        </div>
                    </a>
                </div>
                <!-- 右滑鍵 -->
                <a class="activity-a"
                    @click="slideNext"
                    :class="{ 'disable': !canSlideNext }">
                    <img class="activity-a-img2" src="../assets/images/news/article-content-back.svg" alt="下一個">
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

@import '../assets/styles/main.scss';

//包裹四大區
.home-contentBlock {
    background-color: $bgColor-shop;

    // 第一區 觀星指南
    .home-guide {
        padding: 36px 0;
    }
    //標題
    .home-guideTitle {
        display: flex;
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
        width: 80%;
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
            justify-content: space-around;
            color: $FontColor-white;

            .news-rightSide-title {
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
            justify-content: space-around;
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
                display: flex;
                flex-direction: column;
                gap: 18px;
                padding: 36px;
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
                    width: 100%;
                    border-radius: 20px;
                }

                h3 {
                    font-size: $pcChFont-H3;
                }

                .singleInfo-content {
                    padding: 0 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
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


</style>