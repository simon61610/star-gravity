<script setup>
import  logo from '@/assets/logos/logo.svg'

</script>


<template>
    <div class="footer">
        <div class="main-footer-box">

            <section class="footer-left-box">  

                <div class="footer-left-Logo">
                <img :src='logo' height="90"  alt="logo">
                </div>

                <div class="footer-left-email">
                    <i class="fa-regular fa-envelope"> <span>tibamestar@gmail.com</span> </i>
                </div>

                <div class="footer-left-phone">
                    <i class="fa-regular fa-phone"><span>02-1234-5678</span></i>
                </div>

                <div class="footer-left-map">
                    <div class="map">
                        <i class="fa-regular fa-location-dot"><span>104台北市中山區南京東路三段219號4F</span></i>
                    </div>

                 <!--- <div class="icon">
                        <h4>關注我們</h4>
                        <i class="fa-brands fa-square-facebook"></i>
                        <i class="fa-brands fa-youtube"></i>
                        <i class="fa-brands fa-square-instagram" color></i>
                    </div>-->  
                </div>

               

            </section>

            <div class="icon">
                <h4>關注我們</h4>
                <i class="fa-brands fa-square-facebook"></i>
                <i class="fa-brands fa-youtube fa-xl"></i>  
                <i class="fa-brands fa-instagram"></i>
            </div>

            <section class="footer-right-box">
                <ul class="footer-right-one">
                    <li>觀星初學指南</li>
                    <li>天文快訊</li>
                    <li>星視野</li>
                    <li>星據點</li>
                </ul>

                <ul class="footer-right-two">
                    <li>星遊戲</li>
                    <li>星星活動</li>
                    <li>星空小舖</li>
                    <li>關注我們</li>
                </ul>
            </section>
            
        </div>
        
        <div class="footerend">
        <hr>
        <p>本網站為緯育TibaMe_前端工程師班第96期學員專題成果作品,本平台僅供學習、
        展示之用。若有抵觸有關著作權,或有第三人主張侵害智慧財產權等情事,均由學
        員負法律上責任,緯育公司概不負責。若有侵權疑慮,您可以私訊[緯育TibaMe],
        後續會由專人協助處理。</p>
        </div>
    </div>

</template>

<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.footer {
  color: white;
  background-color: black;
  width: 100%;
  font-size: $pcChFont-small;
  padding-bottom: 30px;
  padding-top: 40px;

  .main-footer-box {
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    justify-content: space-between;
    display: flex;

    .footer-left-box {
      color: $FontColor-gray;
      display: flex;
      gap: 15px;
      flex-direction: column;

      .footer-left-Logo {
        max-width: 180px;
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      .footer-left-email {
        span {
          color: #ffffff;
          font-family: $chFont;
          margin-left: 8px;
          font-weight: 200;
        }
      }

      .footer-left-phone {
        display: flex;

        span {
          color: #ffffff;
          font-family: $chFont;
          margin-left: 8px;
          font-weight: 200;
        }
      }

      .footer-left-map {
        display: flex;
        align-items: last baseline;

        span {
          color: #ffffff;
          font-family: $chFont;
          margin-left: 8px;
          font-weight: 200;
        }
      }
    }

    .icon {
      color: #ffffff;
      margin-right: 600px;
      padding-top: 140px;
      font-family: $chFont;

      h4 {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-left: 6px;
        font-weight: 200;
      }

      i {
        font-size: 24px;
        margin-left: 8px;
        color: $FontColor-gray;
        margin-top: 8px;
      }
    }

    // ≤1280px
    @media (max-width:1281px) {
      justify-content: center !important;

      .icon {
        margin-right: 300px !important;
      }
    }

    // ≤905px
    @media (max-width: 905px) {
      .icon {
        margin-right: 100px !important;
      }
    }

    // ≤700px
    @media (max-width: 700px) {
      flex-direction: column;
      align-items: center;

      .footer-right-box {
        display: none;
      }

      .icon {
        padding: 20px !important;
        margin: 80px 0 0 !important;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          font-size: 24px;
          margin-left: 40px !important;
          color: $FontColor-gray;
          margin-top: 8px;
        }
      }
    }
  }

  /*右選單*/
  .footer-right-box {
    display: flex;
    gap: 40px;
    align-items: last baseline;

    .footer-right-one {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .footer-right-two {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  .footerend {
    width: 100%;
    text-align: center;
    margin-top: 40px;

    hr {
      max-width: 1200px;
      width: 100%;
    }

    p {
      line-height: 1.5;
      max-width: 1200px;
      margin: 28px auto 0;
    }

    // ≤700px
    @media (max-width: 700px) {
      margin: 0 !important;

      p {
        margin: 0 !important;
        padding: 0 16px !important;
      }
    }

    // ≤431px
    @include respond("xs") {
      hr {
        margin: 0;
        width: 100%;
      }

      p {
        padding-top: 16px !important;
      }
    }
  }

  // ≤431px
  @include respond("xs") {
    padding: 16px;
    box-sizing: border-box;

    .main-footer-box {
      flex-direction: column;

      .icon {
        width: 100%;
        padding-top: 50px;
        margin-right: 0;
        text-align: center;
        box-sizing: border-box;

        h4 {
          display: block;
          text-align: center;
          width: 100%;
          margin: 0 0 16px;
          box-sizing: border-box;
        }
      }

      .footer-left-box {
        padding-left: 60px;
        width: 350px;
        justify-content: center;
        align-items: flex-start;

        > .footer-left-Logo {
          max-width: none;
          width: 350px;
          text-align: center;

          img {
            margin: 0 auto;
            width: 350px !important;
          }
        }
      }

      .footer-right-box {
        display: none;
      }
    }
  }
}


// .footer{
//     color: white;
//     background-color: black;
//     width: 100%;
//     font-size: $pcChFont-small;
//     padding-bottom: 30px;
//     padding-top: 40px;   

//     .main-footer-box{
        
//         margin: 0  auto ;
//         max-width: 1200px;
//         width: 100%;
//         justify-content: space-between;
//         display: flex;
        
        

//         .footer-left-box{
            
//             color: $FontColor-gray;
//             display: flex;
//             gap:15px;
//             flex-direction: column;
//             .footer-left-Logo{
//                 max-width: 180px;
//                 width: 100%;
//                 height: auto;
//                 object-fit: cover;
//             }
//             .footer-left-email{
                

//                 span{
//                     color: #FFFFFF;
//                     font-family: $chFont;
//                     margin-left: 8px;
//                     font-weight: 200;
//                 }
//             }
//             .footer-left-phone{
//                 display: flex;
//                 span{
//                     color: #FFFFFF;
//                     font-family: $chFont;
//                     margin-left: 8px;
//                     font-weight: 200;
//                 }
//             }
//             .footer-left-map{
//                 display: flex;
//                 align-items:last baseline;

//                 span{
//                     color: #FFFFFF;
//                     font-family: $chFont;
//                     margin-left: 8px;
//                     font-weight: 200;
//                 }
                    

//             }
           

//         }
//          .icon{
                    
//                     color: #FFFFFF;
//                     margin-right: 600px;
//                     padding-top: 140px;
//                     font-family: $chFont;
//                         h4{
                            
//                             width: 100%;
//                             display: flex;
//                             justify-content: flex-start;
//                             margin-left: 6px;
//                             font-weight: 200;
                            
//                         }
                        
//                         i{  
                            
//                             font-size: 24px;
//                             margin-left: 8px;
//                             color: $FontColor-gray;
//                             margin-top: 8px;
//                         }
//                     }

//     }

//     /*右選單*/
//     .footer-right-box{
        
//         display: flex;
//         gap: 40px;
//         align-items: last baseline;
//             .footer-right-one{
//                 display: flex;
//                 flex-direction: column;
//                 gap:12px
//             }
//             .footer-right-two{
//                 display: flex;
//                 flex-direction: column;
//                 gap:12px
//             }
//         }

//     .footerend{
        
//         width: 100%;
//         text-align: center;
//         margin-top: 40px;
//         hr{
//             max-width: 1200px;
//             width: 100%;
//         }
//         p{  

//             line-height: 1.5;
//             max-width: 1200px;
//             margin: 28px auto 0;
//         }
//     }
// }
// /*-------------斷點1150------------*/
// @media screen and (max-width: 1280px){
//     .main-footer-box{
//        justify-content: center !important;
       
//         .footer-right-box{
           

//             .footer-right-one{
            
//                 }
//             .footer-right-two{
                
//                 }

//         }
//         .icon{
           
//             margin-right:300px  !important;
//         }
       
//     }
// }
// /*-------------斷點905------------*/
// @media screen and (max-width: 905px){
//     .main-footer-box{
       
//         .footer-right-box{
           

//             .footer-right-one{
            
//                 }
//             .footer-right-two{
                
//                 }
//         }
//         .icon{
           
//             margin-right:100px  !important;
//         }
       
//     }
// }
// /*--------------斷點700---------------*/
// @media screen and (max-width: 700px){
//     .main-footer-box{
//         flex-direction: column;
//         align-items: center;
       
//         .footer-right-box{
           
//             display:  none;
//             .footer-right-one{
            
//                 }
//             .footer-right-two{
                
//                 }
//         }
//         .icon{
//             padding: 20px !important;
//             margin: 80px 0 0 !important;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//              i{  
                        
//                         font-size: 24px;
//                         margin-left: 40px !important;
//                         color: $FontColor-gray;
//                         margin-top: 8px;
//                         }
//         }
       
//     }
//     .footerend{
//         margin: 0 !important;
//         p{
//         margin: 0 !important;
//         padding: 0 16px !important;
//         }
//     }
// }

// /*-------------斷點430--------------*/
// @layer overrides{
//     @media screen and (max-width: 431px){
    
//     .footer{
        
//         padding: 16px;
//         box-sizing: border-box;
//         .main-footer-box{
//             flex-direction: column;
            
            
//         .icon {
            
            
//             width: 100%;
//             padding-top: 50px;
//             margin-right:0;
//             text-align: center;
//             box-sizing: border-box;
            
            
//             h4{ 
//                 display: block;
//                 text-align: center;
//                 width: 100%;
//                 margin: 0;
//                 margin-bottom: 16px;
//                 box-sizing: border-box;
                
//             }
//         }
        
            
//             .footer-left-box{
                
//                 padding-left: 60px;
//                 width: 350px;
//                 justify-content: center;
//                 align-items: flex-start;
                
//                >.footer-left-Logo{
                   
//                     max-width: none;
//                     width: 350px ;
//                     text-align: center ;
                    
//                     img{
//                         margin: 0 auto;
//                         width: 350px !important;
//                     }
                    
//                 }
//             }
            



//         .footer-right-box{
//             display: none;
            
//         }

//         }
//         .footerend{
//             hr{ 
                
//                 margin: 0;
//                 width: 100%;
//             }
//             p{
//                 padding-top: 16px !important;
//             }

//         }



        

//     }   
   




// }

// }











</style>