import Vue from 'vue'
import Router from 'vue-router'
import BlankView from '@/layouts/BlankView'

import Home from '@/pages/home/Home'
import SearchResult from '@/pages/result/SearchResult'
import PathWays from '@/pages/pathways/Pathways'
import Article from '@/pages/article/Article'

// import PageView from '@/layouts/PageView'
// import TabsView from '@/layouts/TabsView'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '欢迎页',
            component: BlankView,
            children: [
                {
                    path: 'home',
                    name: 'Home',
                    component: Home,
                    meta: {
                        icon: 'home'
                    },
                },
                {
                    path: 'search',
                    name: '搜索',
                    component: SearchResult,
                    meta: {
                        icon: 'search'
                    },
                    // props: false, // Will send the params (productId in this case) as props to the component.
                },
                {
                    path: 'article',
                    name: 'Article',
                    component: Article,
                    // TODO: TabsView
                    meta: {
                        icon: 'book'
                    },
                },
                {
                    path: 'pathways',
                    name: 'Pathways',
                    component: PathWays,
                    meta: {
                        icon: 'arrow'
                    },
                },
                // {
                //     path: 'connection',
                //     name: 'CONNECTION',
                //     meta: {
                //         icon: 'table'
                //     },
                // },
                // {
                //     path: 'search',
                //     name: 'search',
                //     component: Search,
                // },
            ]
        },
        // {
        //     path: '/',
        //     name: '首页',
        //     component: TabsView,
        //     redirect: '/login',
        //     children: [
        //         {
        //             path: 'dashboard',
        //             name: 'Dashboard',
        //             meta: {
        //                 icon: 'dashboard'
        //             },
        //             component: BlankView,
        //             children: [
        //                 {
        //                     path: 'workplace',
        //                     name: '工作台',
        //                     component: () => import('@/pages/dashboard/workplace/WorkPlace'),
        //                 },
        //                 {
        //                     path: 'analysis',
        //                     name: '分析页',
        //                     component: () => import('@/pages/dashboard/analysis/Analysis'),
        //                 }
        //             ]
        //         },
        //         {
        //             path: 'form',
        //             name: '表单页',
        //             meta: {
        //                 icon: 'form',
        //             },
        //             component: PageView,
        //             children: [
        //                 {
        //                     path: 'basic',
        //                     name: '基础表单',
        //                     component: () => import('@/pages/form/basic/BasicForm'),
        //                 },
        //                 {
        //                     path: 'step',
        //                     name: '分步表单',
        //                     component: () => import('@/pages/form/step/StepForm'),
        //                 },
        //                 {
        //                     path: 'advance',
        //                     name: '高级表单',
        //                     component: () => import('@/pages/form/advance/AdvancedForm'),
        //                 }
        //             ]
        //         },
        //         {
        //             path: 'list',
        //             name: '列表页',
        //             meta: {
        //                 icon: 'table'
        //             },
        //             component: PageView,
        //             children: [
        //                 {
        //                     path: 'query',
        //                     name: '查询表格',
        //                     component: () => import('@/pages/list/QueryList'),
        //                 },
        //                 {
        //                     path: 'primary',
        //                     name: '标准列表',
        //                     component: () => import('@/pages/list/StandardList'),
        //                 },
        //                 {
        //                     path: 'card',
        //                     name: '卡片列表',
        //                     component: () => import('@/pages/list/CardList'),
        //                 },
        //                 {
        //                     path: 'search',
        //                     name: '搜索列表',
        //                     component: () => import('@/pages/list/search/SearchLayout'),
        //                     children: [
        //                         {
        //                             path: 'article',
        //                             name: '文章',
        //                             component: () => import('@/pages/list/search/ArticleList'),
        //                         },
        //                         {
        //                             path: 'application',
        //                             name: '应用',
        //                             component: () => import('@/pages/list/search/ApplicationList'),
        //                         },
        //                         {
        //                             path: 'project',
        //                             name: '项目',
        //                             component: () => import('@/pages/list/search/ProjectList'),
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             path: 'details',
        //             name: '详情页',
        //             meta: {
        //                 icon: 'profile'
        //             },
        //             component: BlankView,
        //             children: [
        //                 {
        //                     path: 'basic',
        //                     name: '基础详情页',
        //                     component: () => import('@/pages/detail/BasicDetail')
        //                 },
        //                 {
        //                     path: 'advance',
        //                     name: '高级详情页',
        //                     component: () => import('@/pages/detail/AdvancedDetail')
        //                 }
        //             ]
        //         },
        //         {
        //             path: 'result',
        //             name: '结果页',
        //             meta: {
        //                 icon: 'check-circle-o',
        //             },
        //             component: PageView,
        //             children: [
        //                 {
        //                     path: 'success',
        //                     name: '成功',
        //                     component: () => import('@/pages/result/Success')
        //                 },
        //                 {
        //                     path: 'error',
        //                     name: '失败',
        //                     component: () => import('@/pages/result/Error')
        //                 }
        //             ]
        //         },
        //         {
        //             path: 'exception',
        //             name: '异常页',
        //             meta: {
        //                 icon: 'warning',
        //             },
        //             component: BlankView,
        //             children: [
        //                 {
        //                     path: '404',
        //                     name: '404',
        //                     component: () => import('@/pages/exception/404')
        //                 },
        //                 {
        //                     path: '403',
        //                     name: '403',
        //                     component: () => import('@/pages/exception/403')
        //                 },
        //                 {
        //                     path: '500',
        //                     name: '500',
        //                     component: () => import('@/pages/exception/500')
        //                 }
        //             ]
        //         },
        //         {
        //             path: 'components',
        //             name: '小组件',
        //             meta: {
        //                 icon: 'appstore-o'
        //             },
        //             component: PageView,
        //             children: [
        //                 {
        //                     path: 'taskCard',
        //                     name: '任务卡片',
        //                     component: () => import('@/pages/components/TaskCard')
        //                 },
        //                 {
        //                     path: 'palette',
        //                     name: '颜色复选框',
        //                     component: () => import('@/pages/components/Palette')
        //                 }
        //             ]
        //         }
        //     ]
        // }
    ]
})
// import Vue from 'vue'
// import Router from 'vue-router'
// // import PageView from '@/layouts/PageView'
// // import BlankView from '@/layouts/BlankView'
// import HomeLayout from '@/layouts/HomeLayout'
// // import UserLayout from '@/layouts/UserLayout'
// import Login from '@/pages/login/Login'
// import Search from '@/pages/result/SearchResult'
//
// Vue.use(Router)
//
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: '首页',
//       component: Home,
//       children: [
//         {
//           path: 'discover',
//           name: 'DISCOVER'
//         },
//         {
//           path: 'connection',
//           name: 'CONNECTION'
//         }
//       ]
//     },
//     {
//       path: '/search',
//       name: '搜索结果',
//       component: Search,
//       // children: [
//       //   {
//       //     path: 'discover',
//       //     name: 'DISCOVER'
//       //   },
//       //   {
//       //     path: 'connection',
//       //     name: 'CONNECTION'
//       //   }
//       // ]
//     },
//     {
//       path: '/search?keyword',
//       component: Search,
//       props: true, // Will send the params (productId in this case) as props to the component.
//       meta: {}
//     },
//     {
//       path: '/welcome',
//       name: 'welcome',
//       component: Login,
//     },
//     {
//       path: '/login',
//       name: '登录页',
//       component: Login
//     },
//     // {
//     //   path: 'login',
//     //   name: 'login',
//     //   component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
//     // },
//   ]
// })
