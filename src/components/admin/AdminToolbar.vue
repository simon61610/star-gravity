<script setup>
import {ref,watch} from 'vue';
const props = defineProps ({           //定義接受的值
    search : {type:String, default:''}, //接收父層v-model
    title  : { type:String , default:''},
    data:{ type: Array,  default: () => [] }

})


const emit = defineEmits (['update:search']) //定義回傳父層的值

const input = ref(props.search)  //建立響應式變數 值=props.search 父層傳過來的值
watch (
    () =>  props.search,(newValue,oldValue) => {input.value=newValue}  //監聽父層的值 有變動的話把舊的值轉成新的
)
const newInput = () => emit('update:search', input.value) //回傳給父層更新的值
const clearinput = () => emit('update:search','') //清空search
</script>

<template>
     
    <div class="admin-table-header">
        <div class="admin-table-title">

            <div>
             <h1>{{ title }}</h1>
            </div>

            <div>
                <slot name="add"/>
            </div>
        </div>

        <div class="admin-table-input">
            <el-input v-model="input" size="small"  placeholder="以ID搜索" @input='newInput' @clear= 'clearinput' clearable> <!---clearable點清除按鈕時會觸發 clear--->
                <template #prefix>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </template>
            </el-input>
            <button>搜尋</button>
        </div>
    </div>
    <hr style="margin-bottom: 20px;">

</template>

<style scoped lang="scss">

 .admin-table-header{
      display: flex;
      justify-content: space-between;
      align-items:flex-end;
      margin-bottom: 20px;
      width: 1030px;
      

        .admin-table-title{
          width: 250px;
          height: 40px;
          align-items: center;
          text-align: center;
         /* background-color: #6C89BD;*/
          border-radius: 10px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          gap:12px;
          
          
          
          h1{
            width: 144px;
            height: 40px;
            line-height: 40px;
            border-radius: 10px;
            background-color: #6C89BD;
          }
          
         
          
                
        }

          .admin-table-input{
            
            max-width: 300px;
            width: 100%;
            display: flex;
            gap: 20px;

                
              ::v-deep(.el-input__wrapper){
                background-color: rgb(233, 236, 239);
                width: 150px;
              }

              ::v-deep(.el-input__inner){
                width: 150px;
              }

              button{
                width: 80px;
                background-color: #9187B9;
                border-radius: 10px;
                border: none;
              }
          }
    }
</style>