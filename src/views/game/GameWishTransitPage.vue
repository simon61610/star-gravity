<template>
  <main class="scene" :style="{ backgroundImage: bg ? `url(${bg})` : '' }">
    <!-- 2) 窗戶 -->
    <img v-if="win" :src="win" alt="" class="layer window" />
    <div v-else class="layer window window--stub"></div>

    <!-- 3) 人物 -->
    <img v-if="people" :src="people" alt="" class="layer people" />
    <div v-else class="layer people people--stub"></div>

    <!-- 4) 流星 -->
    <div class="comet">
      <img v-if="tail" :src="tail" alt="" class="comet__tail" />
      <div v-else class="comet__tail--css"></div>

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
import people from '@/assets/images/games/GameWishTransitPage/WishPageTransition-texture02.svg'
import star   from '@/assets/images/games/GameSkyPage/gamesky_bg.svg'
import tail   from '@/assets/images/games/GameSkyPage/gamesky_bg.svg'
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
  --t-star:   1.35s;
  --t-title:  2.20s;

  --star-start-left: 30vw;
  --star-start-top:  52vh;
  --star-end-left:   58vw;
  --star-end-top:    34vh;
  --star-rotate: -10deg;

  min-height:100vh; position:relative; overflow:hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #000; /* 安全底色，圖載入前顯示 */
  color:#fff;
}

/* 2) 窗戶 */
.layer.window{
  position:absolute; left:50%; top:20vh; transform:translateX(-50%);
  width:min(52vw, 720px); height:auto;
  opacity:0; animation: fadeIn var(--dur-fade) ease-out var(--t-window) forwards;
}
.window--stub{
  width:min(52vw, 720px); height:min(34vw, 470px);
  border:6px solid rgba(255,255,255,.5); border-radius:6px;
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
}

/* 3) 人物 */
.layer.people{
  position:absolute; left:55vw; bottom:7vh; transform:translateX(-50%);
  width:min(26vw, 360px); height:auto;
  opacity:0; animation: fadeUp var(--dur-fade) ease-out var(--t-people) forwards;
}
.people--stub{
  width:min(26vw, 360px); height:min(32vw, 420px);
  background: linear-gradient(180deg, rgba(255,255,255,.28), rgba(255,255,255,.08));
  border-radius: 10px;
}

/* 4) 流星群組 */
.comet{
  position:absolute;
  left: var(--star-start-left);
  top:  var(--star-start-top);
  width: 260px; height: 72px;
  transform: rotate(var(--star-rotate));
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

/* 6) 下一頁箭頭 */
.next{
  position:absolute; right:24px; bottom:24px;
  display:flex; align-items:center; gap:8px;
  padding:10px 14px; border-radius:999px; border:1px solid rgba(255,255,255,.35);
  background: rgba(0,0,0,.2); color:#fff; cursor:pointer;
  opacity:0; animation: fadeIn var(--dur-fade) ease-out calc(var(--t-title) + .3s) forwards, breathe 2.4s ease-in-out infinite 1.6s;
}
.next svg{ width:22px; height:22px }
.next__txt{ font-size:14px; letter-spacing:.1em }

/* 關鍵影格 */
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes fadeUp  { from{opacity:0; transform:translateX(-50%) translateY(10px)} to{opacity:1; transform:translateX(-50%) translateY(0)} }
@keyframes cometMove{
  0%   { left: var(--star-start-left); top: var(--star-start-top); opacity:0 }
  12%  { opacity:1 }
  100% { left: var(--star-end-left, 58vw); top: var(--star-end-top, 34vh); opacity:0 }
}
@keyframes breathe { 0%,100%{transform:translateZ(0) scale(1)} 50%{transform:translateZ(0) scale(1.05)} }

@media (prefers-reduced-motion: reduce){
  .layer.window,.layer.people,.comet,.layer.title,.next{ animation:none !important; opacity:1 !important }
}
</style>
