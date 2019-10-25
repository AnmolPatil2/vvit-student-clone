import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "@/components/SignUp";
import login from "@/components/login";
import Profile from "@/components/Profile"
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/profile/:id",
      name: "profile",

      component: Profile
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
