<script setup>
import ArticleAside from '@/components/new/ArticleAside.vue';
import ArticleContent from '@/components/new/ArticleContent.vue';

</script>

<template>
    <main>
        <section class="article-page-body">
            <ArticleContent :id="$route.params.id" :key="$route.params.id"/> <!--id是負責傳給子層資訊對應接收  key是給vue標示已經不頁-->
            <ArticleAside/>
        </section>
    </main>
</template>

<style scoped>
main{
    background-image: url('@/assets/images/news/news-article-backgrounds.png');
    background-size: cover;           /* 讓圖片填滿且保持比例 */
    background-position: center;      /* 水平、垂直都置中 */
    background-repeat: no-repeat;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    display: flex;

    
    
    .article-page-body{
        margin-top: 100px;
        margin-bottom: 100px;
        max-width: 1200px;
        width: 100%;
        justify-content: center;
        display: flex;
        gap:90px;
        
        
    }
   
}
</style>