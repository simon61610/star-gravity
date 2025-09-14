<script setup>

    import { ref } from 'vue';
    import bus from '@/composables/useMitt';

    const keyword = ref("") // 輸入
    const priceOrder = ref('')
    

    const doSearch = () => {
        bus.emit('searchKeyword', keyword.value)
    }

    const doPriceOrder = () => {
        bus.emit('priceOrder', priceOrder.value)
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
            <select class="qty-orderby">
                <option value="">每頁顯示 24 筆</option>
                <option value="">每頁顯示 16 筆</option>
                <option value="">每頁顯示 8 筆</option>
            </select>
        </div>
    </section>
</template>

<style scoped lang="scss">
    .tool-bar-section {
        padding-right: 12px;
        // border: 1px solid red;
        display: flex;
        justify-content: space-between;
        margin-bottom: 36px;
        .search-box {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            background-color: #fff;
            border-radius: 999px;
            width: 176px;
            padding: 8px 8px;
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
                
                option {
                    color: #000;
                }
            }
            
            .price-orderby{}
            .qty-orderby{}
        }
    }

    @media screen and (max-width: 431px){
        .tool-bar-section {
            padding-right: 0px;
            padding: 0 16px;
            // border: 1px solid red;
            flex-direction: column;
            align-items: stretch;
            justify-content: center;
            gap: 32px;
            .search-box {
                width: 100%;
                input {}
                .search-btn {
                    cursor: pointer;
                    i {}
                    &:hover {
                        i {}
                    }
                }

            }
            .select-box{
                flex-direction: column;
                gap: 32px;

                select {
                    width: 100%;
                    background-color: transparent;
                    font-size: 20px;
                    color: white;
                    // border: 1px solid green;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #ccc;
                    outline: none;
                    cursor: pointer;
                    
                    option {
                        color: #000;
                    }
                }
                
                .price-orderby{}
                .qty-orderby{}
            }
        }
    }



</style>