<template>   <!----- 重設密碼 ----->
        <div class="allall">
            <div class="title" >
                <h2>重設密碼</h2>
            </div>
  
          <!------- 新密碼 ------->
            <div class="field-all">
                <div class="field">
                    <el-input
                      v-model="pwd1"
                      :class="{ 'is-invalid': isTooShort }"
                      style="width: 560px; height: 50px; font-size: 14px;"
                      type="password"
                      placeholder="請輸入新密碼(至少6碼)"
                      show-password
                    />
                </div>
                <div class="field2">
                    <el-input
                      v-model="pwd2"
                      :class="{ 'is-invalid': isMismatch }"
                      style="width: 560px; height: 50px; font-size: 14px;"
                      type="password"
                      placeholder="請再次確認密碼"
                      show-password
                    />
                </div>
                <!-- 提示訊息（有輸入才顯示） -->
                <p v-if="isTooShort" class="err">密碼至少 {{ MIN_LEN }} 碼</p>
                <p v-else-if="isMismatch" class="err">兩次輸入的密碼不一致</p>

                <div class="confirmto">  
                    <button class="confirm" :disabled="!canSubmit || loading" @click="submit">
                        {{ loading ? '處理中…' : '確認' }}
                    </button>
                </div>

            </div>
        </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.allall{
    padding-top: 50px;
}
.title{
    // background-color: $primaryColor-800;
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
/* 簡單的錯誤樣式 */
.is-invalid :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #e03131 inset;   /* 紅框 */
}
.err {
  margin-top: 8px;
  color: #e03131;
  font-size: 14px;
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
    import { ref, computed } from 'vue'

    import { ElMessage } from 'element-plus'  
    const loading = ref(false)                

    import { useRouter } from 'vue-router'
    const router  = useRouter() 
    
    const pwd1 = ref('')
    const pwd2 = ref('')

    const MIN_LEN = 6 // 密碼設定多少數

    // 長度不足（有輸入才判斷）
    const isTooShort = computed(() => pwd1.value !== '' && pwd1.value.length < MIN_LEN)
    // 兩次不一致（都有輸入才判斷）
    const isMismatch = computed(() =>
        pwd1.value !== '' && pwd2.value !== '' && pwd1.value !== pwd2.value
    )
    //  可送出條件 = 長度足夠 且 密碼一致
    const canSubmit = computed(() =>
        pwd1.value.length >= MIN_LEN &&
        pwd2.value.length >= MIN_LEN &&
        !isMismatch.value
    )

    // 送出動作，成功後用 router.replace('/loginfirst') 回登入頁
    const submit = async () => {
        if (isTooShort.value) { ElMessage.error(`密碼至少 ${MIN_LEN} 碼`); return }
        if (isMismatch.value) { ElMessage.error('兩次輸入的密碼不一致'); return }
        if (!canSubmit.value || loading.value) return

        loading.value = true
        try {
            // TODO: 換成你的實際 API
            // await axios.post('/api/reset-password', { password: pwd1.value })
            await new Promise(r => setTimeout(r, 600)) 
            ElMessage.success('密碼重設成功')
            router.replace('/loginfirst') 
        } catch (e) {
            ElMessage.error('重設失敗，請稍後再試')
        } finally {
            loading.value = false
        }
    }

</script>