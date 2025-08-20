<!----我的收藏---->
<template>
    <div class="collectionwrapper">
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
            
            <!----右邊-------->
            <div class="products">
                <div class="flex">
                    <article v-for="p in products" :key="p.id" class="card">
                        
                        <div class="photoall">
                            <div class="thumb">
                                <img src="@/assets/images/shop/shophome-binoculars.jpg" alt="">
                            </div>
                
                            <div class="down">
                                <div class="titleprice">
                                <h3 class="title">{{ p.title }}</h3>
                                <p class="price">{{ formatTWD(p.price) }}</p>
                                </div>
                    
                                <div class="actions">
                                    <button class="btn cancel ">取消收藏</button>
                                    <button class="btn primary">直接購買</button>
                                </div>
                            </div>
                        </div>
                    </article>
                    <!----分頁-------->
                    <div class="pager">
                        <el-pagination background layout="prev, pager, next" :total="24" />
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.collectionwrapper{
    width: 100%;
    min-height: calc(100vh - 50px);
    background-image: url(@/assets/images/member/login-bgi.png);
    background-size: cover;
}
.all{
    display: flex;
    width: 1000px;
    margin: 0 auto;
    padding-top: 50px;
    gap: 50px;
}
// 左邊開始
.sidebar{
    width: 150px;
    padding-top: 60px;
    padding-left: 35px;
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
    color: $FontColor-white;
    padding-top: 20px;
    padding-left: 30px;
}
.menu{
    padding: 10px 10px;
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
    text-decoration: underline;
}
// 右邊開始
.products{
    padding: 12px;
    width: 700px;
    height: 500px;
}
.flex {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));     /* 固定4欄 */
    column-gap: 16px;   /* 左右間距 */
    row-gap: 140px;     /* 上下間距 */
}
.card{
    width: 120px;
    height: 120px;
    margin: 0;
}
/* 圖片 */
.photoall{
    width: 170px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.thumb img{
    width: 120px;
    height: 120px;
    border-radius: 8px;
}
/* 文字區 */
.down{
    width: 170px;
    display: flex;
    flex-direction: column;
}
.titleprice{
    height: 70px;
    margin-top: 10px;
    color: $FontColor-white;
}
.title { 
    margin: 10px auto; 
    text-align: center;
    font-size: $pcChFont-p;
}
.price { 
    text-align: center;
    font-size: $pcChFont-p;
    opacity: .9; 
}
/* 按鈕 */
.actions { 
    display: flex; 
    gap: 8px; 
    justify-content: center; 
    width: 170px;
}
.btn {
    padding: 3px 10px;
    border-radius: 8px;
    font-size: $pcChFont-small;
    cursor: pointer;
    margin-top: 10px;
    background-color: $primaryColor-500;
    color: $FontColor-white; 
}
.btn.cancel { 
    background-color: $primaryColor-100;
    color: $FontColor-black;
}
.btn.primary:hover {
    background-color: $inputColor-focus;
}
.btn:active { 
    transform: translateY(1px); 
}
// 分頁
.pager{
    width: 700px;
    display: flex;
    justify-content: flex-end;  /* 靠最右邊 */
    padding-right: 4px; 
}
</style>

<script setup>
    import { ref, computed, onMounted } from 'vue'

    // 左邊資料
    const props = defineProps({
    username: { type: String, default: '小姐/先生' },
    photo:   { type: String, default: '/src/assets/icons/account.svg' }    // 頭像還沒新增
    })

    const emit = defineEmits(['select'])
    const activeKey = ref('')

    // 預設第一個 active
    onMounted(() => {
    activeKey.value = 'profile'
    emit('select', 'profile')
    })

    function selectItem(key) {
    activeKey.value = key
    emit('select', key)
    }

    // 右邊資料
    // 先放 8 張假資料；之後接 API 只要改這個陣列即可
    const products = ref(
    Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: '基礎望遠鏡',
        price: 2500,
    }))
    )
    const products8 = computed(() => products.value.slice(0, 8))

    const formatTWD = (n) => `NT$${Number(n).toLocaleString('zh-TW')}`

    // 分頁
    const page = ref(1)
</script>