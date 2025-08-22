<script setup>
import ConstellationCard from '@/components/game/ConstellationCard.vue'
import ZodiacBar from '@/components/game/ZodiacBar.vue'
import { swtichstars } from '@/data/swtichstars'
import {ref} from 'vue'


const currentConstellation = ref(swtichstars[0])
const selectConstellation = (id) => {
  currentConstellation.value = swtichstars.find(s => s.id === id)
}


</script>

<template>
  <div class="sky">
    <ConstellationCard :constellation="currentConstellation"  />
    <ZodiacBar  @select-constellation="selectConstellation" />
  </div>
</template>

<style >
.sky{
  background-image: url(@/assets/images/games/GameSkyPage/gamesky_bg.svg);
  background-repeat: no-repeat;    /* 不重複 */
  background-size: cover;          /* 填滿容器 */
  background-position: center;     /* 置中對齊 */
}
</style>
