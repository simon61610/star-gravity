<!-- 分類列表頁 -->
<script setup>
    import Breadcrumbs from '@/components/shop/Breadcrumbs.vue';
    import CategoryToolbar from '@/components/shop/category/CategoryToolbar.vue';
    import CategoryList from '@/components/shop/category/CategoryList.vue';
    import ProductList from '@/components/shop/category/ProductList.vue';
</script>


<template>
    <section class="shop-category">
        <div class="shop-banner"></div>
        <Breadcrumbs />
        <section class="product-section">
            <CategoryToolbar />
            <div>            
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
        .shop-banner {
            aspect-ratio: 6 / 1;
            background-image: url(@/assets/images/shop/shop-banner.jpg);
            background-size: cover;
            background-position: center;
        }
        .product-section {
            margin: 0 auto;
            max-width: 1200px;
            padding: 40px 16px 60px;
        }
    }


</style>