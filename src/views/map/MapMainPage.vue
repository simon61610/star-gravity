<template>
    <div class="wrapper">
        <!-- 列表與地圖 -->
        <MapMain />

        <!-- 大彈窗 -->
        <!-- <MapDetail/> -->

        <!-- 地點評論 -->
        <!-- <MapReview/> -->

        <!-- 評論填寫框 -->
        <!-- <ReviewPlace/> -->

        
    </div>
</template>

<script setup>
import MapMain from '@/components/starmap/MapMain.vue';
import MapDetail from '@/components/starmap/MapDetail.vue';
import MapReview from '@/components/starmap/MapReview.vue';
import ReviewPlace from '@/components/starmap/ReviewPlace.vue';
</script>

<style scoped>
.wrapper{
    height: calc( 100vh - 50px) ;
}  
</style>
