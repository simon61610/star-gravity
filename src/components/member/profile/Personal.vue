<script setup>
    import { ref, onMounted, reactive, computed, watch } from 'vue'
    import { UserFilled } from '@element-plus/icons-vue'
    // import { isLoggedIn } from '@/composables/useAuth'

    // 後端 API
    // const API_BASE = 'http://localhost'
    // const UPDATE_API = `${API_BASE}/PDO/Member/update_profile.php`
    // const PROFILE_API= `${API_BASE}/PDO/Member/profile.php`
    const PROFILE_API = 'http://localhost/PDO/Member/profile.php'
    const UPDATE_API  = 'http://localhost/PDO/Member/update_profile.php'

    // localStorage：現在只使用 token 來判斷是否登入
    const LS_TOKEN = 'token'
    const loggedIn = computed(() => !!localStorage.getItem(LS_TOKEN))

    /* ---- 狀態 ---- */
    const member = reactive({
        ID: '',        
        email: '',     
        name: '',
        phone: '',
        city: '',
        area: '',  
        address: ''
    })

    const saving = ref(false)
    const savedAt = ref('')

    // 基本欄位都填了才可儲存
    const canSave = computed(() =>
        member.name.trim() && member.phone.trim() &&
        member.city && member.area && member.address.trim()
    )

    /* ---- 縣市 / 鄉鎮選單 ---- */
    const DISTRICTS = {
        台北市: ['中山區', '大安區', '信義區', '士林區'],
        新北市: ['板橋區', '新店區', '三重區', '永和區'],
        桃園市: ['桃園區', '中壢區', '龜山區', '八德區']
    }
    const cities = Object.keys(DISTRICTS)

    const areaOptions = computed(() => DISTRICTS[member.city] || [])
    watch(() => member.city, () => {
        if (!areaOptions.value.includes(member.area)) member.area = ''
    })
        
    /* ---- 載入會員資料 ---- */
    onMounted(() => {
        // 只檢查是否登入；沒登入才回登入頁
        if( !localStorage.getItem('user') ){
            alert('請先登入')
            window.location.href = "/loginfirst"   // 登出後跳轉到登入頁
        } 
        
        // 有登入抓取localstorage資料

    })

    /* ---- 儲存（更新到資料庫；不再動 localStorage） ---- */
    // function save() {
    //     if (!canSave.value) { alert('請把欄位填完整'); return }
    //     saving.value = true
    //     // fetch('http://localhost/PDO/Member/update_profile.php', 
    //     fetch(UPDATE_API, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             email: member.email,
    //             name: member.name.trim(),
    //             phone: member.phone.trim(),
    //             city: member.city,
    //             area: member.area,
    //             address: member.address.trim()
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         if (!data?.ok) throw new Error(data?.message || '更新失敗')
    //         alert('已儲存！')
    //         const now = new Date()
    //         savedAt.value =
    //             String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0')
    //     })
    //     .catch(e => {
    //         alert(e?.message || '更新失敗')
    //     })
    //     .finally(() => {
    //         saving.value = false
    //     })
    // }


</script>

<template>
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
            </div>
            <div class="select">
                <select v-model="member.area" class="select-city">
                <option value="">鄉鎮</option>
                <option v-for="d in areaOptions" :key="d" :value="d">{{ d }}</option>
                </select>
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

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

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

@media screen and (max-width: 433px) {
    .personal-form{
        gap: 12px;
        margin-top: 12px;
        padding: 0 12px;
        box-sizing: border-box;
    }
    .row{ 
        width: 100%; 
    }
    /* 輸入框 */
    .rowline{
        width: 100% !important;
        height: 44px;
        padding: 0 12px;
        box-sizing: border-box;
    }
    /* 縣市/鄉鎮 */
    .personal-city{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
    .select-city{
        width: 100%;
        height: 44px;
        padding-left: 12px;
        font-size: 14px;
        box-sizing: border-box;
    }
     /* 儲存區：按鈕全寬，提示文字改到下一行置中 */
    .actions{
        width: 100%;
        display: block;
        margin-top: 8px;
    }
    .save{
        width: 100%;
        height: 44px;
        font-size: 16px;
        border-radius: 999px;
    }
    .hint{
        display: block;
        margin-top: 6px;
        text-align: center;
        font-size: 12px;
    }





}









</style>

