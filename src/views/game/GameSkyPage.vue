<script setup>
import { ref, computed } from 'vue'

/**
 * 資料格式說明：
 * key: 代碼；name: 顯示名稱；image: 星座插圖（透明 PNG）
 * stars: 星點，使用百分比定位 { x, y, mag, label }
 * links: 兩兩相連的星點索引（對應 stars 的陣列索引）
 */
const CONSTELLATIONS = [
  {
    key: 'aries',
    name: '牡羊座',
    image: new URL('@/assets/constellations/aries.png', import.meta.url).href,
    stars: [
      { x: 22, y: 58, mag: 2.2, label: 'α' },
      { x: 33, y: 48, mag: 2.6, label: 'β' },
      { x: 45, y: 42, mag: 3.0, label: 'γ' },
      { x: 58, y: 40, mag: 3.6, label: 'δ' },
      { x: 70, y: 46, mag: 4.0, label: 'ε' },
    ],
    links: [
      [0,1],[1,2],[2,3],[3,4]
    ],
  },
  // 你可以再補其它星座（示意兩個空殼，先共用一張圖或換自己的）
  {
    key: 'taurus',
    name: '金牛座',
    image: new URL('@/assets/constellations/taurus.png', import.meta.url).href,
    stars: [
      { x: 20, y: 40, mag: 2.0, label: 'α' },
      { x: 28, y: 35, mag: 2.8, label: 'β' },
      { x: 36, y: 45, mag: 3.1, label: 'γ' },
    ],
    links: [[0,1],[1,2]],
  },
  {
    key: 'gemini',
    name: '雙子座',
    image: new URL('@/assets/constellations/gemini.png', import.meta.url).href,
    stars: [
      { x: 60, y: 30, mag: 1.9, label: 'α' },
      { x: 70, y: 35, mag: 2.0, label: 'β' },
      { x: 65, y: 50, mag: 3.3, label: 'γ' },
    ],
    links: [[0,2],[1,2]],
  },
]

const currentKey = ref('aries')
const current = computed(() =>
  CONSTELLATIONS.find(c => c.key === currentKey.value) ?? CONSTELLATIONS[0]
)

// 星點的大小（mag 可當作亮度/大小參考）
const starSize = (mag) => {
  // 亮度越大等級越小，這裡反轉做視覺化：等級小 -> 點大
  // 可依喜好調整
  const base = 12
  return `${base - Math.min(mag, 5) * 1.2}px`
}
</script>

<template>
  <section class="star-scene" aria-label="十二星座展示">
    <!-- 星空背景 -->
    <div class="sky"></div>

    <!-- 山脈剪影（純裝飾） -->
    <div class="mountain"></div>

    <!-- 星座舞台 -->
    <div class="stage">
      <!-- 星座插畫 -->
      <img class="constellation-img" :src="current.image" :alt="current.name" />

      <!-- 連線（SVG） -->
      <svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line v-for="(pair, i) in current.links" :key="i"
              :x1="current.stars[pair[0]].x" :y1="current.stars[pair[0]].y"
              :x2="current.stars[pair[1]].x" :y2="current.stars[pair[1]].y" />
      </svg>

      <!-- 星點（可閃爍） -->
      <button
        v-for="(s, i) in current.stars" :key="i"
        class="star"
        :style="{
          left: s.x + '%',
          top:  s.y + '%',
          width: starSize(s.mag),
          height: starSize(s.mag)
        }"
        :aria-label="`星點 ${s.label ?? i+1}`"
        title="點一下可閃爍"
        @click="$event.currentTarget.classList.toggle('pulse')"
      >
        <span class="label" v-if="s.label">{{ s.label }}</span>
      </button>

      <!-- 星座名稱 -->
      <div class="caption">{{ current.name }}</div>
    </div>

    <!-- 星座選單 -->
    <nav class="zodiac-menu" aria-label="星座選單">
      <button
        v-for="c in CONSTELLATIONS"
        :key="c.key"
        :class="['z-btn', { active: c.key === currentKey }]"
        @click="currentKey = c.key"
      >
        {{ c.name }}
      </button>
    </nav>
  </section>
</template>

<style scoped>
/* 場景基礎 */
.star-scene{
  position: relative;
  height: 100vh;
  background: #000;
  overflow: hidden;
  color: #fff;
}

/* 星空背景 */
.sky{
  position:absolute; inset:0;
  background:
    radial-gradient(ellipse at 50% -10%, rgba(32,60,130,.6), transparent 60%),
    radial-gradient(ellipse at 50% 120%, rgba(8,20,50,.9), rgba(0,0,0,1) 60%),
    url('@/assets/starmap.jpg') center/cover no-repeat;
  filter: saturate(1.1);
  z-index: 0;
}

/* 山脈剪影 */
.mountain{
  position:absolute; left:0; right:0; bottom:0; height: 16vh;
  background:
    linear-gradient(#0000,#000 30%) ,
    url('data:image/svg+xml;utf8,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox=\'0 0 1200 200\'>\
<path d=\'M0,160 L120,120 L240,150 L360,100 L480,140 L600,90 L720,150 L840,110 L960,140 L1080,120 L1200,160 L1200,200 L0,200 Z\' fill=\'%23000\'/>\
</svg>') center bottom/cover no-repeat;
  z-index: 2;
}

/* 舞台 */
.stage{
  position:absolute; inset:0;
  z-index: 1;
}

/* 星座插畫（透明 PNG） */
.constellation-img{
  position:absolute;
  left:50%; top:48%;
  transform: translate(-50%, -50%);
  width: min(80vw, 900px);
  opacity:.85;
  pointer-events: none;
}

/* 連線 */
.lines{
  position:absolute; inset:0;
}
.lines line{
  stroke: #fff;
  stroke-width: .4;
  opacity: .9;
  filter: drop-shadow(0 0 2px #fff);
}

/* 星點 */
.star{
  position:absolute;
  transform: translate(-50%, -50%);
  border: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px 2px #fff, 0 0 22px 6px rgba(110,170,255,.6);
  cursor: pointer;
}
.star::after{
  content: '';
  position: absolute; inset:-12px;
  background: radial-gradient(closest-side, rgba(255,255,255,.6), transparent 70%);
  border-radius: 50%;
  opacity:.12;
}
.star.pulse{
  animation: pulse 1.4s ease-in-out infinite;
}
@keyframes pulse{
  0%,100% { transform: translate(-50%, -50%) scale(1);   box-shadow: 0 0 10px 2px #fff, 0 0 22px 6px rgba(110,170,255,.6);}
  50%     { transform: translate(-50%, -50%) scale(1.2); box-shadow: 0 0 16px 4px #fff, 0 0 30px 10px rgba(110,170,255,.9);}
}

/* 星點小標 */
.star .label{
  position:absolute;
  top: -18px; left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  text-shadow: 0 0 4px #000, 0 0 8px #000;
  pointer-events: none;
}

/* 星座名稱 */
.caption{
  position:absolute; left:24px; bottom: 72px;
  font-size: clamp(18px, 2.4vw, 28px);
  letter-spacing: .2em;
  text-shadow: 0 2px 10px rgba(0,0,0,.8);
}

/* 選單 */
.zodiac-menu{
  position:absolute; right:24px; bottom:24px;
  display:flex; gap:8px; flex-wrap: wrap;
  max-width: min(70vw, 680px);
  z-index: 3;
}
.z-btn{
  padding:6px 10px;
  border:1px solid rgba(255,255,255,.5);
  background: rgba(255,255,255,.08);
  color:#fff; border-radius: 999px;
  font-size: 14px;
  backdrop-filter: blur(2px);
}
.z-btn:hover{ background: rgba(255,255,255,.16); }
.z-btn.active{
  background: #ffd54a; color:#000; border-color: #ffd54a;
  text-shadow: none;
}
</style>