<script setup>
import { ref } from 'vue'

const props = defineProps({
  constellation: { type: Object, required: true }
})

// Tab 清單（之後要加/改只改這裡）
const tabs = [
  { key: 'intro',    label: '星座介紹' },
  { key: 'position', label: '星點位置' },
  { key: 'myth',     label: '神話故事' },
]

// 目前選中的分頁
const activeTab = ref('intro')
</script>

<template>
 <main class="scene" aria-label="星空互動場景">
  <aside class="card" aria-live="polite">
    <header class="card__hd">
      <div class="card__thumb">
        <img :src="constellation.image" alt="星座圖示" />
      </div>
    </header>

    <div class="card__title">
      <div class="card_icon">
        <img :src="constellation.icon" alt="星座圖示" />
      </div>
      <div class="card__name">{{constellation.name}}</div>
    </div>

    <!-- Tabs：由資料產生 + 高亮切換 -->
    <nav class="tabs" aria-label="卡片分頁">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tabs__btn"
        :class="{ 'tabs__btn--on': activeTab === tab.key }"
        type="button"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </nav>

    <!-- 內容區：依 activeTab 顯示（用 v-show 切換） -->
    <section class="card__body">
      <!-- 星座介紹 -->
      <p class="card__text" v-show="activeTab === 'intro'">
        {{ constellation.tabs.intro }}
      </p>

      <!-- 星點位置（示例：列表/小表格都可以） -->
      <div v-show="activeTab === 'position'">
        <ul>
          <li v-for ="(data,i) in constellation.tabs.position.list" :key="i">
            {{ data.label }} : {{data.value}}
          </li>
          
          <!-- <li>赤經：約 2h40m</li>
          <li>赤緯：約 +20°</li>
          <li>象線：由主星 α(嬰兒座α)～γ 等連成典型羊角形</li> -->
        </ul>
        <p class="card__text">{{ constellation.tabs.desc }}</p>
      </div>

      <!-- 神話故事 -->
      <p class="card__text" v-show="activeTab === 'myth'">
        {{ constellation.tabs.myth }}
      </p>
    </section>
  </aside>

  <!-- 右側畫布（保持原樣；若要依 Tab 切換圖，也可加 v-show/v-if） -->
  <div class="canvas">
    <div class="sky">
      <img class="figure" :src="constellation.bg" alt="牡羊座輪廓" />
    </div>
  </div>
 </main>
</template>


<style scoped lang="scss">

/* 版面 */
.scene {
  position: relative;
  width: 100%;
  min-height: 588px;
  overflow: hidden;
  
}
.bg {
  position: absolute; 
  inset: 0;
  width: 100%; 
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.hill {
  position: absolute; 
  left: 0; 
  right: 0; 
  bottom: 0;
  width: 100%;
  object-fit: cover;
  z-index: 1;
}

/* 左側卡片 */
.card {
  position: absolute; 
  left: 168px; 
  top: 55px;
  width: 280px;
  height: 450px;
  background: rgba(15,22,46,.7);
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 16px;
  backdrop-filter: blur(2px);
  color: #fff;
  z-index: 3;
  padding: 24px;

  @media (max-width: 750px) {
    left: 12px; 
    right: 12px; 
    width:auto; 
    top: 12px;
  }
    
}

.card__hd{ 
  margin-bottom:8px;
  padding: 10px 20px;
  margin: 0 auto;
  display: flex;
  align-items:center;
  justify-content: center;
}

.card__thumb{ 
  width:200px;
  height:220px;

}

.card__glyph{ 
  font-size:20px; 
  opacity:.8;
}

.card__name{ 
  font-size:36px; 
  
}

.tabs{ display:flex;
  gap:8px;
  margin:8px 0 12px; 
}

.tabs__btn{
  flex:1; padding:6px 8px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06);
  color:#fff; font-size:12px;
  &:hover{
    cursor: pointer;
  }
}


.tabs__btn--on{
  background:#7a6cff;
  border-color:#7a6cff; 
}

.card__body{ 
  font-size:13px; 
  line-height:1.6;
}

.card__title{
display: flex;
align-items:center;
justify-content: center;
}

/* 右側舞台（寬高固定，便於放 PNG） */
.stage{
  position:absolute; left: 320px; right: 24px; top: 72px; bottom: 48px;
  z-index: 2;
  width: min(1200px, 100%);
  height: 600px;
  // margin-left: auto;
  // margin-right: 0;
  right: 0;
  left: 0;
  margin: auto;
}

.figure{
  position:absolute; inset:0;
  width: 80%; height: 80%;
  object-fit: contain;
  padding-left: 350px;
  padding-top: 67px;
}

/* 星點（PNG，先手動定位） */
.star{

}

/* 控制鈕（純樣式） */
.ctrls{
  position:absolute; right: 24px; top: 24px; z-index:4;
  display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end;
}
.ctrls__btn{
  display:inline-flex; 
  align-items:center; gap:6px;
  padding:8px 12px; 
  font-size:13px; color:#fff;
  border-radius: 999px;
  backdrop-filter: blur(4px);
}
.ctrls__btn img{ width:16px; height:16px; object-fit:contain; }
.ctrls__btn--ghost{ background:transparent; }

/* RWD */
@media (max-width: 750px) {
   .stage{ left: 12px; right: 12px; top: 220px; height: 420px; }
  .ctrls{ right: 12px; top: 12px; }
  .star{ width: 10px; height: 10px; }
}
</style>
