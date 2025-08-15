<template>   <!-----個人資料管理---------->
    <div class="personal">
       <!-----左邊頭像+選單-------->
        <aside class="sidebar">
            <!-- 頭像 -->
            <img class="avatar" :src="avatar" alt="頭像" />

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


















        

    </div>






</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.personal{
    width: 100%;
    height: calc(100vh - 50px);
    // background-image: url(@/assets/images/member/login-bgi.png);
    // background-size: cover;
}
.avatar{
    width: 80px;
    height: 80px;
}
// .profile{
//     border: 1px solid red;
//     width: 224px;
// }
// .sidebar p{
//     padding-top: 12px;
//     font-size: $pcChFont-H3;
//     color: $secondaryColor-yellow;
// }
// .menu{
//     padding-top: 20px;
//     width: 158px;
// }
.menu{
    border: 1px solid red;
    width: 150px;
}
.menu-btn{
    border: none;
    background-color: transparent;
    padding-top: 10px;
    
}


</style>

<script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps({
    username: { type: String, default: '徐小姐' },
    avatar:   { type: String, default: '/src/assets/icons/account.svg' }
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