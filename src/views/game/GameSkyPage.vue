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
const showLines = ref(true) //星座連線預設關

const selectConstellation = (id) => {
  console.log("emit id:", id)
  currentConstellation.value = swtichstars.find(s => s.id === id)
}




</script>

<template>
  <div class="sky">
    <ConstellationCard  :constellation="currentConstellation" ref="cardRef" :show-lines="showLines"  />
    <ZodiacBar  @select-constellation="selectConstellation" @draw-next ="DrawNext"  @toggle-lines="() => { showLines= !showLines ; cardRef.value?.resetLines(); }"/>
    <!-- <StarsCanvas :stars="currentConstellation.stars"  :lines="currentConstellation.lines"/> -->
  </div>
</template>

<style>
.sky{
  background-image: url(@/assets/images/games/GameSkyPage/gamesky_bg.svg);
  background-repeat: no-repeat;    /* 不重複 */
  background-size: cover;          /* 填滿容器 */
  background-position: center;     /* 置中對齊 */
}
</style>
