import { createRouter, createWebHashHistory } from "vue-router";
import ArticleList from "../pages/ArticleList.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [{ path: "/", name: "home", props: true, component: ArticleList }],
});
