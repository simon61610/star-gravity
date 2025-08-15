<script setup>
    // 組件
    import Pagination from '@/components/common/Pagination.vue';
    
    // 方法
    import { ref, computed } from 'vue'
    import { makeProductsMock } from '@/data/productsMock'

    

    // ------------------------ 生成假資料 ------------------------
    const items = ref(makeProductsMock(220)) 
    // console.log(items)

    // ------------------------ Pagination 的變數 ------------------------
    const currentPage = ref(1) // 預設第一頁
    const pageSize= ref(16) // 每頁顯示幾筆

    // 切分頁
    const showItems = computed (() => {
        const start = (currentPage.value - 1) * pageSize.value // 從第幾筆開始
        return items.value.slice(start, start + pageSize.value) // 顯示的商品陣列
    })


</script>

<template>
    <section>
        <div class="product-items">
            <div class="item__card" v-for="( item, index ) in showItems"> <!-- 用顯示的商品陣列跑 v-for -->
                <img :src="item.image" alt="商品假圖" class="item__card__img">
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
                :total="items.length"
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
            cursor: pointer;
            text-align: center;
            padding: 4px;

            &__img {
                margin-bottom: 16px;
                display: block;
            }
            &__text {
                padding: 0 16px;
                &--name {
                    font-size: $pcChFont-H4;
                    margin-bottom: 12px;
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