<!-- 商品分類工具列: 包含搜尋商品、價格排序、顯示數量控制 -->

<script setup>
    import { ref } from 'vue';

    /* ========== 套件 ========== */
    import bus from '@/composables/useMitt';

    /* ========== 功能: 商品搜尋、價格排序、顯示數量控制 ========== */
    const keyword = ref("")         // 商品搜尋關鍵字
    const priceOrder = ref('')      // 價格排序
    const qtyPerPage = ref('16')    // 預設每頁顯示 16 筆
    
    const doSearch = () => {
        bus.emit('searchKeyword', keyword.value)
    }
    const doPriceOrder = () => {
        bus.emit('priceOrder', priceOrder.value)
    }
    const doQtyChange = () => {
        bus.emit('qtyChanege', qtyPerPage.value)
    }
</script>


<template>
    <section class="tool-bar-section">
        <div class="search-box">
            <input type="text" placeholder="搜尋商品..." v-model.trim="keyword" @keyup="doSearch">
            <div class="search-btn" @click="doSearch">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
        <div class="select-box">
            <select class="price-orderby" v-model="priceOrder" @change="doPriceOrder">
                <option value="">最新上架</option>
                <option value="asc">價格由低到高</option>
                <option value="desc">價格由高到低</option>
            </select>
            <select class="qty-orderby" v-model="qtyPerPage" @change="doQtyChange">
                <option value="24">每頁顯示 24 筆</option>
                <option value="16">每頁顯示 16 筆</option>
                <option value="8">每頁顯示 8 筆</option>
            </select>
        </div>
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .tool-bar-section {
        padding-right: 12px;
        // border: 1px solid red;
        display: flex;
        justify-content: space-between;
        margin-bottom: 36px;

        @include respond('sm'){
            padding-right: 0px;
            padding: 0 16px;
            // border: 1px solid red;
            flex-direction: column;
            align-items: stretch;
            justify-content: center;
            gap: 32px;
        }

        .search-box {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            background-color: #fff;
            border-radius: 999px;
            width: 176px;
            padding: 8px 8px;
            
            @include respond('sm'){
                width: 100%;
            }

            input {
                // flex: 1;
                border: none;
                outline: none;
                width: 100%;
                padding: 4px 8px;
                font-size: 16px;
            }
            .search-btn {
                font-size: 20px;
                cursor: pointer;
                i {
                    color: #888;
                }

                &:hover {
                    i {
                        color: #5e5e5e;
                    }
                }
            }

        }
        .select-box{
            // border: 1px solid green;
            display: flex;
            gap: 32px;

            @include respond('sm'){
                flex-direction: column;
                gap: 32px;
            }

            select {
                width: 200px;
                background-color: transparent;
                font-size: 20px;
                padding-right: 24px;
                color: white;
                border: none;
                border-bottom: 1px solid #ccc;
                // border: 1px solid red;
                outline: none;
                cursor: pointer;

                @include respond('sm'){
                    width: 100%;
                    padding-bottom: 12px;
                }
                
                option {
                    color: #000;
                }
            }
            .price-orderby{}
            .qty-orderby{}
        }
    }
</style>