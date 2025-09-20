<!-- src/components/ZodiacBar.vue -->
<script setup>
const emit = defineEmits(['select-constellation','draw-next','toggle-lines','showAllLines'])
import { ref,onMounted } from 'vue'
/*星座圖檔import*/
import Capricorn from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_capricorn-icon.png'
import Pisces from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_pisces-icon.png'
import Aquarius from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_aquarius-icon.png'
import Aries from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_aries-icon.png'
import Taurus from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_tauru-icon.png'
import Gemini from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_gemini-icon.png'
import Cancer from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_cancer-icon.png'
import Leo from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_leo-icon.png'
import Virgo from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_virgo-icon.png'
import Libra from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_libra-icon.png'
import Scorpio from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_scorpio-icon.png'
import Sagittarius from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_sagitarius-icon.png'
/*星連星的程式*/
function DrawNext() {
  // 呼叫子層的 drawNext
  emit('draw-next')
}

// 這行追蹤選中的星座
const selectedZodiac = ref('Aries')


/*線段顯示程式*/
function showAllLines() {
  // 呼叫子層的 
  emit('showAllLines')
  console.log('showAllLines emit 出去了')
}


const zodiacInfo = ref([
  { 
    id:'Aries',
    eng: "Aries",
    ch:"牡羊座" ,
    imgurl: Aries,
  },
  { 
    id: "Aquarius",
    eng: "Aquarius",
    ch: "水瓶座",
    imgurl: Aquarius,
  },

  { 
    id:'Pisces',
    eng: "Pisces",
    ch: "雙魚座",
    imgurl: Pisces,
  },

  { 
    id:"Capricorn",
    eng: "Capricorn",
    ch: "摩羯座",
    imgurl: Capricorn,
  },
  { 
    id:'Taurus',
    eng: "Taurus",
    ch: "金牛座",
    imgurl: Taurus,
  },
  { 
    id:'Gemini',
    eng: "Gemini",
    ch: "雙子座",
    imgurl: Gemini,
  },

  { 
    id:'Cancer',
    eng: "Cancer",
    ch:"巨蟹座" ,
    imgurl: Cancer,
  },

  { 
    id:'Leo',
    eng: "Leo",
    ch:"獅子座" ,
    imgurl: Leo,
  },
  { 
    id:'Virgo',
    eng: "Virgo",
    ch: "處女座",
    imgurl: Virgo,
  },
  {
    id:'Libra',
    eng: "Libra",
    ch:"天秤座" ,
    imgurl:Libra,
  },
  { 
    id:'Scorpio',
    eng: "Scorpio",
    ch:"天蠍座" ,
    imgurl: Scorpio,
  },
  {
    id:'Sagittarius',
    eng: "Sagittarius",
    ch:"射手座" ,
    imgurl: Sagittarius,
  },
])

</script>



<template>
  <section class="zodiac-tittle">
    <div class="zodiac__actions" aria-label="顯示控制">
          <h2 class="zodiac__title"> 十 二 星 座</h2>
        <div class="zodiac__icons">
          <el-tooltip content="重置星座連線" placement="top" :show-after="0">
            <img class="action__icon" src="@/assets/images/games/GameSkyPage/btn/gamesky_point.png" alt="點狀顯示" @click="$emit('toggle-lines');console.log('toggle-lines emit 出去了')" />
          </el-tooltip>
          <el-tooltip content="星連星" placement="top" :show-after="0">
            <img class="action__icon" src="@/assets/images/games/GameSkyPage/btn/gamesky_line.png"  alt="連線顯示" @click="DrawNext" />
          </el-tooltip>
          <el-tooltip content="線條全顯示" placement="top" :show-after="0">
            <img class="action__icon action__icon--star" src="@/assets/images/games/GameSkyPage/btn/gamesky_star.png" alt="星星" @click="showAllLines"/>
          </el-tooltip>
        </div>
      </div>
    <div class="zodiac">
      <ul class="zodiac__list" aria-label="十二星座清單" >
        <li class="zodiac__item" :class="{ 'zodiac__item__on': selectedZodiac === zodiac.id }" v-for="zodiac in zodiacInfo" :key="zodiac.id "  @click="() => { console.log('emit id:', zodiac.id); selectedZodiac = zodiac.id; $emit('select-constellation', zodiac.id) }">
          <img class="zodiac__icon" :src="zodiac.imgurl" :alt="zodiac.eng">
          <div class="zodiac__text"><strong>{{ zodiac.eng }}</strong><span>{{ zodiac.ch }}</span></div>
        </li>
      </ul>
    </div>


  </section>
</template>



<style scoped lang="scss">
@import '@/assets/styles/main.scss';
/* --- 版面 --- */
.zodiac-tittle {
  padding: 0 100px;

  // ≤531px
  @media (max-width: 531px)and (pointer: coarse) {
    display: flex !important;
    flex-direction: column;
    padding: 0;

    .zodiac__actions {
      height: 0;

      h2 {
        display: none;
      }

      .zodiac__icons {
        position: relative;
        top: 450px;
        width: 100%;

        img {
          &:first-child {
            margin-right: auto;
          }
        }
      }
    }

    .zodiac {
      padding: 0;
      

      .zodiac__list {
        
        display: flex;
        overflow-x: auto;
        flex-direction: row;
      }
    }
  }
}

.zodiac {
  
  width: 100%;
  display: grid;
  grid-template-columns:  1fr; /* 左 標題 / 中 清單 / 右 控制 */
  align-items: center;
  padding: 10px 0px;
  color: #fff;

  // ≤768px
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
}

.zodiac__title {
  margin: 0;
  font-size: 32px;
  letter-spacing: 0.15em;
  color: #fff;
  padding: 0px 46px;
  white-space: nowrap;

  // ≤768px
  @media (max-width: 768px) {
    font-size: 24px;
  }
}

/* --- 中間清單 --- */
.zodiac__list {
  max-width: 1200px;
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, minmax(140px, 1fr)); /* 桌機 6 欄 */
  gap: 20px;
  padding: 0;
  margin: 0 auto;

  // ≤1151px
  @media (max-width: 1151px) {
    grid-template-columns: repeat(4, minmax(140px, 1fr));
    gap: 16px;
  }

  // ≤768px
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(100px, 1fr));
  }
}

.zodiac__item {
  
  display: grid;
  grid-template-columns: 44px 1fr; /* icon 44px */
  justify-content: center;
  align-items: center;
  gap: 5px;
  min-width: 140px;

  &:hover {
    cursor: pointer;
    background-color: rgba(193, 133, 226, 0.504);
  }
}

.zodiac__item__on {
  background: rgba(193, 133, 226, 0.504);
}

.zodiac__icon {
  width: 44px;
  height: 44px;
  object-fit: contain; /* 等比顯示 */
  display: block;

  &:hover {
    cursor: pointer;
  }
}

.zodiac__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;

  strong {
    font-weight: 700;
    font-size: 16px;
  }

  span {
    font-size: 14px;
  }
}

/* --- 右側控制 --- */
.zodiac__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  // ≤768px
  @media (max-width: 768px) {
    justify-content: flex-end;
    flex-direction: column;
  }
}

.zodiac__icons {
  display: flex;

  img {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  &:hover {
    cursor: pointer;
  }
}

.action__icon--star {
  display: flex;
}


</style>
