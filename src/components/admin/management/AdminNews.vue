<script setup>
import {ref} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue'


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
    id: '01',
    publishDate: '2025/08/16',
    title: '什麼是血色月亮!?',
    status: '上架',
    category:'天象事件',
    updatedAt:'2025/08/17',
} ,])


const selected_tag = ref(null)
const selected_acticle = ref(null)

/*----------------tag編輯按鈕+資料渲染------------------*/
const tagEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
    console.log(index, row)
    
    selected_tag.value = {...row }
/*打開燈箱*/
  showtag.value = true;
}


/*----------------活動列表---------------------------*/
const acticleEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
  
    console.log(index, row)
    selected_acticle.value = {...row }
/*打開燈箱*/
  showActivity.value = true;
}



/*---------------彈窗關閉----------------*/
const showtag = ref(false);
const showacticle = ref(false);
function close(type) {
  if (type === 'tag') showtag.value = false
  if (type === 'acticle') showacticle.value = false
}

/*---------------儲存功能------------------*/
function save(table,selected) {                                                                //findIndex()是JS函數 找不到就回傳 -1
  const idx = table.value.findIndex(p => p.id === selected.id) //找更改資料的那筆資料對於 membertable[idx] 是在第idx位置
  if (idx !== -1) {                                       //如果idx不是-1 表示有這筆資料
    table.value[idx] = {...selected.value }  //membertable.value[idx] 這是整個資料陣列  = {}　→資料的值
  }
  showpeople.value = false
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
    InputRef.value?.focus() // 不是 TS，直接 focus()
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
            <el-button size="small" @click="acticleEdit(row, $index)"> 
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
                <button type="button" @click="save(tag, selected_acticle.id)">儲存</button>
            </div>       
        </form>
    </div>

</template>


<style scoped lang="scss">
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
            margin-top: 80px;
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




:deep(.admin-table-title) {
  opacity: 0 !important;

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