<!-- src/views/game/GameResultPage.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// ---- 讀取 query，並在缺少時用 localStorage 備援 ----
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
  } catch (e) {
    // ignore
  }
}

// ---- 解析為可用資料：3 張卡 / 3 種結果 ----
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

// ---- 五種結果的文案（先放示例，你可改成自己的）----
const RESULT_CONTENT = {
  love:   { key: 'love',   label: '愛情 Love',   text: '互動自然、有話題就有火花；誠實溝通界線更拉近距離。' },
  career: { key: 'career', label: '事業 Career', text: '靈感湧現、效率提升；排好優先順序穩穩推進，容易遇到貴人。' },
  health: { key: 'health', label: '健康 Health', text: '作息規律最重要；多喝水與伸展運動，精神與專注度同步提升。' },
  wealth: { key: 'wealth', label: '財運 Wealth', text: '小額穩健勝過躁進；記帳控管支出，善用折扣與回饋。' },
  study:  { key: 'study',  label: '學業 Study',  text: '分段讀書＋複習清單成效佳；同儕討論能補齊盲點。' }
}

// ---- 穩定亂數（同一組 cards/types 每次顯示相同百分比）----
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

const resultLines = computed(() => {
  const seedStr = (cardsStr || '') + '|' + (typesStr || '')
  const rand = rng(hashStr(seedStr))
  return pickedTypes.value.map(t => {
    const base = 40, span = 50 // 40%~90%
    const percent = Math.round(base + rand() * span)
    const info = RESULT_CONTENT[t] || { key: t, label: t, text: '（請補上此結果的說明內容）' }
    return { ...info, percent }
  })
})

// ---- 按鈕動作 ----
const goBack = () => router.push({ name: 'gamecard' })  // 若抽牌頁名稱不同，改這裡
const goProduct = () => {
  // 連到你的商品頁（自行替換）
  // 例：router.push({ name: 'shop-product', params: { id: 'wish-ball' } })
}

</script>

<template>
  <main class="fortune" aria-label="占卜結果頁">
    <!-- 背景／舞台 -->
    <div class="bg"></div>

    <div class="wrap">
      <!-- 標題 -->
      <h1 class="title" aria-label="占卜結果">
        <span class="block">占</span>
        <span class="block">卜</span>
        <span class="block">結</span>
        <span class="block">果</span>
      </h1>

      <section class="content">
        <!-- 左邊：卡片疊放（最多 3 張） -->
        <aside class="cards" aria-label="抽到的卡片">
          <img
            class="card card--back"
            src="/src/assets/images/games/GameCardPage/game_card01.svg"
            alt="背面卡片"
          />
          <!-- 疊 3 張正面，位置由 index 微調 -->
          <img
            v-for="(idx, i) in pickedCards"
            :key="idx"
            class="card card--front"
            src="/src/assets/images/games/GameCardPage/game_card02.svg"
            :alt="`抽到的卡片 ${i+1}`"
            :style="{
              left: (120 + i * 40) + 'px',
              top:  (80  - i * 6 ) + 'px',
              transform: `rotate(${8 - i*6}deg)`
            }"
          />
        </aside>

        <!-- 右邊：結果 + 商品 -->
        <div class="result">
          <!-- 三項分數（依 types 動態渲染） -->
          <div class="lines">
            <div class="line" v-for="line in resultLines" :key="line.key">
              <div class="label">{{ line.label }}</div>
              <div class="bar">
                <div class="bar__fill" :style="{ width: line.percent + '%' }"></div>
              </div>
              <p class="desc">{{ line.text }}</p>
            </div>
          </div>

          <!-- 推薦商品卡（保留你的內容，可接到實際商品頁） -->
          <article class="product" aria-label="推薦商品">
            <header class="product__hd">
              <span class="tag">推薦商品</span>
              <h2 class="product__title">星座許願球</h2>
              <p class="product__desc">
                搭配三段情境光，無論是床頭夜燈、告白禮、升學與生日祝福，都能以最溫柔的光，承載你的願望。
              </p>
              <button class="btn btn--gold" type="button" @click="goProduct">查看商品</button>
            </header>
            <div class="product__thumb">
              <img
                src="/src/assets/images/games/GameCardPage/game-card_Divination ball.png"
                alt="星座許願球"
              />
            </div>
          </article>
        </div>
      </section>

      <!-- 返回按鈕 -->
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

/* 標題：四個方塊字 */
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
  }
}

/* 卡片區：可疊放 3 張 */
.cards {
  position: relative;
  padding-top: 12px;

  .card {
    width: 200px;
    height: 320px;
    border-radius: 14px;
    display: block;
  }

  .card--back {
    position: absolute;
    left: 40px;
    top: 0;
    transform: rotate(-14deg);
  }

  .card--front {
    position: absolute; /* 改為絕對定位以便依 index 疊放 */
    z-index: 1;

    @media (max-width: 900px) {
      left: 226px !important;
      top: 20px !important;
    }
  }

  .card-name {
    margin-left: 128px;
    margin-top: 16px;
    font-weight: 700;
    letter-spacing: 0.2em;
  }
}

/* 右側結果 */
.result {
  display: grid;
  grid-template-rows: auto auto;
  gap: 24px;
}

/* 三條說明 + 進度條 */
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
    background: $secondaryColor-yellow;
  }
}

.desc { line-height: 1.6; font-size: 14px; }

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
    img {
      max-width: 90%;
      max-height: 90%;
      display: block;
    }

    @media (max-width: 720px) { justify-self: start; }
  }
}

/* 按鈕樣式 */
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
