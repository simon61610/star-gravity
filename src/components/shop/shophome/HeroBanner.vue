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
                        <RouterLink :to="slide.ctaLink" class="router-link">
                            <p class="btn">查看商品</p>
                        </RouterLink>
                        
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

    .router-link {
        text-decoration: none;
        color: white;
    }

    .hero {
        position: relative;
        // border: 1px solid red;

        .pagination {
            z-index: 10;
            position: absolute;
            left: 12vw;
            bottom: 2vw;
            width: 80px;
        }

        // --- 輪播區 ---
        .swiper-hero {
            // outline: 1px solid red;
            width: 100%;
            height: 100%;
            aspect-ratio: 17 / 7;
        }
        
        @include respond('sm'){
            aspect-ratio: 16 / 9;
        }

        .slide {
            position: relative;
            width: 100%;
            height: 100%;
            
            .bg {
                position: absolute;
                width: 100%;
                object-fit: cover;
                display: block;
            }

            // 漸層遮罩
            .mask {
                position: absolute;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(
                90deg,
                hsl(0, 0%, 0%, .5) 30%,
                hsl(0, 0%, 0%, .35) 50%,
                hsl(0, 0%, 0%, 0)
                );
            }

            // 文字區
            .content {
                left: 10vw;
                top: 20%;
                transform: (-50%);
                // border: 1px solid blue;
                width: 36vw;
                color: white;
                position: absolute;
            }
            h1 {
                font-size: clamp(20px, 4vw, 40px);
                font-weight: bold;
                line-height: 1.2;
                margin-bottom: 20px;
            }
            h2 {
                font-size: clamp(14px, 2.5vw, 20px);
                line-height: 1.5;
                margin-bottom: 4vw;
            }
            .btn {
                font-size: $pcChFont-H4;
                background-color: $primaryColor-500;
                width: 160px;
                padding: 12px;
                border-radius: 999px;
                text-align: center;
                cursor: pointer;

                &:hover {
                    background: $secondaryColor-orange;
                }
            }

            // 平板 / 中型螢幕
            @include respond('lg'){
                .content {
                    width: 50%;
                    left: 8vw;
                }
                h1 {
                    // font-size: 28px;
                    margin-bottom: 12px;
                }
                h2 {
                    // font-size: 20px;
                    margin-bottom: 16px;
                }
                .btn {
                    font-size: 16px;
                    width: 120px;
                    padding: 10px;
                }
            }
            
            // 手機
            @include respond('sm'){
                .content {
                    width: 80%;
                    left: 6vw;

                    h1 {
                        // font-size: 20px;
                        margin-bottom: 8px;
                    }
                    h2 {
                        margin-bottom: 8px;
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
</style>

