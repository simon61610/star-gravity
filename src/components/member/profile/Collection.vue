<!----我的收藏---->
<script setup>
    import { ref, computed, onMounted } from 'vue'
    import Pagination from '@/components/common/Pagination.vue'
    import shopToast from '@/components/common/shopToast.vue'  
    import { showToast } from '@/composables/useToast'  
    import axios from 'axios'
    import { useMemberStore } from '@/stores/member'  
    import bus from '@/composables/useMitt' 
    import { useRouter } from 'vue-router'

    const router = useRouter()
    
    // 引用useMemberStore
    const memberStore = useMemberStore()

    // API 回傳的商品清單（空陣列起手）
    const products = ref([])

    const memberId = ref('')

    // 防 NaN：undefined/空字串 會被當 0
    const formatTWD = (n) => `NT$${Number(n).toLocaleString('zh-TW')}`

    // 圖片路徑
    const toImageUrl = (path) => {
        if (!path) return ''                             // 沒圖就空字串
        if (/^https?:\/\//i.test(path)) return path      // 已是完整網址
        const base = (import.meta.env.VITE_AJAX_URL_NOEND || '').replace(/\/+$/,'')  // 去掉尾斜線
        // 若後端回 "/pdo/xxx.jpg" → base + "/pdo/xxx.jpg"
        // 若後端回 "pdo/xxx.jpg"  → base + "/pdo/xxx.jpg"
        return base + '/' + path.replace(/^\/+/,'')
    }
        
    // 分頁
    const collectionPage = ref(1)    // 目前頁     
    const pageSize = ref(6)          // 每頁幾筆
    const filteredTotal = computed(() => products.value.length)  // 總筆數給 Pagination

    const showProducts = computed(() => {                       // 依頁碼切資料
        const start = (collectionPage.value - 1) * pageSize.value
        return products.value.slice(start, start + pageSize.value)
    })
    function pagechange (newpage) {                             // 接子元件 emit
        collectionPage.value = newpage
        window.scrollTo({ top: 0, behavior: 'smooth' })         // 切頁回頂（可保留/移除）
    }

    // 取消收藏（先從畫面移除，失敗再回滾）
    const unfavorite = async (productId) => {
        if (!confirm('確定要取消收藏嗎？')) return

        // 先從前端移除
        const prev = [...products.value]
        products.value = products.value.filter(p => p.id !== productId)

        // 若該頁被清空，往前翻一頁（避免出現空白頁）
        const start = (collectionPage.value - 1) * pageSize.value
        if (start >= products.value.length && collectionPage.value > 1) {
            collectionPage.value--
        }

        try{
            await axios.post(
                import.meta.env.VITE_AJAX_URL + 'Member/updateFavorite.php',
                { memberId: memberId.value, productId },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            )
            showToast('已取消收藏', { type: 'info', duration: 1800 })
        } catch (err) {
            // 失敗回滾
            products.value = prev
            console.error('取消收藏失敗', err?.response?.status, err?.response?.data)
            showToast('取消收藏失敗', { type: 'error', duration: 2000 })
        }

    }

    // -----------------------------加入購物車-----------------------------------------
    const storage = localStorage
    const BASE_URL = import.meta.env.VITE_AJAX_URL_NOEND

    const addToCart = (product) => {
        // 加入判斷: 商品庫存 <= 0 不執行
        if(product.stock <= 0){
            showToast("此商品缺貨中")
            return
        }

        if(!storage['addItemList']){
            storage['addItemList'] = ''
        }

        const itemId = product.id
        const firstImage = product.photo || ''   // 收藏頁已經處理好的完整圖
        const unitPrice = product.sale_price
        const originalPrice = product.original_price

        // 如果已經買過，增加數量
        if(storage[itemId]){
            let existInfo = storage[itemId].split('|')
            let newQty = +existInfo[3] + 1
            let updatedInfo = `${existInfo[0]}|${existInfo[1]}|${existInfo[2]}|${newQty}|${originalPrice}`
            storage[itemId] = updatedInfo
        }else{ // 第一次買
            storage['addItemList'] += `${itemId}, `
            storage[itemId] = `${product.title}|${firstImage}|${unitPrice}|1|${originalPrice}`
        }

        bus.emit('notifyUpdateCart') // 通知 Header 更新購物車數量
        showToast('已成功加入購物車!', { type: 'success', duration: 1800 })
    
    }

    // -----------------------------點擊到對應頁面-----------------------------------------
    const goProduct = (ID) => router.push({
        name: "product",
        params: {id: ID}
    })

    // 向後端發出請求
    const getCollectionList = async (memberId)=>{
        try{
            const resp = await axios.post(
                import.meta.env.VITE_AJAX_URL + "Member/getCollectionList.php",
                { memberId },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            )
            // console.log(resp.data);

            // 後端應該回傳陣列，直接塞進去
            const lists = Array.isArray(resp.data) ? resp.data : []
            
            products.value = lists.map((r, i) => {
                const sale  = Number(r.sale_price ?? 0)
                const original  = Number(r.original_price ?? 0)
                return {
                    id: r.ID ?? i + 1,
                    title: r.name ?? '未命名商品',
                    sale_price: sale,
                    original_price: original,
                    price: sale > 0 ? sale : original,     // 顯示/存入購物車用的售價
                    photo: toImageUrl(r.photo_url),
                    stock: Number(r.stock ?? 0),
                    is_active: Number(r.is_active ?? 0)
                }
            })
            console.log(resp.data);

            // 資料更新後回到第 1 頁（可選）
            collectionPage.value = 1
            
        }catch( error ){
            console.error("後端請求失敗",
                error?.message,
                error?.response?.status,
                error?.response?.data
            )
        }

    }

    // 斷點430使用
    onMounted(() => {
        if (window.matchMedia('(max-width: 433px)').matches) pageSize.value = 4

        // 保險寫法（避免 user 還沒載入）
        memberId.value = memberStore.user?.ID ?? ''
        getCollectionList(memberId.value)
    })

</script>

<template>
            
    <!----右邊-------->
    <div class="products">

        <shopToast/>

        <div class="flex">
            <article v-for="p in showProducts" :key="p.id" class="card">
                
                <div class="photoall">
                    <div class="thumb" @click="goProduct(p.id)">
                        <img v-if="p.photo" :src="p.photo" :alt="p.title || '商品圖片'">
                    </div>
        
                    <div class="down">
                        <div class="titleprice" @click="goProduct(p.id)">
                            <h3 class="title">{{ p.title }}</h3>
                            <p class="price">{{ formatTWD(p.price) }}</p>
                            <!-- 原價高於顯示價才顯示刪除線 -->
                            <p class="old-price" v-if="p.original_price && p.price < p.original_price">
                                {{ formatTWD(p.original_price) }}
                            </p>
                        </div>
            
                        <div class="actions">
                            <button class="btn cancel" @click="unfavorite(p.id)">取消收藏</button>
                            <button 
                                class="btn primary" 
                                @click="addToCart(p)"
                                :class="{ disabled: p.is_active == 0 || p.stock <= 0 }"
                                :disabled="p.is_active == 0 || p.stock <= 0"
                            >
                                <span v-if="p.is_active == 0">已下架</span>
                                <span v-else-if="p.stock <= 0">缺貨中</span>
                                <span v-else>直接購買</span>
                            </button>
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
    width: 800px;
    height: auto;            /* 內容多就自然撐開 */
    min-height: 500px;       /* 保留原本大致視覺高度 */
    overflow-y: visible;     /* 明確指定不要在這層裁切/滾動 */
    box-sizing: border-box;  /* 尺寸更可控 */
}
.flex {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); /* 自動塞滿 */
    gap: 16px 16px;
}
.card{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,.15);
}
/* 圖片 */
.photoall{
    width: 100%;
}
.thumb {
    width: 85%;
    max-width: 220px;
    aspect-ratio: 4 / 3;
    margin: 0 auto;
    padding: 8px; 
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
}
.thumb img{
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;     /* 等比裁切，避免拉伸變形 */
}
/* 文字區 */
.down{
    width: 100%;
    display: flex;
    flex-direction: column;
    line-height: $linHeight-p;
    gap: 8px;
}
.titleprice{
    color: $FontColor-white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
}
.title { 
    margin: 0;
    text-align: center;
    font-size: 14px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-box-orient: vertical; /* 垂直排列 */
    overflow: hidden;
    line-clamp: 2;
    text-overflow: ellipsis;      /* 顯示省略號（有些瀏覽器需要） */
}
.price { 
    text-align: center;
    font-size: $pcChFont-p;
    opacity: .95; 
    font-weight: 600;
}
/* 原價（刪除線）*/
.old-price {
    text-align: center;
    font-size: 14px;
    color: $FontColor-white;
    opacity: .6;
    text-decoration: line-through;
    margin-top: -2px;
}
/* 按鈕 */
.actions { 
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    width: 100%;
}
.btn {
    padding: 8px 0;
    border-radius: 8px;
    font-size: $pcChFont-small;
    cursor: pointer;
    margin-top: 0;
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
.btn.disabled {
    background-color: #888;
    color: #ccc;
    cursor: not-allowed;
}
.btn.disabled:hover {
    background-color: #888;
}
.btn:active { 
    transform: translateY(1px); 
}
@keyframes pop { 
    from { 
        transform: scale(.96); opacity: .6 
    } 
    to { 
        transform: none; opacity: 1 
    } 
}
// 分頁
.pager{
    width: 100%;
    max-width: 700px;
    margin: 16px auto 0;
    display: flex;
    justify-content: center;
    padding: 0 50px;
    position: relative;
    z-index: 1;
}

//------------------斷點----------------------------
@media screen and (max-width: 1201px) {
    /* 右側內容在 flex 版面不被子元素撐寬 */
    .content{
        min-width: 0;
    }
    /* 產品容器：改成流體寬 + 左右留白，杜絕橫向卷軸 */
    .products{
        width: 100%;
        max-width: 100%;
        min-height: auto;
        padding: 0 12px;
        box-sizing: border-box;
        overflow-x: hidden;
    }
    /* 卡片排版：自動填滿，每張至少 ~220px，常見視窗約 3 欄 */
    .flex{
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 16px;
    }
    .card{
        padding: 8px;
        border-radius: 12px;
    }
    /* 縮略圖 */
    .thumb{
        width: 100%;
        max-width: none;
        aspect-ratio: 4 / 3;
        padding: 8px;
    }
    /* 文案微調 */
    .title{ 
        font-size: 15px; 
    }
    .price{ 
        font-size: 15px; 
    }
    .old-price{ 
        font-size: 13px; 
    }
    /* 按鈕區：維持兩欄，縮一點高度/字級 */
    .actions{ 
        gap: 8px; 
    }
    .btn{
        padding: 10px 0;
        font-size: 14px;
    }
    /* 分頁置中、可換行 */
    .pager{
        max-width: 100%;
        padding: 0 12px;
    }
    .pager :deep(.el-pagination){
        flex-wrap: wrap;
        row-gap: 6px;
    }
}

@media screen and (max-width: 901px) {
    /* 右側內容避免被子元素撐寬 */
    .content{ 
        min-width: 0;
    }
    /* 產品容器：流體寬 + 小一點左右留白 */
    .products{
        width: 100%;
        max-width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        overflow-x: hidden;
    }
    /* 卡片排版：視寬度自動 2–3 欄 */
    .flex{
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 14px;
    }
    .card{
        padding: 8px;
        border-radius: 12px;
    }
    /* 縮略圖：滿寬，內距再少一點 */
    .thumb{
        width: 100%;
        max-width: none;
        aspect-ratio: 4 / 3;
        padding: 6px;
    }
    /* 文字與價格微縮；標題保持 2 行省略 */
    .title{
        font-size: 14px;
        line-height: 1.35;
        display: -webkit-box;
        -webkit-line-clamp: 2;        /* 實際生效的行數限制 */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .price{ 
        font-size: 14px; 
    }
    .old-price{ 
        font-size: 12px; 
    }
    /* 按鈕區：兩欄並排但更緊湊 */
    .actions{ 
        gap: 6px; 
    }
    .btn{
        padding: 8px 0;
        font-size: 13px;
    }
    /* 分頁：全寬置中、可換行 */
    .pager{
        max-width: 100%;
        padding: 0 10px;
    }
    .pager :deep(.el-pagination){
        flex-wrap: wrap;
        row-gap: 4px;
        font-size: 12px;
    }
}

@media screen and (max-width: 651px) {
    /* 右側內容避免被子元素撐寬 */
    .content{ 
        min-width: 0;
    }
    /* 容器：流體寬 + 小一點左右留白 */
    .products{
        width: 95%;
        max-width: 95%;
        margin: 0 auto;
        padding: 0 8px;
        box-sizing: border-box;
        overflow-x: hidden;
    }
    /* 卡片排版 */
    .flex{
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 12px;
    }
    .card{
        padding: 8px;
        border-radius: 10px;
        gap: 8px;
    }
    /* 縮略圖：滿寬，內距更小 */
    .thumb{
        width: 100%;
        max-width: none;
        aspect-ratio: 4 / 3;
        padding: 4px;
    }
    .thumb img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
    }
    /* 文字區微縮 */
    .title{ 
        font-size: 13px;
        line-height: 1.35;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-top: 5px;
    }
    .price{ 
        font-size: 13px; 
    }
    .old-price{ 
        font-size: 12px; 
    }
    /* 按鈕：維持兩欄但更緊湊 */
    .actions{ 
        gap: 6px; 
    }
    .btn{
        padding: 8px 0;
        font-size: 13px;
    }
    /* 分頁：全寬置中、可換行 */
    .pager{
        max-width: 100%;
        padding: 0 8px;
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

@media screen and (max-width: 432px) {
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

