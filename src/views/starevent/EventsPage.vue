<script setup>

import { ref, computed } from 'vue';

// 圖檔
import meteorShower from '@/assets/images/events/home/eventType_meteor-shower.png'
import moon from '@/assets/images/events/home/eventType_moon.png'
import starSigns from '@/assets/images/events/home/eventType_star-signs.png'
import galaxy from '@/assets/images/events/home/eventType_galaxy.png'

// 組件
import EventCarousel from '@/components/starevent/eventPage/EventCarousel.vue';
import Pagination from '@/components/common/Pagination.vue';


// 假資料
import eventlist from '@/data/eventlist';

const currentPage = ref(1)
const pageSize = ref(6)

const showItems = computed (() => {
    const start = (currentPage.value - 1) * pageSize.value // 從第幾筆開始
    return eventlist.slice(start, start + pageSize.value) // 顯示的商品陣列
})

const pageChange = (newpage)=> {
    currentPage.value = newpage
}



// 切版用
const eventIcon = [
    { name: 'meteor-shower', imgUrl: meteorShower},
    { name: 'moon', imgUrl: moon},
    { name: 'star-signs', imgUrl: starSigns},
    { name: 'galaxy', imgUrl: galaxy},
]

const placeTags = [
    {name: '全部'},
    {name: '高山觀測'},
    {name: '海邊平台'},
    {name: '平地公園'},
    {name: '天文台'},
]


</script>



<template>
    <section class="eventhome-section">
        <div class="eventhome-banner">
            <div class="banner-content">
                <h1 class="decTitle--big">ACTIVITIES</h1>
                <h2 class="cnTitle--h1">星星活動</h2>
            </div>
            <img src="/images/events/event-banner-pic.png" alt="">
        </div>


        <div class="main">
            <EventCarousel />
            <div class="container">

                <!-- 選擇活動類型 -->
                <div class="event-type">
                    <h1 class="select-title">熱門觀星主題</h1>
                    <div class="event-box">
                        <div v-for="(eventType, index) in eventIcon" class="event-select">
                            <img :src="eventType.imgUrl" alt="">
                        </div>
                    </div>
                </div>
    
                <!-- 活動項目區 -->
                <div class="event-list-section">
    
                    <!-- Header -->
                    <header>
                        <h2>流星雨</h2>
        
                        <div class="event-ctrl">
                            <div class="place-tags">
                                <div class="tag" v-for="(tag, index) in placeTags">{{ tag.name }}</div>
                            </div>
                            <div class="select-date">
        
                            </div>
                        </div>
                    </header>
        
                    <!-- 活動項目卡片區 -->
                    <div class="event-list">
                        <div class="event-card" v-for="event in showItems">
                            <RouterLink :to="`/events/${event.id}` "class="router-link" > 
                            <img :src="event.imgurl[0]" alt="">
                            <div class="card-content">
                                <div class="date">{{ event.date }}</div>
                                <h2 class="event-name">{{ event.title }}</h2>
                                <div class="address">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <p>{{ event.address }}</p>
                                </div>
                                <h3 class="tags">
                                    <div class="type-tag"># {{ event.type }}</div>
                                    <div class="place-tag"># {{ event.place }}</div>
                                </h3>
                            </div>
                        </RouterLink>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <Pagination 
                        :modelValue="currentPage"
                        @update:modelValue="pageChange"

                        :pageSize="pageSize"

                        :total="eventlist.length"
                    
                    
                    />
                </div>
            </div>

        </div>

    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    // 共用
    .router-link {
        text-decoration: none;
        color: inherit;
    }

    .eventhome-section {
        background-image: url(/images/events/event-bg.png);
        background-size: cover;
        padding-bottom: 60px;
        
        .eventhome-banner {
            padding: 40px 16px 0;
            // border: 1px solid red;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 120px;
            .banner-content {
                color: $primaryColor-500;
                h1 {}
                h2 {
                    font-weight: bold;
                }
            }
            img {
                display: block;
                // border: 1px solid red;
                align-self: flex-end;
            }
        }

        .main {
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px 16px;
            background-color: $primaryColor-900;
            border-radius: 20px;

            
            .container {
                display: flex;
                flex-direction: column;
                gap: 60px;
                max-width: 1040px;
                margin: 0 auto;
                // 選擇活動類型
                .event-type {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                    // border: 1px solid green;
                    border-bottom: 1px solid white;
                    padding-bottom: 60px;
    
                    .select-title {
                        text-align: center;
                        font-size: $pcChFont-H2;
                        color: white;
                        font-weight: bold;
                    }
    
    
                    .event-box {
                        // border: 1px solid red;
                        display: flex;
                        justify-content: space-between;
        
                        .event-select {
                            background-color: $primaryColor-500;
                            border-radius: 999px;
                            cursor: pointer;
        
                            img {
                                display: block;
                            }
                        }
                    }
                }
    
                // 活動項目區
                .event-list-section {
                    // border: 1px solid red;
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                    // max-width: 1040px;
                    margin: 0 auto;
    
                    // header
                    header {
                        h2 {
                            color: white;
                            font-size: $pcChFont-H2;
                            font-weight: bold;
                            margin-bottom: 28px;
                        }
                        .event-ctrl{
                            .place-tags{
                                display: flex;
                                gap: 12px;
                                .tag {
                                    text-align: center;
                                    padding: 8px 0;
                                    font-size: 16px;
                                    color: white;
                                    width: 100px;
                                    border: 2px solid white;
                                    border-radius: 999px;
                                    cursor: pointer;
                                }
                            }
                            .select-date {}
                        }
                    }
    
                    // 活動項目卡片區
                    .event-list {
                        display: flex;
                        flex-wrap: wrap;
                        // justify-content: space-between;
                        justify-content: center;
                        gap: 40px;
                        .event-card {
                            cursor: pointer;
                            width: 320px;
                            border-radius: 24px;
                            overflow: hidden;
                            img {
                                display: block;
                                height: 200px;
                                object-fit: cover;
                            }
                            .card-content {
                                background-color: #fff;
                                padding: 16px;
                                display: flex;
                                flex-direction: column;
                                gap: 12px;
                                height: 100%;
                                .date {
                                    font-size: 14px;
                                    color: #888;
                                }
                                .event-name {
                                    font-size: 20px;
                                    line-height: 1.2;
                                    font-weight: bold;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                                .address {
                                    display: flex;
                                    gap: 4px;
                                    padding-bottom: 12px;
                                    border-bottom: 1px solid #ccc;
                                    .fa-location-dot {
                                        color: $primaryColor-500;
                                    }
                                    p {
                                        font-size: 16px;
                                    }
                                }
                                .tags {
                                    color: #888;
                                    font-size: 16px;
                                    display: flex;
                                    gap: 12px;
                                    .place-tag {}
                                    .type-tag {}
                                }
                            }
                        }
                    }
                }
            }

        }




    }


</style>