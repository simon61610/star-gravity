<!-- src/views/game/GameWishResultPage.vue -->
<template>
  <main class="result" :style="{'--bg': `url(${bg})`}">
    <h1 class="msg">你的願望宇宙已經接收到了</h1>

    <!-- 衛星與（可選）隕石 PNG -->
    <img :src="satellite" alt="" class="sat" />
    <img v-if="meteor" :src="meteor" alt="" class="meteor" />

    <router-link class="btn" to="/gamewish">回到許願</router-link>
  </main>
</template>

<script setup>
// 背景 & 演出 PNG（改成你的路徑/檔名）
import bg        from '@/assets/wish/result-bg.png'
import satellite from '@/assets/wish/satellite.png'
// 若沒有隕石就刪掉這行與上面 <img v-if="meteor"...>
import meteor    from '@/assets/wish/meteor.png'
</script>

<style scoped lang="scss">
.result{
  min-height:100vh; position:relative; overflow:hidden;
  display:grid; place-items:center; text-align:center; color:#fff;
  background: var(--bg) center/cover no-repeat;
}
.msg{
  letter-spacing:.15em;
  animation: fadeIn .7s ease-out both .15s;
}
.sat{
  position:absolute; right:12vw; top:28vh;
  width:min(24vw,220px);
  animation: float 3.2s ease-in-out infinite;
}
.meteor{
  position:absolute; left:8vw; top:46vh;
  width:min(20vw,180px); opacity:.9;
  animation: drift 5s linear infinite;
}
.btn{
  position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
  padding:10px 16px; border-radius:999px; color:#fff; text-decoration:none;
  background:linear-gradient(180deg,#9b8afc,#5e40e6);
  box-shadow:0 10px 24px rgba(90,70,200,.45);
}

@keyframes fadeIn { from{opacity:0; transform:translateY(6px)} to{opacity:1; transform:none} }
@keyframes float  { 0%,100%{ transform: translateY(-6px) rotate(-3deg)} 50%{ transform: translateY(6px) rotate(3deg)} }
@keyframes drift  { 0%{ transform: translateX(0) rotate(-8deg)} 100%{ transform: translateX(100vw) rotate(8deg)} }

@media (prefers-reduced-motion: reduce){
  .msg,.sat,.meteor{ animation:none }
}
</style>
