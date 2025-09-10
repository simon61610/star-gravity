<script setup>
import  Pagination from '@/components/common/Pagination.vue'
import {ref,computed} from 'vue'
const search = ref('')


/*----------------計算分頁器顯示-----------*/

const currentPage = ref(1);  //目前所在頁面
const pageSize = ref(10);  //每頁顯示數量 

const props = defineProps({                       //定義props接其他表格傳的資料
  data: { type: Array,default: () => [], required: true },
  columns: { type: Array,default: () => [], required: true },
  search:  { type: String, default: '' }
})

const showTable = computed(()=>{   // 這裡是計算過後的頁數 所以要用分頁器都應該綁定此參數
        const start = (currentPage.value - 1) * pageSize.value  //從第X頁的第X筆開始 例如:第一頁會從(1-1)*4 第0筆資料開始 
        const end = start + pageSize.value //一共幾筆
        console.log(` 目前第${currentPage.value}頁 顯示${start} 到 ${end-1}筆`) //驗證用而已
        return filterTableData.value.slice(start, start + pageSize.value)  // 保險使用 slice複製陣列 [開始,結束] 確保資料不會因為切頁被刪除回不去
    })






/*----------------搜尋程式-------------------*/
const filterTableData = computed(() => {
  const source = Array.isArray(props.data) ? props.data : []
  return source.filter(data =>
    !props.search ||
    String(data.ID ?? data.id ?? '').includes(String(props.search))
  )
})
// const filterTableData = computed(() => //這是用來過濾搜尋的table結果
//   props.data.filter(    //props.data = 原資料 filter()篩選
//     (data) => 
//       !props.search ||  //這邊決定顯示的資料 條件1. (沒回傳=沒搜尋)如果沒搜尋全顯示
//       String(data.ID ?? data.id ?? '').includes(String(props.search)) //假設有搜尋執行這段 舉例假設有字串ID叫123 後面搜尋框只要符合其中1或2或3 就顯示
//   )
// )

/*----------------編輯按鈕------------------*/
const handleEdit = (index, row) => { //偵測編輯按鈕編輯哪個資料
  console.log(index, row)
}


</script>

<template>
  <div class="admin-table-wrapper">
      <section class="admin-table-box" >

                  <!-- <div class="admin-table-header">
                    <div class="admin-table-title">
                        <h1>會員管理</h1>
                    </div>

                    <div class="admin-table-input">
                        <el-input v-model="search" size="small"  placeholder="以ID搜索" >
                          <template #prefix>
                            <i class="fa-solid fa-magnifying-glass"></i>
                          </template>
                        </el-input>
                        <button>搜尋</button>
                    </div>
                  </div>
                  <hr> -->

                <el-table :data="showTable">
                    <el-table-column v-for = "col in columns" :key="col.prop" :label="col.label" :align="col.align|| 'right' "
                    :prop="col.prop">
 
                    <!-- <el-table-column label="會員帳號" prop="member_account" /> -->
                    <!-- <el-table-column label="會員姓名" prop="member_name" /> -->
                    <!-- <el-table-column label="帳號狀態" prop="account_status" /> -->
                    <!-- <el-table-column label="創建日期" prop="created_at" /> -->
                    <!-- <el-table-column label="編輯" align="right">  -->

                      
                            <template #default="scope"> <!---把這一列(row)的資料，交給我一個變數，變數叫 scope-->
                               <!-- 如果有 slot，優先交給父層自訂的slot 顯示 -->
                              <slot v-if='col.slot'  
                              :name="col.slot" 
                              v-bind="scope"></slot> <!------col.slot 定義欄位------->
                                  <!-- 如果是 checkbox 欄位 -->
                                  <el-checkbox
                                    v-else-if="col.type === 'checkbox'"
                                    v-model="scope.row[col.prop]"
                                    :true-label="1"
                                    :false-label="0"
                                    @change="$emit('checkbox-change', scope.row)"
                                  />
                                  <!-- 如果都不是那就抓一般文字欄位 -->
                                 <!-- <span v-else>{{ scope.row[col.prop] }}</span> -->
                                 <span v-else>{{ col.formatter ? col.formatter(scope.row) : scope.row[col.prop] }}</span>
                            </template>
                    </el-table-column> 
              
                </el-table>
      </section>
      <Pagination
      v-model="currentPage"
      v-model:pageSize="pageSize"
      :total="filterTableData.length"/>
  </div>
   
</template>

<style scoped lang="scss">
.admin-table-wrapper{
    width: 100%;
    ::v-deep(.el-table__header th){  //表格頭
      background-color: #9187B9;
      color: white;
      
    }

    ::v-deep(.el-table:not(.el-table--border) .el-table__cell){  //表格全欄位
      text-align: center;
      font-size: 14px;
    }

    ::v-deep(.el-button--small){   //編輯按鈕
      
      background-color: #E48812;
      color: white;
      border-radius: 20px;
      width: 90px;
    }
    
  .admin-table-box{
    
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
        
    
  }
  
  ::v-deep(.el-pagination) {
    float: right;
 
    button{
      color:gray !important;
    }

    ul li{
      color:gray !important;
      background-color: transparent !important;
      border-radius: 0 !important;

      &:hover{
        background-color: black !important;
      }

      &:active{
        color:black;
        background-color: black !important;
        font-weight: bolder;
      }
    }
  }
}

</style>