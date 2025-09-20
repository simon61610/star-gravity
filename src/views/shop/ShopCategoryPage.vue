<!-- 商城分類頁 -->

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router';

    /* ========== 組件 ========== */
    import ShopBanner from '@/components/shop/ShopBanner.vue';
    import Breadcrumbs from '@/components/shop/Breadcrumbs.vue';
    import CategoryToolbar from '@/components/shop/category/CategoryToolbar.vue';
    import CategoryList from '@/components/shop/category/CategoryList.vue';
    import ProductList from '@/components/shop/category/ProductList.vue';

    /* ========== 資料 ========== */
    import { productsCate } from '@/composables/useProductsCate';
    
    /* ========== 通用 ========== */
    const router = useRouter()
    const route = useRoute()
    
    /* ========== 功能: 商品類型篩選 ========== */
    const selectedCate = ref(null) // 傳給子組件的屬性值

    // 一進來先判斷使用者從外部輸入或點擊了什麼分類
    onMounted(() => {
        if(route.params.main){
            const cate = productsCate.find(c => c.param === route.params.main)
            selectedCate.value = {
                main: cate.name,
                sub: null
            }

            // TODO: 暫時先把字串清掉，之後優化再來改
            router.replace({name: 'category'})
        }
    })

    // selected: 接收子組件傳遞 select 事件的處理函數
    // template 用 selected-cate 當作屬性，傳值給子組件
    const selected = (selectedObj) => {
        selectedCate.value = selectedObj
        console.log(selectedCate.value) // Proxy(Object) {main: '天文望遠鏡', sub: null} or {main: '天文望遠鏡', sub: '基礎入門型'}
    }

    /* ========== 功能: 浮動按鈕顯示 ========== */
    const isCateOpen = ref(false)
    const toggleCate = () => {
        isCateOpen.value = !isCateOpen.value
    }
</script>


<template>
    <section class="shop-category">
        <ShopBanner />
        <Breadcrumbs 
            :selected-cate="selectedCate"
            @updateSelectedCate="value => selectedCate = value"
        />
        <section class="product-section">
            <CategoryToolbar />
            <div class="main-section">
                <div class="category-list m-list" :class="{open: isCateOpen}">
                    <CategoryList @select="selected"/>
                </div>           
                <ProductList :selected-cate = "selectedCate"/>
            </div>

            <!-- 浮動按鈕 -->
            <div class="m-cate-btn" @click="toggleCate">
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
                justify-content: flex-start;
                gap: 60px;
            }
        }
    }

    .m-cate-btn {
        color: white;
        background-color: $secondaryColor-orange;
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
        z-index: 20;
    }

    @include respond('sm'){
        .m-list {
            position: fixed;
            top: 0;
            right: -100%;
            // display: none;
            z-index: 10;
            background-color: $primaryColor-500;
            width: 100%;
            display: flex;
            justify-content: center;
            height: 100%;
            transition: right .3s ease;
        }
        .m-list.open {
            right: 0;
        }
    }


    /* @media screen and (max-width: 431px) {

        .m-list {
            position: fixed;
            top: 0;
            right: -100%;
            // display: none;
            z-index: 10;
            background-color: $primaryColor-500;
            width: 100%;
            display: flex;
            justify-content: center;
            height: 100%;
            transition: right .3s ease;
        }

        .m-list.open {
            right: 0;
        }

        .m-cate-btn {
            display: flex;
        }
    } */
</style>