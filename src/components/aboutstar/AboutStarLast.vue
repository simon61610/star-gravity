<script setup>
    import { ref, computed, onMounted, nextTick } from 'vue'
    /**
     * 星點資料：
     *  - x, y：百分比座標 0~100
     *  - size：字體大小（星星視覺大小）
     *  - label：名稱
     *  - mag：星等
     *  - img：（可選）資訊卡要顯示的圖片
     */
    const stars = ref([
        { x: 34, y:  6, size: 20, label: '北極星', mag: 2 },
        { x: 56, y: 35, size: 30, label: '織女星', mag: 0.03 },
        { x: 38, y: 66, size: 40, label: '老人星', mag: -0.74 },
        { x: 62, y: 94, size: 50, label: '天狼星', mag: -1.46 },
    ])

    /* ---------- 點星顯示資訊卡 ---------- */
    // const activeIdx = ref(null)                  // 目前被點擊的星索引
    // const openCard  = (i) => { activeIdx.value = i }
    // const cardStyle = computed(() => {           // 卡片定位在該星右下角一點
    //     if (activeIdx.value === null) return {}
    //     const s = stars.value[activeIdx.value]
    //         return {
    //             left: `calc(${s.x}% + 40px)`,
    //             top:  `calc(${s.y}% + 20px)`,
    //     }
    // })

    /** 畫折線用的 points */
    const points = computed(() => stars.value.map(s => `${s.x},${s.y}`).join(' '))

    /** DOM 參照：外層容器 & 亮線 polyline */
    const wrap = ref(null)            // 目前滑鼠「亮到第幾顆」（-1 代表都沒亮）
    const poly = ref(null)            // 亮線 polyline，用來量線長
    const justLit  = ref(new Set())   // 剛被點亮、用來觸發一次性動畫

    /** 互動狀態 */
    const litIndex = ref(-1)        // 目前滑鼠「亮到第幾顆」（-1 代表都沒亮）
    const sticky   = ref(new Set()) // 永久點亮的索引集合（每顆滑過就加入）

    /** 剛亮起時，標記一次，跑完動畫後移除 */
    function tagJustLit(i) {
        if (justLit.value.has(i)) return
        justLit.value.add(i)
        // 動畫時間加長，這裡要和 CSS 動畫時間對齊 (1.1s ~ 1.3s)
        setTimeout(() => justLit.value.delete(i), 1300)
    }

    /** 取得滑鼠相對畫布的「y 百分比」 */
    function yPercentFromEvent (e) {
        const r = wrap.value.getBoundingClientRect()
        const p = ((e.clientY - r.top) / r.height) * 100
        // 限制在 0~100 範圍
        return Math.max(0, Math.min(100, p))
    }

    /** 進場就先算一次，避免一開始沒有反應 */
    function onEnter (e) {
        onMove(e)
    }

    /** 核心：滑動時計算應點亮到哪一顆，並把經過的星加入 sticky / justLit */
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
            if (i >= 0 && !sticky.value.has(i)) {
                sticky.value.add(i)
                tagJustLit(i)                    // 第一次亮起的彈出動畫
            }
        }
    }

    /** 離開畫布：目前亮度清掉，但 sticky 保留（已滑過的還是亮） */
    function onLeave () {
        litIndex.value = -1
    }

    /* ----------------- 亮線動畫 ----------------- */
    const pathLen = ref(0)                 // polyline 總長度
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

    /** 進度索引 = max(目前亮到, 歷來最遠) */
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
        ? { strokeDasharray: `${len}`, strokeDashoffset: `${len - len * progress.value}` }
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
            <!-- 線條：底線 + 亮線 -->
            <svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <!-- 底線：淡淡的固定線 -->
                <polyline :points="points" class="line-base" />

                <!-- 亮線：用 dashoffset 做「從上往下逐漸點亮」 -->
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
                .lit：即時亮(i <= litIndex) 或 已永久亮(sticky.has(i))
                .just：剛被點亮的一瞬間，跑一次彈出動畫
                -->
                <div
                    class="star"
                    :class="{ lit: i <= litIndex || sticky.has(i), just: justLit.has(i) }"
                    :style="{ fontSize: s.size + 'px' }"
                    
                    >
                    ★
                </div>
                <!-- @click="openCard(i)" --> <!---上方新增卡片-->

                <!-- 浮動資訊卡（放在 v-for 外面，只顯示一份）） -->
                <!-- <div
                    v-if="activeIdx !== null"
                    class="info-card"
                    :style="cardStyle"
                    @click.self="activeIdx=null"
                    >
                    <h4>
                       {{ stars[activeIdx].label }}（星等 {{ stars[activeIdx].mag }}）
                    </h4>
                    <img v-if="stars[activeIdx].img" :src="stars[activeIdx].img" alt="star" />
                </div> -->
            </div>
        </section>

    </div>
</template>



<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.wrapper{
    width: 100%;
    box-sizing: border-box;
    background-color: $bgColor-shop;
}
/* 星等圖 */
.constellation{
    position: relative;
    width:  min(560px, 84vw);
    height: clamp(520px, 120vw, 980px);
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
}
/* 線條 */
.lines{
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}
.line-base{
    fill: none;
    stroke: rgba(255,255,255,.28);
    stroke-width: .9;   /* 略粗一點，對比更明顯 */
}
.line-active{
    fill: none;
    stroke: #fffbea;                             /* 更亮的暖白色 */
    stroke-width: 1.05;                            /* 更粗一點 */
    /* dash 動畫時間 + 線性曲線 */
    transition: stroke-dashoffset .85s cubic-bezier(.22,.61,.36,1);
    /* glow 效果 */
    filter: drop-shadow(0 0 6px rgba(255,245,150,.65))
            drop-shadow(0 0 12px rgba(255,245,150,.35));
}
/* 星點與標籤 */
.node{
    position: absolute;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
}
/* 星星：預設更暗，對比更大 */
.star{
    position: relative;                   /* 讓 ::before 可當光暈 */
    line-height: 1;
    color: #f5d54f; /* 金黃 */
    opacity: .08;                               /* 更暗起 */
    filter: brightness(.35) saturate(.4) blur(.15px);     /* 更暗更灰 */
    transform: scale(.92);                      /* 更小一點，點亮時才跳出 */
    /* 暗到亮過渡時間拉長 */
    transition:
        opacity .8s cubic-bezier(.22,.61,.36,1),
        filter  .8s cubic-bezier(.22,.61,.36,1),
        transform .8s cubic-bezier(.22,.61,.36,1);
    text-shadow: 0 1px 2px rgba(0,0,0,.45);
    // pointer-events:auto;            /* 確保可點擊（父層不擋事件） */
}
/* 光暈層：暗時小、亮時會放大 */
.star::before{
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center,
                rgba(255,230,120,.0) 0%,
                rgba(255,230,120,.0) 55%,
                rgba(255,230,120,.0) 100%);
    transition: all .9s cubic-bezier(.22,.61,.36,1);
    pointer-events: none;
}
/* 點亮後（持續狀態） */
.star.lit{
    opacity: 1;
    filter: brightness(1.55) saturate(1.15);
    transform: scale(1.08);
}
/* 點亮後光暈更明顯（持續狀態） */
.star.lit::before{
    inset: -14px;
    background: radial-gradient(ellipse at center,
              rgba(255,233,140,.25) 0%,
              rgba(255,233,140,.16) 40%,
              rgba(255,233,140,.0) 75%);
}
/* 首次點亮時跑「彈出 + 強光」動畫（一次） */
.star.just{
    animation:
        pop .95s cubic-bezier(.16,.84,.32,1) both,
        halo 1.25s ease-out both;
}
@keyframes pop{
    0%   { transform: scale(.90); filter: brightness(.6) saturate(.6); }
    45%  { transform: scale(1.20); filter: brightness(1.9) saturate(1.4); }
    70%  { transform: scale(1.05); }
    100% { transform: scale(1.08); }
}
@keyframes halo{
    0%   { box-shadow: 0 0 0 rgba(255,240,160,0); }
    30%  { box-shadow: 0 0 24px 8px rgba(255,240,160,.45); }
    100% { box-shadow: 0 0 14px 4px rgba(255,240,160,.25); }
}
/* 卡片 */
// .info-card{
//     position: absolute;
//     transform: translate(-50%, -50%);
//     background: rgba(15,18,35,.86);
//     color: #fff;
//     padding: 12px 14px;
//     border-radius: 10px;
//     box-shadow: 0 10px 30px rgba(0,0,0,.45);
//     min-width: 180px;
//     pointer-events: auto;    
// }
// .info-card img{
//     display:block;
//     width: 220px;
//     margin-top: 8px;
//     border-radius: 8px;
// }
</style>

