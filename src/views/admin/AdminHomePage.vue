<script setup>
    import AdminHeader from '@/components/admin/AdminHeader.vue';
    import AdminSidebar from '@/components/admin/AdminSidebar.vue';
    import AdminTable from '@/components/admin/AdminTable.vue';
    
</script>

<template>
    <div class="Admin-Login-wapper">
        <header>
            <AdminHeader/>
        </header>
        
            
      
        <main class="Admin-Login-box">
            <AdminTable/>
            <AdminSidebar/>
        </main>
 
    </div>
</template>

<style scoped>
.Admin-Login-wapper{
    width: 100%;
    box-sizing: border-box;
    
    .Admin-Login-box{
        gap: 40px;
        max-width: 1200px;
        margin: 40px auto 0;
        display: flex;
        justify-content: center;
        align-items:flex-start;
        flex-direction: row-reverse;

    }
}
</style>