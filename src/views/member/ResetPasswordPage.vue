<template>   <!----- 重設密碼 ----->
    <div class="reset-all">
        <div class="allall">
            <div class="title" >
                <h2>重設密碼</h2>
            </div>
  
          <!------- 新密碼 ------->
            <div class="field-all">
                <div class="field">
                    <el-input
                      v-model="pwd1"
                      style="width: 560px; height: 50px; font-size: 14px;"
                      type="password"
                      placeholder="請輸入新密碼"
                      show-password
                    />
                </div>
                <div class="field2">
                    <el-input
                      v-model="pwd2"
                      style="width: 560px; height: 50px; font-size: 14px;"
                      type="password"
                      placeholder="請再次確認密碼"
                      show-password
                    />
                </div>
                
                <!-- <div v-if="pwd2 && !isMatch" class="error-msg">
                    兩次輸入的密碼不一致
                </div> -->
              
                <div class="confirmto">    <!------- 確認完會直接導入登入畫面 ------->
                  <!-- <button class="confirm" :disabled="!canSubmit" @click="submit">
                    確認
                  </button> -->
                    <button class="confirm" :disabled="!canSubmit || loading" @click="submit">
                        {{ loading ? '處理中…' : '確認' }}
                    </button>
                </div>

            </div>
        </div>

    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.reset-all{
    width: 100%;
    min-height: calc(100vh - 320px);
    background-image: url(@/assets/images/member/login-bgi.png);  
    background-size: cover;
    margin-top: 0;
}
.allall{
    padding-top: 50px;
}
.title{
    background-color: $primaryColor-800;
    width: 280px;
    height: 50px;
    border-radius: 8px;
    margin: 0 auto;
}
.title h2{
    font-size: $pcChFont-H4;
    color: $FontColor-white;
    line-height: 50px;
    text-align: center;
}
.field-all{
    width: 560px;
    margin: 0 auto;
}
.field{
    margin-top: 20px;
    margin-bottom: 20px;
    flex-direction: column;
    gap: 20px;
}
.confirmto{
    width: 240px;
    margin: 0 auto;
}
.confirm{
    background-color: $primaryColor-500;
    color: $FontColor-white;
    font-size: $pcChFont-p;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    width: 240px;
    height: 45px;
}
</style>

<script setup>
    import { ElMessage } from 'element-plus'  // 新增
    const loading = ref(false)                // 新增

    import { ref, computed } from 'vue'

    const pwd1 = ref('')
    const pwd2 = ref('')


    // 判斷密碼同樣才可以送出
    const canSubmit = computed(() => {    
    return pwd1.value.length > 0 &&
           pwd2.value.length > 0 &&
           pwd1.value === pwd2.value
    })
    // const isMatch = computed(() => pwd1.value === pwd2.value) 

    // 送出動作
    // const submit = () => {
    // console.log('送出的密碼:', pwd1.value)
    // }

    // 送出動作
    const submit = async () => {
        if (!canSubmit.value || loading.value) return
        loading.value = true
        try {
            // TODO: 這裡改成你的實際 API 呼叫，例如：
            // await axios.post('/api/reset-password', { password: pwd1.value })
            await new Promise(r => setTimeout(r, 600)) // 模擬呼叫

            ElMessage.success('密碼重設成功')
            // 有使用 vue-router 可改：router.push('/login')
            setTimeout(() => { window.location.href = '/loginfirst' }, 800)    // 按送出後就可直接到登入頁
        } catch (e) {
            ElMessage.error('重設失敗，請稍後再試')
        } finally {
            loading.value = false
        }
    }


</script>