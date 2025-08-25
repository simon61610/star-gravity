<script setup>

    import eventlist from '@/data/eventlist';

    const testEvent = eventlist[0]
    // console.log(testEvent)



</script>

<template>
    <section class="event-detail">

        <!-- 圖片選擇區 -->
        <div class="pic-container">
            <img :src="testEvent.imgurl[0]" alt="" class="selected-pic">
            <div class="pic-box">
                <img :src="testEvent.imgurl[0]" alt="">
                <img :src="testEvent.imgurl[1]" alt="">
                <img :src="testEvent.imgurl[2]" alt="">
            </div>
        </div>

        <!-- 活動內容區 -->
        <div class="container">
            <main>
                <div class="title-box">
                    <div class="tags">
                        <div class="type-tag"># {{ testEvent.type }}</div>
                        <div class="place-tag"># {{ testEvent.place }}</div>
                    </div>
                    <h1>{{ testEvent.title }}</h1>
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
                                活動日期：{{ testEvent.date }}
                                <br>
                                報名截止：{{ testEvent.deadline }}
                            </p>
                        </div>
    
                        <!-- 地點 -->
                        <div class="place-box box">
                            <div class="title">
                                <i class="fa-solid fa-location-dot"></i>
                                <h2>地點</h2>
                            </div>
                            <p>{{ testEvent.address }}</p>
                        </div>
    
                        <!-- 費用 -->
                        <div class="price-box box">
                            <div class="title">
                                <i class="fa-solid fa-dollar-sign"></i>
                                <h2>費用</h2>
                            </div>
                            <p>NT$ {{ testEvent.price }} / 位</p>
                        </div>
                    </div>
    
                    <p class="apply-btn-box">
                        <div class="btn">
                            <i class="fa-solid fa-star"></i> 立即報名
                        </div>
                    </p>
    
                </div>
    
                <div class="intro-box">
                    <h2>活動內容</h2>
                    <p>{{ testEvent.desc }}</p>
                </div>
            </main>

            <div class="back-btn">
                回到活動列表
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

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
                align-self: center;
            }
        }


        
    }







</style>