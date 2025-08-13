<script setup>
import testimg from '@/assets/images/news/news-article-a1.jpg';
import back from '@/assets/images/news/article-content-back.svg'
import { useRoute } from 'vue-router'  //取得目前「路由資訊」資料 {} → 具名匯出
import { articles } from '@/data/articles.js' //抓物件資料

const router = useRoute(); //回傳當前路由物件
const id = Number(router.params.id) //params 可以字串轉數字
const article = articles.find(a => a.id === id)  //文章ID對應


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
                    <i class="fa-regular fa-star"><span>{{article.like}}</span></i>
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



</style>