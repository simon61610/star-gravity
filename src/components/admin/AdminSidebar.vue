<script setup>
</script>

<template>
    <aside class="admin-sidebar-aside">
        <div class="admin-sidebar-wapper">
            <ul class="admin-sider-ul">
                <li><router-link to="/AdminMemberPage">會員管理</router-link></li>
                <li><router-link to="/AdminOrderPage">訂單管理</router-link></li>
                <li><router-link to="/AdminActivityPage">活動資訊管理</router-link></li>
                <li><router-link to="/AdminShopPage">商城管理</router-link></li>
                <li><router-link to="/AdminNewsPage">天文快訊管理</router-link></li>
                <li><router-link to="/AdminCommentPage">評論管理</router-link></li>
            </ul>
        </div>
    </aside>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.admin-sidebar-aside{
   width: 150px;
   height: 340px;
    .admin-sidebar-wapper{
        
        max-width: 150px;
        width: 100%;
        
       
        .admin-sider-ul{
            max-width: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap:20px;
           
            li{ 
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-radius: 10px;
                background-color:$primaryColor-500;
                font-weight: bold;
                
                
                a{  
                    color: black;
                    text-decoration: none;
                    &:hover{
                    color: azure;
                }
                }
                
            }
        }
    }
}

</style>