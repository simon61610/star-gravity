<!-- src/views/game/GameResultPage.vue -->
<script setup>
// 這頁先不寫任何互動邏輯
</script>

<template>
  <main class="fortune" aria-label="占卜結果頁">
    <!-- 背景／舞台 -->
    <div class="bg">
      <!-- 左右簾幕（若有 PNG 可直接換成 <img>） -->
      <div class="stage" aria-hidden="true"></div>
    </div>

    <div class="wrap">
      <!-- 標題 -->
      <h1 class="title" aria-label="占卜結果">
        <span class="block">占</span>
        <span class="block">卜</span>
        <span class="block">結</span>
        <span class="block">果</span>
      </h1>

      <section class="content">
        <!-- 左邊：卡片疊放 -->
        <aside class="cards" aria-label="抽到的卡片">
          <img
            class="card card--back"
            src="/src/assets/images/games/GameCardPage/game_card01.svg"
            alt="背面卡片"
          />
          <img
            class="card card--front"
            src="/src/assets/images/games/GameCardPage/game_card02.svg"
            alt="巫婆星 卡片"
          />
        </aside>

        <!-- 右邊：結果 + 商品 -->
        <div class="result">
          <!-- 三項分數 -->
          <div class="lines">
            <div class="line">
              <div class="label">事業</div>
              <div class="bar">
                <div class="bar__fill" style="width: 70%"></div>
              </div>
              <p class="desc">
                結果敘述一段文字說明—放兩行示意。結果敘述一段文字說明—放兩行示意。
              </p>
            </div>

            <div class="line">
              <div class="label">愛情</div>
              <div class="bar">
                <div class="bar__fill" style="width: 55%"></div>
              </div>
              <p class="desc">
                結果敘述一段文字說明—放兩行示意。結果敘述一段文字說明—放兩行示意。
              </p>
            </div>

            <div class="line">
              <div class="label">家庭</div>
              <div class="bar">
                <div class="bar__fill" style="width: 80%"></div>
              </div>
              <p class="desc">
                結果敘述一段文字說明—放兩行示意。結果敘述一段文字說明—放兩行示意。
              </p>
            </div>
          </div>

          <!-- 推薦商品卡 -->
          <article class="product" aria-label="推薦商品">
            <header class="product__hd">
              <span class="tag">推薦商品</span>
              <h2 class="product__title">星座馬克杯</h2>
              <p class="product__desc">
                簡短敘述：這裡是商品介紹，兩行示意文字。這裡是商品介紹，兩行示意文字。
              </p>
              <button class="btn btn--gold" type="button">查看商品</button>
            </header>
            <div class="product__thumb">
              <img
                src=""
                alt="星座馬克杯"
              />
            </div>
          </article>
        </div>
      </section>

      <!-- 返回按鈕 -->
      <div class="footer">
        <button class="btn btn--ghost" type="button">返回</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">

/* ===== 色票（可依品牌調整） ===== */
$bg-deep: #2e3b73;
$bg-sky: #7ba1d1;
$panel: #3b2d6b;
$panel-2: #4e3e8c;
$purple-100: #a595e5;
$purple-200: #c9bdf4;
$gold: #ffd34d;
$text-100: #f2f2f7;
$text-80: rgba(242, 242, 247, 0.8);
$text-60: rgba(242, 242, 247, 0.6);

.fortune {
  align-items: center;
  justify-content: center;
  background-image: url(/src/assets/images/games/GameCardPage/game_card-bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* 背景舞台 & 簾幕（若有 PNG 可改用 img） */
.bg {
  pointer-events: none;

  .stage {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: min(1200px, 100%);
  height: 140px;
   min-height: 100vh;
  display: flex;

  }

  .curtain {
    position: absolute;
    top: -5%;
    bottom: -10%;
    width: 30%;
    background: linear-gradient(180deg, #6d56b6 0, #4f3f90 100%);
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4));
    &--left {
      left: -6%;
      border-bottom-right-radius: 80% 40%;
    }
    &--right {
      right: -6%;
      border-bottom-left-radius: 80% 40%;
    }
  }
}

.wrap {
  width: min(1120px, 92%);
  margin: 0 auto;
  padding: 48px 0 72px;
  position: relative;
  z-index: 1;
}

/* 標題：四個方塊字 */
.title {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 28px;

  .block {
    display: inline-grid;
    place-items: center;
    width: 48px;
    height: 48px;
    font-weight: 800;
    letter-spacing: 0.2em;
    background: #fff;
    color: #1c1942;
    border-radius: 6px;
  }
}

/* 主內容兩欄 */
.content {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

/* 卡片區 */
.cards {
  position: relative;
  padding-top: 12px;

  .card {
    width: 200px;
    height: 320px;
    border-radius: 14px;
    display: block;
  }

  .card--back {
    position: absolute;
    left: 40px;
    top: 0;
    transform: rotate(-14deg);
  }

  .card--front {
    position: relative;
    left: 135px;
    top: 124px;
    transform: rotate(8deg);
    z-index: 1;
  }

  .card-name {
    margin-left: 128px;
    margin-top: 16px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: $purple-200;
  }
}

/* 右側結果 */
.result {
  display: grid;
  grid-template-rows: auto auto;
  gap: 24px;
}

/* 三條說明 + 進度條 */
.lines {
  padding: 20px 20px 12px;
 
  border-radius: 16px;
}

.line + .line {
  margin-top: 18px;
}

.label {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
  color: white;
}

.bar {
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  overflow: hidden;
  margin-bottom: 8px;

  &__fill {
    height: 100%;
    background: linear-gradient(90deg, #ffe57a 0, #ffd34d 60%, #ffb400 100%);
  }
}

.desc {
  color: $text-80;
  line-height: 1.6;
  font-size: 14px;
}

/* 推薦商品卡 */
.product {
  display: grid;
  grid-template-columns: 1fr 220px;
  align-items: center;
  gap: 18px;
  padding: 18px;
  background: #4a3b8b;
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }

  &__hd {
    .tag {
      display: inline-block;
      padding: 4px 10px;
      font-size: 12px;
      border-radius: 999px;
      color: #1c1942;
      background: #ffe57a;
      margin-bottom: 8px;
      font-weight: 700;
    }

    .product__title {
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .product__desc {
      color: $text-80;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 12px;
    }
  }

  &__thumb {
    justify-self: end;
    width: 200px;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.15);
    display: grid;
    place-items: center;
    img {
      max-width: 90%;
      max-height: 90%;
      display: block;
    }

    @media (max-width: 720px) {
      justify-self: start;
    }
  }
}

/* 按鈕樣式 */
.btn {
  display: inline-grid;
  place-items: center;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 700;
  border: 2px solid transparent;
  cursor: pointer;

  &--gold {
    background: $gold;
    color: #2a235a;

  }

  &--ghost {
    background: transparent;
    color: $text-100;
    border-color: rgba(255, 255, 255, 0.4);
    padding-left: 28px;
    padding-right: 28px;
  }
}

.footer {
  display: grid;
  place-items: center;
  margin-top: 20px;
}
</style>
