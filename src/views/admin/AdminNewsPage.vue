<script setup>
    import {ref} from 'vue'
    import AdminHeader from '@/components/admin/AdminHeader.vue';
    import AdminToolbar from '@/components/admin/AdminToolbar.vue';
    import AdminSidebar from '@/components/admin/AdminSidebar.vue';
    import AdminNews from '@/components/admin/management/AdminNews.vue';
    const search = ref('')
    
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
                    title="文章管理">
                         <template #add>
                            <el-button type="warning" size="small"  style="font-size: 16px ; color:black ;width: 144px; height:40px; border-radius:10px">新增</el-button> <!---template如果有具名(例如#add)就一定要被外層包起來--->
                        </template>             
                    </AdminToolbar>
               
                <AdminNews :search="search"/>

            </div>

            <AdminSidebar/>
        </main>
 
    </div>
</template>

<style scoped>
.Admin-home-wapper{
    width: 100%;
    box-sizing: border-box;

    
    .Admin-home-box{
        gap: 40px;
        max-width: 1200px;
        margin: 40px auto 0;
        display: flex;
        justify-content: center;
        align-items:flex-start;
        flex-direction: row-reverse;
         .Admin-home-centent{
            width: 100%;
          
            
            
        
    }

    }
}
</style>