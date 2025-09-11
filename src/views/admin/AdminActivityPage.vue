<script setup>
    import {ref} from 'vue'
   // import AdminHeader from '@/components/admin/AdminHeader.vue';
    import AdminToolbar from '@/components/admin/AdminToolbar.vue';
  //  import AdminSidebar from '@/components/admin/AdminSidebar.vue';
    import AdminActivity from '@/components/admin/management/AdminActivity.vue';
    import axios from "axios";
    import {activityAPI} from '@/api/activityAPI.js'
    import {useSearchStore } from "@/stores/search"
    const childRef = ref(null) //設置變數裝子層編輯按鈕的資訊
    const store = useSearchStore()  //呼叫搜尋函數
    const eventTable = ref([])
    const location = ref([])


    // 一開始載入動活動資料
    activityAPI("get").then(res => {
    eventTable.value = res.data
    })

    //載入地點API
    axios.post(import.meta.env.VITE_AJAX_URL + "map/getLocationList.php",).then(res=>{
        location.value = res.data.map(item => item.location_name)
    })
    

    function handleUpdate(updatedRow) {
        const index = eventTable.value.findIndex(a => a.ID === updatedRow.ID)
        if (index !== -1) {
            eventTable.value[index] = updatedRow
        }
        }

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
                    v-model:search="store.keyword"
                    title="活動管理">
                         <template #add>
                            <el-button @click="openadd" type="warning" size="small"  style="font-size: 16px ; color:black ;width: 144px; height:40px; border-radius:10px">新增</el-button> <!---template如果有具名(例如#add)就一定要被外層包起來--->
                        </template>             
                    </AdminToolbar>
               
                <AdminActivity ref="childRef" :search="store.keyword"  @added="eventTable.push($event)" @updated="handleUpdate($event)"  :eventTable = "eventTable" :location= "location" /> <!--這裡要用ref建立子層實例(接彈窗資料)-->

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