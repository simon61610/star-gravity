<script setup>
import { onMounted, ref ,onUnmounted } from 'vue'
import HomePageContent from './HomePageContent.vue';
// //test 
// import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger'
// import ScrollToPlugin from 'gsap/ScrollToPlugin'
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)





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


    // // 視差滾動
    //     gsap.timeline({
    //     scrollTrigger: {
    //     trigger: '.scrollDist',
    //     start: '0 0',
    //     end: '100% 100%',
    //     scrub: 1
    //     }
    // })
    // .fromTo('.firstBlock-text',      { y:   0 }, { y: -300 }, 0)
    // .fromTo('.firstBlock-star1',   { y: 100 }, { y: -800 }, 0)
    // .fromTo('.firstBlock-star2',   { y:-150 }, { y: -500 }, 0)
    // .fromTo('.firstBlock-backMontain1',   { x: -30 }, { x: 100 }, 0)
    // .fromTo('.firstBlock-backMontain2',  { y: -10 }, { y: -100 }, 0)
    // .fromTo('.firstBlock-tower',  { x: 320 }, { x: -550 }, 0)
    


    // // === 箭頭按鈕效果 ===
    // const arrowBtn = document.querySelector('#arrow-btn')

    // // 滑鼠移入 → 箭頭下彈
    // arrowBtn.addEventListener('mouseenter', () => {
    //     gsap.to('.arrow', {
    //     y: 10,
    //     duration: 0.8,
    //     ease: 'back.inOut(3)',
    //     overwrite: 'auto'
    //     }) 
    // })

    // // 滑鼠移出 → 箭頭回到原位
    // arrowBtn.addEventListener('mouseleave', () => {
    //     gsap.to('.arrow', {
    //     y: 0,
    //     duration: 0.2,
    //     ease: 'power3.out',
    //     overwrite: 'auto'
    //     }) 
    // })

    // // 點擊 → 捲動到下一個畫面高度
    // arrowBtn.addEventListener('click', () => {
    //     gsap.to(window, {
    //     scrollTo: innerHeight,
    //     duration: 1.5,
    //     ease: 'power1.inOut'
    //     })
    // })
    
})
onUnmounted(()=>{
    window.removeEventListener('scroll', controlScroll)
})


//test start



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

        

    </Section>


    <!-- 大div 包裹四區塊-->
    <HomePageContent/>


</template>

<style scoped lang="scss">
@import '../assets/styles/main.scss';
// .scrollDist {
//   height: 900vh; /* 卷軸區域 */
//   background: lightblue;
// }

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
    // overflow-x: hidden;
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




</style>