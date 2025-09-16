<script setup>
import { onMounted, ref } from 'vue'
import axios from "axios";

//--------------------------接收父層文章渲染回傳值-------------------------//
const props = defineProps({
  articles: {
    type: Array,  
    required: true  //如果沒傳值會警告
  }
}) 

//---------------------------建立一個token--------------------------------//
function getUserToken() {
  let token = localStorage.getItem("userToken"); //將 token 存到localStorage
  if (!token) {  //如果沒有token 產生一個
    token = crypto.randomUUID(); // 產生唯一 ID
    localStorage.setItem("userToken", token); //儲存方式 userToken:UUID
  }
  return token;
}
const userToken = getUserToken();

//---------------------------按贊程式連接資料庫----------------------------//

onMounted(()=>{  
    setTimeout(()=>{          //利用時間延遲讓父層能抓到資料
        if (Array.isArray(props.articles) && props.articles.length > 0){
            props.articles.forEach(article => {

        axios.post(import.meta.env.VITE_AJAX_URL + "news/like.php", 
            {   
                token: userToken,
                article_id: article.ID,
                action: "get"
            },

            {headers: { "Content-Type": "application/json" }}
            )

            .then(res => {
            article.likeCount = res.data.likeCount;
            article.liked = res.data.liked;
            })
            .catch((err)=>{
            console.log(err,'查詢失敗')
            })
        })

        }else{
            console.warn(" props.articles 尚未有資料，跳過查詢")
        }
        
    },500)
    
})
    function togglike(article){
        const action = article.liked ? "unlike" : "like";
        axios.post(
            import.meta.env.VITE_AJAX_URL + "news/like.php", 
            {
            token: userToken,
            article_id: article.ID,
            action: action
            },
            {headers: { "Content-Type": "application/json" }}
            )

        .then(res =>{
            if (res.data.success) {
            article.liked = res.data.liked;
            article.likeCount = res.data.likeCount ;
            } else {
            alert(res.data.message);
            }
        });
       
    }
   
    
</script>


<template>
        <div class="news-article-wrapper">

            <div class="news-article-list" v-for="article in props.articles" :key="article.ID">


                    <router-link :to= "{ name: 'ArticleDetailpage', params: { id: article.ID } }" class="news-article-img">    <!--抓陣列資料前者article陣列裡的物品,後者是整個陣列-->
                        <img :src=article.image alt=""/>  
                    </router-link>


                    <div class="news-article-header">

                        <div class="news-article-box">

                            <div class="news-article-title">

                                <h3 class="label--blue">{{article.category}}</h3>

                                <div class="news-article-time">
                                    <p>{{article.publish_date}}</p>
                                </div>
                                
                            
                            </div>
                        
                            <div>
                                <button @click="togglike(article)">
                                    <p><i :class="article.liked ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i></p> 
                                    <span>{{ article.likeCount }}</span>
                                </button>                     
                            </div>

                        </div>

                        <router-link :to="{ name: 'ArticleDetailpage', params: { id: article.ID } }" class="news-article-h2">
                            <h2>{{article.title}}</h2>
                        </router-link>
                        <hr>

                        <router-link :to= "{ name: 'ArticleDetailpage', params: { id: article.ID } }"
                            class="router-link-card">
                            <div class="news-article-content">
                            <div class="cnContent--18px" v-html="article.content"></div>
                              <p class="Readmore">Read more</p>
                            </div>
                            <!-- <div class="news-article-content">
                                <p class="cnContent--18px">{{ article.content }}</p>
                                <p class="Readmore">Read more</p>
                            </div> -->
                                
                        </router-link>
                    </div>

                
            </div>       
        </div>

         
            
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.news-article-wrapper {
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;
  margin-top: 40px;
  box-sizing: border-box;
  padding-inline: 0; /* 清掉左右 padding */
  max-width: 100%;   /* 不要超過父層 */
  overflow-x: clip;

  .news-article-list {
    margin: 0 auto;
    color: $primaryColor-500;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 120px;
    background-color: $primaryColor-900;
    padding: 10px;
    flex-wrap: wrap;
    max-width: 1200px;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    min-width: 0;

    .news-article-img {
      max-width: 350px;
      aspect-ratio: 3 / 2;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      min-width: 0;

      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }

      // ≤1070px
      @media (max-width: 1070px) {
        max-width: 600px !important;
        margin-top: 20px;
      }
    }

    .news-article-header {
      max-width: 580px;
      min-width: 0;

      .router-link-card {
        display: flex;
        gap: 120px;
        text-decoration: none;
        color: inherit;
      }

      .news-article-h2 {
        margin: 20px 0;
        color: $FontColor-white;
        font-size: $pcChFont-H3;
        font-weight: 500;
        text-decoration: none;
        display: block;
      }

      .news-article-content {
        max-width: 580px;
        width: 100%;
        margin-top: 20px;
        color: $primaryColor-100;

        .cnContent--18px {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;

          &:hover {
            font-weight: bold;
          }
        }

        .Readmore {
          margin-top: 35px;
          float: right;
          text-decoration: underline;
        }
      }

      .news-article-box {
        display: flex;
        justify-content: space-between;
        align-items: last baseline;

        button {
          display: flex;
          justify-content: center;
          align-items: last baseline;
          width: 60px;
          height: 30px;
          color: white;
          background-color: $primaryColor-900;
          border: none;

          &:hover {
            cursor: pointer;
          }
        }

        span {
          line-height: 30px;
          font-size: 20px;
          margin-left: 5px;
        }

        .fa-solid.fa-star {
          color: yellow;
          font-size: 25px;
        }
        .fa-regular.fa-star {
          font-size: 25px;
        }

        .news-article-title {
          display: flex;
          align-items: center;
          gap: 10px;

          h3 {
            line-height: 30px;
            text-align: center;
            font-weight: 500;
            color: $primaryColor-100;
            padding: 5px;
            font-size: $pcChFont-p;
          }
        }

        .news-article-time {
          align-items: center;
          color: $primaryColor-100;
          display: flex;
          gap: 5px;
        }
      }
    }

    // ≤1070px
    @media (max-width: 1070px) {
      max-width: 700px !important;
      gap: 60px !important;
    }

    // ≤431px
    @include respond("xs") {
      gap: 80px;
    }
  }

  // ≤431px
  @include respond("xs") {
    padding: 16px;
  }
}



</style>