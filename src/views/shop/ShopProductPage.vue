<!-- 單一商品頁 -->
<!-- 待完成
1. 圖片先靜態，待改用程式方式引入 
2. thumbs 的 li 要用 v-for 產出
3. 寫上 thumbs 點擊後切換圖片的功能
4. 寫上圖片超出要能滑動的功能
5. 加上商品資料的綁定
-->

<script setup>
    import { ref, reactive } from 'vue'

    // 組件
    import ShopBanner from '@/components/shop/ShopBanner.vue';
    import Breadcrumbs from '@/components/shop/Breadcrumbs.vue';
    import AccordionItem from '@/components/common/AccordionItem.vue';

    // 資料
    const productDetail = reactive({
        name: '輕巧觀測鏡｜50mm 入門型牛頓式望遠鏡',
        intro: '適合兒童的觀星好物，入門款天文望遠鏡，支援手機拍攝記錄',
        warranty: '望遠鏡單筆金額滿 2 萬元，享保固內免費清潔兩次，未滿則享保固內清潔一次。',
        discount: '現享8折好康優惠',
        price: 2500,
        specialprice: 2000,
    })


</script>


<template>
    <section class="product-page">
        <ShopBanner />
        <Breadcrumbs />
        <div class="container">
            <!-- 左：商品圖片 -->
            <div class="product-gallery">
                <div class="product-gallery__pic">
                    <img src="https://placehold.co/480x480" alt="">
                </div>
                <ul class="product-gallery__thumbs">
                    <li>
                        <img src="https://placehold.co/110x110" alt="">
                    </li>
                    <li>
                        <img src="https://placehold.co/110x110" alt="">
                    </li>
                    <li>
                        <img src="https://placehold.co/110x110" alt="">
                    </li>
                </ul>
            </div>

            <!-- 右：商品資訊 -->
            <div class="product-detail">
                <h1 class="product-detail__title">{{ productDetail.name }}</h1>
                <div class="detail-text">
                    <p class="detail-text__intro">{{ productDetail.intro }}</p>
                    <p class="detail-text__warranty">{{ productDetail.warranty }}</p>
                    <p class="detail-text__discount">{{ productDetail.discount }}</p>
                    <div class="product-price">
                        <p class="product-price__special">NT$ {{ productDetail.specialprice }}</p>
                        <p class="product-price__nospecial">NT$ {{ productDetail.price }}</p>
                    </div>
                    <p class="stock">尚有庫存</p>
                    <!-- 數量點擊增加的組件 -->
                </div>
                <div class="product-detail__btn">
                    <p class="product-detail__btn__add">
                        <i class="fa-solid fa-cart-shopping"></i>
                        加入購物車
                    </p>
                    <p class="product-detail__btn__follow">
                        <span class="heart-icon">
                            <i class="fa-regular fa-heart"></i> <!-- 空心 -->
                            <!-- <i class="fa-solid fa-heart"></i> --> <!-- 實心 -->
                        </span>
                        加入追蹤清單
                    </p>
                </div>
                
                <div>
                    <AccordionItem title="付款方式" :default-open="false" class="accordion">
                        <p>可選擇以 信用卡付款（支援 Visa、MasterCard、JCB 等主要信用卡）快速完成結帳，亦可選擇 貨到付款，於商品送達時再付款，讓您購物更安心便利。</p>
                    </AccordionItem>
    
                    <AccordionItem title="送貨方式" :default-open="false" class="accordion">
                        <p>商品將以宅配方式配送至您指定的地址，全台灣地區皆可送達。完成訂單後，我們將於 2–3 個工作天內安排出貨（不含例假日），並提供物流追蹤編號，讓您即時掌握配送進度。若遇特殊活動或偏遠地區，配送時間可能會有所調整，敬請見諒。</p>
                    </AccordionItem>
                </div>

                
            </div>

        </div>


        <!-- 下方商品介紹 -->
        <div class="product-info">

        </div>
    </section>
</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';
    .product-page {
        background-color: $bgColor-shop;

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 16px;

            display: flex;
            gap: 40px; 
    
            // ---------- 左：商品圖片 ----------
            .product-gallery {
                border: 1px solid green;
                
                // 商品照片
                &__pic {
                    img {
                        display: block;
                        margin-bottom: 20px;
                        max-width: 480px;
                        height: auto;
                        object-fit: cover;
                        aspect-ratio: 1 / 1;
                    }
                }
    
                // 商品縮圖
                &__thumbs {
                    border: 1px solid red;
                    display: flex;
                    gap: 20px;

                    li {
                        cursor: pointer;
                        img{
                            display: block;
                            object-fit: cover;
                        }
                    }
                }


            }

            // ---------- 右：商品資訊 ----------
            .product-detail {
                color: white;
                display: flex;
                flex-direction: column;
                gap: 28px;
                
                &__title {
                    font-size: $pcChFont-H1;
                    font-weight: bold;
                    line-height: 1.2;
                }

                .detail-text {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;

                    &__intro {
                        font-size: $pcChFont-H3;
                        line-height: 1.5;
                        padding-bottom: 16px;
                        border-bottom: 1px solid white;
                    }
                    &__warranty {
                        font-size: $pcChFont-H4;
                        padding-left: 20px;
                        border-left: 10px solid white;
                        line-height: 1.5;
                    }
                    &__discount {
                        align-self: flex-start;
                        font-size: $pcChFont-H4;
                        padding: 12px;
                        background-color: $primaryColor-500;
                    }
                }

                .product-price {
                    display: flex;
                    gap: 12px;
                    font-size: $pcChFont-H4;

                    p:last-child {
                        color: #ccc;
                        text-decoration: line-through;
                    }
                }

                .stock {
                    font-size: $pcChFont-H4;
                }

                // 購物車 & 追蹤按鈕
                &__btn {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;

                    &__add, &__follow {
                        font-size: $pcChFont-H3;
                        border-radius: 999px;
                        padding: 16px 0;
                        color: white;
                        text-align: center;
                        cursor: pointer;

                        i {
                            margin-right: 12px;
                        }
                    }
                    &__add {
                        background-color: $secondaryColor-orange;
                        transition: all .2s ease;

                        // hover
                        &:hover {
                            background-color: white;
                            color: $primaryColor-900;
                        }
                    }
                    &__follow {
                        background-color: transparent;
                        border: 1px solid white;
                        .fa-regular {
                            font-weight: 100 !important; // 因為被 main.scss 的全域影響，待處理
                        }
                    }
                }

                // 付款與送貨方式
                .accordion {
                    font-size: 20px;
                    line-height: 1.5;
                }
            }
        }
    }


</style>