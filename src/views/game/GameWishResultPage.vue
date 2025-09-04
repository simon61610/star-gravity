<template>
  <main class="wish-scene">
    <!-- 背景：夜空 + 星點 icon 形狀 -->
    <div class="sky">
      <!-- 三個星點 icon（只是背景裝飾，不可點） -->
      <svg class="icon-stars icon-chat" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <!-- 氣泡外框 -->
        <path class="dot-stroke" filter="url(#glow)"
              d="M45 70a55 40 0 0 1 110 0a55 40 0 0 1-77 36l-22 13 6-23a55 40 0 0 1-17-26z"/>
        <!-- 三個點 -->
        <circle class="star" cx="90" cy="75" r="1.7"/>
        <circle class="star" cx="110" cy="75" r="1.7"/>
        <circle class="star" cx="130" cy="75" r="1.7"/>
      </svg>

      <svg class="icon-stars icon-fb" viewBox="0 0 200 200" aria-hidden="true">
        <path class="dot-stroke"
              d="M100 15a85 85 0 1 1 0 170a85 85 0 1 1 0-170z
                 M110 60h18V40h-18c-16 0-28 13-28 29v13H67v20h15v38h22v-38h18l3-20h-21v-11c0-6 5-11 11-11z"/>
      </svg>

      <svg class="icon-stars icon-ig" viewBox="0 0 200 200" aria-hidden="true">
        <!-- 外框 + 內圓 + 小角落點 -->
        <path class="dot-stroke"
              d="M60 35h80a25 25 0 0 1 25 25v80a25 25 0 0 1-25 25H60a25 25 0 0 1-25-25V60a25 25 0 0 1 25-25z
                 M100 70a30 30 0 1 1 0 60a30 30 0 1 1 0-60z"/>
        <circle class="star" cx="135" cy="65" r="2"/>
      </svg>
    </div>

    <!-- 中央卡片 -->
    <section class="panel" :class="{ 'panel--show': showResult }">
      <!-- 星點環動畫 -->
      <svg class="ring" viewBox="0 0 320 320" role="img" aria-label="星點環動畫">
        <circle class="ring__dots" cx="160" cy="160" r="120"/>
      </svg>

      <div class="panel__content">
        <h1 class="title">願望</h1>
        <p class="desc">
          It is a long established fact that a reader will be distracted by the readable
          content of a page when looking at its layout. It is a long established fact
          that a reader will be…
        </p>

        <div class="share">
          <button type="button" class="share__btn" aria-label="Share to Chat">💬</button>
          <button type="button" class="share__btn" aria-label="Share to Facebook">f</button>
          <button type="button" class="share__btn" aria-label="Share to Instagram">▢</button>
        </div>

        <button class="back" @click="$router.back()">返回</button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/**
 * 預設流程：
 * 1) 進到這頁時，先播放星點環動畫（1.6s）
 * 2) 動畫結束後，淡入內容（title/desc/按鈕）
 * 若你是從上一頁「送出」後導路由，建議帶 query 進來顯示願望文字
 */
const showResult = ref(false)

onMounted(() => {
  // 等待環形動畫跑完再顯示內容
  const total = 1600 // ms，對應 CSS 動畫長度
  setTimeout(() => (showResult.value = true), total)
})
</script>

<style scoped lang="scss">
/* ===== 色彩與尺寸 token ===== */
$bg-from: #0c1b3f;
$bg-to:   #0a1633;
$text:    #dbe8ff;
$muted:   rgba(219,232,255,0.7);
$line:    rgba(219,232,255,0.2);
$accent:  #a6c1ff;

.wish-scene{
  position: relative;
  min-height: calc(100vh - 0px);
  display: grid;
  place-items: center;
  background: radial-gradient(1200px 600px at 70% 10%, #0f2558 0%, transparent 60%),
              radial-gradient(1200px 700px at 10% 30%, #0d204d 0%, transparent 60%),
              linear-gradient(180deg, $bg-from, $bg-to);
  overflow: hidden;
}

/* ===== 背景夜空 ===== */
.sky {
  position: absolute; inset: 0;
  pointer-events: none;
}

/* 隨機小星星（用 pseudo elements 做點點） */
.sky::before,
.sky::after{
  content:"";
  position:absolute; inset:0;
  background:
    radial-gradient(2px 2px at 10% 20%, #fff, transparent 60%),
    radial-gradient(1.5px 1.5px at 30% 40%, #fff, transparent 60%),
    radial-gradient(1.8px 1.8px at 70% 25%, #fff, transparent 60%),
    radial-gradient(1.5px 1.5px at 85% 55%, #fff, transparent 60%),
    radial-gradient(1.8px 1.8px at 20% 70%, #fff, transparent 60%),
    radial-gradient(1.2px 1.2px at 55% 80%, #fff, transparent 60%),
    radial-gradient(1.2px 1.2px at 40% 15%, #fff, transparent 60%);
  opacity:.35;
}
.sky::after{ filter: blur(.3px); opacity:.25 }

/* ===== 背景的「星點 icon 形狀」 ===== */
.icon-stars{
  position:absolute; width: 240px; height: 240px; opacity:.35;
}
.icon-chat{  left: 6vw;  top: 22vh; transform: rotate(-6deg); }
.icon-fb{    right: 8vw; top: 16vh; transform: rotate(8deg);  }
.icon-ig{    right: 12vw; bottom: 12vh; transform: rotate(-10deg); }

.dot-stroke{
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  /* 用虛線做成「一顆顆星點」 */
  stroke-dasharray: 0.1 8;
  opacity: .8;
  animation: twinkle 2.6s infinite steps(2, end);
  filter: drop-shadow(0 0 4px rgba(166,193,255,.55));
}
.star{
  fill:#fff;
  filter: drop-shadow(0 0 3px rgba(166,193,255,.9));
  animation: blink 2.2s infinite ease-in-out;
}

/* ===== 中央結果卡片 ===== */
.panel{
  position: relative;
  width: min(84vw, 680px);
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  display: grid;
  place-items: center;
  padding: clamp(20px, 4vw, 36px);
  color: $text;

  /* 先讓內容隱形，等動畫跑完再顯示 */
  .panel__content{
    opacity: 0; transform: translateY(6px) scale(.98);
    transition: opacity .5s ease, transform .5s ease;
  }
}
.panel--show .panel__content{
  opacity: 1; transform: translateY(0) scale(1);
}

.title{
  margin: 0 0 10px; font-size: clamp(28px, 4vw, 36px); letter-spacing: .1em;
  text-align:center;
}
.desc{
  color: $muted; line-height: 1.7; text-align: left;
  max-width: 460px; margin: 0 auto 18px;
}

/* ===== 星點環動畫 ===== */
.ring{
  position:absolute; inset:0; pointer-events:none;
  .ring__dots{
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 0.0001 9; /* 密度：越小越密 */
    opacity: .9;
    filter: drop-shadow(0 0 6px rgba(166,193,255,.6));
    transform-origin: 50% 50%;
    animation:
      ring-pop .9s cubic-bezier(.2,.9,.2,1) forwards,
      ring-spin 6s linear infinite 1.2s,
      twinkle 2.4s infinite steps(2, end);
  }
}

/* 內容下方的分享按鈕（可先用字元代替 icon） */
.share{
  display:flex; gap: 12px; justify-content:center; margin: 10px 0 18px;
}
.share__btn{
  width: 42px; height: 42px; border:1px solid $line; border-radius: 50%;
  display:grid; place-items:center; color:$text; background:transparent;
  backdrop-filter: blur(2px);
  transition: transform .2s ease, border-color .2s;
}
.share__btn:hover{ transform: translateY(-2px); border-color: $accent; }

.back{
  width: 200px; height: 40px; border-radius: 999px;
  border: 1px solid $line; color:$text; background: transparent;
  letter-spacing: .2em;
  transition: border-color .2s, box-shadow .2s, transform .2s;
}
.back:hover{
  border-color: $accent;
  box-shadow: 0 0 0 3px rgba(166,193,255,.12);
  transform: translateY(-1px);
}

/* ===== 動畫 keyframes ===== */
@keyframes ring-pop{
  0%   { transform: scale(.6); opacity:0; stroke-dasharray: 0.0001 120; }
  60%  { transform: scale(1.02); opacity:1;  }
  100% { transform: scale(1);    opacity:1;  stroke-dasharray: 0.0001 9; }
}
@keyframes ring-spin{ to { transform: rotate(360deg); } }
@keyframes twinkle{
  0%, 100% { opacity: .8; }
  50%      { opacity: .4; }
}
@keyframes blink{
  0%, 100% { opacity: .9; }
  50%      { opacity: .5; }
}

/* ===== RWD ===== */
@media (max-width: 750px){
  .icon-stars{ width: 180px; height: 180px; opacity:.28 }
  .icon-chat{ left: -10px; top: 14vh; }
  .icon-fb{ right: -6px; top: 6vh; }
  .icon-ig{ right: 2vw; bottom: 8vh; }
  .panel{ width: min(92vw, 640px); }
  .desc{ text-align: center }
}
</style>
