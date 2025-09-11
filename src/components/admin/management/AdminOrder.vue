<script setup>
import { ref, onMounted } from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';
import axios from 'axios';

const props = defineProps({
  search: { type: String, default: '' }
})

//欄位定義
const columns = [
    {label:'編號',prop:'ID'},
    {label:'訂單編號',prop:'order_number'},
    {label:'會員帳號',prop:'account'},
    {label:'付款方式',prop:'payment_method'},
    {label:'訂單狀態',prop:'order_status'},
    {label:'訂購日期',prop:'date'},
    {label:'編輯查看',prop:'order_info' , slot:'編輯', align:'right' },
   
]

const Ordertable = ref([])
const orderDate = ref('')
const orderTime = ref('')

// 抓資料
const fetchOrders = async () => {
    const res = await axios.get(import.meta.env.VITE_AJAX_URL + "starshop/admin/orders_get.php")

    console.log(res.data)
    // console.log(Array.isArray(res.data)) // true

    Ordertable.value = res.data
}


onMounted(() => {
    fetchOrders()
})




//欄位資料
/* const Ordertable = ref([ 
    {
    id: '01',
    order_number: '202508160907',
    member_account: 'ckdu1256',
    payment_method: '線上付款',
    order_status:'上架',
    order_date:'2025/08/16',
    payment_status:'已付款'
} ,]) */

const selectedOrder = ref(null)
const show = ref(false);

/*----------------編輯按鈕+資料渲染------------------*/
const handleEdit = (row, index) => { //偵測編輯按鈕編輯哪個資料
    console.log(index, row)

    const address = row.city + row.area + row.recipient_address

    selectedOrder.value = {
        ID: row.ID, // ID
        order_number: row.order_number, // 訂單編號
        payment_method: row.payment_method, // 付款方式
        payment_status: row.payment_status, // 付款狀態
        order_status: row.order_status, // 訂單狀態
        account: row.account, // 會員帳號
        recipient_name: row.recipient_name, // 收件人姓名
        recipient_phone: row.recipient_phone, // 收件人電話
        recipient_address: address,// 地址
        shipping_method: row.shipping_method,// 運送方式
        order_date: row.date,
        order_time: row.time,
        notes: row.notes// 備註
  }

/*打開燈箱*/
  show.value = true;
}

function close(){
    show.value = false;
}

/*儲存功能-*/
const save = async () => {                                                                //findIndex()是JS函數 找不到就回傳 -1
    /* const idx = Ordertable.value.findIndex(o => o.ID === selectedOrder.value.ID) //找更改資料的那筆資料對於 membertable[idx] 是在第idx位置
    if (idx !== -1) {                                       //如果idx不是-1 表示有這筆資料
    Ordertable.value[idx] = {...selectedOrder.value }  //membertable.value[idx] 這是整個資料陣列  = {}　→資料的值
    } */

    const res = await axios.post(import.meta.env.VITE_AJAX_URL + "starshop/admin/order_update.php", {
        ID: selectedOrder.value.ID,
        order_status: selectedOrder.value.order_status
    })

    if(res.data.success){
        console.log(res.data)
        alert(res.data.message)
        await fetchOrders()
        close()
    }else{
        alert('更新失敗')
    }
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

    <!-- <div v-if="show" class="Admin-Order-modal"  @click.self="close"> -->
    <div v-if="show" class="Admin-Order-modal">

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
                        <div>會員帳號(信箱):<span>{{selectedOrder.account}}</span></div>
                        <!-- <div>會員信箱:</div> -->
                        <div>收件人姓名:<span>{{selectedOrder.recipient_name}}</span></div>
                        <div>收件人電話:<span>{{selectedOrder.recipient_phone}}</span></div>
                        <div>收件人地址:<span>{{selectedOrder.recipient_address}}</span></div>
                        <div>運送方式:<span>{{selectedOrder.shipping_method}}</span></div> 
                        <div>訂購日期:<span>{{selectedOrder.order_date}}</span></div>
                        <div>訂購時間:<span>{{selectedOrder.order_time}}</span></div>
                        <div>訂購備註:<span>{{selectedOrder.notes}}</span></div> 
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

    /*燈箱*/
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