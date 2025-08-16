<script setup>
import {ref} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';

const props = defineProps({
  search: { type: String, default: '' }
})

//欄位定義
const columns = [
    {label:'活動ID',prop:'id'},
    {label:'活動名稱',prop:'activity_name'},
    {label:'活動日期',prop:'activity_date'},
    {label:'報名人數',prop:'activity_people'},
    {label:'活動資訊',prop:'activity_info' , slot:'編輯', align:'right' },
    {label:'參加者列表',prop:'activity_peoplelist' , slot:'管理', align:'right' },
    {label:'顯示狀態',prop:'display_Status'},
    {label:'活動狀態',prop:'activity_status'},
    {label:'首頁活動資訊', prop:'activity_checkbox', type: 'checkbox'  } //勾選欄
]

//欄位資料
const Activitytable = ref([ 
    {
    id: '01',
    activity_name: '綠島觀星旅',
    activity_date: '2025/8/16',
    activity_people: '10',
    display_Status:'上架',
    activity_status:'報名中',
    activity_checkbox:true
} ,
{
    id: '02',
}  ,
{
    id: '03',
}  ,
{
    id: '04',
}  ,
{
    id: '05',
}  ,
{
    id: '06',
}  ,
{
    id: '07',
}  ,
{
    id: '08',
}  ,
{
    id: '09',
}  ,
{
    id: '10',
}  ,
{
    id: '11',
}  ,
{
    id: '12',
}


])

</script>
<template>
    <AdminTable :columns="columns" :data="Activitytable" :search="props.search">
        <template #編輯="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            編輯 
            </el-button> 
        </template>
        
        <template #管理="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            管理
            </el-button> 
        </template>
    </AdminTable>

</template>
    