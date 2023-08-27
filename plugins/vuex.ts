import { crunchStore } from "~/store/index";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(crunchStore);
});
