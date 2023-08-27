import { createStore } from "vuex";
import { Article } from "interfaces/api";
import {
  FETCH_ARTICLES,
  SET_ARTICLE,
  SET_ARTICLES,
  SET_CURRENT_PAGE,
  SET_MEMBER_DIALOG,
} from "~/store/constants";

interface ArticleStore {
  articles: Article[];
  article: Article;
  currentPage: number;
  memberDialogOpen: boolean;
}

const perPage = 10;

export const articleStore = createStore<ArticleStore>({
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
    setMemberDialog(state, isOpen) {
      state.memberDialogOpen = isOpen;
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
    setMemberDialog({ commit }, isOpen: boolean) {
      commit(SET_MEMBER_DIALOG, isOpen);
    },
  },
  getters: {
    getArticles: (state) => state.articles,
    getArticle: (state) => state.article,
    getMemberDialog: (state) => state.memberDialogOpen,
  },
});
