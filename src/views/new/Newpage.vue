<script setup>
import { ref,computed } from 'vue'
import testimg from '@/assets/images/news/news-article-a1.jpg'; // Assuming the image is in the assets folder
import NewsBanner from '@/components/new/NewsBanner.vue';
import NewsBar from '@/components/new/NewsBar.vue'; 
import NewsArticleList from '@/components/new/NewsArticleList.vue';
import Pagination from '@/components/common/Pagination.vue';
import {articles as articlesDate} from '@/data/articles' //從外部匯入js檔案 然後因為需要響應式變化 利用as重新命名

const articles = ref(articlesDate)  //幫 articles 加上響應式變化ref
const currentPage = ref(1);  //目前所在頁面
const pageSize = ref(4);  //每頁顯示數量 

/*文章分類*/
const categories = ref( ['全部文章','天象事件','知識新知','生活應用'] ) 
const selectedCategory = ref('全部文章')  //選擇的分類


/* 2 .文章過濾切換 */
const filterArticles = computed(()=>{ 
    if(selectedCategory.value === '全部文章'){   //如果點全部文章顯示全部
        return articles.value //顯示所有文章
    }
    else{
        return articles.value.filter(a => a.tag === selectedCategory.value)  //如果點其他分類 顯示符合的tag分類
    }
})

/* 1. 更新選中的切換分類 */
function changeCategory(cat){
    selectedCategory.value = cat   
}

/*---分頁器筆數計算--*/
    const showArticles = computed(()=>{
        const start = (currentPage.value - 1) * pageSize.value  //從第X頁的第X筆開始 例如:第一頁會從(1-1)*4 第0筆資料開始 
        const end = start + pageSize.value //一共幾筆
        console.log(` 目前第${currentPage.value}頁 顯示${start} 到 ${end-1}筆`) //驗證用而已
        return filterArticles.value.slice(start, start + pageSize.value)  // 保險使用 slice複製陣列 [開始,結束] 確保資料不會因為切頁被刪除回不去
    })
    
</script>

<template>
  <div class="news-article-box">  
      <NewsBanner/>  
       <main>
        <NewsBar
        :categories= "categories"  
        :selectedCategory= "selectedCategory"
        @changeCategory= "changeCategory" 
        />

        <NewsArticleList :articles="showArticles"/>
        <Pagination 
         v-model= "currentPage"
         v-model:pageSize= "pageSize"  
        :total= "filterArticles.length"
         />    

      </main> 
  </div>
</template>

<style scoped>
/*專屬背景圖*/
.news-article-box{
  background-image: url('@/assets/images/news/news-article-backgrounds.png');
  background-size: cover;           /* 讓圖片填滿且保持比例 */
  background-position: center;      /* 水平、垂直都置中 */
  background-repeat: no-repeat;
  box-sizing: border-box;
}
</style>