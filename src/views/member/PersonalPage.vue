<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { onMounted } from 'vue'
    import axios from 'axios' 
    import { useMemberStore } from '@/stores/member'
    import { ref } from 'vue'

    const memberStore = useMemberStore()

    const memberID = ref("")

    // 頭像  預覽用的 base64
    const preview = ref('')
    // 真的要上傳的檔案物件
    const file = ref(null)
    const router = useRouter() 
    const username = ref('小姐/先生') 

    // 後端根路徑（用 Vite 環境變數更彈性）
    const API_BASE = import.meta.env.VITE_AJAX_URL || '/'
    const API_BASE2 = import.meta.env.VITE_AJAX_URL_NOEND || 'http://localhost/pdo/'

    // 強制確保 base 最後有斜線
    const BACKEND_BASE = API_BASE2.endsWith('/') ? API_BASE2 : API_BASE2 + '/'

    function url(path) {
        if (/^https?:\/\//i.test(path)) return path
        // 關鍵：把領先斜線拿掉，才會接在 /PDO/ 後面，而不是覆蓋成 /pdo/ 根目錄
        const clean = path.startsWith('/') ? path.slice(1) : path
        return new URL(clean, BACKEND_BASE).href
    }

    // 專給 <img> 用的 URL 轉換：
    // - 若已是 http(s) 絕對網址：原樣回傳
    // - 若以 / 開頭：接在 BACKEND_ORIGIN 後面（避免變成 5173 的相對路徑）
    // - 其他相對路徑：以 API_BASE 為基底補齊

    // 組完整圖片 URL：直接用 VITE_AJAX_URL  資料庫存的相對路徑
    function imgUrl(path) {
        if (!path) return ''
        if (/^https?:\/\//i.test(path)) return path // 已是完整網址
        return import.meta.env.VITE_AJAX_URL + path
    }

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

    // 實際上傳到後端（FormData + 支援 Session）
    async function save() {
        if (!file.value) return alert('請先選擇圖片')
        const fd = new FormData()
        // fd.append("memberID", memberID.value)
        fd.append('avatar', file.value)  // 後端用 $_FILES['avatar'] 接

        try {
            const { data } = await axios.post(
                import.meta.env.VITE_AJAX_URL + 'Member/update_profile_img.php',
                fd,
                { withCredentials: true }
            )

            if (!data?.success || !data?.data) {
                throw new Error(data?.message || '上傳失敗')
            }

            // 後端回傳的 avatarUrl = 照片路徑 (例如 "/pdo/Member/uploadImages/xxx.jpg")
            const avatarUrl = data.data.avatarUrl
            const v = data.data.cacheBustParam ?? Date.now()

            // 這裡就直接用 avatarUrl，不要再補 VITE_AJAX_URL
            preview.value = imgUrl(avatarUrl) + '?v=' + v

            file.value = null
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

        try {
            const { data } = await axios.get(
                import.meta.env.VITE_AJAX_URL + 'Member/profile.php',
                { withCredentials: true }
            )

            // 假設後端回：{ success:true, user:{ name:'..', image:'/pdo/Member/uploadImages/xxx.jpg' } }
            if (data?.success) {
                if (data.user?.name)  username.value = data.user.name
            }

            if (data.user?.image) {
                // 照片：用後端原始路徑，不再經過 url() 或再拼 VITE_AJAX_URL
                preview.value = imgUrl(data.user.image) + '?v=' + Date.now()
            } else {
               preview.value = '' 
            }
            console.log(preview.value);
        } catch (e) {}
        
    }

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
                    <input class="file" type="file" accept="image/png,image/jpeg,image/webp" @change="onPick" />
                    <!-- ↑ 與後端白名單一致，避免使用者選到 HEIC、BMP 等非支援格式 -->
                    <img v-if="preview" :src="preview" alt="avatar" />
                    <div v-else class="placeholder">+</div>
                </label>
                <!-- 只有選到檔案才顯示，並加進場動畫 -->
                <transition name="float">
                    <div v-if="!!file" class="buttons" style="margin-top:8px; text-align:center">
                        <button @click="save">儲存</button>
                    </div>
                </transition>
                <!-- 帳號 -->
                <!-- <p class="username">{{ username }}</p> -->
    
                <!-- 選單 -->
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
    max-width: 1200px;
    justify-content: flex-start;
    align-items: flex-start;
    display: flex;
    gap: 50px;
    margin: 0 auto;
    padding-top: 50px;
}
.sidebar{
    margin-left: 100px;
    padding-top: 25px;
    color: $secondaryColor-yellow;
}
.content {
    flex-grow: 1;
    padding-top: 0;
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
.float-enter-active, .float-leave-active {
    transition: all .25s ease;
}
.float-enter-from, .float-leave-to {
    opacity: 0; 
    transform: translateY(6px) scale(0.98); 
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

// ------------------斷點---------------------------------
@media screen and (max-width: 1201px) {

    .personal {
        overflow-x: hidden;                /* 保險：避免殘留水平卷軸 */
    }
    /* 由 flex 改 grid，左側固定寬、右側彈性 */
    .leftright{
        max-width: 100%;
        display: grid;
        grid-template-columns: 240px 1fr;  /* 左：側欄固定寬；右：內容自適應 */
        gap: 15px;                         /* 間距縮小一點 */
        padding: 40px 16px 60px;           /* 兩側加內距，避免貼邊 */
        box-sizing: border-box;
    }
    .sidebar{
        margin-left: 50px;                    /* 移除 100px，避免在窄桌機撐寬 */
        padding-top: 12px;
    }
    .avatar-uploader{
        width: 90px;                       /* 視覺微縮 */
        height: 90px;
        margin-left: 0;                    /* 跟著側欄置齊 */
    }
    .content{
        padding-top: 0;
        min-width: 0;                      /* 關鍵：允許內容在 grid 內縮，不撐出橫捲 */
    }
    .menu{ 
        padding: 8px 0; 
    }
    .menu .menu-link{
        font-size: 18px;
        padding: 8px 0;
    }
}

@media screen and (max-width: 901px) {
    /* <=901px：兩欄佈局、縮小間距、移除側邊距，避免撐寬 */
    .personal {
        overflow-x: hidden; /* 保險 */
    }
    .leftright{
        display: grid;                     /* 由 flex 換成 grid 比較好控欄寬 */
        grid-template-columns: 200px 1fr;  /* 左：側欄固定寬，右：內容彈性 */
        gap: 10px;
        padding: 24px 12px 48px;
    }
    .sidebar{
        margin-left: 50px;      
        padding-top: 8px;
    }
    .avatar-uploader{
        width: 80px;
        height: 80px;
        margin-left: 5px;       /* 讓頭像貼齊側欄 */
    }
    .menu{ 
        padding: 8px 0; 
    }
    .menu .menu-link{ 
        font-size: 16px; 
        padding: 8px 0; 
    }
    .content{
        // padding-top: 0;
        min-width: 0;         /* 防止內容在 grid/flex 中把容器撐出水平捲軸 */
    }
}

@media screen and (max-width: 651px) {

    .personal { 
        overflow-x: hidden; 
        height: auto;
        min-height: calc(100vh - 80px);
        padding-bottom: 40px;
        // 背景色
        background: $primaryColor-900;
        background-size: cover; 
    }
    /* 頭像 */
    .avatar-uploader {
        width: 80px;
        height: 80px;
        margin: 0 auto;
    }
    /* 容器改直向排列 */
    .leftright{
        display: flex;
        flex-direction: column;   /* 由左右 → 上下 */
        gap: 12px;
        padding: 12px;
        box-sizing: border-box;
    }
    /* 選單區在上方 */
    .sidebar{
        order: 1;
        margin-left: 0;           /* 取消原本的 100px 左外距 */
        padding-top: 8px;
        width: 100%;
    }
    /* 內容（表格）在下方 */
    .content{
        order: 2;
        width: 100%;
        min-width: 0;             /* 重要：避免內容把版面撐出橫捲 */
    }
    /* 表格外層（你的各種 table wrapper）全寬且只在自身橫捲 */
    .order-table-wrapper,
    .event-table-wrapper{
        width: 100% !important;
        max-width: 100%;
        padding: 0;
        overflow-x: hidden;       /* 頁面不橫捲 */
    }
    .order-table-box,
    .event-table-box{
        overflow-x: auto;         /* 需要時由表格區塊自己橫捲 */
        -webkit-overflow-scrolling: touch;
    }
    /* 選單兩排：上 3 個、下 2 個 */
    .menu{
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding: 8px 100px;
        justify-content: center;
    }
    .menu li{ 
        flex: 0 0 30%;    /* 第 1～3 個 */
    }   
    .menu li:nth-child(n+4){ 
        flex-basis: 25%;         /* 第 4、5 個 */
    }  
    .menu .menu-link{
        display: block;
        text-align: center;
        padding: 10px 0;
    }
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
    .logout-btn{
        padding-right: 57px;
    }
    // .username{
    //     padding: 8px 0 0;
    //     font-size: $pcChFont-p;
    //     text-align: center;
    //     padding-left: 0;
    // }
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