<script setup>
    // 組件
    import Pagination from '@/components/common/Pagination.vue';
    // 方法
    import { ref, watch, computed } from 'vue'
    import bus from '@/composables/useMitt';
    // 假資料
    import products from '@/data/products';
    
    // 父傳子接收: Proxy(Object) {main: '天文望遠鏡', sub: '基礎入門型'}
    const props = defineProps({
        selectedCate: {
            type: Object,
            default: null,
        }
    })
    // console.log(props.selectedCate)

// -------------------------------------------------------------------------------

    const items = ref(products) // 生成假資料
    // console.log(items)
    const currentPage = ref(1) // 預設第一頁
    const pageSize= ref(16) // 每頁顯示幾筆

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

    // =====================================================
    // ==================== 商品類型篩選 ====================
    // =====================================================
    const filteredItems = computed(() => {
        // 判斷有沒有選
        if(!props.selectedCate){
            return items.value
        }else {
            return items.value.filter((product) => {
                // 商品分類名稱相等
                return product.category.main === props.selectedCate.main && product.category.sub === props.selectedCate.sub
            })
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
    }






</script>




<template>
    <section>
        <!-- ----------------------- 購物車區塊 ----------------------- -->
        <!-- <section class="cart">
            <h1>這是購物車</h1>
            <div class="cartbox">
                <h2>商品名稱：</h2>
                <p>商品數量：</p>
                <p>商品金額：</p>
                <h2>總計數量：</h2>
                <h2>總計金額：</h2>
            </div>
        </section> -->
        <!-- ----------------------- 購物車區塊 ----------------------- -->


        <div class="product-items">
            <div class="item__card" v-for="( item, index ) in showItems"> <!-- 用顯示的商品陣列跑 v-for -->

                <RouterLink :to="`/shop/category/product/${item.id}` "class="router-link" > 
                    <img :src="item.pic" alt="商品假圖" class="item__card__img">
                    <div class="item__card__text">
                        <h1 class="item__card__text--name">{{ item.name }}</h1>
                        <h2 class="item__card__text--spe-price">NT$ {{ item.specialPrice }}</h2>
                        <h3 class="item__card__text--price">NT$ {{ item.price }}</h3>
                    </div>
                </RouterLink>

                <div class="item__card--cart-btn" @click="addCart(item)">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
        </div>
        <div>  
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
            border: 1px solid red;
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
</style>