import { createRouter, createWebHistory } from 'vue-router'

// registrasi user atau login
import loginPage from '@/views/loginPage.vue'
import registPage from '@/views/registPage.vue'
// room ketika sudah login
import index from '@/views/index.vue'
import RoomDetail from '@/views/RoomDetail.vue'
import profilePage from '@/views/profilePage.vue'
import roomMember from '@/views/roomMember.vue'
import notificationPage from '@/views/notificationPage.vue'
import landingPage from '@/views/landingPage.vue'
import faqPage from '@/views/faqPage.vue'
import aboutPage from '@/views/aboutPage.vue'
import featuresPage from '@/views/featuresPage.vue'
import contactPage from '@/views/contactPage.vue'
import learnMore from '@/views/learnMore.vue'
import DetailNotification from '@/views/detailNotification.vue'
import ManageUser from '@/views/manageUser.vue'
import ProffileBeforeInRoom from '@/views/proffileBeforeInRoom.vue'
// halaman untuk not found atau 404

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { component: landingPage, path: '/' },
    { component: loginPage, path: '/login', name: 'halaman login' },
    { component: registPage, path: '/regist', name: 'ini adalah halaman registrasi user' },
    { component: faqPage, path: '/faq' },
    { component: aboutPage, path: '/about' },
    { component: featuresPage, path: '/features' },
    { component: contactPage, path: '/contact' },
    { component: learnMore, path: '/more' },

    {
      component: RoomDetail,
      path: '/room',
      meta: { requiresAuth: true, role: ['manager', 'employee'] },
    },
    {
      component: profilePage,
      path: '/proffile',
      meta: { requiresAuth: true, role: ['manager', 'employee'] },
    },
    {
      component: roomMember,
      path: '/room-member',
      meta: { requiresAuth: true, role: ['manager', 'employee'] },
    },
    {
      component: notificationPage,
      path: '/user/notification',
      meta: { requiresAuth: true, role: ['employee'] },
    }, // employee only
    {
      component: DetailNotification,
      path: '/notification/detail',
      meta: { requiresAuth: true, role: ['employee'] },
    }, // employee only
    {
      component: ManageUser,
      path: '/user/manage',
      meta: { requiresAuth: true, role: ['manager'] },
    }, // manager only
    {
      component: ProffileBeforeInRoom,
      path: '/user/proffile',
      meta: { requiresAuth: true, role: ['manager', 'employee'] },
    },
    {
      component: index,
      path: '/main',
      name: 'main page off appliaction',
      meta: { requiresAuth: true, role: ['manager', 'employee'] },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if ((to.path === '/login' || to.path === '/regist') && token) {
    return next('/main')
  }

  if (to.meta.role && !to.meta.role.includes(user.role)) {
    return next('/main')
  }

  next()
})

export default router
