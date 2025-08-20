<template>   <!-----個人資料管理---------->
    <!-- <Personal/> -->
    <div class="personal">
        <div class="leftright">
            <!-----左邊頭像+選單-------->
            <aside class="sidebar">
                 <!-- 頭像 -->
                 <!-- <img class="photo" :src="photo" alt="頭像" /> -->
                 <div class="demo-type">
                     <el-avatar :icon="UserFilled" :size="55" class="avatar" />
                 </div>
     
                 <!-- 帳號 -->
                 <p class="username">{{ username }}</p>
     
                 <!-- 清單 -->
                 <ul class="menu">
                    <!-- <p>
                        <router-link to="/cartpage/cart">跳到購物車頁</router-link>
                    </p> -->
                     <li :class="{ active: activeKey === 'profile' }" class="menu-btn">
                         <router-link to='/membercenter/personal'>個人資料管理</router-link>
                    </li>
                         <!-- <button class="menu-btn" type="button" @click="selectItem('profile')">個人資料管理</button> -->
                     <!-- </li> -->
                     <li :class="{ active: activeKey === 'orders' }" class="menu-btn">
                         <router-link to='/membercenter/order'>我的訂單</router-link>
                    </li>
                         <!-- <button class="menu-btn" type="button" @click="selectItem('orders')">我的訂單</button> -->
                     <!-- </li> -->
                     <li :class="{ active: activeKey === 'events' }" class="menu-btn">
                         <router-link to='/membercenter/eventlist'>報名活動列表</router-link>
                    </li>
                         <!-- <button class="menu-btn" type="button" @click="selectItem('events')">報名活動列表</button> -->
                     <!-- </li> -->
                     <li :class="{ active: activeKey === 'favorites' }" class="menu-btn">
                         <router-link to='/membercenter/collection'>我的收藏</router-link>
                    </li>
                         <!-- <button class="menu-btn" type="button" @click="selectItem('favorites')">我的收藏</button> -->
                     <!-- </li> -->
                     <li :class="{ active: activeKey === 'reviews' }" class="menu-btn">
                         <router-link to='/membercenter/comment'>我的評論</router-link>
                    </li>
                         <!-- <button class="menu-btn" type="button" @click="selectItem('reviews')">我的評論</button> -->
                     <!-- </li> -->
                 </ul>
            </aside>
            <!-----右邊內容-------->
            
            <section class="content">
                <RouterView />
            </section>

        </div>

    </div>

</template>


<script setup>
    
    import { ref, onMounted, reactive, computed, watch } from 'vue'
    import { UserFilled } from '@element-plus/icons-vue'

    const props = defineProps({
    username: { type: String, default: '小姐/先生' },
    // photo:   { type: String, default: '/src/assets/icons/account.svg' }
    })

    const emit = defineEmits(['select'])
    const activeKey = ref('')

    // 預設第一個 active
    /* onMounted(() => {
        activeKey.value = 'profile'
        emit('select', 'profile')
    })

    function selectItem(key) {
        activeKey.value = key
        emit('select', key)
    } */


</script>


<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.personal{
    font-family: $chFont;
    width: 100%;
    height: calc(100vh - 100px);
    overflow-y: auto;           /* 把捲動限制在這個容器 */
    box-sizing: border-box;
    background-image: url(@/assets/images/member/login-bgi.png);
    background-size: cover;
}
.leftright{
    width: 1000px;
    display: flex;
    gap: 50px;
    margin: 0 auto;
    padding-top: 80px;
}
.sidebar{
    width: 150px;
    padding-top: 50px;
    color: $secondaryColor-yellow;
}
// 頭像icon
.demo-type {
    width: 60px;
    height: 55px;
    margin: 0 auto;
}
.username{
    font-size: $pcChFont-H4;
    // color: $FontColor-white;
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
    padding-top: 20px;
    font-size: $pcChFont-H4;
    // color: $secondaryColor-yellow;
    cursor: pointer;
}
// .menu-btn:hover, .menu li.active .menu-btn {   /* hover 與 active 都變色 */
//     color: $secondaryColor-orange;
//     text-decoration: underline;
// }

// .menu a.menu-btn,
// .menu a.menu-btn:link,
// .menu a.menu-btn:visited {
//   color: $secondaryColor-yellow;   /* 自己的變數，或直接寫顏色 */
//   text-decoration: none;\\
// }
</style>