<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const member_id = computed(() => route.query.member_id)
    const order_id = computed(() => route.query.order_id)

    onMounted(() => {
        console.log(member_id.value)
        console.log(order_id.value)
    })


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
    <section class="success-section">
        <!-- 購物成功文字 -->
        <section class="show-success">
            <div class="success-icon">
                <img src="@/assets/icons/checkout-success.svg" alt="">
                <h2>已經收到您的訂單</h2>
            </div>
            <h1 class="order-number">訂單編號：{{ order_id }}</h1>
            <h3 class="member-center">查詢所有訂單，請至<span>會員中心</span></h3>
        </section>

        <!-- 客戶提醒 -->
        <section class="customer-notices">
            <div class="text-box">
                <h3>【 感謝您的惠顧 】</h3>
                <ul>
                    <li>商品配送過程中如遇天候、交通或其他不可抗力因素，可能導致延遲送達，敬請理解並耐心等候，建議預留彈性時間。</li>
                    <li>收件時請務必確認包裝是否完整，如有破損或異常，請立即拍照並與客服聯繫，以保障您的權益。</li>
                </ul>
                <h3>【 詐騙猖獗，小心詐騙 】</h3>
                <p>請留意近期詐騙猖獗，若接獲自稱客服或銀行來電，要求提供帳號密碼或轉帳匯款，務必提高警覺，以免受騙上當。</p>
            </div>
        </section>

        <!-- 購物明細 -->
        <section class="shopping-details">
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
                </div>
        </section>

        <!-- 按鈕區 -->
        <section class="btn-box">
            <router-link to="/" class="router-link">
                <p class="back-home">回到首頁</p>
            </router-link>
            <router-link to="/shop/category" class="router-link">
                <p class="back-shop">繼續購物</p>
            </router-link>
        </section>
    </section>
</template>



<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    // 共用
    .router-link {
        text-decoration: none;
    }

    .success-section {
        padding: 20px 24px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;

        // ----- 購物成功文字 -----
        .show-success {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            .success-icon {
                text-align: center;
                img {
                    display: inline-block;
                    margin-bottom: 20px;
                }
                h2 {
                    font-weight: bold;
                    font-size: $pcChFont-H2;
                    color: $primaryColor-500;
                }
            }
            .order-number {
                font-size: $pcChFont-H1;
            }
            .member-center{
                font-size: $pcChFont-H4;
                span {
                    color: $secondaryColor-orange;
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

        }

        // ----- 客戶提醒 -----
        .customer-notices {
            padding: 16px 0;
            border-top: 2px solid #ccc;
            border-bottom: 2px solid #ccc;
            .text-box {
                background-color: $primaryColor-500;
                color: white;
                line-height: 1.5;
                font-size: $pcChFont-H4;
                padding: 24px;
                h3 {}
                ul {
                    padding-left: 32px;
                    margin-bottom: 12px;
                    li {
                        list-style-type: decimal;
                    }
                }
                p {
                    padding-left: 12px;
                }
            }
        }

        // ----- 購物明細 -----
        .shopping-details {
            align-self: stretch;
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
            }
        }

        // ----- 按鈕 -----
        .btn-box {
            font-size: $pcChFont-H4;
            display: flex;
            justify-content: center;
            gap: 60px;
            .back-home, .back-shop {
                padding: 12px 0;
                width: 320px;
                border-radius: 999px;
                text-align: center;
                cursor: pointer;
            }
            .back-home {
                color: #888;
                border: 1px solid #888;
            }
            .back-shop {
                color: white;
                background-color: $secondaryColor-orange;
                &:hover {
                    background-color: $primaryColor-900;
                }
            }
        }
    }

    @media screen and (max-width: 431px) {
        .success-section {
            padding: 20px 24px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;

            // ----- 購物成功文字 -----
            .show-success {
                .success-icon {
                    img {
                        width: 100px;
                    }
                    h2 {
                    }
                }
                .order-number {
                    font-size: 24px;
                }
                .member-center{
                    span {
                    }
                }

            }

            // ----- 客戶提醒 -----
            .customer-notices {
                .text-box {
                    font-size: 16px;
                    h3 {}
                    ul {
                        li {
                        }
                    }
                    p {
                    }
                }
            }



            // ----- 購物明細 -----
            .shopping-details {
                align-self: stretch;
                .toggle-content{
                    .items{
                        .item{
                            gap: 20px;
                            &__img { // 圖片
                                display: block;
                            }
                            &__info { // 商品名稱與金額
                                align-items: flex-start;
                                flex-direction: column;
        
        
                                &__name {
                                    padding-left: 12px;
                                }
                                &__price {
                                    padding-left: 12px;
                                    align-items: start;
                                    flex-direction: column;
                                    gap: 12px;
                                    .price-per-item {
                                        display: flex;
                                        gap: 12px;
                                        flex-direction: row;
                                        text-align: left;
                                        padding-left: 0;
                                        .price {
                                            font-size: $pcChFont-H4;
                                        }
                                        .spe-price {
                                            text-decoration: line-through;
                                            color: #888;
                                        }
                                    }
                                    .sub-count, .sub-price {
                                        font-size: 20px;
                                    }
                                }
                            }
                        }
                    }
                    .cal-box {
                        width: 100%;
                        p {
                        }
                    }
                    .toggle-inside {

                        .arrow-inside {
                        }
                    }
                }
            }

            // ----- 按鈕 -----
            .btn-box {
                flex-direction: column;
                gap: 20px;
                .back-home, .back-shop {
                    flex-basis: 100%;
                }
                .back-home {
                }
                .back-shop {
                }
            }
        }
    }


</style>