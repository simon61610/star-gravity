<template>      <!-----忘記密碼2------->

    <div class="forget-all2">

        <div class="all2">
            <div class="forget-two" >
                <h2>忘記密碼</h2>
            </div>

            <div class="code-input">
                <input type="text" class="code-input" placeholder="請輸入驗證碼" v-model="code"/>
            </div>




        </div>

            

            
        
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.forget-all2{
    width: 100%;
    height: calc(100vh - 350px);
    background-image: url(../../../assets/images/member/login-bgi.png);  
    background-size: cover;
    margin-top: 0;
}
.all2{
    padding-top: 50px;
}
.forget-two{
    background-color: $primaryColor-800;
    width: 280px;
    height: 50px;
    border-radius: 8px;
    margin: 0px auto;
}
.forget-two h2{
    font-size: $pcChFont-H4;
    color: $FontColor-white;
    line-height: 50px;
    text-align: center;
}
.code-input{}

</style>

<script setup>
    import { ref } from 'vue'

    // 定義響應式變數，預設空字串
    const code = ref('')
</script>