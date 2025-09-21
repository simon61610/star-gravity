<script setup>
import {ref, onMounted} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';
import ConfirmDialog from '../ConfirmDialog.vue';
import img from '@/assets/images/news/news-article-a1.jpg';
import axios from 'axios';
import { useAuthStore } from '@/stores/admin.js'

const admin = useAuthStore()
const props = defineProps({
  search: { type: String, default: '' }
})

//欄位定義
const columns = [
    {label:'地點ID',prop:'ID'},
    {label:'地點名稱',prop:'location_name'},
    {label:'會員帳號',prop:'member_account'},
    {label:'評論日期',prop:'created_at'},
    {label:'完整資訊',prop:'order_info' , slot:'查看', align:'right' },
    {label:'審核狀態',prop:'review_status'}, 
]

//欄位資料
const Commenttable = ref([ 
    {
    ID:'1',
    location_name: '南瀛天文館',
    member_account: 'jim8599@yahoo.com.tw',
    created_at: '2025/08/16',
    review_status: '審核中',
    content:'環境清幽，景色優美，適合散步放鬆。服務人員親切，導覽內容生動有趣。交通方便，設施乾淨整齊，讓人感覺舒適自在，是值得再次造訪的景點。',
    img:img
    
} ,])

const selectedComment = ref(null)
const show = ref(false);

// 新增確認對話框的狀態
const showConfirmDialog = ref(false);
const pendingUpdate = ref(null); // 儲存待更新的資料



const handleEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
    // console.log(index, row)
    
    selectedComment.value = {
        member_account: row.member_account,
        review_date: row.created_at,
        id: row.location_id,
        location_name: row.location_name,
        content: row.content,
        review_status: row.review_status,
        img: row.image
    
  }
/*打開燈箱*/
  show.value = true;
}
//登入檢查
onMounted(async () => {
  await admin.checkSession()
  if (!admin.isLoggedIn) {
    router.push('/AdminLoginPage') // 沒登入就跳回登入頁
  }
})
/*---------------彈窗關閉----------------*/
function close(){
    show.value = false;
}


/* 照片全螢幕*/
function enlargePhoto(el){ 
    el.requestFullscreen()
}

/*點擊儲存功能 但要跳出另一個視窗-*/
function save() {
    // 除錯用   
    console.log('selectedComment:', selectedComment.value) 

    // 儲存待更新的資料
    pendingUpdate.value = { ...selectedComment.value }
    
    // 顯示確認對話框
    showConfirmDialog.value = true
}


/*確認更新 並向後端發出請求*/
function confirmUpdate() {
                                                                        //findIndex()是JS函數 找不到就回傳 -1
    const idx = Commenttable.value.findIndex(c => String(c.location_id) === String(pendingUpdate.value.id)) //找更改資料的那筆資料對於 membertable[idx] 是在第idx位置
    if (idx !== -1) { //如果idx不是-1 表示有這筆資料
    Commenttable.value[idx].review_status = pendingUpdate.value.review_status;
    // Commenttable.value[idx] = {...selectedComment.value }  //membertable.value[idx] 這是整個資料陣列  = {}　→資料的值
    }

    // 呼叫函數 向後端發出請求 
    updateReviews(pendingUpdate.value)
    // 關閉所有對話框
    showConfirmDialog.value = false
    show.value = false
    //待儲存的資料回歸null
    pendingUpdate.value = null
} 

function cancelUpdate (){
    showConfirmDialog.value = false
}


/*---------------串接資料庫----------------*/
//避免打包後路徑錯誤 
const API_URL = import.meta.env.VITE_AJAX_URL

const getTotleReviews = async ()=>{
    try{
        const resp = await axios.get(import.meta.env.VITE_AJAX_URL + "Admin/getTotleReviews.php")
        // console.log(resp.data);
        Commenttable.value = resp.data
    }catch(error){
        console.error('取得評論資料錯誤:', error)
        console.error('錯誤回應:', error.response)
    }
}

const updateReviews = async (target)=>{
    // console.log(555);
    try{
        const resp = await axios.post(
            import.meta.env.VITE_AJAX_URL + "Admin/updateReviews.php" ,
            {
                member_email: target.member_account,
                location_id: target.id,
                review_status: target.review_status,
            }
        )
        if(resp.data.success){
            Commenttable.value = resp.data.data;
            alert(resp.data.message)
            // console.log(resp.data.message);
        }else if( !resp.data.success ){
            console.log(resp.data.message);
        }

    }catch(error){
        console.error('更新失敗:',error )
        console.error('錯誤回應:',error.response )
    }
}

onMounted(()=>{
    getTotleReviews()
})





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
                    <div>評論地點:<span id="">{{ selectedComment.location_name }}</span></div>
                    <div>評論內容:<br></br><br></br><span style="margin-left: 0px; line-height: 1.5;" id="">{{ selectedComment.content}}</span></div>
                    <div v-if="selectedComment.img" >照片:<br></br><img  :src=" API_URL + selectedComment.img " style="max-width: 150px; height: 50px; margin-top: 15px;" @click="enlargePhoto($event.target)"></img></div>
                    <label for="">審核狀態:
                        <br></br>
                        <br></br>
                        <!-- <input type="radio" value="審核中"  name="status" id="review_pending" v-model="selectedComment.review_status"><span style="font-weight: 400;">審核中</span> -->
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

    <!-- 引用ConfirmDialog組件 但前後都要包 props和自定義函數的屬性值可以自己改~ -->
    <ConfirmDialog 
        :show="showConfirmDialog"
        title="確認評論審核"
        message="您即將更新此評論的審核狀態，請確認以下資訊是否正確："
        :details="pendingUpdate"
        @confirm="confirmUpdate"
        @cancel="cancelUpdate"
    >
        <!-- 使用 slot 自定義顯示內容 -->
        <!-- 這個區域你想要ConfirmDialog的框框內呈現什麼樣的資訊 就寫那些html 以及補上scss -->
        <template #comment-details>  <!-- ← 接收 details 數據 -->
            <div class="slot-details">
                <div >
                    <strong>會員帳號：</strong>
                    <span>{{ pendingUpdate.member_account }}</span>
                </div>
                <div >
                    <strong>評論地點：</strong>
                    <span>{{ pendingUpdate.location_name }}</span>
                </div>
                <div >
                    <strong>評論時間：</strong>
                    <span>{{ pendingUpdate.review_date }}</span>
                </div>
                <div >
                    <strong>審核狀態：</strong>
                    <span>{{ pendingUpdate.review_status }}</span>
                </div>
                <div v-if="pendingUpdate.content" >
                    <strong>評論內容：</strong>
                    <p>{{ pendingUpdate.content.length > 50 ? pendingUpdate.content.substring(0, 50) + '...' : pendingUpdate.content }}</p>
                </div>
            </div>
        </template>


    </ConfirmDialog>
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

    .slot-details{
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
</style>