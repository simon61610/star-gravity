<template>
  <div class="game">
    <div class="game-type">
      <h1>請選擇遊戲種類</h1>
      <div class="cards">
        <div class="card">
              <router-link to="/gamecard"><img src="/src/assets/images/games/GameHomePage/gamecenter-door1.png" alt="星占卜"></router-link>
          </div>
          <div class="card">
             <img src="/src/assets/images/games/GameHomePage/gamecenter-door2.png" alt="許願牆">
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
    height: calc(100vh - 50px);
    background-image: url(/src/assets/images/games/GameHomePage/gamecenter_bg.png);
    }

    h1 {
      padding: 80px;
      letter-spacing:5px;
      font-size: 24px;
      color:$FontColor-white;
      text-align: center;
    
    }

    .cards {
      align-items: center;
      display: flex;
      justify-content: center;
      gap: 80px;
      
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
      transition: transform 0.2s, 0.2s;
    }

    .card:hover {
      transform: translateY(-10px);
    }

    .card img {
      margin-bottom: 40px;
    }

    .card span {
      font-size: 20px;
      font-weight: bold;}
</style>