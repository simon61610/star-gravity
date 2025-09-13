<!-- 
新增時間搜尋功能 
-->

<script setup>

import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';

// 圖檔
import meteorShower from '@/assets/images/events/home/eventType_meteor-shower.png'
import moon from '@/assets/images/events/home/eventType_moon.png'
import starSigns from '@/assets/images/events/home/eventType_star-signs.png'
import galaxy from '@/assets/images/events/home/eventType_galaxy.png'

// 組件
import EventCarousel from '@/components/starevent/eventPage/EventCarousel.vue';
import Pagination from '@/components/common/Pagination.vue';


const eventlist = ref([])

onMounted(async () => {
    const res = await axios.get(import.meta.env.VITE_AJAX_URL + 'activity/client/activityget_active.php')
    console.log(res.data)
    /* ID : 5 
    category : "高山觀測" 
    event_date_display : "2025-09-20 (六) ~ 2025-09-21 (日)" 
    event_deadline : "2025-09-15 23:59:59" 
    event_description : "於擎天崗草原舉辦的流星雨活動，參加者將能在開闊夜空下欣賞流星劃破天際的美景，並學習相關的天文知識與拍攝技巧。此活動不僅有天文觀測，還結合了趣味講解、互動體驗與攝影分享，讓大家在輕鬆氛圍中收穫知識與交流心得。非常適合所有熱愛星空的朋友，一同在自然草原與繁星下留下難忘回憶。" 
    event_end : "2025-09-21 02:00:00" 
    event_name : "來擎天崗吧！許下你的流星願望 | 獅子座流星雨 - 團體觀星活動" 
    event_place : "擎天崗" 
    event_price : 2500 
    event_start : "2025-09-20 21:00:00" 
    event_status : "報名中" 
    homepage_highlight : 0 
    homepage_highlight_display : "非推薦" 
    image : (3) ['http://localhost/star-gravity/public/pdo/activity/acimg/來擎天崗吧-1.png', 'http://localhost/star-gravity/public/pdo/activity/acimg/來擎天崗吧-2.png', 'http://localhost/star-gravity/public/pdo/activity/acimg/來擎天崗吧-3.png'] 
    is_active : "1" 
    is_active_display : "上架" 
    registration_count : null 
    tag : "流星雨" */


    eventlist.value = res.data
})


// 假資料
// import eventlist from '@/data/eventlist';

// 預設分類
const selectedType = ref('流星雨')
const selectedPlace = ref('全部')

const changeType = (eventType) => {
    selectedType.value = eventType.label
    selectedPlace.value = '全部' // 每次重選類別，重新變成全部地點
}

// 篩選類型


const filterEvents = computed(() => {
    // 過濾上架
    let result =  eventlist.value.filter(event => event.is_active == 1)

    // 過濾類型
    result =  result.filter(event => event.tag == selectedType.value)


    // 過濾地點
    if(selectedPlace.value !== '全部'){
        result = result.filter(event => event.category == selectedPlace.value)
    }

    return result
})

// 切分頁
const currentPage = ref(1)
const pageSize = ref(6)

const showItems = computed (() => {
    const start = (currentPage.value - 1) * pageSize.value // 從第幾筆開始
    return filterEvents.value.slice(start, start + pageSize.value) // 顯示的商品陣列
})

const pageChange = (newpage)=> {
    currentPage.value = newpage
}

watch(() => selectedType.value, () => {
    currentPage.value = 1
    /* window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' // 平滑滾動 
    }) */

    const eventHeader = document.querySelector('#eventHeader')
    
    eventHeader.scrollIntoView(
        {
            behavior: 'smooth',
        }
    )
})





// 切版用
const eventIcon = [
    { name: 'meteor-shower', imgUrl: meteorShower, label: '流星雨'},
    { name: 'moon', imgUrl: moon, label: '月相'},
    { name: 'star-signs', imgUrl: starSigns, label: '星座'},
    { name: 'galaxy', imgUrl: galaxy, label: '銀河'},
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
                        <div v-for="(eventType, index) in eventIcon" class="event-select" :class="{active: selectedType == eventType.label}" @click="changeType(eventType)">
                            <img :src="eventType.imgUrl" alt="">
                        </div>
                    </div>
                </div>
    
                <!-- 活動項目區 -->
                <div class="event-list-section">
    
                    <!-- Header -->
                    <header id="eventHeader">
                        <h2>{{ selectedType }}</h2>
        
                        <div class="event-ctrl">
                            <div class="place-tags">
                                <div class="tag" :class="{active: selectedPlace == tag.name}" v-for="(tag, index) in placeTags" @click="selectedPlace = tag.name">{{ tag.name }}</div>
                            </div>
                            <div class="select-date">
        
                            </div>
                        </div>
                    </header>
        
                    <!-- 活動項目卡片區 -->
                    <div class="event-list">
                        <!-- 沒活動 -->
                        <div v-if="showItems.length === 0" class="no-event">
                            目前尚無活動，請選擇其他地點或類型！
                        </div>

                        <!-- <div class="event-card" v-for="event in showItems"> -->
                        <div class="event-card" v-for="event in showItems">
                            <RouterLink :to="`/events/${event.ID}` "class="router-link" > 
                            <img :src="event.image[0]" alt="">
                            <div class="card-content">
                                <div class="date">{{ event.event_date_display }}</div>
                                <h2 class="event-name">{{ event.event_name }}</h2>
                                <div class="address">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <p>{{ event.event_place }}</p>
                                </div>
                                <h3 class="tags">
                                    <div class="type-tag"># {{ event.category }}</div>
                                    <div class="place-tag"># {{ event.event_place }}</div>
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

                        :total="filterEvents.length"
                    
                    
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
                            opacity: .3;
                            background-color: $primaryColor-500;
                            border-radius: 999px;
                            cursor: pointer;
                            transition: all .3s ease;
                            

                            &.active {
                                opacity: 1;
                            }

                            img {
                                display: block;
                            }
                        }
                    }
                }
    
                // 活動項目區
                .event-list-section {
                    // border: 1px solid red;
                    width: 100%;
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
                                    transition: background-color .3s ease;

                                    &.active {
                                        border: 1px solid $secondaryColor-orange;
                                        background-color: $secondaryColor-orange;
                                    }
                                }
                            }
                            .select-date {}
                        }
                    }
    
                    // 活動項目卡片區
                    .event-list {
                        // border: 1px solid green; 
                        display: flex;
                        flex-wrap: wrap;
                        // justify-content: space-between;
                        justify-content: flex-start;
                        gap: 40px;

                        .no-event {
                            width: 100%;
                            text-align: center;
                            padding: 40px 20px;
                            font-size: 18px;
                            color: #ccc;
                        }

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

    @media screen and (max-width: 431px) {
        .eventhome-section {
            
            padding:0 16px 40px;
            
            .eventhome-banner {
                flex-direction: column;
                gap: 40px;
                .banner-content {
                    h1 {
                        font-size: 88px;
                    }
                    h2 {
                    }
                }
                img {
                    align-self: auto;
                    width: 60vw;
                }
            }

            .main {
                padding: 24px 24px;
                .container {
                    gap: 40px;
                    // 選擇活動類型
                    .event-type {
                        padding-bottom: 40px;
        
                        .select-title {}
        
                        .event-box {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: auto;
                            gap: 20px;
                            .event-select {
                                width: 45%;
            
                                img {
                                    display: block;
                                    width: 100%;
                                    object-fit: cover;
                                }
                            }
                        }
                    }
        
                    // 活動項目區
                    .event-list-section {
                        width: 100%;
                        gap: 16px;
                        // header
                        header {
                            h2 {
                            }
                            .event-ctrl{
                                padding-bottom: 20px;
                                overflow: scroll;
                                .place-tags{
                                    .tag {
                                        flex-shrink: 0;
                                    }
                                }
                                .select-date {}
                            }
                        }
        
                        // 活動項目卡片區
                        .event-list {
                            flex-wrap: nowrap;
                            justify-content: flex-start;
                            gap: 20px;
                            overflow: scroll;
                            padding-bottom: 20px;
                            .event-card {
                                flex-shrink: 0;
                                width: 300px;
                                overflow: hidden;
                                img {
                                }
                                .card-content {
                                    .date {
                                    }
                                    .event-name {
                                    }
                                    .address {
                                        .fa-location-dot {
                                        }
                                        p {
                                        }
                                    }
                                    .tags {
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
    }


</style>