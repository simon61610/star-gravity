
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import icon from "@/assets/images/home/mascot02.svg"
// Props，讓元件更靈活
const props = defineProps({
  size: { type: Number, default: 30 },          // 星星大小
  icon: { type: String, default: "/star.svg" }, // 星星圖片路徑
  glowColor: { type: String, default: "yellow" } // 光暈顏色
})

const cursor = ref(null)

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
  gsap.fromTo(cursor.value, 
    { scale: 0.7 }, 
    { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" }
  );
}

function animate(){
    // 緩慢追上
  pos.x += (mouse.x - pos.x) * 0.3;  //t = 0.15 = 插值比例 (追隨速度)
  pos.y += (mouse.y - pos.y) * 0.3;
  gsap.set(cursor.value, { x: pos.x, y: pos.y });  // 用 GSAP 設定元素位置
  requestAnimationFrame(animate);
}

onMounted(() => {
  window.addEventListener("mousemove", moveMouse)
  window.addEventListener("click", clickEffect)

  document.body.addEventListener("mouseover", e => {  //額外監聽 a 跟 button 產生havor效果
    if (e.target.closest("a, button")) {
      cursor.value.classList.add("hover")
    }
  })

  document.body.addEventListener("mouseout", e => {
    if (e.target.closest("a, button")) {
      cursor.value.classList.remove("hover")
    }
  })
  animate()
})

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", moveMouse)
  window.removeEventListener("click", clickEffect)
  document.body.removeEventListener("mouseover", () => {})
  document.body.removeEventListener("mouseout", () => {})
})

</script>

<template>
  <div class="cursor" ref="cursor">
    <!-- 星星圖（換成你自己的 star.svg 也可以） -->
    <img :src="icon" alt="star" :style="{ width: size + 'px', height: size + 'px' }" />
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
