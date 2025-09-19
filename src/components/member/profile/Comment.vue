<!----我的評論---->
<script setup>
    import Pagination from '@/components/common/Pagination.vue'
    import { ref, computed, watch, onMounted } from 'vue'
    import axios from 'axios'
    import { useMemberStore } from '@/stores/member'

    import shopToast from '@/components/common/shopToast.vue'  
    import { showToast } from '@/composables/useToast'    

    // 引用useMemberStore
    const memberStore = useMemberStore()

    //定義響應式資料
    const reviews = ref([ ])

    const memberId = ref('')
    //照片存放資料夾路徑
    const API_URL = import.meta.env.VITE_AJAX_URL
    
    // 刪除鍵
    function deleteReview(id, deleteReviewId) {
        if (!window.confirm('確定要刪除這則評論嗎？')) return
        const idx = reviews.value.findIndex(r => r.id === id)
        if (idx !== -1) reviews.value.splice(idx, 1)
        const total = reviews.value.length   // 刪除後若當頁沒有資料，往前翻一頁（避免空白頁）
        const maxPage = Math.max(1, Math.ceil(total / pageSize.value))
        if (currentPage.value > maxPage) currentPage.value = maxPage
        // console.log(deleteReviewId);
        updateMemberReview(deleteReviewId)
    }

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


    function fullScreen (target){
        // console.log(target);
        target.requestFullscreen()
        
    }

    // -------------與後端串接----------------
    const getMemberReviews = async (memberId) => {        
        try{
            const resp = await axios.post(
                import.meta.env.VITE_AJAX_URL + "Member/getMemberReviews.php",
                {
                    memberId : memberId
                }
            )   
            console.log(resp.data);
                   
            reviews.value = resp.data
        }catch(error){
            console.log("後端請求失敗");
        }
    }

    const updateMemberReview = async (reviewId)=>{
        try{
            const resp = await axios.get(
                import.meta.env.VITE_AJAX_URL + "Member/updateMemberReview.php",
                {   
                    params: { reviewId }
                }
            )   
            // console.log(resp.data);
            // 不要用alert 用土司
            showToast(resp.data.message)
            // alert(resp.data.message)
                   
        }catch(error){
            console.log("後端請求失敗");
        }
    }

    onMounted(()=>{
        // console.log(memberStore.user.ID);
        memberId.value = memberStore.user.ID
        getMemberReviews(memberId.value)
    })
</script>


<template> 
     <shopToast/>
    <!-----右邊評論-------->
    <div class="comment-area">
        <!--  三種狀態：載入中 / 錯誤 / 無資料 -->
        <div v-if="loading" class="loading">載入中...</div>
        <div v-else-if="errorMsg" class="error">{{ errorMsg }}</div>
        <div v-else-if="filteredTotal === 0" class="empty">目前沒有評論</div>
        
        <div class="comment-box">
            
            <div class="comment-1" v-for="r in showReviews" :key="r.id">
                <h5>{{ r.created_at }}</h5>
                <h3>{{ r.location_name }}</h3>
    
                <span class="review-score">
                    <img v-for="n in parseInt(r.score)" :key="n" src="@/assets/icons/icon-filledStar.svg" alt="星星"/>
                </span>
    
                <p class="review-text">
                    {{ r.content }}
                </p>
    
                <!-- 圖片來源改成用資料帶入 -->
                <img v-if="r.image" class="review-photo" :src="API_URL + r.image" alt="照片" @click="fullScreen($event.target)">
    
                <!-- 刪除：改成傳 id，內部用 splice 刪陣列   第二個參數r.ID是準備告訴資料庫哪個資料要變動-->
                <button class="delete" @click="deleteReview(r.id , r.ID)">刪除</button>
                <div class="decorateLine"></div>
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
    padding-top: 10px;
    padding-right: 5px;
    color: $FontColor-black;
    background-color: white;
    // width: 850px;
}
.comment-box{
    margin: 0 auto;
}
.comment-box h5{
    margin-bottom: 8px;
}
.comment-area h3{
    font-size: $pcChFont-p;
}
.comment-1{
    padding: 24px;
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
.decorateLine{
    width: 100%;
    height: 2px;
    background-color: $primaryColor-100;
}

//------------------段點----------------------
@media screen and (max-width: 1200px) {
    /* 讓右側內容在 flex 版面不撐寬 */
    .content{ 
        min-width: 0;                 /* 避免子元素把父層撐出橫捲 */
        margin-right: 10px;
    }
    /* 評論容器：流體寬 + 左右留白（不要用 margin 以免溢出） */
    .comment-area{
        width: 100%;
        max-width: 100%;
        padding: 12px 16px;       /* ← 左右各 16px 留白 */
        box-sizing: border-box;   /* padding 計入寬度，避免橫捲 */
        overflow-x: hidden;       /* 保險 */
        background: #fff;
    }
    /* 每則評論內距微調 */
    .comment-1{ 
        padding: 16px 12px; 
    }
    /* 長字/URL 不撐寬 */
    .review-text{
        font-size: 15px;
        overflow-wrap: anywhere;
        word-break: break-word;
    }
    /* 圖片不超出容器 */
    .comment-area img,
    .review-photo{
        max-width: 30%;
        height: auto;
        display: block;
    }
    /* 星星稍微縮一點 */
    .review-score img{ 
        width: 18px; 
    }
    /* 刪除鍵靠右，不再加額外右邊距（讓它吃容器的 padding） */
    .delete{
        margin-left: auto;
        padding-right: 0;
        text-align: right;
    }
    /* 分頁滿版置中，可換行 */
    .pager{
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 10px;
        box-sizing: border-box;
    }
    .pager :deep(.el-pagination){
        flex-wrap: wrap;
        row-gap: 6px;
    }
}

@media screen and (max-width: 901px) {
    /* 右側欄在 flex 版面不被撐寬 */
    .content{ 
        min-width: 0;
    }
    /* 評論容器 */
    .comment-area{
        width: 100%;
        max-width: 100%;
        padding: 12px 14px;        /* 比 1201px 再窄一點 */
        box-sizing: border-box;
        overflow-x: hidden;
        background: #fff;
        border-radius: 8px;        /* 可留可不留 */
    }
    /* 每則評論：縮些內距與字級 */
    .comment-1{
        padding: 14px 10px;
    }
    .comment-box h5{
        margin-bottom: 6px;
        font-size: 14px;
    }
    .comment-area h3{
        font-size: 15px;
    }
    /* 星星與文字微縮；長字不撐寬 */
    .review-score{ 
        gap: 3px; 
    }
    .review-score img{ 
        width: 16px; 
    }
    .review-text{
        font-size: 14px;
        overflow-wrap: anywhere;
        word-break: break-word;
    }
    /* 圖片不超出容器；高度限制更緊 */
    .comment-area img,
    .review-photo{
        max-width: 35%;
        height: auto;
        display: block;
        max-height: 260px;         /* 依需要可再調 */
        object-fit: cover;
    }
    /* 刪除鍵靠右，吃外層 padding 的邊界 */
    .delete{
        margin-left: auto;
        padding-right: 0;
        font-size: 14px;
        text-align: right;
    }
    /* 分隔線細一點 */
    .decorateLine{
        height: 1px;
    }
    /* 分頁：全寬置中，縮尺寸可換行 */
    .pager{
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 8px;
        box-sizing: border-box;
    }
    .pager :deep(.el-pagination){
        flex-wrap: wrap;
        row-gap: 4px;
        font-size: 12px;
    }
    .pager :deep(.el-pagination .el-pager li),
    .pager :deep(.el-pagination .btn-prev),
    .pager :deep(.el-pagination .btn-next){
        min-width: 26px;
        height: 40px;
        line-height: 26px;
    }
}

@media screen and (max-width: 651px) {
    /* 右側內容在小尺寸不被子元素撐寬 */
    .content{ 
        min-width: 0;
    }
    /* 評論容器：流體寬 + 小一點的左右留白 */
    .comment-area{
        width: 90%;
        max-width: 90%;
        margin: 0 auto;
        padding: 10px 12px;       /* 左右留白 */
        box-sizing: border-box;
        overflow-x: hidden;       /* 保險 */
        background: #fff;
        border-radius: 8px;
    }
    /* 每則評論內距縮小 */
    .comment-1{
        padding: 12px 8px;
    }
    /* 標題/時間字級 */
    .comment-box h5{
        margin-bottom: 4px;
        font-size: 12px;
    }
    .comment-area h3{
        font-size: 14px;
    }
    /* 內容文字：易讀且不撐寬 */
    .review-text{
        font-size: 14px;
        line-height: 1.6;
        overflow-wrap: anywhere;
        word-break: break-word;
    }
    /* 星星更小一點 */
    .review-score{ 
        gap: 2px; 
    }
    .review-score img{ 
        width: 14px; 
    }
    /* 圖片不超出容器、限高 */
    .comment-area img,
    .review-photo{
        max-width: 33%;
        height: auto;
        display: block;
        max-height: 200px;
        object-fit: cover;
        border-radius: 4px;
    }
    /* 刪除鍵靠右，吃容器 padding 的邊界 */
    .delete{
        margin-left: auto;
        padding-right: 0;
        text-align: right;
        font-size: 14px;
    }
    /* 分隔線細一點 */
    .decorateLine{ 
        height: 1px; 
    }
    /* 分頁：更小、可換行 */
    .pager{
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 8px;
        box-sizing: border-box;
    }
    .pager :deep(.el-pagination){
        flex-wrap: wrap;
        row-gap: 4px;
        font-size: 12px;
    }
    .pager :deep(.el-pagination .el-pager li),
    .pager :deep(.el-pagination .btn-prev),
    .pager :deep(.el-pagination .btn-next){
        min-width: 24px;
        height: 33px;
        line-height: 24px;
    }
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

