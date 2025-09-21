<script setup>
    import { ref, onMounted, reactive, computed } from 'vue'
    import axios from 'axios'

    // API 根路徑 (來自 .env)
    const API_BASE = import.meta.env.VITE_AJAX_URL + "Member/"

    // 各 API
    const PROFILE_API = API_BASE + "profile.php"
    const UPDATE_API  = API_BASE + "update_profile.php"

    // localStorage：現在只使用 token 來判斷是否登入
    const LS_TOKEN = 'token'
    // const loggedIn = computed(() => !!localStorage.getItem(LS_TOKEN))

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

    // 台灣手機格式驗證
    const isValidTWPhone = (v) => /^09\d{8}$/.test((v ?? '').trim())
        
    // 縣市區域選單
    const cities = ref([])

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
            const { data } = await axios.get(
                PROFILE_API, { 
                    withCredentials: true 
                }
            )

            if (data?.success && data?.user) {
                const u = data.user
                member.ID = u.ID || ''
                member.name = u.name || ''
                member.phone = u.phone || ''
                member.city = u.city || ''
                member.address = u.address || ''
                

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
        // 送出前再次檢查手機格式（與註冊一致）
        if (!isValidTWPhone(member.phone)) {
            alert('聯絡電話須為 09 開頭的 10 碼數字')
            return
        }
        const token = localStorage.getItem(LS_TOKEN)
        if (!token) { 
            alert('登入已過期，請重新登入'); window.location.href='/loginfirst'; 
            return 
        }
        saving.value = true
        try {
            const { data } = await axios.post(UPDATE_API, {
                name: member.name.trim(),
                phone: member.phone.trim(),
                city: member.city,
                area: member.area,
                address: member.address.trim()
            }, { 
                withCredentials: true 
            }
        )

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
        <h3 class="rowName">暱稱：</h3>
        <div class="row">
            <input :value="member.name" type="text" class="rowline" style="font-size: 18px" placeholder="我的名字" disabled />
        </div>
        <h3 class="rowName">聯絡電話：</h3>
        <div class="row">
            <input
              v-model="member.phone"
              type="tel"
              class="rowline"
              style="font-size: 18px"
              placeholder="我的電話"
              inputmode="numeric"          
              pattern="^09\\d{8}$"         
              maxlength="10"               
              @input="member.phone = member.phone.replace(/\\D/g,'').slice(0,10)"  
            />
        </div>
        <!-- <div class="row">
            <input v-model="member.phone" type="tel" class="rowline" style="font-size: 18px" placeholder="我的電話" />
        </div> -->
        <!----縣市鄉鎮-------->
        <h3 class="rowName">聯絡地址：</h3>
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
}
.rowline{
    width: 710px;
    height: 50px;
    box-sizing: border-box;
}

//input框標題
.rowName{
    font-size: $pcChFont-H4;
    color: $FontColor-white;
}

// 縣市區域大小
.personal-city{
    display: flex;
    width: 88%;
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
    display: flex;
    justify-content: flex-end;
    width: 700px;
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

// ------------------斷點---------------------------------
@media screen and (max-width: 1201px) {

    .personal-form{
        gap: 16px;
        padding-right: 8px;
    }
    /* 輸入框：由固定 710px → 全寬，避免撐出橫捲 */
    .rowline{
        width: 100%;
        height: 50px;     /* 與原本一致 */
        font-size: 16px;
        box-sizing: border-box;
    }
    /* 縣市/鄉鎮 */
    .personal-city{
        display: flex;
        flex-wrap: wrap;  /* 寬度不夠就換行 */
        gap: 16px;
        width: 100%;
    }
    .personal-city .select{
        flex: 1 1 340px;  /* 起碼 340px，空間夠可放大 */
        min-width: 0;     /* 防止子項撐寬容器 */
    }
    .select-city{
        width: 340px;     
        height: 50px;     
        max-width: 100%;  /* 容器更窄時最多跟容器等寬 */
        box-sizing: border-box;
    }
    /* 動作列：由固定 700px → 全寬 */
    .actions{
        width: 100%;
        justify-content: flex-end;
    }
    .save{
        width: 100px;
        height: 40px;
    }
}

@media screen and (max-width: 901px) {

    .personal-form{
        padding-top: 5px;
        padding-right: 5px;
        gap: 15px;
    }
    .rowline{
        width: 100%;          /* 原本 800px → 改全寬 */
        height: 46px;
        font-size: 16px;
    }
    .personal-city{
        display: grid;        /* 原本 flex → 改 grid 兩欄避免相加超寬 */
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        width: 100%;
    }
    .personal-city .select {
        min-width: 0;          /* ← 防止 grid 子項撐寬 */
    } 
    .select-city{
        width: 100%;
        height: 46px;
        box-sizing: border-box;
        font-size: 16px;     
    }
    .select-city option {
        font-size: 14px !important;   /* 比原本的複合選擇器更有力 */
        line-height: 1.4;              /* 避免每列過高（部分瀏覽器會吃） */
    }
    .actions{
        width: 100%;                   /* 原本 780px → 全寬 */
        justify-content: flex-end;
    }
    .save{
        width: 120px;                  /* 按鈕自身大小可維持 */
        height: 40px;
    }
}

@media screen and (max-width: 651px) {

    .personal-form{
        gap: 14px;
    }
    /* 輸入框全寬、降低高度 */
    .rowline{
        width: 100%;
        height: 44px;
        font-size: 14px;
        box-sizing: border-box;
    }
    /* 縣市/鄉鎮：單欄直排，避免兩欄總寬超出 */
    .personal-city{
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        width: 100%;
    }
    .select-city{
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        font-size: 14px;
    }
    /* 動作列全寬；手機上讓按鈕吃滿一行較好點擊 */
    .actions{
        width: 100%;
        justify-content: stretch;
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
    }













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

