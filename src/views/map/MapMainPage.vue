<template>
    <div class="wrapper">
        <!-- 列表與地圖 -->
        <MapMain :locationList="locationList" />

        <div v-show=" showLayout " class="layout"></div>

        <!-- 大彈窗 -->
        <MapDetail :locationList="locationList"/>

        <!-- 地點評論 -->
        <!-- <MapReview :locationList="locationList"/> -->

        <!-- 評論填寫框 -->
        <!-- <ReviewPlace :locationList="locationList"/> -->

        
    </div>
</template>

<script setup>
import {ref} from 'vue'
import MapMain from '@/components/starmap/MapMain.vue';
import MapDetail from '@/components/starmap/MapDetail.vue';
import MapReview from '@/components/starmap/MapReview.vue';
import ReviewPlace from '@/components/starmap/ReviewPlace.vue';

//假數據
const locationList = ref([
  { region: '南部', scene: '市郊', name:'南瀛天文館', img: '../../assets/images/map/map-tainanPhoto.jpg',score:4.7, address:"台南市大內區34-2號" ,coords:[ 385 , 380] },
  { region: '北部', scene: '山間', name:'陽明山',img: '../../assets/images/map/map-taipeiPhoto.jpg' ,score:4.5, address:"台北市士林區竹子湖" ,coords:[ 880 , 630]},
  { region: '中部', scene: '山間', name:'杉林溪',img: '../../assets/images/map/map-taichungPhoto.jpg' ,score:4.3, address:"南投縣溪頭" ,coords:[ 510 , 470]},
  { region: '東部', scene: '海邊', name:'三仙台',img: '../../assets/images/map/map-taichungPhoto.jpg' ,score:4.2, address:"台東縣" ,coords:[ 385 , 595]},
  { region: '離島', scene: '海邊', name:'蘭嶼',img: '../../assets/images/map/map-taichungPhoto.jpg' ,score:4.0, address:"台東縣蘭嶼" ,coords:[ 122 , 635]},
])


const showLayout = ref(false)


</script>

<style scoped>
.wrapper{
    height: calc( 100vh - 50px) ;
    position: relative;
    box-sizing: border-box;
}
.layout{
    width: 100%;
    height: calc( 100vh - 50px);
    background-color: #080d27ad;

    position: absolute;
    top: 0;
    z-index: 5;
    /* 評論彈窗跳出時z-index要改成300 */
    /* z-index: 300; */
}  
</style>
