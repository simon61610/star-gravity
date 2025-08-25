<script setup>
    import { ref, computed, onMounted, nextTick } from 'vue'
    /**
     * 星點資料：
     *  - x, y：百分比座標（0~100），請按照「由上而下」的順序（y 由小到大）
     *  - size：字體大小（星星視覺大小）
     *  - label：名稱
     *  - mag：星等
     */
    const stars = ref([
        { x: 24, y: 16, size: 22, label: '最暗的星', mag: 5 },
        { x: 55, y: 36, size: 28, label: '更暗的星', mag: 4 },
        { x: 34, y: 58, size: 34, label: '稍亮的星', mag: 2 },
        { x: 70, y: 78, size: 44, label: '最亮的星', mag: -1 }
    ])
    /** 把星點轉成 SVG 折線座標字串 */
    const points = computed(() => stars.value.map(s => `${s.x},${s.y}`).join(' '))

    /** DOM 參照：外層容器 & 亮線 polyline */
    const wrap = ref(null)
    const poly = ref(null)

    /** 互動狀態 */
    const litIndex = ref(-1)        // 目前滑鼠「亮到第幾顆」（-1 代表都沒亮）
    const sticky   = ref(new Set()) // 永久點亮的索引集合（每顆滑過就加入）

    /** 取得滑鼠相對畫布的「y 百分比」 */
    function yPercentFromEvent (e) {
        const r = wrap.value.getBoundingClientRect()
        let p = ((e.clientY - r.top) / r.height) * 100
        // 限制在 0~100 範圍
        return Math.max(0, Math.min(100, p))
    }
    /** 進場就先算一次（避免一開始沒有反應） */
    function onEnter (e) {
        onMove(e)
    }
    /** 核心：滑動時計算應點亮到哪一顆，並把經過的星加入 sticky */
    function onMove (e) {
        const y = yPercentFromEvent(e)
        // 找出「滑鼠 y% 之上（含）最後一顆」的索引
        let idx = -1
        for (let i = 0; i < stars.value.length; i++) {
            if (y >= stars.value[i].y) idx = i
        }
        litIndex.value = idx

        // 將「到 idx 為止」的星全部加入 sticky（永久點亮）
        for (let i = 0; i <= idx; i++) {
            if (i >= 0) sticky.value.add(i)
        }
    }
    /** 離開畫布：目前亮度清掉，但 sticky 保留（所以已滑過的還是亮） */
    function onLeave () {
        litIndex.value = -1
    }

    /* ----------------- 亮線動畫：用 dashoffset 做「從前端到後端亮起」 ----------------- */
    /** 量測 polyline 的總長度（SVG API） */
    const pathLen = ref(0)
        onMounted(async () => {
        await nextTick()
        if (poly.value?.getTotalLength) {
            pathLen.value = poly.value.getTotalLength()
        }
    })
    
    /** 歷來滑過的「最底下那顆」索引，用來讓亮線維持到已經滑過的最遠處 */
    const maxStickyIndex = computed(() => {
        if (sticky.value.size === 0) return -1
        // Set 轉陣列找最大
        return Math.max(...Array.from(sticky.value))
    })

    /** 進度索引：取「目前亮到的索引」與「歷來最遠亮到的索引」的最大值 */
    const progressIndex = computed(() => Math.max(litIndex.value, maxStickyIndex.value))

    /** 進度（0~1）：用索引 / (總顆數-1) */
    const progress = computed(() => {
        const n = stars.value.length
        if (n <= 1) return 0
        return Math.max(0, Math.min(1, progressIndex.value / (n - 1)))
    })

    /** 亮線的 dash 參數（隨 progress 改變 dashoffset） */
    const dashStyle = computed(() => {
        const len = pathLen.value || 0
        return len
        ? {
            strokeDasharray: `${len}`,
            strokeDashoffset: `${len - len * progress.value}`,
        }
        : {}
    })








</script>


<template>
    <div class="wrapper">

        <!-- 整個星座畫布；滑鼠事件都掛在這裡 -->
        <section class="constellation"
            ref="wrap"
            @mouseenter="onEnter"
            @mousemove="onMove"
            @mouseleave="onLeave"
            >
            <svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <!-- 底線：始終存在 -->
                <polyline :points="points" class="line-base" />
                <!-- 亮線：stroke-dashoffset 隨進度改變 -->
                <polyline
                    :points="points"
                    class="line-active"
                    ref="poly"
                    :style="dashStyle"
                />
            </svg>
            <!-- 星點（以百分比定位） -->

            <div
                v-for="(s, i) in stars"
                :key="i"
                class="node"
                :style="{ left: s.x + '%', top: s.y + '%' }"
                >
                <!--
                .lit 判斷：
                    1) i <= litIndex         → 目前滑鼠位置之下的星都「亮」
                    2) sticky.has(i)         → 曾滑過的星永久「亮」
                -->
                <div
                class="star"
                :class="{ lit: i <= litIndex || sticky.has(i) }"
                :style="{ fontSize: s.size + 'px' }"
                >★</div>
                <!-- 亮了才顯示標籤（永久亮也會長顯） -->
                <div
                    class="label"
                    v-show="i <= litIndex || sticky.has(i)"
                    >
                    {{ s.label }}（星等 {{ s.mag }}）
                </div>
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

