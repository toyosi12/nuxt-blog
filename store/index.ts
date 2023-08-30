import { createStore } from "vuex";
import { useToast } from "vue-toastification";
import { initialArticle } from "./initials";
import { Article } from "~/interfaces/api";
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
  cachedArticles: Map<string, Article>;
}

const perPage = 10;

const toast = useToast();

export const crunchStore = createStore<CrunchStore>({
  state: () => ({
    articles: [],
    article: initialArticle,
    currentPage: 1,
    memberDialogOpen: false,
    isMember: false,
    cachedArticles: new Map(),
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
    setCachedArticles(state, cache) {
      state.cachedArticles = cache;
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

        const { data } = await useHttp<Article[]>({
          url: `${baseUrl}/posts`,
          method: "get",
          params: {
            per_page: limit || perPage,
            order_by: "date",
            order: "desc",
            page,
          },
        });

        if (data) {
          if (page === 1 || limit === 3) {
            commit(SET_ARTICLES, data);
          } else {
            commit(SET_ARTICLES, [...state.articles, ...data]);
          }
          commit(SET_CURRENT_PAGE, page);
        }
      } catch (error: any) {
        toast.error(error?.message || "could not fetch data from api");
      }
    },
    async fetchArticle({ commit }, slug: string) {
      try {
        // memoize visited detail pages
        if (this.state.cachedArticles.has(slug)) {
          commit(SET_ARTICLE, this.state.cachedArticles.get(slug));
        } else {
          const config = useRuntimeConfig();
          const baseUrl = config.public.apiBaseUrl;
          const { data } = await useHttp<Article[]>({
            url: `${baseUrl}/posts`,
            params: {
              slug,
            },
          });
          if (data[0]) {
            commit(SET_ARTICLE, data[0]);
            this.state.cachedArticles.set(slug, data[0]);
          } else {
            showError({ statusCode: 404, statusMessage: "Not Found" });
          }
        }
      } catch (error: any) {
        toast.error(error?.message || "could not fetch data from api");
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
      sessionStorage.setItem("is_member", "true");
    },
  },
  getters: {
    getArticles: (state) => state.articles,
    getArticle: (state) => state.article,
    getMemberDialog: (state) => state.memberDialogOpen,
    getIsMember: (state) => {
      // persist visitors who have paid in session storage
      const storedState = sessionStorage.getItem("is_member");
      if (storedState === "true") {
        return true;
      }
      return state.isMember;
    },
  },
});
