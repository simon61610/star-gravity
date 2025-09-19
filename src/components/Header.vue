<script setup>
import { ref, onMounted,watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import bus from '@/composables/useMitt'
// import products from '@/data/products'
import  logo from '@/assets/logos/logo.svg'
import Confirm from './common/Confirm.vue'

const emit = defineEmits(['open'])
const active = ref(false)
const route = useRoute()
const currentActive = ref(null)
const navbarRef = ref(null) // 選單容器的 ref
const router = useRouter()
const memberStore = useMemberStore()

const showLogoutConfirm = ref(false)

const handleLogout = () => {
  memberStore.logout()
  router.replace('/loginfirst')
  showLogoutConfirm.value = false
}



const toggleactive = (e) => {
  // 找到最近的 li，並判斷有沒有 data-index
  const li = e.target.closest('li[data-index]')
  if (li) {
    currentActive.value = Number(li.dataset.index)
  } else {
    currentActive.value = null
  }
}
const menuList = ['/about', '/Newpage', '/gamesky', '/mapfirst', '/gamehome', '/events', '/shop']
// const toggleactive = (index)=>{
//     if(currentActive.value === index){
//         currentActive.value = index
//     }else{
//         currentActive.value = index
//     }
// }

const clearActive = () => {
  currentActive.value = null
}

function toggleMenu() {
  active.value = !active.value;
}
//監聽路由的 path，只要路徑改變就會執行
watch(
  () => route.path, // 監聽來源：當前路由的 path
  (newPath) => {
    active.value = false // 切換頁面時，先把漢堡選單收合
    const index = menuList.indexOf(newPath)  // 找出目前路徑在 menuList 裡的索引位置 例如 newPath = '/gamesky'，index = 2
    currentActive.value = index !== -1 ? index + 1 : null //如果真的是7個選單其1 就+1對應值
  },
  { immediate: true } // 一進頁面就會先執行一次

)

    // =====================================================
    // ==================== 更新購物車數量 ====================
    // =====================================================
    const cartCount = ref(0)
    const storage = localStorage

    // ------------------------------------------------------
    const updateCart = () => {
        let itemString = storage['addItemList'] // 1, 2, 3, 
        // alert(itemString)

        if(!itemString || itemString == ''){
            cartCount.value = 0
            return
        }

        let itemsId = itemString.substring(0, itemString.length - 2).split(', ')
        // alert(itemsId) // 3,4,1,2

        let totalQuantity = 0

        for(let i = 0; i < itemsId.length; i++){
            let itemInfo = storage.getItem(itemsId[i])
            if(itemInfo) {
                const parts = itemInfo.split('|')
                const qty = Number(parts[3]) || 0
                // console.log(parts)
                totalQuantity += qty
            }
        }
        cartCount.value = totalQuantity
    }

    // ------------------------------------------------------
    onMounted(() => {
      // 每次事件更新，通知購物車要更新數量
      updateCart()
      bus.on('notifyUpdateCart', updateCart)

      //---------會員-------------
      memberStore.hydrate?.()
    })

    // -----------會員登入後(取名字/暱稱/信箱，顯示第一個字母)--------------------
    const initial = computed(() => {
        const u = memberStore.user || {}
        const base = (u.name || u.nickname || u.email || '').trim()
        if (!base) return ''
        const raw = base.includes('@') ? base.split('@')[0] : base
        const ch = raw[0] || ''
        // 英文轉大寫；中文則原樣
        return typeof ch === 'string' && ch.toUpperCase ? ch.toUpperCase() : ch
    })

</script>



<template>
  <!-- 登出確認框 -->
  <Confirm
    :show="showLogoutConfirm"
    message="您確定要登出嗎？"
    @confirm="handleLogout"
    @cancel="showLogoutConfirm = false"
  />


  <div class="navbar-container" @click="currentActive = null">
    <nav class="navbar " @click.stop >
        <div class="wrapper" :class="{active:active}">
            <div class="logo" @click="clearActive">
                <router-link to="/homepage"><img :src="logo" alt="星引力logo" width="120" height="50"/></router-link>
            </div>
            <ul :class ="{ 'is-open': active}" @click="toggleactive">
                <li :class ="{ 'menu-active': currentActive === 1}" data-index="1"><router-link to="/about">觀星初學指南</router-link></li>
                <li :class ="{ 'menu-active': currentActive === 2}" data-index="2"><router-link to="/Newpage">天文快訊</router-link></li>       <!--<li><router-link :to="{ name: 'NewpageView' }">天文快訊</router-link></li>--->
                <li :class ="{ 'menu-active': currentActive === 3}" data-index="3"><router-link to="/gamesky">星視野</router-link></li>
                <li :class ="{ 'menu-active': currentActive === 4}" data-index="4"><router-link to="/mapfirst">星據點</router-link></li>
                <li :class ="{ 'menu-active': currentActive === 5}" data-index="5"><router-link to="/gamehome">星遊戲</router-link></li>
                <li :class ="{ 'menu-active': currentActive === 6}" data-index="6"><router-link to="/events">星星活動</router-link></li>
                <li :class ="{ 'menu-active': currentActive === 7}" data-index="7"><router-link to="/shop">星空小舖</router-link></li>               
                <!-- <li ><router-link to="/loginfirst"><i class="fa-solid fa-user fa-lg"></i></router-link></li> -->
                <!-- <li ><router-link to="/"><i class="fa-solid fa-arrow-right-from-bracket"></i></router-link></li> -->
                
                <!-- 未登入：顯示人頭 → 登入頁 -->
                <li v-if="!memberStore.isAuthed" class="icon-item" @click="clearActive">
                    <router-link to="/loginfirst">
                        <i class="fa-solid fa-user fa-lg"></i>
                    </router-link>
                </li>
                <!-- 已登入：顯示會員中心 + 登出  -->
                <template v-else>
                    <li class="icon-item user-item" @click="clearActive">
                        <router-link to="/membercenter/personal" class="user-link" aria-label="會員中心">
                            <i class="fa-solid fa-user fa-lg"></i>
                            <span v-if="initial" class="avatar-initial">{{ initial }}</span>
                        </router-link>
                    </li>
                    <li class="icon-item" @click="clearActive">
                        <button class="icon-btn" @click="showLogoutConfirm = true" aria-label="登出">
                            <i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
                        </button>
                    </li>
                </template>
                <li @click="clearActive">
                    <router-link to="/cartpage/cart">
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
  </div>
</template>



<style scoped lang="scss">
@import '@/assets/styles/main.scss';

.navbar {
  width: 100%;
  background-color: #000000;
  box-sizing: border-box;
  

  .wrapper {
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 1200px;
    padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    

    img {
      width: 100px;
      padding-left: 10px;
    }

    .hum {
      display: none;

      // 1200px 以下顯示漢堡選單
      @include respond("lg") {
        display: block;
        margin-right: 10px;
        cursor: pointer;

        .bar {
          display: flex;
          width: 36px;
          height: 6px;
          background-color: #888888;
          margin: 6px 0px;
          border-radius: 3px;
        }
      }
    }

    ul {
      display: flex;
      gap: 0px;

      li {
        &.menu-active {
          border-radius: 10px;
          background-color: $primaryColor-900;
        }

        font-size: $pcChFont-small;
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

      // 8~10 個選單縮小
      li:nth-child(8),
      li:nth-child(9),
      li:nth-child(10) {
        width: 50px;
        height: 50px;
        @include respond("lg") {
          width: 100%;
        }
      }

      // 1200px 以下改成直式選單
      @include respond("lg") {
        background-color: $primaryColor-500;
        flex-direction: column;
        position: absolute;
        top: 70px;
        right: 0%;
        width: 100%;
        display: none;
        z-index: 9999;
        transition: 3s;

        li {
          width: 100%;

          a {
            
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    // 1200px 以下wrapper.active → 顯示選單
    &.active ul {
      @include respond("lg") {
        display: block;
      }
    }
  }
}

// 登出圖示
.icon-item {
  
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-btn {
  background: transparent;
  border: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  i {
    color: $FontColor-white; // 登出 icon 白色
  }
}

// 人頭 icon + 名字首字
.user-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.avatar-initial {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: $primaryColor-500;
  color: $FontColor-white;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  font-weight: 700;
}

// 漢堡動態效果
.hum.active {
  // 1200px 以下第一條橫線旋轉
  .bar1 {
    @include respond("lg") {
      transform: rotate(-45deg) translate(-9px, 8px);
    }
  }
  // 1200px 以下第二條橫線隱藏
  .bar2 {
    @include respond("lg") {
      opacity: 0;
    }
  }
  // 1200px 以下第三條橫線旋轉
  .bar3 {
    @include respond("lg") {
      transform: rotate(45deg) translate(-9px, -7px);
    }
  }
}

// 1200px 以下動畫過渡
.transition {
  @include respond("lg") {
    transition: 1s;
  }
}





// @media screen and (max-width: 1201px){
//     ul {
//     display: none;
//     }
//     .navbar{
       
//         .wrapper{
//             ul{ 
//                 background-color:$primaryColor-500;
//                 flex-direction: column;
//                 position: absolute;
//                 top: 50px;
//                 right: 0%;
//               //  transform: translateX(100%);
//                 width: 100%;
//                display: none;
//               //  transform: translateY(-120%); // 往上藏起來
//                 //opacity: 0;
//                // visibility: hidden;
//                 z-index: 9999;
//                 transition:3s;
                
//                 li{ 
//                     width: 100%;
//                     a { 
                        
//                         width: 100%;
//                         height: 100%;
//                     }
//                 }
//             }

//              &.active ul{
//              //   transform: translateY(0%);
//              //  opacity: 1;
//               //  visibility: visible;
//                 display: block;
//              //   opacity: 1;
//               //  top:56px;
//                // right: 0%;
               
//             }
           
//             .hum{
                
//                 display:block;
//                 margin-right: 10px;
//                 cursor: pointer;

//                 .bar{
                    
//                 display: flex;
//                 width: 36px;
//                 height: 6px;
//                 background-color: #888888;
//                 margin: 6px 0px;
//                 border-radius: 3px;
//                 }

//             }
//        }
//     }

//     .hum.active .bar1{transform: rotate(-45deg) translate(-9px, 8px);}
//     .hum.active .bar2{opacity: 0;}
//     .hum.active .bar3{transform: rotate(45deg) translate(-9px, -7px);}
//     .transition{
//         transition: 1s;
//     }			

// }



</style>