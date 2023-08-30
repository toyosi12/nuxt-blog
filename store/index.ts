import { createStore } from "vuex";
import { useToast } from "vue-toastification";
import { initialArticle } from "./initials";
import { Article } from "~/interfaces/api";
import {
  FETCH_ARTICLE,
  FETCH_ARTICLES,
  FETCH_RECENT_ARTICLES,
  GO_TO_NEXT_PAGE,
  SET_ARTICLE,
  SET_ARTICLES,
  SET_CACHED_ARTICLES,
  SET_CURRENT_PAGE,
  SET_IS_MEMBER,
  SET_MEMBER_DIALOG,
  SET_RECENT_ARTICLES,
} from "~/store/constants";

interface CrunchStore {
  articles: Article[];
  article: Article;
  currentPage: number;
  memberDialogOpen: boolean;
  isMember: boolean;
  cachedArticles: Map<string, Article>;
  recentArticles: Article[];
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
    recentArticles: [],
  }),
  mutations: {
    [SET_ARTICLES](state, articles) {
      state.articles = articles;
    },
    [SET_ARTICLE](state, article) {
      state.article = article;
    },
    [SET_CURRENT_PAGE](state, currentPage) {
      state.currentPage = currentPage;
    },
    [SET_MEMBER_DIALOG](state, isOpen) {
      state.memberDialogOpen = isOpen;
    },
    [SET_IS_MEMBER](state, isMember) {
      state.isMember = isMember;
    },
    [SET_CACHED_ARTICLES](state, cache) {
      state.cachedArticles = cache;
    },
    [SET_RECENT_ARTICLES](state, recentArticles) {
      state.recentArticles = recentArticles;
    },
  },
  actions: {
    async [FETCH_ARTICLES](
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
          if (page === 1) {
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

    async [FETCH_ARTICLE]({ commit }, slug: string) {
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

    async [GO_TO_NEXT_PAGE]({ commit }) {
      commit(SET_CURRENT_PAGE, this.state.currentPage + 1);
      await this.dispatch(FETCH_ARTICLES);
    },

    [SET_MEMBER_DIALOG]({ commit }, isOpen: boolean) {
      commit(SET_MEMBER_DIALOG, isOpen);
    },

    [SET_IS_MEMBER]({ commit }, isMember) {
      commit(SET_IS_MEMBER, isMember);
      sessionStorage.setItem("is_member", "true");
    },

    async [FETCH_RECENT_ARTICLES]({ commit }, { page }: { page: number }) {
      try {
        const config = useRuntimeConfig();
        const baseUrl = config.public.apiBaseUrl;

        const { data } = await useHttp<Article[]>({
          url: `${baseUrl}/posts`,
          method: "get",
          params: {
            per_page: 4,
            order_by: "date",
            order: "desc",
            page,
          },
        });

        if (data) {
          commit(SET_RECENT_ARTICLES, data);
        }
      } catch (error: any) {
        toast.error(error?.message || "could not fetch data from api");
      }
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
