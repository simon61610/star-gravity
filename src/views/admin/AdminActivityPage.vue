<script setup>
    import {ref} from 'vue'
   // import AdminHeader from '@/components/admin/AdminHeader.vue';
    import AdminToolbar from '@/components/admin/AdminToolbar.vue';
  //  import AdminSidebar from '@/components/admin/AdminSidebar.vue';
    import AdminActivity from '@/components/admin/management/AdminActivity.vue';
    const childRef = ref(null) //設置變數裝子層編輯按鈕的資訊
    const search = ref('') 


    function openadd(){  //抓子層按鈕的方法
        childRef.value.handleadd();
    }
    
</script>

<template>
    <div class="Admin-home-wapper">
        <header>
            <AdminHeader/>
        </header>
        
        
        <main class="Admin-home-box">
            <div class="Admin-home-centent">
                
                    <AdminToolbar
                    v-model:search="search"
                    title="活動管理">
                         <template #add>
                            <el-button @click="openadd" type="warning" size="small"  style="font-size: 16px ; color:black ;width: 144px; height:40px; border-radius:10px">新增</el-button> <!---template如果有具名(例如#add)就一定要被外層包起來--->
                        </template>             
                    </AdminToolbar>
               
                <AdminActivity ref="childRef" :search="search"/> <!--這裡要用ref建立子層實例(接彈窗資料)-->

            </div>

            <AdminSidebar/>
        </main>
 
    </div>
</template>

<style scoped>
.Admin-home-wapper{
    width: 100%;
    box-sizing: border-box;

    
   
}
</style>