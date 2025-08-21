<script setup>
    import {ref} from 'vue'
//    import AdminHeader from '@/components/admin/AdminHeader.vue';
    import AdminToolbar from '@/components/admin/AdminToolbar.vue';
    import AdminOrder from '@/components/admin/management/AdminOrder.vue';
//    import AdminSidebar from '@/components/admin/AdminSidebar.vue';
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
                    title="訂單管理">
                    </AdminToolbar>
               
                <AdminOrder :search="search"/>

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