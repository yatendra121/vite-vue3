import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { currentPortal } from "@/utils/portal-helper";

console.log(currentPortal.getApiBaseUrl());

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/admin/Dashboard/index.vue"
      ),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/admin/About/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(currentPortal.getRouterBaseUri()),
  routes,
});

export default router;
