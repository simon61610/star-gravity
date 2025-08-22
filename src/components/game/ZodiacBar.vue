<!-- src/components/ZodiacBar.vue -->
<script setup>
const emit = defineEmits(['select-constellation'])
import { ref } from 'vue'

const zodiacInfo = ref([
  { 
    id:'Capricorn',
    eng: "Capricorn",
    ch: "摩羯座",
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_capricorn-icon.png",
  },
  {
    eng: "Aquarius",
    ch: "水瓶座",
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_aquarius-icon.png",
  },

  {
    eng: "Pisces",
    ch: "雙魚座",
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_pisces-icon.png",
  },

  { 
    id:'Aries',
    eng: "Aries",
    ch:"牡羊座" ,
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_aries-icon.png",
  },
  {
    eng: "Taurus",
    ch: "金牛座",
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_tauru-icon.png",
  },
  {
    eng: "Gemini",
    ch: "雙子座",
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_gemini-icon.png",
  },

  {
    eng: "Cancer",
    ch:"巨蟹座" ,
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_cancer-icon.png",
  },

  {
    eng: "Leo",
    ch:"獅子座" ,
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_leo-icon.png",
  },
  {
    eng: "Virgo",
    ch: "處女座",
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_virgo-icon.png",
  },
  {
    eng: "Libra",
    ch:"天秤座" ,
    imgurl:"/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_capricorn-icon.png",
  },
  {
    eng: "Scorpio",
    ch:"天蠍座" ,
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_scorpio-icon.png",
  },
  {
    eng: "Sagittarius",
    ch:"射手座" ,
    imgurl: "/src/assets/images/games/GameSkyPage/zodiac-icon/gamesky_sagitarius-icon.png",
  },
])

</script>



<template>
  <section class="zodiac-tittle">
   <div class="zodiac__actions" aria-label="顯示控制">
        <h2 class="zodiac__title"> 十 二 星 座</h2>
      <div class="zodiac__icons">
        <img class="action__icon" src="@/assets/images/games/GameSkyPage/btn/gamesky_point.png" alt="點狀顯示" />
        <img class="action__icon" src="@/assets/images/games/GameSkyPage/btn/gamesky_line.png"  alt="連線顯示" />
        <img class="action__icon action__icon--star" src="@/assets/images/games/GameSkyPage/btn/gamesky_star.png" alt="星星" />
      </div>
    </div>
  <div class="zodiac">
    <ul class="zodiac__list" aria-label="十二星座清單">
      <li class="zodiac__item" v-for="zodiac in zodiacInfo" :key="zodiac.id"  @click="$emit('select-constellation', zodiac.id)">
        <img class="zodiac__icon" :src="zodiac.imgurl" :alt="zodiac.eng">
        <div class="zodiac__text"><strong>{{ zodiac.eng }}</strong><span>{{ zodiac.ch }}</span></div>
      </li>
    </ul>
  </div>
  </section>
</template>



<style scoped lang="scss">
/* --- 版面 --- */
.zodiac-tittle{
/* border:2px solid red ; */
 padding: 0 100px;
}


.zodiac {
  display: grid;
  grid-template-columns: auto 1fr auto; /* 左 標題 / 中 清單 / 右 控制 */  
  align-items: center;
  gap: 24px 32px;
  padding: 10px 46px;
  color: #fff;
}

.zodiac__title {
  margin: 0;
  font-size: 32px;
  letter-spacing: .15em;
  color: #fff;
  padding: 0px 46px;
  white-space: nowrap;

}

/* --- 中間清單 --- */
.zodiac__list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, minmax(140px, 1fr)); /* 桌機 6 欄 */
  gap: 20px 32px;
  padding: 0;
  margin: 0;
}

.zodiac__item {
  display: grid;
  grid-template-columns: 44px 1fr; /* icon 44px */
  align-items: center;
  gap: 5px;
  min-width: 140px;
  &:hover{ 
    cursor: pointer;
    background-color: rgba(193, 133, 226, 0.504);
  }
}

.zodiac__icon {
  width: 44px;
  height: 44px;
  object-fit: contain;         /* 等比顯示 */
  display: block;
}

.zodiac__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.zodiac__text strong {
  font-weight: 700;
  font-size: 16px;
}

.zodiac__text span {
  font-size: 14px;
}

/* --- 右側控制 --- */
.zodiac__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.zodiac__icons {
  display: flex;
  /* color: #fff; */
 
}

.action__icon--star {
  display: flex;

}

/* --- RWD --- */
@media (max-width: 1024px) {
  .zodiac__list { grid-template-columns: repeat(4, minmax(140px, 1fr)); }
}

@media (max-width: 768px) {
  .zodiac { grid-template-columns: 1fr; align-items: start; }
  .zodiac__title { font-size: 28px; }
  .zodiac__list  { grid-template-columns: repeat(3, minmax(120px, 1fr)); }
  .zodiac__actions { justify-content: flex-end; }
}

@media (max-width: 480px) {
  .zodiac__list  { grid-template-columns: repeat(2, minmax(120px, 1fr)); }
  .zodiac__icon  { width: 40px; height: 40px; }
}
</style>
