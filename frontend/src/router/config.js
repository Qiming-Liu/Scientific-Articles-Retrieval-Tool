import TabsView from '@/layouts/tabs/TabsView'
import BlankView from "../layouts/BlankView";

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
            name: 'Index',
            component: TabsView,
            redirect: '/Search',
            children: [
                {
                    path: 'Search',
                    name: 'Search',
                    meta: {
                        icon: 'search'
                    },
                    component: () => import('@/pages/search'),
                },
                {
                    path: 'Overview',
                    name: 'Overview',
                    meta: {
                        icon: 'radar-chart'
                    },
                    component: () => import('@/pages/overview'),
                },
                {
                    path: 'Word',
                    name: 'Word',
                    meta: {
                        invisible: 'true'
                    },
                    component: BlankView,
                    children: [{
                        path: 'Result',
                        name: 'Result',
                        component: () => import('@/pages/result/result_word'),
                    }]
                },
                {
                    path: 'Sentence',
                    name: 'Sentence',
                    meta: {
                        invisible: 'true'
                    },
                    component: BlankView,
                    children: [{
                        path: 'Result',
                        name: 'Result',
                        component: () => import('@/pages/result/result_sent'),
                    }]
                },
            ]
        },
    ]
}

export default options
