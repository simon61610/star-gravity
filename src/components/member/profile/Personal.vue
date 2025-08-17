<!----個人資料修改---->
<template>
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
            <!-----右邊內容-------->
            <div class="personal-form">
                    <div class="row">
                        <input :value="member.name" type="text" class="rowline" style="font-size: 18px" placeholder="我的名字" disabled />
                    </div>
                    <div class="row">
                        <input v-model="member.phone" type="tel" class="rowline" style="font-size: 18px" placeholder="我的電話" />
                    </div>
                <!----縣市鄉鎮-------->
                    <div class="personal-city">
                        <div class="select">
                            <select v-model="member.city" class="select-city">
                            <option value="">縣市</option>
                            <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
                            </select>
                            <!-- <span class="caret"></span> -->
                        </div>
                        <div class="select">
                            <select v-model="member.district" class="select-city">
                            <option value="">鄉鎮</option>
                            <option v-for="d in districtOptions" :key="d" :value="d">{{ d }}</option>
                            </select>
                            <!-- <span class="caret">▾</span> -->
                        </div>
                    </div>
                 <!-- 我的地址 -->
                    <div class="row">
                        <input v-model="member.address" type="text" class="rowline" style="font-size: 18px" placeholder="我的地址" />
                    </div>
                 <!-- 儲存 -->
                    <div class="actions">
                        <button class="save" :disabled="saving" @click="save">
                            {{ saving ? '儲存中…' : '儲存' }}
                        </button>
                        <span class="hint" v-if="savedAt">已更新 {{ savedAt }}</span>
                    </div>
            </div>

        </div>

    </div>

</template>

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
    padding-top: 20px;
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
    padding-top: 10px;
    font-size: $pcChFont-H4;
    color: $secondaryColor-yellow;
    cursor: pointer;
}
.menu-btn:hover, .menu li.active .menu-btn {   /* hover 與 active 都變色 */
    color: $secondaryColor-orange;
    text-decoration: underline;
}
// 右邊內容
.personal-form{
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}
.row{
    width: 710px;
}
.rowline{
    width: 700px;
    height: 50px;
}
// 縣市區域大小
.personal-city{
    display: flex;
    gap: 24px;
}
.select-city{
    width: 340px;
    height: 50px;
}
// 縣市區域字體大小
.personal-city .select-city, .personal-city .select-city option {
    font-family: $chFont;
    font-size: $pcChFont-p; 
}
// 儲存按鈕
.actions{
    width: 700px;
    display: flex;
    justify-content: flex-end;
}
.save{
    background-color: $primaryColor-500;
    color: $FontColor-white;
    font-size: $pcChFont-p;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    width: 100px;
    height: 40px;
}
// 按儲存後會跳出更新字
.hint{
    font-size: $pcChFont-small; 
    color: $FontColor-white;
}
</style>

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
    onMounted(() => {
    activeKey.value = 'profile'
    emit('select', 'profile')
    })

    function selectItem(key) {
    activeKey.value = key
    emit('select', key)
    }

    /* ---- 假後端：取會員註冊資料 ---- */
    function fetchMember() {
        return new Promise(resolve => {
            setTimeout(() => {
            resolve({
                name: '王小明',                // 先顯示
                phone: '0912-345-678',
                city: '台北市',
                district: '大安區',
                address: '仁愛路三段 123 號'
            })
            }, 300)
        })
        }
        function updateMember(payload) {
        return new Promise(resolve => setTimeout(() => resolve({ ok: true }), 500))
    }
    /* ---- 狀態 ---- */
    const member = reactive({
        name: '',
        phone: '',
        city: '',
        district: '',
        address: ''
    })

    const saving = ref(false)
    const savedAt = ref('')

    /* ---- 縣市 / 鄉鎮選單 ---- */
    const DISTRICTS = {
        台北市: ['中正區', '大安區', '信義區', '士林區'],
        新北市: ['板橋區', '新店區', '三重區', '永和區'],
        桃園市: ['桃園區', '中壢區', '龜山區', '八德區']
    }
    const cities = Object.keys(DISTRICTS)
    const districtOptions = computed(() => DISTRICTS[member.city] || [])
        watch(() => member.city, () => {
        if (!districtOptions.value.includes(member.district)) member.district = ''
    })
        
    /* ---- 載入會員資料 ---- */
    onMounted(async () => {
        const data = await fetchMember()
        Object.assign(member, data)
    })

    /* ---- 儲存 ---- */
    async function save() {
        saving.value = true
        await updateMember({ ...member })
        saving.value = false
        const now = new Date()
        savedAt.value =
        String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0')
    }

    
</script>