<!----我的評論---->
<script setup>
    import Pagination from '@/components/common/Pagination.vue'
    import { ref, computed, watch, onMounted } from 'vue'
    import axios from 'axios' 

    // const reviews = ref([
    //     {
    //         id: 1,
    //         title: '陽明山',
    //         stars: 5,
    //         text: '新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。',
    //         photo: new URL('../../../assets/images/aboutstar/star space.png', import.meta.url).href
    //     },
    //     {
    //         id: 2,
    //         title: '陽明山',
    //         stars: 5,
    //         text: '新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。',
    //         photo: new URL('../../../assets/images/aboutstar/Milky Way.png', import.meta.url).href
    //     },
    //     {
    //         id: 3,
    //         title: '陽明山',
    //         stars: 5,
    //         text: '新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。',
    //         photo: new URL('../../../assets/images/aboutstar/Milky Way.png', import.meta.url).href
    //     },
    //     {
    //         id: 4,
    //         title: '陽明山',
    //         stars: 5,
    //         text: '新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。',
    //         photo: new URL('../../../assets/images/aboutstar/Milky Way.png', import.meta.url).href
    //     },
    //     {
    //         id: 5,
    //         title: '陽明山',
    //         stars: 5,
    //         text: '新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。',
    //         photo: new URL('../../../assets/images/aboutstar/Milky Way.png', import.meta.url).href
    //     }
    // ])
    const reviews = ref([])                     // 從後端撈資料後再塞進來
    const loading = ref(false)                  // 載入中狀態
    const errorMsg = ref('')                    // 錯誤訊息
    
    // === API 根路徑 & 工具（對應 VITE_AJAX_URL 與 Member/reviews.php） ===
    const API_BASE = import.meta.env.VITE_AJAX_URL || '/'  // 後端根路徑
    function url(path) {
        let base = API_BASE
        if (!base.endsWith('/')) base += '/'
        if (path.startsWith('/')) path = path.slice(1)
        return base + path
    };

    // === 登入資訊（依你們實作調整） ===
    const token = localStorage.getItem('token') || ''                  // Bearer token（若有）
    const memberID = Number(localStorage.getItem('memberID') || 0)     // 會員識別（也可靠 Session）

    // === 後端欄位 → 前端 UI 欄位轉換 ===
    function toPhotoSrc(image) {         // 圖片路徑補齊
        if (!image) return ''
        if (/^https?:\/\//i.test(image)) return image    // 若已是完整 URL
        return url(image)                                // 相對路徑補上 API_BASE
    }
    function mapReview(row) {                      // DB 欄位對齊到本頁所需欄位
        return {
            id: row.ID,                                    // DB: ID
            title: row.location_name ?? `地點 #${row.location_id ?? ''}`, // 若未 JOIN 地點名就 fallback
            stars: Number(row.score ?? 0),                 // DB: score
            text: row.content ?? '',                       // DB: content
            photo: toPhotoSrc(row.image ?? ''),            // DB: image
            created_at: row.created_at ?? ''               // DB: created_at（可供排序/顯示）
        }
    }

    // === 讀取我的評論（對應 Member/reviews.php 的 GET） ===
    async function fetchMyReviews() {
        loading.value = true
        errorMsg.value = ''
        try {
            const resp = await axios.get(url('Member/comment.php'), {
                params: { member_id: memberID },                           //   以會員查
                headers: token ? { Authorization: `Bearer ${token}` } : {},//   有 token 就帶
                withCredentials: true                                      //   若用 Session
            })
            if (!resp.data?.success) throw new Error(resp.data?.message || '讀取失敗')
            const rows = Array.isArray(resp.data.data) ? resp.data.data : []
            reviews.value = rows.map(mapReview)                          // 轉換欄位
        } catch (err) {
            errorMsg.value = err?.message || '讀取時發生錯誤'
        } finally {
            loading.value = false
        }
    }
    onMounted(fetchMyReviews)    

    // function deleteReview(id) {
    //     if (!window.confirm('確定要刪除這則評論嗎？')) return
    //     const idx = reviews.value.findIndex(r => r.id === id)
    //     if (idx !== -1) reviews.value.splice(idx, 1)
    //     const total = reviews.value.length   // 刪除後若當頁沒有資料，往前翻一頁（避免空白頁）
    //     const maxPage = Math.max(1, Math.ceil(total / pageSize.value))
    //     if (currentPage.value > maxPage) currentPage.value = maxPage
    // }

    // 串後端刪除
    async function deleteReview(id) {          
        if (!window.confirm('確定要刪除這則評論嗎？')) return
        try {
            await axios.delete(url('Member/comment.php'), {
                params: { id },
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                withCredentials: true
            })           
            // 成功後同步刪本地資料 & 修正分頁   
            const idx = reviews.value.findIndex(r => r.id === id)
            if (idx !== -1) reviews.value.splice(idx, 1)
            const total = reviews.value.length
            const maxPage = Math.max(1, Math.ceil(total / pageSize.value))
            if (currentPage.value > maxPage) currentPage.value = maxPage
        } catch (err) {
            alert(err?.message || '刪除失敗')
        }
    }
    // 刪除鍵
    // function onDelete(e) {
    //     if (window.confirm('確定要刪除這則評論嗎？')) {
    //         // 找到最近的 .comment-1 容器並移除
    //         const card = e.currentTarget.closest('.comment-1')
    //         if (card) card.remove()
    //     }
    // }

    // 分頁
    const currentPage = ref(1)                                   // 目前頁
    const pageSize = ref(2)  
    const filteredTotal = computed(() => reviews.value.length)    //  給 Pagination 的總數
    const showReviews = computed(() => {                         // 依頁碼切資料
        const start = (currentPage.value - 1) * pageSize.value
        return reviews.value.slice(start, start + pageSize.value)
    })
    function pagechange (newpage) {                              // 接子元件 emit
        currentPage.value = newpage
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // 當資料數改變，避免頁碼超過最大頁（刪到空頁時自動回上一頁）
    watch(reviews, () => {
        const maxPage = Math.max(1, Math.ceil(reviews.value.length / pageSize.value))
        if (currentPage.value > maxPage) currentPage.value = maxPage
    })

</script>


<template> 
    
    <!-----右邊評論-------->
    <div class="comment-area">
        <!--  三種狀態：載入中 / 錯誤 / 無資料 -->
        <div v-if="loading" class="loading">載入中...</div>
        <div v-else-if="errorMsg" class="error">{{ errorMsg }}</div>
        <div v-else-if="filteredTotal === 0" class="empty">目前沒有評論</div>
        
        <div class="comment-box">
            
            <div class="comment-1" v-for="r in showReviews" :key="r.id">
                <h3>{{ r.title }}</h3>
    
                <span class="review-score">
                    <img v-for="n in r.stars" :key="n" src="@/assets/icons/icon-filledStar.svg" alt="星星"/>
                </span>
    
                <p class="review-text">
                    {{ r.text }}
                </p>
    
                <!-- 圖片來源改成用資料帶入 -->
                <!-- <img class="review-photo" :src="r.photo" alt="照片"> -->
                <!-- 圖片來源改成用資料帶入（可能為空） -->
                <img v-if="r.photo" class="review-photo" :src="r.photo" alt="照片">
    
                <!-- 刪除：會打後端，成功後再 splice 陣列 -->
                <button class="delete" @click="deleteReview(r.id)">刪除</button>
            </div>

        </div>
    </div>

    <!----分頁-------->
    <div class="pager">
        <Pagination
        :modelValue="currentPage"
        @update:modelValue="pagechange"
        :page-size="pageSize"
        :total="filteredTotal"
        />
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

// 右邊評論
.loading, .empty, .error {
    padding: 12px 8px;
    font-size: $pcChFont-p;
}
.error { 
    color: #c0392b; 
}
.comment-area{
    margin-top: -20px;
    padding-left: 5px;
    padding-top: 10px;
    padding-right: 5px;
    color: $FontColor-black;
    background-color: white;
    width: 850px;
    height: 540px;
}
.comment-box{
    // border: 1px solid black;
    margin: 0 auto;
}
.comment-area h3{
    font-size: $pcChFont-p;
}
.review-score{
    padding-top: 10px;
    display: flex;
    gap: 4px;
}
.review-score img{
    width: 20px;
}
.review-text{
    padding-top: 10px;
    font-size: $pcChFont-p;
}
.review-photo{
    padding-top: 10px;
    width: 150px;
    height: 150px;
}
// 刪除建
.delete{
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: $pcChFont-p; 
    padding-right: 10px;
    display: block;            
    text-align: right;         /* 父層非 flex 也能靠右 */
    margin-left: auto;         /* 若父層是 flex 可改 align-self: flex-end */
}
.delete:hover{
    color: $inputColor-focus;
    text-decoration: underline;
}

@media screen and (max-width: 433px) {
    .comment-area{
        width: 100%;
        max-width: 398px;
        height: auto;
        padding: 12px 16px;
        box-sizing: border-box;      
        margin: 20px auto;
    }
    .comment-box{
        display: grid;
        grid-template-columns: 1fr; 
        row-gap: 16px;
    }
    .comment-1{
        border-radius: 8px;
        padding: 12px;
    }
    .comment-area h3{
        font-size: 16px;
        line-height: $linHeight-p;
    }
    .review-score{
        padding-top: 6px;
        gap: 3px;
    }
    .review-score img{
        width: 16px;
        height: 16px;
    }
    .review-text{
        padding-top: 8px;
        font-size: $pcChFont-small;
        line-height: $linHeight-p;
    }
    /* 圖片 */
    .review-photo{
        display: block;
        width: 100%;
        max-width: 150px;
        height: auto;
        aspect-ratio: 1/1;
        object-fit: cover;
        margin-top: 8px;
    }
    /* 刪除鍵 */
    .delete{
        margin-top: 6px;
        padding: 8px 0;
        font-size: $pcChFont-small;
        text-align: right;
        color: red;
    }
    /* 分頁 */
    .pager{
        width: 100%;
        padding: 10px 0 16px;
        display: flex;
        justify-content: center;
    }









}









</style>

