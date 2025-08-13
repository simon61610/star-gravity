<script setup>
</script>

<template>
    <aside class="cate-list">
        <h2>分類</h2>
        <div class="cate-products">
            <div class="cate-products__area">
                <h3 class="cate-products__area__name">天文望遠鏡</h3>
                <transition>
                    <ul class="products-name">
                        <li>基礎入門型</li>
                        <li>進階專業型</li>
                    </ul>
                </transition>
            </div>
            <div class="cate-products__area">
                <h3 class="cate-products__area__name">雙筒/單筒望遠鏡</h3>
                <transition>
                    <ul class="products-name">
                        <li>單筒望遠鏡</li>
                        <li>雙筒望遠鏡</li>
                    </ul>
                </transition>
            </div>
            <div class="cate-products__area">
                <h3 class="cate-products__area__name">腳架</h3>
                <transition>
                    <ul class="products-name">
                        <li>一般三腳架</li>
                        <li>天文三腳架</li>
                    </ul>
                </transition>
            </div>
            <div class="cate-products__area">
                <h3 class="cate-products__area__name">配件</h3>
                <transition>
                    <ul class="products-name">
                        <li>星座盤</li>
                        <li>指北針</li>
                        <li>紅光手電筒</li>
                    </ul>
                </transition>
            </div>
            <div class="cate-products__area">
                <h3 class="cate-products__area__name">書籍/小物</h3>
                <transition>
                    <ul class="products-name">
                        <li>觀星教學書籍</li>
                        <li>星空小物</li>
                    </ul>
                </transition>
            </div>
        </div>
    </aside>

</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .cate-list {
        width: 176px; // 暫定，要刪除
        color: $FontColor-white;

        h2 {
            font-weight: bold;
            font-size: $pcChFont-H4;
            padding: 20px 0;
            text-align: center;
            border-bottom: 3px solid $primaryColor-100;
            margin-bottom: 20px;
        }

        .cate-products {
            display: flex;
            flex-direction: column;
            gap: 32px;

            &__area {
                &__name {
                    // border: 1px solid red;
                    font-size: $pcChFont-H4;
                    font-weight: bold;
                    position: relative;
                    margin-bottom: 16px;
    
                    // 偽元素箭頭
                    &::after{
                        content: "";
                        display: block;
                        width: 12px;
                        height: 12px;
                        border-top: 3px solid white;
                        border-right: 3px solid white;
    
                        position: absolute;
                        top: 50%;
                        right: 0;
                        
                        transform-origin: center;
                        transform: translateY(-50%) rotate(45deg); // 箭頭向右
                        transition: transform 0.5s ease; // 加過渡動畫
                    }
    
                    // 旋轉效果測試
                    // &:hover::after {
                    //     transform: translateY(-50%) rotate(135deg); // 箭頭向右
                    // }
                }
    
                .products-name {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;

                    li {
                        font-size: $pcChFont-H4;

                        // 裝飾性方塊
                        &::before {
                            content: '';
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            background-color: $primaryColor-100;
                            margin-right: 12px;
                        }
                    }
                }
            }
        }
    }


</style>

<!-- GPT 版 -->
<!-- 
<script setup>
import { ref } from 'vue'

// 控制展開狀態的陣列
const openList = ref([false, false, false, false, false])

// 切換指定分類的展開狀態
const toggleCategory = (index) => {
  openList.value[index] = !openList.value[index]
}
</script>

<template>
  <aside class="cate-list">
    <h2>分類</h2>
    <div class="cate-products">
      <div
        v-for="(category, index) in [
          { name: '天文望遠鏡', items: ['基礎入門型', '進階專業型'] },
          { name: '雙筒/單筒望遠鏡', items: ['單筒望遠鏡', '雙筒望遠鏡'] },
          { name: '腳架', items: ['一般三腳架', '天文三腳架'] },
          { name: '配件', items: ['星座盤', '指北針', '紅光手電筒'] },
          { name: '書籍/小物', items: ['觀星教學書籍', '星空小物'] }
        ]"
        :key="index"
        class="cate-products__area"
      >
        <h3
          class="cate-products__area__name"
          :class="{ open: openList[index] }"
          @click="toggleCategory(index)"
        >
          {{ category.name }}
        </h3>

        <transition name="slide">
          <ul v-if="openList[index]" class="products-name">
            <li v-for="(item, i) in category.items" :key="i">{{ item }}</li>
          </ul>
        </transition>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.cate-list {
  width: 176px;
  color: $FontColor-white;

  h2 {
    font-weight: bold;
    font-size: $pcChFont-H4;
    padding: 20px 0;
    text-align: center;
    border-bottom: 3px solid $primaryColor-100;
    margin-bottom: 20px;
  }

  .cate-products {
    display: flex;
    flex-direction: column;
    gap: 32px;

    &__area {
      &__name {
        border: 1px solid red;
        font-size: $pcChFont-H4;
        font-weight: bold;
        position: relative;
        margin-bottom: 16px;
        padding-right: 20px;
        cursor: pointer;

        &::after {
          content: "";
          display: block;
          width: 12px;
          height: 12px;
          border-top: 3px solid white;
          border-right: 3px solid white;
          position: absolute;
          top: 50%;
          right: 0;
          transform-origin: center;
          transform: translateY(-50%) rotate(45deg); // 向右
          transition: transform 0.3s ease;
        }

        &.open::after {
          transform: translateY(-50%) rotate(135deg); // 向下
        }
      }

      .products-name {
        display: flex;
        flex-direction: column;
        gap: 16px;

        li {
          font-size: $pcChFont-H4;

          &::before {
            content: '';
            display: inline-block;
            width: 16px;
            height: 16px;
            background-color: $primaryColor-100;
            margin-right: 12px;
          }
        }
      }
    }
  }
}

/* 展開收合動畫 */
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 200px;
  opacity: 1;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
</style>
-->