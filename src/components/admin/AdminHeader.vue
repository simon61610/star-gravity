<script setup>
import  logo from '@/assets/logos/logo-admin.svg'
</script>

<template>
    <nav class="admin-header-navbar">
        <div class="admin-header-wrapper">
            <div class="admin-header-logo">
                <router-link to="/"><img :src="logo" alt="星引力logo" width="120" height="50"/></router-link>
            </div>
           
            <div class="admin-header-logout">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
        </div>
    </nav>

</template>

<style scoped>
@import '@/assets/styles/main.scss';
    .admin-header-navbar{
        width: 100%;
        background-color: black;
        .admin-header-wrapper{
            margin: 0 auto;
            max-width: 1200px;
            display: flex;
            justify-content: space-between;
            
            .admin-header-logout{
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                .fa-solid.fa-arrow-right-from-bracket{
                    font-size: 30px;
                }
            }
        }
    }


</style>