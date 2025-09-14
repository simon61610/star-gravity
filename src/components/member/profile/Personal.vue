<script setup>
    // import { ref, onMounted, reactive, computed, watch } from 'vue'
    import { ref, onMounted, reactive, computed } from 'vue'

    import { UserFilled } from '@element-plus/icons-vue'
    import axios from 'axios'
    // import { isLoggedIn } from '@/composables/useAuth'

    // 後端 API
    // const PROFILE_API = 'http://localhost/PDO/Member/profile.php'
    // const UPDATE_API  = 'http://localhost/PDO/Member/update_profile.php'

    // API 根路徑 (來自 .env)
    const API_BASE = import.meta.env.VITE_AJAX_URL + "Member/"

    // 各 API
    const PROFILE_API = API_BASE + "profile.php"
    const UPDATE_API  = API_BASE + "update_profile.php"

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
        
    // 縣市區域選單
    const cities = ref([])
    // const areaOptions = ref([])
    // 初始化載入期間避免 watch 把已載入的 area 清空
    // const prefilling = ref(true)

    // 由 city 動態推導鄉鎮清單（不再用 ref 手動塞）
    const areaOptions = computed(() => {
        if (!member.city) return []
        const city = cities.value.find(c => c.CityName === member.city)
        return city ? city.AreaList : []
    })

    // 只有「使用者真的改縣市」時，才清空鄉鎮
    function onCityChange () {
        member.area = ''
    }

    onMounted(async() => {
        // 用 token 判斷是否登入
        const token = localStorage.getItem(LS_TOKEN)
        if(!token) {
            alert('請先登入')
            window.location.href = "/loginfirst"   // 登出後跳轉到登入頁
            return
        }
        // 載入城市/區域 JSON
        try {
            const res = await axios.get(import.meta.env.VITE_PUBLIC_URL + 'JSON_CSV_XML/CityCountyData.json') 
            cities.value = res.data || []
            // console.log(cities.value)
        } catch (e) {
            console.warn('載入縣市清單失敗', e)
            cities.value = []
        }
        // 用 token 向後端拿會員資料
        try {
            const { data } = await axios.get(PROFILE_API, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data?.success && data?.user) {
                const u = data.user
                member.ID = u.ID || ''
                member.name = u.name || ''
                member.phone = u.phone || ''
                member.city = u.city || ''
                member.address = u.address || ''
                // 如果預設就有 city，幫它把區域列表也帶好
                /* if(member.city) {
                    const city = cities.value.find(c => c.CityName === member.city)
                    areaOptions.value = city ? city.AreaList : []
                    } else {
                        throw new Error('未授權或資料格式不正確')
                } */
            //    if (member.city && cities.value.length) {
            //        const city = cities.value.find(c => c.CityName === member.city)
            //        areaOptions.value = city ? city.AreaList : []
            //     }
                
                // if(u.area){
                //     member.area = u.area
                // }

                // member.area = u.area || ''
                // console.log(data.user);
                
                
                // console.log(u)
                // console.log(member.area)
                // console.log(areaOptions.value)

                // 完成首輪帶入，不再視為初始化
                // prefilling.value = false

                // 帶入的 area 需是當前 city 的有效選項；不是就保持空
                if (u.area) {
                    const valid = areaOptions.value.some(a => a.AreaName === u.area)
                    member.area = valid ? u.area : ''
                }

            }
        } catch (e) {
            alert('登入已過期，請重新登入')
            localStorage.removeItem(LS_TOKEN)
            window.location.href = '/loginfirst'
        }

    })

    // 切換城市 → 重新整理區域選項，並清空已選區域
    // watch(() => member.city ,(newCity, oldCity) => {
    //     if (!prefilling.value ) return
    //     const city = cities.value.find(c => c.CityName === newCity)
    //     areaOptions.value = city ? city.AreaList : []
    //     // 只有使用者真的切換城市時才清空區域；初始化帶值時不要清空
    //     if (!prefilling.value && newCity !== oldCity) {
    //         member.area = ''
    //     }
    // })

    /* ---- 儲存（更新到資料庫；不再動 localStorage） ---- */
    async function save () {
        if (!canSave.value) { 
            alert('請把欄位填完整'); return 
        }
        const token = localStorage.getItem(LS_TOKEN)
        if (!token) { 
            alert('登入已過期，請重新登入'); window.location.href='/loginfirst'; 
            return 
        }
        saving.value = true
        try {
            const { data } = await axios.post(UPDATE_API, {
                // email: member.email,
                name: member.name.trim(),
                phone: member.phone.trim(),
                city: member.city,
                area: member.area,
                address: member.address.trim()
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            // 後端任一種皆可：{ ok: true } 或 { success: true }
            alert('已儲存！')
            const now = new Date()
            savedAt.value = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0')
        } catch (e) {
            alert(e?.message || '更新失敗')
        } finally {
            saving.value = false
        }
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
                <select v-model="member.city" class="select-city" required @change="onCityChange">
                    <option value="">縣市</option>
                    <option v-for="c in cities" :key="c.CityName" :value="c.CityName">{{ c.CityName }}</option>
                </select>
            </div>
            <div class="select">
                <select v-model="member.area" class="select-city" required>
                    <option value="">鄉鎮</option>
                    <option v-for="d in areaOptions" :key="d.AreaName" :value="d.AreaName">{{ d.AreaName }}</option>
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

