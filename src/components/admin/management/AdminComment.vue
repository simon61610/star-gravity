<script setup>
import {ref} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';
import img from '@/assets/images/news/news-article-a1.jpg';

const props = defineProps({
  search: { type: String, default: '' }
})

//欄位定義
const columns = [
    {label:'地點名稱',prop:'id'},
    {label:'會員帳號',prop:'member_account'},
    {label:'評論日期',prop:'review_date'},
    {label:'完整資訊',prop:'order_info' , slot:'查看', align:'right' },
    {label:'審核狀態',prop:'review_status'}, 
]

//欄位資料
const Commenttable = ref([ 
    {
    id: '南瀛天文館',
    member_account: 'jim8599@yahoo.com.tw',
    review_date: '2025/08/16',
    review_status: '審核中',
    content:'環境清幽，景色優美，適合散步放鬆。服務人員親切，導覽內容生動有趣。交通方便，設施乾淨整齊，讓人感覺舒適自在，是值得再次造訪的景點。',
    img:img
    
} ,])

const selectedComment = ref(null)
const show = ref(false);

const handleEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
    console.log(index, row)
    
    selectedComment.value = {
        
        member_account: row.member_account,
        review_date: row.review_date,
        id: row.id,
        content: row.content,
        review_status: row.review_status,
        img: row.img
    
  }
/*打開燈箱*/
  show.value = true;
}

/*---------------彈窗關閉----------------*/
function close(){
    show.value = false;
}

/*儲存功能-*/
  function save() {                                                                //findIndex()是JS函數 找不到就回傳 -1
  const idx = Commenttable.value.findIndex(c => String(c.id) === String(selectedComment.value.id)) //找更改資料的那筆資料對於 membertable[idx] 是在第idx位置
  if (idx !== -1) {                                       //如果idx不是-1 表示有這筆資料
    Commenttable.value[idx] = {...selectedComment.value }  //membertable.value[idx] 這是整個資料陣列  = {}　→資料的值
  }
  show.value = false
}


</script>



<template>
    <AdminTable :columns="columns" :data="Commenttable" :search="props.search">
        <template #查看="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)" > 
            查看 
            </el-button> 
        </template>
    </AdminTable>
    <div v-if="show" class="Admin-Comment-modal"  @click.self="close">
        
        <form  action="" class="Admin-Comment-form">
            <div class="Admin-Comment-h1">
                <h1>評論完整資訊</h1>
            </div>
            <fieldset class="Admin-Comment-wapper">
                <div class="Admin-Comment-first">
                    <div>會員帳號:<span id="">{{ selectedComment.member_account }}</span></div>
                    <div>評論時間:<span id="">{{ selectedComment.review_date }}</span></div>
                </div>
                <div class="Admin-Comment-second">
                    <div>評論地點:<span id="">{{ selectedComment.id }}</span></div>
                    <div>評論內容:<br></br><br></br><span style="margin-left: 0px; line-height: 1.5;" id="">{{ selectedComment.content}}</span></div>
                    <div>照片:<br></br><img :src=" selectedComment.img " style="max-width: 150px; height: 50px; margin-top: 15px;"></img></div>
                    <label for="">審核狀態:
                        <br></br>
                        <br></br>
                        <input type="radio" value="審核中"  name="status" id="review_pending" v-model="selectedComment.review_status"><span style="font-weight: 400;">審核中</span>
                        <input type="radio" value="顯示中" name="status" id="review_visible" v-model="selectedComment.review_status"><span style="font-weight: 400;">顯示中</span>
                        <input type="radio" value="隱藏中" name="status" id="review_hidden" v-model="selectedComment.review_status"><span style="font-weight: 400;">隱藏中</span>
                    </label>
                
                </div>
            </fieldset>
                <div class='Admin-Comment-button'>
                    <button type="button" @click="save">儲存</button>
                    <button type="button" @click="close" >取消</button>
                   
                </div>
        </form>
    </div>
</template>

<style scoped  lang="scss">
form{
        background-color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        margin-bottom: 250px;
        border-radius: 10px;
        width: 750px;
        height: auto;
        font-weight: bold;
        .Admin-Comment-h1{
            border-radius:  10px 10px  0 0 ;
            background-color: #9187B9;
            margin-bottom: 30px;
            h1{         
                
                width: 100%;
                color: white;
                padding: 18px ;
            }

        }

       
        .Admin-Comment-wapper{
           
            height: auto;
            width: 700px;
            margin: 0 auto;
            span{
                margin-left: 10px;
                font-weight: 400;
            }
            .Admin-Comment-first{
                display: flex;
                justify-content:space-between;
            }

            .Admin-Comment-second{
                
                margin-top: 16px;
                display: flex;
                flex-direction: column;
                gap: 16px;
               
                
            }
            
           
            
        }
        .Admin-Comment-button{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            button{
                border: none;
                border-radius: 10px;
                width: 80px;
                height: 40px;
            &:hover{
                background-color: gray;
                color: white;
            }
            }
        }
    }
    .Admin-Comment-modal{
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        
    }

</style>