<!-- src/views/game/GameWishPage.vue -->
<template>
  <main class="wish-wall" aria-label="許願牆背景">
    <section class="panel" role="region" aria-labelledby="wish-title">
      <h1 id="wish-title" class="title">許 願 牆</h1>

      <!-- 用一般容器，不用 <form>，避免 Enter 自動送出 -->
      <div class="wish-form">
        <!-- 你的姓名 -->
        <label class="field">
          <span class="field__label">你的姓名</span>
          <input
            class="field__input"
            :class="{ 'is-error': showError && !form.name.trim() }"
            type="text"
            name="name"
            autocomplete="name"
            v-model.trim="form.name"
            placeholder="請輸入姓名"
          />
        </label>

        <!-- 心願（多行） -->
        <label class="field">
          <span class="field__label">寫下你的心願</span>
          <textarea
            class="field__textarea"
            :class="{ 'is-error': showError && !form.wish.trim() }"
            name="wish"
            rows="3"
            v-model.trim="form.wish"
            placeholder="希望宇宙聽見你的願望 ✨"
          />
        </label>

        <!-- 圖案選取 -->
        <fieldset class="field">
          <legend class="field__label">選取你的圖案</legend>
          <div class="shape-grid" role="radiogroup" aria-label="圖案選擇">
            <!-- Heart -->
            <label class="shape" :aria-checked="form.shape==='heart'" role="radio">
              <input type="radio" name="shape" value="heart" v-model="form.shape" />
              <span class="shape__box" aria-hidden="true" title="愛心">
                <svg viewBox="0 0 24 24" class="shape__svg">
                  <path d="M12 21s-7.3-4.35-9.5-8.23C-.34 8.9 2.53 4 6.9 4c2.06 0 3.67 1.02 4.6 2.5C12.43 5.02 14.04 4 16.1 4c4.37 0 7.24 4.9 3.6 8.77C19.3 16.65 12 21 12 21z" fill="currentColor" />
                </svg>
              </span>
            </label>

            <!-- Square -->
            <label class="shape" :aria-checked="form.shape==='square'" role="radio">
              <input type="radio" name="shape" value="square" v-model="form.shape" />
              <span class="shape__box" aria-hidden="true" title="方形">
                <svg viewBox="0 0 24 24" class="shape__svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" fill="currentColor" />
                </svg>
              </span>
            </label>

            <!-- Circle -->
            <label class="shape" :aria-checked="form.shape==='circle'" role="radio">
              <input type="radio" name="shape" value="circle" v-model="form.shape" />
              <span class="shape__box" aria-hidden="true" title="圓形">
                <svg viewBox="0 0 24 24" class="shape__svg">
                  <circle cx="12" cy="12" r="8" fill="currentColor" />
                </svg>
              </span>
            </label>

            <!-- Droplet -->
            <label class="shape" :aria-checked="form.shape==='droplet'" role="radio">
              <input type="radio" name="shape" value="droplet" v-model="form.shape" />
              <span class="shape__box" aria-hidden="true" title="水滴">
                <svg viewBox="0 0 24 24" class="shape__svg">
                  <path d="M12 2s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z" fill="currentColor"/>
                </svg>
              </span>
            </label>
          </div>
          <p v-if="showError && !form.shape" class="err-msg">請選擇一個圖案</p>
        </fieldset>

        <!-- 只有按這顆按鈕才會導到動畫頁 -->
        <button class="btn" type="button" :disabled="!isValid" @click="onSubmit">
          送出
        </button>

        <!-- 成功提示（暫時不啟用，保留） -->
        <p v-if="sent" class="toast" role="status">已送出，願宇宙收到你的心聲 ✨</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const STORAGE_LIST = 'wishWallSubmissions'
const STORAGE_LATEST = 'wishWallLatest'

const form = ref({ name: '', wish: '', shape: '' })
const showError = ref(false)  // 模板使用到
const sent = ref(false)       // 模板使用到（目前保留）

const isValid = computed(() =>
  form.value.name.trim() && form.value.wish.trim() && form.value.shape
)

function onSubmit () {
  if (!isValid.value) { showError.value = true; return }

  // 可選：先存到 localStorage（之後你要改成 API 也OK）
  try {
    const payload = { ...form.value, createdAt: new Date().toISOString() }
    const arr = JSON.parse(localStorage.getItem(STORAGE_LIST) || '[]')
    arr.push(payload)
    localStorage.setItem(STORAGE_LIST, JSON.stringify(arr))
    localStorage.setItem(STORAGE_LATEST, JSON.stringify(payload))
  } catch (e) {
    console.warn('localStorage 寫入失敗：', e)
  }

  // 只在按鈕點擊時導頁
  router.push({ name: 'gamewishTransit' })
}
</script>

<style scoped lang="scss">
/* ===== 色票 ===== */
$bg-top: #0b1533;
$bg-bot: #23356e;
$purple-400: #9b8afc;
$purple-600: #5e40e6;
$white: #ffffff;
$white-12: rgba(255,255,255,.12);
$white-18: rgba(255,255,255,.18);
$white-40: rgba(255,255,255,.4);

/* ===== 版心與背景 ===== */
.wish-wall {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  color: #fff;

  /* 你的 SVG 背景 */
  background-image: url(/src/assets/images/games/GameWishPage/game_wish-bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.panel {
  width: min(560px, 92vw);
  padding: 36px 28px 28px;
  border-radius: 18px;
}

.title {
  text-align: center;
  letter-spacing: .6em;
  font-weight: 800;
  margin: 4px 0 24px;
  text-shadow: 0 2px 0 rgba(0,0,0,.25);
  font-size: 30px;
}

/* ===== 表單 ===== */
.wish-form { display: grid; gap: 18px; }
.field { display: grid; gap: 8px; }

.field__label { font-size: 14px; color: $white-40; letter-spacing: .04em; }

.field__input, .field__textarea {
  border-radius: 14px; border: 1px solid $white-18;
  background: rgba(255,255,255,.9);
  color: #1a1a1a; outline: none; transition: box-shadow .2s ease, border-color .2s ease;
  padding: 10px 14px;
}
.field__input { height: 44px; }
.field__textarea { min-height: 84px; resize: vertical; }

.field__input:focus, .field__textarea:focus {
  border-color: $white; box-shadow: 0 0 0 3px rgba(122, 90, 248, .35);
}

.is-error { border-color: #ff5a7a !important; box-shadow: 0 0 0 2px rgba(255,90,122,.35); }
.err-msg { margin-top: 6px; font-size: 12px; color: #ffb0bf; }

/* ===== 圖案選擇 ===== */
.shape-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 14px; margin-top: 6px;
}
.shape { display: inline-block; }
.shape input { position: absolute; opacity: 0; pointer-events: none; }

.shape__box {
  display: grid; place-items: center; height: 48px;
  border-radius: 10px; border: 1px solid $white-18; background: $white-12;
  cursor: pointer; transition: transform .12s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease;
}
.shape__svg { width: 24px; height: 24px; color: $white; opacity: .95; }

.shape:hover .shape__box {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0,0,0,.35);
  background: rgba(255,255,255,.16);
}
.shape input:focus + .shape__box { box-shadow: 0 0 0 3px rgba(122, 90, 248, .45); }
.shape input:checked + .shape__box {
  border-color: rgba(255,255,255,.7);
  box-shadow: 0 8px 18px rgba(0,0,0,.45), inset 0 0 0 1.5px rgba(255,255,255,.65);
  background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.12));
}

/* ===== 送出按鈕 ===== */
.btn {
  margin-top: 8px; height: 46px; border: 0; border-radius: 999px; cursor: pointer;
  font-weight: 700; letter-spacing: .2em; color: $white;
  background: linear-gradient(180deg, $purple-400, $purple-600);
  border: 2px solid transparent;
  transition: transform .1s ease, box-shadow .2s ease, filter .2s ease, opacity .2s ease;
}
.btn:hover { transform: translateY(-1px); filter: brightness(1.05); }
.btn:active { transform: translateY(0); filter: brightness(.98); }
.btn:disabled { opacity: .5; cursor: not-allowed; filter: none; box-shadow: none; }

/* 成功提示（保留） */
.toast { text-align: center; margin-top: 10px; font-size: 14px; opacity: 0; animation: fadeIn .3s forwards; }
@keyframes fadeIn { to { opacity: 1; } }

/* RWD */
@media (max-width: 670px) {
  .panel { padding: 28px 20px 22px; }
  .title { letter-spacing: .4em; font-size: 22px; }
  .shape-grid { gap: 10px; }
}
</style>