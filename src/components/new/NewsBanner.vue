<script setup>
import newsbanner from '@/assets/images/news/news-article-Loudspeaker.svg'; // Assuming the image is in the assets folder
</script>

<template>
    <div class="news-banner-wrapper">
        <div class="wrapper">
            <div class="news-banner">
                <h1 class="pcEngFont-banner decTitle--big">ASTRONOMY<br/>NEW</h1>
                <h1 class="pcChFont-H1">天文快訊</h1>
            </div>
            <div class="news-image">
                <img :src="newsbanner" alt="天文快訊圖片" class="newsimg" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';
.news-banner-wrapper{
    width: 100%;
    box-sizing: border-box;
    .wrapper{   
        margin: 0 auto;
        max-width: 1200px;
        width: 100%;
        padding: 10px;
    // background-color: $primaryColor-900;
        display: flex;
        justify-content:center;
        gap: 20px;
        align-items: center;
        box-sizing: border-box;
    

        .news-image{
            
            flex: 0 1 480px;
            min-width: 0;
            .newsimg{
                width: 100%;
                height: auto;
                display: block;
            }
            
        }
    
        .news-banner{   
            
            max-width: 100%;
            color: $primaryColor-500;
            flex: 1 1 0;
            min-width: 0;
                .pcEngFont-banner{
                    max-width: 600px;
                    width: 100%;
                    //font-size: $pcEngFont-numberTitle;
                    box-sizing: border-box;
                    white-space: normal; /* 防止文字一行撐爆 */
                    }

                .pcChFont-H1   {
                    font-size: $pcChFont-H1;
                }
            }
    }
}

/*-------------斷點430--------------*/
@media screen and (max-width: 571px){
    .news-banner-wrapper{
        .wrapper{
            flex-direction: column;
            .news-banner{
                h1{
                    
                    width: 300px;
                    font-size: 87px;
                   
                }
                
            }
            .news-image{
                flex:  0 1 300px;
                width: 300px;
            }
        }
    }

}


























</style>