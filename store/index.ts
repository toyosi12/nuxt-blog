import { createStore } from "vuex";
import { Article } from "interfaces/api";
import { SET_ARTICLE, SET_ARTICLES } from "~/store/constants";

interface ArticleStore {
  articles: Article[];
  article: Article;
}

export const articleStore = createStore<ArticleStore>({
  state: () => ({
    articles: [],
    article: {} as Article,
  }),
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    setArticle(state, article) {
      state.article = article;
    },
  },
  actions: {
    async fetchArticles({ commit }) {
      try {
        const { data } = await useFetch<Article[]>(
          "https://techcrunch.com/wp-json/wp/v2/posts",
          {
            params: {
              per_page: 10,
              order_by: "date",
              order: "desc",
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
    async fetchArticle({ commit }, id: number) {
      try {
        const { data } = await useFetch<Article[]>(
          `https://techcrunch.com/wp-json/wp/v2/posts/${id}`,
        );
        if (data.value) {
          commit(SET_ARTICLE, data.value);
        }
      } catch (error) {
        // TODO: log errors
      }
    },
  },
  getters: {
    getArticles: (state) => state.articles,
    getArticle: (state) => state.article,
  },
});
