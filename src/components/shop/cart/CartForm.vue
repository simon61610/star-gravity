<script setup>
    import { ref } from 'vue'
    
    // 商品假資料 => 要改用 storage 傳入
    const productDetail = ref(
        [
            {
                name: '輕巧觀測鏡｜50mm 入門型牛頓式望遠鏡',
                price: 2500,
                specialprice: 2000,
                pic: 'https://placehold.co/80x80',
            },
            {
                name: '輕巧觀測鏡｜50mm 兒童型牛頓式望遠鏡',
                price: 2000,
                specialprice: 1600,
                pic: 'https://placehold.co/80x80',
            },
            {
                name: '輕巧觀測鏡｜50mm 進階型牛頓式望遠鏡',
                price: 3000,
                specialprice: 2400,
                pic: 'https://placehold.co/80x80',
            },
        ]
    )

    const products = productDetail.value

    
</script>




<template>
    <section class="checkout-section">

        <!-- ---------------- 訂單明細 ---------------- -->
        <section class="cart-list">

            <h1>訂單明細</h1>

            <!-- 收合標題 -->
            <div class="toggle-total">
                <p class="total">合計：NT$6,060</p>
                <p class="count">購物車(3件)</p>
            </div>

            <div class="toggle-content">
                <!-- 商品細項 -->
                <ul class="items">
                    <li class="item" v-for="(product, index) in products">
                        <!-- 圖片 -->
                        <img :src="product.pic" alt="" class="item__img">
    
                        <!-- 商品資訊和計算 -->
                        <div class="item__info">
                            <h2 class="item__info__name">{{ product.name }}</h2>
                            <div class="item__info__price">
                                <div class="price-per-item">
                                    <p class="price">NT${{ product.price }}</p>
                                    <p class="spe-price">NT${{ product.specialprice }}</p>
                                </div>
                                <p class="sub-count">數量：1 件</p>
                                <p class="sub-price">小計：NT$2000</p>
                            </div>
                        </div>
                    </li>
                </ul>
    
                <!-- 金額統計 -->
                <div class="cal-box">
                        <p><span>合計</span><span>NT$6000</span></p>
                        <p><span>運費</span><span>NT$60</span></p>
                        <p><span>總計</span><span>NT$6060</span></p>
                </div>

                <div class="toggle-inside">
                    <div class="arrow-inside"></div>
                </div>

            </div>


        </section>


    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .checkout-section {
        // --------- 上方: 購物清單 ---------
        .cart-list {
            padding-bottom: 60px;
            h1 {
                font-size: $pcChFont-H4;
                font-weight: bold;
                background-color: #f0f0f0;
                color: #888;
                text-align: center;
                padding: 16px 0;
                margin-bottom: 12px;
            }

            .toggle-total {
                border: 1px solid #ccc;
                padding: 16px 0;
                text-align: center;
                cursor: pointer;

                .total {
                    font-size: $pcChFont-H3;
                    font-weight: bold;
                    padding-bottom: 16px;
                }
                .count {
                    font-size: $pcChFont-H4;
                    color: #888;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &::after {
                        content: "";
                        display: inline-block;
                        margin-left: 8px;
                        width: 8px;
                        height: 8px;
                        border-top: 3px solid #888;
                        border-right: 3px solid #888;
                        transform: rotate(-45deg);
                        transform-origin: center center;
                        transition: all .3s ease;
                        position: relative;
                        top: 2px;
                        
                    }

                }

                // 箭頭旋轉模擬
                /* &:hover .count {
                    &::after {
                        transform: rotate(135deg);
                    }
                } */
            }
            .toggle-content{
                display: flex;
                flex-direction: column;
                .items{
                    .item{
                        padding: 16px 0;
                        border-bottom: 2px solid #ccc;
    
                        // border: 1px solid red;
                        display: flex;
                        align-items: center;
                        &__img { // 圖片
                            display: block;
                        }
                        &__info { // 商品名稱與金額
                            display: flex;
                            gap: 20px;
                            align-items: center;
                            // border: 1px solid red;
                            flex-grow: 1;
    
    
                            &__name {
                                padding-left: 40px;
                                font-size: $pcChFont-H4;
                                line-height: 1.2;
                            }
                            &__price {
                                display: flex;
                                // border: 1px solid blue;
                                flex-grow: 1;
                                justify-content: space-between;
                                // gap: 32px;
                                align-items: center;
                                .price-per-item {
                                    display: flex;
                                    gap: 12px;
                                    flex-direction: column;
                                    text-align: center;
                                    padding-left: 60px;
                                    .price {
                                        font-size: $pcChFont-H4;
                                    }
                                    .spe-price {
                                        text-decoration: line-through;
                                        color: #888;
                                    }
                                }
                                .sub-count, .sub-price {
                                    font-size: $pcChFont-H4;
                                }
                            }
                        }
                    }
                }
                .cal-box {
                    align-self: flex-end;
                    width: 360px;
                    padding-top: 32px;
                    font-size: $pcChFont-H4;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    p {
                        display: flex;
                        justify-content: space-between;
    
                        &:last-child{
                            padding: 32px 0;
                            border-top: 1px solid #888;
                        }
                    }
                }
                .toggle-inside {
                    cursor: pointer;
                    border: 1px solid #ccc;
                    padding: 16px 0;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .arrow-inside {
                        width: 8px;
                        height: 8px;
                        border-top: 3px solid #888;
                        border-right: 3px solid #888;
                        transform: rotate(-45deg);
                        position: relative;
                        top: 3px;
                        
                    }
                }
            }
        }
    }

</style>