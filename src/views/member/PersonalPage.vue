<template>   <!-----個人資料管理---------->
    <div class="personal">
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

        <!-----右側內容-------->
        <div class="content">

           <section v-if="activeKey === 'profile'">
                <div class="row">
                    <input v-model="f.name" type="text" placeholder="我的名字" />
                </div>

                <div class="row">
                    <input v-model="f.phone" type="tel" placeholder="我的電話" />
                </div>








            </section>





            
        </div>

















        

    </div>






</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.personal{
    font-family: $chFont;
    width: 100%;
    height: calc(100vh - 50px);
    overflow-y: auto;           /* 把捲動限制在這個容器 */
    box-sizing: border-box;
    background-image: url(@/assets/images/member/login-bgi.png);
    background-size: cover;
}
.sidebar{
    border: 1px solid red;
    width: 150px;
    // margin: 0 auto;
    // margin-left: 480px;
    padding-top: 20px;
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
}

</style>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps({
    username: { type: String, default: '小姐/先生' },
    photo:   { type: String, default: '/src/assets/icons/account.svg' }
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

    
</script>