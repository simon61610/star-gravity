<!----我的收藏---->
<script setup>
    import { ref, computed } from 'vue'
    import Pagination from '@/components/common/Pagination.vue'
    import shopToast from '@/components/common/shopToast.vue'  // 新增
    import { showToast } from '@/composables/useToast'         // 新增

    // 先放 8 張假資料；之後接 API 只要改這個陣列即可
    const products = ref(
        Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            title: '基礎望遠鏡',
            price: 2500,
        }))
    )
    // const products8 = computed(() => products.value.slice(0, 8))

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
    // 直接購買 
    // const showAdded = ref(false)

    //     function onBuyNow () {
    //     showAdded.value = true               // 顯示成功畫面
    //     // 自動關閉（1.5 秒）
    //     setTimeout(() => { showAdded.value = false }, 1500)
    // }
    // function closeAdded () {
    //     showAdded.value = false
    // }
    function onBuyNow () {
        // 這裡可放實際購物流程，成功後提示：
        showToast('已加入購物車！', { type: 'success', duration: 2000 })
    }

</script>

<template>
            
    <!----右邊-------->
    <div class="products">

        <shopToast/>

        <div class="flex">
            <article v-for="p in products" :key="p.id" class="card">
                
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
            
            <!-- 自製小彈窗已改為 toast 呈現 -->
            <!-- <div v-if="showAdded" class="cart-overlay" @click="closeAdded">
                <div class="cart-modal" @click.stop>
                    <div class="ok">✓</div>    
                    <h3>已加入購物車</h3>
                    <p class="hint">商品已加入購物車，您可繼續選購</p>
                    <div class="modal-actions">
                        <button class="btn outline" @click="closeAdded">知道了</button>
                    </div>
                </div>
            </div> -->
            
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
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';


// 右邊開始
.products{
    padding: 12px;
    width: 700px;
    height: 500px;
}
.flex {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));     /* 固定4欄 */
    column-gap: 16px;   /* 左右間距 */
    row-gap: 140px;     /* 上下間距 */
}
.card{
    width: 120px;
    height: 120px;
    margin: 0;
}
/* 圖片 */
.photoall{
    width: 170px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
// 購物車小彈窗
// .cart-overlay{
//   position: fixed; inset: 0; z-index: 9999;
//   background: rgba(0,0,0,.45);
//   display: grid; place-items: center;
// }
// .cart-modal{
//   width: min(320px, 86vw);
//   background: #fff;
//   color: #222;
//   border-radius: 14px;
//   padding: 20px 18px;
//   text-align: center;
//   box-shadow: 0 12px 30px rgba(0,0,0,.25);
//   animation: pop .15s ease-out;
// }
// .ok{
//   width: 44px; height: 44px; margin: 0 auto 8px;
//   border-radius: 50%;
//   background: #16a34a;     /* 綠色圈 */
//   color: #fff; display: grid; place-items: center;
//   font-weight: 700; font-size: 22px;
// }
// .hint{ 
//     margin-top: 4px; 
//     color:#666; 
//     font-size:14px; 
// }
// .modal-actions{ 
//     margin-top: 12px; 
//     display:flex; 
//     justify-content:center; 
//     gap:8px; 
// }
// .btn.outline{
//     background: transparent; 
//     //   color:#444; 
//     //   border:1px solid #ccc; 
//     border-radius: 999px;
//     padding: 8px 14px; 
//     cursor: pointer;
// }
@keyframes pop { 
    from { transform: scale(.96); opacity: .6 } to { transform: none; opacity: 1 } 
}
// 分頁
.pager{
    width: 700px;
    // display: flex;
    justify-content: center;  
    padding-right: 4px; 
}
</style>

