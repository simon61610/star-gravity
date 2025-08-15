<script setup>
</script>

<template>
    <aside class="admin-sidebar-aside">
        <div class="admin-sidebar-wapper">
            <ul class="admin-sider-ul">
                <li>會員管理</li>
                <li>訂單管理</li>
                <li>活動資訊管理</li>
                <li>商城管理</li>
                <li>天文快訊管理</li>
                <li>地點管理</li>
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
                color: black;
                &:hover{
                    color: azure;
                }
            }
        }
    }
}

</style>