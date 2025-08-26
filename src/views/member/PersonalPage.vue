<script setup>
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'
    import { UserFilled } from '@element-plus/icons-vue'

    const props = defineProps({
        username: { type: String, default: '小姐/先生' },
    })

    // 頭像
    import { ref } from 'vue'
    // 預覽用的 base64
    const preview = ref('')
    // 真的要上傳的檔案物件
    const file = ref(null)

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
    // 送到後端（示範：改成你的 API 即可）
    async function save() {
        if (!file.value) return alert('請先選擇圖片')
        // const fd = new FormData()
        // fd.append('avatar', file.value)
        // await axios.post('/api/me/avatar', fd)

        alert(`（示範）已準備上傳：${file.value.name}`)
        // 上傳成功後可清空或保留預覽
        // file.value = null
        // preview.value = ''
    }
</script>

<template>  
    <!-- <Personal/> -->
    <div class="personal">
        <div class="leftright">
            <!-----左邊頭像+選單-------->
            <aside class="sidebar">
                <!-- 頭像，點整個圈圈就能選圖 -->
                <label class="avatar-uploader">
                    <input class="file" type="file" accept="image/*" @change="onPick" />
                    <img v-if="preview" :src="preview" alt="avatar" />
                    <div v-else class="placeholder">+</div>
                    <!-- <span class="edit-tag">更換頭像</span> -->
                </label>

                <div class="buttons">
                    <button @click="save" :disabled="!file">儲存</button>
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
    cursor: pointer; /* 整圈可點 */
}
// 圖像中間+
.placeholder{ 
    font-weight: 700px;
    font-size: $pcChFont-H1;
    color: $inputColor-focus;
}
// 儲存
.buttons{ 
    // background-color: none;
    margin-top: 10px; 
    text-align: center; 
    // background-color: $primaryColor-500;
    // width: 45px;
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
// 預設/已瀏覽顏色（把原色覆蓋掉
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
        background-position: center;
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
    .buttons{ 
        margin-top: 8px;
    }
    .username{
        padding: 8px 0 0;
        font-size: $pcChFont-small;
        text-align: center;
        padding-left: 0;
    }
    /* 選單改成兩欄方塊，置中排版 */
    .menu{
        width: 100%;
        max-width: 260px;        
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
        font-size: $pcChFont-small;
        color:  $secondaryColor-yellow; 
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