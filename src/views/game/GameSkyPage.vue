<script setup>
import ConstellationCard from '@/components/game/ConstellationCard.vue'
import ZodiacBar from '@/components/game/ZodiacBar.vue'
import { swtichstars } from '@/data/swtichstars'
import {ref} from 'vue'



const cardRef = ref(null)
function DrawNext() {
  // 透過 ref 抓到子層的方法
  console.log("Parent.DrawNext() 被呼叫了")
  cardRef.value?.drawNextLine()
}
const currentConstellation = ref(swtichstars[0])
const showLines = ref(true) //星座連線預設開

const selectConstellation = (id) => {
  console.log("emit id:", id)
  currentConstellation.value = swtichstars.find(s => s.id === id)
}

//抓子層的restline程式
function toggle () {
    cardRef.value?.resetLines();
  }
  
//抓子層的showalllines程式
function showall(){
  cardRef.value.showAllLines();
}


</script>

<template>
  <div class="bgc">
    <div class="sky">
      <ConstellationCard  :constellation="currentConstellation" ref="cardRef" :show-lines="showLines" />
      <!-- <StarsCanvas :stars="currentConstellation.stars"  :lines="currentConstellation.lines"/> -->
    </div>
    <div class="zod">
      <ZodiacBar  @select-constellation="selectConstellation" @draw-next ="DrawNext"  @toggle-lines="toggle" @showAllLines="showall"/>
    </div>
  </div>
</template>

<style>
.bgc{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.sky{
  width: 100%;  
  background-size: 100% 100%;
  background-image: url(@/assets/images/games/GameSkyPage/gamesky_bg.svg);
  background-repeat: no-repeat;    /* 不重複 */
  background-size: cover;          /* 填滿容器 */
  background-position:center;     /* 置中對齊 */
  overflow-x: hidden;
  
}

.zod{
  width: 100%;
  background-color: black;
}





@media (max-width: 430px) {
  .sky{
    
    display: flex;
    flex-direction: column-reverse;

  }
}
</style>
