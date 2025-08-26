<script setup>

import binoculars from '@/assets/images/shop/shophome-binoculars.jpg'
import souvenirs from '@/assets/images/shop/shophome-souvenirs.jpg'
import telescope from '@/assets/images/shop/shophome-telescope.jpg'


// 分類資料，圖片放在 public，不用打包轉換
const categories = [
    { 
        name: '天文望遠鏡', 
        img: telescope, 
        path: '/shop/category' 
    },
    { 
        name: '雙筒/單筒望遠鏡', 
        img: binoculars, 
        path: '/shop/category' 
    },
    { 
        name: '腳架', 
        img: 'https://placehold.co/220x220', 
        path: '/shop/category' 
    },
    { 
        name: '配件', 
        img: 'https://placehold.co/220x220', 
        path: '/shop/category' 
    },
    { 
        name: '書籍/小物', 
        img: souvenirs, 
        path: '/shop/category' 
    }
]


</script>


<template>
    <section class="prod-cate">
        <p>商品分類</p>
        <div class="cate-grid">
            <router-link 
             v-for="cate in categories"
             :to="cate.path"
             class="item router-link"
            >
                <img :src="cate.img" alt="">
                <p>{{ cate.name }}</p>
            </router-link>
        </div>
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    // 共用
    .router-link {
        text-decoration: none;
        color: white;
    }

    .prod-cate {
        // border: 1px solid yellow;
        max-width: 1200px;
        margin: 0 auto;
        padding: 60px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $FontColor-white;

        // 小標文字
        > p {
            font-size: $pcChFont-H1;
            font-weight: bold;
            margin-bottom: 40px;
        }

        // 商品圖片區
        .cate-grid {
            padding: 16px;
            display: grid;
            grid-template-columns: 360px 250px 250px;
            grid-auto-rows: 250px 250px;
            gap: 1.5em;

            .item:first-child {
                grid-row: span 2;
            }

            .item {
                position: relative;
                cursor: pointer;

                img {
                    border-radius: 16px;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    display: block;
                }
                
                // hover 分類文字出現效果
                p {
                    border-radius: 16px;
                    font-weight: bold;
                    line-height: 1.2;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    font-size: $pcChFont-H3;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: hsl(0, 0%, 0%, .6);
                    opacity: 0;
                    transition: all .8s;
                    
                }
                &:hover {
                    p {
                         opacity: 1;
                    }
                }
            }
        } 
    }

    @media(max-width: 431px){
        .prod-cate {
            padding: 40px 16px;

            > p {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 20px;
            }

            .cate-grid {
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 180px;

                .item:first-child {
                    grid-column: span 2;
                    grid-row: span 1;
                }

                .item {
                    p {
                        opacity: 1;
                        font-size: 18px;
                        background-color: hsl(0, 0%, 0%, .4);
                    }
                }
                
            }

        }
        
    }
</style>