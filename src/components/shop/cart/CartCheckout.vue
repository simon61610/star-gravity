<!-- 購物車 - 準備結帳 -->
<!-- 
- TODO: 免運功能開發
-->

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useRouter } from 'vue-router';

    /* ========== 組件 ========== */
    import shopToast from '@/components/common/shopToast.vue';
    import { showToast } from '@/composables/useToast'
    
    /* ========== Pinia ========== */
    import { useMemberStore } from '@/stores/member'
    
    /* ========== 套件 ========== */
    import bus from '@/composables/useMitt'

    /* ========== 環境變數 ========== */
    // const BASE_URL = import.meta.env.VITE_AJAX_URL_NOEND

    /* ========== 共用 ========== */
    const router = useRouter()
    const memberStore = useMemberStore()
    const cartItems = ref([]) // 購物車
    const storage = localStorage
    
    /* ========== 資料 ========== */
    const orderGuide = ref([
        "商品出貨時間約需 5–7 個工作天，若您無法等待，請斟酌再下單。",
        "宅配服務（黑貓）配送時間通常為 1–2 個工作天，如遇連續假期或重大節慶，恕無法指定送達日期與時段。",
        "本網站保留活動內容之 最終修改與解釋權利。",
        "若有任何疑問，歡迎於訂單留言或與客服聯繫，感謝您的支持！",
        ])
        
    /* ========== 抓購物車的內容 ========== */
    onMounted(() => {
        const itemString = storage['addItemList']
        // alert(itemString) // 1, 3, 5, 
        if(!itemString){
            cartItems.value = []
            return
        }

        let items = itemString.substring(0, itemString.length - 2).split(', ')
        let cartData = []
        
        for(let i = 0; i < items.length; i++){

            // 商品名稱|圖片路徑|每件價格|數量|原價
            let itemInfo = storage.getItem(items[i])
            if(itemInfo){
                // 建立商品資料的陣列，裡面包商品資料的物件
                cartData.push(createCartList(items[i], itemInfo))
            }
        }

        cartItems.value = cartData
        // console.log(cartItems.value) // 陣列包物件 [{...}, {...}, {...}]
    })

    /* ========== 建立購物車資料 List ========== */
    const createCartList = (itemId, itemValue) => {
        let existInfo = itemValue.split('|')
            
        // console.log(existInfo); // 商品名稱|圖片路徑|每件價格|數量|原價
        
        let name = existInfo[0]                         // 商品名稱
        // let firstImage = BASE_URL + existInfo[1]     // 圖片路徑
        let firstImage = existInfo[1]                   // 圖片路徑
        let unitPrice = Number(existInfo[2])            // 特價單價
        let qty = Number(existInfo[3])                  // 單種商品數量
        let originalPrice = Number(existInfo[4])        // 商品原價
        let itemSubTotal = unitPrice * qty              // 商品總價
        
        return {
            ID: itemId,
            name,
            firstImage,
            originalPrice,
            unitPrice,
            qty,
            itemSubTotal
        }
    }
    
    /* ========== 計算新的數量 => 價格 ========== */
    // item 是購物車資料 List 跑 v-for 後的 Object
    const changeItemCount = (item, index) => {
        if(item.qty < 1){
            item.qty = 1
        }

        // 重新計算小計
        item.itemSubTotal = item.qty * item.unitPrice
        
        // 更新 localStorage 中的數量
        // 商品名稱|圖片路徑|每件價格|數量|原價
        let itemInfo = storage.getItem(item.ID)
        if(itemInfo){
            let parts = itemInfo.split('|') // ['入門孩童款 50mm 入門望遠鏡', '/pdo/starshop/images/基礎入門型1-3.png', '3840', '1', '4800']
            parts[3] = item.qty
            storage.setItem(item.ID, parts.join('|'))

            // console.log(storage.getItem(item.ID))
        }

        bus.emit('notifyUpdateCart') // 通知 header
    }

    /* ========== 計算合計金額 ========== */
    const totalPrice = computed(() => {
        let sum = 0;

        for(let i = 0; i < cartItems.value.length; i++){
            sum += cartItems.value[i].itemSubTotal
        }

        return sum
    })

    /* ========== 運費 ========== */
    const shipping_fee = computed(() => { // 未來可針對免運條件做運算
        return 60
    })

    /* ========== 刪除商品 ========== */
    const deleteItem = (index) => {
        const item = cartItems.value[index] // 要被刪除的該物件
        
        // 1. 移除 storage 中的該項 & addItemList 的id
        storage.removeItem(item.ID)
        let itemString = storage.getItem('addItemList') 
        if (itemString) {
            // 移除 "1, 3, 5, " 格式的字串
            let updatedItemString = itemString.replace(`${item.ID}, `, '')
            storage.setItem('addItemList', updatedItemString)
        }

        // 2. 從畫面上移除該項
        cartItems.value.splice(index, 1) // 陣列刪除值，用 splice

        // 3. 重新計算總金額
        // 在 computed

        bus.emit('notifyUpdateCart') // 通知 header
    }


    /* ========== 判斷是否能前往 CartFotm ========== */
    const goToCartForm = () => {
        // 判斷購物車有無商品
        if(cartItems.value.length === 0){
            showToast('購物車尚無商品，請前往星空小舖選購')
            return
        }
        // 判斷是否登入會員
        if(!memberStore.isAuthed){
            alert('請先登入會員')
            return
        }
        router.push('/cartpage/cartform')
    }
</script>


<template>
    <shopToast />
    <section class="checkout-section">

        <!-- ---------------- 上方: 購物清單 ---------------- -->
        <section class="cart-list">
            <h1>購物清單</h1>
            <ul class="items">
                <li class="item" v-for="(item, index) in cartItems">

                    <!-- 商品圖片 -->
                    <img :src="item.firstImage" alt="" class="item__img">

                    <!-- 商品資訊 -->
                    <div class="item__info">
                        <h2 class="item__info__name">{{ item.name }}</h2>
                        <div class="item__info__price">
                            <div class="price-per-item">
                                <p class="spe-price">NT${{ item.unitPrice }}</p>
                                <p class="price">NT${{ item.originalPrice }}</p>
                            </div>
                            <div class="qty-ctrl">
                                <input 
                                    class="num"
                                    type="number"
                                    v-model.number="item.qty"
                                    min="1" 
                                    @input="changeItemCount(item, index)"
                                >
                                <p class="stock">尚有庫存 {{ item.stock ?? '待修改' }} 件</p>
                                <!-- @blur="checkQty(index)" 移除Blur事件驗證 -->
                            </div>
                            <p class="price-subtotal">
                                小計：NT${{ item.itemSubTotal }}
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
                        <p><span>合計</span><span>NT${{ totalPrice }}</span></p>
                        <p><span>運費</span><span>NT${{ shipping_fee }}</span></p>
                        <p><span>總計</span><span>NT${{ totalPrice + shipping_fee }}</span></p>
                    </div>
                    <!-- <router-link to="/cartpage/cartform" class="router-link"> -->
                        <div class="goto-pay-btn" @click="goToCartForm">前往結帳</div>
                    <!-- </router-link> -->
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
                        border: 1px solid #ccc;
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
                                display: flex;
                                flex-direction: column;
                                gap: 12px;
                                align-items: center;
                                .stock {
                                    font-size: 16px;

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
                                align-items: flex-start;
                                margin-bottom: 12px;
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