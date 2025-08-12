<template>
    <!-- 動畫效果大區-->
    <Section class="special-effects">
       
        <!-- 視差滾動區塊 -->
        <div class="home-firstBlock">
            <img class="firstBlock-moon" src="../assets/images/home/index-moon.svg" alt="月亮">
            <!-- 星連星 -->
            <img class="firstBlock-star1" src="../assets/images/home/index-star01.svg" alt="星座A">
            <img class="firstBlock-star2" src="../assets/images/home/index-star02.svg" alt="星座B">
            <!-- 海與背景山 -->
            <img class="firstBlock-sea" src="../assets/images/home/index-sea.svg" alt="海">
            <img class="firstBlock-backMontain1" src="../assets/images/home/index-MountainBackLeft.svg" alt="左山景">
            <img class="firstBlock-backMontain2" src="../assets/images/home/index-MountainBackright.svg" alt="右山景">
            <!-- 前景燈塔與山 -->
            <img class="firstBlock-tower" src="../assets/images/home/index-lightHouse.svg" alt="燈塔">
            <img class="firstBlock-towerMountain" src="../assets/images/home/index-MountainInfron.svg" alt="前景山">
            <!-- 文字 -->
            <div class="firstBlock-text">
                <div class="firstBlock-texth1">
                    <h1 class="cnTitle--sm">星</h1>
                    <h1 class="cnTitle--sm">之</h1>
                    <h1 class="cnTitle--sm">所</h1>
                    <h1 class="cnTitle--sm">引</h1>
                </div>
                <p>每個人都是被星星溫柔牽引的旅人</p>
            </div>
        </div>

        <!-- 緣起? -->
        <div class="home-begining">
            <!-- 背景小星星 -->
            <img class="begining-bgStars" src="../assets/images/home/index-stars.svg" alt="">
            <!-- 人類 -->
            <img class="begining-person" src="../assets/images/home/index-people.svg" alt="人類">

            <!-- 流星 -->
            <div class="testbox">
                <!-- <img class="begining-starShot" src="../assets/images/home/index-starShot.svg" alt="流星"> -->
            </div>
            

            <div class="begining-text">
                <h1 class="decTitle--medium">ABOUT</h1>
                <h2 class="cnTitle--h2">緣起</h2>
                <p class="cnContent--18px">一段崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是崩潰的團專之旅，它的起源是一段崩潰的團專之旅，</p>
            </div>

        </div>

    </Section>


    <!-- 大div 包裹四區塊-->
    <div class="home-bigBox">
        <!-- 第一區About?? -->
        <div class="home-about"></div>
        <!-- 天文快訊 -->
        <div class="home-news"></div>

        <!-- 星空模擬 -->
        <div class="home-sky"></div>

        <!-- 活動資訊 -->
        <div class="home-activity"></div>


    </div>


</template>

<style scoped lang="scss">
@import '../assets/styles/main.scss';
//視差滾動區
.home-firstBlock{
    background-image: url(../assets/images/home/index-bgp1.png);
    background-size: cover;
    // background-color: $primaryColor-100;
    width: 100%;
    height: calc(100vh - 50px);

    position: relative;
}
.firstBlock-moon{
    width: 25vh;

    position: absolute;
    left: 15%;
    top: 10%;
}
.firstBlock-star1{
    height: 15vh;

    position: absolute;
    right: 20%;
    top: 8%;
}
.firstBlock-star2{
    height: 15vh;

    position: absolute;
    left: 25%;
    top: 45%;
}
    //遠景
.firstBlock-sea{
    height: 20vh;

    position: absolute;
    bottom: 0;

     z-index: 10;
}
.firstBlock-backMontain1{
    width: 25vw;
    
    position: absolute;
    bottom: 18%;
    z-index: 1;

}
.firstBlock-backMontain2{
    width: 70vw;

    position: absolute;
    bottom: 15%;
    right: 0;
    z-index: 1;
}
    //前景
.firstBlock-tower{
    height: 42vh;
    position: absolute;
    right: 25vh;
    bottom: 25vh;
    z-index: 20;
}
.firstBlock-towerMountain{
    height: 40vh;

    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 20;
}
    //文字
.firstBlock-text{
    font-family: $chFont;
    color:$FontColor-white ;
    display: flex;
    flex-direction: column;
    gap: 28px;
    align-items: center;

    position: absolute;
    left: 50%;
    top: 30%;
    translate: -50% 0;
}
.firstBlock-texth1{
    display: flex;
    gap: 42px;
}
.firstBlock-texth1 h1{
    font-size: 60px;
}
.firstBlock-text p{
    font-size: $pcChFont-p;
    letter-spacing: 12px;
}

//緣起
.special-effects{
    overflow: hidden;
}
.home-begining{
    width: 100%;
    height: 100vh;

    background-image: url(../assets/images/home/index-bg02.svg);

    position: relative;
}
.begining-bgStars{
    height: 75vh;

    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}
.begining-text{
    width: 35vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: $FontColor-white;

    position: absolute;
    top: 45%;
    left: 50%;
}
.begining-text h1{
    color: $primaryColor-500;
}

.begining-person{
    height: 75vh;

    position: absolute;
    bottom: 0;
    left: 50%;
    translate: -100%;
    z-index: 30;
}
.begining-starShot{
    width: 80vh;

    position: absolute;
    top: 2.5vh;
    left: 41%;

    transform: translate(50vw, -30vh) rotate(45deg);
    
    z-index: 25;

    // animation: moveX 2.5s linear forwards;
    animation: moveStar 2s linear forwards; 
}

 @keyframes moveStar {
    0% {
        /* 起始位置：右上方外面 */
        transform: translate(50vw, -30vh) rotate(20deg);
    }
    20% {
        /* 中間路徑 */
        transform: translate(40vw, -25vh) rotate(15deg);
    }
    50% {
        /* 接近目標 */
        transform: translate(25vw, -15vh) rotate(10deg);
    }
    70% {
        /* 幾乎到達 */
        transform: translate(15vw, -10vh) rotate(5deg);
    }
    100% {
        /* 最終位置：完全對準目標點 */
        transform: translate(0, 0) rotate(0deg);
    }
}

.testbox{
    // border: 1px solid #fff;
    width: 80vh;
    height: 32vh;
    background-image: url(../assets/images/home/index-starShot.svg);

    position: absolute;
    top: 2.5vh;
    left: 41%;

    transform: translate(65vw, -30vh) rotate(24deg);
    
    z-index: 25;

    // animation: moveX 2.5s linear forwards;
    animation: moveStar 2s linear forwards; 
}

.testbox::after{
    content: "";
    width: 20vh;
    height: 20vh;

    display: block;
    // border: 1px solid red;
    background-image: url(../assets/images/home/index-starLightCycle1.svg);

    position: absolute;
    top: 40%;
    left: -1%; 

    animation: starlight1 2s 2s linear infinite ;
}
.testbox::before{
    content: "";
    width: 23vh;
    height: 23vh;

    display: block;
    // border: 1px solid red;
    background-image: url(../assets/images/home/index-starLight01.svg);

    position: absolute;
    top: 35%;
    left: -3%; 

    opacity: 0;
    animation: starlight 2s 2s linear infinite ;
}

 @keyframes starlight1 {
    0% {
        transform: scale(1);
    }
    50%{
        transform: scale(0.95);
        opacity: 0.5;
    }
    100% {
        transform: scale(1);
    }
}

 @keyframes starlight {
    0% {
        transform: scale(1);
        opacity: 0.5;
    }
    100% {
        transform: scale(1.2);
        opacity: 1;
    }
}

</style>