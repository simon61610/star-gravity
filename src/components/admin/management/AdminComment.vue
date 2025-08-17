<script setup>
import {ref} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';

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
} ,])

</script>



<template>
    <AdminTable :columns="columns" :data="Commenttable" :search="props.search">
        <template #查看="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            查看 
            </el-button> 
        </template>
    </AdminTable>
</template>

<style scoped  lang="scss">
</style>