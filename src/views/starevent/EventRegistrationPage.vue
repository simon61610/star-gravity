<!-- 
 待新增報名編號
 待新增確認重複報名
 待串會員
-->


<script setup>
    import { ref } from 'vue';
    import ApplyBanner from '@/components/starevent/ApplyBanner.vue';

    // route
    import { useRouter } from 'vue-router';
    import { useRoute } from 'vue-router';
    
    import axios from 'axios';

    import shopToast from '@/components/common/shopToast.vue';
    import { showToast } from '@/composables/useToast';

    const router = useRouter()
    const route = useRoute()

    const event_id = route.params.id // 活動 id
    const member_id = 1008 // 暫時寫死

    // 表單物件
    const name = ref('')
    const gender = ref('')
    const phone = ref('')
    const email = ref('')

    // 前往繳費: 送出報名
    const submitRegistration = async () => {
        if (!name.value.trim() || !gender.value.trim() || !phone.value.trim() || !email.value.trim()) {
            showToast('請填寫必填欄位！')
            return
        }

        const joiner = {
            event_id,
            member_id,
            name: name.value,
            gender: gender.value,
            phone: phone.value,
            email: email.value
        }

        const res = await axios.post(import.meta.env.VITE_AJAX_URL + "activity/client/joiner_insert.php", joiner) 
        
        if(res.data.success){
            router.push('/eventsuccess')
            console.log(res.data.message)
            // showToast('報名成功！')
        }else {
            console.log(res.data.message)
            showToast('報名失敗，請洽客服人員')
        }
    }
    




    const goback = () => {
        router.back()
    }
</script>



<template>
    <ApplyBanner/>

    <shopToast />

    <section class="registration-section">
        <div class="form">
            <div class="box equal-member">
                <input type="checkbox"> 報名資料與會員資料相同
            </div>
            <div class="box">
                <h3>*姓名</h3>
                <input type="text" v-model="name">
            </div>
            <div class="box">
                <h3>*性別</h3>
                <div>
                    <label>
                        <input type="radio" v-model="gender" value="男"> 男
                    </label>
                    <label>
                        <input type="radio" v-model="gender" value="女"> 女
                    </label>
                    <label>
                        <input type="radio" v-model="gender" value="第三性"> 第三性
                    </label>
                </div>
            </div>
            <div class="box">
                <h3>*行動電話</h3>
                <input type="text" v-model="phone">
            </div>
            <div class="box mail">
                <h3>*電子信箱</h3>
                <div>
                    <input type="text" v-model="email">
                    <p>（活動資訊將以此 E-mail 通知您）</p>
                </div>
            </div>
        </div>
        
        <!-- ---------------- 按鈕區 ---------------- -->
        <section class="btn-box">
            <p class="previous-btn" @click="goback">< 返回上一步</p>
            <!-- <router-link to="/eventsuccess" class="router-link"> -->
                <p class="next-btn" @click="submitRegistration">前往繳費</p>
            <!-- </router-link> -->
        </section>
    </section>
</template>


<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.router-link {
    text-decoration: none;
}

.registration-section {
    font-size: 20px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 40px 16px;

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        // border: 1px solid red;
    }

    .box {
        h3 {
            margin-bottom: 16px;
        }
        

        // text
        input[type="text"], textarea {
            padding: 16px 20px;
            font-size: $pcChFont-H4;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #888;
            border-radius: 8px;
            font-family: $chFont;
        }
    }

    // 個別調整
    .equal-member {
        color: #888;
    }

    .mail {
        p {
            color: #888;
            margin-top: 12px;
        }
    }




    // --------- 按鈕區 ---------
    .btn-box {
        font-size: $pcChFont-H4;
        display: flex;
        justify-content: space-between;
        padding-top: 32px;
        border-top: 1px solid #ccc;

        .previous-btn, .next-btn {
            cursor: pointer;
        }
        .previous-btn {
            color: #888;
            &:hover {
                text-decoration: underline;
            }
        }
        .next-btn {
            width: 320px;
            padding: 12px;
            border-radius: 999px;
            color: white;
            background-color: $secondaryColor-orange;
            text-align: center;
            &:hover {
                background-color: $primaryColor-900;
            }
        }
    }
}


@media screen and (max-width: 431px) {
    
    .registration-section {
        .btn-box {
            flex-direction: column-reverse;
            gap: 16px;
            align-items: center;

            .previous-btn, .next-btn {
            }
            .previous-btn {
            }
            .next-btn {
                width: 80vw;
            }
        }
    }
}








</style>