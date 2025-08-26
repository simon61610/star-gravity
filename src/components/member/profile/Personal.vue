<script setup>
    import { ref, onMounted, reactive, computed, watch } from 'vue'
    import { UserFilled } from '@element-plus/icons-vue'

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
        台北市: ['中山區', '大安區', '信義區', '士林區'],
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
                <select v-model="member.district" class="select-city">
                <option value="">鄉鎮</option>
                <option v-for="d in districtOptions" :key="d" :value="d">{{ d }}</option>
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
    color: $FontColor-black;
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

