<script setup>
const props = defineProps({
    total:  { type: Number, default: 1 }, //總數
    pageSize : {type: Number,default: 5},  // defaul 預設值 沒有傳入這個 props  每頁頁數 
    modelValue: {type: Number, default: 1 } // defaul 預設值 沒有傳入這個 props 現在第幾頁
})

const emit = defineEmits(['update:modelValue','update:pageSize'])

function changePage(newpage){
    emit('update:modelValue',newpage)
}
</script>



<template>
    <div class="elementbox">
        <el-pagination 
        background layout="prev, pager, next" 
        :total = "props.total" 
        :page-size = "props.pageSize" 
        :current-page="props.modelValue"
        :hide-on-single-page="false"
        @current-change="changePage"/>
    </div>
</template>


















<style scoped lang="scss">
@import '../../src/assets/styles/main.scss';

.elementbox{
   margin-top: 36px;
   padding-bottom: 40px;
   
}

:deep(.el-pagination ){

    display: flex;
    justify-content: center;
    

    button{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: transparent !important;
        border: 1px white solid;
        color:white;
    }

    ul li{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px white solid;
        background-color: transparent !important;
        color:white;
    
        &:hover{
            background-color:$primaryColor-500  !important;
            font-weight: bolder;
        }

    }

    
}
</style>