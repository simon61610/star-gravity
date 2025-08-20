<script setup>
import ConstellationCard from '@/components/game/ConstellationCard.vue'
import ZodiacBar from '@/components/game/ZodiacBar.vue'

</script>

<template>
  <div class="sky">
    <ConstellationCard />
      <ZodiacBar />
  </div>
</template>

<style >
.sky{
  background-image: url(/src/assets/images/games/GameSkyPage/gamesky_bg.svg);
  background-repeat: no-repeat;    /* 不重複 */
  background-size: cover;          /* 填滿容器 */
  background-position: center;     /* 置中對齊 */
}
</style>
