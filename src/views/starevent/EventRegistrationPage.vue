<!-- 
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

    import { useMemberStore } from '@/stores/member';

    const memberStore = useMemberStore()

    const router = useRouter()
    const route = useRoute()

    const event_id = route.params.id // 活動 id
    const member_id = memberStore.user?.ID // 會員 ID

    // 表單物件
    const name = ref('')
    const gender = ref('')
    const phone = ref('')
    const email = ref('')


    // 會員資料相同功能
    const sameAsMember = ref(false)

    const doSameAsMember = async () => {
        // console.log(sameAsMember.value)
        if(sameAsMember.value){
            // 抓取會員資料
            try{
                const res = await axios.get(import.meta.env.VITE_AJAX_URL + "Member/getMember_forSame.php", {
                    params: {member_id }
                })

                console.log(res.data.memberInfo)

                if(res.data.success && res.data.memberInfo){
                    const m = res.data.memberInfo
                    name.value = m.name || ''
                    gender.value = m.gender || ''
                    phone.value = m.phone || ''
                    email.value = m.email || ''
                }else{
                    showToast('會員資料取得失敗')
                    console.log(res.data.message)
                }
                

            }catch(err){
                console.error(res.data.message)
                showToast('請稍後再試')
            }
        }else{
            cleanForm()
        }
    }

    const cleanForm = () => {
        name.value = ''
        gender.value = ''
        phone.value = ''
        email.value = ''
    }


    // 前往繳費: 送出報名
    const submitRegistration = async () => {
        if (!memberStore.isAuthed) {
            showToast('請先登入會員再報名')
            return
        }

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
            // 跳轉報名成功頁面
            router.push({
                path: '/eventsuccess',
                query: {
                    registration_number: res.data.registration_number
                }
            })
            console.log(res.data.message)
            // showToast('報名成功！')
        }else {
            console.error(res.data.error || null)
            showToast(res.data.message)
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
                <label >
                    <input type="checkbox" v-model="sameAsMember" @change="doSameAsMember"> 報名資料與會員資料相同
                </label>
            </div>
            <div class="box">
                <h3>*姓名</h3>
                <input type="text" v-model="name" :disabled="sameAsMember">
            </div>
            <div class="box">
                <h3>*性別</h3>
                <div>
                    <label>
                        <input type="radio" v-model="gender" value="男性" :disabled="sameAsMember"> 男
                    </label>
                    <label>
                        <input type="radio" v-model="gender" value="女性" :disabled="sameAsMember"> 女
                    </label>
                    <label>
                        <input type="radio" v-model="gender" value="第三性" :disabled="sameAsMember"> 第三性
                    </label>
                </div>
            </div>
            <div class="box">
                <h3>*行動電話</h3>
                <input type="text" v-model="phone" :disabled="sameAsMember">
            </div>
            <div class="box mail">
                <h3>*電子信箱</h3>
                <div>
                    <input type="text" v-model="email" :disabled="sameAsMember">
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