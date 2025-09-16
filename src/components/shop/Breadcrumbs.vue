<!-- 麵包屑 -->

<script setup>
    // 接收父層 ShopCategoryPage.vue 傳遞的屬性 + 值
    const props = defineProps({
        selectedCate: {
            type: Object,
            default: null,
        }
    })

    // 傳遞給父層事件
    const emit = defineEmits(['updateSelectedCate'])

    /* ========== 功能: 麵包屑分類點擊篩選商品 ========== */
    // 點擊全部商品
    const showAll = () => {
        emit('updateSelectedCate', null)
    }

    // 點擊 main 分類
    const showMain = () => {
        emit('updateSelectedCate', 
        {
            main: props.selectedCate.main,
            sub: null
        })
    }
</script>


<template>
    <nav class="breadcrumb">
        <ol>
            <li @click="showAll">全部商品</li>
            <li v-if="props.selectedCate?.main" @click="showMain">{{ props.selectedCate.main }}</li>
            <li v-if="props.selectedCate?.sub">{{ props.selectedCate.sub }}</li>
        </ol>
    </nav>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .breadcrumb {
        background-color: #39394A;
        ol {
            color: white;
            max-width: 1200px;
            padding: 16px;
            margin: 0 auto;

            display: flex;
            gap: 12px;

            li {
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }

                // 麵包屑箭頭，放在文字後面，除了最後一個
                &:not(:last-child)::after {
                    content: "";
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-top: 1px solid white;
                    border-right: 1px solid white;
                    color: white;
                    transform: translateY(-1px) rotate(45deg);
                    margin-left: 8px;
                }
            }
        }
    }
</style>