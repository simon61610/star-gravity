<script setup>
    import { toast } from '@/composables/useToast';


</script>


<template>
    <transition name="fadeShopToast">
        <section class="shop-toast" v-show="toast.show">
            <div>{{ toast.message }}</div>
        </section>
    </transition>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    

    .shop-toast {
        position: fixed;
        top: 12px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        padding: 16px 40px;
        background-color: $primaryColor-500;
        opacity: .8;
        z-index: 1000;
        border-radius: 16px;
    }



</style>