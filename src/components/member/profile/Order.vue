<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import Pagination from '@/components/common/Pagination.vue'
    import axios from 'axios'
    import { useMemberStore } from '@/stores/member'

    // 引用useMemberStore
    const memberStore = useMemberStore()

    //定義響應式資料
    const orders = ref([ ]) // 後端回來的訂單

    const memberId = ref('')

    // 定義 props
    const props = defineProps({
        data:     { type: Array,  default: () => [] },
        columns:  { type: Array,  default: () => [] },
    })
    const emit = defineEmits(['select'])

    const activeKey = ref('')
    onMounted(() => { activeKey.value = 'profile'; emit('select', 'profile') })
    function selectItem(key){ 
        activeKey.value = key; emit('select', key) 
    }

    // 內建欄位（外部沒傳 columns 時用）
    const builtinColumns = [
        { label: '訂單編號', prop: 'order_number' },
        { label: '訂單日期', prop: 'order_date' },
        { label: '金額',     prop: 'dollars' },
        { label: '狀態',     prop: 'order_status'},
    ]
    const columnDefs = computed(() => (props.columns?.length ? props.columns : builtinColumns))

    // 單一資料來源：有傳入 props.data 就用，否則用 API 回來的 orders
    const dataSource = computed(() => (props.data?.length ? props.data : orders.value))

    // 分頁
    const orderPage = ref(1)
    const pageSize    = ref(8)
    // 總筆數（給 Pagination 的 :total）
    const filteredTotal = computed(() => dataSource.value.length)

    // 表格顯示資料（按頁切 slice）
    const showATable = computed(() => {
        const start = (orderPage.value - 1) * pageSize.value
        return dataSource.value.slice(start, start + pageSize.value)
    })

    // 接住子元件丟回來的新頁碼
    function pagechange(newpage) {
        orderPage.value = newpage
        // 想要就加：切頁回到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // 若資料量變動，回到第一頁（可保險）
    watch(dataSource, () => { orderPage.value = 1 })

    //-------------連接後端--------------------
    const getMemberOrders = async (memberId) => {
        try {
            const resp = await axios.post(
                import.meta.env.VITE_AJAX_URL + "Member/getMemberOrders.php",
                { memberId }
            )
            console.log(resp.data);

            orders.value = resp.data
        } catch(error) {
            console.log("後端請求失敗");
        }
    }

    onMounted(() => {
        console.log(memberStore.user.ID);
        memberId.value = memberStore.user.ID
        getMemberOrders(memberId.value)
    })


</script>

<template>   
        
    <!-----右邊表格-------->
    <div class="order-table-wrapper">
        <section class="order-table-box">

            <el-table :data="showATable" >
                <el-table-column v-for = "col in columnDefs" :key="col.prop" :label="col.label" :prop="col.prop" :align="col.align || 'center' "
                    :min-width="col.minWidth || 120">
                </el-table-column> 
            
            </el-table>
        </section>   
        <!-----分頁-------->
        <div class="pager">
            <Pagination
                :modelValue="orderPage"
                @update:modelValue="pagechange"
                :page-size="pageSize"
                :total="filteredTotal"
            />
        </div>       
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

// 右側表格
.order-table-wrapper{
//    width: 800px;
    width: min(100%, 800px);

    ::v-deep(.el-table__header th){    //表格頭
      background-color: $primaryColor-500;
      color: black;
    }
    ::v-deep(.el-table:not(.el-table--border) .el-table__cell){   //表格全欄位
      text-align: center;
      font-size: 16px;
    }
}
.order-table-box{
    max-width: 1000px;
    width: 100%;
    margin: 0 auto; 
}
.pager{
    width: 800px;
    justify-content: center;  
    padding-top: 10px;
}

//-------------------斷點--------------------------
@media screen and (max-width: 1201px) {
    /* 外層改為流體寬 */
    .order-table-wrapper{
        width: 100% !important;
        max-width: 100%;
        padding: 0 12px;              /* 兩側留一點內距 */
        box-sizing: border-box;
    }
    /* 表格盒：允許水平捲動 */
    .order-table-box{
        width: 100% !important;
        max-width: none;
        margin: 0 auto;
        overflow-x: auto;             /* 關鍵：內容過寬就出現捲軸 */
        -webkit-overflow-scrolling: touch;
    }
     /* Element Plus 表格在小螢幕的字級/內距微縮 */
    .order-table-wrapper :deep(.el-table__header th),
    .order-table-wrapper :deep(.el-table__cell){
        font-size: 14px;              /* 從 16px 稍微縮小 */
        padding: 10px 8px;
        white-space: nowrap;          /* 欄位不換行，交給水平捲動處理 */
    }
    /* 分頁條置中、流體寬 */
    .pager{
        width: 100% !important;       /* 原本 800px → 全寬 */
        display: flex;
        justify-content: center;
        padding-top: 10px;
        box-sizing: border-box;
    }
    /* 分頁很多時允許換行 */
    .pager :deep(.el-pagination){
        flex-wrap: wrap;
        row-gap: 6px;
    }
}

@media screen and (max-width: 900px) {
    /* 外層流體寬，兩側再收一點內距 */
    order-table-wrapper{
        width: 100% !important;
        max-width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
    /* 表格容器：出水平捲軸，避免整頁橫捲 */
    .order-table-box{
        width: 100% !important;
        max-width: none;
        margin: 0 auto;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    /* 表頭/儲存格：字級與內距再縮、內容不換行 */
    .order-table-wrapper :deep(.el-table__header th),
    .order-table-wrapper :deep(.el-table__cell){
        font-size: 13px;
        padding: 8px 6px;
        white-space: nowrap;
    }
    /* 列高略降一些 */
    .order-table-wrapper :deep(.el-table__row){
        height: 44px;
    }
    /* 分頁：全寬置中，項目可換行 */
    .pager{
        width: 100% !important;
        display: flex;
        justify-content: center;
        padding-top: 8px;
        box-sizing: border-box;
    }
    .pager :deep(.el-pagination){
        flex-wrap: wrap;
        row-gap: 6px;
    }
}

@media screen and (max-width: 651px) {
    /* 外層流體寬，左右內距更窄 */
    .order-table-wrapper{
        width: 100% !important;
        max-width: 100%;
        padding: 0 8px;
        box-sizing: border-box;
    }
    /* 表格容器：只在這一層出水平捲軸 */
    .order-table-box{
        width: 100% !important;
        max-width: none;
        margin: 0 auto;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    /* 表頭/儲存格：再縮一階，內容不換行 */
    .order-table-wrapper :deep(.el-table__header th),
    .order-table-wrapper :deep(.el-table__cell){
        font-size: 12px;
        padding: 6px 6px;
        white-space: nowrap;
    }
    /* 長字省略，避免列高被撐大 */
    .order-table-wrapper :deep(.cell){
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 160px;   /* 視需要可調整 */
    }
    /* 列高再降一點 */
    .order-table-wrapper :deep(.el-table__row){
        height: 40px;
    }
    /* 分頁：全寬置中，元件縮小並允許換行 */
    .pager{
        width: 100% !important;
        display: flex;
        justify-content: center;
        padding-top: 6px;
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
        height: 26px;
        line-height: 26px;
    }
}





@media screen and (max-width: 433px) {
    .order-table-wrapper{
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
    }
    /* 表格 */
    .order-table-box{
        width: 100%;
        padding-top: 12px;
        overflow-x: auto;                 /* 水平卷軸 */
        -webkit-overflow-scrolling: touch;
    }
    /* 表格本體設定最小寬，讓欄位不被壓扁 */
    .order-table-box :deep(.el-table){
        min-width: 680px;                
        font-size: 14px;
    }
    /* 表格文字 */
    .order-table-wrapper :deep(.el-table__header th){
        font-size: 14px;
        text-align: center;
    }
    .order-table-wrapper :deep(.el-table__cell){
        font-size: 14px;
        padding: 10px 8px;
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

