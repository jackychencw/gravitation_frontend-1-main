import Vue from 'vue'
import Router from 'vue-router'
// import PageView from '@/layouts/PageView'
// import BlankView from '@/layouts/BlankView'
// import HomeLayout from '@/layouts/HomeLayout'
// import UserLayout from '@/layouts/UserLayout'
// import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import Search from '@/pages/result/SearchResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {
          path: 'discover',
          name: 'DISCOVER'
        },
        {
          path: 'connection',
          name: 'CONNECTION'
        }
      ]
    },
    {
      path: '/search',
      name: '搜索结果',
      component: Search,
      // children: [
      //   {
      //     path: 'discover',
      //     name: 'DISCOVER'
      //   },
      //   {
      //     path: 'connection',
      //     name: 'CONNECTION'
      //   }
      // ]
    },
    {
      path: '/search?keyword',
      component: Search,
      props: true, // Will send the params (productId in this case) as props to the component.
      meta: {}
    }
  ]
})
