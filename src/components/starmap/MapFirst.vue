<script setup>
import { onMounted, ref } from 'vue'

const stars = ref([])

onMounted(() => {
  // 生成300顆隨機星星
  for (let i = 0; i < 200; i++) {
    stars.value.push({
      x: Math.random() * 100, // 0-100%
      y: Math.random() * 100, // 0-100%
      size: Math.random() * 3 + 1, // 1-4px
      opacity: Math.random() * 0.5 + 0.5, // 0.5-1
      twinkleDelay: Math.random() * 5 // 0-5秒延遲
    })
  }
})

import { useRouter } from 'vue-router'
const router = useRouter()
const isLeaving = ref(false)

const goToMapMain = async () => {
  // 添加離開動畫
  isLeaving.value = true
  
  // 等待動畫完成
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 跳轉頁面
  router.push('/mapmain')
}


</script>

<template>
    <div class="wrapper" :class="{ 'leaving': isLeaving }">
        <h1>STAR MAP</h1>
        <!-- <router-link to="/mapmain" class="map-click button--map" @click="goToMapMain">
            Click here
        </router-link> -->
        <button class="map-click button--map" @click="goToMapMain">Click here</button>
        <div class="decorate">
            <p>精選觀星地點</p>
        </div>
        
        <!-- 動態生成的星星 -->
        <div 
          v-for="(star, index) in stars" 
          :key="index"
          class="star-point"
          :style="{
            left: star.x + '%',
            top: star.y + '%',
            width: star.size + 'px',
            height: star.size + 'px',
            opacity: star.opacity,
            animationDelay: star.twinkleDelay + 's'
          }"
        ></div>
        
        <!-- 流星 -->
        <div class="meteor-1"></div>
        <div class="meteor-2"></div>
        <div class="meteor-3"></div>
        <div class="meteor-4"></div>
        <div class="meteor-5"></div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.wrapper {
    background-image: radial-gradient(ellipse at top , #080e21 0%,  #1b2735 95%);
    background-color: $bgColor-shop;
    width: 100%;
    height: calc( 100vh - 50px);
    background-size: cover;

    padding-bottom: 48px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;

    // transition: all 0.5s ease;
}

.wrapper.leaving {
  // opacity: 0.6;
  // transform: scale();
  filter: blur(2px);
}

.wrapper h1 {
    margin: 0 auto;
    text-align: center;
    color: $primaryColor-100;
    font-size: 160px;
    font-family: $enFont;
    letter-spacing: 20px;
}

.wrapper a, .map-click {
    display: block;
    width: 250px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border-radius: 999px;
    font-size: 24px;
    margin: 0 auto;
    text-decoration: none;
}

.decorate {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    bottom: 0;
    translate: -5% -20%;
}

.decorate p {
    display: block;
    width: 230px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid $FontColor-white;
    color: $FontColor-white;
    text-align: center;
    line-height: 70px;
    font-size: 24px;
    font-weight: bold;
}

// 星星樣式
.star-point {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
  animation: twinkle 3s linear infinite;
}

@keyframes twinkle {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.2; 
    transform: scale(0.8);
  }
}

// 流星動畫
$n: 5;
@for $i from 1 through $n {
  $v: random(90) + 9;
  $h: random(250) + 50;
  $d: random(70)/10 + 3;
  
  .meteor-#{$i} {
    position: absolute;
    top: $h + px;
    left: $v*1%;
    width: 300px;
    height: 1px;
    transform: rotate(-45deg);
    background-image: linear-gradient(to right, #fff, rgba(255,255,255,0));
    animation: meteor $d+s linear infinite;
    
    &:before {
      content: "";
      position: absolute;
      width: 4px;
      height: 5px;
      border-radius: 50%;
      margin-top: -2px;
      background: rgba(#fff,.7);
      box-shadow: 0 0 15px 3px #fff;
    }
  }
}

@keyframes meteor {
  0% {
    opacity: 1;
    margin-top: -300px;
    margin-right: -300px;
  }
  12% {
    opacity: 0;
  }
  15% {
    margin-top: 300px;
    margin-left: -600px;
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>