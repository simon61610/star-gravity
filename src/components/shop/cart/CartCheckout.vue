<script setup>

    import { ref, computed, onMounted } from 'vue'
    import bus from '@/composables/useMitt'
    import products from '@/data/products'
    
    const orderGuide = ref([
        "商品出貨時間約需 5–7 個工作天，若您無法等待，請斟酌再下單。",
        "宅配服務（黑貓）配送時間通常為 1–2 個工作天，如遇連續假期或重大節慶，恕無法指定送達日期與時段。",
        "本網站保留活動內容之 最終修改與解釋權利。",
        "若有任何疑問，歡迎於訂單留言或與客服聯繫，感謝您的支持！",
    ])
    
    // ===================================================================================
    // ===================================== 抓假資料 =====================================
    // ===================================================================================
    
    /* 
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
    // console.log(products[0].name)


    
    // 每種商品的數量: 陣列，初始值為一
    const qtyList = ref(products.map(() => 1))
    // console.log(qtyList.value) // {0: 1, 1: 1, 2: 1} or [1, 1, 1]?????????
    let qtyNumArr = qtyList.value

    // 驗證商品數量
    const checkQty = (index) => {
        if(qtyNumArr[index] < 1){
            qtyNumArr[index]=1
        }
    }

    
    // 計算合計金額
    const total = computed(() => {
        let sum = 0
        
        for(let i = 0; i < products.length; i++){
            let spePrice = products[i].specialprice // 特價金額
            let qty = qtyNumArr[i] // 數量

            sum += spePrice * qty
        }

        return sum
    })

    // -----------------------------------------------------------------------

    // 刪除商品
    const deleteItem = (index) => {
        products.splice(index, 1) // 刪除商品本身
        qtyNumArr.splice(index, 1) // 刪除數量
    } 
    */
   

    // ===================================================================================
    // ===================================== Storage =====================================
    // ===================================================================================
    const storage = localStorage
    const cartItems = ref([])

    // ===================================== 抓資料 =====================================

    const doFirst = () => {
        const itemString = storage['addItemList']
        // alert(itemString) // P1, P3, P5, 
        if(!itemString){
            cartItems.value = []
            return
        }

        let items = itemString.substring(0, itemString.length - 2).split(', ')
        // alert(items) // P1,P3,P5
        let cartData = []
        
        for(let i = 0; i < items.length; i++){
            let itemInfo = storage.getItem(items[i])
            if(itemInfo){
                // 建立商品資料的陣列，裡面包商品資料的物件
                cartData.push(createCartList(items[i], itemInfo))
            }
        }

        cartItems.value = cartData
        // console.log(cartItems.value) // 陣列包物件 [{...}, {...}, {...}]
    }

    const createCartList = (itemId, itemValue) => {
        let existInfo = itemValue.split('|')
        // console.log(existInfo) //['基礎入門型 商品 1', 'https://placehold.co/480x480?text=Product+1', '19436']
        let itemTitle = existInfo[0] // 商品名稱
        let itemImgURL = existInfo[1] // 圖片連結
        let itemTotalPrice = parseInt(existInfo[2]) // 商品總價
        
        // 找單價: 從原始的 products 資料
        let productId = Number(itemId.replace('P', ''))
        let product = products.find(p => p.id == productId)
        let originalPrice = product ? product.specialPrice : 1 // 優惠單價
        
        // 計算數量: 總價 / 單價
        let quantity = Math.round( itemTotalPrice / originalPrice ) // 數量

        // console.log(quantity) // 檢查用

        return {
            id: itemId,
            name: itemTitle,
            pic: itemImgURL,
            speprice: originalPrice,
            qty: quantity,
            subtotal: itemTotalPrice,
        }
    }

    // ===================================== 計算新的數量 => 價格 =====================================
    // item 是抓資料出來的物件
    const changeItemCount = (item, index) => {
        if(item.qty < 1){
            item.qty = 1
        }

        // 重新計算小計
        item.subtotal = item.qty * item.speprice

        // 更新 localStorage 中的價錢
        let itemInfo = storage.getItem(item.id)
        if(itemInfo){
            let parts = itemInfo.split('|')
            parts[2] = item.subtotal
            storage.setItem(item.id, parts.join('|'))
        }

        bus.emit('notifyUpdateCart') // 通知 header
    }

    // ===================================== 計算合計金額 =====================================
    const total = computed(() => {
        let sum = 0;

        for(let i = 0; i < cartItems.value.length; i++){
            sum += cartItems.value[i].subtotal
        }

        return sum
    })


    // ===================================== 刪除商品 =====================================
    const deleteItem = (index) => {
        const item = cartItems.value[index] // 要被刪除的該物件
        
        // 1. 移除 storage 中的該項 & addItemList 的id
        storage.removeItem(item.id)
        let itemString = storage.getItem('addItemList') 
        if (itemString) {
            // 移除 "P1, P3, P5, " 格式的字串
            let updatedItemString = itemString.replace(`${item.id}, `, '')
            storage.setItem('addItemList', updatedItemString)
        }

        // 2. 從畫面上移除該項
        cartItems.value.splice(index, 1) // 陣列刪除值，用 splice


        // 3. 重新計算總金額
        // 在 computed

        bus.emit('notifyUpdateCart') // 通知 header
    }




    // ===================================== onMounted =====================================
    
    onMounted(() => {
        doFirst()
    })

    


</script>


<template>
    <section class="checkout-section">

        <!-- ---------------- 上方: 購物清單 ---------------- -->
        <section class="cart-list">
            <h1>購物清單</h1>
            <ul class="items">
                <li class="item" v-for="(item, index) in cartItems">

                    <!-- 商品圖片 -->
                    <img :src="item.pic" alt="" class="item__img">

                    <!-- 商品資訊 -->
                    <div class="item__info">
                        <h2 class="item__info__name">{{ item.name }}</h2>
                        <div class="item__info__price">
                            <div class="price-per-item">
                                <p class="spe-price">NT${{ item.speprice }}</p>
                                <!-- <p class="price">NT${{ product.price }}</p> -->
                            </div>
                            <div class="qty-ctrl">
                                <input 
                                    class="num"
                                    type="number"
                                    v-model.number="item.qty"
                                    min="1" 
                                    @input="changeItemCount(item, index)"
                                >
                                <!-- @blur="checkQty(index)" 移除Blur事件驗證 -->
                            </div>
                            <p class="price-subtotal">
                                小計：NT${{ item.subtotal }}
                            </p>
                        </div>
                    </div>

                    <!-- 刪除按鈕 -->
                    <div class="item__del-btn" @click="deleteItem(index)">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </li>
            </ul>

            <div class="no-products" v-if="cartItems.length == 0">
                <p class="no-prod-text">無商品資料</p>
                <p class="go-to-store">還沒找到心動商品？快去
                    <span>
                        <router-link to="/shop/category" class="router-link">
                            星空小舖
                        </router-link>
                    </span>
                    看看！
                </p>
            </div>
        </section>

        <!-- 暫時移除庫存功能 -->
        <!-- <p class="stock">尚有庫存 <span>{{ stock }}</span> 件</p> -->

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
                        <p><span>合計</span><span>NT${{ total }}</span></p>
                        <p><span>運費</span><span>NT$60</span></p>
                        <p><span>總計</span><span>NT${{ total + 60 }}</span></p>
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
        color: inherit;
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
                        width: 80px;
                        height: 80px;
                        object-fit: cover;
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
                                    text-decoration: line-through;
                                    color: #888;
                                }
                                .spe-price {
                                    font-size: $pcChFont-H4;
                                }
                            }
                            .qty-ctrl {
                                .stock {
                                    font-size: $pcChFont-p;
                                    margin-bottom: 12px;

                                    span {
                                        color: $secondaryColor-orange;
                                    }
                                }

                                .num {
                                    padding: 4px 12px;
                                    font-size: $pcChFont-p;
                                    text-align: center;
                                    // flex-grow: 1;
                                    width: 60px;
                                }
                            }
                            .price-subtotal {
                                // border: 1px solid red;
                                width: 200px;
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

            .no-products {
                border: 2px solid #ccc;
                border-top: none;
                color: #999;
                padding: 20px;
                text-align: center;
                font-size: 20px;
                .no-prod-text {
                    margin-bottom: 12px;
                }
                .go-to-store {
                    padding-top: 12px;
                    span {
                        color: $secondaryColor-orange;
                        
                        &:hover {
                            color: $primaryColor-900;
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

    @media screen and (max-width: 431px){
        .checkout-section {
        // --------- 上方: 購物清單 ---------
        .cart-list {
            padding-bottom: 12px;
            h1 {}
            .items{
                .item{
                    gap: 20px;
                    &__img { // 圖片
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
                                .price {
                                }
                                .spe-price {
                                }
                            }
                            .qty-ctrl {
                                .stock {
                                    span {
                                    }
                                }

                                .num {
                                }
                            }
                            .price-subtotal {
                                font-size: 20px;
                            }
                        }
                    }
                    &__del-btn { // 刪除按鈕
                        &:hover {
                        }
                    }
                }
            }
        }

        // --------- 下方: 說明與訂單金額 ---------
        .guide-box {
            flex-direction: column;
            justify-content: space-between;
            gap: 16px;
            // 訂購說明
            &__guide, &__order {
                h2 {
                }
            }

            &__guide{
                flex-basis: auto;
                h2 {}
                ul {
                    li{
                    }
                }
            }

            // 訂單資訊
            &__order{
                flex-basis: auto;
                h2 {}
                .order-cal {
                    .cal-box {
                        p {

                            &:last-child{
                            }
                        }
                    }
                    .goto-pay-btn, .shop-btn {
                    }
                    .goto-pay-btn {
                        &:hover {
                        }   
                    }
                    .shop-btn {
                    }
                }
            }
        }
    }




    }

</style>