<!----我的評論---->
<template> 
    
    <!-----右邊評論-------->
    <div class="comment-area">

        <div class="comment-1" v-for="r in reviews" :key="r.id">
            <h3>{{ r.title }}</h3>

            <span class="review-score">
                <!-- 星等幾顆就跑幾張圖 -->
                <img v-for="n in r.stars" :key="n" src="@/assets/icons/icon-filledStar.svg" alt="星星"/>
            </span>

            <p class="review-text">
                {{ r.text }}
            </p>

            <!-- 圖片來源改成用資料帶入） -->
            <img class="review-photo" :src="r.photo" alt="照片">

            <!-- 刪除：改成傳 id，內部用 splice 刪陣列 -->
            <button class="delete" @click="deleteReview(r.id)">刪除</button>
        </div>
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

// 右邊評論
.comment-area{
    margin-top: -20px;
    padding-left: 10px;
    padding-top: 10px;
    color: $FontColor-black;
    background-color: white;
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
</style>

<script setup>
    
    import { ref } from 'vue'

    const reviews = ref([
        {
            id: 1,
            title: '陽明山',
            stars: 5,
            text: '新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。',
            photo: new URL('../../../assets/images/aboutstar/star space.png', import.meta.url).href
        },
        {
            id: 2,
            title: '陽明山',
            stars: 5,
            text: '新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。',
            photo: new URL('../../../assets/images/aboutstar/Milky Way.png', import.meta.url).href
        }
    ])
    
    function deleteReview(id) {
        if (!window.confirm('確定要刪除這則評論嗎？')) return
        const idx = reviews.value.findIndex(r => r.id === id)
        if (idx !== -1) reviews.value.splice(idx, 1)
    }

    // 刪除鍵
    function onDelete(e) {
        if (window.confirm('確定要刪除這則評論嗎？')) {
            // 找到最近的 .comment-1 容器並移除
            const card = e.currentTarget.closest('.comment-1')
            if (card) card.remove()
        }
    }
</script>