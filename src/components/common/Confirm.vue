<script setup>

    import { ref } from 'vue'

    const props = defineProps({
    show: { type: Boolean, default: false },
    // title: { type: String, default: '確認' },
    message: { type: String, default: '是否確定要繼續？' }
    })

    const emits = defineEmits(['confirm', 'cancel'])

</script>


<template>
    <div v-if="props.show" class="confirm-modal">
    <!-- <div class="confirm-modal"> -->
        <div class="confirm-box">
            <!-- <h2>{{ props.title }}</h2> -->
            <p>{{ props.message }}</p>
            <div class="btns">
                <button @click="$emit('cancel')">取消</button>
                <button @click="$emit('confirm')">確定</button>
            </div>
        </div>
  </div>
</template>



<style scoped lang="scss">

@import '@/assets/styles/main.scss';

.confirm-modal {
    position: fixed;
    inset: 0;
    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,.4);
    z-index: 10000;

    .confirm-box {
        background: $primaryColor-900;
        // padding:20px;
        border-radius:8px;
        min-width:280px;
        // text-align:center;
        overflow: hidden;
        padding: 24px;
        /* h2 {
            font-size: 24px;
            padding: 12px;
            margin-bottom: 12px;
            background-color: #9187B9;
            color: white;
        } */
        text-align: center;
        p {
            margin-bottom: 40px;
            font-size: 24px;
            color: white;
        }
        .btns {
            display: flex;
            gap: 20px;
            // border: 1px solid red;
            justify-content: center;
            button {
                font-size: 16px;
                border: none;
                background-color: $secondaryColor-orange;
                color: white;
                padding: 8px 20px;
                cursor: pointer;
                border-radius: 999px;
            }
            button:hover {
                background-color: $secondaryColor-orange;
            }
        }
    }
}



</style>