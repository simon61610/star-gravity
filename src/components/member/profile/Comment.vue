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
                    <img v-for="n in r.score" :key="n" src="@/assets/icons/icon-filledStar.svg" alt="星星"/>
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
    margin-top: -20px;
    padding-left: 5px;
    padding-top: 10px;
    padding-right: 5px;
    color: $FontColor-black;
    background-color: white;
    width: 850px;
    // height: 540px; 
}
.comment-box{
    // border: 1px solid black;
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
    // width: 150px;
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

