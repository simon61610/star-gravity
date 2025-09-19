
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import icon1 from "@/assets/images/home/mascot01.svg"
import icon2 from "@/assets/images/home/mascot02.svg"
import icon3 from "@/assets/images/home/mascot03.svg"
import icon4 from "@/assets/images/home/mascot04.svg"
import icon5 from "@/assets/images/home/mascot05.svg"
// Props，讓元件更靈活
const props = defineProps({
  size: { type: Number, default: 40 },          // 星星大小
  icon: { type: String, default: "/star.svg" }, // 星星圖片路徑
  glowColor: { type: String, default: "yellow" } // 光暈顏色
})
let isActive = true
const cursor = ref(null)
const face = ref(null)
const faces = [icon2,icon3,icon4,icon5]
const currentIcon = ref(icon1)

// 滑鼠位置 & 當前游標位置
let mouse = { x: 0, y: 0 };//目標位置 (滑鼠所在座標)
let pos = { x: 0, y: 0 }; //游標目前位置

function moveMouse(e) {
  mouse.x = e.clientX; //更新目標的X值
  mouse.y = e.clientY; //更新目標的Y值
}
//事件: 當滑鼠點擊時，觸發光暈動畫
function clickEffect() {
  const glow = cursor.value.querySelector(".glow")
  glow.classList.remove("animate")  // reset 動畫
  void glow.offsetWidth              // 利用void運算子重複reflow 確保動畫可重播 
  glow.classList.add("animate")
  if (face.value) {
      gsap.fromTo(face.value, 
      { scale: 0.7 }, 
      { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" }
    );
  }
   const availableFaces = faces.filter(f => f !== currentIcon.value)
    currentIcon.value = availableFaces[Math.floor(Math.random() * availableFaces.length)]
}

function animate(){
    // 緩慢追上
    if(!isActive) 
  return
  pos.x += (mouse.x - pos.x) * 1;  //t = 0.15 = 插值比例 (追隨速度)
  pos.y += (mouse.y - pos.y) * 1;
  gsap.set(cursor.value, { x: pos.x, y: pos.y });  // 用 GSAP 設定元素位置
  requestAnimationFrame(animate);
}

// 額外對 a 跟 btn 也產生 hover 效果 
function handleMouseOver(e) {
  if (e.target.closest("a, button")) {
    cursor.value.classList.add("hover")
  }
}
function handleMouseOut(e) {
  if (e.target.closest("a, button")) {
    cursor.value.classList.remove("hover")
  }
}

onMounted(() => {
  window.addEventListener("mousemove", moveMouse)
  window.addEventListener("click", clickEffect, true  )
  document.body.addEventListener("mouseover", handleMouseOver)
  document.body.addEventListener("mouseout", handleMouseOut)
  animate()
})

onBeforeUnmount(() => {
  isActive = false
  window.removeEventListener("mousemove", moveMouse)
  window.removeEventListener("click", clickEffect, true )
  document.body.removeEventListener("mouseover", handleMouseOver)
  document.body.removeEventListener("mouseout", handleMouseOut)
})

</script>

<template>
  <div class="cursor" ref="cursor">
    <!-- 星星圖 -->
    <img :ref="face" :src="currentIcon" alt="cursor face" :style="{ width: size + 'px', height: size + 'px' }" />
    <!-- 光暈圈 -->
    <span class="glow" :style="{ borderColor: glowColor }"></span>
  </div>
</template>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  cursor: none;
  z-index: 9999;
  
  
}

.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border: 3px solid;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.glow.animate {
  animation: pulse 0.7s ease-out forwards;
}

@keyframes pulse {
  0%   { width: 0; height: 0; opacity: 0.8; }
  70%  { width: 60px; height: 60px; opacity: 0.4; }
  100% { width: 80px; height: 80px; opacity: 0; }
}

.cursor.hover img {
  transform: scale(1.4);
  filter: drop-shadow(0 0 8px gold);
}
</style>
