<!-- src/views/game/GameResultPage.vue -->
<script setup>
import { ref, computed } from 'vue'
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

// ===== 類型基本資訊（label）=====
const RESULT_META = {
  love:   { key: 'love',   label: '愛情 Love' },
  career: { key: 'career', label: '事業 Career' },
  health: { key: 'health', label: '健康 Health' },
  wealth: { key: 'wealth', label: '財運 Wealth' },
  study:  { key: 'study',  label: '學業 Study' }
}
const ALL_TYPES = ['love','career','health','wealth','study']

// ===== 多版本文案池（每次進頁隨機）=====
const TEXT_VARIANTS = {
  love: [
    '互動自然、話題不斷；誠實而溫柔的界線能讓距離更靠近。',
    '今天的你特別有魅力；主動開話題，一來一往很快就擦出火花。',
    '放慢節奏更能看見真心；傾聽對方感受比急著表現更加分。',
    '單身：走入人群有機會遇見順眼對象；有伴：安排一個只屬於你們的小儀式。',
    '別怕示弱，脆弱的分享會換來真誠的回應，關係因此更穩固。'
  ],
  career: [
    '靈感湧現、效率提升；把優先順序排好，成果會比想像更快落地。',
    '與其多線開戰，不如聚焦一件最關鍵的事，進度會直線上升。',
    '主動發表你的做法；清晰的提案讓同事放心，把資源推向你。',
    '補上技術負債或流程漏洞，小修小補就能換到大幅穩定。',
    '安排一段無打擾的深度工作時段，你的輸出會非常亮眼。'
  ],
  health: [
    '規律作息是底盤；多喝水與伸展 5 分鐘，專注與精神同步回升。',
    '補充日光與步行 20 分鐘，情緒與睡眠都會更順。',
    '別把能量花在焦慮上；先吃正餐、再吃零食，身體會謝謝你。',
    '久坐記得起身走動，肩頸放鬆一下，頭腦才走得更遠。',
    '少一點熬夜、多一點呼吸練習，今天的你更平穩。'
  ],
  wealth: [
    '小額穩健勝過躁進；記帳控管支出，善用折扣與回饋。',
    '把「先存後花」當標配；分裝零用錢能避免衝動購物。',
    '檢查訂閱與重複支出，砍掉無感小漏水，月底更有餘裕。',
    '學費型投資可以考慮，但別超出預算；長線分散最安心。',
    '用目標信封法：旅費、應急金各自獨立，心更踏實。'
  ],
  study: [
    '分段讀書＋複習清單成效佳；同儕討論能補齊盲點。',
    '番茄鐘 25 分鐘＋5 分鐘走動，專注不掉線、效率更穩。',
    '做題比看書更有效；錯題整理就是你的成長地圖。',
    '把重點教給別人一次，理解會瞬間加深一個層級。',
    '模擬考當正式考，正式考就像熟悉的流程。'
  ]
}

// ===== 穩定亂數（用於百分比）=====
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

// 百分比（穩定 40%~90%）
const percentOf = (typeKey) => {
  const base = 40, span = 50
  const seed = hashStr(`${cardsStr}|${typesStr}|${typeKey}|percent`)
  const rand = rng(seed)()
  return Math.round(base + rand * span)
}

// 每次進頁隨機挑一則文案
const textOf = (typeKey) => {
  const list = TEXT_VARIANTS[typeKey] || []
  if (!list.length) return ''
  const idx = Math.floor(Math.random() * list.length)
  return list[idx]
}

// 右側顯示的五條結果（全部）
const allLines = computed(() =>
  ALL_TYPES.map(key => {
    const info = RESULT_META[key]
    return { ...info, percent: percentOf(key), text: textOf(key) }
  })
)

// 最高值（可能並列）
const maxPercent = computed(() =>
  Math.max(...allLines.value.map(l => l.percent), 0)
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

// ===== 進度條色（其餘不動；僅最高改色）=====
const BAR_COLOR = {
  love:   '#EDD848',
  career: '#EDD848',
  health: '#EDD848',
  wealth: '#EDD848',
  study:  '#EDD848',
}

// ===== 卡面：依主要結果換圖（先用通用卡面，可改成五張）=====
import divination_ball from '@/assets/images/games/GameCardPage/game-card_Divination ball.png'
import candle from '@/assets/images/games/GameCardPage/game-card_Candle.png'
import bookmark from '@/assets/images/games/GameCardPage/game-card_book.png'
import puzzle from '@/assets/images/games/GameCardPage/game-card_puzzle.jpg'

// ===== 推薦商品：隨機挑一個 =====
const PRODUCTS = [
  {
    id: 24,
    title: '星座許願球',
    desc: '搭配三段情境光，床頭夜燈、告白禮、升學與生日祝福，都能承載你的願望。',
    img: divination_ball
  },
  {
    id: 23,
    title: '星空能量蠟燭',
    desc: '結合香氛與星座能量，點燃時釋放守護力量，陪伴你度過專注或療癒時刻。',
    img: candle
  },
  {
    id: 22,
    title: '占星書籤組',
    desc: '十二星座金屬書籤，陪你在知識的宇宙裡航行。',
    img: bookmark
  },
  {
    id: 25,
    title: '星空拼圖',
    desc: '完成後拼出整片夜空，動手拼湊也像在整理思緒。',
    img: puzzle
  }
]

// 每次進頁面隨機選一個商品
const pickedProduct = ref(PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)])

// 導向商品詳情
const goBack = () => router.push({ name: 'gamecard' })
const goProduct = () => {
  router.push(`/shop/category/product/${pickedProduct.value.id}`)
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
               :alt="`抽到的卡片－${RESULT_META[primaryType]?.label || '占卜卡'}`" />
        </aside>

        <!-- 右：列出全部，並標示最高分為「最佳運勢」 -->
        <div class="result">
          <div class="lines">
            <div
              class="line"
              v-for="line in allLines"
              :key="line.key"
              :class="{ 'is-max': line.percent === maxPercent }"
              :style="{ '--bar-color': BAR_COLOR[line.key] }"
            >
              <div class="label">
                {{ line.label }}
                <span
                  v-if="line.percent === maxPercent"
                  class="best-tip"
                  aria-label="最佳運勢"
                >最佳運勢</span>
              </div>

              <div class="row" role="img" :aria-label="`${line.label}：${line.percent}%`">
                <div class="bar">
                  <div class="bar__fill" :style="{ width: line.percent + '%' }"></div>
                </div>
                <div class="val">{{ line.percent }}%</div>
              </div>

              <p class="desc">{{ line.text }}</p>
            </div>
          </div>

          <!-- 推薦商品（隨機） -->
          <article class="product" aria-label="推薦商品">
            <header class="product__hd">
              <span class="tag">推薦商品</span>
              <h2 class="product__title">{{ pickedProduct.title }}</h2>
              <p class="product__desc">{{ pickedProduct.desc }}</p>
              <button class="btn btn--gold" type="button" @click="goProduct">查看商品</button>
            </header>
            <div class="product__thumb">
              <img :src="pickedProduct.img" :alt="pickedProduct.title" />
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

  /* 保留高度避免覆蓋下方 */
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

/* 手機版：置中疊放 */
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

/* 全部列出，最高標記 */
.lines {
  padding: 20px 20px 12px;
  border-radius: 16px;
}
.line + .line { margin-top: 18px; }

.label {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #5C4B90;
}

/* 最高分徽章 */
.best-tip {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 800;
  border-radius: 999px;
  background: #EDD848;   /* 與最高分進度條同色 */
  color: #5C4B90;
  vertical-align: middle;
}

/* 長條 + 百分比並排 */
.row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bar {
  flex: 1 1 auto;
  height: 14px;
  border-radius: 999px;
  background: #5C4B90; /* 進度條底色 */
  overflow: hidden;
  margin-bottom: 8px;

  &__fill {
    height: 100%;
    background: #cab1c9;   /* 預設填充色 */
    transition: width 0.4s ease;
  }
}

/* 右側百分比數字 */
.val {
  flex: 0 0 auto;
  min-width: 3.5ch;         /* 足夠顯示 100% */
  text-align: right;
  font-size: 14px;
  font-weight: 700;
  color: #5C4B90;
  margin-bottom: 8px;
}

/* 最高分進度條換色（可並列） */
.line.is-max .bar__fill {
  background: #EDD848;
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
    @media (max-width: 430px) {
      padding: 10px 100px;
    }
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
