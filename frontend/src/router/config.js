import TabsView from '@/layouts/tabs/TabsView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: 'Login',
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
          path: 'search',
          name: 'search',
          meta: {
            authority: '*',
            icon: 'search'
          },
          component: () => import('@/pages/search/search'),
        },
        {
          path: 'overview',
          name: 'overview',
          meta: {
            authority: '*',
            icon: 'radar-chart'
          },
          component: () => import('@/pages/overview/overview'),
        },
        {
          path: 'result',
          name: 'result',
          meta: {
            authority: '*',
            icon: 'dot-chart'
          },
          component: () => import('@/pages/result/result'),
        },
        {
          path: 'Question',
          name: 'Question',
          meta: {
            authority: '*',
            icon: 'question-circle'
          },
          component: () => import('@/pages/backup/Analysis'),
        },
        {
          path: 'Backup',
          name: 'Backup',
          meta: {
            authority: '*',
            icon: 'stop'
          },
          component: () => import('@/pages/backup/Analysis'),
        }
      ]
    },
  ]
}

export default options
