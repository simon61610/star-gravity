import { createRouter, createWebHistory } from 'vue-router'

// --- Shop 星空小舖 ---
import ShopHomePage from '@/views/shop/ShopHomePage.vue'
import ShopCategoryPage from '@/views/shop/ShopCategoryPage.vue'
// --- Article 文章----
import Newpage from '@/views/new/Newpage.vue'

// --- member 會員中心----
import LoginFirstPage from '../views/member/LoginFirstPage.vue'
// import SignUp from '@/components/member/login/SignUp.vue'
// import ForgetPassword from '@/components/member/login/ForgetPassword.vue'
import ForgetPasswordTwo from '@/components/member/login/ForgetPasswordTwo.vue'


//import { createRouter, createWebHistory } from 'vue-router'
//import Newpage from '../views/Newpage.vue'



// routes 口訣：在哪個路徑下，render 哪個組件
// {path: '路徑', component: 組件},
const routes = [
    // 這邊放 routes！
//const routes = [
  // 這邊放 routes！


    // --- Shop 星空小舖 ---
    {path: '/shop', component: ShopHomePage},
    {path: '/category', component: ShopCategoryPage},

    // --- Article 文章 ---
    {
      path: '/Newpage',    // 
      name: 'Newpage',     //
      component: Newpage
    },

    // --- member 會員中心----
    {path: '/member', component: LoginFirstPage}, // 登入畫面
    // {path: '/login', component: SignUp},       // 註冊畫面
    // {path: '/login', component: ForgetPassword},  // 忘記密碼1
    {path: '/login', component: ForgetPasswordTwo},  // 忘記密碼2

    {
      path: '/article/:id',    // 在vue裡面 / = http://localhost:5173/ 也就是本機的意思
      name: 'ArticleDetailpage',     //網頁的id
      component: () => import('../views/new/ArticleDetailpage.vue'), 
    },


]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes, // 等同 routes: routes
})

export default router



// -----------------------------------------------


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
