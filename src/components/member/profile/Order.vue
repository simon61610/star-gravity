<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import Pagination from '@/components/common/Pagination.vue'

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
    { label: '購買項目', prop: 'order_item' },
    { label: '金額',     prop: 'dollar' },
    { label: '狀態',     prop: 'state', align: 'center' },
    ]
    const columnDefs = computed(() => (props.columns?.length ? props.columns : builtinColumns))

    // 內建資料 (之後可改成 props.data 或 API 結果）
    const ordertable = ref([
    { order_number: '2025081601', order_date: '2025-08-16', order_item: '雙筒望遠鏡', dollar: '2,500', state: '已出貨' },
    { order_number: '2025081602', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    { order_number: '2025081603', order_date: '', order_item: '', dollar: '', state: '' },
    
    ])

    // 單一資料來源：優先用外部 props.data，否則用內建
    const dataSource = computed(() => ordertable.value) // ← 先用內建資料

    // 分頁
    const orderPage = ref(1)
    const pageSize    = ref(8)
    // 總筆數（給 Pagination 的 :total）
    const filteredTotal = computed(() => dataSource.value.length)

    // const handleEdit = (index, row) => {
    //     console.log(index, row)
    // }

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
    watch(dataSource, () => { currentPage.value = 1 })


</script>

<template>    <!-----我的訂單---------->
        
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
    // display: flex;
    justify-content: center;  
    // padding-right: 4px; 
    padding-top: 10px;
}
//  .el-pager li.is-active,
//   .el-pager .number.is-active {
//     background-color: $primaryColor-500;
//     border-color: $primaryColor-500;
//     color: #fff;
//     font-weight: 700;
//   }
</style>

