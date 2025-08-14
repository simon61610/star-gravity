<script setup>
// Vue
import { ref } from 'vue'
// 組件
import Pagination from '@/components/common/Pagination.vue';
// 方法
import { makeProductsMock } from '@/data/productsMock'

// ----------------------------------------------------------
const items = ref(makeProductsMock(16)) // 生成假資料
console.log(items)


</script>

<template>
    <section>
        <div class="product-items">
            <div class="item__card" v-for="( item, index ) in items">
                <img :src="item.image" alt="商品假圖" class="item__card__img">
                <div class="item__card__text">
                    <h1 class="item__card__text--name">{{ item.name }}</h1>
                    <h2 class="item__card__text--price">NT$ {{ item.price }}</h2>
                    <div class="item__card__text--icon">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </div>
                </div>
            </div>
        </div>
        <div>  
            <Pagination/>
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
                &--icon {
                    border: 2px solid white;
                    border-radius: 8px;
                    font-size: 16px;
                    padding: 6px 0;
                    transition: all 0.3s ease;

                    &:hover {
                        border: 2px solid $primaryColor-500;
                        color: $primaryColor-500;
                    }
                }
            }
        }
    }
</style>