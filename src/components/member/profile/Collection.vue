<!----我的收藏---->
<script setup>
    import { ref, computed, onMounted } from 'vue'
    import Pagination from '@/components/common/Pagination.vue'
    import shopToast from '@/components/common/shopToast.vue'  
    import { showToast } from '@/composables/useToast'         

    // 先放 8 張假資料；之後接 API 只要改這個陣列即可
    const products = ref(
        Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            title: '基礎望遠鏡',
            price: 2500,
        }))
    )

    const formatTWD = (n) => `NT$${Number(n).toLocaleString('zh-TW')}`

    // 分頁
    const collectionPage = ref(1)    // 目前頁     
    const pageSize = ref(8)          // 每頁幾筆
    const filteredTotal = computed(() => products.value.length)  // 總筆數給 Pagination

    const showProducts = computed(() => {                       // 依頁碼切資料
        const start = (collectionPage.value - 1) * pageSize.value
        return products.value.slice(start, start + pageSize.value)
    })
    function pagechange (newpage) {                             // 接子元件 emit
        collectionPage.value = newpage
        window.scrollTo({ top: 0, behavior: 'smooth' })         // 切頁回頂（可保留/移除）
    }
    // 取消收藏
    const emit = defineEmits(['unfavorite'])   // 告訴父層「真的要取消了」

    // function askUnfavorite () {
    //     if (confirm('確定要取消收藏嗎？')) emit('unfavorite')
    // }
    function askUnfavorite () {                                   
        if (confirm('確定要取消收藏嗎？')) {
        emit('unfavorite')
        showToast('已取消收藏', { type: 'info', duration: 1800 })
        }
    }

    function onBuyNow () {
        // 這裡可放實際購物流程，成功後提示：
        showToast('已加入購物車！', { type: 'success', duration: 2000 })
    }

    // 斷點430使用
    onMounted(() => {
        if (window.matchMedia('(max-width: 433px)').matches) pageSize.value = 4
    })

</script>

<template>
            
    <!----右邊-------->
    <div class="products">

        <shopToast/>

        <div class="flex">
            <article v-for="p in showProducts" :key="p.id" class="card">
                
                <div class="photoall">
                    <div class="thumb">
                        <img src="../../../assets/images/shop/shop-banner.jpg" alt="望遠鏡">
                    </div>
        
                    <div class="down">
                        <div class="titleprice">
                        <h3 class="title">{{ p.title }}</h3>
                        <p class="price">{{ formatTWD(p.price) }}</p>
                        </div>
            
                        <div class="actions">
                            <button class="btn cancel" @click="askUnfavorite">取消收藏</button>
                            <button class="btn primary" @click="onBuyNow">直接購買</button>
                        </div>
                    </div>
                </div>
            </article>
            
            
        </div>
        <!-- 自製小彈窗已改為 toast 呈現 -->
            
        <!----分頁-------->
        <div class="pager">
            <Pagination
            :modelValue="collectionPage"
            @update:modelValue="pagechange"
            :page-size="pageSize"
            :total="filteredTotal"
            />
        </div>
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';


// 右邊開始
.products{
    padding: 12px;
    width: 700px;
    // height: 500px;
    height: auto;            /* 內容多就自然撐開 */
    min-height: 500px;       /* 保留原本大致視覺高度 */
    overflow-y: visible;     /* 明確指定不要在這層裁切/滾動 */
    box-sizing: border-box;  /* 尺寸更可控 */
}
.flex {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));     /* 固定4欄 */
    column-gap: 16px;   /* 左右間距 */
    row-gap: 32px;     /* 上下間距 */
}
.card{
    // width: 120px;
    // height: 120px;
    // margin: 0;

    /* width: 120px; */        /* 交給 grid 分欄，不需固定卡片寬 */
    /* height: 120px; */       /* ← 移除固定高度 */
    width: 100%;
    height: auto;
    margin: 0;
    /* （可選）讓卡片內的東西垂直堆疊時不會被切掉 */
    overflow: visible;
}
/* 圖片 */
.photoall{
    // width: 170px;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;

    /* 讓內部寬度在每格中置中顯示，但不硬卡卡片大小 */
    width: 100%;
    max-width: 170px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
.thumb img{
    width: 120px;
    height: 120px;
    border-radius: 8px;
}
/* 文字區 */
.down{
    width: 170px;
    display: flex;
    flex-direction: column;
    line-height: $linHeight-p;
}
.titleprice{
    height: 70px;
    margin-top: 10px;
    color: $FontColor-white;
}
.title { 
    margin: 10px auto; 
    text-align: center;
    font-size: $pcChFont-p;
}
.price { 
    text-align: center;
    font-size: $pcChFont-p;
    opacity: .9; 
}
/* 按鈕 */
.actions { 
    display: flex; 
    gap: 8px; 
    justify-content: center; 
    width: 170px;
}
.btn {
    padding: 3px 10px;
    border-radius: 8px;
    font-size: $pcChFont-small;
    cursor: pointer;
    margin-top: 10px;
    background-color: $primaryColor-500;
    color: $FontColor-white; 
}
.btn.cancel { 
    background-color: $primaryColor-100;
    color: $FontColor-black;
}
.btn.primary:hover {
    background-color: $inputColor-focus;
}
.btn:active { 
    transform: translateY(1px); 
}
@keyframes pop { 
    from { transform: scale(.96); opacity: .6 } to { transform: none; opacity: 1 } 
}
// 分頁
.pager{
    // width: 700px;
    // justify-content: center;  
    // padding-right: 4px; 

    width: 100%;
    max-width: 700px;
    margin: 16px auto 0;
    display: flex;
    justify-content: center;
    padding: 0 50px;
    position: relative;
    z-index: 1;
}

@media screen and (max-width: 433px) {
    .products{
        width: 100%;
        height: auto;
        padding: 12px;
        box-sizing: border-box;
    }
    .flex{
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 20px;
        row-gap: 20px;
    }
    /* 圖片 */
    .card{
        width: 100%;
        height: auto;
        margin: 0;
    }
    .photoall{
        width: 100%;
        align-items: stretch;
    }
    .thumb{
        width: 100%;
        max-width: 160px;
        aspect-ratio: 1 / 1;     
        overflow: hidden;
        border-radius: 8px;
        margin: 0 auto;
    }
    .thumb img{
        width: 100%;
        height: 100%;
        object-fit: cover;     
        display: block;
    }
    /* 文案字級稍微縮小、置中 */
    .down{
        width: 100%;
    }
    .titleprice{
        height: auto;
        margin-top: 8px;
        color: $FontColor-white;
    }
    .title{
        margin: 4px 0 2px;
        font-size: 14px;
        text-align: center;
    }
    .price{
        font-size: 14px;
        text-align: center;
        opacity: .9;
    }
    /* 按鈕 */
    .actions{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        width: 100%;
        max-width: 160px;
        margin: 10px auto;
    }
    .btn{
        margin-top: 0;
        padding: 8px 0;
        font-size: 14px;
        border-radius: 8px;
    }
    /* 分頁 */
    .pager{
        width: 100%;
        padding: 8px 0 16px;
        display: flex;
        justify-content: center;
    }

}

</style>

