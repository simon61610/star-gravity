<template>
  <div class="game">
    <div class="game-type">
      <h1>請選擇遊戲種類</h1>
      <div class="cards">
        <div class="card">
              <router-link to="/gamecard"><img src="/src/assets/images/games/GameHomePage/gamecenter-door1.png" alt="星占卜"></router-link>
          </div>
          <div class="card">
              <router-link to="/gamewish"><img src="/src/assets/images/games/GameHomePage/gamecenter-door2.png" alt="許願牆"></router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

 .game {
  width: 100%;
  min-height: calc(100vh - 50px);
  background-image: url(/src/assets/images/games/GameHomePage/gamecenter_bg.png);
  background-repeat: no-repeat;
  background-size: cover;

@media (max-width: 750px) {
  /* 手機版：內容可能更高，直接讓高度自動、只保留最小高度 */
  .game {

    min-height: auto;      /* 由內容決定高度 */
    padding: 40px 16px 24px;  /* 給點內距，避免貼邊 */
    background-size: cover;
  }
}}

h1 {
  padding: 80px;
  letter-spacing: 5px;
  font-size: 24px;
  color: $FontColor-white;
  text-align: center;
 
}
.cards {
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 80px;
}

 @media (max-width: 750px) {
  .cards { flex-direction: column; gap: 40px; }
}

.card {
  width: 317px;
  height: 404px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

@media (max-width: 750px) {
  .card {
    width: min(420px, 90%); 
    height: auto;
  }}

.card:hover {
  transform: translateY(-10px);
}

.card img {
  margin-bottom: 40px;

  @media (max-width: 750px) {
    .card img {
    width: 80%;     /* 圖片隨容器縮放 */
    height: auto;
    margin-bottom: 20px;
  }
  }
}

.card span {
  font-size: 20px;
  font-weight: bold;
}

/* === RWD 手機版 (750px 以下) === */
@media (max-width: 750px) {
  h1 {
    padding: 40px 20px;
    font-size: 20px;
  }

  .cards {
    flex-direction: column;  /* 改為上下排 */
    gap: 40px;               /* 間距縮小 */
    
  }


}
</style>