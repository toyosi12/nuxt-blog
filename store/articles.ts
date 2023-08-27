import { createStore } from "vuex";
import { Article } from "interfaces/api";
import {
  FETCH_ARTICLES,
  SET_ARTICLE,
  SET_ARTICLES,
  SET_CURRENT_PAGE,
} from "~/store/constants";

interface AppStore {
  articles: Article[];
  article: Article;
  currentPage: number;
}

const perPage = 10;

export const appStore = createStore<AppStore>({
  state: () => ({
    articles: [],
    article: {} as Article,
    currentPage: 1,
    memberDialogOpen: false,
  }),
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    setArticle(state, article) {
      state.article = article;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
  },
  actions: {
    async fetchArticles({ commit, state }, page) {
      try {
        const response = await useFetch<Article[]>(
          "https://techcrunch.com/wp-json/wp/v2/posts",
          {
            params: {
              per_page: perPage,
              order_by: "date",
              order: "desc",
              page,
            },
          },
        );

        const data = response.data;
        if (data.value) {
          if (page === 1) {
            commit(SET_ARTICLES, data.value);
          } else {
            commit(SET_ARTICLES, [...state.articles, ...data.value]);
          }
          commit(SET_CURRENT_PAGE, page);
        }
      } catch (error) {
        // TODO: log errors
      }
    },
    async fetchArticle({ commit }, slug: string) {
      try {
        const { data } = await useFetch<Article[]>(
          `https://techcrunch.com/wp-json/wp/v2/posts`,
          {
            params: {
              slug,
            },
          },
        );
        if (data.value) {
          commit(SET_ARTICLE, data.value[0]);
        }
      } catch (error) {
        // TODO: log errors
      }
    },
    async goToNextPage({ commit }) {
      commit(SET_CURRENT_PAGE, this.state.currentPage + 1);
      await this.dispatch(FETCH_ARTICLES);
    },
  },
  getters: {
    getArticles: (state) => state.articles,
    getArticle: (state) => state.article,
  },
});
