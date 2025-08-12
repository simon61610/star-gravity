import { createRouter, createWebHistory } from 'vue-router'

// --- Shop 星空小舖 ---
import ShopHomePage from '@/views/shop/ShopHomePage.vue'


//import Newpage from '../views/Newpage.vue'



// routes 口訣：在哪個路徑下，render 哪個組件
// {path: '路徑', component: 組件},
const routes = [
    // 這邊放 routes！


    // --- Shop 星空小舖 ---
    {path: '/shop', component: ShopHomePage},



]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes, // 等同 routes: routes
})

export default router


// ----------------------- 以下放還沒確定好的 Routes，確定好再放到陣列裡 ------------------------
// 另外要討論是否子物件要用 lazy-loading 的寫法


/* 
{
  path: '/NewpageView',    // 在vue裡面 / = http://localhost:5173/ 也就是本機的意思
  name: 'NewpageView',     //網頁的id
  component: () => import('../views/NewpageView.vue'), //採用官方建議lazy-loaded(非同步載入)
},

{
  path: '/article/:id',    // 在vue裡面 / = http://localhost:5173/ 也就是本機的意思
  name: 'ArticleDetailView',     //網頁的id
  component: () => import('../views/ArticleDetailView.vue'), //採用官方建議lazy-loaded(非同步載入)
},
*/


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
