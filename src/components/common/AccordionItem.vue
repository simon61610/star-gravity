<script setup>
    import { ref } from 'vue'
    
    const props = defineProps(['title', 'defaultOpen']) // 由子組件接收屬性
    
    // console.log(props) // Object {title: '付款方式', defaultOpen: false}
    const isOpen = ref(props.defaultOpen)

    const toggle = () => { // 展開收合
        isOpen.value = !isOpen.value
    }


</script>



<template>
    <section class="accordion-item">
        <div class="accordio-btn" @click="toggle">
            <h1 class="title" :class=" {'arrow-r': isOpen}">{{ title }}</h1>
        </div>
        <div class="content" :class="{'open': isOpen}">
            <slot></slot> <!-- 預留給父組件的插槽 -->
        </div>
    </section>
</template>



<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .accordion-item {
        .accordio-btn {
            padding-bottom: 16px;
            border-bottom: 1px solid white;
            margin-bottom: 16px;
            cursor: pointer;

            .title {
                position: relative;
                font-size: 24px;
                padding-left: 28px;

                &::after {
                    content: "";
                    display: block;
                    width: 12px;
                    height: 12px;
                    border-top: 3px solid white;
                    border-right: 3px solid white;

                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%) rotate(45deg);
                    transform-origin: center;
                    transition: all .3s ease;
                }
            }
            
            .title.arrow-r {
                &::after {
                    transform: translateY(-50%) rotate(135deg);
                }
            }


            /* //旋轉效果模擬
            .title:hover {
                &::after {
                    transform: translateY(-50%) rotate(135deg);
                }
            } 
            */
        }

        .content {
            padding-left: 24px;
            max-height: 0;
            overflow: hidden;
            transition: all .5s ease;
            margin-bottom: 16px;
        }
        .content.open {
            max-height: 600px;
        }
    }
    
</style>