<script setup>
// <script setup> 使用 Composition API（純 JS） ---------------------------------
import { computed } from 'vue' // 匯入 computed 以建立衍生狀態


// 接收外部屬性（由 App.vue 傳入）
const props = defineProps({ // 定義元件 props
active: { type: Boolean, default: true }, // 是否顯示覆蓋層
progress: { type: Number, default: 0 }, // 進度（0~100）
logoText: { type: String, default: 'STAR' }, // 徽章中央文字
features: { // 三種效果的開關
type: Object,
default: () => ({ pulsar: true, rings: true, moon: true })
},
palette: { // 主題色配置
type: Object,
default: () => ({ // 預設為霓藍星雲風格
bg: '#050a18', star: '#cfe3ff', accent: '#88aaff', accent2: '#8bf5ff',
glass: 'rgba(255,255,255,.06)', glassBorder: 'rgba(255,255,255,.12)',
moon: '#e9f1ff'
})
}
})

// 幾何常數
const ringR = 52 // 外環半徑（對應 SVG r）
const moonR = 18 // 月面半徑
const CIRC = 2 * Math.PI * ringR // 外環周長（用於 dash 計算）


// 夾在 0~100 的進度值
const P = computed(() => Math.max(0, Math.min(100, Number(props.progress) || 0)))


// 外環進度條的 dash 風格（以 offset 代表未填滿長度）
const dashStyle = computed(() => ({ // 綁定到 :style
strokeDasharray: `${CIRC} ${CIRC}`, // 定義完整周長
strokeDashoffset: CIRC * (1 - P.value / 100) // 隨進度遞減（進度越大 offset 越小）
}))


// 月相終止線（黑圓）的 X 偏移量：-r ~ +r（新月→滿月）
const terminatorX = computed(() => (P.value / 100 - 0.5) * 2 * moonR)


// 進度文字：依區間回傳易懂的描述
const labelText = computed(() => {
const v = P.value
if (v < 25) return 'Initializing…' // 0~24%
if (v < 60) return 'Fetching data…' // 25~59%
if (v < 90) return 'Mapping sky…' // 60~89%
if (v < 100) return 'Finalizing…' // 90~99%
return 'Completed' // 100%
})


// 將調色盤映射為 CSS 變數，便於樣式層取用
const cssVars = computed(() => ({ // 綁定在根層 :style
'--bg': props.palette.bg, // 背景色
'--star': props.palette.star, // 星點顏色
'--accent': props.palette.accent, // 強調色 A（外環漸層尾端）
'--accent2': props.palette.accent2, // 強調色 B（外環漸層起點）
'--glass': props.palette.glass, // 玻璃擬態底色
'--glass-border': props.palette.glassBorder, // 玻璃擬態邊線
'--moon': props.palette.moon // 月面色
}))
</script>


<template>
    <Teleport to="body"><!-- 將覆蓋層直接掛到 <body>，避免被父層定位/裁切影響 -->
    <transition name="fade-scale"><!-- 進出淡入淡出＋微縮放的 CSS 過渡名稱 -->
    <div
    v-show="active"
    class="starry-loader"
    role="status" aria-live="polite"
    :style="cssVars"
    >
    <div class="bg"><!-- 背景容器：放三層星點視差 -->
    <div class="stars layer-1"></div><!-- 最遠層，速度最慢，稀疏 -->
    <div class="stars layer-2"></div><!-- 中層，中速，中等密度 -->
    <div class="stars layer-3"></div><!-- 近層，較快，較亮 -->
    </div>


    <div class="center"><!-- 中央內容容器：徽章與進度文案 -->
    <div class="badge" :class="{ pulsar: features.pulsar }" aria-hidden="true"><!-- 徽章圓盤；pulsar 開關決定是否顯示掃描光束 -->
    <div v-if="features.rings" class="orbits"><!-- 行星環（可開關） -->
    <div class="orbit" style="--spd:12s"><i class="planet"></i></div><!-- 第一層軌道＋行星 -->
    <div class="orbit" style="--spd:16s"><i class="planet small"></i></div><!-- 第二層軌道＋較小行星 -->
    <div class="orbit" style="--spd:22s"><i class="planet big"></i></div><!-- 第三層軌道＋較大行星 -->
    </div>
    <span class="badge__title">{{ logoText }}</span><!-- 徽章中央文字（可換站名/縮寫） -->


    <div v-if="features.moon" class="progress-ring" aria-hidden="true"><!-- 月相式環形進度（可開關） -->
    <svg viewBox="0 0 120 120"><!-- 固定視窗，方便用半徑計算 dashoffset -->
    <defs><!-- 定義漸層與遮罩 -->
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><!-- 進度外環的線性漸層顏色 -->
    <stop offset="0%" :stop-color="palette.accent2" /><!-- 起點色（較亮） -->
    <stop offset="100%" :stop-color="palette.accent" /><!-- 終點色（較冷） -->
    </linearGradient>
    <mask id="moonMask"><!-- 月相遮罩：以兩個圓交疊模擬盈虧 -->
    <rect x="0" y="0" width="120" height="120" fill="black"/><!-- 遮罩背景黑（完全遮） -->
    <g><!-- 白色區域會露出，黑色區域會被遮 -->
    <circle cx="60" cy="60" :r="moonR" fill="white"/><!-- 月面基底（白） -->
    <circle :cx="60 + terminatorX" cy="60" :r="moonR" fill="black"/><!-- 終止線（黑圓），隨進度水平移動 -->
    </g>
    </mask>
    </defs>
    <circle class="track" cx="60" cy="60" :r="ringR"/><!-- 外環底軌（灰） -->
    <circle class="fill" cx="60" cy="60" :r="ringR" :style="dashStyle"/><!-- 外環進度（使用 strokeDashoffset 控制） -->
    <g mask="url(#moonMask)"><!-- 將月面套上遮罩，顯示相位變化 -->
    <circle cx="60" cy="60" :r="moonR" class="moon-disc"/><!-- 月面填色 -->
    </g>
    </svg>
    </div>
    </div>


    <div class="panel"><!-- 進度文案面板（玻璃擬態） -->
    <div class="label">{{ labelText }}</div><!-- 根據 progress 顯示文字 -->
    </div>
    </div>
    </div>
    </transition>
    </Teleport>
</template>

<style scoped>
/* 版面與過渡 ----------------------------------------------------------------*/
.starry-loader{ position: fixed; inset:0; display:grid; place-items:center; z-index: 9999; background: var(--bg); }/* 全螢幕覆蓋層 */
.fade-scale-enter-active, .fade-scale-leave-active{ transition: opacity .45s cubic-bezier(.2,.8,.2,1), transform .45s cubic-bezier(.2,.8,.2,1); }/* 進出過渡 */
.fade-scale-enter-from, .fade-scale-leave-to{ opacity:0; transform: scale(.985); }/* 初末態 */


.bg{ position:absolute; inset:0; overflow:hidden; }/* 背景容器 */


/* 三層星點（radial-gradient 點陣 + 緩慢平移製造視差） -------------------------*/
.stars{ position:absolute; inset:0; background-repeat: repeat; filter: drop-shadow(0 0 1px rgba(255,255,255,.28)); opacity:.8 }/* 基礎設定 */
.layer-1{ background-image: radial-gradient(1px 1px at 20px 30px, var(--star) 100%, transparent 0), radial-gradient(1px 1px at 150px 80px, var(--star) 100%, transparent 0), radial-gradient(1px 1px at 90px 120px, var(--star) 100%, transparent 0), radial-gradient(1px 1px at 200px 40px, var(--star) 100%, transparent 0); animation: drift-1 70s linear infinite; opacity:.55 }/* 遠層稀疏 */
.layer-2{ background-image: radial-gradient(1.5px 1.5px at 60px 60px, var(--star) 100%, transparent 0), radial-gradient(1.5px 1.5px at 260px 110px, var(--star) 100%, transparent 0), radial-gradient(1.5px 1.5px at 420px 40px, var(--star) 100%, transparent 0), radial-gradient(1.5px 1.5px at 320px 180px, var(--star) 100%, transparent 0); animation: drift-2 95s linear infinite; opacity:.8 }/* 中層 */
.layer-3{ background-image: radial-gradient(2px 2px at 120px 20px, var(--star) 100%, transparent 0), radial-gradient(2px 2px at 360px 160px, var(--star) 100%, transparent 0), radial-gradient(2px 2px at 540px 100px, var(--star) 100%, transparent 0), radial-gradient(2px 2px at 680px 220px, var(--star) 100%, transparent 0); animation: drift-3 120s linear infinite; opacity:.95 }/* 近層亮 */
@keyframes drift-1{ to{ transform: translate3d(-420px,0,0) } }/* 遠層緩慢左移 */
@keyframes drift-2{ to{ transform: translate3d(-660px,0,0) } }/* 中層中速左移 */
@keyframes drift-3{ to{ transform: translate3d(-940px,0,0) } }/* 近層較快左移 */


.center{ position:relative; z-index:1; display:grid; place-items:center; gap: 18px; }/* 置中容器 */


/* 徽章圓盤與 Pulsar 掃描 -----------------------------------------------------*/
.badge{ position:relative; width:min(230px, 46vw); aspect-ratio:1/1; border-radius:50%; display:grid; place-items:center; color:#27d18a; background: radial-gradient(100% 100% at 50% 38%, rgba(255,255,255,.14), rgba(255,255,255,.04)); border: 1px solid var(--glass-border); box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 22px 60px rgba(0,0,0,.46); overflow:hidden; isolation:isolate; }/* 圓形徽章底 */
.badge__title{ font-weight:800; letter-spacing:.08em; text-transform:uppercase; font-size: clamp(18px, 3.2vw, 22px); opacity:.92; text-shadow: 0 0 12px rgba(255,255,255,.12) }/* 中央文字 */
.badge.pulsar::before{ content:""; position:absolute; inset:-25%; border-radius:50%; background: conic-gradient(from 0deg, var(--accent) 0deg, rgba(18, 17, 17, 0) 22deg); filter: blur(8px) saturate(115%); opacity:.22; animation: sweep 3.6s linear infinite; }/* 掃描光束（扇形） */
.badge.pulsar::after{ content:""; position:absolute; inset:8%; border-radius:50%; background: radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%); }/* 中央柔光暈 */
@keyframes sweep{ to{ transform: rotate(360deg) } }/* 連續旋轉 */


/* 行星環（虛線軌道＋行星珠） -------------------------------------------------*/
.orbits{ position:absolute; inset:-10%; border-radius:50%; pointer-events:none; }/* 外圍容器 */
.orbit{ position:absolute; inset:0; border-radius:50%; border: 2px solid var(--ring); animation: spin var(--spd,12s) linear infinite; box-shadow: 0 0 8px var(--accent), 0 0 16px var(--accent2); opacity: 0.8; }/* 軌道圓 */
@keyframes spin{ to{ transform: rotate(360deg) } }/* 公轉動畫 */
.planet{ position:absolute; top:50%; right:-3px; transform: translateY(-50%); width:28px; aspect-ratio:1/1; border-radius:50%; background: var(--accent); box-shadow: 0 0 8px var(--accent), 0 0 22px color-mix(in oklab, var(--accent) 60%, transparent); }/* 行星珠 */
.planet.small{ width:12px }/* 小顆 */
.planet.big{ width:18px }/* 大顆 */


/* 月相進度圈（外環與內圈） ---------------------------------------------------*/
.progress-ring{ position:absolute; inset:-8%; pointer-events:none; }/* 外層尺寸稍大於徽章 */
.progress-ring svg{ width:100%; height:100%; display:block; }/* SVG 自適應 */
.track{ stroke: rgba(255,255,255,.12); stroke-width: 3; fill: none; }/* 灰色底環 */
.fill{ stroke: url(#grad); stroke-width: 4; fill: none; stroke-linecap: round; transform: rotate(-90deg); transform-origin: 50% 50%; }/* 漸層進度，旋轉讓 0% 從上方開始 */
.moon-disc{ fill: var(--moon); opacity:.9 }/* 月面顏色 */


/* 進度文案面板 ---------------------------------------------------------------*/
.panel{ background: var(--glass); border:1px solid var(--glass-border); border-radius: 12px; padding: 10px 12px; box-shadow: 0 10px 30px rgba(0,0,0,.3); min-width: 220px; text-align:center; }/* 玻璃擬態卡片 */
.label{ font-size: 12px; letter-spacing:.02em; color:#b6c2d1; }/* 文字樣式 */


/* 無障礙：減少動態 -----------------------------------------------------------*/
@media (prefers-reduced-motion: reduce){ .badge.pulsar::before, .orbit{ animation: none !important; } }/* 使用者偏好減動時關閉旋轉 */
</style>