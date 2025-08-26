<script setup>
    import { ref, onMounted, reactive, computed, watch } from 'vue'

    // 密碼
    const pwd1 = ref('')  
    const pwd2 = ref('')
    // 判斷密碼同樣才可以送出
    const canSubmit = computed(() => {    
    return pwd1.value.length > 0 &&
           pwd2.value.length > 0 &&
           pwd1.value === pwd2.value
    })
    // 驗證碼
    const captchaCode = ref('')
    const genCode = () => Math.random().toString(36).slice(2, 8).toUpperCase()
    // 頁面載入時會重新跑一次
    onMounted(() => {
        captchaCode.value = genCode()   
    })
    
    // 欄位
    const name = ref('')
    const phone = ref('')
    const gender = ref('')
    const address = ref('')      
    const email = ref('')
    const captcha = ref('')
    // 送出
    const handleRegister = () => {
        if (!canSubmit.value) return
        alert('註冊成功！（假資料測試）')
    }

    /* ---- 假後端：取會員註冊資料 ---- */
    function fetchMember() {
        return new Promise(resolve => {
            setTimeout(() => {
            resolve({
                name: '王小明',                
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
        city: '',
        district: '',
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
                    <button class="refresh-btn-1" @click="captchaCode = genCode()">
                        <img src="@/assets/icons/refresh.svg" alt="">
                    </button>
                </div>
                <!-- 送出按鈕 -->
                <button class="register-btn" type="submit">送出</button>
                
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

