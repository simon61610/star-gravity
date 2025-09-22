<script setup>
    import axios from 'axios';

    import {ref} from 'vue'
    // import AdminHeader from '@/components/admin/AdminHeader.vue';
    import AdminToolbar from '@/components/admin/AdminToolbar.vue';
    // import AdminSidebar from '@/components/admin/AdminSidebar.vue';
    import AdminShop from '@/components/admin/management/AdminShop.vue';
    const search = ref('')

    const shopRef = ref(null)

    const openAdd = () => {
        shopRef.value.openModal()
    }


    // =============================================

    // 測試範例
    /* const testProduct = ref([])

    const fetchData = async () => {
        const res = await axios.get('http://localhost/pdo/starshop/admin/test.php')
        // const res = await axios.get('pdo/starshop/admin/test.php')

        const data = res.data
        testProduct.value = data[0]
        console.log(testProduct.value)
    } */
    
</script>

<template>
    <div class="Admin-home-wapper">
        <header>
            
        </header>
        
        
        <main class="Admin-home-box">
            <div class="Admin-home-centent">
                
                    <AdminToolbar
                    v-model:search="search"
                    title="商城管理">
                        <template #add>
                            <el-button 
                                type="warning"
                                size="small" 
                                style="font-size: 16px ; color:black ;width: 144px; height:40px; border-radius:10px"
                                @click="openAdd"
                            >
                                新增
                            </el-button> <!---template如果有具名(例如#add)就一定要被外層包起來--->
                        </template>          
                    </AdminToolbar>
               
                <AdminShop :search="search" ref="shopRef" />

            </div>


            <!-- 測試範例 -->
            <!-- 
            <div>
                <h1 @click="fetchData" style="cursor: pointer;">測試抓資料</h1>
                <div>商品名稱: {{ testProduct.name }}</div>
                <div>商品金額: {{ testProduct.sale_price }}</div>
                <img :src="'pdo' + testProduct.image">
            </div> 
            -->

          
        </main>
 
    </div>
</template>

<style scoped>
.Admin-home-wapper{
    width: 100%;
    box-sizing: border-box;

    
    
}
</style>