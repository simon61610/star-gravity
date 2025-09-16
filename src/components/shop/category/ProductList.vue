<!-- 商品陳列區 -->
<!-- 
- TODO: bug - 顯示筆數替換後，卻沒有切分頁
-->

<script setup>
    import { ref, watch, computed, onMounted, onUnmounted } from 'vue'

    /* ========== 組件 ========== */
    import Pagination from '@/components/common/Pagination.vue';
    import shopToast from '@/components/common/shopToast.vue';
    import { showToast } from '@/composables/useToast';
    
    /* ========== 套件 ========== */
    import axios from 'axios';
    import bus from '@/composables/useMitt';

    /* ========== 資料 ========== */
    import { cateList } from '@/composables/useProductsCate';

    /* ========== 環境變數 ========== */
    const BASE_URL = import.meta.env.VITE_AJAX_URL_NOEND

    /* ========== 共用 ========== */
    const items = ref([]) // 篩選後的商品 Array

    /* ========== 接收從 CategoryToolbar.vue 用 bus 傳遞過來的事件  ========== */
    const searchKeyword = ref('')   // 搜尋
    const priceOrder = ref('')      // 價格排序
    const pageSize= ref(16)         // 每頁顯示幾筆
    const currentPage = ref(1)      // 預設第一頁

    bus.on('searchKeyword', (keyword) => {
        searchKeyword.value = keyword || ""
        currentPage.value = 1
    })
    bus.on('priceOrder', (order) => {
        priceOrder.value = order || ""
        currentPage.value = 1
    })
    bus.on('qtyChanege', (qty) => {
        pageSize.value = qty || 16
        currentPage.value = 1
    })

    onUnmounted(() => {
        bus.off('searchKeyword')
        bus.off('priceOrder')
        bus.off('qtyChanege')
    })

    /* ========== AJAX: 抓取商品資料 ========== */
    onMounted(async() => {
        const res = await axios.get(import.meta.env.VITE_AJAX_URL + 'starshop/client/products_get.php')
        items.value = res.data
        /* 
        ID : 1
        category_name : "基礎入門型"
        description : "適合兒童的觀星好物，入門款天文望遠鏡，支援手機拍攝記錄。"
        discount : 80
        images : "/pdo/starshop/images/基礎入門型1-3.png,/pdo/starshop/images/基礎入門型1-2.png,/pdo/starshop/images/基礎入門型1-3.png"
        introduction : "別看它小巧輕便，這台望遠鏡可是為初學觀星者量身打造。結構簡單易上手，適合孩子與初學者進入天文世界第一步。鏡筒設計清楚直觀，能輔助理解反射式望遠鏡的基本運作，無論白天觀察遠景或夜間捕捉星光，都能輕鬆拍攝記錄。"
        is_active : 1
        name : "入門孩童款 50mm 入門望遠鏡"
        original_price : 4800
        promotion : "全館望遠鏡皆享保固內免費清潔服務。"
        sale_price : 3840
        stock : 50 
        */
    })
    
    /* ========== 功能: 商品分類篩選 ========== */
    // 接收父組件傳遞的屬性 + 屬性值: Proxy(Object) {main: '天文望遠鏡', sub: '基礎入門型'}
    const props = defineProps({
        selectedCate: {
            type: Object,
            default: null,
        }
    })

    // 篩選後，分頁回到第一頁
    // watch(偵測的資料, 函數)
    watch(() => props.selectedCate, () => {
        currentPage.value = 1

        const target = document.querySelector('section')
        window.scrollTo({ 
            top: target.offsetTop, 
            behavior: 'smooth'
        })
    })

    // 商品類型篩選
    const filteredItems = computed(() => {
        let selectedCateProducts = items.value

        // 搜尋功能
        if(searchKeyword.value){
            const keyword = searchKeyword.value
            selectedCateProducts = selectedCateProducts.filter(p => p.name.includes(keyword))
        }

        // 價格排序: 用解構，避免原本陣列的值改變
        if(priceOrder.value == 'asc'){
            selectedCateProducts = [...selectedCateProducts].sort((a, b) => {return a.sale_price - b.sale_price})
        }else if(priceOrder.value == 'desc'){
            selectedCateProducts = [...selectedCateProducts].sort((a, b) => {return b.sale_price - a.sale_price})
        }

        // 1. 如果沒選
        if(!props.selectedCate){
            return selectedCateProducts
        }
        /* else {
            return items.value.filter((product) => {
                // 商品分類名稱相等
                return product.category_name === props.selectedCate
            })
        } */

        // 2. 如果只選 sub
        if(props.selectedCate.sub){
            return selectedCateProducts.filter(
                product => product.category_name === props.selectedCate.sub)
        }

        // 3. 如果選了 main
        if(props.selectedCate.main){
           return selectedCateProducts.filter(
                product => cateList[props.selectedCate.main].includes(product.category_name)
           )
        }
    })

    /* ========== 功能: Pagination ========== */
    // 每頁顯示的商品
    const showItems = computed (() => {
        const start = (currentPage.value - 1) * pageSize.value              // 從第幾筆開始
        return filteredItems.value.slice(start, start + pageSize.value)     // 顯示的商品陣列
    })

    const pageChange = (newPage) => {
        currentPage.value = newPage
    }

    /* ========== 功能: 加入購物車 ========== */
    const storage = localStorage

    // storage 設計: 商品名稱|圖片路徑|每件價格|數量|原價
    function addCart(product){
        // 加入判斷: 商品庫存 <= 0 不執行
        if(product.stock <= 0){
            showToast("此商品缺貨中")
            return
        }

        if(!storage['addItemList']){
            storage['addItemList'] = ''
        }

        const itemId = product.ID
        const firstImage = BASE_URL + product.images.split(',')[0]
        const unitPrice = product.sale_price
        const originalPrice = product.original_price

        // 如果已經買過，增加數量
        if(storage[itemId]){
            let existInfo = storage[itemId].split('|')
            // console.log(existInfo) // ['入門孩童款 50mm 入門望遠鏡', '/pdo/starshop/images/基礎入門型1-3.png', '3840', '1']
            let newQty = +existInfo[3] + 1 // 用 + 隱性轉型
            // console.log(typeof(newQty)) // number
            let updatedInfo = `${existInfo[0]}|${existInfo[1]}|${existInfo[2]}|${newQty}|${originalPrice}`

            storage[itemId] = updatedInfo
        }else{ // 第一次買
            storage['addItemList'] += `${itemId}, `
            storage[itemId] = `${product.name}|${firstImage}|${unitPrice}|1|${originalPrice}`
        }

        bus.emit('notifyUpdateCart') // 通知 Header 更新購物車數量
        showToast('已成功加入購物車!')
    }
</script>


<template>
    <section>
        <shopToast />
        <div class="product-items">

            <div class="item__card" v-for="( item, index ) in showItems"> <!-- 用顯示的商品陣列跑 v-for -->
                <RouterLink :to="`/shop/category/product/${item.ID}` "class="router-link" > 
                    <img :src="BASE_URL + item.images.split(',')[0]" alt="商品假圖" class="item__card__img">
                    <div class="item__card__text">
                        <h1 class="item__card__text--name">{{ item.name }}</h1>
                        <h2 class="item__card__text--spe-price">NT$ {{ item.sale_price }}</h2>
                        <h3 class="item__card__text--price">NT$ {{ item.original_price }}</h3>
                    </div>
                </RouterLink>

                <div 
                    class="item__card--cart-btn" 
                    @click="addCart(item)"
                    :class="{ disabled: item.stock <= 0 }"
                >
                    <span v-if="item.stock > 0">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                    <span v-else>
                        缺貨中
                    </span>
                </div>
            </div>

        </div>

        <div class="pagination">  
            <Pagination
                :modelValue="currentPage"
                @update:modelValue="pageChange"

                :pageSize="pageSize"

                :total="filteredItems.length"
            />
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

    .product-items {
        color: white;
        display: flex;
        flex-wrap: wrap;
        gap: 40px;

        .item__card {
            // border: 1px solid red;
            max-width: 200px;
            cursor: pointer;
            text-align: center;
            padding: 4px;

            &__img {
                margin-bottom: 16px;
                display: block;
                width: 200px;
                height: 200px;
                object-fit: cover;
            }
            &__text {
                padding: 0 16px;
                &--name {
                    font-size: $pcChFont-H4;
                    margin-bottom: 12px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                &--spe-price {
                    font-size: $pcChFont-p;
                    margin-bottom: 12px;
                }

                &--price {
                    color: #ccc;
                    text-decoration: line-through;
                    margin-bottom: 16px;
                }
            }
            
            // 購物車按鈕
            &--cart-btn {
                border: 2px solid white;
                border-radius: 8px;
                font-size: 16px;
                // padding: 6px 0;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.3s ease;

                // 購物車按鈕 hover 效果
                &:hover {
                    border: 2px solid $primaryColor-500;
                    color: $primaryColor-500;
                }

                &.disabled{
                    border: 2px solid #888;
                    color: #888;
                    cursor: not-allowed;
                }
            }
        }
    }


    @media screen and (max-width: 431px) {
        .product-items {
            padding: 0 16px;
            gap: 16px;
            justify-content: center;

            .item__card {
                max-width: 45%;
                // border: 1px solid red;

                &__img {
                    width: 100%;
                    height: auto;
                }
                &__text {
                    &--name {
                        font-size: 16px;
                    }
                    &--spe-price {
                        font-size: 14px;
                    }
                    &--price {
                        font-size: 14px;
                    }
                }
            }
        }

        .pagination {
            // border: 1px solid red;
        }
    }
</style>