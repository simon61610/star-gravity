<script setup>
const props = defineProps({
    categories: Array,    //接收父層所有分類
    selectedCategory: String  //接受父層目前點擊分類
})
const emit = defineEmits(['changeCategory'])  


</script>

<template>
    <div class="article-list-wrapper">
        <div class="article-list">

            <div class="title">
                <h2 class="article">(article)</h2>
                <h2 class="article-title">文章列表</h2>
            </div>

            
            <ul class="article-category">
                <li v-for="cat in categories" :key="cat" class="label--blue" 
                    :class="{ active: selectedCategory === cat }"  
                    @click="emit('changeCategory', cat)"
                    >{{ cat }}
                </li>
                <!-- <li class="label--blue">天象事件</li>
                <li class="label--blue">知識新知</li>
                <li class="label--blue">生活應用</li> -->
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
            @media screen and (max-width: 1070px){
                margin-left: 15px;
            }

            @media screen and (max-width: 600px){
                flex-direction: column;
                align-items: center;
            }
            
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
                    &.active{
                        background-color: $secondaryColor-orange;
                        color: $primaryColor-100;
                    }

                }
            }
         }
    
}
/*-------------斷點1070---------------*/
@media screen and (max-width: 1070px){
    .article-list{
        
        padding: 0 ;
        .article-category{
            padding-right: 20px;
        }
    }
}

/*-------------斷點430--------------*/
@media screen and (max-width: 571px){
.article-list-wrapper{
    .article-list{
        border-bottom: none;
        justify-content: center;
        .title{
            display: none;
        }
        .article-category{
            justify-content: center;
            width: 250px;
            flex-wrap: wrap;
            li{
                height: 42px;
                line-height: 42px;
            
            }

        }
    }
}
































}



</style>