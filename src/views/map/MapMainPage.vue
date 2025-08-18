<template>
    <div class="wrapper layout">
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
    position: relative;
    box-sizing: border-box;
}
/* .layout::before{
    content: "";
    width: 100%;
    height: calc( 100vh - 50px);
    background-color: #080d27ad;

    position: absolute;
    top: 0;
    z-index: 5;
    評論彈窗跳出時z-index要改成300
    z-index: 300;
}   */
</style>
