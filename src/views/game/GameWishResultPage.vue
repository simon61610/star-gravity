<!-- src/views/game/GameWishResultPage.vue -->
<template>
  <main class="result" :class="phase" :style="{ '--bg': bgStyle }">
    <!-- Phase A：短暫回饋（宇宙已接收） -->
    <section v-if="phase === 'anim'" class="anim">
      <h1 class="msg">你的願望宇宙已經接收到了</h1>
      <img v-if="satellite" :src="satellite" alt="" class="sat" />
      <img v-if="meteor"    :src="meteor"    alt="" class="meteor" />
    </section>

    <!-- Phase B：最終結果（照設計稿） -->
    <section v-else class="wall" aria-label="許願牆最終結果">
      <div class="card">

        <!-- 外圈 shape 覆蓋圖（依使用者選的圖案） -->
        <img v-if="ringSrc" :src="ringSrc" alt="" class="ring ring--shape" />

     
        <!-- 願望摘要（從 localStorage 讀取） -->
        <section class="wish-summary" v-if="latest">
          <h3 class="wish-summary__title">你的心願</h3>
          <p class="wish-summary__name">by {{ latest.name }}</p>
          <blockquote class="wish-summary__text">{{ latest.wish }}</blockquote>

        </section>
        <section class="wish-summary wish-summary--empty" v-else>
          <p>找不到剛剛的願望內容 🥲</p>
        </section>

        <div class="socials" role="group" aria-label="分享">
          <a href="#" class="icon" aria-label="Facebook" @click.prevent="doShare('facebook')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 9H16V6h-2.5C11.6 6 11 7.2 11 8.7V10H9v3h2v5h3v-5h2.2l.3-3H14v-1c0-.6.2-1 .9-1Z" fill="currentColor"/></svg>
          </a>
          <a href="#" class="icon" aria-label="Instagram" @click.prevent="doShare('instagram')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm4 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5Zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5Zm5.25-3.25a.75.75 0 1 1-.75.75.75.75 0 0 1 .75-.75Z" fill="currentColor"/></svg>
          </a>
          <a href="#" class="icon" aria-label="複製連結" @click.prevent="doShare('link')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.6 13.4a1 1 0 0 1 0-1.4l3-3a4 4 0 1 1 5.7 5.7l-1.8 1.8a4 4 0 0 1-5.7 0 .999.999 0 1 1 1.4-1.4 2 2 0 0 0 2.8 0l1.8-1.8a2 2 0 0 0-2.8-2.8l-3 3a1 1 0 0 1-1.4 0ZM13.4 10.6a1 1 0 0 1 0 1.4l-3 3a4 4 0 1 1-5.7-5.7l1.8-1.8a4 4 0 0 1 5.7 0 .999.999 0 1 1-1.4 1.4 2 2 0 0 0-2.8 0L5.2 9.7a2 2 0 0 0 2.8 2.8l3-3a1 1 0 0 1 1.4 0Z" fill="currentColor"/></svg>
          </a>
        </div>

        <RouterLink class="btn" to="/gamewish">返回</RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

/* ========= 資產自動載入 ========= */
const pickOne = (pool, suffixes = []) => {
  const keys = Object.keys(pool)
  for (const s of suffixes) {
    const hit = keys.find(k => k.toLowerCase().endsWith(s.toLowerCase()))
    if (hit) return pool[hit]
  }
  return ''
}

// 動畫階段素材
const transitFiles = import.meta.glob('/src/assets/images/games/GameWishTransitPage/*', {
  eager: true, import: 'default'
})
const animBg    = pickOne(transitFiles, ['wishpagetransition-bg.svg','wishpagetransition-bg.png','bg.svg','bg.png'])
const satellite = pickOne(transitFiles, ['satellite.png','satellite.svg'])
const meteor    = pickOne(transitFiles, ['meteor.png','meteor.svg'])

// 最終四種背景
const resultFiles = import.meta.glob('/src/assets/images/games/GameWishResultPage/*', {
  eager: true, import: 'default'
})
const THEMES = ['love','career','health','wealth']
const normalizeTheme = (raw) => {
  if (raw == null) return 'love'
  const s = String(raw).toLowerCase()
  if (/^\d+$/.test(s)) return THEMES[Math.max(0, Math.min(3, Number(s)))] || 'love'
  return THEMES.includes(s) ? s : 'love'
}
const theme = ref(normalizeTheme(route.query.theme ?? route.query.type ?? route.query.t ?? route.query.result))
watch(() => route.query, q => { theme.value = normalizeTheme(q?.theme ?? q?.type ?? q?.t ?? q?.result) }, { deep:true })

const finalBg = computed(() => {
  const keys = Object.keys(resultFiles)
  const re = new RegExp(`(final|wall|result).*(\\-|_|/)${theme.value}\\.(png|svg|jpg|jpeg)$`, 'i')
  const hit = keys.find(k => re.test(k)) ||
              keys.find(k => k.toLowerCase().endsWith(`${theme.value}.png`)) ||
              keys.find(k => k.toLowerCase().endsWith(`${theme.value}.svg`))
  return hit ? resultFiles[hit] : ''
})

/* ========= 兩階段：anim -> final ========= */
const ANIM_MS = 2400
const phase = ref('anim') // 'anim' | 'final'
onMounted(() => setTimeout(() => { phase.value = 'final' }, ANIM_MS))

const bgUrl = computed(() => phase.value === 'anim' ? animBg : (finalBg.value || animBg))
const bgStyle = computed(() =>
  bgUrl.value
    ? `url(${bgUrl.value})`
    : 'linear-gradient(180deg,#091430,#0b0f26)'
)

/* ========= 文案 ========= */
const finalTitle = computed(() => String(route.query.title || '願望'))
const finalText  = computed(() =>
  String(route.query.text || 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...')
)

/* ========= 願望資料（localStorage） ========= */
const STORAGE_LATEST = 'wishWallLatest'
const latest = ref(null)

onMounted(() => {
  try {
    latest.value = JSON.parse(localStorage.getItem(STORAGE_LATEST) || 'null')
  } catch (e) {
    latest.value = null
  }
})

const shapeLabel = computed(() => {
  switch (latest.value?.shape) {
    case 'heart':   return '愛心'
    case 'square':  return '方形'
    case 'circle':  return '圓形'
    case 'droplet': return '水滴'
    default:        return '—'
  }
})

/* ========= 外圈 shape 影像（依使用者選擇） ========= */
const ringFiles = import.meta.glob(
  '/src/assets/images/games/GameWishResultPage/ring-*.{png,svg,jpg,jpeg}',
  { eager: true, import: 'default' }
)
const ringSrc = computed(() => {
  const key = (latest.value?.shape || '').toLowerCase() // heart/square/circle/droplet
  if (!key) return ''
  const hit = Object.keys(ringFiles).find(p => p.toLowerCase().includes(`ring-${key}.`))
  return hit ? ringFiles[hit] : ''
})

/* ========= 分享 ========= */
const doShare = async () => {
  const url = location.href
  await navigator.clipboard?.writeText(url)
  alert('連結已複製！')
}
</script>

<style scoped lang="scss">
.result{
  min-height:100vh; position:relative; overflow:hidden; color:#fff;
  background: url('@/assets/images/games/GameWishResultPage/WishPageUniver-bg.png') center/cover no-repeat;
  transition: background-image .6s ease;
  &.anim { display:grid; place-items:center; text-align:center; }
  &.final{ display:grid; place-items:center; }
}

/* ===== Phase A：簡短回饋動畫 ===== */
.msg{
  letter-spacing:.15em; font-weight:700; font-size: clamp(18px, 3.2vw, 28px);
  animation: fadeIn .7s ease-out both .15s;
}
.sat{
  position:absolute; right:12vw; top:28vh; width:min(24vw,220px);
  animation: float 3.2s ease-in-out infinite;
}
.meteor{
  position:absolute; left:8vw; top:46vh; width:min(20vw,180px); opacity:.9;
  animation: drift 5s linear infinite;
}

/* ===== Phase B：結果卡 ===== */
.wall{ width:100%; display:grid; place-items:center; padding: 24px; }

.card{
  position:relative;
  width: min(78vw, 560px); aspect-ratio: 1 / 1;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  padding: clamp(16px, 3vw, 28px);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.5));
  border: 1px solid rgba(255,255,255,.25);
  backdrop-filter: blur(8px);
  box-shadow: 0 16px 48px rgba(0,0,0,.35);
  animation: rise .6s ease both .05s;
}

/* 星點圓環（兩圈 + shape 覆蓋） */
.ring{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  border-radius:50%; pointer-events:none;
  filter: drop-shadow(0 0 8px rgba(255,255,255,.25));
}
.ring--outer{
  width: 82%; aspect-ratio:1/1;
  border: 2px dotted rgba(255,255,255,.45);
  opacity:.9;
}
.ring--inner{
  width: 62%; aspect-ratio:1/1;
  border: 2px dotted rgba(255,255,255,.28);
  opacity:.8;
}
/* 外圈 shape 覆蓋層 */
.ring--shape{
  width:82%; aspect-ratio:1/1; object-fit:contain;
  opacity:.95; filter:none; z-index:1;
}

/* 內容 */
.card__title{
  margin: 0 0 10px;
  font-weight: 800; letter-spacing:.18em;
  font-size: clamp(22px, 3.6vw, 30px);
  text-shadow: 0 2px 10px rgba(0,0,0,.3);
}
.card__desc{
  max-width: 78%;
  line-height: 1.7; opacity: .9;
  font-size: clamp(12px, 1.6vw, 14px);
  text-align:center; margin: 0 0 16px;
}

/* 願望摘要 */
.wish-summary {
  margin-top: 6px; text-align: center;
  &__title { font-weight:800; letter-spacing:.2em; margin-bottom:6px; font-size: clamp(16px, 2.2vw, 18px); text-shadow: 0 2px 8px rgba(0,0,0,.25); }
  &__name { opacity:.85; margin-bottom:4px; font-size:14px; }
  &__text { white-space: pre-wrap; line-height:1.8; font-size:16px; margin:0 auto; max-width:40ch; text-shadow:0 1px 6px rgba(0,0,0,.25); }
  &__shape { margin-top:6px; opacity:.85; font-size:14px; }
}
.wish-summary--empty { opacity:.8; }

/* 社群按鈕 */
.socials{ display:flex; gap: 14px; margin: 10px 0 18px; }
.icon{
  --s: 38px;
  width: var(--s); height: var(--s); display:grid; place-items:center;
  border-radius: 999px;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.25);
  box-shadow: 0 4px 14px rgba(0,0,0,.25), inset 0 0 24px rgba(255,255,255,.05);
  color:#fff; text-decoration:none;
}
.icon svg{ width:20px; height:20px }

/* 返回按鈕（膠囊） */
.btn{
  position:absolute; bottom:18px; left:50%; transform:translateX(-50%);
  display:inline-block; padding: 10px 24px; border-radius:999px;
  color:#fff; text-decoration:none; letter-spacing:.2em;
  background:linear-gradient(180deg,#9b8afc,#5e40e6);
  box-shadow:0 10px 24px rgba(90,70,200,.45);
  border: 1px solid rgba(255,255,255,.25);
}

/* 動畫 */
@keyframes fadeIn { from{opacity:0; transform:translateY(6px)} to{opacity:1; transform:none} }
@keyframes float  { 0%,100%{ transform: translateY(-6px) rotate(-3deg)} 50%{ transform: translateY(6px) rotate(3deg)} }
@keyframes drift  { 0%{ transform: translateX(0) rotate(-8deg)} 100%{ transform: translateX(100vw) rotate(8deg)} }
@keyframes rise   { from{opacity:0; transform:translateY(12px)} to{opacity:1; transform:none} }

@media (prefers-reduced-motion: reduce){
  .msg,.sat,.meteor,.card{ animation: none !important }
}
</style>
