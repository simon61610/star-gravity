<script setup>
    import { onMounted } from 'vue';

    const props = defineProps(["productName", "productIntro"])
    
    onMounted(() => {
        // console.log(props.productIntro)
    })
    


</script>


<template>
    <section class="prod-intro">
        <h1>商品描述</h1>
        <h2>{{ props.productName }}</h2>
        <p>{{ props.productIntro }}</p>
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';
    .prod-intro {
        background-color: white;
        padding: 48px;
        border-radius: 32px 32px 0 0;
        font-size: $pcChFont-H3;
        
        h1 {
            font-weight: bold;
            margin-bottom: 24px;
        }
        h2 {
            margin-bottom: 40px;
            color: #888;
        }
        p {
            line-height: 1.5;
            color: #444;
        }
    }



</style>