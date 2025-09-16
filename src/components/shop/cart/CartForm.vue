<!-- 購物車 - 填寫資料 -->
<!-- 
1. 表單待補上驗證
2. 購物車若沒東西會報錯
3. 免運功能開發
-->

<script setup>
    import { ref, computed, onMounted, watch, nextTick } from 'vue'
    import { useRouter } from 'vue-router';

    /* ========== 組件 ========== */
    import shopToast from '@/components/common/shopToast.vue';
    import { showToast } from '@/composables/useToast';

    /* ========== Pinia ========== */
    import { useMemberStore } from '@/stores/member';

    /* ========== 套件 ========== */
    import $ from 'jquery'
    import axios from 'axios'
    import bus from '@/composables/useMitt'

    /* ========== 環境變數 ========== */
    // const BASE_URL = import.meta.env.VITE_AJAX_URL_NOEND
    
    /* ========== 共用 ========== */
    const router = useRouter()
    const memberStore = useMemberStore()
    const storage = localStorage
    const cartItems = ref([]) // 購物車

    // 城市陣列
    const cities = ref([])

    // 表單物件 v-modal 綁定
    const shipping_method = ref('宅配')     // 運送方式
    const payment_method = ref('')          // 付款方式
    const recipient_name = ref('')          // 收件人名稱
    const recipient_phone = ref('')         // 電話
    const selectedCity = ref('')            // 選擇的縣市，資料庫欄位名: city
    const selectedDistrict = ref('')        // 選擇的區，資料庫欄位名: area
    const recipient_address = ref('')       // 填寫地址
    const notes = ref('')                   // 訂單備註

    const districts = computed(() => {
        const city = cities.value.find(c => c.CityName === selectedCity.value)
        return city ? city.AreaList : []
    })

    /* ========== 功能: 勾選會員資料相同 ========== */
    const sameAsMember = ref(false)
    const doSameAsMember = async () => {
        if(sameAsMember.value){
            // 抓取會員資料
            try{
                const res = await axios.get(import.meta.env.VITE_AJAX_URL + "Member/getMember_forSame.php", {
                    params: { member_id: memberStore.user?.ID }
                })

                // console.log(res.data.memberInfo)

                if(res.data.success && res.data.memberInfo){
                    const m = res.data.memberInfo
                    recipient_name.value = m.name || ''
                    recipient_phone.value = m.phone || ''
                    selectedCity.value = m.city || ''

                    nextTick(() => {
                        selectedDistrict.value = m.area || ''
                    })

                    recipient_address.value = m.address || ''
                }else{
                    showToast('會員資料取得失敗')
                    console.log(res.data.message)
                }
                
            }catch(err){
                console.error(err)
                showToast('請稍後再試')
            }
        }else{
            cleanForm()
        }
    }

    const cleanForm = () => {
        // 清空表單
        recipient_name.value = ''
        recipient_phone.value = ''
        selectedCity.value = ''
        selectedDistrict.value = ''
        recipient_address.value = ''
    }

    /* ========== 功能: 建立購物車資料 List ========== */
    const createCartList = (itemId, itemValue) => {
        let existInfo = itemValue.split('|')

        // console.log(existInfo); // 商品名稱|圖片路徑|每件價格|數量|原價
        // ['入門啟蒙款 NovaSight 雙筒望遠鏡', '/pdo/starshop/images/雙筒望遠鏡-入門啟蒙款 NovaSight 雙筒望遠鏡-1.png', '2700', '2']
        
        let name = existInfo[0]                         // 商品名稱
        // let firstImage = BASE_URL + existInfo[1]     // 圖片路徑
        let firstImage = existInfo[1]                   // 圖片路徑
        let unitPrice = Number(existInfo[2])            // 特價單價
        let qty = Number(existInfo[3])                  // 單種商品數量
        let originalPrice = Number(existInfo[4])        // 商品原價
        let itemSubTotal = unitPrice * qty              // 商品總價
        // console.log(itemSubTotal);

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

    onMounted(async() => {
        /* ========== 抓購物車的內容 ========== */
        let itemString = storage['addItemList']
        let items = itemString.substring(0, itemString.length - 2).split(', ')
        
        if(!itemString){
            cartItems.value = []
            return
        }

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
        // console.log(cartItems.value)

        /* ========== 功能: 引用 jQuery 做 toggle ========== */
        // 預設關起來
        $('.toggle-content').hide()

        // 上方標題點擊 => 展開 or 收合
        $('.toggle-total').on('click', function(){
            if($('.toggle-content').is(':visible')){
                $('.toggle-content').slideUp(600)
                $('#cartCount').removeClass('open')
            }else{
                $('.toggle-content').slideDown(600)
                $('#cartCount').addClass('open')
            }
        })

        // 內容箭頭點擊 => 收合
        $('.toggle-inside').on('click', function(){
            if($('.toggle-content').is(':visible')){
                $('.toggle-content').slideUp(800)
                $('#cartCount').removeClass('open')
            }
        })

        /* ========== 功能: 抓取縣市 | 區 json 檔資料 ========== */
        const res = await axios.get(import.meta.env.VITE_PUBLIC_URL + 'JSON_CSV_XML/CityCountyData.json')
        // const res = await axios.get('/JSON_CSV_XML/CityCountyData.json')
        cities.value = res.data
        // console.log(cities.value)
    })

    /* ========== 功能: 重選縣市，區值清空 ========== */
    watch(selectedCity, () => {
        selectedDistrict.value = ""
    })

    /* ========== 功能: 計算總數量 ========== */
    const totalQuantity = computed(() => {
        let sum = 0;

        for(let i = 0; i < cartItems.value.length; i++){
            let itemInfo = storage.getItem(cartItems.value[i].ID)
            if(itemInfo) {
                let parts = itemInfo.split('|')
                let qty = Number(parts[3])
                // console.log(parts)
                sum += qty
            }
        }

        return sum
    })

    /* ========== 運費 ========== */
    const shipping_fee = computed(() => { // 未來可針對免運條件做運算
        return 60
    })
    
    /* ========== 計算合計金額 ========== */
    const totalPrice = computed(() => {
        let sum = 0;

        for(let i = 0; i < cartItems.value.length; i++){
            sum += cartItems.value[i].itemSubTotal
        }

        return sum
    })

    /* ========== 產生訂單號 ========== */
    const orderNumber = ref("")

    const generateOrderNumber = () => {
        // 目標 => SGABC-202509100945 => SG + - + 隨機三碼英文大寫 + 年月日毫秒

        // 隨機三碼英文大寫
        let letters = ''
        const lettesLength = 3
        for(let i = 0; i < lettesLength; i++){
            const randomLetterNum = parseInt(Math.random()*26) + 65
            letters += String.fromCharCode(randomLetterNum)
        }

        // 年月日時分
        const now = new Date()
        // str.padStart(targetLength [, padString])
        let y = String(now.getFullYear())
        let m = String(now.getMonth() + 1).padStart(2, "0")
        let d = String(now.getDate()).padStart(2, "0")
        let mills = String(now.getMilliseconds()).padStart(3, "0")
        // let h = String(now.getHours()).padStart(2, "0")
        // let min = String(now.getMinutes()).padStart(2, "0")
        
        let nowNum = y + m + d + mills
        
        orderNumber.value = `SG${letters}-${nowNum}`
        // alert(orderNumber.value)
    }

    /* ========== 送出訂單，進入結帳 ========== */
    const submitOrder = async () => {
        if (!memberStore.isAuthed) {
            showToast('請先登入會員再結帳')
            // router.push('/login') // 或導去登入頁
            // console.log(memberStore.user)
            return
        }

        // 表單驗證，資料為空的話
        if(
            !shipping_method.value.trim() ||    // 運送方式
            !payment_method.value.trim() ||     // 付款方式
            !recipient_name.value.trim() ||     // 收件人名稱
            !recipient_phone.value.trim() ||    // 電話
            !selectedCity.value.trim() ||       // 選擇的縣市，資料庫欄位名: city
            !selectedDistrict.value.trim() ||   // 選擇的區，資料庫欄位名: area
            !recipient_address.value.trim()     // 填寫地址
        ){
            showToast('請填寫必填欄位！')
            return
        }

        generateOrderNumber()

        const orderData = {
            member_id: memberStore.user?.ID,                            // 會員ID
            order_number: orderNumber.value,                            // 訂單編號
            shipping_method: shipping_method.value,                     // 運送方式
            payment_method: payment_method.value,                       // 付款方式
            recipient_name: recipient_name.value,                       // 收件人名稱
            recipient_phone: recipient_phone.value,                     // 電話
            city: selectedCity.value,                                   // 選擇的縣市，資料庫欄位名: city
            area: selectedDistrict.value,                               // 選擇的區，資料庫欄位名: area
            recipient_address: recipient_address.value,                 // 填寫地址
            notes: notes.value.trim() === "" ? null : notes.value,      // 訂單備註
            cart: cartItems.value,                                      // 購物車商品
            total_price: totalPrice.value,                              // 合計(不含運)，資料庫欄位: total_price
            shipping_fee: shipping_fee.value                            // 運費
        }

        const res = await axios.post(import.meta.env.VITE_AJAX_URL + 'starshop/client/order_insert.php', orderData)

        if(res.data.success){
            // 逐一清除對應商品
            let itemString = storage['addItemList']
            let items = itemString.substring(0, itemString.length - 2).split(', ')
            for(let i = 0; i < items.length; i++){
                storage.removeItem(items[i])
            }
            
            // 清空 Storage
            storage.removeItem('addItemList')

            // 通知 header
            bus.emit('notifyUpdateCart')

            // 傳遞資料到完成頁
            const order_id = res.data.order_id
            router.push({
                path: '/cartpage/cartsuccess',
                query: { 
                    order_id, 
                    member_id: memberStore.user?.ID 
                }
            })
        }else{
            showToast('訂單建立失敗')
        }
    }
</script>


<template>
    <shopToast />
    <section class="checkout-section">

        <!-- ---------------- 訂單明細 ---------------- -->
        <section class="cart-list">

            <!-- <h1 class="common-title" @click="generateOrderNumber">訂單明細</h1> --> <!-- 測試訂單編號用 -->
            <h1 class="common-title">訂單明細</h1>

            <!-- 收合標題 -->
            <div class="toggle-total">
                <p class="total">總計：NT${{ totalPrice + shipping_fee }}</p>
                <p class="count" id="cartCount">購物車({{ totalQuantity }}件)</p>
            </div>

            <div class="toggle-content">
                <!-- 商品細項 -->
                <ul class="items">
                    <li class="item" v-for="(product, index) in cartItems">
                        <!-- 圖片 -->
                        <img :src="product.firstImage" alt="" class="item__img">
    
                        <!-- 商品資訊和計算 -->
                        <div class="item__info">
                            <h2 class="item__info__name">{{ product.name }}</h2>
                            <div class="item__info__price">
                                <div class="price-per-item">
                                    <p class="price">NT${{ product.unitPrice }}</p>
                                    <p class="spe-price">NT${{ product.originalPrice }}</p>
                                </div>
                                <p class="sub-count">數量：{{ product.qty }} 件</p>
                                <p class="sub-price">小計：NT${{ product.itemSubTotal }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
    
                <!-- 金額統計 -->
                <div class="cal-box">
                        <p><span>合計</span><span>NT${{ totalPrice }}</span></p>
                        <p><span>運費</span><span>NT${{ shipping_fee }}</span></p>
                        <p><span>總計</span><span>NT${{ totalPrice + shipping_fee }}</span></p>
                </div>

                <div class="toggle-inside">
                    <div class="arrow-inside"></div>
                </div>

            </div>


        </section>

        <!-- ---------------- 表單 ---------------- -->
        <!-- <form method="post" action="#" class="order-form"> -->
            <!-- ---------------- 付款方式 ---------------- -->
             <section class="payment-method">
                <h1 class="common-title">付款方式</h1>
                <div class="payment-method__radio">
                    <label>
                        <input type="radio" v-model="payment_method" value="貨到付款"> 貨到付款
                    </label>
                    <label>
                        <input type="radio" v-model="payment_method" value="線上刷卡"> 線上刷卡
                    </label>
                </div>
             </section>

            <!-- ---------------- 收件資料 ---------------- -->
            <section class="receipt-info">
                <h1 class="common-title">收件資料</h1>
                <div class="receipt-info__form">
                    <div class="input-box">
                        <h3>送貨方式：{{ shipping_method }}（台灣本島地區適用）</h3>
                        <label class="same-info">
                            <input type="checkbox" v-model="sameAsMember" @change="doSameAsMember"> 收件人資料與會員資料相同
                        </label>
                    </div>
                    <div class="input-box">
                        <h3><span>*</span>收件人名稱</h3>
                        <div class="receiver">
                            <input type="text" v-model="recipient_name" :disabled="sameAsMember">
                            <p>（請填入真實姓名，以確保順利收件）</p>
                        </div>
                    </div>
                    <!-- <div class="input-box">
                        <h3>電話</h3>
                        <input type="text" placeholder="02 1234 5678">
                    </div> -->
                    <div class="input-box">
                        <h3><span>*</span>行動電話</h3>
                        <input type="text" v-model="recipient_phone" placeholder="0912 345 678" :disabled="sameAsMember">
                    </div>
                    <div class="input-box">
                        <h3><span>*</span>地址</h3>
                        <div class="address">
                            <!-- 縣市 -->
                            <select v-model="selectedCity" :disabled="sameAsMember">
                                <option value="">請選擇縣市</option>
                                <option v-for="city in cities" :value="city.CityName">
                                    {{ city.CityName }}
                                </option>
                            </select>

                            <!-- 區 -->
                            <select v-model="selectedDistrict" :disabled="sameAsMember || !selectedCity">
                                <option value="">請選擇區域</option>
                                <option v-for="district in districts" :value="district.AreaName">
                                    {{ district.AreaName }}
                                </option>
                            </select>
                        </div>
                        <input type="text" v-model="recipient_address" placeholder="請輸入真實地址" :disabled="sameAsMember">
                    </div>
                    <!-- <div class="input-box">
                        <h3>發票抬頭</h3>
                        <input type="text">
                    </div>
                    <div class="input-box">
                        <h3>統一編號</h3>
                        <input type="text">
                    </div> -->
                    <div class="input-box">
                        <h3>訂單備註</h3>
                        <textarea rows="4" v-model="notes" placeholder="有什麼想告訴賣家嗎？"></textarea>
                    </div>
                </div>
            </section>

            <!-- ---------------- 按鈕區 ---------------- -->
            <section class="btn-box">
                <router-link to="/cartpage/cart" class="router-link">
                    <p class="previous-btn">< 返回上一步</p>
                </router-link>
                <!-- <router-link to="/cartpage/cartsuccess" class="router-link"> -->
                    <p class="next-btn" @click="submitOrder">完成訂單</p>
                <!-- </router-link> -->
            </section>

        <!-- </form> -->
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    // 共用
    .router-link {
        text-decoration: none;
    }

    // 共用標題樣式
    .common-title {
        font-size: $pcChFont-H4;
        font-weight: bold;
        background-color: #f0f0f0;
        color: #888;
        text-align: center;
        padding: 16px 0;
        margin-bottom: 12px;
    }

    .checkout-section {
        // --------- 訂單明細 ---------
        .cart-list {
            margin-bottom: 28px;
            h1 {}

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
                        transition: all .6s ease;
                        position: relative;
                        top: 2px;
                        
                    }

                }

                .count.open {
                    &::after {
                        transform: rotate(135deg);
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

        // --------- 付款方式 ---------
        .payment-method {
            margin-bottom: 28px;
            h1 {}
            &__radio {
                padding: 16px 24px 0;
                display: flex;
                flex-direction: column;
                gap: 12px;
                font-size: $pcChFont-H4;
                label {
                    cursor: pointer;
                    input {}
                }
            }

        }

        // --------- 收件資料 ---------
        .receipt-info {
            h1 {}
            &__form {
                margin-bottom: 28px;
                font-size: $pcChFont-H4;
                padding: 16px 24px;
                display: flex;
                flex-direction: column;
                gap: 20px;
                .input-box {
                    // border: 1px solid green;
                    

                    // ----------------- 共用 -----------------
                    input[type="text"], textarea {
                        padding: 16px 20px;
                        font-size: $pcChFont-H4;
                        width: 100%;
                        box-sizing: border-box;
                        border: 1px solid #888;
                        border-radius: 8px;
                        font-family: $chFont;
                    }
                    input[type="text"]::placeholder, textarea::placeholder {
                        color: #ccc;
                    }
                    input[type="text"]:focus, textarea:focus  {
                        outline: 1px solid $primaryColor-800;
                    }
                    h3 {
                        margin-bottom: 16px;
                        span {
                            color: $secondaryColor-orange;
                            font-weight: bold;
                        }
                    }

                    // ----------------- 個別 -----------------
                    .same-info {
                        color: #888;
                        cursor: pointer;
                    }
                    .receiver {
                        input {}
                        p {
                            padding-top: 8px;
                            color: #888;
                        }
                    }
                    .address {
                        select {
                            font-size: $pcChFont-H4;
                            padding: 12px 16px;
                            border: 1px solid #888;
                            border-radius: 8px;
                            font-family: $chFont;
                            cursor: pointer;
                            margin-bottom: 16px;
                            margin-right: 12px;

                            option {
                            }    
                        }
                    }
                }
            }
        }

        // --------- 按鈕區 ---------
        .btn-box {
            font-size: $pcChFont-H4;
            display: flex;
            justify-content: space-between;
            padding-top: 32px;
            border-top: 1px solid #ccc;

            .previous-btn, .next-btn {
                cursor: pointer;
            }
            .previous-btn {
                color: #888;
                &:hover {
                    text-decoration: underline;
                }
            }
            .next-btn {
                width: 320px;
                padding: 12px;
                border-radius: 999px;
                color: white;
                background-color: $secondaryColor-orange;
                text-align: center;
                &:hover {
                    background-color: $primaryColor-900;
                }
            }
        }
    }


    @media screen and (max-width: 431px) {
        
        .checkout-section {

            .cart-list {
                h1 {}
                .toggle-total {

                    .total {}
                    .count {}

                    .count.open {}
                }
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

            .receipt-info {
                h1 {}
                &__form {
                    .input-box {
                        .address {
                            select {
                                width: 100%;
                                option {
                                }    
                            }
                        }
                    }
                }
            }



            .btn-box {
                flex-direction: column-reverse;
                gap: 20px;
                align-items: center;
            }
        }    
    }

</style>