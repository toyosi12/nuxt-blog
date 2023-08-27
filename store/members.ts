import { createStore } from "vuex";
import { SET_MEMBER_DIALOG } from "~/store/constants";

interface MemberStore {
  memberDialogOpen: boolean;
}
export const memberStore = createStore<MemberStore>({
  state: () => ({
    memberDialogOpen: false,
  }),
  mutations: {
    setMemberDialog(state, isOpen) {
      state.memberDialogOpen = isOpen;
    },
  },
  actions: {
    setMemberDialog({ commit }, isOpen: boolean) {
      commit(SET_MEMBER_DIALOG, isOpen);
    },
  },
  getters: {
    getMemberDialog: (state) => state.memberDialogOpen,
  },
});
