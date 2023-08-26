import { createStore } from "vuex";
import { Article } from "interfaces/api";
import {
  FETCH_ARTICLES,
  SET_ARTICLE,
  SET_ARTICLES,
  SET_CURRENT_PAGE,
} from "~/store/constants";

interface ArticleStore {
  articles: Article[];
  article: Article;
  currentPage: number;
}

const perPage = 10;

export const articleStore = createStore<ArticleStore>({
  state: () => ({
    articles: [],
    article: {} as Article,
    currentPage: 1,
  }),
  mutations: {
    setArticles(state, articles) {
      state.articles = [...state.articles, ...articles];
    },
    setArticle(state, article) {
      state.article = article;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
  },
  actions: {
    async fetchArticles({ commit }) {
      try {
        const { data } = await useFetch<Article[]>(
          "https://techcrunch.com/wp-json/wp/v2/posts",
          {
            params: {
              per_page: perPage,
              order_by: "date",
              order: "desc",
              page: this.state.currentPage,
            },
          },
        );
        if (data.value) {
          commit(SET_ARTICLES, data.value);
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
      commit(SET_CURRENT_PAGE, this.state.currentPage++);
      await this.dispatch(FETCH_ARTICLES);
    },
  },
  getters: {
    getArticles: (state) => state.articles,
    getArticle: (state) => state.article,
  },
});
