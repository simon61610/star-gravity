<script setup>
    import { computed } from 'vue'

    // 接收父組件屬性 + 屬性值
    const props = defineProps({
        steps: {
            type: Array,
            required: true
        }, 
        current: {
            type: Number,
            required: true
        }
    })

    /* ========== Progress 百分比 ========== */
    const percent = computed(() => 
        ( props.current / props.steps.length ) * 100
    )
</script>


<template>
    <section class="checkout-stepper">
        <!-- 步驟 -->
        <div class="steps">
            <div
                class="step"
                v-for="(title, index) in steps"
                :class="{ active: index + 1 <= current}"
            >
                <!-- 步驟數字 -->
                <div class="step-number" :class="{ active: index + 1 <= current}">
                    {{ index + 1 }}
                </div>
                <!-- 步驟標題 -->
                <p class="step-title">{{ title }}</p>
            </div>
        </div>

        <!-- 步驟條 -->
        <div class="progress">
            <div class="bar" :style="{ width: percent + '%'}"></div>
        </div>
    </section>




</template>



<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .checkout-stepper {

        // ----- 步驟 -----
        .steps {
            display: flex;
            justify-content: space-around;
            margin-bottom: 24px;
            .step {
                color: $primaryColor-500;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                transition: all .5s ease;
                .step-number {
                    font-size: 16px;
                    font-weight: bold;
                    border: 3px solid $primaryColor-500;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    aspect-ratio: 1 / 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    transition: all .5s ease;
                }
                .step-number.active { // 用屬性值 true false 判斷是否加上
                    border: 3px solid $primaryColor-900;
                }
                .step-title {}
            }
            .step.active {
                color: $primaryColor-900;
            }
        }

        // ----- 步驟條 -----
        .progress {
            width: 100%;
            height: 12px;
            border-radius: 999px;
            background-color: #ccc;
            overflow: hidden; // 遮住進度條

            .bar {
                height: 100%;
                background-color: $primaryColor-900;
                border-radius: 999px;
                transition: all .3s ease;
            }
        }
    }


</style>