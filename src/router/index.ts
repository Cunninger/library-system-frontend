import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginIndex from '@/views/login/index.vue'
import RegisterIndex from '@/views/register/index.vue'
import FirstPage from '@/views/nav/FirstPage.vue'
import BookClassify from '@/views/nav/BookClassify.vue'
import BookAllInfo from '@/views/nav/BookAllInfo.vue'
import BorrowedPage from '@/views/nav/BorrowedPage.vue'
import UserPage from '@/views/nav/UserPage.vue'
import PersonCenter from '@/views/nav-top/PersonCenter.vue'
import MyBorrowedPage from '@/views/nav/MyBorrowedPage.vue'
import LibraryInfo from '@/views/nav/LibraryInfo.vue'
import { OpenAPI } from '../../generated'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      name: 'layout',
      component: AppLayout,
      children: [
        {
          path: '/layout',
          component: FirstPage
        },
        {
          path: '/bookclassify',
          component: BookClassify
        }
        ,
        {
          path: '/bookallinfo',
          component: BookAllInfo
        },
        {
          path: '/borrowedpage',
          component: BorrowedPage
        },
        {
          path: '/userpage',
          component: UserPage
        },
        {
          path: '/personcenter',
          component: PersonCenter
        },
        {
          path: '/myborrowedpage',
          component: MyBorrowedPage
        },
        {
          path: '/libraryinfo',
          component: LibraryInfo
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: LoginIndex
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterIndex
    }


  ]
})
// Navigation guard to check for token
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/register']//  解释：这里是一个数组，里面存放的是不需要token的页面
  const authRequired = !publicPages.includes(to.path)// 解释：这里是一个布尔值，如果to.path不在publicPages里面，那么authRequired就是true，否则就是false
  const token = OpenAPI.TOKEN || localStorage.getItem('token')
  if (authRequired && !token) {
    ElMessage({
      message: '请先登录以访问此页面',
      type: 'warning',
      duration: 3000,
      showClose: true,
      customClass: 'custom-el-message'  // 可选：用于自定义样式
    })
    return next('/')
  }
  next()
})
export default router
