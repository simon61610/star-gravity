<script setup>
import logo from '@/assets/logos/logo.svg';
</script>

<template>

    <header>
        <img :src= 'logo' style="width: 300px;">
    </header>

    <div class="main">
        <div class="front">
            前台
        </div>
            
        <div class="Back">
            後台
        </div>
    </div>

    <footer>
        <p>
        本網站為緯育TibaMe_前端工程師班第96期學員專題成果作品,本平台僅供學習、
        展示之用。若有抵觸有關著作權,或有第三人主張侵害智慧財產權等情事,均由學
        員負法律上責任,緯育公司概不負責。若有侵權疑慮,您可以私訊[緯育TibaMe]
        後續會由專人協助處理。
        </p>
    </footer>


</template>


<style scoped lang="scss">
header{
text-align: center;
width: 100%;
margin-bottom: 100px 

    img{
    margin-top: 50px;
    width: 350px !important;
    height: auto;
    }

}

.main{
    margin-top: 60px;
    display: flex;
    gap: 250px;
    .front,
    .Back{
    width: 200px;  /* 添加寬度 */
    height: 200px; /* 添加高度 */
    background-color: #285c96;  
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    display: flex;
    justify-content: center;
    align-items: center;
    color: aliceblue;
    font-size: 20px;
         
        &:hover {
        transform: scale(1.1);
        filter: brightness(1.2);

        }
        
    }

        
}


footer{
            
display: flex;
width: 100%;
height: auto;
color: rgb(180, 203, 222);
text-align: center;
margin-bottom: 20px;


    p {
    padding: 20px;
    font-size: 16px;
    margin-top: 150px;

    }
            
}
        


</style>