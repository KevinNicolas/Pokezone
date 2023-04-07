import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Homepage",
      path: "/",
      component: () => import("~/pages/Home/Home.page.vue"),
    },
    {
      name: "Pokemon-info",
      path: "/:pokemonName",
      component: () => import("~/pages/Pokemon/Pokemon.page.vue"),
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 } as any;
  },
});
