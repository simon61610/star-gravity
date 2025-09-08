<script setup>
import ArticleAside from '@/components/new/ArticleAside.vue';
import ArticleContent from '@/components/new/ArticleContent.vue';
import axios from "axios";
import { useRoute } from 'vue-router'
import { ref, onMounted,watch } from 'vue'
const articles = ref([])
const article = ref(null)
const route = useRoute()

onMounted(() => {
    axios.get(`https://tibamef2e.com/tjd102/g1/pdo/news/newsgetall.php?id=${route.params.id}`)
        .then(res => {
        article.value = res.data.article
        })
        .catch((err)=>{
        console.log(err,'資料單篇失敗')
        })

    axios.get(`https://tibamef2e.com/tjd102/g1/pdo/news/newssearch.php`)
        .then(res => {
            articles.value = res.data
        })
        .catch((err)=>{
        console.log(err,'資料全部失敗')
        })
})

watch(() => route.params.id, async (newId) => {  //監聽單篇文章id 
  axios.get(`https://tibamef2e.com/tjd102/g1/pdo/news/newsgetall.php?id=${newId}`)
    .then(res => {
      article.value = res.data.article
    })
    .catch((err) => {
      console.log(err, '資料單篇失敗')
    })
})



</script>

<template>
    <main>
        <section class="article-page-body">
            <ArticleContent  v-if="article" :article="article" :key="article.ID"/>  <!---v-if作用 等真的有東西(非null)才顯示文章內容 ----->
            <!-- <ArticleContent :id="$route.params.id" :key="$route.params.id"/>  -->
            <ArticleAside    v-if="article && articles.length"   :articles="articles" :article="article"/>
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
        padding: 16px;
        margin-top: 100px;
        margin-bottom: 100px;
        max-width: 1200px;
        width: 100%;
        justify-content: center;
        display: flex;
        gap:90px;
        
        
    }
   
}
@media screen and (max-width: 650px){
    main{
        padding:  0 16px;
        .article-page-body{
        margin-top: 36px !important;
        display: flex;
        flex-direction: column;
        }
    }
   
}



</style>