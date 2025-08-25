<!-- 單一商品頁 -->
<!-- 待完成
1. 圖片先靜態，待改用程式方式引入 
2. thumbs 的 li 要用 v-for 產出
3. 寫上 thumbs 點擊後切換圖片的功能
4. 寫上圖片超出要能滑動的功能
5. 加上商品資料的綁定
6. Toast 訊息
7. 隨路由引入的商品名稱與內容待改
8. 等於 nul
-->

<script setup>
    import { ref, reactive, computed } from 'vue'
    import { useRoute } from 'vue-router';
    import bus from '@/composables/useMitt';
    import shopToast from '@/components/common/shopToast.vue';
    import { showToast } from '@/composables/useToast';

    // 假資料
    import products from '@/data/products';

    // 組件
    import ShopBanner from '@/components/shop/ShopBanner.vue';
    import Breadcrumbs from '@/components/shop/Breadcrumbs.vue';
    import AccordionItem from '@/components/common/AccordionItem.vue';
    // import QtyControl from '@/components/shop/product/QtyControl.vue';
    import ProdIntro from '@/components/shop/product/ProdIntro.vue';

    // 路由
    const route = useRoute()
    const product = computed(() => {
        return products.find((prod) => { return prod.id == route.params.id || null})
    })
    

    // 最開始切版的假資料
    /* const productDetail = reactive({
        name: '輕巧觀測鏡｜50mm 入門型牛頓式望遠鏡',
        desc: '適合兒童的觀星好物，入門款天文望遠鏡，支援手機拍攝記錄',
        promotion: '望遠鏡單筆金額滿 2 萬元，享保固內免費清潔兩次，未滿則享保固內清潔一次。',
        marketing: '現享8折好康優惠',
        price: 2500,
        specialprice: 2000,
    }) */


    // 收藏愛心切換
    const isFollow = ref(false)
    const followProduct = () => {
        isFollow.value = !isFollow.value
        
        if(isFollow.value){
            showToast('已加入收藏!')
        }
        if(!isFollow.value){
            showToast('已取消收藏!')
        }
    }

    // =====================================================
    // ==================== 加入購物車 ====================
    // =====================================================
    const storage = localStorage

    function addCart(product){
        if(!storage['addItemList']){
            storage['addItemList'] = ''
        }

        /* Storage 的 Key 和 Value */
        const itemId = `P${product.id}`
        const itemValue = `${product.name}|${product.pic}|${product.specialPrice}`

        // alert(itemValue) 
        // itemId => P1 
        // itemValue => 基礎入門型 商品 1|https://placehold.co/480x480?text=Product+1|9718
        // ===============================================================================

        /* 直接從物件中抓的資料字串 */
        const itemName = product.name // 基礎入門型 商品 1
        const itemPic = product.pic // https://placehold.co/480x480?text=Product+1
        const itemSpecialPrice = product.specialPrice // 9718
        // alert(itemSpecialPrice)

        // ===============================================================================
        
        if(storage[itemId]){ // 如果已經買過，價格累加
            let existInfo = storage[itemId].split('|') // 字串切割成陣列，用 split 方法
            // console.log(existInfo) ['基礎入門型 商品 1', 'https://placehold.co/480x480?text=Product+1', '9718']
            let existSpecialPrice = parseInt(existInfo[2]) // 原本的價格
            let newExistPrice = existSpecialPrice + itemSpecialPrice
            let updatedInfo = `${existInfo[0]}|${existInfo[1]}|${newExistPrice}`
            // alert(updatedInfo)

            storage[itemId] = updatedInfo

        }else{ //第一次買
            storage['addItemList'] += `${itemId}, `
            storage[itemId] = itemValue
        }

        // ===============================================================================
        bus.emit('notifyUpdateCart') // 通知 Header 更新購物車數量

        showToast('已成功加入購物車!')
    }







</script>


<template>
    <shopToast />

    <section class="product-page">
        <ShopBanner />
        <Breadcrumbs />
        <div class="container" v-if="product">
            <!-- 左：商品圖片 -->
            <div class="product-gallery">
                <div class="product-gallery__pic">
                    <!-- <img src="https://placehold.co/480x480" alt=""> -->
                    <img :src="product.pic" alt="">
                </div>
                <ul class="product-gallery__thumbs">
                    <li>
                        <img :src="product.pic" alt="">
                    </li>
                    <li>
                        <img :src="product.pic" alt="">
                    </li>
                    <li>
                        <img :src="product.pic" alt="">
                    </li>
                </ul>
            </div>

            <!-- 右：商品資訊 -->
            <div class="product-detail">
                <h1 class="product-detail__title">{{ product.name }}</h1>
                <div class="detail-text">
                    <p class="detail-text__desc">{{ product.desc }}</p>
                    <p class="detail-text__promotion">{{ product.promotion }}</p>
                    <p class="detail-text__marketing">{{ product.marketing }}</p>
                    <div class="product-price">
                        <p class="product-price__nospecial">NT$ {{ product.price }}</p>
                        <p class="product-price__special">NT$ {{ product.specialPrice }}</p>
                    </div>
                    <!-- 數量按鈕位置，暫時刪除 -->
                    <!-- <div class="qty-control">
                        <QtyControl />
                    </div> -->
                </div>
                <div class="product-detail__btn">
                    <p class="product-detail__btn__add" @click="addCart(product)">
                        <i class="fa-solid fa-cart-shopping"></i>
                        加入購物車
                    </p>
                    <p class="product-detail__btn__follow" @click="followProduct">
                        <span class="add-follow" v-show="!isFollow">
                           <i class="fa-regular fa-heart"></i> 加入商品收藏<!-- 空心 -->
                        </span>
                        <span class="cancel-follow" v-show="isFollow">
                            <i class="fa-solid fa-heart"></i> 取消商品收藏<!-- 實心 -->
                        </span>
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
        <div class="product-info" v-if="product">
            <ProdIntro />
        </div>

        <!-- 沒有這個商品編號時會出現如下 -->
        <div class="no-product" v-else>
            <p>查無此商品</p>
            <p class="back-cate">
                <router-link to="/shop/category" class="router-link">點擊回到商品分類</router-link>
            </p>
        </div>
    </section>
</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';
    // 共用
    .router-link {
        text-decoration: none;
        color: inherit;
    }

    .product-page {
        background-color: $bgColor-shop;

        // ------------------- 上方 -------------------
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 16px;

            display: flex;
            gap: 40px; 
    
            // ---------- 左：商品圖片 ----------
            .product-gallery {
                // border: 1px solid green;
                
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
                    // border: 1px solid red;
                    display: flex;
                    gap: 20px;

                    li {
                        cursor: pointer;
                        img{
                            display: block;
                            max-width: 110px;
                            height: auto;
                            object-fit: cover;
                            aspect-ratio: 1 / 1;
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

                    &__desc {
                        font-size: $pcChFont-H3;
                        line-height: 1.5;
                        padding-bottom: 16px;
                        border-bottom: 1px solid white;
                    }
                    &__promotion {
                        font-size: $pcChFont-H4;
                        padding-left: 20px;
                        border-left: 10px solid white;
                        line-height: 1.5;
                    }
                    &__marketing {
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

                    &__nospecial {
                        color: #ccc;
                        text-decoration: line-through;
                    }
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


        // ------------------- 下方 -------------------
        .product-info {
            max-width: 1200px;
            margin: 0 auto;
        }

        // ------------------- 沒有商品時出現 -------------------
        .no-product {
            text-align: center;
            font-size: 52px;
            padding: 20px;
            color: white;
            .back-cate {
                padding-top: 20px;
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }


</style>