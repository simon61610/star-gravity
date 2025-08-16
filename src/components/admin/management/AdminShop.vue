<script setup>
import {ref} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';

const props = defineProps({
  search: { type: String, default: '' }
})

//欄位定義
const columns = [

    {label:'編號',prop:'id'},
    {label:'商品類別',prop:'category'},
    {label:'名稱',prop:'name'},
    {label:'原價',prop:'price'},
    {label:'售價',prop:'salePrice' },
    {label:'庫存量',prop:'stock'},
    {label:'上下架',prop:'status'},
    {label:'編輯查看',prop:'actions', slot:'編輯', align:'right'},
]

const Shoptable = ref([ 
    {
        id: '01',
        category: '天文望遠鏡',
        name: '聖文版望遠鏡',
        price: '天價',
        salePrice:'10',
        stock:'1000',
        status:'上架',
    } ,
])

</script>


<template>
    <AdminTable :columns="columns" :data="Shoptable" :search="props.search">
        <template #編輯="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            編輯查看
            </el-button> 
        </template>
    </AdminTable>

</template>
    