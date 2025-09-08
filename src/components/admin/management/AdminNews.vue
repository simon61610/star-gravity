  <script setup>
/* ======================= 匯入模組 ======================= */
import { ElMessage } from "element-plus"
import { ref, computed, nextTick,onMounted } from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue'
import { articleAPI } from '@/api/articleAPI.js'
import { tagAPI } from '@/api/tagAPI.js'
import { Plus } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/admin.js'

/* ======================= 基本設定 ======================= */
// props & emit
const emit = defineEmits(["added"])
const props = defineProps({
  search: { type: String, default: '' }
})

// 狀態變數
const uploadRef = ref(null)
const Newstable = ref([])        // 文章列表資料
const fileList = ref([])         // 上傳圖片 fileList
const selected_tag = ref(null)   // 選中的 tag
const selected_article = ref({}) // 選中的文章
const admin = useAuthStore()

// 彈窗顯示狀態
const showtag = ref(false)
const showarticle = ref(false)

/* ======================= 表格欄位定義 ======================= */
const columns = [
  { label: '文章編號', prop: 'ID' },   // prop 要對應 DB 欄位
  { label: '上架日期', prop: 'publish_date' },
  { label: '標題', prop: 'title' },
  { label: '文章分類', prop: 'category' },
  { label: '文章狀態', prop: 'is_active' },
  { label: '最後更新日期', prop: 'updated_at' },
  { label: '標籤', prop: 'tags', slot: 'tag', align: 'right' },
  { label: '編輯查看', prop: 'actions', slot: 'edit', align: 'right' }
]

/* ======================= 資料初始化 ======================= */
// 顯示資料庫資料
articleAPI('get')
  .then(res => {
    console.log(res.data)
    Newstable.value = res.data
  })

// 搜尋過濾文章
const filteredArticles = computed(() => {
  if (props.search) {
    // 有搜尋字串 → 過濾
    return Newstable.value.filter(a =>
      String(a.ID).includes(props.search) //針對Newstable.value陣列裡面的id做比較  例如 String("123") .includes(45) 不符合所以不顯示
    )
  } else {
    // 沒搜尋字串 → 全部顯示
    return Newstable.value
  }
})

//測試登入狀態
onMounted(async () => {
  await admin.checkSession()
  if (!admin.isLoggedIn) {
    router.push('/AdminLoginPage') // 沒登入就跳回登入頁
  }
})

  /* =========================================================
   A. 文章編輯 / 新增（打開燈箱、帶入資料）
   ---------------------------------------------------------
   - articleEdit：從列表帶入既有文章 → 預先填入表單與 fileList
   - articleadd：清空表單 → 進入新增模式
   =======================================================*/

  /** 編輯文章（載入既有資料，預設顯示舊圖） */
  const articleEdit = (row, index) => {
    console.log(' 子層 addArticle 被呼叫了！')
    console.log(row, index)
    console.log('傳進來的 row:', row)

    selected_article.value = {
      ID: row.ID,
      publishDate: row.publishDate,
      updatedAt: row.updatedAt,
      category: row.category,
      is_active: row.is_active,
      title: row.title,
      image: row.image,
      content: row.content
    }
    
    // 若已有圖片，將「正式 URL」放進 fileList，標記為 success（顯示縮圖但不重傳）
    fileList.value = row.image
      ? [{                       //? 條件1  : 條件2
          name: row.image,
          url: row.image,
          status: 'success', // 舊圖，標記成功，讓 el-upload 顯示但不會重傳
          uid: Date.now()    // 一定要有 uid，el-upload 才能追蹤
        }]
      : []

    showarticle.value = true // 打開燈箱
  }

  /** 新增文章（清空欄位，顯示「＋」可挑檔） */
  const articleadd = () => {
    selected_article.value = {
      category: '',
      is_active: '',
      title: '',
      image: '',
      content: ''
    }
    fileList.value = [] // 清空，讓＋出現
    showarticle.value = true
  }


  /* =========================================================
    B. 上傳流程（依實際觸發順序排列）
    ---------------------------------------------------------
    1) handleChange：使用者挑檔 → 產生 blob 預覽 → 同步 fileList
    2) handleSuccess：後端上傳成功 → 以正式 URL 覆蓋 blob → 存文章
    3) handleError：上傳失敗 → 記錄錯誤
    =======================================================*/

  /** 1 使用者挑檔（此時多為 blob 預覽；同步最新 fileList 到本地狀態） */
  const handleChange = (file, fileListNow) => {
    console.log("挑檔案:", file)
    console.log("最新 fileList:", fileListNow)
    // 把 Element Plus 內部維護的最新檔列，寫回到你自己可控的響應式狀態
    // 這樣新檔案 (ready) 才能進來並顯示預覽（通常是 blob: URL）
    fileList.value = fileListNow
  }

  /** 2) 上傳圖片 - 成功（取得正式 URL → 覆蓋 blob → 立刻存文章） */
  const handleSuccess = (res, file) => {
    console.log("上傳成功:", res)

    if (res.success && res.url) {
      // 將文章 image 設為後端回傳的「正式 URL」
      selected_article.value.image = res.url

      // 用正式 URL 覆蓋 fileList（清掉先前的 blob 預覽，確保重整仍可顯示）
      fileList.value = [{
        name: file.name,
        url: res.url,
        status: 'success'
      }]

      // ★ 上傳成功 → 繼續存文章
      save(selected_article.value)
    } else {
      console.error("後端回傳錯誤:", res)
    }
  }

  /** 3) 上傳圖片 - 失敗（不存文章，提示錯誤） */
  const handleError = (err) => {
    console.error("上傳失敗:", err)
  }

  // /* ======================= 文章編輯 / 新增 ======================= */
  // // 編輯文章
  // const articleEdit = (row, index) => {
  //   console.log(' 子層 addArticle 被呼叫了！')
  //   console.log(row, index)
  //   console.log('傳進來的 row:', row)

  //   selected_article.value = {
  //     ID: row.ID,
  //     publishDate: row.publishDate,
  //     updatedAt: row.updatedAt,
  //     category: row.category,
  //     is_active: row.is_active,
  //     title: row.title,
  //     image: row.image,
  //     content: row.content
  //   }
    
  //   fileList.value = row.image
  //   ? [{
  //       name: row.image,
  //       url: row.image,
  //       status: 'success', // 舊圖，標記成功，讓 el-upload 顯示但不會重傳
  //       uid: Date.now()    // ★ 一定要有 uid，el-upload 才能追蹤
  //     }]
  //   : []

  //   showarticle.value = true // 打開燈箱
  // }

  // // 新增文章
  // const articleadd = () => {
  //   selected_article.value = {
  //     category: '',
  //     is_active: '',
  //     title: '',
  //     image: '',
  //     content: ''
  //   }
  //   fileList.value = [] // 清空，讓＋出現
  //   showarticle.value = true
  // }

  // // 上傳圖片 - 成功
  // const handleSuccess = (res, file) => {
  //   console.log("上傳成功:", res)

  //   if (res.success && res.url) {
  //     selected_article.value.image = res.url

  //     // 替換掉之前的 blob
  //     fileList.value = [{
  //       name: file.name,
  //       url: res.url,
  //       status: 'success'
  //     }]
  //     // ★上傳成功 → 繼續存文章
  //     save(selected_article.value)
  //   } else {
  //     console.error("後端回傳錯誤:", res)
  //   }
  // }

  // // 上傳圖片 - 失敗
  // const handleError = (err) => {
  //   console.error("上傳失敗:", err)
  // }

  // //同步圖片上傳後的檔案
  // const handleChange = (file, fileListNow) => {
  //   console.log("挑檔案:", file)
  //   console.log("最新 fileList:", fileListNow)
  //   fileList.value = fileListNow //  把 Element Plus 內部維護的最新檔列，寫回到你自己可控的響應式狀態 這樣新檔案 (ready) 才能進來
  // }

//限制圖片解析度
function beforeUpload(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const ratio = img.width / img.height
      URL.revokeObjectURL(img.src)

      // 容忍範圍 1.3 ~ 1.7，3:2=1.5
      if (ratio < 1.3 || ratio > 1.7) {
        ElMessage.error("圖片比例太奇怪，請上傳接近 3:2 的圖片")
        reject(false)
      } else if (Math.abs(ratio - 1.5) > 0.01) {
        // 不是精準 3:2 → 只提示，仍允許上傳
        ElMessage.warning("建議使用 3:2 的圖片，否則前台會被裁切")
        resolve(true)
      } else {
        resolve(true) // 完美 3:2 
      }
    }
    img.src = URL.createObjectURL(file)
  })
}
// 暴露方法給父層
defineExpose({ articleEdit, articleadd })

/* ======================= Tag 編輯 ======================= */
// 編輯 Tag
const tagEdit = (row, index) => {
  console.log(index, row)
  tagAPI('get', { article_id: row.ID }) //tagAPI('action,data={}') data表示我要向後端索取什麼資料 這裡我要取得文章ID
    .then(res => {
      console.log(res.data)
      dynamicTags.value = res.data
        .filter(t => t.ID === row.ID && t.tag_name) // js用法迭代陣列過濾出對應文章的 tag
        .map(t => t.tag_name)                      // js用法迭代陣列只取出文字
    })
  selected_article.value = { ...row }
  showtag.value = true // 打開燈箱
}

/* ======================= 儲存文章 ======================= */
function save(selected) {
  console.log('=== SAVE DEBUG ===')
  // 內文字數檢查
  if (!selected.content || selected.content.trim().length < 50) {
    ElMessage.error("內文至少需要 50 個字")
    return
  }
  console.log('uploadRef:', uploadRef.value)
  console.log('uploadFiles:', uploadRef.value?.uploadFiles)
  console.log('fileList:', fileList.value)

  const hasNewFile = fileList.value.some(f => f.status === 'ready') // 判斷是否有新檔
  if (uploadRef.value && hasNewFile) {
    // 有新圖 → 先上傳，上傳成功後 handleSuccess 再呼叫 save()
    return uploadRef.value.submit()
  }

  if (!selected || !selected.ID) { // 沒有 ID → 新增
    return articleAPI('add', selected)
      .then(res => {
        Newstable.value.push(res.data)
        showarticle.value = false
      })
  } else { // 有 ID → 更新
    return articleAPI('update', selected)
      .then(res => {
        const index = Newstable.value.findIndex(a => a.ID === selected.ID) //筆對資料是否有這個value
        if (index !== -1) { //如果index不等於-1 表示有資料
          Newstable.value[index] = { ...selected }
        }
        showarticle.value = false
      })
  }
}

/* ======================= 彈窗控制 ======================= */
function close(type) {
  if (type === 'tag') showtag.value = false
  if (type === 'article') showarticle.value = false
}

/* ======================= Tag 動態新增 ======================= */
const inputValue = ref("")       // el-input 的輸入值
const dynamicTags = ref([])      // tag 陣列
const inputVisible = ref(false)  // 控制輸入框顯示
const InputRef = ref(null)       // input DOM 參考

// 刪除 tag
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

// 顯示輸入框
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value?.focus()
  })
}

// 確認輸入
const handleInputConfirm = () => {
  if (inputValue.value) {
    if(inputValue.value.length > 5){
        ElMessage.error("標籤最多 5 個字");
    }else{
      dynamicTags.value.push(inputValue.value)
    }
  }
  inputVisible.value = false
  inputValue.value = ""
}

// 儲存 Tag
const saveTag = () => {
  tagAPI('add', {
    article_id: selected_article.value.ID,
    tag_name: dynamicTags.value,
  })
    .then(res => {
      console.log('儲存成功', res.data)
      dynamicTags.value = []
      showtag.value = false
    })
    .catch(err => {
      console.log('儲存失敗', err)
    })
}
</script>

  <template>
      <AdminTable :columns="columns" :data="filteredArticles" :search="props.search">
          <template #tag="{ row, $index }">
            <el-button size="small" @click="tagEdit(row, $index)"> 
              編輯標籤 
            </el-button> 
          </template>
          
          <template #edit="{ row, $index }">
            <el-button size="small" @click="articleEdit(row, $index)"> 
              編輯查看
            </el-button> 
          </template>
      </AdminTable>


      <!--------------------標籤頁面------------------------>
      <div v-if="showtag" class="Admin-News-modal"  @click.self="close('tag')">
          <form class="Admin-News-form" @submit.prevent>
              <div class="Admin-News-h1">
                <h1>標籤新增刪除</h1>
              </div>
              <div class="flex gap-2">
                <el-tag
                  v-for="tag in dynamicTags"
                  :key="tag"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  >
                  {{ tag }}
                  </el-tag>
                  <el-input
                  v-if="inputVisible"
                  ref="InputRef"
                  v-model="inputValue"
                  class="w-20"
                  size="small"
                  @keydown.enter.prevent="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showInput" style="margin-left: 10px;">
                  + 新增標籤
                </el-button>
              </div>
            
              <div class='Admin-News-button'>
                <button type="button" @click="close('tag')" >關閉</button>
                <button type="button" @click="saveTag">儲存</button>
              </div>       
          </form>
      </div>
      <!--------------------文章編輯------------------------>
      <div v-if="showarticle" class="Admin-News-modal"  @click.self="close('article')">
        <form class="Admin-News-form Admin-article-form">
          <div class="Admin-News-h1 Admin-article-header">
            <h1>文章編輯</h1>
          </div>
          <div class="Admin-article-wapper">
            
            <div class="Admin-article-settings">

              <div class="Admin-article-category">
                <h2>文章分類</h2>
                <select name="category" id="" v-model="selected_article.category" >
                  <option value="" disabled selected>選擇分類</option>
                  <option value="天象事件">天象事件</option>
                  <option value="知識新知">知識新知</option>
                  <option value="生活應用">生活應用</option>
                </select>
              </div>

              <div class="Admin-article-status">
                <h2>上架與草稿</h2>
                <select name="is_active" id="status" v-model="selected_article.is_active" required>
                  <option value="" disabled >選擇狀態</option>
                  <option value="上架" >上架</option>
                  <option value="草稿" >草稿</option>
                </select>
              </div>

            </div>

            <div class="Admin-article-title">
              <label for="title">標題:</label>
              <input type="text" id="title" v-model="selected_article.title" >
            </div>

            <div class="Admin-article-image">
              <h2>圖片:</h2>
              <el-upload class="upload-demo"  action="https://tibamef2e.com/tjd102/g1/pdo/news/upload.php"  
                list-type="picture-card"
                ref="uploadRef"
                :auto-upload="false"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :on-error="handleError"
                :file-list="fileList"
                :limit="1"
                :on-change="handleChange"
                name="file"
                > 
                <el-icon v-if="fileList.length === 0"><Plus /></el-icon>
              </el-upload>
            </div>

            <div class="Admin-article-content">
              <h2>內文:</h2>
              <div class="textarea-box">
              <textarea name="" id="" v-model="selected_article.content"></textarea>
              <span>目前字數：{{ selected_article.content?.length || 0 }}</span>
              </div>
            </div>
            

            <div class='Admin-News-button Admin-article-actions'>
              <button type="button" @click="close('article')" >關閉</button>
              <button type="button" @click="save(selected_article)">儲存</button>
            </div>

          </div>       
        </form>
      </div>
  </template>


<style scoped lang="scss">
/*---------------文章編輯頁樣式-------------*/
.Admin-article-form{
  width: 700px;
  height: 700px;
  
  
  .Admin-article-wapper{
      font-size: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 600px;
      height: auto;
      margin: 0 auto;
      gap: 20px;
      .Admin-article-title{
        
        input{
          padding: 0;
          border: 1px solid black;
          margin-left: 10px;
          width: 480px;
          height: 20px;
        }
      }
      .Admin-article-image{
        
        gap: 12px;
        display: flex;
        :deep(.el-upload-list--picture-card .el-upload-list__item){
          width: 480px;
          height: 270px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
        :deep(.el-upload--picture-card) {
          position: relative;
          width: 480px;
          height: 270px;
        }
        // ::v-deep(.el-upload){
        //   margin-left: 10px;
        //   width: 480px;

          
        // }
      }
      .Admin-article-content{
        
        display: flex;
        gap: 10px;

        .textarea-box {
          position: relative;
          flex: 1;

            textarea{
              padding: 0;
              padding-bottom: 24px;
              width: 480px;
              border: 1px solid black;
              border-radius: 5px;
              height: 250px;
              resize: vertical;
              box-sizing: border-box;
            }
            span{
              position: absolute;
              right: 8px;
              bottom: 6px;
              font-size: 12px;
              color: #999;
              pointer-events: none; // 不要影響使用者輸入
            }
        
        }
        
      }

      .Admin-article-settings{

        display: flex;
        justify-content:space-between;
        align-items: center;
        gap: 52px;
        
      .Admin-article-category{
        display: flex;
        select{
          border:  1px solid black;
          margin-left: 10px;
          width: 150px;
        }
      }
      .Admin-article-status{
        display: flex;
        select{
          border:  1px solid black;
          margin-left: 10px;
          width: 150px;
        }
      }
      
    
    }
  }
  

}

/*---------------標籤編輯頁樣式-------------*/
form{
        background-color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        margin-bottom: 250px;
        border-radius: 10px;
        width: 600px;
        height: 250px;
        overflow-y: auto;
        overflow-x: hidden; 
        
        
        :deep(.el-tag){
          margin-right: 8px;
          margin-bottom: 8px;
          font-size: 14px;
        }
        

        .Admin-News-h1{
            
          border-radius:  10px 10px  0 0 ;
          background-color: #9187B9;
          margin-bottom: 30px;

          h1{ 
            width: 100%;
            color: white;
            padding: 18px ;
          }

        }

        .Admin-News-button{
          margin-top: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
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


.Admin-News-modal{
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }
</style>