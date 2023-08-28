import { createStore } from "vuex";
import { Article } from "interfaces/api";
import {
  FETCH_ARTICLES,
  SET_ARTICLE,
  SET_ARTICLES,
  SET_CURRENT_PAGE,
  SET_IS_MEMBER,
  SET_MEMBER_DIALOG,
} from "~/store/constants";

interface CrunchStore {
  articles: Article[];
  article: Article;
  currentPage: number;
  memberDialogOpen: boolean;
  isMember: boolean;
}

const perPage = 10;

export const crunchStore = createStore<CrunchStore>({
  state: () => ({
    articles: [],
    article: {} as Article,
    currentPage: 1,
    memberDialogOpen: false,
    isMember: false,
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
    setIsMember(state, isMember) {
      state.isMember = isMember;
    },
  },
  actions: {
    async fetchArticles(
      { commit, state },
      { page, limit }: { page: number; limit?: number },
    ) {
      try {
        const config = useRuntimeConfig();
        const baseUrl = config.public.apiBaseUrl;
        const response = await useFetch<Article[]>(`${baseUrl}/posts`, {
          params: {
            per_page: limit || perPage,
            order_by: "date",
            order: "desc",
            page,
          },
        });

        const data = response.data;
        if (data.value) {
          if (page === 1 || limit === 3) {
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
    setIsMember({ commit }, isMember) {
      commit(SET_IS_MEMBER, isMember);
    },
  },
  getters: {
    getArticles: (state) => state.articles,
    getArticle: (state) => state.article,
    getMemberDialog: (state) => state.memberDialogOpen,
    getIsMember: (state) => state.isMember,
  },
});
