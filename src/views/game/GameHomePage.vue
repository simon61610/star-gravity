<template>
  <div class="game">
    <div class="game-type">
      <h1>請選擇遊戲種類</h1>
      <div class="cards">
        <div class="card">
              <img src="" alt="星占卜">
              <span>星占卜</span>
          </div>
          <div class="card">
             <img src="" alt="許願牆">
              <span>許願牆</span>
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
    background: linear-gradient( #2e2e5c);
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

    .cards {
      border: 2px solid red;
      align-items: center;
      display: flex;
      justify-content: center;
      gap: 80px;
      
    }

    .card {
      border: 2px solid red;
      background: rgba(0, 0, 50, 0.8);
      border-radius: 20px;
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
      background: rgba(0, 0, 70, 0.9);
    }

    .card img {
      width: 60px;
      height: 60px;
      margin-bottom: 40px;
    }

    .card span {
      font-size: 20px;
      font-weight: bold;}
</style>