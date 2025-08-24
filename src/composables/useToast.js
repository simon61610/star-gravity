// 使用方式:
/* 
1. 先在 template 中插入組件，以下複製貼上
    組件:                   <shopToast />
    import 組件程式碼:       import shopToast from '@/components/shop/shopToast.vue';

2. 使用 showToast 方法，以下複製貼上
    import 方法程式碼:       import { showToast } from '@/composables/useToast';
    在要呼叫方法的地方貼上:   showToast('你想出現的字串，引號別刪除')

範例: showToast('已成功加入購物車!')
*/



import { ref } from 'vue'

export const toast = ref({show: false, message: ""})

export const showToast = (msg) => {
    toast.value = { show: true, message: msg}
    setTimeout(() => {
        toast.value.show = false
    }, 2000)
}

