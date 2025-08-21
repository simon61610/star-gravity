<script setup>
import testimg from '@/assets/images/news/news-article-a1.jpg';
import back from '@/assets/images/news/article-content-back.svg'
import { useRoute } from 'vue-router'  //取得目前「路由資訊」資料 {} → 具名匯出
import { articles } from '@/data/articles.js' //抓物件資料
import { ref,onMounted,watch } from 'vue'

const router = useRoute(); //回傳當前路由物件
const id = Number(router.params.id) //params useRoute的參數之一 裡面存放動態路由 Number()字串轉數字
const article = articles.find(a => a.id === id)  //文章ID對應

const likeCount = ref(0)   // ← 這樣才有變數可以用
const liked = ref(false)   // ← 這是點讚狀態





/*抓讚數資料*/
onMounted(() => {
  // 讀取 localStorage
  const count = localStorage.getItem(`likeCount_${article.id}`)
likeCount.value = count ? parseInt(count) : 0

const likedStatus = localStorage.getItem(`liked_${article.id}`)
liked.value = likedStatus === 'true'
})

function toglike() {
  liked.value = !liked.value
  likeCount.value += liked.value ? 1 : -1
    localStorage.setItem(`likeCount_${article.id}`, likeCount.value)
    localStorage.setItem(`liked_${article.id}`, liked.value)
} 

/*複製網址 */
async function copyurl(){    // async....await  非同步操作 複製網址程式
    const url = window.location.href  //複製網址
    try{      //try .. catch (try區塊會先執行如果不能執行會跳catch區塊執行)
        await navigator.clipboard.writeText(url)  //await等待複製完成
        alert('已複製成功')
    }
    catch{
        alert('複製失敗，請手動複製')
    }
}


</script>


<template>
    <section class="article-content-section">
        <div class="article-title-box">
            <div class="article-title-h2">
                <h2>{{article.title}}</h2>
            </div>  
            <div class="article-subtitle-box">
                <div class="article-subtitle-h4">
                    <h4>發佈時間:{{article.time}}</h4>
                </div>
                <div class="article-subtitle-icon">
                    <i class="fa-regular fa-star" @click="toglike" ><span>{{likeCount}}</span></i>
                    <i class="fa-solid fa-share-nodes" @click = 'copyurl'></i>
                </div>
            </div>
        </div>

        <div class="article-content-box">
            <div class="article-content-img" >
                <img :src=testimg alt="" />
            </div>

            <div class="article-content-tag">
                <ul>
                    <li>#宇宙大爆炸</li>
                    <li>#宇宙大爆炸</li>
                    <li>#宇宙大爆炸</li>
                </ul>
            </div>

            <div class="article-content-p cnContent cnContent--18px">
                <p>{{ article.content }}</p>
            </div>

            <router-link to= "/Newpage" class="article-content-back">
                <p class="decTitle decTitle--medium">BACK</p>
                <figure> <img :src=back alt=""></figure>
            </router-link>

        </div>

    </section>
</template>







<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.article-content-section{
    color: $primaryColor-100;
    max-width: 710px;
    width: 100%;
    .article-title-box{
            
        .article-title-h2{
            padding: 10px;
            margin-bottom: 10px;
            font-size:$pcChFont-H2;
            
        }       
        .article-subtitle-box{
            font-size:$pcChFont-H4;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            .article-subtitle-icon{
                display: flex;
                align-items: center;
                gap: 10px;
                span{
                    margin-left: 8px;
                }
                .fa-solid.fa-share-nodes{
                    font-size: 25px;
                    font-weight: bold;  
                    cursor: pointer;          
                   }
            }
        }
       
        
    }


    .article-content-box{
        margin-top: 36px !important;

         ul{
            margin-top: 30px;
            display: flex;
            gap: 20px;

            li{
                width: 100px;
                height: 40px;
                border: 1px gray solid;
                border-radius: 20px;
                line-height: 40px;
                text-align: center;
            }
        }


        .article-content-img{
            width: 100%;
            img{
                max-width: 710px;
                width: 100%;
                object-fit:cover ;
                padding: 10px;
            }

        }
        .article-content-p{
            margin-top: 30px;
            color: $primaryColor-100;
            height: auto;
            background-color: $primaryColor-800;
            padding: 10px;
            
        }
        .article-content-back{
            margin-top: 36px;
            justify-content: flex-end;
            display: flex;
        &:hover{
            transform: translate(4px,4px);
            color: blueviolet;
        }
        }
    }

}
@media screen and (max-width: 431px){

    .article-content-img{
        aspect-ratio: 16/9;
        text-align: center;
        margin-top: 50px;
        
        
        img{
            max-width: 350px !important;
            width: 100% !important;
            
        }
    }


    .article-content-box {
        align-items: center;
        background-color: $primaryColor-900;
        display: flex;
        flex-direction: column;
         .article-content-back {
            width: 100%;
            justify-content: flex-start !important;
            margin-bottom: 16px;
            }
        }
}   


</style>