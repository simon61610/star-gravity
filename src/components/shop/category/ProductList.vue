<script setup>
    // 組件
    import Pagination from '@/components/common/Pagination.vue';
    import shopToast from '@/components/common/shopToast.vue';
    // 方法
    import { ref, watch, computed, onMounted } from 'vue'
    import bus from '@/composables/useMitt';
    import { showToast } from '@/composables/useToast';
    import axios from 'axios';
    import { cateList } from '@/composables/useProductsCate';
    // 假資料
    // import products from '@/data/products';
    // const items = ref(products) // 生成假資料

    const items = ref([])

    onMounted(async() => {
        const res = await axios.get(import.meta.env.VITE_AJAX_URL + 'starshop/client/products_get.php')
        // console.log(res.data);
        
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
    
// -------------------------------------------------------------------------------

    // 父傳子接收: Proxy(Object) {main: '天文望遠鏡', sub: '基礎入門型'}
    const props = defineProps({
        selectedCate: {
            type: Object,
            default: null,
        }
    })
    // console.log(props.selectedCate)

// -------------------------------------------------------------------------------

    // console.log(items)
    const currentPage = ref(1) // 預設第一頁
    const pageSize= ref(16) // 每頁顯示幾筆

    // const toast = ref(false)

// -------------------------------------------------------------------------------
    // 分類重選，回到第一頁
    // watch(偵測的資料, 函數)
    watch(() => props.selectedCate, () => {
        currentPage.value = 1
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' // 平滑滾動 
        })
    })

    // 吐司出現的function
    /* const showToast = () => {
        toast.value = true
        setTimeout(() => {
            toast.value = false
        }, 2000)
    } */

    // =====================================================
    // ==================== 商品類型篩選 ====================
    // =====================================================
    const filteredItems = computed(() => {
        
        const selectedCateProducts = items.value

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

    // =====================================================
    // ==================== Pagination =====================
    // =====================================================
    // 每頁顯示的商品
    const showItems = computed (() => {
        const start = (currentPage.value - 1) * pageSize.value // 從第幾筆開始
        return filteredItems.value.slice(start, start + pageSize.value) // 顯示的商品陣列
    })

    function pageChange(newPage) {
        currentPage.value = newPage
    }



    // =====================================================
    // ==================== 加入購物車 ====================
    // =====================================================
    
    const storage = localStorage

    // 商品名稱|圖片路徑|每件價格|數量|原價
    function addCart(product){
        if(!storage['addItemList']){
            storage['addItemList'] = ''
        }

        const itemId = product.ID
        const firstImage = product.images.split(',')[0]
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

        /* Storage 的 Key 和 Value */
        /* const itemId = `P${product.ID}`
        const firstImage = product.images.split(',')[0]
        const itemValue = `${product.name}|${firstImage}|${product.sale_price}` // 輕型孩童款 50mm 輕型望遠鏡|/pdo/starshop/images/基礎入門型2-1.png|3840
 */
        // alert(itemValue) 
        // itemId => P1 
        // itemValue => 基礎入門型 商品 1|https://placehold.co/480x480?text=Product+1|9718
        // ===============================================================================

        /* 直接從物件中抓的資料字串 */
        /* const itemName = product.name // 基礎入門型 商品 1
        const itemPic = firstImage // https://placehold.co/480x480?text=Product+1
        const itemSpecialPrice = product.sale_price // 9718 */
        // alert(itemSpecialPrice)

        // ===============================================================================
        
        /* if(storage[itemId]){ // 如果已經買過，價格累加
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
        } */

        // ===============================================================================
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
                    <img :src="item.images.split(',')[0]" alt="商品假圖" class="item__card__img">
                    <div class="item__card__text">
                        <h1 class="item__card__text--name">{{ item.name }}</h1>
                        <h2 class="item__card__text--spe-price">NT$ {{ item.sale_price }}</h2>
                        <h3 class="item__card__text--price">NT$ {{ item.original_price }}</h3>
                    </div>
                </RouterLink>

                <div class="item__card--cart-btn" @click="addCart(item)">
                    <i class="fa-solid fa-cart-shopping"></i>
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
                padding: 6px 0;
                transition: all 0.3s ease;

                // 購物車按鈕 hover 效果
                &:hover {
                    border: 2px solid $primaryColor-500;
                    color: $primaryColor-500;
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