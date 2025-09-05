<script setup>
//import testimg from '@/assets/images/110093480_m.jpg'; // Assuming the image is in the assets folder
import { onMounted, ref, } from 'vue'
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
        props.articles.forEach(article => {
        axios.post(
            "pdo/news/like.php", 
                
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

    },500)
    
})
    function togglike(article){
        const action = article.liked ? "unlike" : "like";
        
        axios.post(
            "pdo/news/like.php", 
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
    // onMounted(()=>{
    //     props.articles.forEach(article => {   // ← 用 forEach，把每篇文章跑一遍
    //     const count = localStorage.getItem(`likeCount_${article.ID}`)
    //     if (count) { //判斷 localStorage 裡有沒有計數
    //     article.likeCount = parseInt(count,10)
    //     } else {
    //     article.likeCount = 0 // 預設 0
    //     }

    //     const likedStatus = localStorage.getItem(`liked_${article.ID}`)
    //     if (likedStatus) {    //判斷 localStorage 裡有沒有這個 key
    //     article.liked = likedStatus === 'true'   //有的話就使用儲存狀態的值
    //     } else {
    //     article.liked = false  //沒有就使用預設
    //     }
    //         })
    //     })
        


    //     function toglike(article){   //點擊+1方程式
    //          if (typeof article.likeCount !== 'number') {
    //             article.likeCount = 0  // 防呆，避免 NaN
    //         }
    //         article.liked = !article.liked  //如果點擊了表是true
    //         article.likeCount += article.liked ? 1 : -1; // 如果是true就+1 反之-1}
    //         localStorage.setItem(`likeCount_${article.ID}`, article.likeCount ) //儲存讚到localstorage
    //         localStorage.setItem(`liked_${article.ID}`,article.liked) //儲存點讚狀態到localStorage
    //     }
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
                                <p class="cnContent--18px">{{ article.content }}</p>
                                <p class="Readmore">Read more</p>
                            </div>
                                
                        </router-link>
                    </div>

                
            </div>       
        </div>

         
            
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';



/*:global(#app){   //使用:global可以讓scoped失效 讓#APP更改樣式 但又僅限於此頁不影響其他頁面

    padding-inline: 0 !important;
    max-width: 100%;
    overflow-x: clip;
    
}*/

.news-article-wrapper{
    display: flex;
    flex-direction: column;
    gap:36px;
    width: 100%;
   // border: 1px red solid;
    margin-top: 40px;
    box-sizing: border-box;
    padding-inline: 0;         /* 清掉左右 padding */
    max-width: 100%;           /* 不要超過父層 */
    overflow-x: clip; 
    
    .news-article-list{
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
        flex-wrap: wrap;
        height: auto;
        box-sizing: border-box;
        min-width: 0;
        
        
       // overflow-x: clip;       
        
       
        

        .news-article-img{
           // flex: 0 1 350px;  
            max-width:350px;
            aspect-ratio: 3 / 2;
            width: 100%;
            padding: 5px;
            box-sizing: border-box;
            min-width: 0;

            img{
                width: 100%;  
                height: 100%;
                display: block; 
                object-fit: cover;       
            }            
        }
        .news-article-header{
            max-width: 580px;
           // width: 100%;
            min-width: 0;

            .router-link-card{
                    display: flex; 
                    gap: 120px;          /* 讓 router-link 變成區塊元素 */
                    text-decoration: none;    /* 去掉預設底線 */
                    color: inherit;           /* 繼承原本文字顏色 */
                }
            

            .news-article-h2{ 
                margin-top: 20px ;
                margin-bottom: 20px;
                color:$FontColor-white;
                font-size:$pcChFont-H3;
                font-weight: 500;
                text-decoration: none;
                display: block;

                } 
              
        
            .news-article-content{
                max-width: 580px;
                width: 100%;
                height: auto;
                margin-top: 20px;
                color: $primaryColor-100;
               /* line-height: $linHeight-p;*/
                .cnContent--18px{
                    display:-webkit-box;  //使用 WebKit 的舊式彈性盒子模型
                    -webkit-line-clamp: 3; // 限制行數 3 行 
                    -webkit-box-orient: vertical; //文字從上到下排列
                    overflow: hidden; //隱藏超出容器的內容
                    text-overflow: ellipsis; //顯示省略號 ...
                    &:hover{
                        font-weight: bold;
                    }
                }

              
               

                .Readmore{
                    margin-top: 35px;
                    float: right;
                    text-decoration:underline;
                }
            }

            .news-article-box{
                display: flex;
                justify-content: space-between;
                align-items:last baseline;

                button{
                       // all: unset;  可以拿掉所有樣式
                        display: flex;
                        justify-content: center;
                        align-items:last baseline;
                        width: 60px;
                        height: 30px;
                        color: white;
                        background-color:$primaryColor-900 ;
                        border: none;      /* 移除邊框 */
                        &:hover{
                            cursor: pointer;
                        }
      
                    }
                      span{
                        line-height: 30px;
                        font-size: 20px;
                        margin-left: 5px;
                        }
                    .fa-solid.fa-star{
                        color: yellow;
                        font-size: 25px;
                    }
                    .fa-regular.fa-star{
                      
                        font-size: 25px;
                        
                    }
               
                .news-article-title{
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    

                    h3{ 
                        
                        line-height: 30px;
                        text-align: center;
                        font-weight: 500;
                        color: $primaryColor-100;
                        padding: 5px;  
                        font-size: $pcChFont-p;
                        /*width: 80px;
                        height: 30px;
                        background-color: $secondaryColor-orange;
                        border: 1px solid $primaryColor-500;
                        font-weight: 500;
                       */
                    }
                 
                }
                .news-article-time{
                    align-items: center;
                    color:$primaryColor-100;
                    display: flex;
                    gap:5px;

                   
                }
            }

        }


    }

}

/*-------------斷點1070---------------*/
@media screen and (max-width: 1070px){
.news-article-wrapper{
    
    .news-article-list{
        max-width: 700px !important;
        gap: 60px !important;
    }
    .news-article-img{
        
        max-width: 600px !important;
        margin-top: 20px;
    }
}

}

/*-------------斷點430--------------*/
@media screen and (max-width: 431px){
.news-article-wrapper{
    padding: 16px;

    .news-article-list{
        gap: 80px;
    }


    }

}


</style>