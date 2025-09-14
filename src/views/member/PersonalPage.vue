<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { onMounted } from 'vue'
    // import { UserFilled, SwitchButton } from '@element-plus/icons-vue'
    import axios from 'axios' 
    import { useMemberStore } from '@/stores/member'
    import { ref } from 'vue'

    const memberStore = useMemberStore()

    const memberID = ref("")

    // const props = defineProps({
    //     username: { type: String, default: '小姐/先生' },
    // })

    // 頭像
    // 預覽用的 base64
    const preview = ref('')
    // 真的要上傳的檔案物件
    const file = ref(null)
    const router = useRouter() 
    const username = ref('小姐/先生') 

    // 後端根路徑（用 Vite 環境變數更彈性）
    const API_BASE = import.meta.env.VITE_AJAX_URL || '/'

    function url(path) {
        // 先處理已是完整網址的情況，避免變成 "http://backend/http://cdn/..."
        if (/^https?:\/\//i.test(path)) return path
        let base = API_BASE
        if (!base.endsWith('/')) base += '/'     // base 末端補 /
        if (path.startsWith('/')) path = path.slice(1) // 路徑前端去掉 /
        return base + path
    } // 小提醒：這個 url() 不只拿來組 API，用來補圖片相對路徑也 OK（例如 uploads/avatars/13/xxx.webp）

    // 選圖後：驗證型別/大小 → 做本地預覽
    function onPick(e) {
        const f = e.target.files?.[0]
        if (!f) return

        // 型別/大小限制：JPG/PNG/WebP 且 <= 2MB
        const okType = /^image\/(png|jpeg|jpg|webp)$/.test(f.type)
        const okSize = f.size <= 2 * 1024 * 1024
        if (!okType) return alert('只允許 JPG / PNG / WebP 圖片')
        if (!okSize) return alert('圖片大小不得超過 2MB')

        file.value = f

        const reader = new FileReader()
        reader.onload = () => (preview.value = reader.result)
        reader.readAsDataURL(f)
    }

    // 實際上傳到後端（FormData + 支援 Session / Bearer）
    async function save() {
        if (!file.value) return alert('請先選擇圖片')
        const fd = new FormData()
        fd.append("memberID", memberID.value)
        fd.append('avatar', file.value)  // 後端用 $_FILES['avatar'] 接

        // 若你登入有回 token，就帶上 Authorization
        const token = localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {} // 與後端驗證一致

        // const res = await axios.post("", 資料)
        // res = { data: 接收到的資料, .... }
        // res.data 

        try {
            const { data } = await axios.post(
                url('Member/update_profile_img.php'),
                fd,
                { withCredentials: true, headers } // 若用 Cookie 登入，需要 true；純 Bearer 也可留著
            )

            console.log(data)
            // if (!data?.success) throw new Error(data?.message || '上傳失敗')

            // 用後端回的路徑直接當圖源，並加版本避免快取到舊圖
            // preview.value = data.image + '?v=' + data.version
            if (!data?.success || !data?.data) throw new Error(data?.message || '上傳失敗')
            // 後端回傳格式（建議）為：{ success, data:{ avatarUrl, cacheBustParam } }
            const avatarUrl = data.data.avatarUrl
            const v = data.data.cacheBustParam ?? Date.now()
            preview.value = url(avatarUrl) + '?v=' + v // 重要：相對路徑補成完整網址

            // （可選）清空檔案 input 狀態
            // file.value = null
            alert('頭像已更新')
        } catch (err) {
            alert(err.message || '發生錯誤，請稍後再試')
        }
    }
    // 進頁面時拉會員資料（需後端 profile.php 回傳 image 與 name）
    async function fetchProfile() {

        // 以下先暫時用前台抓會員ID
        memberID.value = memberStore.user?.ID
        console.log(memberID.value);
        

        // 同步 Bearer（可選）
        const token = localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        try{
            const { data } = await axios.get(
                url('Member/profile.php'), 
                { withCredentials: true, headers }
            )
            // 假設後端回：{ success:true, user:{ name:'..', image:'/pdo/Member/uploadImages/xxx.jpg' } }
            if (data?.success) {
                if (data.user?.name)  username.value = data.user.name
                if (data.user?.image) preview.value  = url(data.user.image) + '?v=' + Date.now()
                // ↑ 關鍵：若後端回 image 為相對路徑（uploads/...），用 url() 補成完整網址，避免跨網域取不到
            }
        } catch(e) {
            // 不打擾使用者；需要可印 log
        }
    }

    // 送到後端（示範：改成你的 API 即可）
    // async function save() {
    //     if (!file.value) return alert('請先選擇圖片')
    //     // const fd = new FormData()
    //     // fd.append('avatar', file.value)
    //     // await axios.post('/api/me/avatar', fd)

    //     alert(`（示範）已準備上傳：${file.value.name}`)
    //     // 上傳成功後可清空或保留預覽
    //     // file.value = null
    //     // preview.value = ''
    // }

    //判斷是否已經登入
    onMounted(()=>{
        if( !localStorage.getItem('token') ){
            alert('請先登入')
            router.push('/loginfirst')   // 登出後跳轉到登入頁
        } else {
            fetchProfile()               // 已登入就去抓目前的頭像與姓名
        }
    })


</script>

<template>  
    <!-- <Personal/> -->
    <div class="personal">
        <div class="leftright">
            <!-----左邊頭像+選單-------->
            <aside class="sidebar">
                <!-- 頭像，點整個圈圈就能選圖 -->
                <label class="avatar-uploader">
                    <!-- <input class="file" type="file" accept="image/*" @change="onPick" /> -->
                    <input class="file" type="file" accept="image/png,image/jpeg,image/webp" @change="onPick" />
                    <!-- ↑ 與後端白名單一致，避免使用者選到 HEIC、BMP 等非支援格式 -->
                    <img v-if="preview" :src="preview" alt="avatar" />
                    <div v-else class="placeholder">+</div>
                    <!-- <span class="edit-tag">更換頭像</span> -->
                </label>
                <!-- 打開「儲存」按鈕，送出 FormData -->
                <div class="buttons" style="margin-top:8px; text-align:center">
                    <button @click="save" :disabled="!file">儲存</button>
                </div>
                <!-- 帳號 -->
                <!-- <p class="username">{{ username }}</p> -->
    
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





<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.personal{
    font-family: $chFont;
    width: 100%;
    height: auto; 
    min-height: calc(100vh - 80px);
    overflow-y: visible;
    box-sizing: border-box;
    background-image: url(@/assets/images/member/login-bgi.png);
    background-size: cover;
}
.leftright{
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
// 圓形頭像框
.avatar-uploader{
    width: 100px; 
    height: 100px;
    border-radius: 50%;
    border: 2px solid #ccc;
    overflow: hidden;
    display: grid; 
    place-items: center;
    position: relative; 
    cursor: pointer;
    background: $bgColor-white;
    margin-left: 23px;
    // background-image: none !important;
}
.avatar-uploader img{
    width: 100%; 
    height: 100%; 
    object-fit: cover; /* 填滿圓形 */
}
.avatar-uploader .file{
    position: absolute; 
    inset: 0; 
    opacity: 0; 
    cursor: pointer; 
}
// 圖像中間+
.placeholder{ 
    font-weight: 600;
    font-size: $pcChFont-H1;
    color: $inputColor-focus;
}
// 登出
.logout-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 32px; 
    padding-left: 58px;
    padding-top: 14px;
    color: $primaryColor-500;
    &:hover {
        color: $secondaryColor-orange;
    }
}
// 顯示小姐/先生文字
.username{
    font-size: $pcChFont-H4;
    padding-top: 20px;
    padding-left: 30px;
}
// 選單
.menu{
    padding: 10px 10px;
    width: 150px;
}
// 預設/已瀏覽顏色
.menu .menu-link,
.menu .menu-link:link,
.menu .menu-link:visited {
    font-size: $pcChFont-H4;
    color: $secondaryColor-yellow;
    text-decoration: none;
    display: block;
    padding: 10px 0;
}
// 滑過 & 當前頁 
.menu .menu-link:hover,
.menu .menu-link.router-link-active,
.menu .menu-link.router-link-exact-active {
    color: $secondaryColor-orange;
    text-decoration: underline;
}

@media screen and (max-width: 433px) {
    .personal{
        height: auto;
        min-height: calc(100vh - 80px);
        padding-bottom: 40px;
        // 手機板背景色
        background: $primaryColor-900;
        background-size: cover; 
    }
    /* 版面改直向堆疊 */
    .leftright{
        display: block;
        padding-top: 24px;
        gap: 0;
    }
    /* 左側整塊置中 */
    .sidebar{
        width: 100%;
        padding-top: 0;
        text-align: center;
        margin: 0 auto;
    }
     /* 頭像置中、縮小一點 */
    .avatar-uploader{
        width: 96px;
        height: 96px;
        margin: 0 auto;
    }
    // .buttons{ 
    //     margin-top: 8px;
    // }
    .logout-btn{
        padding-right: 57px;
    }
    .username{
        padding: 8px 0 0;
        font-size: $pcChFont-p;
        text-align: center;
        padding-left: 0;
    }
    /* 選單 */
    .menu{
        width: 100%;
        max-width: 340px;        
        margin: 12px auto 0;
        padding: 0 16px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr 1fr;  /* 兩欄 */
        column-gap: 10px;
        row-gap: 10px;
    }
    /* 選單顏色 */
    .menu .menu-link,
    .menu .menu-link:link,
    .menu .menu-link:visited{
        display: block;
        text-align: center;
        padding: 10px 12px;
        border-radius: 8px;
        text-decoration: none;
        font-size: $pcChFont-p;
        color: $secondaryColor-yellow; 
    }
    /* 選單狀態 */
    .menu .menu-link.router-link-active,
    .menu .menu-link.router-link-exact-active{
        color: $secondaryColor-orange;
        text-decoration: underline;
        background: transparent;
    }




}

</style>