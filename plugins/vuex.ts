import { articleStore } from "~/store/index";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(articleStore);
});
