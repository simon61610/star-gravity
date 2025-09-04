<!-- src/components/admin/management/AdminActivity.vue -->
<script setup>
import { ref } from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminToolbar from '../AdminToolbar.vue'

/* ---------------- 既有狀態 ---------------- */
const deadline  = ref('')             // 報名截止日（單日，DatePicker 綁這個）
const daterange = ref('')             // 活動起訖（datetimerange）
const defaultTime = [
  new Date(2000, 0, 1, 0, 0, 0),
  new Date(2000, 0, 1, 23, 59, 59),
]

const props = defineProps({
  search: { type: String, default: '' }
})

/* ---------------- 活動表格欄位 ---------------- */
const columns = [
  { label:'活動ID',       prop:'id' },
  { label:'活動名稱',     prop:'activity_name' },
  { label:'活動日期',     prop:'activity_date' },
  { label:'報名人數',     prop:'activity_people' },
  { label:'活動資訊',     prop:'activity_info' ,  slot:'編輯',  align:'right' },
  { label:'參加者列表',   prop:'activity_peoplelist' , slot:'管理', align:'right' },
  { label:'顯示狀態',     prop:'display_Status' },
  { label:'活動狀態',     prop:'activity_status' },
  { label:'首頁活動資訊', prop:'activity_checkbox', type:'checkbox' }
]

/* ---------------- 活動列表資料 ---------------- */
const Activitytable = ref([
  {
    id: '01',
    activity_name: '綠島觀星旅',
    activity_date: '2025-08-16 19:00:00 ~ 2025-08-16 23:00:00',
    activity_people: '10',
    display_Status: '上架',
    activity_status: '報名中',
    activity_checkbox: true,
    activity_location: '陽明山國家公園',
    activity_type: '高山觀測',
    activity_tag: '流星雨',
    activity_fee: '',
    activity_deadline: '',
    activity_content: ''
  },
  { id: '02' },
  { id: '03' },
  { id: '04' },
  { id: '05' },
  { id: '06' }
])

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

/* ---------------- 活動編輯用：表單與索引 ---------------- */
const activityForm = ref({
  id: '',
  activity_name: '',
  activity_status: '報名中',   // 報名中/報名截止/活動結束
  display_Status: '上架',       // 上架/下架
  activity_location: '',
  activity_type: '',
  activity_tag: '',
  activity_fee: '',
  activity_deadline: '',
  activity_content: '',
  activity_date: ''             // 顯示在列表上的字串（儲存時組合）
})
const editIndex = ref(-1) // >=0：編輯既有；-1：新增

/* ---------------- 開啟活動編輯（從列） ---------------- */
const handleEdit = (row, index) => {
  console.log(index, row)
  editIndex.value = index
  // 將列資料帶入表單
  activityForm.value = {
    id: row.id ?? '',
    activity_name: row.activity_name ?? '',
    activity_status: row.activity_status ?? '報名中',
    display_Status: row.display_Status ?? '上架',
    activity_location: row.activity_location ?? '',
    activity_type: row.activity_type ?? '',
    activity_tag: row.activity_tag ?? '',
    activity_fee: row.activity_fee ?? '',
    activity_deadline: row.activity_deadline ?? '',
    activity_content: row.activity_content ?? '',
    activity_date: row.activity_date ?? ''
  }

  // 若 activity_date 是 "start ~ end" 字串，嘗試還原 daterange
  if (activityForm.value.activity_date?.includes('~')) {
    const [s, e] = activityForm.value.activity_date.split('~').map(s => s.trim())
    daterange.value = [s, e]
  } else {
    daterange.value = ''
  }

  deadline.value = activityForm.value.activity_deadline || ''
  showActivity.value = true
}

/* ---------------- 開啟活動新增（清表單） ---------------- */
const handleadd = () => {
  editIndex.value = -1
  activityForm.value = {
    id: '',
    activity_name: '',
    activity_status: '報名中',
    display_Status: '上架',
    activity_location: '',
    activity_type: '',
    activity_tag: '',
    activity_fee: '',
    activity_deadline: '',
    activity_content: '',
    activity_date: ''
  }
  daterange.value = ''
  deadline.value  = ''
  showActivity.value = true
}

defineExpose({ handleEdit, handleadd }) // 父層可呼叫新增/編輯

/* ---------------- 儲存活動（寫回表格） ---------------- */
function saveActivity () {
  // 將日期區間與截止日，組合成要存回去的欄位
  const activity_date =
    Array.isArray(daterange.value) && daterange.value.length === 2
      ? `${daterange.value[0]} ~ ${daterange.value[1]}`
      : (activityForm.value.activity_date || '')

  const newRow = {
    ...activityForm.value,
    activity_date,
    activity_deadline: deadline.value
  }

  if (editIndex.value >= 0) {
    // 編輯：覆蓋指定列
    Activitytable.value[editIndex.value] = { ...Activitytable.value[editIndex.value], ...newRow }
  } else {
    // 新增：補一個 id（取現有最大 + 1）
    const maxId = Activitytable.value.reduce((m, r) => Math.max(m, parseInt(r.id || '0', 10)), 0)
    newRow.id = String(maxId + 1).padStart(2, '0')
    Activitytable.value.push(newRow)
  }

  showActivity.value = false
}
</script>

<template>
  <!-- 活動列表 -->
  <AdminTable :columns="columns" :data="Activitytable" :search="props.search">
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
            <select v-model="activityForm.activity_status">
              <option value="報名中">報名中</option>
              <option value="報名截止">報名截止</option>
              <option value="活動結束">活動結束</option>
            </select>
            <select v-model="activityForm.display_Status">
              <option value="上架">活動上架</option>
              <option value="下架">活動下架</option>
            </select>
          </div>
        </div>

        <!-- 活動名稱 -->
        <div class="Admin-Activity-title">
          <input type="text" v-model="activityForm.activity_name" placeholder="請輸入活動名稱" />
        </div>

        <!-- 活動圖片上傳（示意 UI） -->
        <div v-for="img in 3" :key="img" class="Admin-Activity-image">
          <label>活動圖片 {{ img }}：</label>
          <el-upload class="upload-box" drag action="#" :auto-upload="false">
            <div class="el-upload__text">圖片選擇</div>
          </el-upload>
        </div>

        <!-- 地點 -->
        <div class="Admin-Activity-location">
          <h2>地點</h2>
          <select v-model="activityForm.activity_location">
            <option value="">請選擇</option>
            <option value="陽明山國家公園">陽明山國家公園</option>
            <option value="太陽公園">太陽公園</option>
            <option value="屏東天文台">屏東天文台</option>
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
            />
          </div>
        </div>

        <!-- 類別 / tag -->
        <div class="Admin-Activity-type">
          <h1>活動類別</h1>
          <label><input type="radio" name="activityType" value="高山觀測" v-model="activityForm.activity_type" />高山觀測</label>
          <label><input type="radio" name="activityType" value="海邊平台" v-model="activityForm.activity_type" />海邊平台</label>
          <label><input type="radio" name="activityType" value="平地公園" v-model="activityForm.activity_type" />平地公園</label>
          <label><input type="radio" name="activityType" value="天文台"   v-model="activityForm.activity_type" />天文台</label>
        </div>

        <div class="Admin-Activity-tag">
          <h1>活動tag</h1>
          <label><input type="radio" name="activitytag" value="流星雨" v-model="activityForm.activity_tag" />流星雨</label>
          <label><input type="radio" name="activitytag" value="月相"   v-model="activityForm.activity_tag" />月相</label>
          <label><input type="radio" name="activitytag" value="星座"   v-model="activityForm.activity_tag" />星座</label>
          <label><input type="radio" name="activitytag" value="銀河"   v-model="activityForm.activity_tag" />銀河</label>
        </div>

        <!-- 費用 / 截止日 / 內容 -->
        <div class="Admin-Activity-fee">
          <h1>費用</h1>
          <input type="text" v-model="activityForm.activity_fee" placeholder="例如：NT$ 1200" />
        </div>

        <div class="Admin-Activity-deadline">
          <h1>報名截止日</h1>
          <div>
            <el-date-picker v-model="deadline" type="date" value-format="YYYY-MM-DD" />
          </div>
        </div>

        <div class="Admin-Activity-content">
          <h1>活動內容</h1>
          <textarea v-model="activityForm.activity_content" placeholder="請輸入詳細介紹"></textarea>
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
      <AdminTable
        :columns="people_list_Columns"
        :data="people"
        :search="peopleSearch"
        v-model="peopleSearch"
      >
        <template #刪除="{ row }">
          <el-button size="small" @click="delEdit(row.id)">刪除</el-button>
        </template>
      </AdminTable>
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

        ::v-deep(.el-upload-dragger) {
          width: 700px;
          height: auto;
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
