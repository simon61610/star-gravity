<!-- 分類列表頁 -->
<script setup>
    import { ref, } from 'vue'
    
    // 組件
    import ShopBanner from '@/components/shop/ShopBanner.vue';
    import Breadcrumbs from '@/components/shop/Breadcrumbs.vue';
    import CategoryToolbar from '@/components/shop/category/CategoryToolbar.vue';
    import CategoryList from '@/components/shop/category/CategoryList.vue';
    import ProductList from '@/components/shop/category/ProductList.vue';



    // =====================================================
    // ==================== 商品類型篩選 ====================
    // =====================================================
    const selectedCate = ref(null)
    const showCategoryList = ref(true)

    // 接收事件的處理函數
    const selected = (selectedObj) => {
        selectedCate.value = selectedObj
        console.log(selectedCate.value) // Proxy(Object) {main: '天文望遠鏡', sub: '基礎入門型'}
    }
    // template 用 selected-cate 當作屬性，準備傳值給子

</script>


<template>
    <section class="shop-category">
        <ShopBanner />
        <Breadcrumbs />
        <section class="product-section">
            <CategoryToolbar />
            <div class="main-section">
                <div class="category-list" v-show="showCategoryList">
                    <CategoryList @select="selected"/>
                </div>           
                <ProductList :selected-cate = "selectedCate"/>
            </div>

            <!-- 浮動按鈕 -->
            <div class="m-cate-btn">
                <i class="fa-solid fa-bag-shopping"></i>
            </div>
        </section>
    </section>
</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';
    .shop-category {
        background-color: $bgColor-shop;
        
        .product-section {
            margin: 0 auto;
            max-width: 1200px;
            padding: 40px 16px 60px;

            .main-section {
                display: flex;
                justify-content: center;
                gap: 60px;
            }
        }
    }

    .m-cate-btn {
        color: white;
        background-color: $primaryColor-500;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        right: 20px;
        bottom: 20px;
        display: none;

    }


    @media (max-width: 431px) {

        // 暫時先消失
        .category-list {
            display: none;
        }

        .m-cate-btn {
            display: flex;
        }
    }
</style>