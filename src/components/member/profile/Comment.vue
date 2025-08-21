<!----我的評論---->
<template> 
    
    <!-----右邊評論-------->
    <div class="comment-area">

        <div class="comment-1">
            <h3>陽明山</h3>
            <span class="review-score">  
                <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
                <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
                <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
                <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
                <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
            </span>
            <p class="review-text">
                新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。
            </p>
            <img class="review-photo" src="@/assets/images/aboutstar/star space.png" alt="照片">
            <button class="delete" @click="onDelete($event)">刪除</button>
        </div>

        <div class="comment-1">
            <h3>陽明山</h3>
            <span class="review-score">  
                <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
                <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
                <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
                <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
                <img src="@/assets/icons/icon-filledStar.svg" alt="星星">
                </span>
            <p class="review-text">
                新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。
            </p>
            <img class="review-photo" src="@/assets/images/aboutstar/star space.png" alt="照片">
            <button class="delete" @click="onDelete($event)">刪除</button>
        </div>

        <!-- <div class="pager">
            <el-pagination background layout="prev, pager, next" :total="24" />
        </div> -->
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

// 右邊評論
.comment-area{
    margin-top: -20px;
    // margin-left: 180px;
    padding-left: 10px;
    padding-top: 10px;
    // height: 550px;
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
    // width: 800px;
    // display: flex;
    // justify-content: flex-end;
    text-decoration: underline;
    padding-right: 10px;
    display: block;            /* 讓它是區塊元素 */
    text-align: right;         /* 父層非 flex 也能靠右 */
    margin-left: auto;         /* 若父層是 flex 可改 align-self: flex-end */
}
.delete:hover{
    color: $inputColor-focus;
}
// 分頁
// .pager{
    // border: 1px solid red;
    // width: 700px;
    // height: 50px;
    // display: flex;
    // margin-top: 20px;
    // justify-content: flex-end;  /* 靠最右邊 */
    // padding-right: 4px; 
// }
</style>

<script setup>
    // 組件
    // import Pagination from '@/components/common/Pagination.vue';
    // 方法
    import { ref, computed, onMounted } from 'vue'

    // 定義 props（照你原本：photo 路徑暫時不動）
    const props = defineProps({
    // data:     { type: Array,  default: () => [] },
    // columns:  { type: Array,  default: () => [] },
    })
    const emit = defineEmits(['select'])
    const activeKey = ref('')
    onMounted(() => { activeKey.value = 'profile'; emit('select', 'profile') })
    function selectItem(key){ activeKey.value = key; emit('select', key) }

    const handleEdit = (index, row) => {
        console.log(index, row)
    }

    // 之後想開分頁再把 showATable 改成用 slice
    const slice = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return dataSource.value.slice(start, start + pageSize.value)
    })



    // ------------------------ Pagination 的變數 ------------------------
    // const currentPage = ref(1) // 預設第一頁
    // const pageSize= ref(2) // 每頁顯示幾筆


    // 刪除鍵
    function onDelete(e) {
        if (window.confirm('確定要刪除這則評論嗎？')) {
            // 找到最近的 .comment-1 容器並移除
            const card = e.currentTarget.closest('.comment-1')
            if (card) card.remove()
        }
    }



</script>