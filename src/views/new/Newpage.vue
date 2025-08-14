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

/* 不需要了
const articles = ref([
      
        {
            id:1,
            img:testimg,
            tag:'天象事件',
            title: '5/24 下午1600日全蝕發生!',
            time:'2025/5/23',
            content:'6月21日,台灣將迎來難得一見的天文奇景——日環蝕，也被譽為「上帝的金戒指」。在日月精準交會的剎那，太陽被月亮遮掩，只留下一道璨的金環，彷彿宇宙為地球戴上的神聖指環。錯過，將是一生遺憾。'

        }
        ,
        {
            id:2,
            img:testimg,
            tag:'天象事件',
            title: '5/24 下午1600日全蝕發生!',
            time:'2025/5/23',
            content:'6月21日,台灣將迎來難得一見的天文奇景——日環蝕，也被譽為「上帝的金戒指」。在日月精準交會的剎那，太陽被月亮遮掩，只留下一道璨的金環，彷彿宇宙為地球戴上的神聖指環。錯過，將是一生遺憾。'
        }
       
       ,
       
        {
            id:3,
            img:testimg,
            tag:'天象事件',
            title: '5/24 下午1600日全蝕發生!',
            time:'2025/5/23',
            content:'6月21日,台灣將迎來難得一見的天文奇景——日環蝕，也被譽為「上帝的金戒指」。在日月精準交會的剎那，太陽被月亮遮掩，只留下一道璨的金環，彷彿宇宙為地球戴上的神聖指環。錯過，將是一生遺憾。'


        }
        ,
        {
            id:4,
            img:testimg,
            tag:'天象事件',
            title: '5/24 下午1600日全蝕發生!',
            time:'2025/5/23',
            content:'6月21日,台灣將迎來難得一見的天文奇景——日環蝕，也被譽為「上帝的金戒指」。在日月精準交會的剎那，太陽被月亮遮掩，只留下一道璨的金環，彷彿宇宙為地球戴上的神聖指環。錯過，將是一生遺憾。'
        }
        ,
         {
            id:5,
            img:testimg,
            tag:'天象事件',
            title: '5/24 下午1600日全蝕發生!',
            time:'2025/5/23',
            content:'6月21日,台灣將迎來難得一見的天文奇景——日環蝕，也被譽為「上帝的金戒指」。在日月精準交會的剎那，太陽被月亮遮掩，只留下一道璨的金環，彷彿宇宙為地球戴上的神聖指環。錯過，將是一生遺憾。'
        }


    ])*/


    const showArticles = computed(()=>{
        const start = (currentPage.value - 1) * pageSize.value  //從第X頁的第X筆開始 例如:第一頁會從(1-1)*4 第0筆資料開始 
        const end = start + pageSize.value //一共幾筆
        console.log(` 目前第${currentPage.value}頁 顯示${start} 到 ${end-1}筆`) //驗證用而已
        return articles.value.slice(start, start + pageSize.value)  // 保險使用 slice複製陣列 [開始,結束] 確保資料不會因為切頁被刪除回不去
    })
    
</script>

<template>
  <div class="news-article-box">  
    <NewsBanner/>
      <main>
        <NewsBar/>
        <NewsArticleList :articles="showArticles"/>
        <Pagination 
         v-model="currentPage"
         v-model:pageSize="pageSize"
        :total="articles.length"
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