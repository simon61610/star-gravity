<script setup>
// =======================
// Imports 匯入模組
// =======================
import { ref, computed, watch } from 'vue'
// =======================
// Props 定義（從父層接收）
// =======================
const props = defineProps({
  article: { type: Object, required: true },
  articles: { type: Array, required: true }
})
// =======================
// 固定三種文章分類 tag
// =======================
const tags = ['天象事件', '知識新知', '生活應用']
// =======================
// 相關文章計算邏輯
// - 依照三種分類 (tags) 篩選文章
// - 排除掉目前這篇
// - 每個分類取最新一篇
// =======================
const relatedArticles = computed(() => {
  if (!props.articles || props.articles.length === 0 || !props.article) return [] //條件1.沒有文章清單 2.文章清單是空 3.目前的文章不存在  回傳空陣列

  return tags
    .map(cat => { //逐步處理tag陣列裡每個分類 (map特性會把處理元素包成陣列)
      // 篩出該分類的文章，排除掉目前這篇
      const filtered = props.articles.filter(
        a => a.category === cat && a.ID !== props.article.ID //選到分類跟目前處理的分類一樣 且 ID要不同(也就是要排除自己正在看的這篇)
      )
      // 按照日期排序，取最新一篇
      filtered.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date))//文章排序
      return filtered[0] || null   //filtered[0] 就是「該分類裡最新的一篇文章」。
    })
    .filter(Boolean) // 過濾掉沒有文章的分類 (null 在 js的Falsy家族 永遠是false)
})
//程式的原型  const relatedArticles = computed(()=>{ 
//  if(){
//     return tags.map(...裡面做了篩選跟排序).filter(...這裡過濾null)   }
//  }) 
</script>



<template>
    <aside class="article-aside">
        <div class="article-aside-h2">
            <h2>延伸資訊</h2>
        </div>

        <div class="article-aside-wapper">
            <ul class="article-aside-ul">
                
                    <router-link :to= "{ name: 'ArticleDetailpage', params: { id: a.ID } }" class="article-aside-li"  v-for="a in relatedArticles"   
                        :key="a.ID "  >
                        <header class="article-aside-h3">
                            <h3 class="label--blue">{{ a.category}}</h3>
                        </header>
                        <figure class="article-aside-img">
                            <img :src="a.image" alt="">
                        </figure>
                        <div class="article-aside-h5">
                            <h5>{{ a.title }}</h5>
                        </div>
                    </router-link>
            </ul>
        </div>
    </aside>

</template>

<style scoped lang="scss">  
@import '@/assets/styles/main.scss';
aside {
  background-color: $primaryColor-500;
  color: $FontColor-white;
  max-width: 400px;
  width: 100%;
  padding: 10px;

  @media screen and (max-width: 650px) {
    max-width: 600px;
  }

  .article-aside-h2 {
    text-align: center;
    width: 100%;
    padding: 10px 0;
    font-size: $pcChFont-H2;
    background-color: #5C4B90;
    border-radius: 10px;
  }

  .article-aside-wapper {
    padding: 30px;
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;

    @media screen and (max-width: 650px) {
      padding-left: 30px !important;
    }

    .article-aside-ul {
      display: flex;
      flex-direction: column;
      gap: 80px;

      @media screen and (max-width: 650px) {
        overflow-x: auto;
        flex-direction: row;
        scroll-snap-type: x mandatory;
      }

      .article-aside-li {
        text-decoration: none;
        background-color: $primaryColor-900;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 10px;
        border-radius: 10px;

        @media screen and (max-width: 650px) {
          scroll-snap-align: start;
          width: 100%;
          flex: 0 0 auto;
        }

        .article-aside-h3 {
          margin-right: auto;
          margin-left: 10px;

          h3 {
            font-size: $pcChFont-H4;
            text-align: center;
            line-height: 30px;
            margin-top: 20px;
            margin-bottom: 18px;
            padding: 5px;
            color: $FontColor-white;
          }
        }

        .article-aside-img {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          text-align: center;

          img {
            max-width: 240px;
            width: 100%;
          }
        }

        .article-aside-h5 {
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

// aside {
//   background-color: $primaryColor-500;
//   color: $FontColor-white;
//   max-width: 400px;
//   width: 100%;
//   padding: 10px;

//   // ≤650px
//   @media screen and (max-width: 650px) {
//     max-width: 600px;
//   }

//   .article-aside-h2 {
//     text-align: center;
//     width: 100%;
//     padding: 10px 0;
//     font-size: $pcChFont-H2;
//     background-color: #5C4B90;
//     border-radius: 10px;
//   }

//   .article-aside-wapper {
//     padding: 30px;
//     max-width: 320px;
//     width: 100%;
//     margin: 0 auto;
//     box-sizing: border-box;

//     .article-aside-ul {
//       display: flex;
//       flex-direction: column;
//       gap: 80px;

//       .article-aside-li {
//         text-decoration: none;
//         background-color: $primaryColor-900;
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: center;
//         padding-bottom: 10px;
//         border-radius: 10px;

//         .article-aside-h3 {
//           margin-right: auto;
//           margin-left: 10px;

//           h3 {
//             font-size: $pcChFont-H4;
//             text-align: center;
//             line-height: 30px;
//             margin-top: 20px;
//             margin-bottom: 18px;
//             padding: 5px;
//             color: $FontColor-white;
//           }
//         }

//         .article-aside-img {
//           width: 100%;
//           padding: 10px;
//           box-sizing: border-box;
//           text-align: center;

//           img {
//             max-width: 240px;
//             width: 100%;
//           }
//         }

//         .article-aside-h5 {
//           color: $FontColor-white;
//           padding: 10px;
//           text-align: center;
//           font-size: $pcChFont-H4;
//           margin-top: 10px;
//         }
//       }
//     }

//     // ≤650px
//     @media screen and (max-width: 650px) {
//       padding-left: 15px;

//       .article-aside-ul {
//         overflow-x: auto;
//         flex-direction: row;
//         scroll-snap-type: x mandatory;

//         .article-aside-li {
//           scroll-snap-align: start;
//           width: 100%;
//           flex: 0 0 auto;
//         }
//       }
//     }
//   }
// }


</style>