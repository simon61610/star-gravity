<!-- src/views/game/GameResultPage.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// ===== 讀取 query + localStorage 備援 =====
const readQueryStr = (val) => (Array.isArray(val) ? val.join(',') : (val || '') + '')

const rawCards = readQueryStr(route.query.cards)
const rawTypes = readQueryStr(route.query.types)

let cardsStr = rawCards
let typesStr = rawTypes

if (!cardsStr || !typesStr) {
  try {
    const saved = JSON.parse(localStorage.getItem('cardResult') || '{}')
    if (!cardsStr && Array.isArray(saved.cards)) cardsStr = saved.cards.join(',')
    if (!typesStr && Array.isArray(saved.types)) typesStr = saved.types.join(',')
  } catch (e) { /* ignore */ }
}

// ===== 轉成可用資料 =====
const pickedCards = computed(() =>
  (cardsStr || '')
    .split(',')
    .map(n => Number(n))
    .filter(n => Number.isInteger(n))
    .slice(0, 3)
)

const pickedTypes = computed(() =>
  (typesStr || '')
    .split(',')
    .filter(Boolean)
    .slice(0, 3)
)

// 只拿第一張卡做「主要結果」用
const firstCardIndex = computed(() => pickedCards.value.length ? pickedCards.value[0] : 0)

// 若沒帶 types，就用卡片 index 推一個主要結果
const TYPE_ORDER = ['love','career','health','wealth','study']
const mapIndexToType = (idx) => TYPE_ORDER[((idx % TYPE_ORDER.length) + TYPE_ORDER.length) % TYPE_ORDER.length]
const primaryType = computed(() => pickedTypes.value[0] || mapIndexToType(firstCardIndex.value))

// ===== 五種結果文案 =====
const RESULT_CONTENT = {
  love:   { key: 'love',   label: '愛情 Love',   text: '互動自然、有話題就有火花；誠實溝通界線更拉近距離。' },
  career: { key: 'career', label: '事業 Career', text: '靈感湧現、效率提升；排好優先順序穩穩推進，容易遇到貴人。' },
  health: { key: 'health', label: '健康 Health', text: '作息規律最重要；多喝水與伸展運動，精神與專注度同步提升。' },
  wealth: { key: 'wealth', label: '財運 Wealth', text: '小額穩健勝過躁進；記帳控管支出，善用折扣與回饋。' },
  study:  { key: 'study',  label: '學業 Study',  text: '分段讀書＋複習清單成效佳；同儕討論能補齊盲點。' }
}
const ALL_TYPES = ['love','career','health','wealth','study']

// ===== 穩定亂數（每種結果各自穩定）=====
function hashStr(s) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
function rng(seed) {
  let t = seed >>> 0
  return () => {
    t += 0x6D2B79F5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}
// 依「cardsStr/typesStr/類型」三者做種子，確保每一類型都有穩定但不同的百分比
const percentOf = (typeKey) => {
  const base = 40, span = 50 // 40%~90%
  const seed = hashStr(`${cardsStr}|${typesStr}|${typeKey}`)
  const rand = rng(seed)()
  return Math.round(base + rand * span)
}

// 右側要顯示的五條結果
const allLines = computed(() =>
  ALL_TYPES.map(key => {
    const info = RESULT_CONTENT[key]
    return { ...info, percent: percentOf(key) }
  })
)

// ===== 卡面：依主要結果換圖（先用通用卡面，可改成五張）=====
import frontFallback from '@/assets/images/games/GameCardPage/game_card02.svg'
import frontLove   from '@/assets/images/games/GameCardPage/front-love.svg'
import frontCareer from '@/assets/images/games/GameCardPage/front-career.svg'
import frontHealth from '@/assets/images/games/GameCardPage/front-health.svg'
import frontWealth from '@/assets/images/games/GameCardPage/front-wealth.svg'
import frontStudy  from '@/assets/images/games/GameCardPage/front-study.svg'

const FRONT_OF_TYPE = {
  love: frontLove, career: frontCareer, health: frontHealth, wealth: frontWealth, study: frontStudy
}
const frontSrc = computed(() => FRONT_OF_TYPE[primaryType.value] || frontFallback)

// ===== Bar 顏色（每種不同）=====
const BAR_COLOR = {
  love:   '#EDD848',
  career: '#EDD848', 
  health: '#EDD848', 
  wealth: '#EDD848', 
  study:  '#EDD848', 
}

// ===== 導頁 =====
const goBack = () => router.push({ name: 'gamecard' })
const goProduct = () => {
  // 例：router.push({ name: 'shop-product', params: { id: 'wish-ball' } })
}
</script>

<template>
  <main class="fortune" aria-label="占卜結果頁">
    <div class="bg"></div>

    <div class="wrap">
      <h1 class="title" aria-label="占卜結果">
        <span class="block">占</span><span class="block">卜</span><span class="block">結</span><span class="block">果</span>
      </h1>

      <section class="content">
        <!-- 左：只顯示一張正面卡（依主要結果換圖） -->
        <aside class="cards" aria-label="抽到的卡片">
          <img class="card card--back"
               src="/src/assets/images/games/GameCardPage/game_card01.svg"
               alt="背面卡片" />
          <img class="card card--front"
               :src="frontSrc"
               :alt="`抽到的卡片－${RESULT_CONTENT[primaryType]?.label || '占卜卡'}`" />
        </aside>

        <!-- 右：一次顯示五種結果 -->
        <div class="result">
          <div class="lines">
            <div
              class="line"
              v-for="line in allLines"
              :key="line.key"
              :class="{ 'is-primary': line.key === primaryType }"
              :style="{ '--bar-color': BAR_COLOR[line.key] }"
            >
              <div class="label">{{ line.label }}</div>
              <div class="bar">
                <div class="bar__fill" :style="{ width: line.percent + '%' }"></div>
              </div>
              <p class="desc">{{ line.text }}</p>
            </div>
          </div>

          <!-- 推薦商品 -->
          <article class="product" aria-label="推薦商品">
            <header class="product__hd">
              <span class="tag">推薦商品</span>
              <h2 class="product__title">星座許願球</h2>
              <p class="product__desc">
                搭配三段情境光，無論是床頭夜燈、告白禮、升學與生日祝福，都能以最溫柔的光，承載你的願望。
              </p>
              <router-link to="/shop/category/product/1"><button class="btn btn--gold" type="button" @click="goProduct">查看商品</button></router-link>
            </header>
            <div class="product__thumb">
              <img src="/src/assets/images/games/GameCardPage/game-card_Divination ball.png" alt="星座許願球" />
            </div>
          </article>
        </div>
      </section>

      <div class="footer">
        <button class="btn btn--ghost" type="button" @click="goBack">返回</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.fortune {
  align-items: center;
  justify-content: center;
  background-image: url(/src/assets/images/games/GameCardPage/game_card-bg2.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* 背景舞台 */
.bg { pointer-events: none; }

.wrap {
  width: min(1120px, 92%);
  margin: 0 auto;
  padding: 48px 0 72px;
  position: relative;
  z-index: 1;
}

/* 標題 */
.title {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 28px;

  .block {
    display: inline-grid;
    place-items: center;
    width: 48px;
    height: 48px;
    font-size: 30px;
    font-weight: 600;
    background: #5C4B90;
    color: #FFF;
    border-radius: 6px;
  }
}

/* 主內容兩欄 */
.content {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
     gap: 2px;
  }
}

/* ===========================
   卡片區（RWD 不壓字 版本）
   =========================== */
.cards {
  /* 桌機尺寸與位置參數 */
  --card-w: 200px;
  --card-h: 320px;
  --back-x: 40px;
  --back-y: 0px;
  --front-x: 120px;
  --front-y: 80px;
  --rotate-back: -14deg;
  --rotate-front: 4deg;

  position: relative;
  padding-top: 12px;

  /* 關鍵：保留高度，避免覆蓋到下面的文字 */
  min-height: calc(var(--card-h) + var(--front-y) + 24px);

  .card {
    width: var(--card-w);
    height: var(--card-h);
    border-radius: 14px;
    display: block;
  }

  .card--back {
    position: absolute;
    left: var(--back-x);
    top: var(--back-y);
    transform: rotate(var(--rotate-back));
  }

  .card--front {
    position: absolute;
    left: var(--front-x);
    top: var(--front-y);
    transform: rotate(var(--rotate-front));
    z-index: 1;
  }
}

/* 手機版：置中疊放，並調整尺寸與高度保留 */
@media (max-width: 900px) {
  .cards {
    --card-w: 200px;
    --card-h: 320px;

    --back-y: 8px;
    --front-y: 28px;
    --rotate-back: -8deg;
    --rotate-front: 3deg;

    min-height: calc(var(--card-h) + var(--front-y) + 24px);
  }

  .cards .card--back,
  .cards .card--front {
    left: 50%;
    transform: translateX(-50%) rotate(var(--rotate-front));
  }
  .cards .card--back {
    transform: translateX(-50%) rotate(var(--rotate-back));
  }
}

/* 右側結果 */
.result {
  display: grid;
  grid-template-rows: auto auto;
  gap: 24px;
}

/* 五條說明 + 進度條 */
.lines {
  padding: 20px 20px 12px;
  border-radius: 16px;
}
.line + .line { margin-top: 18px; }

.label {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #5C4B90;
}

.bar {
  height: 14px;
  border-radius: 999px;
  background: #5C4B90;
  overflow: hidden;
  margin-bottom: 8px;

  &__fill {
    height: 100%;
    background: var(--bar-color, $secondaryColor-yellow);
    transition: width 0.4s ease;
  }
}

/* 推薦商品卡 */
.product {
  display: grid;
  grid-template-columns: 1fr 220px;
  align-items: center;
  gap: 4px;
  padding: 18px 24px;
  background: #5C4B90;
  border-radius: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }

  &__hd {
    .tag {
      display: inline-block;
      padding: 5px 7px;
      font-size: 14px;
      border:1px solid $FontColor-white;
      color:$FontColor-white;
      margin-bottom: 8px;
      font-weight: 400;
    }

    .product__title {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 10px;
      color: #FFF;
    }
    .product__desc {
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 12px;
      color:$FontColor-white;
    }
  }

  &__thumb {
    justify-self: end;
    width: 200px;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    display: grid;
    place-items: center;
    img { max-width: 90%; max-height: 90%; display: block; }
    @media (max-width: 720px) { justify-self: start; }
  }
}

/* 按鈕 */
.btn {
  display: inline-grid;
  place-items: center;
  padding: 10px 123px;
  border-radius: 999px;
  font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer;

  &--gold {
    color: $primaryColor-900;
    background-color: $secondaryColor-yellow;
  }
  &--gold:hover {
    color: $FontColor-white;
    background-color: $primaryColor-900;
  }

  &--ghost {
    background: transparent;
    border-color:$FontColor-white;
    color: $FontColor-white;
    padding: 10px 250px;
  }
  &--ghost:hover {
    background: $FontColor-white;
    color: $primaryColor-900;
  }
}

.footer {
  display: grid;
  place-items: center;
  margin-top: 20px;
}
</style>
