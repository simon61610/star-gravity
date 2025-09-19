<script setup>

    import { ref } from 'vue'

    const props = defineProps({
    show: { type: Boolean, default: false },
    title: { type: String, default: '確認' },
    message: { type: String, default: '是否確定要繼續？' }
    })

    const emits = defineEmits(['confirm', 'cancel'])

</script>


<template>
    <div v-if="props.show" class="confirm-modal">
    <!-- <div class="confirm-modal"> -->
        <div class="confirm-box">
            <h2>{{ props.title }}</h2>
            <p>{{ props.message }}</p>
            <div class="btns">
                <button @click="$emit('cancel')">取消</button>
                <button @click="$emit('confirm')">確定</button>
            </div>
        </div>
  </div>
</template>



<style scoped lang="scss">

.confirm-modal {
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,.4);
    z-index:10000;

    .confirm-box {
        background:#fff;
        // padding:20px;
        border-radius:8px;
        min-width:280px;
        // text-align:center;
        overflow: hidden;
        h2 {
            padding: 12px;
            margin-bottom: 12px;
            background-color: #9187B9;
            color: white;
        }
        p {
            text-align: center;
            padding-left: 12px;
        }
        .btns {
            padding: 12px;
            display:flex;
            justify-content:center;
            gap:12px;
            margin-top:20px;
            button {
                padding:8px 16px;
                border:none;
                border-radius:4px;
                cursor:pointer;
            }
        }
    }
}



</style>