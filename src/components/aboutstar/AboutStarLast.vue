<template>
    <div class="wrapper">

        <section class="constellation">
            <!-- 連線（覆蓋在最底層） -->
            <svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                    :points="points"
                    fill="none"
                    stroke="rgba(255,255,255,.7)"
                    stroke-width="0.6"
                />
            </svg>

            <!-- 星點（以百分比定位） -->
            <div
                v-for="(s, i) in stars"
                :key="i"
                class="node"
                :style="{ left: s.x + '%', top: s.y + '%' }"
                >
            <div class="star" :style="{ fontSize: s.size + 'px' }">★</div>
                <div class="label">{{ s.label }}</div>
            </div>
        </section>

    </div>
</template>



<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.wrapper{
    width: 100%;
    box-sizing: border-box;
    // height: 1000px;
    background-color: $bgColor-shop;
}
/* 畫布：先切版，大小可依需要調整或改成 100% 寬 */
.constellation{
    position: relative;
    width: min(560px, 90vw);
    height: 360px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
}
/* 連線在最底層鋪滿 */
.lines{
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}
/* 星點容器：以自身中心對準座標 */
.node{
    position: absolute;
    transform: translate(-50%, -50%);
    text-align: center;
    color: $FontColor-white;
    // pointer-events: none;        /* 純展示，避免擋住事件 */
}
/* 星星用字元，用字體大小控制視覺大小 */
.star{
    line-height: 1;
    color: $secondaryColor-yellow;             
    text-shadow: 0 1px 2px rgba(0,0,0,.45);
}
/* 標籤放在星星下方一點 */
.label{
    margin-top: 8px;
    font-size: $pcChFont-small;
    opacity: .95;
}
</style>

<script setup>
    import { ref, computed } from 'vue'
    /* 用百分比描述位置，size 用像素（字體大小控制星星大小） */
    const stars = ref([
        { x: 24, y: 16, size: 22, label: '最暗的星' },
        { x: 55, y: 36, size: 28, label: '更暗的星' },
        { x: 34, y: 58, size: 34, label: '稍亮的星' },
        { x: 70, y: 78, size: 44, label: '最亮的星' }
    ])
    /* 把百分比位置轉成 SVG 0~100 的座標字串，用來畫折線 */
    const points = computed(() =>
        stars.value.map(s => `${s.x},${s.y}`).join(' ')
    )




</script>