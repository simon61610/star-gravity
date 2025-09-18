<script setup>
    import {ref} from 'vue'
    import { onMounted, onBeforeUnmount } from "vue"
    import AdminHeader from '@/components/admin/AdminHeader.vue';
    import AdminSidebar from '@/components/admin/AdminSidebar.vue';

    onMounted(() => {
        document.body.classList.add("admin-layout")
        console.log("AdminLayout mounted")
        })

        onBeforeUnmount(() => {
        document.body.classList.remove("admin-layout")
    })
</script>
<template>
 
        <div class="Admin-home-wapper">
            <header>
                <AdminHeader/>
            </header>
            <main class="Admin-home-box">
                <router-view/>
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
        justify-content:center;
        align-items: flex-start;
        flex-direction: row-reverse;
       

    }
}
</style>