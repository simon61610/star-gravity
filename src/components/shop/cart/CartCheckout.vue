<script setup>
    import { ref } from 'vue'

    // 組件
    import QtyControl from '../product/QtyControl.vue'


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

    const orderGuide = ref([
        "商品出貨時間約需 5–7 個工作天，若您無法等待，請斟酌再下單。",
        "宅配服務（黑貓）配送時間通常為 1–2 個工作天，如遇連續假期或重大節慶，恕無法指定送達日期與時段。",
        "本網站保留活動內容之 最終修改與解釋權利。",
        "若有任何疑問，歡迎於訂單留言或與客服聯繫，感謝您的支持！",
    ])

    const products = productDetail.value
    // console.log(products[0].name)
</script>


<template>
    <section class="checkout-section">

        <!-- ---------------- 上方: 購物清單 ---------------- -->
        <section class="cart-list">
            <h1>購物清單</h1>
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
                            <div class="qty-ctrl">
                                <QtyControl />
                            </div>
                            <p class="price-subtotal">小計：</p>
                        </div>
                    </div>

                    <!-- 刪除按鈕 -->
                    <div class="item__del-btn">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </li>
            </ul>
        </section>

        <!-- ---------------- 下方: 說明與訂單金額 ---------------- -->
        <section class="guide-box">
            <div class="guide-box__guide">
                <h2>訂購說明</h2>
                <ul>
                    <li v-for="guide in orderGuide">{{ guide }}</li>
                </ul>
            </div>
            <div class="guide-box__order">
                <h2>訂單資訊</h2>
                <div class="order-cal">
                    <div class="cal-box">
                        <p><span>合計</span><span>NT$6000</span></p>
                        <p><span>運費</span><span>NT$60</span></p>
                        <p><span>總計</span><span>NT$6060</span></p>
                    </div>
                    <router-link to="/cartpage/cartform" class="router-link">
                        <div class="goto-pay-btn">前往結帳</div>
                    </router-link>
                    <router-link to="/shop/category" class="router-link">
                        <div class="shop-btn">繼續購物</div>
                    </router-link>
                </div>
            </div>
        </section>
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    // 共用
    .router-link {
        text-decoration: none;
    }

    .checkout-section {
        // --------- 上方: 購物清單 ---------
        .cart-list {
            padding-bottom: 60px;
            h1 {
                font-size: $pcChFont-H4;
                font-weight: bold;
                color: #888;
                text-align: center;
                padding: 16px 0;
                border-bottom: 2px solid #ccc;

            }
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
                            justify-content: space-around;
                            // gap: 32px;
                            align-items: center;
                            .price-per-item {
                                display: flex;
                                gap: 12px;
                                flex-direction: column;
                                text-align: center;
                                .price {
                                    font-size: $pcChFont-H4;
                                }
                                .spe-price {
                                    text-decoration: line-through;
                                    color: #888;
                                }
                            }
                            .qty-ctrl {}
                            .price-subtotal {
                                
                            }
                        }
                    }
                    &__del-btn { // 刪除按鈕
                        width: 40px;
                        height: 40px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #ccc;
                        color: white;
                        font-size: 16px;
                        cursor: pointer;

                        margin-left: auto;

                        &:hover {
                            background-color: $primaryColor-900;
                        }
                    }
                }
            }
        }

        // --------- 下方: 說明與訂單金額 ---------
        .guide-box {
            display: flex;
            justify-content: space-between;
            // 訂購說明
            &__guide, &__order {
                padding: 20px;
                
                h2 {
                    font-size: $pcChFont-H4;
                    font-weight: bold;
                    margin-bottom: 24px;
                }
            }

            &__guide{
                flex-basis: 460px;
                h2 {}
                ul {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    padding-left: 20px;
                    li{
                        list-style-type: disc;
                        line-height: 1.5;
                        font-size: $pcChFont-p;
                    }
                }
            }

            // 訂單資訊
            &__order{
                flex-basis: 460px;
                background-color: #F0F0F0;
                border-radius: 28px;
                h2 {}
                .order-cal {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    .cal-box {
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
                    .goto-pay-btn, .shop-btn {
                    font-size: $pcChFont-H4;
                    padding: 12px 0;
                    text-align: center;
                    border-radius: 999px;
                    cursor: pointer;

                    }
                    .goto-pay-btn {
                        background-color: $secondaryColor-orange;
                        color: white;
                        &:hover {
                            background-color: $primaryColor-900;
                        }   
                    }
                    .shop-btn {
                        border: 1px solid #888;
                        color: #888;
                    }
                }
            }
        }
    }

</style>