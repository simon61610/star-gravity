<template>
  <main class="scene" :style="{ backgroundImage: bg ? `url(${bg})` : '' }">
    <!-- 2) 窗戶 -->
    <img v-if="win" :src="win" alt="" class="layer window" />
    <div v-else class="layer window window--stub"></div>

    <!-- 3) 人物 - 左右各一個 -->
    <img v-if="peopleLeft" :src="peopleLeft" alt="" class="layer people people--left" />
    <img v-if="peopleRight" :src="peopleRight" alt="" class="layer people people--right" />

    <!-- 4) 流星 -->
    <div class="comet">
      <img v-if="star" :src="star" alt="" class="comet__star" />
      <div v-else class="comet__star--css"></div>
    </div>

    <!-- 5) make a wish -->
    <img v-if="title" :src="title" alt="make a wish" class="layer title" />
    <div v-else class="layer title title--stub">make a wish</div>

    <!-- 6) 下一頁箭頭 -->
    <button class="next" @click="goNext" aria-label="前往下一段動畫">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5l8 7-8 7" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="next__txt">下一頁</span>
    </button>
  </main>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

// 🎨 直接 import 圖片（背景 PNG 已含漸層）
import bg     from '@/assets/images/games/GameWishTransitPage/WishPageTransition-bg.svg'
import win    from '@/assets/images/games/GameWishTransitPage/WishPageTransition-texture04.svg'
import peopleLeft from '@/assets/images/games/GameWishTransitPage/WishPageTransition-texture01.svg'
import peopleRight from '@/assets/images/games/GameWishTransitPage/WishPageTransition-texture02.svg'
import star   from '@/assets/images/games/GameWishTransitPage/WishPageResult-star01.svg'
import tail   from '@/assets/images/games/GameWishTransitPage/WishPageResult-star02.svg'
import title  from '@/assets/images/games/GameWishTransitPage/WishPageTransition-texture05.svg'

const router = useRouter()
const route  = useRoute()

const nextRouteName = 'gamewishResult'
function goNext () {
  router.push({ name: nextRouteName, query: route.query })
}
</script>

<style scoped>
.scene{
  --dur-fade: .6s;
  --dur-star: 1.4s;

  --t-window: .10s;
  --t-people: .70s;
  --t-star:   1.10s;
  --t-title:  2.00s;

  --star-start-left: 68vw;
  --star-start-top:  22vh;
  --star-end-left:   32vw;
  --star-end-top:    40vh;
  --star-rotate:     -14deg;
  --star-dir:        -1;

  min-height:100vh; position:relative; overflow:hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #000;
  color:#fff;
}

/* 2) 窗戶 */
.layer.window{
  position:absolute; 
  left:50%; top:20vh; 
  transform:translateX(-50%);
  width:min(52vw, 720px); height:auto;
  opacity:0; animation: fadeIn var(--dur-fade) ease-out var(--t-window) forwards;
}
.window--stub{
  width:min(52vw, 720px); height:min(34vw, 470px);
  border:6px solid rgba(255,255,255,.5); border-radius:6px;
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
}

/* 左右人物 */
.layer.people {
  position:absolute; bottom:7vh; width:min(8vw, 360px); height:auto;
  opacity:0; animation: fadeUp var(--dur-fade) ease-out var(--t-people) forwards;
}
.people--left  { left:35vw; transform:translateX(-50%); }
.people--right { left:55vw; transform:translateX(-50%); }

/* 4) 流星群組 */
.comet{
  position:absolute;
  left: var(--star-start-left);
  top:  var(--star-start-top);
  width: 260px; height: 72px;
  transform: rotate(var(--star-rotate)) scaleX(var(--star-dir));
  transform-origin: left center;
  opacity:0;
  animation: cometMove var(--dur-star) ease-out var(--t-star) forwards;
  pointer-events:none;
}
.comet__tail{ position:absolute; left:0; top:28px; width:220px; height:auto; opacity:.95; filter: blur(.4px); }
.comet__tail--css{
  position:absolute; left:0; top:34px; width:220px; height:8px; border-radius:8px;
  background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.9), rgba(255,255,255,0));
  filter: blur(4px);
}
.comet__star{ position:absolute; left:200px; top:16px; width:56px; height:auto;
  filter: drop-shadow(0 0 10px rgba(255,255,200,.95)); }
.comet__star--css{
  position:absolute; left:200px; top:16px; width:18px; height:18px; border-radius:50%;
  background:#ffd44d; box-shadow:0 0 12px #fff, 0 0 24px #ffd44d;
}

/* 5) make a wish */
.layer.title{
  position:absolute; left:50%; top:8vh; transform:translateX(-50%);
  width:min(26vw, 340px); height:auto;
  opacity:0; animation: fadeIn var(--dur-fade) ease-out var(--t-title) forwards;
}
.title--stub{ font: 700 28px/1.2 "Segoe UI", system-ui; letter-spacing:.12em }

/* 6) 下一頁箭頭：發光 + 光圈擴散 */
.next{
  position:absolute; right:24px; bottom:24px;
  display:flex; align-items:center; gap:8px;
  padding:10px 14px; border-radius:999px; border:1px solid rgba(255,255,255,.35);
  background: rgba(0,0,0,.2); color:#fff; cursor:pointer;

  --ripple-size: 140px;
  --ripple-color: rgba(255,235,180,.35);

  box-shadow:
    0 0 10px rgba(255,255,255,.35),
    0 0 20px rgba(255,220,120,.25),
    inset 0 0 8px rgba(255,255,255,.12);
  text-shadow: 0 0 6px rgba(255,255,255,.5);

  opacity:0;
  animation:
    fadeIn var(--dur-fade) ease-out calc(var(--t-title) + .3s) forwards,
    breathe 2.4s ease-in-out infinite 1.6s,
    glowPulse 2.4s ease-in-out infinite 1.6s;
}

.next::before{
  content:"";
  position:absolute; inset:-18px;
  border-radius: inherit;
  pointer-events:none;
  background: radial-gradient(ellipse at center,
              rgba(255,230,150,.35) 0%,
              rgba(255,230,150,.18) 35%,
              rgba(255,230,150,0) 70%);
  filter: blur(8px);
  opacity:0;
  animation: halo 2.4s ease-in-out infinite 1.6s;
}

/* Hover 光圈 */
.next::after{
  content:"";
  position:absolute;
  left:50%; top:50%;
  width: var(--ripple-size);
  height: var(--ripple-size);
  transform: translate(-50%,-50%) scale(.6);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle,
    rgba(255,255,255,.55) 0%,
    var(--ripple-color) 35%,
    rgba(255,255,255,0) 60%);
  filter: blur(2px);
}
.next:hover::after,
.next:focus-visible::after{
  animation: rippleOut 900ms ease-out;
}
.next:active::after{
  animation: rippleTap 500ms ease-out;
}

.next:hover,
.next:focus-visible{
  border-color: rgba(255,255,255,.6);
  box-shadow:
    0 0 12px rgba(255,255,255,.55),
    0 0 26px rgba(255,230,160,.45),
    inset 0 0 10px rgba(255,255,255,.18);
  transform: translateZ(0) scale(1.04);
}
.next:focus-visible{
  outline: 2px solid rgba(255,240,200,.6);
  outline-offset: 2px;
}

.next svg{ width:22px; height:22px }
.next__txt{ font-size:14px; letter-spacing:.1em }

/* 動畫 keyframes */
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes fadeUp  { from{opacity:0; transform:translateX(-50%) translateY(10px)} to{opacity:1; transform:translateX(-50%) translateY(0)} }
@keyframes cometMove{
  0%   { left: var(--star-start-left); top: var(--star-start-top); opacity:0 }
  50%  { opacity:1 }
  100% { left: var(--star-end-left); top: var(--star-end-top); opacity:0 }
}
@keyframes breathe { 0%,100%{transform:translateZ(0) scale(1)} 50%{transform:translateZ(0) scale(1.05)} }
@keyframes glowPulse{
  0%,100%{
    box-shadow:
      0 0 10px rgba(255,255,255,.35),
      0 0 20px rgba(255,220,120,.25),
      inset 0 0 8px rgba(255,255,255,.12);
  }
  50%{
    box-shadow:
      0 0 16px rgba(255,255,255,.55),
      0 0 36px rgba(255,230,160,.45),
      inset 0 0 12px rgba(255,255,255,.18);
  }
}
@keyframes halo{
  0%,100%{ opacity:.18; transform: scale(1) }
  50%    { opacity:.42; transform: scale(1.06) }
}
@keyframes rippleOut{
  0%   { opacity:.60; transform: translate(-50%,-50%) scale(.6) }
  70%  { opacity:.16 }
  100% { opacity:0;   transform: translate(-50%,-50%) scale(1.6) }
}
@keyframes rippleTap{
  0%   { opacity:.75; transform: translate(-50%,-50%) scale(.55) }
  60%  { opacity:.18 }
  100% { opacity:0;   transform: translate(-50%,-50%) scale(1.45) }
}

@media (hover: none), (pointer: coarse){
  .next:hover::after{ animation: none }
}
@media (prefers-reduced-motion: reduce){
  .layer.window,.layer.people,.comet,.layer.title,.next{ animation:none !important; opacity:1 !important }
  .next::before{ animation:none !important; opacity:.24 }
  .next::after{ animation:none !important; opacity:.18; transform: translate(-50%,-50%) scale(1.1) }
}
</style>
