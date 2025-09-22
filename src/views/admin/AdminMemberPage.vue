<script setup>
    import {ref} from 'vue'
  //  import AdminHeader from '@/components/admin/AdminHeader.vue';
    import AdminToolbar from '@/components/admin/AdminToolbar.vue';
    import AdminMember from '@/components/admin/management/AdminMember.vue';
  //  import AdminSidebar from '@/components/admin/AdminSidebar.vue';
    const search = ref('')
    
</script>

<template>
    <div class="Admin-home-wapper">
        <header>
         
        </header>
        
        
        <main class="Admin-home-box">
            <div class="Admin-home-centent">
                
                    <AdminToolbar
                    v-model:search="search"
                    title="會員管理">
                    </AdminToolbar>
               
                <AdminMember :search="search"/>

            </div>
        </main>
 
    </div>
</template>

<style scoped>
.Admin-home-wapper{
    width: 100%;
    box-sizing: border-box;

    
    
}
</style>