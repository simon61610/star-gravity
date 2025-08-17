<template>    <!-----我的評論---------->
    <div class="commentall">
        <div class="all">
            <!-----左邊頭像+選單-------->
            <aside class="sidebar">
                <!-- 頭像 -->
                <img class="photo" :src="photo" alt="頭像" />
    
                <!-- 帳號 -->
                <p class="username">{{ username }}</p>
    
                <!-- 清單 -->
                <ul class="menu">
                    <li :class="{ active: activeKey === 'profile' }">
                        <button class="menu-btn" type="button" @click="selectItem('profile')">個人資料管理</button>
                    </li>
                    <li :class="{ active: activeKey === 'orders' }">
                        <button class="menu-btn" type="button" @click="selectItem('orders')">我的訂單</button>
                    </li>
                    <li :class="{ active: activeKey === 'events' }">
                        <button class="menu-btn" type="button" @click="selectItem('events')">報名活動列表</button>
                    </li>
                    <li :class="{ active: activeKey === 'favorites' }">
                        <button class="menu-btn" type="button" @click="selectItem('favorites')">我的收藏</button>
                    </li>
                    <li :class="{ active: activeKey === 'reviews' }">
                        <button class="menu-btn" type="button" @click="selectItem('reviews')">我的評論</button>
                    </li>
                </ul>
            </aside>
            <!-----右邊評論-------->
            <div class="comment-area">
                <h3>陽明山</h3>
                <span class="review-score">  <!--到時候img 用v-for跑 評論幾分跑幾次---->
                    <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                    <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                    <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                    <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                    <img src="../../assets/icons/icon-filledStar.svg" alt="星星">
                </span>
                <p class="review-text">
                    新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。
                </p>
                <img class="review-photo" src="../../assets/images/aboutstar/star space.png" alt="">
                <h4>刪除</h4>

            </div>
        </div>

    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.commentall{
    width: 100%;
    height: calc(100vh - 100px);
    background-image: url(@/assets/images/member/login-bgi.png);    
    background-size: cover;
}
.all{
    width: 1200px;
    display: flex;
    gap: 50px;
    margin: 0 auto;
    padding-top: 80px;
}
.sidebar{
    width: 150px;
    padding-top: 20px;
    padding-left: 30px;
    color: $secondaryColor-yellow;
}
.photo{
    width: 80px;
    height: 80px;
    margin: 0 auto;
    padding-left: 30px;
}
.username{
    font-size: $pcChFont-H4;
    padding-top: 20px;
    padding-left: 30px;
}
.menu{
    padding: 10px;
    width: 150px;
}
.menu-btn{
    border: none;
    background-color: transparent;
    padding-top: 10px;
    font-size: $pcChFont-H4;
    color: $secondaryColor-yellow;
    cursor: pointer;
}
.menu-btn:hover, .menu li.active .menu-btn {   /* hover 與 active 都變色 */
    color: $secondaryColor-orange;
}
// 右邊評論
.comment-area{
    border: 1px solid red;
    padding-left: 16px;
    padding-top: 10px;
    height: 271px;
    color: $FontColor-white;
}
.comment-area h3{
    font-size: $pcChFont-H4;
}
.review-score{
    padding-top: 10px;
    display: flex;
    gap: 4px;
    
}
.review-score img{
    width: 20px;
    color: $secondaryColor-yellow;
}
.review-text{
    padding-top: 10px;
    font-size: $pcChFont-p;
}
.review-photo{
    padding-top: 10px;
    width: 150px;
    height: 150px;
}
.comment-area h4{
    font-size: $pcChFont-p;
    padding-top: 9px;
    width: 800px;
    display: flex;
    justify-content: flex-end;
    text-decoration: underline;
    padding-right: 5px;
}

</style>

<script setup>
    import { ref, computed, onMounted } from 'vue'

    // 定義 props（照你原本：photo 路徑暫時不動）
    const props = defineProps({
    username: { type: String, default: '小姐/先生' },
    photo:    { type: String, default: '/src/assets/icons/account.svg' },
    // data:     { type: Array,  default: () => [] },
    // columns:  { type: Array,  default: () => [] },
    })
    const emit = defineEmits(['select'])
    const activeKey = ref('')
    onMounted(() => { activeKey.value = 'profile'; emit('select', 'profile') })
    function selectItem(key){ activeKey.value = key; emit('select', key) }





    const handleEdit = (index, row) => {
    console.log(index, row)
    }

    // 之後想開分頁再把 showATable 改成用 slice
    const showATable = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return dataSource.value.slice(start, start + pageSize.value)
    })








</script>