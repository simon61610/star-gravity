<script setup>
	import { ref } from 'vue';

    // 資料
	const productsCate = ref([
		{name: '天文望遠鏡', items: ['基礎入門型', '進階專業型']},
		{name: '雙筒/單筒望遠鏡', items: ['單筒望遠鏡', '雙筒望遠鏡']},
		{name: '腳架', items: ['一般三腳架', '天文三腳架']},
		{name: '配件', items: ['星座盤', '指北針', '紅光手電筒']},
		{name: '書籍/小物', items: ['觀星教學書籍', '星空小物']},
	])

	// 預設是 false，先關起來，目前陣列長度固定，待修改
	const isShow = ref([false, false, false, false, false])

	// toggle 處理函數
	const toggleCategory = (index) => {
		isShow.value[index] = !isShow.value[index]
	}

</script>

<template>
    <aside class="cate-list">
        <h2>分類</h2>
        <div class="cate-products">
          	<div class="cate-products__area" v-for="(category, index) in productsCate">
              <h3 
                class="cate-products__area__name"
                :class="{open: isShow[index]}"
                @click="toggleCategory(index)"
              >
                {{ category.name }}
              </h3>
                <transition name="slide">
                  <ul class="product-items" v-if="isShow[index]">
                    <li v-for="item in category.items">{{ item }}</li>
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
				cursor: pointer;
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
                        transition: transform 0.6s ease; // 加過渡動畫
                    }

                    // JS 控制 class open 為 true/false
					&.open::after {
                    	transform: translateY(-50%) rotate(135deg); // 箭頭向下
					}
    
                    // 旋轉效果測試
                    // &:hover::after {
                    //     transform: translateY(-50%) rotate(135deg); // 箭頭向下
                    // }

                    // hover 效果
                    &:hover {
                        text-decoration: underline;
                    }
                }
    
                .product-items {
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

	/* 展開收合動畫 */
	.slide-enter-from,
	.slide-leave-to {
	max-height: 0;
	opacity: 0;
	}
	.slide-enter-to,
	.slide-leave-from {
	max-height: 500px;
	opacity: 1;
	}
	.slide-enter-active,
	.slide-leave-active {
	transition: all 0.6s ease;
	}
</style>