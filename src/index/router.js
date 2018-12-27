import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/Index.vue"
import Login from "./views/login/index.vue"
import wxbind from "./views/login/wxbind.vue"
import myclass from './views/class/index.vue'
import allclass from "./views/class/allclass.vue"
import secure from "./views/class/secure.vue"
import course from "./views/class/course.vue"
import fenzu from "./views/class/fenzu.vue"
import sections from "./views/class/sections.vue"
import messages from "./views/secure/message.vue"
import feedback from "./views/new/feedback.vue"
import forum from "./views/forum/index.vue"
import {get} from "jquery"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/login',
      children: [{
        path: '/myclass',
        name: 'myclass',
        component: myclass,
        children: [
        ]
      },
      {
        path: "/secure",
        name: 'secure',
        component: secure
      },
      {
        path: "/allclass",
        name: 'allclass',
        component: allclass
      },
      {
        path: "/course/:ktId",
        name: 'course',
        component: course,
        props: true
      },
      {
        path: "/fenzu/:fenzuId",
        name: 'fenzu',
        component: fenzu,
        props: true
      },
      {
        path: "/sections/:cid/:num",
        name: 'sections',
        component: sections,
        props: true
      },
      {
        path: "/messages",
        name: 'messages',
        component: messages
      },
      {
        path: '/forum',
        name: 'forum',
        component: forum
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter:function(to,from, next) {
        get("/user/logout")
        next("/login")
        location.reload()
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/wxbind',
      name: 'wxbind',
      component: wxbind
    }
  ]
})
