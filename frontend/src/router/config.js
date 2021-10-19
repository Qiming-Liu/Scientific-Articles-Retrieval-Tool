import TabsView from '@/layouts/tabs/TabsView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: 'index',
      component: TabsView,
      redirect: '/search',
      children: [
        {
          path: '/search',
          name: 'search',
          meta: {
            authority: '*',
            icon: 'search'
          },
          component: () => import('@/pages/search'),
        },
        {
          path: '/overview',
          name: 'overview',
          meta: {
            authority: '*',
            icon: 'radar-chart'
          },
          component: () => import('@/pages/overview'),
        },
        {
          path: '/result_word',
          name: 'result',
          meta: {
            authority: '*',
            invisible: 'true',
          },
          component: () => import('@/pages/result/result_word'),
        },
        {
          path: '/result_sent',
          name: 'result',
          meta: {
            authority: '*',
            invisible: 'true',
          },
          component: () => import('@/pages/result/result_sent'),
        }
      ]
    },
  ]
}

export default options
