<script setup>
import {ref, onMounted} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';
import ConfirmDialog from '../ConfirmDialog.vue';
import { functions } from 'lodash-es';
import axios from 'axios';

const props = defineProps({
  search: { type: String, default: '' }
})


const columns = [
    {label:'編號',prop:'ID'},
    {label:'會員帳號',prop:'email'},
    {label:'會員姓名',prop:'name'},
    {label:'帳號狀態',prop:'account_status'},
    {label:'創建日期',prop:'created_at'},
    {label:'編輯',prop:'action' , slot:'編輯', align:'right' }]

const membertable = ref([ 
//     {
//     id: '01',
//     member_account: 'cks558x',
//     member_name: '很大偉',
//     account_status: '正常',
//     member_phone:'0987598598',
//     created_at:'2025-08-15',
//     member_address:'新北市淡水區大同2段18號',
//     member_gender:'男'
// },
//     {
//     id: '02',
//     member_account: '88555',
//     member_name: '偉',
//     account_status: '正常',
//     member_phone:'0987598',
//     created_at:'2025-08-15',
//     member_address:'新北市2段18號',
//     member_gender:'男'
//     },
//      {
//     id: '02',
//     },
//      {
//     id: '02',
//     },
//      {
//     id: '02',
//     },
//      {
//     id: '02',
//     },
//      {
//     id: '02',
//     },
//      {
//     id: '02',
//     },
//      {
//     id: '02',
//    },
//      {
//     id: '02',
//    },
//      {
//     id: '02',
//    },  {
//     id: '02',
//    },
    
])


const getTotalmembers = async ()=>{
    try{
        const resp = await axios.get(import.meta.env.VITE_AJAX_URL + "Admin/getTotalmembers.php")
        membertable.value = resp.data

    }catch(error){
        console.log('上傳錯誤:' , error);
    }
}

onMounted(()=>{
    getTotalmembers()
})



/*---------------設定響應式資料-----------------*/
/* 存放當前選中的那筆資料 */
const selectedMember = ref(null)
const show = ref(false);

//確認ConfirmDialog 是否顯示 以及ConfirmDialog要顯示的代辦資料
const showConfirmDialog = ref(false)
const pendingUpdate = ref(null)


/*----------------編輯按鈕+資料渲染------------------*/
const handleEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
    // console.log(index, row)
    // console.log(row.ID)
    
    selectedMember.value = {
    id: row.ID,
    member_account: row.email,
    member_name: row.name,
    account_status: row.account_status,
    created_at: row.created_at,
    member_phone: row.phone,
    member_address: row.address,
    member_gender: row.gender
  }
// /*打開燈箱*/
    show.value = true;
}

/*---------------彈窗關閉----------------*/
function close(){
    show.value = false;
}




/*點擊儲存功能 但要跳出另一個視窗-*/
function save() {
    // 儲存待更新的資料
    pendingUpdate.value = { ...selectedMember.value }
    console.log(pendingUpdate.value);
    
    // 顯示確認對話框
    showConfirmDialog.value = true
}

/*確認更新 並向後端發出請求*/
function confirmUpdate (){
    const newStatus  = selectedMember.value.account_status;   // '正常' / '停權  
    const id  = selectedMember.value.id;   // 當前會員ID 

    fetch(import.meta.env.VITE_AJAX_URL + "Admin/update.php", {
        method: 'POST',
        // 若後端用 session 才需要下一行
        // credentials: 'include',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            account_status: newStatus,
            id: id
        })
    })
    .then(res => res.json()) 
    .then(( newMembers ) => {
        membertable.value = newMembers
        /*關閉燈箱*/
        show.value = false;
        showConfirmDialog.value = false
        alert("更新完畢")
        
    })
    .catch(err => {
        alert('更新失敗');
    });
}

function cancelUpdate (){
    showConfirmDialog.value = false
}



</script>

<template>
    <AdminTable :columns="columns" :data="membertable" :search="props.search">
        <template #編輯="{ row, $index }"  >
            <el-button size="small"  @click="handleEdit(row, $index)" >   
                編輯查看
            </el-button>
        </template>
    </AdminTable>
    <div v-if="show" class="Admin-member-modal"  @click.self="close">

        <form  action="" class="Admin-member-form">
            <div class="Admin-member-h1">
                <h1>編輯查看</h1>
            </div>
            <fieldset class="Admin-member-wapper">
                <div class="Admin-member-left">
                    <div>編號:<span id="">{{ selectedMember.id }}</span></div>
                    <div>帳號:<span id="">{{ selectedMember.member_account }}</span></div>
                    <div>姓名:<span id="">{{ selectedMember.member_name }}</span></div>
                    <div>電話:<span id="">{{ selectedMember.member_phone }}</span></div>
                </div>
                <div class="Admin-member-right">
                    <div>地址:<span id="">{{ selectedMember.member_address }}</span></div>
                    <div>性別:<span id="">{{ selectedMember.member_gender}}</span></div>
                    <label for="">帳號狀態:
                        <select name="" id="" v-model="selectedMember.account_status">
                            <option value="正常">正常</option>
                            <option value="停權">停權</option>
                        </select>
                    </label>
        
                    <div>建立日期:<span id="accountData">{{selectedMember.created_at}}</span></div>
                
                </div>
            </fieldset>
                <div class='Admin-member-button'>
                    <button type="button" @click="save">儲存</button>
                    <button type="button" @click="close">關閉</button>
                </div>
        </form>
    </div>

    <ConfirmDialog 
        :show="showConfirmDialog"
        title="確認會員審核"
        message="您即將更新此會員的審核狀態，請確認以下資訊是否正確："
        :details="pendingUpdate"
        @confirm="confirmUpdate"
        @cancel="cancelUpdate"
    >
        <!-- 使用 slot 自定義顯示內容 -->
        <!-- 這個區域你想要ConfirmDialog的框框內呈現什麼樣的資訊 就寫那些html 以及補上scss -->
        <template #member-details>  <!-- ← 接收 details 數據 -->
            <div class="comment-details">
                <div>
                    <strong>會員帳號：</strong>
                    <span>{{ pendingUpdate.member_account }}</span>
                </div>
                <div>
                    <strong>審核狀態：</strong>
                    <span>{{ pendingUpdate.account_status }}</span>
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
        height: 350px;
        .Admin-member-h1{
            border-radius:  10px 10px  0 0 ;
            background-color: #9187B9;
            margin-bottom: 30px;
            h1{         
                
                width: 100%;
                color: white;
                padding: 18px ;
            }

        }

       
        .Admin-member-wapper{
            
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0px;
            
            .Admin-member-left{
                display: flex;
                flex-direction: column;
                gap: 25px;
                width: 300px;
                

            }
            .Admin-member-right{
                display: flex;
                flex-direction: column;
                gap: 25px;
                width: 300px;
                
            }
            
        }
        .Admin-member-button{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            button{
                border: none;
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
    .Admin-member-modal{
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        
    }

</style>    

