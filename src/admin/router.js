import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login/index.vue'
import coursebyid from "./views/course/coursebyid.vue"
import watchuser from "./views/user/watchuser.vue"
import packageCourse from "./views/packages/packageCourse.vue"
import oss from "./views/oss/index.vue"
import lessionByid from "./views/lession/lessionByid.vue"
import message from './views/message/lession.vue'
import videos1 from './views/video/index.vue'
import addcourseware from './views/course/addcourseware.vue'
import adminrole from './views/managent/adminrole.vue'
import gobalbuyer from './views/managent/gobalbuyer.vue'
import userrole1 from "./views/managent/userrole1.vue"
import school from "./views/student/school.vue"
import teacher from "./views/student/teacher.vue"
import student from "./views/student/student.vue"
import agent from "./views/student/agent.vue"
import administrator from "./views/student/administrator.vue"
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      redirect: "/login",
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import( /* webpackChunkName: "about" */ './views/admin/index.vue'),
      children: [{
          path: '/watchcourse',
          name: 'watchcourse',
          component: () => import('./views/course/watchcourse.vue')
        },
        {
          path: '/coursebyid/:courseId',
          name: 'coursebyid',
          component: coursebyid,
          props: true

        },
        {
          path: '/watchpackage',
          name: 'watchpackage',
          component: () => import('./views/packages/watchpackage.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('./views/user/index.vue')
        },
        {
          path: '/addstudent',
          name: 'addstudent',
          component: () => import('./views/user/addstudent.vue')
        },
        {
          path: '/watchuser/:userid',
          name: 'watchuser',
          component: watchuser,
          props: true
        },
        {
          path: '/packageCourse/:packageId',
          name: 'packageCourse',
          component: packageCourse,
          props: true
        },
        {
          path: '/lessionByid/:lid',
          name: 'lessionByid',
          component: lessionByid,
          props: true
        },
        {
          path: '/oss',
          name: 'oss',
          component: oss
        },
        {
          path: '/message',
          name: 'message',
          component: message
        },
        {
          path: '/videos1',
          name: 'videos1',
          component: videos1,
        },
        {
          path: '/addcourseware/:id',
          name: 'addcourseware',
          component: addcourseware,
          props: true
        },
        {
          path: '/adminrole',
          name: 'adminrole',
          component: adminrole
        },
        {
          path: '/gobalbuyer',
          name: 'gobalbuyer',
          component: gobalbuyer
        },
        {
          path: '/userrole1/:id',
          name: 'userrole1',
          component: userrole1,
          props: true
        },
        {
          path: '/school',
          name: 'school',
          component: school,
        },
        {
          path: '/teacher',
          name: 'teacher',
          component: teacher,
        },
        {
          path: '/student',
          name: 'student',
          component: student,
        },
        {
          path: '/agent',
          name: 'agent',
          component: agent,
        },
        {
          path: '/administrator',
          name: 'administrator',
          component: administrator,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },

  ]
})