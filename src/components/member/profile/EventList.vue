<!----活動列表---->
<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import Pagination from '@/components/common/Pagination.vue'
    import axios from 'axios'
    import { useMemberStore } from '@/stores/member'

    // 引用useMemberStore
    const memberStore = useMemberStore()

    //定義響應式資料
    const events = ref([ ]) // 後端回來的訂單
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
    { label: '活動名稱', prop: 'event_name' },
    { label: '日期&時間', prop: 'event_date' },
    { label: '活動地點', prop: 'event_place' },
    { label: '狀態', prop: 'event_status'},
    ]
    const columnDefs = computed(() => (props.columns?.length ? props.columns : builtinColumns))

    // 內建資料（之後可改成 props.data 或 API 結果）
    // const eventtable = ref([
    // { activity_name: '流星雨', date_time: '20250816 19:30', adress: '陽明山', state: '已完成' },
    // { activity_name: '夏季大三角', date_time: '20250825 19:30', adress: '阿里山', state: '進行中' },
    // { activity_name: '賞銀河', date_time: '', adress: '', state: '' },
    // { activity_name: '擁抱宇宙', date_time: '', adress: '', state: '' },
    // { activity_name: '墾丁星夜', date_time: '', adress: '', state: '' },
    // { activity_name: '台東最美星空', date_time: '', adress: '', state: '' },
    // { activity_name: '跟羊一起看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    // ])

    // 單一資料來源：有傳入 props.data 就用，否則用 API 回來的 orders
    const dataSource = computed(() => (props.data?.length ? props.data : events.value))

    // 分頁
    const eventPage = ref(1)
    const pageSize    = ref(8)
    // 總筆數（給 Pagination 的 :total）
    const filteredTotal = computed(() => dataSource.value.length)

    // 表格顯示資料（按頁切 slice）
    const showATable = computed(() => {
        const start = (eventPage.value - 1) * pageSize.value
        return dataSource.value.slice(start, start + pageSize.value)
    })
    // 接住子元件丟回來的新頁碼
    function pagechange(newpage) {
        eventPage.value = newpage
        // 想要就加：切頁回到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // 若資料量變動，回到第一頁（可保險）
    watch(dataSource, () => { eventPage.value = 1 })

</script>


<template>  
    <!-----右邊表格-------->
    <div class="event-table-wrapper">
        <section class="event-table-box">

            <el-table :data="showATable" >
                <el-table-column v-for = "col in columnDefs" :key="col.prop" :label="col.label" :prop="col.prop" :align="col.align || 'center' "
                    :min-width="col.minWidth || 120">
                </el-table-column> 
            
            </el-table>
        </section>   
        <!-----分頁-------->
        <div class="pager">
           <Pagination
                :modelValue="eventPage"
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
.event-table-wrapper{
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
.event-table-box{
    max-width: 1000px;
    width: 100%;
    margin: 0 auto; 
}
// 分頁
.pager{
    width: 800px;
    justify-content: center;  
    padding-top: 10px;
}

@media screen and (max-width: 433px) {
    .event-table-wrapper{
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
    }
    /* 表格 */
    .event-table-box{
        width: 100%;
        padding-top: 12px;
        overflow-x: auto;                 /* 水平卷軸 */
        -webkit-overflow-scrolling: touch;
    }
    .event-table-box :deep(.el-table){
        min-width: 680px;                
        font-size: 14px;
    }
    .event-table-wrapper :deep(.el-table__header th){
        font-size: 14px;
        text-align: center;
    }
    .event-table-wrapper :deep(.el-table__cell){
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



