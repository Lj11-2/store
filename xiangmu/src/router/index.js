import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)

function power(url) {
  return store.state.user.menus_url.some(i => i == url)
}
var router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login/login.vue')
    },
    {
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [
        {
          path: 'home',
          component: () => import('../pages/home/home.vue'),
          name: '首页'
        },
        {
          path: 'banner',
          component: () => import('../pages/banner/banner.vue'),
          name: '轮播图管理',
          beforeEnter(to, from, next) {
            power('/banner') ? next() : next('/home')
          }

        },
        {
          path: 'cate',
          component: () => import('../pages/kind/kind.vue'),
          name: '商品分类',
          beforeEnter(to, from, next) {
            power('/cate') ? next() : next('/home')
          }
        },
        {
          path: 'manage',
          component: () => import('../pages/manager/manager'),
          name: '管理员管理',
          beforeEnter(to, from, next) {
            power('/manage') ? next() : next('/home')
          }
        },
        {
          path: 'menu',
          component: () => import('../pages/menu/menu.vue'),
          name: '菜单管理',
          beforeEnter(to, from, next) {
            power('/menu') ? next() : next('/home')
          }
        },
        {
          path: 'role',
          component: () => import('../pages/role/role.vue'),
          name: '角色管理',
          beforeEnter(to, from, next) {
            power('/role') ? next() : next('/home')
          }
        },
        {
          path: 'seckill',
          component: () => import('../pages/seckill/seckill.vue'),
          name: '秒杀活动',
          beforeEnter(to, from, next) {
            power('/seckill') ? next() : next('/home')
          }
        },
        {
          path: 'shopmanage',
          component: () => import('../pages/shopmanage/shopmanage.vue'),
          name: '商品管理',
          beforeEnter(to, from, next) {
            power('/shopmanage') ? next() : next('/home')
          }

        },
        {
          path: 'spec',
          component: () => import('../pages/spec/spec.vue'),
          name: '商品规格',
          beforeEnter(to, from, next) {
            power('/spec') ? next() : next('/home')
          }
        },
        {
          path: 'member',
          component: () => import('../pages/member/member.vue'),
          name: '会员管理',
          beforeEnter(to, from, next) {
            power('/member') ? next() : next('/home')
          }
        },
        {
          path: '',
          redirect: 'home'
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return
  }
  if (store.state.user) {
    next()
    return
  }
  next('/login')
})
export default router