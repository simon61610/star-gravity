<!-- src/components/admin/management/AdminActivity.vue -->
<script setup>
import { ref,computed } from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminToolbar from '../AdminToolbar.vue'
import {activityAPI} from '@/api/activityAPI.js'


/* ---------------- 既有狀態 ---------------- */
const selected_activity = ref({})
const selectedLocation = ref('')
const editIndex = ref(-1)
const emit = defineEmits(['refresh','added','updated'])
const deadline  = ref('')             // 報名截止日（單日，DatePicker 綁這個）
const daterange = ref('')             // 活動起訖（datetimerange）
const defaultTime = [
  new Date(2000, 0, 1, 0, 0, 0),
  new Date(2000, 0, 1, 23, 59, 59),
]

const props = defineProps({
  search: { type: String, default: '' },
  eventTable: { type: Array, default: () => [] },
  location: {type: Array,default: () => [] }
})

//儲存checkbox顯示狀態
function updateHighlight(row) {
  activityAPI('update', row) // 把整個 row 傳回去
    .then(res => {
      console.log("首頁推薦更新成功", res.data)
    })
    .catch(err => {
      console.error("更新失敗", err)
    })
}
// function updateHighlight(row) {
//   const updatedRow = {
//     ...row, // 保留 row 其他欄位
//     homepage_highlight: row.homepage_highlight
//   }
//   activityAPI('update', { ID: row.ID, updatedRow })
//     .then(res => {
//       console.log("首頁推薦更新成功", res.data)
//     })
//     .catch(err => {
//       console.error("更新失敗", err)
//     })
// }

// 搜尋過濾活動
const filteredEvent = computed(() => {
  if (props.search) {
    // 有搜尋字串 → 過濾
    return props.eventTable.filter(a =>
      String(a.ID).includes(props.search) //針對eventTable.value陣列裡面的id做比較  例如 String("123") .includes(45) 不符合所以不顯示
    )
  } else {
    // 沒搜尋字串 → 全部顯示
    return props.eventTable
  }
})


/* ---------------- 活動表格欄位 ---------------- */
const columns = [
  { label:'活動ID',       prop:'ID' },
  { label:'活動名稱',     prop:'event_name' },
  { label:'活動日期',     prop:'event_date_display' },
  { label:'報名人數',     prop:'registration_count' },
  { label:'活動資訊',     slot:'編輯',  align:'right' },
  { label:'參加者列表',   slot:'管理', align:'right' },
  { label:'顯示狀態',     prop:'is_active_display' },
  { label:'活動狀態',     prop:'event_status' },
  { label:'首頁活動資訊', prop:'homepage_highlight', type:'checkbox' }
]


/* ---------------- 人員清單 ---------------- */
const selectedPerson = ref(null)

const people_list_Columns = [
  { label:"報名編號", prop:'id' },
  { label:"會員ID",   prop:'member_id' },
  { label:"姓名",     prop:'name' },
  { label:"性別",     prop:'gender' },
  { label:"手機",     prop:'phone' },
  { label:"e-mail",   prop:'email' },
  { label:"報名日期", prop:'apply_date' },
  { label:"操作",     slot:'刪除', align:'right' }
]
const peopleSearch = ref('')
const people = ref([{ id: '01' }])

/* ---------------- 彈窗顯示控制 ---------------- */
const showpeople   = ref(false)
const showActivity = ref(false)
function close(type) {
  if (type === 'activity') showActivity.value = false
  if (type === 'people')   showpeople.value   = false
}

/* ---------------- 人員相關 ---------------- */
const peopleEdit = (row, index) => {
  console.log(index, row)
  selectedPerson.value = { ...row }
  showpeople.value = true
}
function delEdit(id) {
  const idx = people.value.findIndex(o => o.id === id)
  if (idx !== -1) people.value.splice(idx, 1)
}
function savepeople(table, selected) {
  // 保持與你原本呼叫方式相容：傳入 id
  const idx = table.value.findIndex(p => p.id === selected)
  if (idx !== -1 && selectedPerson.value) {
    table.value[idx] = { ...selectedPerson.value }
  }
  showpeople.value = false
}


/* ---------------- 開啟活動編輯（從列） ---------------- */
const handleEdit = (row, index) => {
  console.log(index, row)
  editIndex.value = index
  // 將列資料帶入表單
  selected_activity.value = {
    ID: row.ID,
    event_name: row.event_name ?? '',
    event_date: row.event_date ?? '',
    event_time: row.event_time ?? '',
    event_deadline: row.event_deadline ?? '',
    event_place: row.event_place ?? '',
    event_price: row.event_price ?? '',
    registration_count: row.registration_count ?? '',
    event_description: row.event_description ?? '',
    is_active: Number(row.is_active ?? 0),
    event_status: row.event_status ?? '報名中',
    homepage_highlight: Number(row.homepage_highlight ?? 0),
    image: row.image ?? '',
    tag: row.tag ?? '',
    category: row.category ?? ''
  }

  // 還原日期區間
  if (row.event_date && row.event_date.includes('~')) {
    const [start, end] = row.event_date.split('~').map(s => s.trim())
    daterange.value = [start, end] // 還原到 date-picker
  } else {
    daterange.value = []
  }

  deadline.value = row.event_deadline || ''
  showActivity.value = true
}

/* ---------------- 開啟活動新增（清表單） ---------------- */
const handleadd = () => {
  editIndex.value = -1
  selected_activity.value = {
    ID: '',
    event_name: '',
    event_date: '',
    event_time: '',
    event_deadline: '',
    event_place: '',
    event_price: '',
    registration_count: '',
    event_description: '',
    is_active: 0,            // 預設不上架
    event_status: '草稿',    // 預設狀態
    homepage_highlight: 0,   // 預設不推薦
    image: '',
    tag: '',
    category: ''
  }
  daterange.value = []
  deadline.value  = ''
  showActivity.value = true
}

defineExpose({ handleEdit, handleadd }) // 父層可呼叫新增/編輯

/* ---------------- 儲存活動（寫回表格） ---------------- */
function saveActivity () {

  console.log('送出前的資料:', selected_activity.value)
  // 將日期區間與截止日，組合成要存回去的欄位

  const event_date = Array.isArray(daterange.value) && daterange.value.length === 2
  ? `${daterange.value[0]} ~ ${daterange.value[1]}`
  : ''
  const newRow = {
    ...selected_activity.value,
    event_date,       // 2025-09-10
    event_deadline: selected_activity.value.event_deadline // 2025-09-08 23:59:59
  }

  if (!newRow.ID) { // 沒有 ID → 新增
    return activityAPI('add', newRow)
      .then(res => {
        emit('added', res.data) 
        showActivity.value = false
      })
  } else { // 有 ID → 更新
    return activityAPI('update', newRow)
      .then(res => {
        emit('updated', res.data)  //子層通知父層
        showActivity.value = false
      })
  }

  
}
</script>

<template>
  <!-- 活動列表 -->
  <AdminTable :columns="columns" :data="filteredEvent" :search="props.search" @checkbox-change="updateHighlight">
    <template #編輯="{ row, $index }">
      <el-button size="small" @click="handleEdit(row, $index)">編輯</el-button>
    </template>
    <template #管理="{ row, $index }">
      <el-button size="small" @click="peopleEdit(row, $index)">管理</el-button>
    </template>
  </AdminTable>

  <!-- 活動管理彈窗 -->
  <div v-if="showActivity" class="Admin-Activity-modal" @click.self="close('activity')">
    <form class="Admin-activity-form" action="">
      <div class="Admin-Activity-h1">
        <h1>活動編輯查看</h1>
      </div>

      <div class="Admin-Activity-wapper">
        <!-- 狀態列 -->
        <div class="Admin-Activity-header">
          <h2>活動名稱</h2>
          <div class="Admin-Activity-status">
            <select v-model="selected_activity.event_status">
              <option value="報名中">報名中</option>
              <option value="報名截止">報名截止</option>
              <option value="活動結束">活動結束</option>
            </select>
            <select v-model="selected_activity.is_active" placeholder="選擇狀態">
              <option label="上架" :value="1">活動上架</option>
              <option label="下架" :value="0">活動下架</option>
            </select>
          </div>
        </div>

        <!-- 活動名稱 -->
        <div class="Admin-Activity-title">
          <input type="text" v-model="selected_activity.event_name" placeholder="請輸入活動名稱" />
        </div>

        <!-- 活動圖片上傳（示意 UI） -->
        <div v-for="img in 3" :key="img" class="Admin-Activity-image">
           <label>活動圖片:</label>                                     <!-- <label>活動圖片 {{ img }}:</label> -->
          <el-upload class="upload-box" drag action="#" :auto-upload="false"
          list-type="picture-card">
            <div class="el-upload__text">圖片選擇</div>
          </el-upload>
        </div>

        <!-- 地點 -->
        <div class="Admin-Activity-location">
          <h2>地點</h2>
          <select v-model="selectedLocation">
            <option value="">請選擇</option>
            <option v-for="(item, i) in props.location" :key="i" :value="item.location_name || item">
              {{ item.location_name || item }}
            </option>
            <!-- <option value="陽明山國家公園">陽明山國家公園</option>
            <option value="太陽公園">太陽公園</option>
            <option value="屏東天文台">屏東天文台</option> -->
          </select>
        </div>

        <!-- 活動日期區間 -->
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
              range-separator="~"
            />
          </div>
        </div>

        <!-- 類別 / tag -->
        <div class="Admin-Activity-type">
          <h1>活動類別</h1>
          <label><input type="radio" name="activityType" value="高山觀測" v-model="selected_activity.category" />高山觀測</label>
          <label><input type="radio" name="activityType" value="海邊平台" v-model="selected_activity.category" />海邊平台</label>
          <label><input type="radio" name="activityType" value="平地公園" v-model="selected_activity.category" />平地公園</label>
          <label><input type="radio" name="activityType" value="天文台"   v-model="selected_activity.category" />天文台</label>
        </div>

        <div class="Admin-Activity-tag">
          <h1>活動tag</h1>
          <label><input type="radio" name="activitytag" value="流星雨" v-model="selected_activity.tag" />流星雨</label>
          <label><input type="radio" name="activitytag" value="月相"   v-model="selected_activity.tag" />月相</label>
          <label><input type="radio" name="activitytag" value="星座"   v-model="selected_activity.tag" />星座</label>
          <label><input type="radio" name="activitytag" value="銀河"   v-model="selected_activity.tag" />銀河</label>
        </div>

        <!-- 費用 / 截止日 / 內容 -->
        <div class="Admin-Activity-fee">
          <h1>費用</h1>
          <input type="text" v-model="selected_activity.event_price" placeholder="例如：NT$ 1200" />
        </div>

        <div class="Admin-Activity-deadline">
          <h1>報名截止日</h1>
          <div>
            <el-date-picker v-model="selected_activity.event_deadline" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" />
          </div>
        </div>

        <div class="Admin-Activity-content">
          <h1>活動內容</h1>
          <textarea v-model="selected_activity.event_description" placeholder="請輸入詳細介紹"></textarea>
        </div>

        <!-- 底部按鈕 -->
        <div class="Admin-people-button">
          <button type="button" @click="close('activity')">關閉</button>
          <button type="button" @click="saveActivity()">儲存</button>
        </div>
      </div>
    </form>
  </div>

  <!-- 人員管理彈窗 -->
  <div v-if="showpeople" class="Admin-Activity-modal" @click.self="close('people')">
    <form class="Admin-people-form">
      <div class="Admin-Activity-h1">
        <h1>編輯查看</h1>
      </div>
      <AdminToolbar />
      <!-- <AdminTable
        :columns="people_list_Columns"
        :data="people"
        :search="peopleSearch"
        v-model="peopleSearch"
      >
        <template #刪除="{ row }">
          <el-button size="small" @click="delEdit(row.id)">刪除</el-button>
        </template>
      </AdminTable> -->
      <div class="Admin-people-button">
        <button type="button" @click="close('people')">關閉</button>
        <button type="button" @click="savepeople(people, selectedPerson?.id ?? selectedPerson?.value?.id)">儲存</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
/*-------------活動列表彈窗內部------------------*/
.Admin-activity-form {
  width: 1000px;
  height: 700px;

  .Admin-Activity-wapper {
    margin: 0 auto;
    width: 800px;

    .Admin-Activity-header {
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

        .el-upload__text{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        }

        :deep(.el-upload-list--picture-card .el-upload-list__item){
          width: 700px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }

        ::v-deep(.el-upload-dragger) {
          width: 700px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        ::v-deep(.el-upload.is-drag){
          width: 700px;
          position:relative
         
        }
        
      }

      & + .Admin-Activity-image {
        margin-top: 14px;
      }
    }

    .Admin-Activity-location {
      h2 {
        margin: 12px 0 6px;
        font-size: 14px;
      }

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

        > p {
          margin: 0;
          font-size: 13px;
        }
      }

      /* 覆寫 Element Plus datetimerange 外觀尺寸 */
      ::v-deep(.el-date-editor--datetimerange) {
        width: 430px;

        .el-input__wrapper {
          min-height: 28px;
          padding: 0 8px;
        }
        .el-range-input {
          width: 300px;
          font-size: 13px;
        }
        .el-range-separator {
          width: 24px;
          padding: 0;
          text-align: center;
          font-size: 13px;
        }
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

    .Admin-Activity-type {
      width: 180px;
      margin-right: 20px;
    }
    .Admin-Activity-tag {
      width: 180px;
      margin-right: 20px;
    }
    .Admin-Activity-fee {
      width: 150px;
      margin-right: 20px;

      input {
        width: 120px;
        height: 28px;
        padding: 0 8px;
        border: 1px solid #cfcfcf;
        font-size: 13px;
      }
    }
    .Admin-Activity-deadline {
      width: 160px;
      margin-right: 0;

      > div {
        width: 160px;
      }

      ::v-deep(.el-date-editor) {
        width: 160px;

        .el-input__wrapper {
          min-height: 28px;
          padding: 0 8px;
        }
      }
    }

    .Admin-Activity-type label,
    .Admin-Activity-tag label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      line-height: 22px;
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

/*-------------參加列表/彈窗外層-------------*/
form {
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

  .Admin-Activity-h1 {
    border-radius: 10px 10px 0 0;
    background-color: #9187b9;
    margin-bottom: 30px;

    h1 {
      width: 100%;
      color: white;
      padding: 18px;
    }
  }

  .Admin-people-button {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    button {
      border-radius: 20px;
      width: 120px;
      height: 40px;

      &:hover {
        background-color: gray;
        color: white;
      }
    }
  }
}

/* 用來消除 table 上面搜尋列的左側標題鈕（視你的 AdminTable 實作） */
:deep(.admin-table-title) {
  opacity: 0 !important;
}

/* 灰底遮罩 */
.Admin-Activity-modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}
</style>
