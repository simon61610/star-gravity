<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// ===== 圖片（示意路徑，請改成你的實際檔案）=====
import backSvg  from '@/assets/images/games/GameCardPage/game_card01.svg'
import front01  from '@/assets/images/games/GameCardPage/game_card02.svg'

// <!-- 抽滿才可點的「查看結果」 -->
const isFull = computed(() => pickedIndexes.value.length === MAX_PICKS)
const ctaText = computed(() => (isFull.value ? '查看占卜結果' : '請依直覺抽出三張'))
const onCtaClick = () => { if (isFull.value) goResult() } // 抽滿才導頁

// ===== 結果類別（共 5 種）=====
const TYPES = ['love', 'career', 'health', 'wealth', 'study']

// 12 張牌 → 依素材配置對應類別（範例：平均分配；可自行調整）
const TYPE_OF_CARD = [
  'love','career','health','wealth','study','love',
  'career','health','wealth','study','love','career'
]

// ===== 舞台/卡片位置（px）=====
const STAGE = { w: 1400, h: 800 }
const DECK  = { y: 600, cardW: 180, cardH: 320, gap: -80 }
// 3 個槽位
const SLOTS = { y: 200, gap: 250, tilt: [-8, 0, 8] }
const CENTER = { offsetX: 0 }

const total = 12
const fronts = Array(total).fill(front01)

const cards = ref(
  Array.from({ length: total }, (_, i) => ({
    i,
    place: 'deck',     // 'deck' | 'slot'
    slotIndex: -1,     // 0..2
    flipped: false,
    type: TYPE_OF_CARD[i]
  }))
)

const MAX_PICKS = 3
const usedSlots = ref([])            // 純 JS，不要加泛型
const pickedIndexes = ref([])        // 被抽中的卡 index
const pickedTypes = ref(new Set())   // 確保類別不重複

const canPickMore = computed(() => pickedIndexes.value.length < MAX_PICKS)

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

// 點擊：移到上方 → 到位後翻面（同類別不可重複）
const onPick = async (idx) => {
  const card = cards.value[idx]
  if (!canPickMore.value) return
  if (card.place === 'slot' || card.flipped) return

  // 防止選到已存在的「結果類別」
  if (pickedTypes.value.has(card.type)) return

  // 找空槽位 (0..2)
  const slot = [0,1,2].find(s => !usedSlots.value.includes(s))
  if (slot == null) return

  card.place = 'slot'
  card.slotIndex = slot
  usedSlots.value.push(slot)
  pickedIndexes.value.push(idx)
  pickedTypes.value.add(card.type)

  await nextTick()
  setTimeout(() => { card.flipped = true }, 600) // 與 CSS transition 對齊
}

const router = useRouter()

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

  // 以路由名稱 'gamestory' 導頁
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
    <button
      class="cta"
      :style="{ '--center-offset': CENTER.offsetX + 'px' }"
      type="button"
      :disabled="!isFull"
      @click="onCtaClick"
    >
      {{ ctaText }}
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
  border-radius: 12px;
}
.card-front { transform: rotateY(180deg); }

/* 查看結果按鈕 */
.result-btn{
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;  
  background: #E76F51;
  border: none;
  box-shadow: 0 6px 16px rgba(0,0,0,.25);
}
.result-btn:disabled { opacity: .6; cursor: default; }
</style>
