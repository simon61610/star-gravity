<script setup>
import Index from '@/components/index.vue'
import { ref , onMounted, onBeforeUnmount } from 'vue'

const vantaRef = ref(null)
const vantaEffect = ref(null)
let meteorInterval = null  //給初值
let container = null  //給初值

onMounted(() => {     //掛載vanta特效
    vantaEffect.value = window.VANTA.NET({
      el: vantaRef.value,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      backgroundColor: 0x0a0f1f,
      scale: 1.0,
      scaleMobile: 1.0,
      speed: 0,
      points: 18.0,
      color: 0xd9c6cf,
      maxDistance: 1.0,
      spacing: 16.0,
    })


  container = vantaRef.value //定義容器
  if (container) {
    meteorInterval = setInterval(createMeteor, 1000) // 300ms 一顆
  }
  

})

onBeforeUnmount(() => {   //卸載vanta特效
  if (vantaEffect.value) {
    vantaEffect.value.destroy()
  }
  clearInterval(meteorInterval)
})

/*------------流星生成程式------------------*/
function createMeteor(){
        const meteor = document.createElement('div');  //創造一個dev
        meteor.classList.add('meteor');   //用classList套用shooting的class

        meteor.style.top = -50+Math.random()*(window.innerHeight/2) + 'px'; //.style動態修改位置   後面位置隨機生成+字串px 
        meteor.style.left = Math.random()*window.innerWidth + 'px';

        meteor.addEventListener('animationend', () => {     //監聽動畫
        meteor.remove();                                 //動畫結束後移除meteor
        })
        container.appendChild(meteor);  //套用流星CSS
    }

    


</script>



<template>
    <div ref="vantaRef" class="vanta-bg" id="bg">
        <div class="sky-glow"></div>
        <Index />
    </div>

</template>

<style scoped lang="scss">
.vanta-bg {
  margin: 0 auto 0;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
}

/* 流星 CSS */
:global(.meteor){
  position: absolute;
  top: 0;
  width: 10px;
  height: 80px;
  background: linear-gradient(-45deg, white, rgba(255,255,255,0));
  border-radius: 50%;
  transform: rotate(45deg);
  animation: shooting 2s ease-out forwards;
}

/* 流星動畫 */
@keyframes shooting {
  0%   { transform: translateX(0) translateY(0) rotate(45deg); opacity: 1; }
  50%  { opacity: 0.7; }
  100% { transform: translateX(-1200px) translateY(1000px) rotate(65deg); opacity: 0; }
}


</style>