import { createRouter, createWebHistory } from 'vue-router'

// ||=================================================================||
// ||                              import                             ||
// ||=================================================================||

// ------------------ 首頁 homepage ------------------
import HomePage from '@/components/HomePage.vue'


// ------------------ 觀星指南 aboutstar ------------------
import AboutStarPage from '@/views/aboutstar/AboutStarPage.vue'


// ------------------ 星據點 Map ------------------
import MapFirstPage from '@/views/map/MapFirstPage.vue'
import MapMainPage from '@/views/map/MapMainPage.vue'


// ------------------ 星遊戲 game ------------------
import GameHomePage from '@/views/game/GameHomePage.vue'
import GameCardPage from '@/views/game/GameCardPage.vue'
import GameWishPage from '@/views/game/GameWishPage.vue'
import GameSkyPage from '@/views/game/GameSkyPage.vue'


// ------------------ 星星活動 starevent ------------------
import EventsPage from '@/views/starevent/EventsPage.vue'
import EventDetailPage from '@/views/starevent/EventDetailPage.vue'
import EventRegistrationPage from '@/views/starevent/EventRegistrationPage.vue'
import EventRegistrationSuccessPage from '@/views/starevent/EventRegistrationSuccessPage.vue'


// ------------------ 星空小舖 shop ------------------
import ShopHomePage from '@/views/shop/ShopHomePage.vue'
import ShopCategoryPage from '@/views/shop/ShopCategoryPage.vue'
import ShopProductPage from '@/views/shop/ShopProductPage.vue'
import CartCheckoutPage from '@/components/shop/cart/CartCheckout.vue'
import CartFormPage from '@/components/shop/cart/CartForm.vue'
import CartSuccessPage from '@/components/shop/cart/CartSuccess.vue'


// ------------------ 會員 member  ------------------
// import CollectionPage from '@/views/member/CollectionPage.vue'
// import CommentPage from '@/views/member/CommentPage.vue'
// import EventListPage from '@/views/member/EventListPage.vue'
import ForgetPage from '@/views/member/ForgetPage.vue'
import ForgotPage from '@/views/member/ForgotPage.vue'
import LoginFirstPage from '@/views/member/LoginFirstPage.vue'
// import OrderPage from '@/views/member/OrderPage.vue'
import PersonalPage from '@/views/member/PersonalPage.vue'
import RegisterPage from '@/views/member/RegisterPage.vue'
import ResetPasswordPage from '@/views/member/ResetPasswordPage.vue'



// ------------------ 以下是王牌浩竣的 VIP 區，閒雜人等請勿靠近  ------------------

//--------------------文章 Article -----------------------
import Newpage from '@/views/new/Newpage.vue'


// ||=================================================================||
// ||                              routes                             ||
// ||=================================================================||
// routes 口訣：在哪個路徑下，render 哪個組件
// {path: '路徑', component: 組件},

const routes = [
// ------------------ 首頁 homepage ------------------
{path: '/', name: 'homepage', component: HomePage},


// ------------------ 觀星指南 aboutstar ------------------
{path: '/about', name: 'about', component: AboutStarPage},



// ------------------ 星據點 Map ------------------
{path: '/mapfirst', name: 'mapfirst', component: MapFirstPage},
{path: '/mapmain', name: 'mapmain', component: MapMainPage},


// ------------------ 星遊戲 game ------------------
{path: '/gamehome', name: 'gamehome', component: GameHomePage},
{path: '/gamecard', name: 'gamecard', component: GameCardPage},
{path: '/gamewish', name: 'gamewish', component: GameWishPage},
{path: '/gamesky', name: 'gamesky', component: GameSkyPage},

// ------------------ 星星活動 starevent ------------------
{path: '/events', name: 'events', component: EventsPage},
{path: '/eventdetail', name: 'eventdetail', component: EventDetailPage},
{path: '/eventregistration', name: 'eventregistration', component: EventRegistrationPage},
{path: '/eventsuccess', name: 'eventsuccess', component: EventRegistrationSuccessPage},


// ------------------ 星空小舖 shop ------------------
{ path: '/shop', name: 'shop', component: ShopHomePage},
{ path: '/shopcategory', name: 'shopcategory', component: ShopCategoryPage},
{ path: '/product', name: 'product', component: ShopProductPage},
{ path: '/cartpage',  // 購物車與步驟頁面
  name: 'cartpage', 
  component: () => import('@/views/shop/CartPage.vue'),
  children: [
    {path: 'cart', name: 'cart', component: () => import('@/components/shop/cart/CartCheckout.vue')},
    {path: 'cartform', name: 'cartform', component: () => import('@/components/shop/cart/CartForm.vue')},
    {path: 'cartsuccess', name: 'cartsuccess', component: () => import('@/components/shop/cart/CartSuccess.vue')},
  ]
},


// ------------------ 會員 member  ------------------
// {path: '/collection', name: 'collection', component: CollectionPage},
// {path: '/membercomment', name: 'membercomment', component: CommentPage},
// {path: '/eventlist', name: 'eventlist', component: EventListPage},
{path: '/forget', name: 'forget', component: ForgetPage},               // 忘記密碼頁面(輸入信箱)
{path: '/forgot', name: 'forgot', component: ForgotPage},               // 忘記密碼頁面(輸入驗證碼)
{path: '/loginfirst', name: 'loginfirst', component: LoginFirstPage},   // 登入頁面
// {path: '/memberorder', name: 'memberorder', component: OrderPage},
{path: '/membercenter', name: 'membercenter', component: PersonalPage,  // 會員中心
  children: [
    {path: 'personal', component: () => import('../components/member/profile/Personal.vue')},
    {path: 'order', component: () => import('../components/member/profile/Order.vue')},
    {path: 'eventlist', component: () => import('../components/member/profile/EventList.vue')},
    {path: 'collection', component: () => import('../components/member/profile/Collection.vue')},
    {path: 'comment', component: () => import('../components/member/profile/Comment.vue')},
  ]
},
{path: '/register', name: 'register', component: RegisterPage},          // 註冊頁面
{path: '/resetpassword', name: 'resetpassword', component: ResetPasswordPage},  // 重設密碼頁面


// ------------------ 以下是王牌浩竣的 VIP 區，閒雜人等請勿靠近  ------------------
  // --- Article 文章 ---
    {
      path: '/Newpage',    // 
      name: 'Newpage',     //
      component: Newpage
    },
    {
      path: '/article/:id',    // 在vue裡面 / = http://localhost:5173/ 也就是本機的意思
      name: 'ArticleDetailpage',     //網頁的id
      component: () => import('@/views/new/ArticleDetailpage.vue'), 
    },
    //  ---Admin後台-----
    {
      path: '/AdminLoginPage',    
      name: 'AdminLoginPage',     
      component: () => import('@/views/admin/AdminLoginPage.vue')
    },
    {
      path: '/AdminLayoutPage',    
      name: '/AdminLayoutPage',     
      component: () => import('@/views/admin/AdminLayoutPage.vue'),
      meta: { requiresAuth: true } , //提示路由這個頁面要認證才可以跳轉
      children:[
          {
            path: '/AdminMemberPage',    
            name: 'AdminMemberPage',     
            component: () => import('@/views/admin/AdminMemberPage.vue')
          },

          {
            path: '/AdminActivityPage',    
            name: 'AdminActivityPage',     
            component: () => import('@/views/admin/AdminActivityPage.vue')
          },

          {
            path: '/AdminOrderPage',    
            name: 'AdminOrderPage',     
            component: () => import('@/views/admin/AdminOrderPage.vue')
          },

           {
            path: '/AdminShopPage',     
            name: 'AdminShopPage',     
            component: () => import('@/views/admin/AdminShopPage.vue')
          },

          {
            path: '/AdminNewsPage',    
            name: 'AdminNewsPage',     
            component:  () => import('@/views/admin/AdminNewsPage.vue')
          },

          {
            path: '/AdminCommentPage',    
            name: 'AdminCommentPage',     
            component: () => import('@/views/admin/AdminCommentPage.vue')
          },
      ]
    },

   
   










] // routes 的陣列結尾





// ||=================================================================||
// ||                           createRouter                          ||
// ||=================================================================||
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // 等同 routes: routes 1
})


//建立路由守衛 這是一個回呼涵式 
router.beforeEach((to,from,next) => {
  const token = localStorage.getItem('admin_token') //定義一個token 到 localStorage 裡面去取出 admin_token 的值
  if(!token && to.meta.requiresAuth){ 
    next({name:'AdminLoginPage'}) //如果沒有token,且是需要驗證的頁面,就跳轉到登入頁面 也可以寫{/path: '/AdminloginPage'}
  } else{
    next()  //不須驗證頁面依上面設定跳轉畫面
  }
})

export default router






























// --------------------- 以下先不刪除，因為有範例 --------------------------


/* 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
*/
