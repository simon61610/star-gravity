<template>   <!-----個人資料管理---------->
    <!-- <Personal/> -->
    <div class="personal">
        <div class="leftright">
            <!-----左邊頭像+選單-------->
            <aside class="sidebar">
                <div class="demo-type">
                    <el-avatar :icon="UserFilled" :size="55" class="avatar" />
                </div>
    
                <!-- 帳號 -->
                <p class="username">{{ username }}</p>
    
                <!-- 清單 -->
                <ul class="menu">
                <li>
                    <router-link class="menu-link" to='/membercenter/personal'>個人資料管理</router-link>
                </li>
                <li>
                    <router-link class="menu-link" to='/membercenter/order'>我的訂單</router-link>
                </li>
                <li>
                    <router-link class="menu-link" to='/membercenter/eventlist'>報名活動列表</router-link>
                </li>
                <li>
                    <router-link class="menu-link" to='/membercenter/collection'>我的收藏</router-link>
                </li>
                <li>
                    <router-link class="menu-link" to='/membercenter/comment'>我的評論</router-link>
                </li>
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
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'
    import { UserFilled } from '@element-plus/icons-vue'

    const props = defineProps({
        username: { type: String, default: '小姐/先生' },
    })

</script>


<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.personal{
    font-family: $chFont;
    width: 100%;
    height: calc(100vh - 80px);
    overflow-y: auto;           /* 把捲動限制在這個容器 */
    box-sizing: border-box;
    background-image: url(@/assets/images/member/login-bgi.png);
    background-size: cover;
}
.leftright{
    // max-width: 1200px;
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 50px;
    margin: 0 auto;
    padding-top: 50px;
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
    padding-top: 20px;
    padding-left: 30px;
}
.menu{
    padding: 10px 10px;
    width: 150px;
}
/* 預設/已瀏覽顏色（把原色覆蓋掉） */
.menu .menu-link,
.menu .menu-link:link,
.menu .menu-link:visited {
    font-size: $pcChFont-H4;
    color: $secondaryColor-yellow;
    text-decoration: none;
    display: block;
    padding: 10px 0;
}
/* 滑過 & 當前頁 */
.menu .menu-link:hover,
.menu .menu-link.router-link-active,
.menu .menu-link.router-link-exact-active {
    color: $secondaryColor-orange;
    text-decoration: underline;
}

</style>