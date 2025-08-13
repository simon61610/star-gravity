<script setup>

</script>

<template>
    <div class="article-list-wrapper">
        <div class="article-list">

            <div class="title">
                <h2 class="article">(article)</h2>
                <h2 class="article-title">文章列表</h2>
            </div>

            
            <ul class="article-category">
                <li class="label--blue">全部文章</li>
                <li class="label--blue">天象事件</li>
                <li class="label--blue">知識新知</li>
                <li class="label--blue">生活應用</li>
            </ul>
            
        </div>
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';


.article-list-wrapper{
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    width: 100%;
    box-sizing: border-box;
    
    
    
    

    .article-list {
        margin: 0 auto;
        max-width: 1200px;
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid $primaryColor-500;
        display: flex;
        justify-content: space-between;
        

        .title{
            display: flex;
            align-items:baseline;
            gap: 20px;
            
            .article{
                font-family:'Roboto';
                font-weight: 800;
                color: $primaryColor-500;
                font-size: $pcEngFont-subTitle;
            }
            .article-title{
                font-weight: 500;
                font-size: $pcChFont-H3;
                color: $primaryColor-500;
            }
        }

        .article-category{  
                display: flex;
                align-items:last baseline;
                justify-content: last baseline;
                gap:10px;
                
                li{ 
                    background-color: $primaryColor-100;
                    line-height: 30px;
                    text-align: center;
                    font-weight: bold;
                    width: 84px;
                    /*
                    border: 1px solid $primaryColor-500;
                    border-radius: 20px;

                    */

                    &:hover{
                        background-color: $secondaryColor-orange;
                        color: $primaryColor-100;
                        cursor: pointer;
                    }

                }
            }
         }
    
}


</style>