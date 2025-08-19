<script setup>
    import {ref} from 'vue'
    import AdminHeader from '@/components/admin/AdminHeader.vue';
    import AdminToolbar from '@/components/admin/AdminToolbar.vue';
    import AdminSidebar from '@/components/admin/AdminSidebar.vue';
    import AdminComment from '@/components/admin/management/AdminComment.vue';
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
                    title="評論管理">
                    </AdminToolbar>
               
                <AdminComment :search="search"/>

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