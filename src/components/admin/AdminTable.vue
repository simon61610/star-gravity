<script setup>
import  Pagination from '@/components/common/Pagination.vue'
import {ref,computed} from 'vue'
 
const search = ref('')

const currentPage = ref(1);  //目前所在頁面
const pageSize = ref(10);  //每頁顯示數量 

const filterTableData = computed(() => //這是用來過濾搜尋的table結果
  tableData.filter(
    (data) =>
      !search.value ||
      data.id.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleEdit = (index, row) => {
  console.log(index, row)
}

const showATable = computed(()=>{   // 這裡是計算過後的頁數 所以要用分頁器都應該綁定此參數
        const start = (currentPage.value - 1) * pageSize.value  //從第X頁的第X筆開始 例如:第一頁會從(1-1)*4 第0筆資料開始 
        const end = start + pageSize.value //一共幾筆
        console.log(` 目前第${currentPage.value}頁 顯示${start} 到 ${end-1}筆`) //驗證用而已
        return filterTableData.value.slice(start, start + pageSize.value)  // 保險使用 slice複製陣列 [開始,結束] 確保資料不會因為切頁被刪除回不去
    })



const tableData = [
  {
    id: '01',
    member_account: 'cks558x',
    member_name: '很大偉',
    account_status: '正常',
    created_at:'2025-08-15'
  },
  {
    id: '02',
    member_account: 'cks558x',
    member_name: '很大偉',
    account_status: '正常',
    created_at:'2025-08-15'
  },
  {
    id: '03',
    member_account: 'cks558x',
    member_name: '很大偉',
    account_status:'正常',
    created_at:'2025-08-15'
  },
  {
    id: '04',
    member_account: 'cks558x',
    member_name: '很大偉',
    account_status:'正常',
    created_at:'2025-08-15'
  },
  {
    id: '05',
    member_account: 'cks558x',
    member_name: '很大偉',
    account_status:'正常',
    created_at:'2025-08-15'
  },
  {
    id: '06',

  },
  {
    id: '07',

  },
  {
    id: '08',

  },
  {
    id: '09',

  },
  {
    id: '10',

  },
  {
    id: '11',

  },
]

</script>

<template>
  <div class="admin-table-wrapper">
      <section class="admin-table-box" :filterTableData="showATable">

                  <div class="admin-table-header">
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
                  <hr>

                <el-table :data="showATable">
                    <el-table-column label="編號" prop="id"/>
                    <el-table-column label="會員帳號" prop="member_account" />
                    <el-table-column label="會員姓名" prop="member_name" />
                    <el-table-column label="帳號狀態" prop="account_status" />
                    <el-table-column label="創建日期" prop="created_at" />
                    <el-table-column label="編輯" align="right"> 
                            <template #default="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                                    編輯查看
                                </el-button>
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
    ::v-deep(.el-table__header th){    //表格頭
      background-color: #9187B9;
      color: white;
      
    }

    ::v-deep(.el-table:not(.el-table--border) .el-table__cell){   //表格全欄位
      text-align: center;
      font-size: 16px;
    }

    ::v-deep(.el-button--small){   //編輯按鈕
      
      background-color: #E48812;
      color: white;
      border-radius: 20px;
      width: 90px;
    }
    
  .admin-table-box{
    
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
        
    .admin-table-header{
      display: flex;
      justify-content: space-between;
      align-items:last baseline;
      margin-bottom: 20px;

        .admin-table-title{
          width: 144px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background-color: #6C89BD;
          border-radius: 10px;
          font-weight: bold;
          
                
        }

          .admin-table-input{
            
            max-width: 300px;
            width: 100%;
            display: flex;
            gap: 20px;

                
              ::v-deep(.el-input__wrapper){
                background-color: rgb(233, 236, 239);
                width: 150px;
              }

              ::v-deep(.el-input__inner){
                width: 150px;
              }

              button{
                width: 80px;
                background-color: #9187B9;
                border-radius: 10px;
                border: none;
              }
          }
    }
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