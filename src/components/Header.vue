<script setup>
import { ref, onMounted } from 'vue'
import bus from '@/composables/useMitt'

import products from '@/data/products'

import  logo from '@/assets/logos/logo.svg'
const active = ref(false)

function toggleMenu() {
  active.value = !active.value
}

    // =====================================================
    // ==================== 更新購物車數量 ====================
    // =====================================================
    const cartCount = ref(0)
    const storage = localStorage

    // ------------------------------------------------------
    const updateCart = () => {
        let itemString = storage['addItemList']
        // console.log(itemString) // P2, P1, P3, 

        if(!itemString || itemString == ''){
            cartCount.value = 0
            return
        }

        let items = itemString.substring(0, itemString.length - 2).split(', ')
        // console.log(items) // ['P2', 'P1', 'P3']
        let totalQuantity = 0

        for(let i = 0; i < items.length; i++){
            let itemInfo = storage.getItem(items[i])
            // alert(itemInfo)
            if(itemInfo){
                let totalPrice = parseInt(itemInfo.split('|')[2]) // 累積的總價

                // 從 products.js 取出單價
                let productId = items[i].replace('P', '') // 先改成正確 id 號碼
                let product = products.find(p => p.id == productId) // 找出那件商品
                let originalSpePrice = product ? product.specialPrice : 1 // 保險，免得 product 變成 undefined ，自動轉型變成除 0 爆掉

                let quantity = Math.round(totalPrice / originalSpePrice)

                totalQuantity += quantity



                /* const productId = parseInt(items[i].replace('P',''))
                const product = products.find(p => p.id === productId)
                const originalPrice = product ? product.specialPrice : 1

                let quantity = Math.round(totalPrice / originalPrice)
                totalQuantity += quantity */
                
                
            }
        }

        cartCount.value = totalQuantity
    }





    // ------------------------------------------------------
    // 每次事件更新，通知購物車要更新數量
    onMounted(() => {
        updateCart()
        bus.on('notifyUpdateCart', updateCart)
    })

</script>



<template>
    <nav class="navbar">
        <div class="wrapper" :class="{active:active}">
            <div class="logo">
                <router-link to="/"><img :src="logo" alt="星引力logo" width="120" height="50"/></router-link>
            </div>
            <ul>
                <li><router-link to="/">觀星初學指南</router-link></li>
                <li><router-link to="/Newpage">天文快訊</router-link></li>       <!--<li><router-link :to="{ name: 'NewpageView' }">天文快訊</router-link></li>--->
                <li><router-link to="/">星視野</router-link></li>
                <li><router-link to="/mapfirst">星據點</router-link></li>
                <li><router-link to="/">星遊戲</router-link></li>
                <li><router-link to="/">星星活動</router-link></li>
                <li><router-link to="/shop">星空小舖</router-link></li>               
                <li><router-link to="/"><i class="fa-solid fa-user fa-lg"></i></router-link></li>
                <li><router-link to="/"><i class="fa-solid fa-arrow-right-from-bracket"></i></router-link></li>
                <li>
                    <router-link to="/">
                        <i class="fa-solid fa-cart-shopping fa-lg"></i> ( {{cartCount}} )
                    </router-link>
                </li>
            </ul>
            <div class="hum" :class="{active:active}" @click="toggleMenu">
                <div class="bar bar1 transition"></div>
                <div class="bar bar2 transition"></div>
                <div class="bar bar3 transition"></div>
            </div>
        </div>
    </nav>

</template>



<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.navbar{
    width: 100%;
    background-color: #000000;
    

    .wrapper {
        box-sizing: border-box;
        margin: 0 auto;
        max-width: 1200px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .hum{
            display: none;
        }

        ul {
            display: flex;
            gap: 0px;

            li {
                font-size:$pcChFont-small;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 120px;
                height: 50px;
                text-decoration: none;

                a {
                    display: flex;
                    width: 100%;
                    height: 100%;   
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    color: $FontColor-white;
                }
            }
        }
    }
}

.navbar ul li:nth-child(8)
,.navbar ul li:nth-child(9)
,.navbar ul li:nth-child(10)
{
    width: 50px;
    height: 50px;
}

.navbar ul li:nth-child(9){
    opacity: 30%;
}

/*-------------斷點430--------------*/
@media screen and (max-width: 431px){
    .navbar{
        z-index: 1000;
        position: relative;
        .wrapper{
            ul{ 
                background-color: $primaryColor-500;
                flex-direction: column;
                position: absolute;
                top: 56px;
                right: 0%;
              //  transform: translateX(100%);
                width: 60%;
               display: none;
              //  transform: translateY(-120%); // 往上藏起來
                //opacity: 0;
               // visibility: hidden;
                
                transition:3s;
                
                li{ 
                    width: 100%;
                    a {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

             &.active ul{
             //   transform: translateY(0%);
             //  opacity: 1;
              //  visibility: visible;
                display: block;
             //   opacity: 1;
              //  top:56px;
               // right: 0%;
            }
           
            .hum{
                display:block;
                margin-right: 10px;
                cursor: pointer;

                .bar{
                display: flex;
                width: 36px;
                height: 6px;
                background-color: #888888;
                margin: 6px 0px;
                border-radius: 3px;
                }

            }
       }
    }

    .hum.active .bar1{transform: rotate(-45deg) translate(-9px, 8px);}
    .hum.active .bar2{opacity: 0;}
    .hum.active .bar3{transform: rotate(45deg) translate(-9px, -7px);}
    .transition{
        transition: 1s;
    }
}



    




























//改成正常scss寫法 以下應該可以刪了 

/*.navbar ul {
    border: 1px red solid;
    display: flex;
    gap: 0px;
}*/

/*.navbar ul li {
    font-size:$pcChFont-small;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 50px;
    text-decoration: none;
}*/
/*.navbar ul li a {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: $FontColor-white;
}*/



</style>