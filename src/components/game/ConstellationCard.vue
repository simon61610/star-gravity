<script setup>

</script>

<template>
 <main class="scene" aria-label="星空互動場景">
    <!-- 抽屜卡片：目前純排版靜態，沒有 v-model 行為 -->
    <aside class="card" aria-live="polite">
      <header class="card__hd">
        <div class="card__thumb">
          <!-- 換成你的縮圖 -->
          <img src="/src/assets/images/games/GameSkyPage/gmasky_card-aries.svg" alt="星座圖示" />
        </div>
        <div class="card__title">
          <div class="card_icon">
             <img src="/src/assets/images/games/GameSkyPage/gamesky_virgo-icon.svg" alt="星座圖示" />
          </div>
          <div class="card__name">
            牡羊座 Aries
          </div>
        </div>
      </header>

      <nav class="tabs" aria-label="卡片分頁（靜態）">
        <button class="tabs__btn tabs__btn--on" type="button">星座介紹</button>
        <button class="tabs__btn" type="button">星點位置</button>
        <button class="tabs__btn" type="button">神話故事</button>
      </nav>

      <section class="card__body">
        <p class="card__text">
          很久很久以前的遙遠國度，國王和皇后離婚了。國王很快娶了一名為新皇后，新皇后嫉妒國王疼愛前妻生的一對兄妹，於是想出了一條惡計想殺死這對孩子。。
        </p>
      </section>
    </aside>

    <!-- 畫布區：目前只放背景圖與幾顆假星點，沒有互動 -->
    <div class="canvas">
      <div class="sky">
        <!-- 星座輪廓示意（靜態顯示） -->
        <img class="figure" src="/src/assets/images/games/GameSkyPage/gamesky_aries.svg" alt="牡羊座輪廓" />
      </div>
    </div>

  </main>
</template>

<style>
/* 版面 */
.scene {
  border: 2px solid red;
  position: relative;
  width: 100%;
  min-height: 720px;
  overflow: hidden;
  background: #081429;
}
.bg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
}
.hill {
  position: absolute; left: 0; right: 0; bottom: 0;
  width: 100%;
  object-fit: cover;
  z-index: 1;
}

/* 左側卡片 */
.card {
  border: 2px solid red;
  position: absolute; left: 50px; top: 50px;
  width: 280px;
  height: 500px;
  background: rgba(15,22,46,.7);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 16px;
  backdrop-filter: blur(6px);
  color: #fff;
  z-index: 3;
  padding: 16px;
    
}

.card__hd{ 
  margin-bottom:8px;
  padding: 10px 40px;
  margin: auto;
}
.card__thumb{ 
  width:200px;
  height:200px;
  border-radius:12px;
}

.card__glyph{ 
  font-size:20px; 
  opacity:.8;
}

.card__name{ 
  margin:0 auto; 
  font-size:32px; 
}

.tabs{ display:flex;
  gap:8px;
  margin:8px 0 12px; 
}

.tabs__btn{
  flex:1; padding:6px 8px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06);
  color:#fff; font-size:12px;
}


.tabs__btn--on{
  background:#7a6cff;
  border-color:#7a6cff; 
}

.card__body{ 
  font-size:13px; 
  line-height:1.6;
  color:#dbe4ff; 
}

.card__title{
display: flex;
align-items:center
}

/* 右側舞台（寬高固定，便於放 PNG） */
.stage{
  border: 2px solid rgb(150, 181, 74);
  position:absolute; left: 320px; right: 24px; top: 72px; bottom: 48px;
  z-index: 2;
  width: min(1200px, 100%);
  height: 600px;
  margin-left: auto;
  margin-right: 0;
}

.figure{
  position:absolute; inset:0;
  width: 100%; height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(79,177,255,.35));
}

/* 星點（PNG，先手動定位） */
.star{
  position:absolute; width: 12px; height: 12px;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 6px rgba(255,255,255,.8));
}

/* 控制鈕（純樣式） */
.ctrls{
  position:absolute; right: 24px; top: 24px; z-index:4;
  display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end;
}
.ctrls__btn{
  display:inline-flex; align-items:center; gap:6px;
  padding:8px 12px; font-size:13px; color:#fff;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 999px;
  backdrop-filter: blur(4px);
}
.ctrls__btn img{ width:16px; height:16px; object-fit:contain; }
.ctrls__btn--ghost{ background:transparent; }

/* RWD */
@media (max-width: 750px) {
  .card{ left: 12px; right: 12px; width:auto; top: 12px; }
  .stage{ left: 12px; right: 12px; top: 220px; height: 420px; }
  .ctrls{ right: 12px; top: 12px; }
  .star{ width: 10px; height: 10px; }
}
</style>
