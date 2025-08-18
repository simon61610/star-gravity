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
            <h5><span>*</span>說出你的想法：</h5>
            <textarea name="" id=""></textarea>
            <p>字數限制：0/300</p>
        </div>
        <div class="review-writePlace-photo">
            <h5>上傳照片：</h5>
            <div class="review-photo-input">
                <div class="photo-inputtitle">
                    <img src="../../assets/icons/icon-map-photoadd.svg" alt="">
                    <p>新增照片</p>
                </div>
                <input type="file">
            </div>
            
        </div>
        <div class="review-writePlace-button">
            <button class="cancel">取消</button>
            <button class="submit">張貼</button>
        </div>
    </div>

    
</template>

<style scoped lang="scss">
@import '../../assets/styles/main.scss';

.mapreview-writePlace{
    width: 430px;
    max-height: 680px;
    border: 2px solid $primaryColor-100;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    padding: 30px;
    box-sizing: border-box;

    font-family: $chFont;
    background-color: $FontColor-white;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 300;
}
.mapreview-writePlace h3{
    font-size: $pcChFont-H3;
}
.review-writePlace-score{
    display: flex;
    gap: 20px;

}
.review-writePlace-score img{
    width: 36px;
}
    //文字評論區
.review-writePlace-text{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.review-writePlace-text h5{
    font-size: $pcChFont-p ;
    margin-bottom: 8px;
}
.review-writePlace-text h5 span{
    color: red;
}
.review-writePlace-text textarea{
    width: 100%;
    height: 100px;
    resize: none;
    padding: 8px;
    box-sizing: border-box;
    font-size: $pcChFont-p;
}
.review-writePlace-text p {
    font-size:$pcChFont-small ;
    align-self: flex-end;
}
    //照片上傳區
.review-writePlace-photo{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.review-writePlace-photo h5{
    font-size: $pcChFont-p;
}
.review-photo-input{
    width: 360px;
    height: 270px;
    align-self: center;

    border: 1px solid $FontColor-black;
    border-radius: 20px;

    position: relative;
}
.review-photo-input input{
    width: 100%;
    height: 100%;
    opacity: 0;
}
.photo-inputtitle{
    display:flex;
    gap: 8px;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}
.photo-inputtitle p{
    font-size:$pcChFont-p ;
}
.photo-inputtitle img{
    width: 36px;
}

    //按鈕
.review-writePlace-button{
    display: flex;
    gap: 8px;
}
.review-writePlace-button button{
    width: 96px;
    height: 54px;
    font-size: $pcChFont-H4;
    border-radius: 5px;
}

.review-writePlace-button .cancel{
    background-color: #ffffff;
    color: $primaryColor-800;
    border: 1px solid $primaryColor-800;
}
.review-writePlace-button .submit{
    border: 1px solid $primaryColor-500;
    background-color: $primaryColor-500;
    color: #ffffff;

}

.review-writePlace-button button:hover{
    background-color: $primaryColor-800;
    border: 1px solid $primaryColor-800;
    color: #ffffff;
}

</style>

<script setup>

</script>
