<!----活動列表---->
<template>  
    
    <div class="eventall">
        <div class="all">
            <!-----左邊頭像+選單-------->
            <aside class="sidebar">
                <!-- 頭像 -->
                <img class="photo" :src="photo" alt="頭像" />
    
                <!-- 帳號 -->
                <p class="username">{{ username }}</p>
    
                <!-- 清單 -->
                <ul class="menu">
                    <li :class="{ active: activeKey === 'profile' }">
                        <button class="menu-btn" type="button" @click="selectItem('profile')">個人資料管理</button>
                    </li>
                    <li :class="{ active: activeKey === 'orders' }">
                        <button class="menu-btn" type="button" @click="selectItem('orders')">我的訂單</button>
                    </li>
                    <li :class="{ active: activeKey === 'events' }">
                        <button class="menu-btn" type="button" @click="selectItem('events')">報名活動列表</button>
                    </li>
                    <li :class="{ active: activeKey === 'favorites' }">
                        <button class="menu-btn" type="button" @click="selectItem('favorites')">我的收藏</button>
                    </li>
                    <li :class="{ active: activeKey === 'reviews' }">
                        <button class="menu-btn" type="button" @click="selectItem('reviews')">我的評論</button>
                    </li>
                </ul>
            </aside>
            <!-----右邊表格-------->
            <div class="event-table-wrapper">
                <section class="event-table-box">
    
                    <el-table :data="showATable" >
                        <el-table-column v-for = "col in columnDefs" :key="col.prop" :label="col.label" :prop="col.prop" :align="col.align || 'center' "
                            :min-width="col.minWidth || 120">
                        </el-table-column> 
                  
                    </el-table>
                </section>   
                <!-----分頁靠右-------->
                <div class="pager">
                    <el-pagination background layout="prev, pager, next" :total="24" />
                </div>       
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.eventall{
    width: 100%;
    min-height: calc(100vh - 100px);
    background-image: url(@/assets/images/member/login-bgi.png);    
    background-size: cover;
}
.all{
    width: 1200px;
    display: flex;
    gap: 50px;
    margin: 0 auto;
    padding-top: 80px;
}
.sidebar{
    width: 150px;
    padding-top: 20px;
    padding-left: 30px;
    color: $secondaryColor-yellow;
}
.photo{
    width: 80px;
    height: 80px;
    margin: 0 auto;
    padding-left: 30px;
}
.username{
    font-size: $pcChFont-H4;
    padding-top: 20px;
    padding-left: 30px;
}
.menu{
    padding: 10px;
    width: 150px;
}
.menu-btn{
    border: none;
    background-color: transparent;
    padding-top: 10px;
    font-size: $pcChFont-H4;
    color: $secondaryColor-yellow;
    cursor: pointer;
}
.menu-btn:hover, .menu li.active .menu-btn {   /* hover 與 active 都變色 */
    color: $secondaryColor-orange;
    text-decoration: underline;
}
// 右側表格
.event-table-wrapper{
   width: 900px;

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
    width: 900px;
    display: flex;
    justify-content: flex-end;  /* 靠最右邊 */
    padding-right: 4px; 
    padding-top: 10px;
}
</style>

<script setup>
    import { ref, computed, onMounted } from 'vue'

    // 定義 props
    const props = defineProps({
    username: { type: String, default: '小姐/先生' },
    photo:    { type: String, default: '/src/assets/icons/account.svg' },
    data:     { type: Array,  default: () => [] },
    columns:  { type: Array,  default: () => [] },
    })

    const emit = defineEmits(['select'])
    const activeKey = ref('')
    onMounted(() => { activeKey.value = 'profile'; emit('select', 'profile') })
    function selectItem(key){ activeKey.value = key; emit('select', key) }

    // 內建欄位（外部沒傳 columns 時用）
    const builtinColumns = [
    { label: '活動名稱', prop: 'activity_name' },
    { label: '日期&時間', prop: 'date_time' },
    { label: '地點', prop: 'adress' },
    { label: '狀態', prop: 'state', align: 'center' },
    ]
    const columnDefs = computed(() => (props.columns?.length ? props.columns : builtinColumns))

    // 內建資料（外部沒傳 data 時用，要幾行就寫幾行
    const eventtable = ref([
    { activity_name: '流星雨', date_time: '20250816 19:30', adress: '陽明山', state: '已完成' },
    { activity_name: '夏季大三角', date_time: '20250825 19:30', adress: '阿里山', state: '進行中' },
    { activity_name: '賞銀河', date_time: '', adress: '', state: '' },
    { activity_name: '擁抱宇宙', date_time: '', adress: '', state: '' },
    { activity_name: '墾丁星夜', date_time: '', adress: '', state: '' },
    { activity_name: '台東最美星空', date_time: '', adress: '', state: '' },
    { activity_name: '跟羊一起看星星', date_time: '', adress: '', state: '' },
    { activity_name: '擎天崗看星星', date_time: '', adress: '', state: '' },
    ])

    // 單一資料來源：優先用外部 props.data，否則用內建
    // const dataSource = computed(() => (props.data?.length ? props.data : ordertable.value))
    const dataSource = computed(() => eventtable.value) // ← 先用內建資料
   
    // 表格資料來源（先不切頁）
    // const showATable = computed(() => dataSource.value)
    // 如果想讓分頁顯示正確總筆數，就加這行，模板把 :total 改成 filteredTotal
    // const filteredTotal = computed(() => dataSource.value.length)

    // 分頁
    const currentPage = ref(1)
    const pageSize    = ref(8)

    const handleEdit = (index, row) => {
    console.log(index, row)
    }

    // 之後想開分頁再把 showATable 改成用 slice
    const showATable = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return dataSource.value.slice(start, start + pageSize.value)
    })

</script>




