import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewIncident from '@/components/NewIncident'
import ViewIncident from '@/components/ViewIncident'
import UpdateIncident from '@/components/UpdateIncident'
import Login from '@/components/Login'
import Register from '@/components/Register'

import firebase from 'firebase/app'
require('firebase/auth')

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/new',
      name: 'new-incident',
      component: NewIncident,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/:incident_id',
      name: 'view-incident',
      component: ViewIncident,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/update/:incident_id',
      name: 'update-incident',
      component: UpdateIncident,
      meta:{
        requiresAuth: true
      }
    }
  ]
})

//Nav gaurds

router.beforeEach((to, from, next) => {
  //check for requiredAuth gaurd
  if(to.matched.some(record => record.meta.requiresAuth)){
      //check if NOT logged in
      if(!firebase.auth().currentUser){
          //go to login page
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          })
      } else {
        //proceed to the route
        next();
      }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
       //check if logged in
       if(firebase.auth().currentUser){
        //go to login page
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
    } else {
      //proceed to the route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
})

export default router;




