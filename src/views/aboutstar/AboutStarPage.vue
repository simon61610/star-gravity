<template>
    <div class="wrapper">
        <AboutStarTitle/>
        <AboutStarTop/>
        <AboutStarSecond/>
        <AboutStarForm/>
        <AboutStarLast/>

    </div>


</template>

<script setup>
    // 組件
    import AboutStarTitle from '@/components/aboutstar/AboutStarTitle.vue';
    import AboutStarTop from '@/components/aboutstar/AboutStarTop.vue';
    import AboutStarSecond from '@/components/aboutstar/AboutStarSecond.vue';
    import AboutStarForm from '@/components/aboutstar/AboutStarForm.vue';
    import AboutStarLast from '@/components/aboutstar/AboutStarLast.vue';
</script>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';
    
    .wrapper{
        width: 100%;
        box-sizing: border-box;
        background-color: $bgColor-shop;
    }

</style>