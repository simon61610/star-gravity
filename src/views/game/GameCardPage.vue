<template>
     <main class="scene" aria-label="抽牌場景">
           <!-- 背景 PNG -->
        <button class="cta" type="button">
            請依直覺抽出三張牌
        </button>
<div class="cards" id="cards">
      <!-- 將 card-front-N.png 改成你的正面圖；card-back.png 為背面共用圖 -->
      <button class="card" type="button" aria-pressed="false" data-id="1">
        <div class="card-inner">
          <img class="card-face card-front" src="" alt="卡片正面 1">
          <img class="card-face card-back"  src="" alt="卡片背面">
        </div>
      </button>

      <button class="card" type="button" aria-pressed="false" data-id="2">
        <div class="card-inner">
          <img class="card-face card-front" src="" alt="卡片正面 2">
          <img class="card-face card-back"  src="" alt="卡片背面">
        </div>
      </button>

      <button class="card" type="button" aria-pressed="false" data-id="3">
        <div class="card-inner">
          <img class="card-face card-front" src="" alt="卡片正面 3">
          <img class="card-face card-back"  src="" alt="卡片背面">
        </div>
      </button>

      <!-- 其餘 9 張（示範重複），換成你的 front-4~front-12.png -->
      <!-- 你也可以只放背面，等抽中再換 src 成正面 -->
      <button class="card" type="button" aria-pressed="false" data-id="4"><div class="card-inner"><img class="card-face card-front" src="" alt="卡片正面 4"><img class="card-face card-back" src="" alt="卡片背面"></div></button>
      <button class="card" type="button" aria-pressed="false" data-id="5"><div class="card-inner"><img class="card-face card-front" src="" alt="卡片正面 5"><img class="card-face card-back" src="" alt="卡片背面"></div></button>
      <button class="card" type="button" aria-pressed="false" data-id="6"><div class="card-inner"><img class="card-face card-front" src="" alt="卡片正面 6"><img class="card-face card-back" src="" alt="卡片背面"></div></button>
      <button class="card" type="button" aria-pressed="false" data-id="7"><div class="card-inner"><img class="card-face card-front" src="" alt="卡片正面 7"><img class="card-face card-back" src="" alt="卡片背面"></div></button>
      <button class="card" type="button" aria-pressed="false" data-id="8"><div class="card-inner"><img class="card-face card-front" src="" alt="卡片正面 8"><img class="card-face card-back" src="" alt="卡片背面"></div></button>
      <button class="card" type="button" aria-pressed="false" data-id="9"><div class="card-inner"><img class="card-face card-front" src="" alt="卡片正面 9"><img class="card-face card-back" src="" alt="卡片背面"></div></button>
      <button class="card" type="button" aria-pressed="false" data-id="10"><div class="card-inner"><img class="card-face card-front" src="" alt="卡片正面 10"><img class="card-face card-back" src="" alt="卡片背面"></div></button>
      <button class="card" type="button" aria-pressed="false" data-id="11"><div class="card-inner"><img class="card-face card-front" src="" alt="卡片正面 11"><img class="card-face card-back" src="" alt="卡片背面"></div></button>
      <button class="card" type="button" aria-pressed="false" data-id="12"><div class="card-inner"><img class="card-face card-front" src="" alt="卡片正面 12"><img class="card-face card-back" src="" alt="卡片背面"></div></button>
    </div>
  </main>
</template>

<script>
</script>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';
.scene{
    background-image: url(/src/assets/images/games/GameCardPage/gameCard_bg.png);
    width: 100%;
    height: calc(100vh - 50px);
}
h1 {
      padding: 80px;
      letter-spacing:5px;
      border: 2px solid red;
      font-size: 24px;
      color:$FontColor-white;
      text-align: center;
    
    }

</style>