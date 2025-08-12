<template>
    <!-- 評論攔 -->
    <div class="mapreview-writePlace">
        <h3>會員名稱</h3>
        <div class="review-writePlace-score">
            <img src="../../assets/icons/icon-borderStar.svg" alt="空星星">
            <img src="../../assets/icons/icon-borderStar.svg" alt="空星星">
            <img src="../../assets/icons/icon-borderStar.svg" alt="空星星">
            <img src="../../assets/icons/icon-borderStar.svg" alt="空星星">
            <img src="../../assets/icons/icon-borderStar.svg" alt="空星星">
        </div>
        <div class="review-writePlace-text">
            <h5>*說出你的想法：</h5>
            <textarea name="" id=""></textarea>
            <p>字數：0/300</p>
        </div>
        <div class="review-writePlace-photo">
            <h5>上傳照片：</h5>
            <input type="file">
        </div>
        <div>
            <button class="cancel">取消</button>
            <button class="submit">張貼</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../assets/styles/main.scss';

</style>