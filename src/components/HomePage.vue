<script setup>
import { onMounted, ref ,onUnmounted } from 'vue'
import HomePageContent from './HomePageContent.vue';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { subtract } from 'lodash-es';


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

let lastScroll = 0  //設定初始滑動為0
function controlScroll(){
    showbackToTop.value = window.scrollY > 1500
    
    const specialEffects = document.querySelector('.special-effects')
    const homePageContent = document.querySelector('.homePageContent')
    let seHeight = specialEffects.getBoundingClientRect().height   //視差滾動區的高度
    let homePageContentTop = homePageContent.getBoundingClientRect().top  //下方靜態區與視窗頂部的距離
    let windowHeight = window.innerHeight 
    
    let currentScroll = window.scrollY 
    let subtract = lastScroll - currentScroll  
        // console.log(subtract);
    let distance = homePageContentTop-windowHeight  // 差多少會進入視窗畫面
    //判斷是否為下滑狀態
    if( subtract < 0 ){ 
        //判斷何時可以直接上滑到頂   
        if( distance < 30 && distance > 0 ){
            window.scrollTo({
                top: seHeight+50 ,
                behavior:"smooth" 
            })
        }
    }
    lastScroll = currentScroll //滑到多少 就以這距離為初始 繼續和之後的滑動比較
  
    
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
    const test = document.querySelector('.test')
    fetch('pdo/test.php')
            .then( resp => resp.json() )
            .then( (members)=>{
                for( let member of members){
                    test.innerHTML += `
                        <p>${member.name}</p>
                    `
                }
            })



    window.addEventListener('scroll', controlScroll)

        
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    // console.log('GSAP 插件註冊完成')
    let mm = gsap.matchMedia()

    // 獲取元素
    const moon = document.querySelector('.firstBlock-moon')
    const star1 = document.querySelector('.firstBlock-star1') 
    const star2 = document.querySelector('.firstBlock-star2')
    const sea = document.querySelector('.firstBlock-sea')
    const backMontain1 = document.querySelector('.firstBlock-backMontain1')
    const backMontain2 = document.querySelector('.firstBlock-backMontain2')
    const tower = document.querySelector('.firstBlock-tower')
    const towerMountain = document.querySelector('.firstBlock-towerMountain')
    const firstBlockText = document.querySelector('.firstBlock-text')
    // console.log('所有元素檢查完成')
        

    mm.add( "(min-width: 436px)" , ()=>{
        // 設定所有元素的初始位置（在畫面外）
        gsap.set(moon, {
            left: '50%',   
            top: '45%', 
            x: '-50%',     
            y: '-40%',      
            opacity: 1,
            scale: 1.3 ,
        })
    
        gsap.set(star1, {
            right: '20%',     
            top: '35%',     
            opacity: 0
        })
    
        gsap.set(star2, {
            left: '15%',
            top: "75%",      
            opacity: 0
        })
    
        gsap.set(backMontain1, {
            left: '-100%',
            bottom: '-100%',
            opacity: 0.5
        })
    
        gsap.set(backMontain2, {
            bottom: '-100%',
            right: '-100%',
            opacity: 0.5
        })
    
        gsap.set(sea, {
            x: '0%',     
            y: '50%',      
            opacity: 0
        })
    
        gsap.set(firstBlockText, {
            left:'50%',
            bottom: '20%',
            x: '-50%',
            opacity: 0,
        })
    
        gsap.set(tower, {
            right:'-5%',
            bottom:'5%',       
            opacity: 0
        })
    
        gsap.set(towerMountain, {
            right: '-100%',    
            bottom: '-50%',
            opacity: 0.5
        })
        
        // console.log('初始位置設定完成')
        
        // 創建時間軸
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.special-effects', // 觸發整個 special-effects 區域
                start: 'top top',
                end: 'bottom bottom', // 改為相對於容器底部
                scrub: 1,
                pin: '.home-firstBlock', // 固定第一個場景
                pinSpacing: true,
                // markers: true,
                // onStart: () => console.log('🚀 ScrollTrigger 開始！'),
                // onUpdate: (self) => console.log('📊 進度:', Math.round(self.progress * 100) + '%'),
                // onComplete: () => console.log('✅ ScrollTrigger 完成！')
            }
        })
        // console.log('🎬 時間軸創建完成')

        // 第一階段：元素進入畫面
        tl.to(moon, {
            left: '20%',
            top: "25%",
            opacity: 1,
            scale: 1 ,
            duration: 1,
            ease: "power2.out"
        }, 0)
        .to(star1, {
            right: '30%',      // 向右偏移 85%（相當於 right: 15%）
            top: '10%', 
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, 0.2)
        .to(star2, {
            left: '20%',
            top: "55%",
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, 0.4)
        
        // 背景元素進入
        .to(backMontain1, {
            // x: '0%',
            left: 0,
            bottom: '18%',
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
        }, 1)
        .to(backMontain2, {
            bottom: '15%',
            right: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
        }, 1)
        .to(sea, {
            y: '0%',
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, 1.1)
        
        // 前景元素
        .to(firstBlockText, {
            left: '50%',
            top: '40%',
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, 2.5)
        .to(tower, {
            right: '15%',
            bottom:'25%',
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
        }, 2.5)
        .to(towerMountain, {
            right:0,
            bottom:0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
        }, 1.8)
    })

     mm.add("(max-width: 435px)", () => {        
        // 手機版初始位置設定（不同於桌面版）
        gsap.set(moon, {
            left: '50%',   // 手機版月亮位置不同
            top: '50%', 
            x: '-50%',     
            y: '-50%',      
            opacity: 1,
            scale: 1.5,    // 手機版較小
        })

        gsap.set(star1, {
            right: '10%',  // 手機版星星位置調整
            top: '50%',     
            opacity: 0
        })

        gsap.set(star2, {
            left: '5%',    // 手機版星星位置調整
            top: "85%",      
            opacity: 0
        })

        gsap.set(backMontain1, {
            left: '-80%',  // 手機版山的進入方式不同
            bottom: '-80%',
            opacity: 0.3
        })

        gsap.set(backMontain2, {
            display: 'none' // 手機版隱藏第二座山
        })

        gsap.set(sea, {
            x: '0%',     
            y: '80%',    // 手機版海的位置不同
            opacity: 0
        })

        gsap.set(firstBlockText, {
            left:'50%',
            bottom: '30%', // 手機版文字位置不同
            x: '-50%',
            opacity: 0,
            scale: 0.8     // 手機版文字較小
        })

        gsap.set(tower, {
            right:'-10%',  // 手機版燈塔進入方式不同
            bottom:'-15%',       
            opacity: 0,
            scale: 0.9     // 手機版燈塔較小
        })

        gsap.set(towerMountain, {
            right: '-120%', // 手機版前景山進入方式不同
            bottom: '-30%',
            opacity: 0.3
        })
        
        // 手機版動畫時間軸（動畫速度和效果都不同）
        const mobileTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.special-effects',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,  // 手機版滾動更靈敏
                pin: '.home-firstBlock',
                pinSpacing: true,
            }
        })
        
        // 手機版動畫序列（與桌面版完全不同的動畫流程）
        mobileTl.to(moon, {
            left: '20%',
            top: "15%",
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "bounce.out"  // 手機版使用彈跳效果
        }, 0)
        .to(star1, {
            right: '10%',
            top: '20%', 
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)"  // 手機版星星有回彈效果
        }, 0.3)
        .to(star2, {
            left: '15%',
            top: "60%",
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)"
        }, 0.5)
        .to(backMontain1, {
            left: '0%',     // 手機版山的最終位置
            bottom: '8%',
            opacity: 1,
            duration: 2,
            ease: "power3.out"
        }, 1)
        .to(sea, {
            y: '0%',
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
        }, 1.2)
        .to(firstBlockText, {
            left: '50%',
            top: '30%',    // 手機版文字最終位置
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
        }, 2)
        .to(tower, {
            right: '8%',   // 手機版燈塔最終位置
            bottom:'10%',
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
        }, 2.2)
        .to(towerMountain, {
            right: '0%',
            bottom: '0%',
            opacity: 1,
            duration: 2,
            ease: "power2.out"
        }, 1.5)
    })
        
    
    

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
    <div class="test">123</div>

    <div class="wrapper">
        <div class="backToTop" @click="scrollToTop" v-show="showbackToTop">
            <h3>top</h3>
        </div>

        <!-- Q&A -->
        <!-- <div class="QA">
            <h3 class="QATitle" @click="showQABox">{{boxText}}</h3>
            <div class="QAbox" v-show="showBox">
                <div v-for="value in 8" class="QAbox-content">
                    <h2 class="cnContent--14px">怎麼退費</h2>
                    <p class="cnContent--14px">不能推費住54324532wawadacawc不能推費住54324532wawadacawc不能推費住54324532wawadacawc</p>
                </div>
                <AccordionItem
                v-for="(item, index) in qaList"
                :key="index"
                :title="item.q"
                :defaultOpen="false"
                >
                <p class="cnContent--20px">{{ item.a }}</p>
                </AccordionItem>
            </div>
        </div> -->
        

        <!-- 動畫效果大區-->
        <section class="special-effects">
        
            <!-- 視差滾動區塊 -->
            <div class="home-firstBlock">
                <img class="firstBlock-moon" src="@/assets/images/home/index-moon.svg" alt="月亮">
                <!-- 星連星 -->
                <img class="firstBlock-star1" src="@/assets/images/home/index-star01.svg" alt="星座A">
                <img class="firstBlock-star2" src="@/assets/images/home/index-star02.svg" alt="星座B">
                <!-- 海與背景山 -->
                <div class="firstBlock-sea"></div>
                <img class="firstBlock-backMontain1" src="@/assets/images/home/index-MountainBackLeft.svg" alt="左山景">
                <img class="firstBlock-backMontain2" src="@/assets/images/home/index-MountainBackright.svg" alt="右山景">
                <!-- 前景燈塔與山 -->
                <img class="firstBlock-tower" src="@/assets/images/home/index-lightHouse.svg" alt="燈塔">
                <img class="firstBlock-towerMountain" src="@/assets/images/home/index-MountainInfron.svg" alt="前景山">
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

            

        </section>


        <!-- 大div 包裹四區塊-->
        <div class="homePageContent">
            <HomePageContent/>
        </div>    


    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
.wrapper{
    overflow: hidden;
    // overflow: visible;
}
.special-effects{
    min-height: 400vh; 
}
.homePageContent{
    // position: relative;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    z-index: 100;
}
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
        // background-image: url('@/assets/icons/icon-guide_star.svg');
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
    background-image: url('@/assets/images/home/index-bgp1.png');
    background-size: cover;
    background-color: $primaryColor-100;
    width: 100%;
    height:100vh;
    // height: calc(100vh - 50px);

    position: relative;

    .firstBlock-moon{
        width: 25vh;

        position: absolute;
        //left: 15%;
        //top: 10%;
    }

    .firstBlock-star1{
        height: 15vh;

        position: absolute;
        //right: 20%;
        //top: 8%;

        animation: star1 5s linear infinite;
    }

    .firstBlock-star2{
        height: 15vh;

        position: absolute;
        //left: 25%;
        //top: 45%;

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

    background-image: url(@/assets/images/home/index-sea.svg);
    background-size: cover;

    position: absolute;
    bottom: 0;

     z-index: 10;
}
.firstBlock-backMontain1{
    width: 25vw;
    
    position: absolute;
    //bottom: 18%;
    //z-index: 1;

}
.firstBlock-backMontain2{
    width: 70vw;

    position: absolute;
    //bottom: 15%;
    //right: 0;
    z-index: 1;
}
    //前景
.firstBlock-tower{
    height: 42vh;
    position: absolute;
    //right: 25vh;
    //bottom: 25vh;
    z-index: 20;
    
}
.firstBlock-towerMountain{
    height: 40vh;
    position: absolute;
    //right: 0;
    //bottom: 0;
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
    //left: 50%;
    //top: 30%;
    //translate: -50% 0;
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

//..............RWD..................
@media screen and (max-width:435px) {
    .home-firstBlock{
        height: 100vh !important;

        .firstBlock-moon{
            position: absolute;
            width: 120px;
            top: 5%;
        }
        .firstBlock-star1{
            position: absolute;
            height: 80px;
        }
        .firstBlock-star2{
            position: absolute;
            height: 100px;
            top:400px;
            left: 10%;
        }
        .firstBlock-sea{
            position: absolute;
            height: 80px;
        }
        .firstBlock-backMontain1{
            position: absolute;
            width: 70%;
            bottom: 60px;
        }
        .firstBlock-backMontain2{
            display: none;
        }
        .firstBlock-tower{
            position: absolute;
            bottom: 48px;
            right: 6%;
        }
        .firstBlock-towerMountain{
            position: absolute;
            height: 150px;
        }
    }

}






</style>