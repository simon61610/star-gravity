<script setup>
    import ApplyBanner from '@/components/starevent/ApplyBanner.vue';

    import { onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()

    const registration_number = route.query.registration_number

    onMounted(() => {
        // 沒有報名編號，自動導回活動頁面
        if(!registration_number){
            router.push('/events')
        }
    })

</script>

<template>
    <ApplyBanner/>

    <section class="success-section">
        <!-- 報名成功文字 -->
        <section class="show-success">
            <div class="success-icon">
                <img src="@/assets/icons/checkout-success.svg" alt="">
                <h2>您已報名完成！</h2>
            </div>
            <h1 class="order-number">報名編號：{{ registration_number }}</h1>
            <h3 class="member-center">查詢已報名活動，請至<span>會員中心</span></h3>
        </section>

        <!-- 按鈕區 -->
        <section class="btn-box">
            <router-link to="/" class="router-link">
                <p class="back-home">回到首頁</p>
            </router-link>
            <router-link to="/events" class="router-link">
                <p class="back-shop">查看其他活動</p>
            </router-link>
        </section>
    </section>

</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    // 共用
    .router-link {
        text-decoration: none;
    }

    .success-section {
        padding: 20px 24px 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;

        // ----- 報名成功文字 -----
        .show-success {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            .success-icon {
                text-align: center;
                img {
                    display: inline-block;
                    margin-bottom: 20px;
                }
                h2 {
                    font-weight: bold;
                    font-size: $pcChFont-H2;
                    color: $primaryColor-500;
                }
            }
            .order-number {
                font-size: $pcChFont-H1;
            }
            .member-center{
                font-size: $pcChFont-H4;
                span {
                    color: $secondaryColor-orange;
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

        }

        // ----- 按鈕 -----
        .btn-box {
            font-size: $pcChFont-H4;
            display: flex;
            justify-content: center;
            gap: 60px;
            .back-home, .back-shop {
                padding: 12px 0;
                width: 320px;
                border-radius: 999px;
                text-align: center;
                cursor: pointer;
            }
            .back-home {
                color: #888;
                border: 1px solid #888;
            }
            .back-shop {
                color: white;
                background-color: $secondaryColor-orange;
                &:hover {
                    background-color: $primaryColor-900;
                }
            }
        }
    }


    @media screen and (max-width: 431px) {
        .success-section {
            padding: 20px 24px 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;

            // ----- 報名成功文字 -----
            .show-success {
                .success-icon {
                    img {
                        width: 100px;
                    }
                    h2 {
                    }
                }
                .order-number {
                    font-size: 24px;
                }
                .member-center{
                    span {
                    }
                }

            }

            // ----- 按鈕 -----
            .btn-box {
                flex-direction: column;
                gap: 20px;
                .back-home, .back-shop {
                    flex-basis: 100%;
                }
                .back-home {
                }
                .back-shop {
                }
            }
        }




    }


</style>