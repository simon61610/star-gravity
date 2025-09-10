<script setup>
    import { ref, onMounted, reactive, computed, watch } from 'vue'
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

     // 統一管理後端 API 位址（注意大小寫與實際路徑一致）
    const API_BASE = 'http://localhost'
    const REGISTER_API = `${API_BASE}/PDO/Member/register.php`

    // 註冊後，把 email 暫存起來，登入頁會自動帶入
    const LS_REGISTER_EMAIL = 'registerEmail'

    // 密碼
    const pwd1 = ref('')  
    const pwd2 = ref('')

    // 可送出：密碼一致 + 最基本欄位都有
    const canSubmit = computed(() => (
        pwd1.value.length >= 6 &&
        pwd2.value.length >= 6 &&
        pwd1.value === pwd2.value &&
        !!name.value.trim() &&
        !!phone.value.trim() &&
        !!gender.value &&
        !!member.city &&
        !!member.area &&
        !!address.value.trim() &&
        !!email.value.trim()
    ))

    // 新增：如果不能按，這裡會說明第一個沒過的原因
    const whyDisabled = computed(() => {
        if (loading.value) return '正在送出中'
        if (pwd1.value.length < 6) return '密碼至少 6 碼'
        if (pwd2.value.length < 6) return '確認密碼至少 6 碼'
        if (pwd1.value !== pwd2.value) return '兩次密碼不一致'
        if (!name.value.trim()) return '缺姓名'
        if (!phone.value.trim()) return '缺電話'
        if (!gender.value) return '缺性別'
        if (!member.city) return '缺縣市'
        if (!member.area) return '缺鄉鎮'
        if (!address.value.trim()) return '缺地址'
        if (!email.value.trim()) return '缺信箱'
        return ''
    })

    // 縣市區域選單
    const cities = ref([])
    const areaOptions = ref([])

    // 驗證碼
    const captchaCode = ref('')
    const genCode = () => Math.random().toString(36).slice(2, 8).toUpperCase()
    
    // 頁面載入時會重新跑一次
    onMounted(async () => {
        captchaCode.value = genCode()   

        // =============================
        let res = await axios.get('/JSON_CSV_XML/CityCountyData.json')
        // console.log(res.data);
        cities.value = res.data
        // console.log(cities.value);

        
    })
    
    // 欄位
    const name = ref('')
    const phone = ref('')
    const gender = ref('')
    const address = ref('')      
    const email = ref('')
    const captcha = ref('')

    // 圖片檔案上傳
    // const file = ref(null)              

    // 狀態
    const loading = ref(false)
    const router  = useRouter()  

    // 送出：改為呼叫後端 PHP
    const handleRegister = async () => {
        console.log('[submit]', { canSubmit: canSubmit.value, why: whyDisabled && whyDisabled.value })
        if (!canSubmit.value) {
            ElMessage.error('欄位未完成或密碼不一致')
            return
        }
        // 驗證碼（不分大小寫）
        if (captcha.value.trim().toUpperCase() !== captchaCode.value.trim().toUpperCase()) {
            ElMessage.error('驗證碼錯誤')
            captcha.value = ''
            captchaCode.value = genCode()
            return
        }
        try {
            loading.value = true
            const form = new FormData()
            form.append('name', name.value.trim())
            form.append('email', email.value.trim())
            form.append('password', pwd1.value)
            form.append('phone', phone.value.trim())
            form.append('city', member.city)
            form.append('area', member.area)
            form.append('address', address.value.trim())
            form.append('gender', gender.value)
            // if (file?.value) form.append('image', file.value)
            // 檔案欄位：只有真的選了檔案才附上
            // if (file?.value instanceof File) form.append('image', file.value)

            // 依實際路徑調整
            const REGISTER_API = import.meta.env.VITE_AJAX_URL + "Member/register.php";
            
            const res = await fetch(REGISTER_API, {
                method: 'POST',
                // 註冊是公開 API，不帶 Cookie，避免不必要的預檢
                credentials: 'omit',
                // 不手動設定 Content-Type（瀏覽器會自動帶 multipart 邊界）
                headers: { 'Accept': 'application/json' },
                body: form,
            })

            // 有些失敗時非 JSON（如 500 HTML），要保護性解析
            let data = null, text = ''
            try {
                data = await res.clone().json()
            } catch {
                text = await res.text()
            }
            // 方便檢查回應內容
            console.log('[register status]', res.status, 'json:', data, 'text:', text)

            // 放寬成功條件：ok / success 任一 truthy，或純文字含「成功」也算成功
            const passed =  res.ok && (
                (data && (data.ok || data.success)) ||
                (!data && /成功/.test(text))
            )
            if (!passed) {
                const msg =
                    (data && (Array.isArray(data.errors) && data.errors[0])) ||
                    (data && data.message) ||
                    text ||  `註冊失敗（HTTP ${res.status}）`
                    throw new Error(msg)
            }

            // 成功：把 email 暫存，登入頁可自動帶入
            localStorage.setItem(LS_REGISTER_EMAIL, email.value.trim())

            ElMessage.success('註冊成功，請重新登入')
            router.replace('/loginfirst')

        } catch (err) {
            ElMessage.error(err.message || '伺服器發生錯誤')
        } finally {
            loading.value = false
        }
    }

    /* ---- 狀態 ---- */
    const member = reactive({
        city: '',
        area: '',
    })

    /* ---- 縣市 / 鄉鎮選單 ---- */
    watch(() => member.city ,(newCity) => {
        const city = cities.value.find(c => c.CityName === newCity)
        // console.log(city)
        areaOptions.value = city ? city.AreaList : []
        member.area = ''
    })

</script>

<template>      
    <div class="register-all">

        <div class="second-area">
            <form @submit.prevent="handleRegister">
                <div class="name">
                    <input type="text" class="name-1" placeholder="請輸入姓名" v-model="name" required />
                </div>
                <div class="phone">
                    <input type="text" class="phone-1" placeholder="請輸入電話" v-model="phone" required />
                </div>
                <!------勾選性別--------->
                <div class="gender-group">
                   <label>
                        <input type="radio" value="男性" v-model="gender" />男性
                   </label>
                   <label>
                        <input type="radio" value="女性" v-model="gender" />女性
                   </label>
                   <label>
                        <input type="radio" value="第三性" v-model="gender" />第三性
                   </label>
               </div>
               <!------選擇縣市--------->
                <div class="join-city">
                    <div class="select">
                        <select v-model="member.city" class="select-city" required>
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
               <!------選擇區域--------->
               <div class="adress">
                    <input type="text" class="adress-2" placeholder="請輸入地址" v-model="address" required />
                </div>
               <!------信箱--------->
               <div class="email">
                    <input type="email" class="email-2" placeholder="請輸入信箱" v-model="email" required />
                </div>
                <!----密碼----->
                <div class="password-area">
                    <div class="area1">
                        <el-input
                          v-model="pwd1"
                          class="custom-placeholder"
                          style="height: 50px; font-size: 14px;"
                          type="password"
                          placeholder="請輸入密碼(至少6碼)"
                          show-password
                        />
                    </div>
                    <div class="area2">
                        <el-input
                          v-model="pwd2"
                          class="custom-placeholder"
                          style="height: 50px; font-size: 14px;"
                          type="password"
                          placeholder="請再次輸入密碼"
                          show-password
                        />
                    </div>
                </div> 
                
                <div class="captcha-group-1">
                    <!-- 輸入驗證碼框 -->
                    <input v-model="captcha" type="text" class="captcha-2" placeholder="輸入驗證碼(不分大小寫)" required />
            
                    <!-- 灰色驗證碼格子 -->
                    <div class="captcha-code-1">{{ captchaCode }}</div>
            
                    <!-- 刷新按鈕 -->
                    <button class="refresh-btn-1" type="button" @click="captchaCode = genCode()">
                        <img src="@/assets/icons/refresh.svg" alt="">
                    </button>
                </div>
                <!-- 新增：不能送出的原因提示 -->
                <!-- <div  v-if="!canSubmit && !loading" style="color:#f66;margin:6px 0;">
                    不能送出：{{ whyDisabled }}
                </div> -->
                <!-- 送出按鈕 -->
                <button class="register-btn" type="submit" :disabled="loading || !canSubmit">
                    {{ loading ? '送出中...' : '送出' }}
                </button>
                
            </form>
        </div>
    
    </div>
</template>



<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.register-all{
    width: 100%;
    min-height: 100dvh;                 
    overflow: visible;                   /* 不在此層產生內捲軸 */
    padding-top: 0;
    margin-top: 0;
    overflow-x: hidden;
    padding-left: 10px;
}
.tabs{
    display: flex;
    gap: 12px;
    justify-content: center;
    text-align: center;
}
.tabs-btn-active{    // 登入鈕
    border: none;
    width: 280px;
    height: 45px;
    background-color: #5C4B90;
    font-size: $pcChFont-H4;
    color: $FontColor-white;
}
.tabs-btn{            // 註冊鈕
    border: none;
    width: 280px;
    height: 45px;
    background-color: #5C4B90;   
    font-size: $pcChFont-H4;
    color: $FontColor-white;
}
.second-area{
    width: min(100%, 600px);
    max-width: 600px;
    margin: 10px auto 0;
    padding: 0 12px;
}
/* Element Plus 寬度 */
.custom-placeholder, .custom-placeholder ::v-deep(.el-input__wrapper){
    width: 100%;
    max-width: 576px;
    box-sizing: border-box;
}
// 姓名
.name{
    margin-top: 20px;
    margin-bottom: 20px;
}
.name-1{
    width: 100%;
    max-width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}
// 電話
.phone{
    margin-top: 20px;
    margin-bottom: 20px;
}
.phone-1{
    width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}
.gender-group{
    display: flex;
    gap: 15px;
}
.gender-group label{
    color: $FontColor-white;
    font-size: $pcChFont-p;
}
.adress{
    margin-top: 20px;
    margin-bottom: 20px;
}
.adress-2{
    width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}
// 縣市區域大小
.join-city{
    margin-top: 20px;
    display: flex;
    gap: 24px;
}
.select-city{
    width: 277px;
    height: 50px;
    padding-left: 14px;
    font-size: $pcChFont-small;
    color: #9aa0a6;
}
// 縣市區域字體大小
.personal-city .select-city, .personal-city .select-city option {
    padding-left: 14px;
    font-family: $chFont;
    font-size: $pcChFont-p; 
}
.email{
    margin-top: 20px;
    margin-bottom: 20px;
}
.email-2{
    width: 558px;
    height: 50px;
    font-size: $pcChFont-small;
    padding-left: 14px;
}
// 密碼
.area2{
    margin-top: 20px;
}
.custom-placeholder ::v-deep(.el-input__inner::placeholder) {
    color: #000; 
    opacity: 0.5; 
}
.captcha-group-1{
    display: flex;
    gap: 10px;
    margin: 0 auto;
    margin-top: 20px;
    align-items: center
}
.captcha-2{
    flex: 1 1 0;
    min-width: 0;
    width: 100%;
    height: 45px;
    font-size: $pcChFont-small;
    padding-left: 12px;
    box-sizing: border-box;
}
.captcha-code-1{
    background-color: $FontColor-gray;
    font-size: $pcChFont-small;
    width: 96px;
    height: 50px;
    text-align: center;
    line-height: 50px;
}
.refresh-btn-1{
    background-color: transparent;
    border: none;
    flex: 0 0 auto;
}
.refresh-btn-1 img{
    width: 28px;
}
.register-btn{
    background-color: $primaryColor-500;
    color: $FontColor-white;
    font-size: $pcChFont-p;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 60px;
    width: 470px;
    height: 45px;
}

@media screen and (max-width: 433px) {
    .register-all{
        min-height: 100dvh;
        padding: 0 6px 40px;
        background: none;
        overflow-x: hidden;
    }
    .tabs{
        gap: 8px;
        padding: 0 4px;
        margin-top: 12px;
    }
    /* 內容區 */
    .second-area{
        width: 100%;
        margin-top: 12px;
        padding: 0 4px;
    }
     /* 輸入格 */
    .name-1, .phone-1, .adress-2, .email-2, .captcha-2{
        width: 100%;
        max-width: 390px;
        height: 44px;
        font-size: 14px;
        padding-left: 12px;
        box-sizing: border-box;
    }
    /* 性別 */
    .gender-group{
        flex-wrap: wrap;
        gap: 12px;
    }
    .gender-group label{
        font-size: 14px;
        line-height: 1.6;
    }
    /* 縣市/鄉鎮 */
    .join-city{
        margin-top: 16px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }
    .select-city{
        width: 100%;
        max-width: 181px;
        height: 44px;
        padding-left: 12px;
        font-size: 14px;
        box-sizing: border-box;
    }
    /* 密碼 el-input */
    .password-area{
        margin-top: 8px;
    }
    .area2{ 
        margin-top: 12px; 
    }
    .custom-placeholder{
        width: 100% !important;
        height: auto !important;
    }
    .custom-placeholder ::v-deep(.el-input__wrapper){
        width: 100% !important;
        max-width: 390px;
        height: 44px;
        padding-left: 12px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .custom-placeholder ::v-deep(.el-input__inner){
        height: 44px;
        font-size: 14px;
    }
    /* 驗證碼 */
    .captcha-group-1{
        display: grid;
        grid-template-columns: 1fr 96px 32px;
        column-gap: 8px;
        align-items: center;
        margin-top: 12px;
    }
    .captcha-code-1{
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
    }
    .refresh-btn-1 img{
        width: 24px;
        height: 24px;
    }
    /* 送出按鈕 */
    .register-btn{
        width: 100%;
        height: 44px;
        margin: 16px 0 0 0;
        font-size: 16px;
        border-radius: 999px;
    }

}

</style>

