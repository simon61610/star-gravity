  <script setup>
  import {ref} from 'vue'
  import AdminTable from '@/components/admin/AdminTable.vue'
  import img from '@/assets/images/news/news-article-a1.jpg';

  const props = defineProps({
    search: { type: String, default: '' }
  })

  

  //欄位定義
  const columns = [
      {label:'文章編號',prop:'id'},
      {label:'上架日期',prop:'publishDate'},
      {label:'標題',prop:'title'},
      {label:'文章分類',prop:'category'},
      {label:'文章狀態',prop:'status'},
      {label:'最後更新日期',prop:'updatedAt'  },
      {label:'標籤',prop:'tags',slot:'tag', align:'right'},
      {label:'編輯查看',prop:'actions',slot:'edit', align:'right'},
    
  ]

  //欄位資料
  const Newstable = ref([ 
      {
      id: '1',
      publishDate: '2025/08/16',
      title: '什麼是血色月亮!?',
      status: '上架',
      category:'天象事件',
      updatedAt:'2025/08/17',
      img:img,
      content:'測試文章內容',
      tag:['星星','月亮','太陽']

  } ,])


  const selected_tag = ref(null)
  const selected_article = ref({})

  /*----------------tag編輯按鈕+資料渲染------------------*/
  const tagEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
      console.log(index, row)
      
      selected_tag.value = {...row }
  /*打開燈箱*/
    showtag.value = true;
  }


  /*----------------文章列表---------------------------*/
  const articleEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
      console.log(' 子層 addArticle 被呼叫了！')
      console.log(row, index)
      console.log('傳進來的 row:', row)
      selected_article.value = {
        id:Newstable.value.length + 1,
        publishDate:'',
        updatedAt:'',
        category:'',
        status:'',
        title:'',
        img:'',
        content:''}
      /*selected_article.value = {
        id:row.id,
        publishDate:row.publishDate,
        updatedAt:row.updatedAt,
        category:row.category,
        status:row.status,
        title:row.title,
        img:row.img,
        content:row.content

      }*/
  /*打開燈箱*/
    showarticle.value = true;
  }

  defineExpose({ articleEdit })

  /*---------------彈窗關閉----------------*/
  const showtag = ref(false);
  const showarticle = ref(false);
  function close(type) {
    if (type === 'tag') showtag.value = false
    if (type === 'article') showarticle.value = false
  }

  /*---------------儲存功能------------------*/
  function save(table,selected) {
                                                         //findIndex()是JS函數 找不到就回傳 -1
    const idx = table.findIndex(a => String(a.id) === String(selected.id) )
    
    console.log(idx) //找更改資料的那筆資料對於 membertable[idx] 是在第idx位置
    if (idx !== -1) {                                       //如果idx不是-1 表示有這筆資料
      table[idx] = {...selected }  //membertable.value[idx] 這是整個資料陣列  = {}　→資料的值
    }else{
      table.push({...selected})
    }
    showarticle.value = false
  }

  /*--------------標籤動態新增element push--------------*/
  const inputValue = ref("")  //輸入框
  const dynamicTags = ref([])   //儲存tag陣列
  const inputVisible = ref(false)
  const InputRef = ref(null)

  const handleClose = (tag) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  }

  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      InputRef.value?.focus() // 直接 focus()
    })
  }

  const handleInputConfirm = () => {
    if (inputValue.value) {
      dynamicTags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ""
  }


  </script>

  <template>
      <AdminTable :columns="columns" :data="Newstable" :search="props.search">
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
          <form class="Admin-News-form">
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
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showInput" style="margin-left: 10px;">
                  + 新增標籤
                </el-button>
              </div>
            
              <div class='Admin-News-button'>
                <button type="button" @click="close('tag')" >關閉</button>
                <button type="button" @click="save(tag, selected_tag.id)">儲存</button>
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
                <select name="category" id="" v-model="selected_article.category">
                  <option value="">選擇分類</option>
                  <option value="天象事件">天象事件</option>
                  <option value="知識新知">知識新知</option>
                  <option value="生活應用">生活應用</option>
                </select>
              </div>

              <div class="Admin-article-status">
                <h2>上架與草稿</h2>
                <select name="status" id="status" v-model="selected_article.status">
                  <option value="">選擇狀態</option>
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
              <el-upload class="upload-demo" action="#"  list-type="picture-card"
                :on-success="handleSuccess"
                :on-error="handleError"
                :src="selected_article.img"
                >
                <el-icon><Plus />+</el-icon>
              </el-upload>
            </div>

            <div class="Admin-article-content">
              <h2>內文:</h2>
              <textarea name="" id="">{{ selected_article.content }}</textarea>
            </div>

            <div class='Admin-News-button Admin-article-actions'>
              <button type="button" @click="close('article')" >關閉</button>
              <button type="button" @click="save(Newstable, selected_article)">儲存</button>
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
        
        display: flex;
        ::v-deep(.el-upload){
          margin-left: 10px;
          width: 480px;

          
        }
      }
      .Admin-article-content{
        
        display: flex;
        
        textarea{
          padding: 0;
          margin-left: 10px;
          width: 480px;
          border: 1px solid black;
          border-radius: 5px;
          height: 250px;
          resize: vertical;
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