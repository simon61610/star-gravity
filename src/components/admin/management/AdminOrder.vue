<script setup>
import {ref} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';

const props = defineProps({
  search: { type: String, default: '' }
})

//欄位定義
const columns = [
    {label:'編號',prop:'id'},
    {label:'訂單編號',prop:'order_number'},
    {label:'會員帳號',prop:'member_account'},
    {label:'付款方式',prop:'payment_method'},
    {label:'訂單狀態',prop:'order_status'},
    {label:'訂購日期',prop:'order_date'},
    {label:'編輯查看',prop:'order_info' , slot:'編輯', align:'right' },
   
]

//欄位資料
const Ordertable = ref([ 
    {
    id: '01',
    order_number: '202508160907',
    member_account: 'ckdu1256',
    payment_method: '線上付款',
    order_status:'上架',
    order_date:'2025/08/16',
    payment_status:'已付款'
} ,])

const selectedOrder = ref(null)
const show = ref(false);

/*----------------編輯按鈕+資料渲染------------------*/
const handleEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
    console.log(index, row)
    selectedOrder.value = {
        id:row.id,
        order_number:row.order_number,
        payment_method:row.payment_method,
        payment_status:row.payment_status,
        order_status:row.order_status,
        member_account: row.member_account,
        order_date:row.order_date
  }

/*打開燈箱*/
  show.value = true;
}

function close(){
    show.value = false;
}

/*儲存功能-*/
function save() {                                                                //findIndex()是JS函數 找不到就回傳 -1
  const idx = Ordertable.value.findIndex(o => o.id === selectedOrder.value.id) //找更改資料的那筆資料對於 membertable[idx] 是在第idx位置
  if (idx !== -1) {                                       //如果idx不是-1 表示有這筆資料
    Ordertable.value[idx] = {...selectedOrder.value }  //membertable.value[idx] 這是整個資料陣列  = {}　→資料的值
  }
  show.value = false
}


</script>

<template>
    <AdminTable :columns="columns" :data="Ordertable" :search="props.search">
        <template #編輯="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            編輯查看
            </el-button> 
        </template>
    </AdminTable>

    <div v-if="show" class="Admin-Order-modal"  @click.self="close">

        <form  action="" class="Admin-Order-form">
            <div class="Admin-Order-h1">
                <h1>編輯查看</h1>
            </div>
            <fieldset class="Admin-Order-wapper">
                <div class="Admin-Order-top">

                    <div class="Admin-Order-left">
                        <div>訂單編號:<span>{{selectedOrder.order_number}}</span></div>
                        <div>付款方式:<span>{{selectedOrder.payment_method}}</span></div>
                        <div>付款狀態:<span>{{selectedOrder.payment_status}}</span></div>
                        <div>訂單狀態:</div>
                        <select name="" id="" v-model="selectedOrder.order_status">
                            <option value="完成">完成</option>
                            <option value="取消">取消</option>
                            <option value="已出貨">已出貨</option>
                            <option value="未出貨">未出貨</option>
                        </select>
                    </div>

                    <div class="Admin-Order-right">
                        <div>會員帳號:<span>{{selectedOrder.member_account}}</span></div>
                        <div>會員信箱:</div>
                        <div>收件人姓名:</div>
                        <div>收件人電話:</div>
                        <div>收件人地址:</div>
                        <div>運送方式:</div> 
                        <div>訂購日期:<span>{{selectedOrder.order_date}}</span></div>
                        <div>訂購備註:</div> 
                    </div>
                </div>


            </fieldset>
                <div class='Admin-Order-button'>
                    <button type="button" @click="close">關閉</button>
                    <button type="button" @click="save">儲存</button>
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
        width: 950px;
        height: auto;
        font-weight: bold;
        .Admin-Order-h1{
            border-radius:  10px 10px  0 0 ;
            background-color: #9187B9;
            margin-bottom: 30px;
            h1{         
                
                width: 100%;
                color: white;
                padding: 18px ;
            }

        }

       
        .Admin-Order-wapper{
            
            height: auto;
            width: 700px;
            margin: 0 auto;
            .Admin-Order-top{
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
                span{
                margin-left: 10px;
                font-weight: 400;
                }
                .Admin-Order-left{
                
                width: 300px;
                height: 200px;
                display: flex;
                flex-direction: column;
                justify-content:space-between;

                select{
                    width: 190px;
                    height: 40px;
                }
                }

                .Admin-Order-right{
                border: 1px gray solid;
                padding: 25px;
                width: 550px;
                margin-top: 16px;
                display: flex;
                flex-direction: column;
                gap: 20px;
               
                
                }
            }
            
            
           
            
        }
        .Admin-Order-button{
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
    .Admin-Order-modal{
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        
    }

</style>