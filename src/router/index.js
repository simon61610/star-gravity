import { createRouter, createWebHistory } from 'vue-router'
//import Newpage from '../views/Newpage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   /* {
      path: '/NewpageView',    // 在vue裡面 / = http://localhost:5173/ 也就是本機的意思
      name: 'NewpageView',     //網頁的id
      component: () => import('../views/NewpageView.vue'), //採用官方建議lazy-loaded(非同步載入)
    },

    {
      path: '/article/:id',    // 在vue裡面 / = http://localhost:5173/ 也就是本機的意思
      name: 'ArticleDetailView',     //網頁的id
      component: () => import('../views/ArticleDetailView.vue'), //採用官方建議lazy-loaded(非同步載入)
    },*/
    
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
