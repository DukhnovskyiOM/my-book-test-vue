import { createStore } from "vuex";
import { postArticle } from "../api/postArticle";
import { getArticles } from "../api/getArticles";

const store = createStore({
    state() {
        return {
            articles: [],
            activePage: [],
            countPage: [],
        };
    },
    actions: {
        async getArticles({ commit }) {
            try {
                const res = await getArticles();
                const data = res.data.sort((a, b) => b.id - a.id);
                const result = [];
                for (let i = 0; i < data.length; i += 6) {
                    result.push(data.slice(i, i + 6));
                }
                commit("updateArticles", result);
                const page = new Array(result.length)
                    .fill(1)
                    .map((_, i) => i + 1);
                commit("updateCountPage", page);
                commit("oneActivePage");
            } catch (error) {
                alert(error);
            }
        },
        async newItem({ commit }, item) {
            try {
                await postArticle(item);
                await this.dispatch("getArticles");
            } catch (error) {
                alert(error);
            }
        },
        
    },
    mutations: {
        updateArticles(state, articles) {
            state.articles = articles;
        },
        updateCountPage(state, page) {
            state.countPage = page;
        },
        oneActivePage(state) {
            state.activePage = state.articles[0];
        },
        updateActivePage(state, n) {
            state.activePage = state.articles[+n - 1];
        },
        moreActivePage(state, n) {
            state.activePage = [...state.activePage, ...state.articles[+n - 1]];
        },
        sortArticleUp(state) {
            const r = state.articles.flat().sort((a, b) => b.id - a.id);
            const result = [];
            for (let i = 0; i < r.length; i += 6) {
                result.push(r.slice(i, i + 6));
            }
            state.articles = [...result];
            this.commit("oneActivePage");
        },
        sortArticleDown(state) {
            const r = state.articles.flat().sort((a, b) => a.id - b.id);
            const result = [];
            for (let i = 0; i < r.length; i += 6) {
                result.push(r.slice(i, i + 6));
            }
            state.articles = [...result];
            this.commit("oneActivePage");
        },
    },
    getters: {
        allArticles(state) {
            return state.articles;
        },
        pageArticles(state) {
            return state.activePage;
        },
        getCountPage(state) {
            return state.countPage;
        },
    },
});

export default store;
