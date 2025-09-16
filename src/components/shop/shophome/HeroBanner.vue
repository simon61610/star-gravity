<!-- 商城首頁 - Banner -->

<script setup>
    /* ========== Swiper  ========== */
    // Swiper 元件
    import { Swiper, SwiperSlide } from 'swiper/vue'
    // Swiper 模組
    import { Autoplay,  Pagination, EffectFade} from 'swiper/modules'
    // Swiper CSS
    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/effect-fade'

    /* ========== 資料 ========== */
    // 輪播資料
    import prodSlides from '@/data/prodSlides'; // console.log(prodSlides) // Array
</script>


<template>
    <section class="hero">
        <!-- Swiper -->
        <Swiper
            class="swiper-hero"
            :modules="[Autoplay,  Pagination, EffectFade]"
            :loop="true"
            :speed="700"
            effect="fade"
            :autoplay="{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            }"
            :pagination="{el: '.pagination', clickable: true}" 
        >
            <!-- 逐張輪播 -->
            <SwiperSlide v-for="(slide, index) in prodSlides">
                <div class="slide"> <!-- 單張 Slide -->
                    <img :src="slide.img" class="bg">
                    <div class="mask"></div>
                    <div class="content">
                        <h1>{{ slide.title }}</h1>
                        <h2>{{ slide.desc }}</h2>
                        <p class="btn">查看商品</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>

        <!-- 分頁圓點 -->
        <div class="pagination"></div>
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';
    
    .hero {
        position: relative;
        // border: 1px solid blue;

        // ----- 輪播區 -----
        .swiper-hero {
            width: 100%;
            aspect-ratio: 17 / 7;

            // 輪播圖 + 文字
            .slide {
                position: relative;
                width: 100%;
                height: 100%;
                .bg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                }
                .mask {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-image: linear-gradient(
                        90deg, 
                        hsl(0, 0%, 0%, .5) 30%, 
                        hsl(0, 0%, 0%, .35) 50%, 
                        hsl(0, 0%, 0%, 0));
                }

                .content {
                    color: white;
                    position: absolute;
                    // border: 1px solid red;
                    width: 560px;
                    left: 10vw;
                    bottom: 10vw;
                    h1 {
                        font-size: 44px;
                        line-height: 1.2;
                        margin-bottom: 20px;
                        font-weight: bold;
                    }
                    h2 {
                        font-size: $pcChFont-H2;
                        line-height: 1.5;
                        margin-bottom: 80px;
                    }
                    .btn {
                        font-size: $pcChFont-H4;
                        width: 160px;
                        padding: 12px;
                        border-radius: 999px;
                        background-color: $primaryColor-500;
                        text-align: center;
                        cursor: pointer;

                        &:hover {
                            background: $secondaryColor-orange;
                        }

                    }
                }

                @media screen and (max-width: 431px) {

                    .content {
                        width: 80%;
                        h1 {
                            font-size: 16px;
                            margin-bottom: 8px;
                        }
                        h2 {
                            font-size: 16px;
                            margin-bottom: 12px;
                        }
                        .btn {
                            font-size: 14px;
                            width: 100px;
                            padding: 8px;
                        }   
                    }
                }
            }
        }

        // ----- 圓點點 -----
        .pagination {
            z-index: 10;
            position: absolute;
            left: 10vw;
            bottom: 2vw;
            width: 100px;
        }
    }

    
</style>

