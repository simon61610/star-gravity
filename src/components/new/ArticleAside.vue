<script setup>
import testimg from '@/assets/images/news/news-article-a1.jpg';
import {articles as articlesDate} from '@/data/articles'
import { ref, computed, watch } from 'vue' 
import { useRoute } from 'vue-router'
const articles = ref(articlesDate) 
const route = useRoute()
// const id = Number(route.params.id)
const article = computed(() => {
  return articles.value.find(a => a.id === Number(route.params.id))
})



// 固定三種 tag
const tags = ['天象事件', '知識新知', '生活應用']

const relatedArticles = computed(() => {
  if (!article.value) return []
  return tags.map(tag => {
    return articles.value.find(a => a.tag === tag && a.id !== article.value.id)
  }).filter(Boolean)
})



</script>

<template>
    <aside class="article-aside">
        <div class="article-aside-h2">
            <h2>延伸資訊</h2>
        </div>

        <div class="article-aside-wapper">
            <ul class="article-aside-ul">
                
                    <router-link :to= "{ name: 'ArticleDetailpage', params: { id: a.id } }" class="article-aside-li"  v-for="a in relatedArticles"   
                        :key="a.id "  >
                        <header class="article-aside-h3">
                            <h3 class="label--blue">{{ a.tag}}</h3>
                        </header>
                        <figure class="article-aside-img">
                            <img :src="a.img" alt="">
                        </figure>
                        <div class="article-aside-h5">
                            <h5>{{ a.title }}</h5>
                        </div>
                    </router-link>
                
                <!-- <li class="article-aside-li">
                    <header class="article-aside-h3">
                        <h3 class="label--blue">知識新知</h3>
                    </header>
                    <figure class="article-aside-img">
                        <img :src=testimg alt="">
                    </figure>
                    <div class="article-aside-h5">
                        <h5>5/24 下午1600 日全蝕發生!</h5>
                    </div>
                </li>
                
                <li class="article-aside-li">
                    <header class="article-aside-h3">
                        <h3 class="label--blue">生活應用</h3>
                    </header>
                    <figure class="article-aside-img">
                        <img :src=testimg alt="">
                    </figure>
                    <div class="article-aside-h5">
                        <h5>5/24 下午1600 日全蝕發生!</h5>
                    </div>
                </li> -->
            </ul>
        </div>
    </aside>

</template>

<style scoped lang="scss">  
@import '@/assets/styles/main.scss';
aside{
    
    background-color: $primaryColor-500;
    color: $FontColor-white;
    max-width: 400px;
    width: 100%;
    padding: 10px;
    
    
    .article-aside-h2{
        text-align: center;
        width: 100%;
        padding: 10px 0;
        font-size: $pcChFont-H2;
        background-color: #5C4B90;
        border-radius: 10px;
    }

    .article-aside-wapper{
        padding: 30px;
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
       
        .article-aside-ul{
            
            display: flex;
            flex-direction: column;
            gap: 80px;

            .article-aside-li{
                text-decoration: none;
                background-color: $primaryColor-900;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-bottom: 10px;
                border-radius: 10px;
                .article-aside-h3{
                    
                    margin-right: auto;
                    margin-left: 10px;
                    h3{ 
                        font-size: $pcChFont-H4;
                        text-align: center;
                        line-height: 30px;
                        margin-top: 20px;
                        margin-bottom: 18px;
                        padding: 5px;
                        color: $FontColor-white;
                    }
                    
                }
                .article-aside-img{
                    width: 100%;
                    padding: 10px;
                    box-sizing: border-box;
                    text-align: center;
                    
                    img{
                        max-width: 240px;
                        width: 100%;
                    }

                }
                .article-aside-h5{
                    color: $FontColor-white;
                    padding: 10px;
                    text-align: center;
                    font-size: $pcChFont-H4;
                    margin-top: 10px;
                }
            
        }
        }
        
      

    }
}
@media screen and (max-width: 431px){
    .article-aside{
        box-sizing: border-box;
        .article-aside-wapper{
            padding-left: 15px;
            
            .article-aside-ul{
               
                overflow-x: auto;  
                flex-direction: row;
                
                scroll-snap-type: x mandatory;
                .article-aside-li{
                    
                    scroll-snap-align: start;
                    width: 100%;
                    flex: 0 0 auto; 
                    
                }
            }
            

        }
        
    }

}



</style>