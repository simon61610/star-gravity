<script setup>
import { onMounted, ref ,onUnmounted } from 'vue'
import HomePageContent from './HomePageContent.vue';

//定義響應式變數
const showbackToTop = ref(false)
const showBox = ref(false)
const boxText = ref('Q&A')
//監聽事件
function scrollToTop(){
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
}
function controlScroll(){
    showbackToTop.value = window.scrollY > 300
}
function showQABox(){
    if( showBox.value === false){
        showBox.value = true
        boxText.value = '關閉'
    }else if(showBox.value === true){
        showBox.value = false
        boxText.value = 'Q&A'
    }
    
}
//生命週期
onMounted(()=>{
    window.addEventListener('scroll', controlScroll)
})
onUnmounted(()=>{
    window.removeEventListener('scroll', controlScroll)
})


</script>

<template>
    <div class="backToTop" @click="scrollToTop" v-show="showbackToTop">
        <h3>top</h3>
    </div>

    <!-- Q&A -->
    <div class="QA">
        <h3 class="QATitle" @click="showQABox">{{boxText}}</h3>
        <div class="QAbox" v-show="showBox">
            <div v-for="value in 8" class="QAbox-content">
                <h2 class="cnContent--14px">怎麼退費</h2>
                <p class="cnContent--14px">不能推費住54324532wawadacawc不能推費住54324532wawadacawc不能推費住54324532wawadacawc</p>
            </div>
        </div>
    </div>
    

    <!-- 動畫效果大區-->
    <Section class="special-effects">
       
        <!-- 視差滾動區塊 -->
        <div class="home-firstBlock">
            <img class="firstBlock-moon" src="../assets/images/home/index-moon.svg" alt="月亮">
            <!-- 星連星 -->
            <img class="firstBlock-star1" src="../assets/images/home/index-star01.svg" alt="星座A">
            <img class="firstBlock-star2" src="../assets/images/home/index-star02.svg" alt="星座B">
            <!-- 海與背景山 -->
            <div class="firstBlock-sea"></div>
            <img class="firstBlock-backMontain1" src="../assets/images/home/index-MountainBackLeft.svg" alt="左山景">
            <img class="firstBlock-backMontain2" src="../assets/images/home/index-MountainBackright.svg" alt="右山景">
            <!-- 前景燈塔與山 -->
            <img class="firstBlock-tower" src="../assets/images/home/index-lightHouse.svg" alt="燈塔">
            <img class="firstBlock-towerMountain" src="../assets/images/home/index-MountainInfron.svg" alt="前景山">
            <!-- 文字 -->
            <div class="firstBlock-text">
                <div class="firstBlock-texth1">
                    <h1 class="cnTitle--sm">星</h1>
                    <h1 class="cnTitle--sm">之</h1>
                    <h1 class="cnTitle--sm">所</h1>
                    <h1 class="cnTitle--sm">引</h1>
                </div>
                <p>每個人都是被星星溫柔牽引的旅人</p>
            </div>
        </div>

        <!-- 緣起? -->
        <div class="home-begining">
            <!-- 背景小星星 -->
            <img class="begining-bgStars" src="../assets/images/home/index-stars.svg" alt="">
            <!-- 人類 -->
            <img class="begining-person" src="../assets/images/home/index-people.svg" alt="人類">

            <!-- 流星 -->
            <div class="testbox">
                <!-- <img class="begining-starShot" src="../assets/images/home/index-starShot.svg" alt="流星"> -->
            </div>
            

            <div class="begining-text">
                <h1 class="decTitle--medium">ABOUT</h1>
                <h2 class="cnTitle--h2">緣起</h2>
                <p class="cnContent--18px">一段崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是一段崩潰的團專之旅，</p>
            </div>

        </div>

    </Section>


    <!-- 大div 包裹四區塊-->
    <HomePageContent/>


</template>

<style scoped lang="scss">
@import '../assets/styles/main.scss';

//返回上面
.backToTop{
    width: 50px;
    height: 50px;
    position: fixed;
    z-index: 999;
    bottom: 20px;
    right: 20px;
    background-color: $secondaryColor-yellow;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}


//
//---------------------------
//Q$A
.QA {
    &Title{
        // background-image: url('../assets/icons/icon-guide_star.svg');
        width: 50px;
        height: 50px;
        position: fixed;
        z-index: 999;
        bottom: 75px;
        right: 20px;
        background-color: $secondaryColor-yellow;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        // opacity: 0.8;
        cursor: pointer;
    }

    //問答內容
    &box{
        position: fixed;
        background-color: #fff;
        z-index: 999;
        bottom: 110px;
        right: 75px;
        max-width: 430px;
        height: 70vh;
        padding: 24px;
        border-radius: 5px;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        gap: 16px;
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



        &-content{
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

    }
}

//視差滾動特效區
.home-firstBlock{
    background-image: url('../assets/images/home/index-bgp1.png');
    background-size: cover;
    background-color: $primaryColor-100;
    width: 100%;
    height: calc(100vh - 50px);

    position: relative;

    .firstBlock-moon{
        width: 25vh;

        position: absolute;
        left: 15%;
        top: 10%;
    }

    .firstBlock-star1{
        height: 15vh;

        position: absolute;
        right: 20%;
        top: 8%;

        animation: star1 5s linear infinite;
    }

    .firstBlock-star2{
        height: 15vh;

        position: absolute;
        left: 25%;
        top: 45%;

        animation: star2 4s linear infinite;
    }
}

@keyframes star1{
    0%{
        transform: skew(0deg, 0deg);
    }
    50%{
        transform: skew(15deg, 0deg);
    }
    100%{
        transform: skew(0deg, 0deg);
    }
}

@keyframes star2{
    0%{
        transform: skew(0deg, 0deg);
    }
    50%{
        transform: skew(-10deg, 0deg);
    }
    100%{
        transform: skew(0deg, 0deg);
    }
}

    //遠景
.firstBlock-sea{
    width: 100%;
    height: 20vh;

    background-image: url(../assets/images/home/index-sea.svg);
    background-size: cover;

    position: absolute;
    bottom: 0;

     z-index: 10;
}
.firstBlock-backMontain1{
    width: 25vw;
    
    position: absolute;
    bottom: 18%;
    z-index: 1;

}
.firstBlock-backMontain2{
    width: 70vw;

    position: absolute;
    bottom: 15%;
    right: 0;
    z-index: 1;
}
    //前景
.firstBlock-tower{
    height: 42vh;
    position: absolute;
    right: 25vh;
    bottom: 25vh;
    z-index: 20;
}
.firstBlock-towerMountain{
    height: 40vh;

    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 20;
}
    //文字
.firstBlock-text{
    font-family: $chFont;
    color:$FontColor-white ;
    display: flex;
    flex-direction: column;
    gap: 28px;
    align-items: center;

    position: absolute;
    left: 50%;
    top: 30%;
    translate: -50% 0;
    z-index: 50;
}
.firstBlock-texth1{
    display: flex;
    gap: 42px;
}
.firstBlock-texth1 h1{
    font-size: 60px;
}
.firstBlock-text p{
    font-size: $pcChFont-p;
    letter-spacing: 12px;
}

//緣起
.special-effects{
    overflow: hidden;
}
.home-begining{
    width: 100%;
    height: 100vh;

    background-image: url(../assets/images/home/index-bg02.svg);

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
    width: 35vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: $FontColor-white;

    position: absolute;
    top: 45%;
    left: 50%;
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
    background-image: url(../assets/images/home/index-starShot.svg);

    position: absolute;
    top: 2.5vh;
    left: 41%;

    transform: translate(65vw, -30vh) rotate(24deg);
    
    z-index: 25;

    // animation: moveX 2.5s linear forwards;
    animation: moveStar 2s linear forwards; 
}

.testbox::after{
    content: "";
    width: 20vh;
    height: 20vh;

    display: block;
    // border: 1px solid red;
    background-image: url(../assets/images/home/index-starLightCycle1.svg);

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
    background-image: url(../assets/images/home/index-starLight01.svg);

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
.home-contentBlock{
    background-color: $bgColor-shop;
}

// 第一區 觀星指南
.home-guide{
    padding: 36px  0;
    // background-color: $bgColor-shop;

}
    //標題
.home-guileTitle{
    display: flex;
    gap: 24px;
    align-items: end;
    justify-content: center;
}
.guileTitle-en{
    color: $primaryColor-500;
    line-height: 105px;
}
.guileTitle-cn{
    padding-bottom: 20px;
    color: $FontColor-white;
}
    //指南三項
.home-guildExtract{
    // border: 1px solid yellow;
    padding: 0 60px;

    display: flex;
    justify-content: center;
    gap: 60px;

    color: $FontColor-white;
}
.guildExtract-block{
    // border: 1px solid red;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
}
.guildExtract-block img {
    width: 80%;
    display:block;
    margin: 0 auto;
}
.guildExtract-block h2{
    text-align: center;
}

//第二區 天文快訊
.home-news{
    max-width: 85vw;
    // background-color: $bgColor-shop;
    display: flex;
    justify-content: center;
    gap: 10vw;
    // border: 1px solid yellow;
    margin: 0 auto;

    padding: 100px 0;
    
}
.home-news-photo{
    max-height: 420px;
    border-radius: 20px;
}
.home-news-rightSide{
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    color: $FontColor-white;
}
.news-rightSide-title{
    color: $primaryColor-500;
}

// 第三區 觀星指南
.home-sky{
    max-width: 85vw;
    // background-color: $bgColor-shop;
    display: flex;
    justify-content: center;
    gap: 10vw;
    // border: 1px solid orange;
    margin: 0 auto;

    padding: 100px 0;
}
.home-sky-leftSide{
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    color: $FontColor-white;
}
.home-sky-photo{
    width: 450px;
    height: 450px;
    border-radius: 999px;
}
.sky-leftSide-title{
    color: $primaryColor-500;
}

// 第四區 活動資訊
.home-activity{
    // border: 1px solid red;
    max-width: 85vw;
    color: $FontColor-white;
    margin: 0  auto;
    padding: 100px 0;
}
.activity-title{
    color: $primaryColor-500;
    text-align: right;
    
}
.activity-title2{
    text-align: right;
    margin-bottom: 24px;
    
}
.activity-content{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
}


.activity-a{
    display: block;
    width: 28px;
    height: 28px;
}
.activity-a-img{
    display: block;
    width: 28px;
    height: 28px;
    transform: scaleX(-1);
}
.activity-a-img2{
    display: block;
    width: 28px;
    height: 28px;
}
    // 精選活動清單
.activity-list{
    display: flex;
    // border: 1px solid green;
}
    //單一活動說明
.list-singleInfo{
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 36px;
    box-sizing: border-box;
    text-decoration: none;
    color: $FontColor-white;
}
    //活動hover效果
.list-singleInfo:hover {
    background-color: #9187b98d;
}

.singleInfo-photo{
    width: 100%;
    border-radius: 20px;
}
.list-singleInfo h3{
    font-size: $pcChFont-H3;
}
.singleInfo-content{
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

</style>