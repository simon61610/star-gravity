<script setup>
import {ref} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';

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


</script>

<template>
    <AdminTable :columns="columns" :data="Newstable" :search="props.search">
        <template #tag="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            編輯標籤 
            </el-button> 
        </template>
        
        <template #edit="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            編輯查看
            </el-button> 
        </template>
    </AdminTable>

</template>