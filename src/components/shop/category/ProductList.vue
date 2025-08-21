<script setup>
    // 組件
    import Pagination from '@/components/common/Pagination.vue';
    // 方法
    import { ref, watch, computed } from 'vue'
    // 假資料
    import products from '@/data/products';
    
    // 父傳子接收: Proxy(Object) {main: '天文望遠鏡', sub: '基礎入門型'}
    const props = defineProps({
        selectedCate: {
            type: Object,
            default: null,
        }
    })
    // console.log(props.selectedCate)

// -------------------------------------------------------------------------------

    const items = ref(products) // 生成假資料
    // console.log(items)
    const currentPage = ref(1) // 預設第一頁
    const pageSize= ref(16) // 每頁顯示幾筆

// -------------------------------------------------------------------------------
    // 分類重選，回到第一頁
    // watch(偵測的資料, 函數)
    watch(() => props.selectedCate, () => {
        currentPage.value = 1
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' // 平滑滾動 
        })
    })

    // =====================================================
    // ==================== 商品類型篩選 ====================
    // =====================================================
    const filteredItems = computed(() => {
        // 判斷有沒有選
        if(!props.selectedCate){
            return items.value
        }else {
            return items.value.filter((product) => {
                // 商品分類名稱相等
                return product.category.main === props.selectedCate.main && product.category.sub === props.selectedCate.sub
            })
        }
    })

    // =====================================================
    // ==================== Pagination =====================
    // =====================================================
    // 每頁顯示的商品
    const showItems = computed (() => {
        const start = (currentPage.value - 1) * pageSize.value // 從第幾筆開始
        return filteredItems.value.slice(start, start + pageSize.value) // 顯示的商品陣列
    })
</script>

<template>
    <section>
        <div class="product-items">
            <div class="item__card" v-for="( item, index ) in showItems"> <!-- 用顯示的商品陣列跑 v-for -->
                <img :src="item.pic" alt="商品假圖" class="item__card__img">
                <div class="item__card__text">
                    <h1 class="item__card__text--name">{{ item.name }}</h1>
                    <h2 class="item__card__text--price">NT$ {{ item.price }}</h2>
                    <div class="item__card__text--cart-btn">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </div>
                </div>
            </div>
        </div>
        <div>  
            <Pagination
                v-model="currentPage"
                v-model:pageSize="pageSize"
                :total="filteredItems.length"
            />
        </div>
    </section>
</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .product-items {
        color: white;
        display: flex;
        flex-wrap: wrap;
        gap: 40px;

        .item__card {
            border: 1px solid red;
            max-width: 200px;
            cursor: pointer;
            text-align: center;
            padding: 4px;

            &__img {
                margin-bottom: 16px;
                display: block;
                width: 200px;
                height: 200px;
                object-fit: cover;
            }
            &__text {
                padding: 0 16px;
                &--name {
                    font-size: $pcChFont-H4;
                    margin-bottom: 12px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                &--price {
                    font-size: $pcChFont-p;
                    margin-bottom: 16px;
                }
                // 購物車按鈕
                &--cart-btn {
                    border: 2px solid white;
                    border-radius: 8px;
                    font-size: 16px;
                    padding: 6px 0;
                    transition: all 0.3s ease;

                    // 購物車按鈕 hover 效果
                    &:hover {
                        border: 2px solid $primaryColor-500;
                        color: $primaryColor-500;
                    }
                }
            }
        }
    }
</style>