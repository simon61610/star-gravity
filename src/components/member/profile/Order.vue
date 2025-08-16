<!----我的訂單(不使用)---->
<script setup>
    import { ref, onMounted, computed } from 'vue'

    //定義props接其他表格傳的資料
    const props = defineProps({
    username: { type: String, default: '小姐/先生' },
    photo:   { type: String, default: '@/src/assets/icons/account.svg' },
    data: { type: Array,default: () => [] },             
    columns: { type: Array,default: () => [] },
    // search:  { type: String, default: '' },
    })

    const emit = defineEmits(['select'])
    const activeKey = ref('')

    // 預設第一個 active
    onMounted(() => { activeKey.value = 'profile'; emit('select', 'profile')})
    function selectItem(key) { activeKey.value = key; emit('select', key)}
    // 內建欄位（外部沒傳 columns 時用）
    const builtinColumns = [
    {label:'訂單編號',prop:'order_number'},
    {label:'訂單日期',prop:'order_date'},
    {label:'購買項目',prop:'order_item'},
    {label:'金額',prop:'dollar'},
    {label:'狀態',prop:'state' , align:'center' },]

    const columnDefs = computed(() => (props.columns?.length ? props.columns : builtinColumns))
    /* 畫面顯示資料（外部沒傳 data 時用） */
    const ordertable = ref([ 
    {order_number: '2025081601', order_date: '2025-08-16', order_item: '雙筒望遠鏡', dollar: '2500', state:'已出貨'},
    {order_number: '2025081601', order_date: '2025-08-16', order_item: '雙筒望遠鏡', dollar: '2500', state:'已出貨'},
    ])

    /* 單一資料來源：優先用外部 props.data，否則用內建 ordertable */
    const dataSource = computed(() => (props.data?.length ? props.data : ordertable.value))


    // 分頁
    const currentPage = ref(1);  //目前所在頁面
    const pageSize = ref(8);  //每頁顯示數量 

    const showATable = computed(()=>{   // 這裡是計算過後的頁數 所以要用分頁器都應該綁定此參數
        const start = (currentPage.value - 1) * pageSize.value  //從第X頁的第X筆開始 例如:第一頁會從(1-1)*4 第0筆資料開始 
        // const end = start + pageSize.value //一共幾筆
        // console.log(` 目前第${currentPage.value}頁 顯示${start} 到 ${end-1}筆`) //驗證用而已
        return filtered.value.slice(start, start + pageSize.value)  // 保險使用 slice複製陣列 [開始,結束] 確保資料不會因為切頁被刪除回不去
    })


    const filterTableData = computed(() => //這是用來過濾搜尋的table結果
    props.data.filter(
        (data) =>
        !props.search ||
        String(data.id ?? '').includes(String(props.search))
    )
    )

    const handleEdit = (index, row) => {
    console.log(index, row)
    }

    


    // 表格
    

    

</script>