<script setup>
import { computed } from 'vue'

// props.data 結構同前（stars / lines / figureImg）
// 新增 bgImg（天空底圖 PNG）、starPng（星點小圖 PNG）
const props = defineProps({
  data: Object,
  revealStep: Number,     // 0 隱藏 / 1 點 / 2 連線 / 3 疊圖
  shownLines: Number,     // 逐段顯示前 N 條
  bgImg: String,          // 背景 PNG
  figureOpacity: { type: Number, default: 0.95 },
  starPng: String,        // 星點 PNG（圓點或發光）
  starSize: { type: [Number,String], default: 20 } // 星點 PNG 寬度(px)
})

const showStars  = computed(()=> props.revealStep >= 1)
const showLines  = computed(()=> props.revealStep >= 2)
const showFigure = computed(()=> props.revealStep >= 3)
</script>

<template>
  <div class="sky">
    <!-- 背景 PNG -->
    <img v-if="bgImg" class="bg" :src="bgImg" alt="" decoding="async" fetchpriority="high" />

    <!-- 連線（保留 SVG 才能做動畫） -->
    <svg class="stage" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <g v-if="data && showLines">
        <!-- 用前面做好的 <LineDraw> 也可以；這裡先用靜態線示意 -->
        <line v-for="(p,i) in data.lines.slice(0, shownLines)" :key="i"
              :x1="data.stars[p[0]].x" :y1="data.stars[p[0]].y"
              :x2="data.stars[p[1]].x" :y2="data.stars[p[1]].y"
              stroke="white" stroke-opacity=".85" stroke-width=".6" />
      </g>

      <!-- 若你想「線條動畫」：把上面的 <line> 換成你做好的 <LineDraw> -->
      <!--
      <LineDraw v-for="(p,i) in data.lines.slice(0, shownLines)" :key="i"
        :x1="data.stars[p[0]].x" :y1="data.stars[p[0]].y"
        :x2="data.stars[p[1]].x" :y2="data.stars[p[1]].y" :duration="440" />
      -->
    </svg>

    <!-- 星點用 PNG 疊上去（用百分比定位） -->
    <template v-if="data && showStars">
      <img v-for="(s,i) in data.stars" :key="i"
           class="star"
           :src="starPng" alt=""
           :style="{
             left: s.x + '%',
             top:  s.y + '%',
             width: typeof starSize==='number' ? starSize + 'px' : starSize
           }"
           decoding="async" />
      <!-- 若要顯示星名： -->
      <!-- <span class="label" v-for="(s,i) in data.stars" :key=\"'t'+i\" :style=\"{left:s.x+'%',top:s.y+'%'}\">{{ s.label }}</span> -->
    </template>

    <!-- 星座圖 PNG 疊圖 -->
    <img v-if="data && showFigure && data.figureImg"
         class="figure" :src="data.figureImg" :style="{opacity: figureOpacity}" alt="" />
  </div>
</template>

<style scoped>
.sky{
  background-image: url(/src/assets/images/games/GameSkyPage/gamesky_bg.svg);
}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}
.stage{position:absolute;inset:0;width:100%;height:100%;display:block}
.figure{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none}

/* PNG 星點用絕對定位（以 0~100% 對齊 viewBox）*/
.star{
  position:absolute;transform:translate(-50%,-50%);
  image-rendering:auto; /* 確保不糊 */
  pointer-events:none;
}
/* 文字標籤（若要用） */
.label{
  position:absolute;transform:translate(-50%,-120%);
  color:#fff;font-size:12px;text-shadow:0 1px 2px rgba(0,0,0,.6);pointer-events:none
}
</style>
