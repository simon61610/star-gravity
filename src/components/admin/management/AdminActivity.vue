<script setup>
import {ref} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';
import AdminToolbar from '../AdminToolbar.vue';
const deadline = ref("") 
const daterange = ref('')

const props = defineProps({
  search: { type: String, default: '' }
})

//欄位定義
const columns = [
    {label:'活動ID',prop:'id'},
    {label:'活動名稱',prop:'activity_name'},
    {label:'活動日期',prop:'activity_date'},
    {label:'報名人數',prop:'activity_people'},
    {label:'活動資訊',prop:'activity_info' , slot:'編輯', align:'right' },
    {label:'參加者列表',prop:'activity_peoplelist' , slot:'管理', align:'right' },
    {label:'顯示狀態',prop:'display_Status'},
    {label:'活動狀態',prop:'activity_status'},
    {label:'首頁活動資訊', prop:'activity_checkbox', type: 'checkbox'  } //勾選欄
]

//欄位資料
const Activitytable = ref([ 
    {
    id: '01',
    activity_name: '綠島觀星旅',
    activity_date: '2025/8/16',
    activity_people: '10',
    display_Status:'上架',
    activity_status:'報名中',
    activity_checkbox:true
} ,
{
    id: '02',
}  ,
{
    id: '03',
}  ,
{
    id: '04',
}  ,
{
    id: '05',
}  ,
{
    id: '06',
}  
])


const selectedPerson = ref(null)

/*----------------參加者編輯按鈕+資料渲染------------------*/
const peopleEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
    console.log(index, row)
    
    selectedPerson.value = {...row }
/*打開燈箱*/
  showpeople.value = true;
}


/*----------------活動列表---------------------------*/
const handleEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
    console.log(index, row)

/*打開燈箱*/
  showActivity.value = true;
}



/*----------------刪除功能--------------------*/
function delEdit(id) {
  // 找到 index
  const idx = people.value.findIndex(o => o.id === id)
  if (idx !== -1) {
    people.value.splice(idx, 1) // 從陣列移除
  }
}

/*-------------人員假資料----------------*/
const people_list_Columns = [
    {label:"報名編號",prop:'id'},
    {label:"會員ID"},
    {label:"姓名"},
    {label:"姓別"},
    {label:"手機"},
    {label:"e-mail"},
    {label:"報名日期"},
    {label:"操作",slot:'刪除', align:'right'}
]
const peopleSearch = ref('') 
const people = ref([ 
    {
        id:'01'

    }
])
/*---------------儲存功能------------------*/
function savepeople(table,selected) {                                                                //findIndex()是JS函數 找不到就回傳 -1
  const idx = table.value.findIndex(p => p.id === selected.id) //找更改資料的那筆資料對於 membertable[idx] 是在第idx位置
  if (idx !== -1) {                                       //如果idx不是-1 表示有這筆資料
    table.value[idx] = {...selected.value }  //membertable.value[idx] 這是整個資料陣列  = {}　→資料的值
  }
  showpeople.value = false
}

/*---------------彈窗關閉----------------*/
const showpeople = ref(false);
const showActivity = ref(false);
function close(type) {
  if (type === 'activity') showActivity.value = false
  if (type === 'people') showpeople.value = false
}


 

</script>
<template>
    <AdminTable :columns="columns" :data="Activitytable" :search="props.search">
        <template #編輯="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            編輯 
            </el-button> 
        </template>

        <template #管理="{ row, $index }">
            <el-button size="small" @click="peopleEdit(row, $index)"> 
            管理
            </el-button> 
        </template>
    </AdminTable>
<!-----------------活動管理頁面------------------------>
    <div v-if = "showActivity" class="Admin-Activity-modal"  @click.self="close('activity')">
        <form  class="Admin-activity-form" action="">
            <div class="Admin-Activity-h1">
                <h1>活動編輯查看</h1>
            </div>
            <div class="Admin-Activity-wapper">
                <div class="Admin-Activity-header">
                    <h2>活動名稱</h2>
                    <div class="Admin-Activity-status">
                        <select name="" id="">
                            <option value="報名中">報名中</option>
                            <option value="報名截止">報名截止</option>
                            <option value="活動結束">活動結束</option>
                        </select>
                        <select name="" id="">
                            <option value="活動上架">活動上架</option>
                            <option value="活動下架">活動下架</option>
                        </select>
                    </div>
                </div>
                <div class="Admin-Activity-title">
                    <input type="text">
                </div>
                <div v-for="img in 3" :key="i" class="Admin-Activity-image">
                    <label>活動圖片{{ img }}:</label>
                    <el-upload
                    class="upload-box"
                    drag
                    action="#"
                    :auto-upload="false"
                    >
                    <div class="el-upload__text">圖片選擇</div>
                    </el-upload>
                </div>
                <div class="Admin-Activity-location">
                    <h2>地點</h2>
                    <select name="" id="">
                        <option value="陽明山國家公園">陽明山國家公園</option>
                        <option value="太陽公園">太陽公園</option>
                        <option value="屏東天文台">屏東天文台</option>
                    </select>
                </div>
        
                <div class="Admin-Activity-daterange">
                    <div class="block">

                        <p>活動日期</p>
                            <el-date-picker
                                v-model="daterange"
                                type="datetimerange"
                                start-placeholder="Start date"
                                end-placeholder="End date"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                :default-time="defaultTime"
                                :show-seconds="true"
                            />

                    </div>
                </div>

                <div class="Admin-Activity-type">
                    <h1>活動類別</h1>
                    <label>
                        <input type="radio" name="activityType" value="高山觀測">高山觀測
                    </label>
                    <label>
                        <input type="radio" name="activityType" value="海邊平台">海邊平台
                    </label>
                    <label>
                        <input type="radio" name="activityType" value="平地公園">平地公園
                    </label>
                    <label>
                        <input type="radio" name="activityType" value="天文台">天文台
                    </label>
                        
                </div>
                <div class="Admin-Activity-tag">
                  <h1>活動tag</h1>
                  <label>
                    <input type="radio" name="activitytag" value="流星雨">流星雨
                  </label>
                  <label>
                    <input type="radio" name="activitytag" value="月相">月相
                  </label>
                    <label>
                    <input type="radio" name="activitytag" value="星座">星座
                  </label>
                  <label>
                    <input type="radio" name="activitytag" value="銀河">銀河
                  </label>
                </div>
                <div class="Admin-Activity-fee">
                  <h1>費用</h1>
                  <input type="text">
                </div>
                <div class="Admin-Activity-deadline">
                  <h1>報名截止日</h1>
                  <div>
                    <el-date-picker v-model="deadline" type="date"/>
                  </div>
                </div>
                <div class="Admin-Activity-content">
                  <h1>活動內容</h1>
                  <textarea name="" id=""></textarea>
                </div>
            </div>
            <div class='Admin-people-button'>
              <button type="button" @click="close('activity')">關閉</button>
              <button type="button" @click="savepeople(people, selectedPerson.id)">儲存</button>
            </div>       

        </form>

    </div>

<!-----------------人員管理頁面------------------------>
     <div v-if="showpeople" class="Admin-Activity-modal"  @click.self="close('people')">
        <form class="Admin-people-form">
            <div class="Admin-Activity-h1">
                <h1>編輯查看</h1>
            </div>
            <AdminToolbar/>
            <AdminTable :columns="people_list_Columns"  :data="people" :search='peopleSearch' v-model="peopleSearch">
                <template #刪除="{ row, $index  }">
                    <el-button size="small" @click="delEdit(row.id )" > 
                    刪除 
                    </el-button> 
                </template>
            </AdminTable>
            <div class='Admin-people-button'>
                <button type="button" @click="close('people')" >關閉</button>
                <button type="button" @click="savepeople(people, selectedPerson.id)">儲存</button>
            </div>       
        </form>
    </div>
</template>
    

<style scoped lang="scss">

/*-------------活動列表CSS------------------*/
.Admin-activity-form {

    width: 1000px;        
    height: 800px;
    
    .Admin-Activity-wapper {
        margin: 0 auto;
        width: 800px; 
        .Admin-Activity-header{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
      
      .Admin-Activity-status {
        
        top: 8px;
        right: 16px;
        display: flex;
        gap: 8px;

        select {
          min-width: 110px;
          height: 28px;
          padding: 0 8px;
          font-size: 13px;
          border: 1px solid #cfcfcf;
          border-radius: 6px;
        }
      }

      .Admin-Activity-title {
        input {
          width: 800px;
          height: 28px;
          font-size: 13px;
          border: 1px solid #cfcfcf;
        }
      }

      .Admin-Activity-image {
        margin-top: 12px;

        > label {
          display: block;
          font-size: 13px;
          margin: 0 0 6px;
        }

        .upload-box {
          width: 100%;
          height: 160px;
          border: 1px dashed #bfbfbf;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          ::v-deep(.el-upload-dragger){
            width: 700px;
            height: auto;
          }
        }

        & + .Admin-Activity-image { margin-top: 14px; }
      }

      .Admin-Activity-location {
        h2 { margin: 12px 0 6px; font-size: 14px; }

        select {
          width: 100%;
          height: 28px;
          padding: 0 8px;
          font-size: 13px;
          border: 1px solid #cfcfcf;
        }
      }

      .Admin-Activity-daterange {
        margin-top: 12px;
        
        .block {
          display: flex;
          align-items: center;
          gap: 8px;

          > p { margin: 0; font-size: 13px; }
        }
        
        /* 覆寫 Element Plus datetimerange 外觀尺寸 */
        ::v-deep(.el-date-editor--datetimerange) {
           
        
          width: 430px;               /* 保持現有視覺比例*/
        

          .el-input__wrapper { min-height: 28px; padding: 0 8px; }
          .el-range-input     { width: 300px; font-size: 13px; }
          .el-range-separator { width: 24px;  padding: 0; text-align: center; font-size: 13px; }
          
            }   
        }

      /* 類別 / tag / 費用 / 截止日：保持四欄同列 */
      .Admin-Activity-type,
      .Admin-Activity-tag,
      .Admin-Activity-fee,
      .Admin-Activity-deadline {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
      }

      .Admin-Activity-type     { width: 180px; margin-right: 20px; }
      .Admin-Activity-tag      { width: 180px; margin-right: 20px; }
      .Admin-Activity-fee      { width: 150px; margin-right: 20px; }
      .Admin-Activity-deadline { width: 160px; margin-right: 0;  }
      .Admin-Activity-type h1,
      .Admin-Activity-tag h1,
      .Admin-Activity-fee h1,
      .Admin-Activity-deadline h1 {
        font-size: 14px;
        margin: 0 0 6px;
      }

      .Admin-Activity-type label,
      .Admin-Activity-tag  label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        line-height: 22px;
      }

      .Admin-Activity-fee {
        input {
          width: 120px;
          height: 28px;
          padding: 0 8px;
          border: 1px solid #cfcfcf;
          font-size: 13px;
        }
      }

      .Admin-Activity-deadline {
        > div { width: 160px; }

        ::v-deep(.el-date-editor) {
          width: 160px;

          .el-input__wrapper {
            min-height: 28px;
            padding: 0 8px;
          }
        }
      }

      .Admin-Activity-content {
        margin-top: 16px;
        textarea {
            margin-top: 16px;
            width: 750px;
            height: 160px;
            resize: none;
            padding: 8px;
            border: 1px solid #cfcfcf;
            font-size: 16px;
        }
      }

      .Admin-people-button {
        display: flex;
        justify-content: center;
        gap: 18px;
        margin: 14px 0 6px;

        button {
          min-width: 80px;
          height: 30px;
          padding: 0 18px;
          border: 1px solid #cfcfcf;
          border-radius: 6px;
          background: #eee;
          font-size: 13px;
          cursor: pointer;
        }
      }
    }
 
    
  }



/*-------------參加列表SCSS排版-------------*/
form{
        background-color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        margin-bottom: 250px;
        border-radius: 10px;
        width: 1100px;
        height: 800px;
        overflow-y: auto;
        overflow-x: hidden; 
        

        .Admin-Activity-h1{
            
            border-radius:  10px 10px  0 0 ;
            background-color: #9187B9;
            margin-bottom: 30px;

            h1{ 
                width: 100%;
                color: white;
                padding: 18px ;
            }

        }

        .Admin-people-button{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            button{
                border-radius: 20px;
                width: 120px;
                height: 40px;

                &:hover{
                background-color: gray;
                color: white;
                }
            }
        }
}



/*用來消除table上面搜尋列的左側標題扭*/
:deep(.admin-table-title) {
  opacity: 0 !important;

}




.Admin-Activity-modal{
        position: fixed;
         z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }

</style>