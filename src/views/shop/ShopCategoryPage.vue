<!-- 分類列表頁 -->
<script setup>
    // 組件
    import ShopBanner from '@/components/shop/ShopBanner.vue';
    import Breadcrumbs from '@/components/shop/Breadcrumbs.vue';
    import CategoryToolbar from '@/components/shop/category/CategoryToolbar.vue';
    import CategoryList from '@/components/shop/category/CategoryList.vue';
    import ProductList from '@/components/shop/category/ProductList.vue';
</script>


<template>
    <section class="shop-category">
        <ShopBanner />
        <Breadcrumbs />
        <section class="product-section">
            <CategoryToolbar />
            <div class="main-section">            
                <CategoryList />
                <ProductList />
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
</style>