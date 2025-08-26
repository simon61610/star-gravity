<!-- 
1. 表單待補上驗證
2. 表單補上 name 和 value 
3. 地址下拉選單
-->

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import $ from 'jquery'
    
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


    // 縣市假資料
    const cities = ref([
        { name: '台北市', districts: ['中正區', '大同區', '中山區', '松山區', '大安區'] },
        { name: '新北市', districts: ['板橋區', '新莊區', '中和區', '永和區', '三重區'] },
        { name: '桃園市', districts: ['桃園區', '中壢區', '平鎮區', '八德區'] },
    ])

    const selectedCity = ref('')
    const selectedDistrict = ref('')

    const districts = computed(() => {
        const city = cities.value.find(c => c.name === selectedCity.value)
        return city ? city.districts : []
    })


    // 引用 jQuery 做 toggle
    onMounted(() => {

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
    })
    
</script>




<template>
    <section class="checkout-section">

        <!-- ---------------- 訂單明細 ---------------- -->
        <section class="cart-list">

            <h1 class="common-title">訂單明細</h1>

            <!-- 收合標題 -->
            <div class="toggle-total">
                <p class="total">合計：NT$6,060</p>
                <p class="count" id="cartCount">購物車(3件)</p>
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

        <!-- ---------------- 表單 ---------------- -->
        <form method="post" action="#">
            <!-- ---------------- 付款方式 ---------------- -->
             <section class="payment-method">
                <h1 class="common-title">付款方式</h1>
                <div class="payment-method__radio">
                    <label>
                        <input type="radio" name="gender" value="貨到付款"> 貨到付款
                    </label>
                    <label>
                        <input type="radio" name="gender" value="線上刷卡"> 線上刷卡
                    </label>
                </div>
             </section>

            <!-- ---------------- 收件資料 ---------------- -->
            <section class="receipt-info">
                <h1 class="common-title">收件資料</h1>
                <div class="receipt-info__form">
                    <div class="input-box">
                        <h3>送貨方式：宅配（台灣本島地區適用）</h3>
                        <label class="same-info">
                            <input type="checkbox"> 收件人資料與會員資料相同
                        </label>
                    </div>
                    <div class="input-box">
                        <h3><span>*</span>收件人名稱</h3>
                        <div class="receiver">
                            <input type="text">
                            <p>（請填入真實姓名，以確保順利收件）</p>
                        </div>
                    </div>
                    <div class="input-box">
                        <h3>電話</h3>
                        <input type="text" placeholder="02 1234 5678">
                    </div>
                    <div class="input-box">
                        <h3><span>*</span>行動電話</h3>
                        <input type="text" placeholder="0912 345 678">
                    </div>
                    <div class="input-box">
                        <h3><span>*</span>地址</h3>
                        <div class="address">
                            <!-- 縣市 -->
                            <select id="" v-model="selectedCity">
                                <option value="">請選擇縣市</option>
                                <option v-for="city in cities" :value="city.name">
                                    {{ city.name }}
                                </option>
                            </select>

                            <!-- 區 -->
                            <select id="" v-model="selectedDistrict" :disabled="!selectedCity">
                                <option value="">請選擇區域</option>
                                <option v-for="district in districts" :value="district">
                                    {{ district }}
                                </option>
                            </select>
                        </div>
                        <input type="text" placeholder="請輸入真實地址">
                    </div>
                    <div class="input-box">
                        <h3>發票抬頭</h3>
                        <input type="text">
                    </div>
                    <div class="input-box">
                        <h3>統一編號</h3>
                        <input type="text">
                    </div>
                    <div class="input-box">
                        <h3>訂單備註</h3>
                        <textarea rows="4" placeholder="有什麼想告訴賣家嗎？"></textarea>
                    </div>
                </div>
            </section>

            <!-- ---------------- 按鈕區 ---------------- -->
            <section class="btn-box">
                <router-link to="/cartpage/cart" class="router-link">
                    <p class="previous-btn">< 返回上一步</p>
                </router-link>
                <router-link to="/cartpage/cartsuccess" class="router-link">
                    <p class="next-btn">完成訂單</p>
                </router-link>
            </section>

        </form>
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

</style>