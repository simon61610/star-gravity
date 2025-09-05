<script setup>
// =======================
// Imports 模組匯入
// =======================
import back from '@/assets/images/news/article-content-back.svg'
import { tagAPI } from '@/api/tagAPI.js'
import { useRoute } from 'vue-router'  // 取得目前路由資訊
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

// =======================
// 路由資訊
// =======================
const router = useRoute()               // 回傳當前路由物件
const id = Number(router.params.id)     // 動態路由參數 → 數字化


// =======================
// Props 定義（父層傳入文章物件）
// =======================
const props = defineProps({
  article: { type: Object, required: true }
})

// =======================
// 點讚功能相關狀態
// =======================
const likeCount = ref(0)     // 點讚數
const liked = ref(false)     // 是否已點讚

// =======================
// 初始化：從 localStorage 讀取點讚狀態
// =======================
onMounted(() => {
  // 讀取讚數
  const count = localStorage.getItem(`likeCount_${props.article.ID}`)
  likeCount.value = count ? parseInt(count) : 0

  // 讀取是否已點讚
  const likedStatus = localStorage.getItem(`liked_${props.article.ID}`)
  liked.value = likedStatus === 'true'
})

// =======================
// 切換點讚狀態
// =======================
function toglike() {
  liked.value = !liked.value
  likeCount.value += liked.value ? 1 : -1

  // 寫回 localStorage
  localStorage.setItem(`likeCount_${props.article.ID}`, likeCount.value)
  localStorage.setItem(`liked_${props.article.ID}`, liked.value)
}

// =======================
// 複製網址功能
// =======================
// 使用 navigator.clipboard 進行非同步複製
async function copyurl() {
  const url = window.location.href
  try {
    await navigator.clipboard.writeText(url) // 複製到剪貼簿
    alert('已複製成功')
  } catch {
    alert('複製失敗，請手動複製')
  }
}

//資料庫標籤取得
const dynamicTags = ref([]) 

watch(
  () => props.article?.ID, //監聽父層傳進來得文章ID
  (newID) => { //ID有變化執行下面這段
    if (newID) {
      axios.post("https://tibamef2e.com/tjd102/g1/pdo/news/tagssearch.php", { article_id: newID })
        .then(res => {
          console.log('後端回傳:', res.data)
          console.log('當前文章 ID:', newID)
          dynamicTags.value = res.data

            .filter(t => Number(t.ID) === Number(newID)) //過濾文章對應ID 用number轉成數字確保型態一樣 
            .map(t => t.tag_name)

          console.log('過濾後 dynamicTags:', dynamicTags.value)
        })
    }
  },
  { immediate: true } //每有變化就立即執行
)
</script>



<template>
    <section class="article-content-section">
        <div class="article-title-box">
            <div class="article-title-h2">
                <h2>{{props.article.title}}</h2>
            </div>  
            <div class="article-subtitle-box">
                <div class="article-subtitle-h4">
                    <h4>發佈時間:{{props.article.publish_date}}</h4>
                </div>
                <div class="article-subtitle-icon">
                    <i class="fa-regular fa-star" @click="toglike" ><span>{{likeCount}}</span></i>
                    <i class="fa-solid fa-share-nodes" @click = 'copyurl'></i>
                </div>
            </div>
        </div>

        <div class="article-content-box">
            <div class="article-content-img" >
                <img :src=props.article.image alt="" />
            </div>

            <div v-if="dynamicTags.length" class="article-content-tag">
                <ul>
                    <li v-for="tag in dynamicTags" :key="tag">#{{ tag }}</li>
                </ul>
            </div>

            <div class="article-content-p cnContent cnContent--18px">
                <p>{{ props.article.content }}</p>
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