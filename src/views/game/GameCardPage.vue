<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'

// ===== 圖片（請改成你的實際檔案）=====
import backSvg   from '@/assets/images/games/GameCardPage/game_card01.svg'
import front01   from '@/assets/images/games/GameCardPage/game_card02.svg' // 先當作通用正面圖
const frontFallback = front01

// 若你已有五款正面圖，打開並改成你的路徑：
import frontLove   from '@/assets/images/games/GameCardPage/front-love.svg'
import frontCareer from '@/assets/images/games/GameCardPage/front-career.svg'
import frontHealth from '@/assets/images/games/GameCardPage/front-health.svg'
import frontWealth from '@/assets/images/games/GameCardPage/front-wealth.svg'
import frontStudy  from '@/assets/images/games/GameCardPage/front-study.svg'

// 類別 → 正面圖
const FRONT_OF_TYPE = {
  love:   frontLove,
  career: frontCareer,
  health: frontHealth,
  wealth: frontWealth,
  study:  frontStudy,
}

// ===== 結果類別（5 種）=====
const TYPES = ['love', 'career', 'health', 'wealth', 'study']

// ===== 舞台/卡片位置（px）=====
const STAGE = { w: 1400, h: 800 }
const DECK  = { y: 600, cardW: 180, cardH: 320, gap: -80 }
// 3 個槽位
const SLOTS = { y: 200, gap: 250, tilt: [-8, 0, 8] }
const CENTER = { offsetX: 0 }

const total = 12

const cards = ref(
  Array.from({ length: total }, (_, i) => ({
    i,
    place: 'deck',   // 'deck' | 'slot'
    slotIndex: -1,   // 0..2
    flipped: false,
    type: null       // 一開始不指定；點擊時從剩餘類別隨機指定
  }))
)

const MAX_PICKS = 3
const usedSlots = ref([])           // 已用槽位
const pickedIndexes = ref([])       // 抽到的卡 index
const pickedTypes = ref(new Set())  // 已抽到的類別（避免重複）

const canPickMore = computed(() => pickedIndexes.value.length < MAX_PICKS)
const isFull = computed(() => pickedIndexes.value.length === MAX_PICKS)
const ctaText = computed(() => (isFull.value ? '查看占卜結果' : '請依直覺抽出三張'))
const onCtaClick = () => { if (isFull.value) goResult() } // 抽滿才導頁

// 底部位置（水平置中直線）
const deckPos = (idx) => {
  const span = DECK.cardW + DECK.gap
  const center = (total - 1) / 2
  const x = (idx - center) * span + (CENTER.offsetX || -90)
  const y = DECK.y
  return { x, y, rot: 0, z: idx + 1 }
}

// 上方槽位（0..2 → -1..1）
const slotPos = (slotIndex) => {
  const x = (slotIndex - 1) * SLOTS.gap + (CENTER.offsetX || -90)
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

// 依卡片類別取得正面圖
const frontSrc = (c) => (c.type ? (FRONT_OF_TYPE[c.type] || frontFallback) : frontFallback)

// 從尚未抽過的類別中，隨機挑一個
const pickRandomAvailableType = () => {
  const remaining = TYPES.filter(t => !pickedTypes.value.has(t))
  if (remaining.length === 0) return null
  const r = Math.floor(Math.random() * remaining.length)
  return remaining[r]
}

// —— 底部提示顯示控制（已上移） —— //
const showHint = ref(true)
// 往上抬升提示距離（單位：px）— 想再高就把 120 調大
const HINT_RAISE = 120
const hintStyle = computed(() => ({
  left: '50%',
  top: (DECK.y - HINT_RAISE) + 'px', // 原本是 DECK.y - 48
  transform: `translateX(calc(-50% + ${(CENTER.offsetX || -90)}px))`
}))
watch(pickedIndexes, (arr) => {
  if (arr.length > 0) showHint.value = false
})

const router = useRouter()

// 點擊：指派隨機類別（不可與已抽重複）→ 移到槽位 → 翻面
const onPick = async (idx) => {
  // 先隱藏提示
  showHint.value = false

  const card = cards.value[idx]
  if (!canPickMore.value) return
  if (card.place === 'slot' || card.flipped) return

  // 指派一個尚未出現過的類別
  const type = pickRandomAvailableType()
  if (!type) return
  card.type = type

  // 找空槽位 (0..2)
  const slot = [0,1,2].find(s => !usedSlots.value.includes(s))
  if (slot == null) return

  card.place = 'slot'
  card.slotIndex = slot
  usedSlots.value.push(slot)
  pickedIndexes.value.push(idx)
  pickedTypes.value.add(type)

  await nextTick()
  setTimeout(() => { card.flipped = true }, 600) // 與 CSS transition 對齊
}

// 抽滿後前往結果頁（route name = 'gamestory'）
const goResult = () => {
  if (pickedIndexes.value.length !== MAX_PICKS) return

  const payload = {
    cards: pickedIndexes.value,                 // 例如 [0,3,7]
    types: Array.from(pickedTypes.value),       // 例如 ['love','career','health']
  }

  // 備援：避免重新整理或 query 遺失
  try {
    localStorage.setItem('cardResult', JSON.stringify(payload))
  } catch (e) {
    console.warn('localStorage 寫入失敗：', e)
  }

  router.push({
    name: 'gamestory',
    query: {
      cards: payload.cards.join(','),           // "0,3,7"
      types: payload.types.join(','),           // "love,career,health"
    },
  })
}
</script>

<template>
  <main class="scene">
    <div
      class="stage"
      :style="{
        width: STAGE.w + 'px',
        height: STAGE.h + 'px'
        // 如需舞台背景圖：backgroundImage: `url(${bgStage})`
      }"
    >
      <!-- 整合版 CTA：未抽滿顯示提示；抽滿變成「查看占卜結果」可點擊 -->
      <button
        class="cta"
        :class="{ 'is-ready': isFull }"
        :style="{ '--center-offset': CENTER.offsetX + 'px' }"
        type="button"
        :disabled="!isFull"
        @click="onCtaClick"
      >
        {{ ctaText }}
      </button>

      <!-- 無障礙朗讀提示（螢幕閱讀器） -->
      <p class="sr-only" aria-live="polite">
        {{ isFull ? '已抽滿三張，點「查看占卜結果」' : '請點擊下方任一張卡片開始抽牌' }}
      </p>

      <!-- 底部引導提示（會在第一次抽牌後自動消失） -->
      <div
        v-if="showHint && canPickMore"
        class="deck-hint"
        :style="hintStyle"
        role="status"
      >
        <span class="deck-hint__arrow">▼</span>
        <span class="deck-hint__text">點擊下方卡片抽牌</span>
      </div>

      <!-- 卡片 -->
      <button
        v-for="(c, idx) in cards"
        :key="c.i"
        class="card"
        type="button"
        :style="styleFor(c, idx)"
        :data-place="c.place"
        :aria-pressed="c.flipped ? 'true' : 'false'"
        @click="onPick(idx)"
      >
        <div class="card-inner" :class="{ 'is-flipped': c.flipped }">
          <img class="card-face card-front" :src="frontSrc(c)" :alt="`卡片正面 ${idx + 1}`" />
          <img class="card-face card-back"  :src="backSvg" alt="卡片背面" />
        </div>
      </button>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

/* 讓 1440px 舞台置中 */
.scene {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(/src/assets/images/games/GameCardPage/game_card-bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
  top: 60px;
  transform: translateX(calc(-50% + var(--center-offset, 0px)));
  padding: 12px 20px;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;  
  background: #26264b;
  border: none;
  box-shadow: 0 6px 16px rgba(0, 0, 0, .25);
  z-index: 1000; /* 確保不被卡片蓋住 */
}
.cta:disabled { opacity: .6; cursor: default; }

/* === 可點擊狀態：柔和脈動發光 === */
.cta.is-ready {
  cursor: pointer;
  box-shadow:
    0 8px 18px rgba(0, 0, 0, .35),
    0 0 16px rgba(114, 129, 255, .45),
    0 0 34px rgba(114, 129, 255, .35);
  text-shadow: 0 1px 0 rgba(0,0,0,.25);
  animation: ctaGlow 1.8s ease-in-out infinite;
}

/* 滑過或鍵盤聚焦時更亮 */
.cta.is-ready:hover,
.cta.is-ready:focus-visible {
  box-shadow:
    0 10px 22px rgba(0, 0, 0, .4),
    0 0 22px rgba(132, 146, 255, .6),
    0 0 44px rgba(132, 146, 255, .5);
  transform: translateX(calc(-50% + var(--center-offset, 0px))) scale(1.02);
  outline: none;
}

/* 脈動發光動畫 */
@keyframes ctaGlow {
  0%, 100% {
    box-shadow:
      0 8px 18px rgba(0, 0, 0, .35),
      0 0 10px rgba(114, 129, 255, .35),
      0 0 22px rgba(114, 129, 255, .28);
    transform: translateX(calc(-50% + var(--center-offset, 0px))) scale(1);
  }
  50% {
    box-shadow:
      0 10px 22px rgba(0, 0, 0, .4),
      0 0 18px rgba(132, 146, 255, .55),
      0 0 36px rgba(132, 146, 255, .45);
    transform: translateX(calc(-50% + var(--center-offset, 0px))) scale(1.015);
  }
}

/* 動畫減量偏好：停用動畫但保留微光 */
@media (prefers-reduced-motion: reduce) {
  .cta.is-ready {
    animation: none;
  }
}

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
  border-radius: 12px;
}
.card-front { transform: rotateY(180deg); }

/* 無障礙：僅供螢幕閱讀器讀取 */
.sr-only {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

/* 底部提示泡泡 */
.deck-hint {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(38, 38, 75, .92);
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  box-shadow: 0 6px 16px rgba(0,0,0,.25);
  pointer-events: none;       /* 讓點擊不被擋到卡片 */
  animation: hintFloat 1.6s ease-in-out infinite;
  z-index: 1200;
}
.deck-hint__arrow {
  font-size: 18px;
  animation: arrowBounce 1s ease-in-out infinite;
}
.deck-hint__text { opacity: .95; letter-spacing: .02em; }

@keyframes hintFloat {
  0%, 100% { transform: translateY(0) translateX(var(--hx, 0)); }
  50%      { transform: translateY(-6px) translateX(var(--hx, 0)); }
}
@keyframes arrowBounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(3px); }
}

/* 只有還能抽牌時，讓底部牌列卡片有微幅吸睛動畫 */
.card[data-place="deck"] {
  transition: top .6s ease, transform .6s ease, box-shadow .2s ease;
}
.scene :is(.deck-hint) ~ .card[data-place="deck"] {
  animation: cardNudge 1.8s ease-in-out infinite;
}
@keyframes cardNudge {
  0%, 100% { transform: translateX(var(--tx, 0)) rotate(var(--rot, 0deg)); }
  50%      { transform: translateX(var(--tx, 0)) translateY(-6px) rotate(var(--rot, 0deg)); }
}
</style>
