<script setup>
import { ref, computed, nextTick } from 'vue'

// ===== 圖片（示意路徑，請改成你的實際檔案）=====
import backSvg  from '@/assets/images/games/GameCardPage/game_card01.svg'
import front01  from '@/assets/images/games/GameCardPage/game_card02.svg'
// 如果每張不同：改成 [front01, front02, ... front12]

const fronts = Array(total).fill(front01)


// ===== 舞台/卡片位置（px）=====
const STAGE = { w: 1400, h: 800}   // 你的背景實際尺寸（高度請改成你的）
const DECK  = { y:600, cardW: 180, cardH: 320, gap: -80} // 底部直線列
const SLOTS = { y: 200, gap: 250, tilt: [-8, 0, 8] }      // 上方三槽
const CENTER = { offsetX: 0 } 

const total = 12
const cards = ref(
  Array.from({ length: total }, (_, i) => ({
    i,
    place: 'deck',     // 'deck' | 'slot'
    slotIndex: -1,     // 0/1/2
    flipped: false
  }))
)

const usedSlots = ref([])
const canPickMore = computed(() => usedSlots.value.length < 3)

// 底部位置（水平置中直線）
const deckPos = (idx) => {
  const span = DECK.cardW + DECK.gap
  const center = (total - 1) / 2
  const x = (idx - center) * span+ (CENTER.offsetX || -90) //CENTER.offsetX調整背景對齊基線
  const y = DECK.y
  return { x, y, rot: 0, z: idx + 1 }
}

// 上方槽位（水平置中三等分）
const slotPos = (slotIndex) => {
  const x = (slotIndex - 1) * SLOTS.gap+ (CENTER.offsetX || -90) //CENTER.offsetX調整背景對齊基線
  const y = SLOTS.y
  const rot = SLOTS.tilt[slotIndex] != null ? SLOTS.tilt[slotIndex] : 0
  return { x, y, rot, z: 80 + slotIndex }
}

const styleFor = (c, idx) => {
  const p = c.place === 'deck' ? deckPos(idx) : slotPos(c.slotIndex)
  return {
    left: '50%',
    top: p.y + 'px',
    transform: `translateX(${p.x}px) rotate(${p.rot}deg)`,
    zIndex: p.z,
    width: DECK.cardW + 'px',
    height: DECK.cardH + 'px'
  }
}

// 點擊：移到上方 → 到位後翻面
const onPick = async (idx) => {
  const card = cards.value[idx]
  if (card.place === 'slot' || card.flipped || !canPickMore.value) return
  const slot = [0, 1, 2].find(s => !usedSlots.value.includes(s))
  if (slot == null) return
  card.place = 'slot'
  card.slotIndex = slot
  usedSlots.value.push(slot)
  await nextTick()
  setTimeout(() => { card.flipped = true }, 600) // 與 CSS transition 對齊
}
</script>

<template>
  <main class="scene">
    <div
      class="stage"
      :style="{
        width: STAGE.w + 'px',
        height: STAGE.h + 'px',
        backgroundImage: `url(${bgStage})`
      }"
    >
      <button class="cta" 
      :style="{ '--center-offset': CENTER.offsetX + 'px' }"
>
        請依直覺抽出三張牌
        <span v-if="!canPickMore">（已抽滿 3 張）</span>
      </button>

      <button
        v-for="(c, idx) in cards"
        :key="c.i"
        class="card"
        type="button"
        :style="styleFor(c, idx)"
        :aria-pressed="c.flipped ? 'true' : 'false'"
        @click="onPick(idx)"
      >
        <div class="card-inner" :class="{ 'is-flipped': c.flipped }">
          <img class="card-face card-front" :src="fronts[idx]" :alt="`卡片正面 ${idx + 1}`" />
          <img class="card-face card-back"  :src="backSvg" alt="卡片背面" />
        </div>
      </button>
    </div>
  </main>
</template>

<style scoped>
/* 讓 1440px 舞台置中 */
.scene {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(/src/assets/images/games/GameCardPage/game_card-bg.svg);
  background-repeat: no-repeat;    /* 不重複 */
  background-size: cover;          /* 填滿容器 */
  background-position: center;     /* 置中對齊 */

}

/* 舞台固定寬高、背景鋪滿 */
.stage {
  position: relative;
  background: no-repeat center / cover;
  overflow: hidden;
}

/* CTA 置中（依背景微調） */
.cta {
  position: absolute;
  left: 50%;
  top:60px;
  transform: translateX(calc(-50% + var(--center-offset, 0px)));
  padding: 12px 20px;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;  
  background: #26264b;
  border: none;
  box-shadow: 0 6px 16px rgba(0, 0, 0, .25);
}
.cta:disabled { opacity: .6; cursor: default; }

/* 卡片（絕對定位，動畫用 top/transform） */
.card {
  -webkit-appearance: none;
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  position: absolute;
  transition: top .6s ease, transform .6s ease;
  filter: drop-shadow(0 6px 10px rgba(0,0,0,.25));
  perspective: 1000px;
}

/* 翻牌 */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform .6s ease;
}
.card-inner.is-flipped { transform: rotateY(180deg); }

.card-face {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  backface-visibility: hidden;
  border-radius: 12px; /*  SVG 圓角 */
}
.card-front { transform: rotateY(180deg); }
</style>
