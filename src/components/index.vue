<script setup>
import logo from '@/assets/logos/logo-admin.svg';
</script>

<template>

    <header>
        <img :src= 'logo' style="width: 300px;">
    </header>

    <div class="main">
        <router-link to="/homepage" class="front">
            前台
        </router-link>
            
        <router-link to="/AdminLoginPage" class="back">
            後台
        </router-link>
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
@import '@/assets/styles/main.scss';
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
    display: flex;
    gap:200px;
    @include respond("sm"){
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }
    .front,
    .back {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        color: white;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease, filter 0.3s ease;
        width: 200px;
        height: 200px;
        animation: twinkle 2s infinite alternate ease-in;
        text-decoration: none;
    

        clip-path: polygon(
        50% 0%,
        61% 35%,
        98% 35%,
        68% 57%,
        79% 91%,
        50% 70%,
        21% 91%,
        32% 57%,
        2% 35%,
        39% 35%
        ); // 五角星

        &:hover {
        transform: scale(1.2) rotate(10deg);
        filter: brightness(1.3);
        }
        @include respond("sm"){
        width: 150px;
        height: 150px;
    }
    }

  .front {
    background: linear-gradient(145deg, #fbc531, #e1b12c); // 金黃色漸層
  }

  .back {
    background: linear-gradient(145deg, #4b6cb7, #182848); // 藍紫夜空漸層
    animation-delay: 1s
  }

  @keyframes twinkle 
    {
        0%{
            filter: brightness(0.7);
        }
        
        100%{
            filter: brightness(1.4);
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
    @include respond("sm"){
    
        font-size: 14px;
        margin-top: 0px;}
    }
}
        
</style>