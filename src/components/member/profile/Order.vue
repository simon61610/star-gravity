<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import Pagination from '@/components/common/Pagination.vue'
    import axios from 'axios'
    import { useMemberStore } from '@/stores/member'
    import { columnAlignment } from 'element-plus'

    // 引用useMemberStore
    const memberStore = useMemberStore()

    //定義響應式資料
    const orders = ref([ ]) // 後端回來的訂單
    const loading = ref(false) // 載入狀態
    const errorMsg = ref('')  // 錯誤訊息

    const memberId = ref('')

    // 定義 props
    const props = defineProps({
        data:     { type: Array,  default: () => [] },
        columns:  { type: Array,  default: () => [] },
    })
    const emit = defineEmits(['select'])

    const activeKey = ref('')
    onMounted(() => { activeKey.value = 'profile'; emit('select', 'profile') })
    function selectItem(key){ activeKey.value = key; emit('select', key) }

    // 內建欄位（外部沒傳 columns 時用）
    const builtinColumns = [
    { label: '訂單編號', prop: 'order_number' },
    { label: '訂單日期', prop: 'order_date' },
    { label: '金額',     prop: 'dollars' },
    { label: '狀態',     prop: 'order_status'},
    ]
    const columnDefs = computed(() => (props.columns?.length ? props.columns : builtinColumns))

    // 內建資料 (之後可改成 props.data 或 API 結果）
    // const ordertable = ref([
    // { order_number: '2025081601', order_date: '2025-08-16', order_item: '雙筒望遠鏡', dollar: '2,500', state: '已出貨' },
    // { order_number: '2025081602', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    // { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    
    // ])

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
   width: 800px;

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
    padding-top: 20px;
}
.pager{
    width: 800px;
    justify-content: center;  
    padding-top: 10px;
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

