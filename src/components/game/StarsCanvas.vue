<script setup>
import {ref,onMounted,watch,nextTick} from 'vue'
const props = defineProps({
    stars:{
        type:Array,
        default:() => [] //回傳預設值星點座標
    },
    lines:{
        type:Array,
        default:() => [] //回傳預設值要連的線，格式 [[0,1],[1,2],...]
    },
    bg: {   
    type: String,
    default: ''
    },
    showLines:Boolean
  
})

const isAnimating = ref(false) //控制星座動畫顯示開關

//線段直接全部顯示
const showAllLines = () => {
  isAnimating.value = false;
  currentStep.value = props.lines.length
  console.log("showall 被呼叫了")
}


//線段逐漸顯示
const currentStep = ref(0)
function drawNext() {
  isAnimating.value = true
  if (currentStep.value < props.lines.length) currentStep.value++
  if (currentStep.value === props.lines.length) isAnimating.value = false
}


//重製線段
const resetLines = () => {
  isAnimating.value = false;
   currentStep.value = 0
   console.log('currentStep.value')
}


 //讓父層調用程式
defineExpose({
  drawNext,
  resetLines,
  showAllLines
})

// 假設 star 是 {x:數字, y:數字} 直線距離公式...
function lineLength(a, b) {
  const dx = (a.x - b.x) / 100 * 759
  const dy = (a.y - b.y) / 100 * 546
  return Math.sqrt(dx*dx + dy*dy)
}

 // 切換星座時，重製線條進度

watch(
  () => [props.stars, props.lines],
  () => {
    isAnimating.value = false //星點資訊變化了關閉樣式
    currentStep.value = 0 }, //星點資訊變化了就清0
   { deep: true } // 監聽物件內部變化
 )



</script>

<template>
    <div class="Stars-Canvs-box">
        <svg class="Stars-Canvs-wapper"
        viewBox="0 0 759 546"
        preserveAspectRatio="xMidYMid meet">
           
            <image class="figure" :href="bg" x='0' y="0" width="759" height="546"  />
            <circle  v-for="(star,i) in stars" 
            :key="i"
            :cx="0+(star.x/100 * 759)"
            :cy="0+(star.y/100 * 546)" 
            r="4" 
            fill="white"/>

            <!--星點連線-->

            <line v-if="showLines" class="Stars-Canvs-line" v-for="(line,i) in lines"
            :class="{ animate: isAnimating }"
            :key="'line_'+ i" 
            :x1="0+(stars[line[0]].x/100 * 759)" 
            :y1="0+(stars[line[0]].y/100 * 546)"
            :x2="0+(stars[line[1]].x/100 * 759)" 
            :y2="0+(stars[line[1]].y/100 * 546)"
            stroke="white"
            stroke-width="2"
            :stroke-dasharray = "lineLength(stars[line[0]], stars[line[1]])"
            :stroke-dashoffset = " i < currentStep ? 0 : lineLength(stars[line[0]], stars[line[1]])" />    

                                            <!----- 1. key使用字串串接 意思是 key = line_0 給第一條線ID長這樣 
                                                    2. 參數stroke-dasharray為虛線總長度
                                                    3. 參數 stroke-dashoffset為線段偏移量 偏移200等於線段消失 反之0等於線段出現
                                                    4. stroke-dashoffset 三元運算 = if (i < currentStep) {strokeDashoffset = 0   // 顯示這條線} 
                                                    else { strokeDashoffset = lineLength(...)  // 藏起這條線}   ------>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
.Stars-Canvs-line { transition: none; }                 /*  切星座時不會有重製動畫 */
.Stars-Canvs-line.animate { transition: stroke-dashoffset 0.55s linear; } /* 播放才有動畫 */

.Stars-Canvs-box{
    
    width: 100% !important;    
    display: flex !important;
    justify-content: center;
    align-items: center;
    
    .Stars-Canvs-wapper{
    
    max-width: 500px;
    margin-left: 300px;
    width: 100% !important;
    
}
}


// .Stars-Canvs-line{
//     transition: stroke-dashoffset 0.5s ease

// }
@media (max-width: 431px){
  .Stars-Canvs-box{
    
    .Stars-Canvs-wapper{
    
    margin-left: 0px;
  }

  }
  
}

</style>