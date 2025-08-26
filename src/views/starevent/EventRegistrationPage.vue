<script setup>
    import ApplyBanner from '@/components/starevent/ApplyBanner.vue';




</script>



<template>
    <ApplyBanner/>

    <section class="registration-section">
        <div class="form">
            <div class="box">
                <input type="checkbox"> 報名資料與會員資料相同
            </div>
            <div class="box">
                <h3>姓名</h3>
                <input type="text">
            </div>
            <div class="box">
                <h3>*性別</h3>
                <div>
                    <label>
                        <input type="radio" name="gender"> 男
                    </label>
                    <label>
                        <input type="radio" name="gender"> 女
                    </label>
                    <label>
                        <input type="radio" name="gender"> 第三性
                    </label>
                </div>
            </div>
            <div class="box">
                <h3>*行動電話</h3>
                <input type="text">
            </div>
            <div class="box">
                <h3>*電子信箱</h3>
                <div>
                    <input type="text">
                    <p>（活動資訊將以此 E-mail 通知您）</p>
                </div>
            </div>
        </div>
        
        <div>
            <p>< 返回上一步</p>
            <p>前往繳費</p>
        </div>
    </section>
</template>


<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.registration-section {
    font-size: 20px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 16px;

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .box {
        h3 {
            margin-bottom: 16px;
        }
    }
}











</style>