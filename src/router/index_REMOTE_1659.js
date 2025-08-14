import { createRouter, createWebHistory } from 'vue-router'

// --- Shop 星空小舖 聖文---
import ShopHomePage from '@/views/shop/ShopHomePage.vue'
import ShopCategoryPage from '@/views/shop/ShopCategoryPage.vue'
// --- Article 文章----
import Newpage from '@/views/new/Newpage.vue'

//  ---Admin後台-----
import AdminLoginPage from '@/views/admin/AdminLoginPage.vue'

//import { createRouter, createWebHistory } from 'vue-router'
//import Newpage from '../views/Newpage.vue'



// routes 口訣：在哪個路徑下，render 哪個組件
// {path: '路徑', component: 組件},
const routes = [
    // 這邊放 routes！

    // --- Shop 星空小舖 聖文---
    {path: '/shop', name: 'shop' ,component: ShopHomePage},
    {path: '/category', name: 'category', component: ShopCategoryPage},

    // --- Article 文章 ---
    {
      path: '/Newpage',    // 
      name: 'Newpage',     //
      component: Newpage
    },
    {
      path: '/article/:id',    // 在vue裡面 / = http://localhost:5173/ 也就是本機的意思
      name: 'ArticleDetailpage',     //網頁的id
      component: () => import('../views/new/ArticleDetailpage.vue'), 
    },
    //  ---Admin後台-----
    {
      path: '/AdminLoginPage',    // 
      name: 'AdminLoginPage',     //
      component: AdminLoginPage
    },



]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes, // 等同 routes: routes
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
