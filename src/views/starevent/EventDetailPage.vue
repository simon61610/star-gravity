<script setup>


    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import eventlist from '@/data/eventlist';

    // 假資料
    // const testEvent = eventlist[0]
    // console.log(testEvent)

    // 路由
    const route = useRoute()

    const eventData = computed(() => {
        return eventlist.find(ev => ev.id == route.params.id || null)
    })

</script>

<template>
    <section class="event-detail" v-if="eventData">

        <!-- 圖片選擇區 -->
        <div class="pic-container">
            <img :src="eventData.imgurl[0]" alt="" class="selected-pic">
            <div class="pic-box">
                <img :src="eventData.imgurl[0]" alt="">
                <img :src="eventData.imgurl[1]" alt="">
                <img :src="eventData.imgurl[2]" alt="">
            </div>
        </div>

        <!-- 活動內容區 -->
        <div class="container">
            <main>
                <div class="title-box">
                    <div class="tags">
                        <div class="type-tag"># {{ eventData.type }}</div>
                        <div class="place-tag"># {{ eventData.place }}</div>
                    </div>
                    <h1>{{ eventData.title }}</h1>
                    <!-- <p>觀看人次</p> -->
                </div>
    
                <div class="info-box">
                    
                    <div class="event-info">
                        <!-- 日期 -->
                        <div class="date-box box">
                            <div class="title">
                                <i class="fa-solid fa-clock"></i>
                                <h2>日期</h2>
                            </div>
                            <p>
                                活動日期：{{ eventData.date }}
                                <br>
                                報名截止：{{ eventData.deadline }}
                            </p>
                        </div>
    
                        <!-- 地點 -->
                        <div class="place-box box">
                            <div class="title">
                                <i class="fa-solid fa-location-dot"></i>
                                <h2>地點</h2>
                            </div>
                            <p>{{ eventData.address }}</p>
                        </div>
    
                        <!-- 費用 -->
                        <div class="price-box box">
                            <div class="title">
                                <i class="fa-solid fa-dollar-sign"></i>
                                <h2>費用</h2>
                            </div>
                            <p>NT$ {{ eventData.price }} / 位</p>
                        </div>
                    </div>
    
                    <p class="apply-btn-box">
                        <router-link to="/eventregistration" class="router-link">
                            <div class="btn">
                                <i class="fa-solid fa-star"></i> 立即報名
                            </div>
                        </router-link>
                    </p>
    
                </div>
    
                <div class="intro-box">
                    <h2>活動內容</h2>
                    <p>{{ eventData.desc }}</p>
                </div>
            </main>
            <router-link to="/events" class="router-link">
                <div class="back-btn">
                    回到活動列表
                </div>
            </router-link>
        </div>

    </section>
    <div v-else class="no-event">
        無活動資料
        <router-link to="/events" class="router-link">
            <p>回到活動頁面</p>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    // 共用
    .router-link {
        text-decoration: none;
        color: inherit;
    }

    .event-detail {
        background-color: $primaryColor-900;
        padding-bottom: 60px;
        display: flex;
        flex-direction: column;
        gap: 40px;

        // 圖片選擇區
        .pic-container {
            // border: 1px solid red;
            
            img {
                display: block;
                object-fit: cover;
            }
            .selected-pic {
                width: 100%;
                height: 28vw;
                margin-bottom: 40px;
            }
            .pic-box {
                // border: 1px solid green;
                display: flex;
                justify-content: center;
                gap: 20px;
                img {
                    width: 240px;
                    aspect-ratio: 3 / 1;
                    cursor: pointer;
                }
            }
        }


        // 活動內容區
        .container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 60px;
            main {
                background-color: #fff;
                max-width: 1200px;
                margin: 0 auto;
                border-radius: 24px;
                padding: 48px;
                display: flex;
                flex-direction: column;
                gap: 32px;
    
                // 活動標題
                .title-box {
                    .tags {
                        margin-bottom: 12px;
                        display: flex;
                        gap: 12px;
    
    
                        .type-tag, .place-tag {
                            padding: 8px 24px;
                            background-color: #ccc;
                            border-radius: 999px;
                        }
                    }
                    h1 {
                        line-height: 1.2;
                        font-size: 36px;
                    }
                }
    
                // 活動資訊
                .info-box {
                    display: flex;
                    gap: 60px;
                    align-items: center;
    
                    .event-info {
                        flex-grow: 1;
                        display: flex;
                        gap: 40px;
                        padding: 24px;
                        border: 1px solid #ccc;
    
                        .box {
                            flex-grow: 1;
                            width: 220px;
                            .title {
                                display: flex;
                                gap: 8px;
                                font-size: $pcChFont-H3;
                                margin-bottom: 16px;
                            }
                            p {
                                font-size: $pcChFont-H4;
                                color: #888;
                                line-height: 1.5;
                            }
    
                            // 分隔線
                            &:not(:first-child) {
                                padding-left: 24px;
                                border-left: 1px solid #ccc;
                                
                            }
                        }
                    }
    
    
                    // 報名按鈕
                    .apply-btn-box {
                        .btn {
                            font-size: 28px;
                            background-color: $secondaryColor-orange;
                            color: white;
                            padding: 16px 24px;
                            border-radius: 999px;
                            cursor: pointer;
    
                            &:hover {
                                background-color: $primaryColor-900;
                            }
                        }
                    }
    
                }
    
                // 活動介紹
                .intro-box {
                    h2 {
                        font-weight: bold;
                        font-size: 28px;
                        margin-bottom: 24px;
                    }
                    p {
                        font-size: 20px;
                        line-height: 1.5;
                    }
                }
            }
            // 回活動頁按鈕
            .back-btn {
                width: 400px;
                text-align: center;
                background-color: $secondaryColor-orange;
                font-size: 24px;
                border-radius: 999px;
                color: white;
                padding: 16px;
                cursor: pointer;
                margin: 0 auto;
            }
        }

    }
    
    // 查無
    .no-event {
        font-size: 32px;
        color: white;
        background-color: $primaryColor-900;
        padding: 160px;
        text-align: center;

        p {
            margin-top: 16px;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }



    @media screen and (max-width: 431px) {
        .event-detail {
            padding-bottom: 40px;
            gap: 20px;

            // 圖片選擇區
            .pic-container {
                img {
                }
                .selected-pic {
                    margin-bottom: 20px;
                }
                .pic-box {
                    width: 100%;
                    overflow: scroll;
                    justify-content: flex-start;
                    gap: 8px;
                    img {
                        width: 160px;
                    }
                }
            }


            // 活動內容區
            .container {
                // border: 1px solid red;
                gap: 40px;
                main {
                    border-radius: 0;
                    padding: 24px 32px;
        
                    // 活動標題
                    .title-box {
                        .tags {
                            margin-bottom: 16px;
                            .type-tag, .place-tag {
                            }
                        }
                        h1 {
                            font-size: 32px;
                        }
                    }
        
                    // 活動資訊
                    .info-box {
                        flex-direction: column;
                        gap: 32px;

                        .event-info {
                            width: 100%;
                            flex-direction: column;
                            padding: 0;
                            border: none;
                            gap: 24px;
                            padding-bottom: 32px;
                            border-bottom: 1px solid #ccc;
        
                            .box {
                                width: 100%;
                                box-sizing: border-box;
                                .title {}
                                p {}
        
                                // 分隔線
                                &:not(:first-child) {}

                                padding-left: 24px;
                                border-left: 1px solid #ccc;
                            }
                        }
        
        
                        // 報名按鈕
                        .apply-btn-box {
                            .btn {
                                padding: 12px 20px;
                                &:hover {}
                            }
                        }
                    }
        
                    // 活動介紹
                    .intro-box {
                        h2 {}
                        p {}
                    }
                }
                // 回活動頁按鈕
                .back-btn {
                    width: 80vw;
                }
            }

        }


        .no-event {
            padding: 52px;
            p {
                &:hover {
                }
            }
        }
    }
    

</style>