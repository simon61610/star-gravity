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
    order_date:'2025/08/16'
} ,])

</script>

<template>
    <AdminTable :columns="columns" :data="Ordertable" :search="props.search">
        <template #編輯="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            編輯查看
            </el-button> 
        </template>
    </AdminTable>

</template>