<script setup>
import {ref} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';

const props = defineProps({
  search: { type: String, default: '' }
})


const columns = [
    {label:'編號',prop:'id'},
    {label:'會員帳號',prop:'member_account'},
    {label:'會員姓名',prop:'member_name'},
    {label:'帳號狀態',prop:'account_status'},
    {label:'創建日期',prop:'created_at'},
    {label:'編輯',prop:'action' , slot:'編輯', align:'right' }]

const membertable = ref([ 
    {
    id: '01',
    member_account: 'cks558x',
    member_name: '很大偉',
    account_status: '正常',
    created_at:'2025-08-15'},
    {
    id: '02',
    },
     {
    id: '02',
    },
     {
    id: '02',
    },
     {
    id: '02',
    },
     {
    id: '02',
    },
     {
    id: '02',
    },
     {
    id: '02',
    },
     {
    id: '02',
   },
     {
    id: '02',
   },
     {
    id: '02',
   },  {
    id: '02',
   },
    
    
])

</script>

<template>
    <AdminTable :columns="columns" :data="membertable" :search="props.search">
        <template #編輯="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            編輯查看 
            </el-button> 
        </template>
    </AdminTable>
</template>

<style scoped  lang="scss">
</style>

