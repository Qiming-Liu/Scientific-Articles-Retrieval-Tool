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
          path: 'Search',
          name: 'Search',
          meta: {
            authority: '*',
            icon: 'search'
          },
          component: () => import('@/pages/search/SearchPage'),
        },
        {
          path: 'Overview',
          name: 'Overview',
          meta: {
            authority: '*',
            icon: 'radar-chart'
          },
          component: () => import('@/pages/overview/Overview'),
        },
        {
          path: 'Graph',
          name: 'Graph',
          meta: {
            authority: '*',
            icon: 'dot-chart'
          },
          component: () => import('@/pages/backup/Analysis'),
        }
      ]
    },
  ]
}

export default options
