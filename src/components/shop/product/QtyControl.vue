<!-- 
1. 控制輸入框只能輸入數字
2. 有 bug，數字輸入有問題
3. 庫存不足時 → 可以讓「立即購買」或「加入購物車」直接 disabled
-->
<script setup>
import {ref} from 'vue'

const num = ref(1) // 數量
const stock = ref(10) // 庫存量
// const canNotClick = ref(true)

// 增減按鈕
const addNum = () => {
    if(num.value < stock.value){
        num.value++
    }
}
const reduceNum = () => {
    if(num.value > 1){
        num.value--
    }
}

// 輸入數字
const inputNum = () => {

    // 如果大於庫存，等於庫存量
    if (num.value > stock.value) {
        num.value = stock.value
    }
    // 如果小於 1，等於 1
    if (num.value == "") {
        num.value = 1
    }
}

// 控制按鈕變色 => 改寫到 template 中判斷
// canNotClick.value = num.value > 1 ? false : true
// console.log(canNotClick.value)


</script>


<template>
    <p class="stock">尚有庫存 <span>{{ stock }}</span> 件</p>
    <!-- <h1 class="title">數量</h1> -->
    <section class="qty-control">
        <div class="reduce-btn" @click="reduceNum" :class="{forbid: num <= 1}">-</div>
        <input class="num" type="number" v-model="num" @input="inputNum" min="1" :max="stock">
        <div class="add-btn" @click="addNum" :class="{forbid: num >= stock}">+</div>
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';


    // .title, .stock {
    .stock {
        font-size: $pcChFont-p;
        margin-bottom: 12px;

        span {
            color: $secondaryColor-orange;
        }
    }

    .qty-control {
        display: flex;
        .num {
            font-size: $pcChFont-p;
            text-align: center;
            // flex-grow: 1;
            width: 60px;

            /* 隱藏 type="number" 的按鈕 */
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
        .add-btn, .reduce-btn {
            width: 28px;
            line-height: 28px;
            color: white;
            font-size: $pcChFont-p;
            background-color: #444;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
        }
        .reduce-btn.forbid, .add-btn.forbid {
            background-color: #888;
            cursor: not-allowed;
        }
    }



</style>