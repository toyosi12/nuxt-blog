<template>
  <main id="main">
    <hero-section :article="articles[0]" />
    <articles-section :articles="articles.slice(1)" />
    <load-more-btn
      :on-click="loadMoreArticles"
      :is-more-loading="isMoreLoading"
    />
    <footer-section />
  </main>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { Article } from "~/interfaces/api";
import { FETCH_ARTICLES, GO_TO_NEXT_PAGE } from "~/store/constants";
const store = useStore();
const articles = ref<Article[]>([]);
const isMoreLoading = ref<boolean>(false);

await store.dispatch(FETCH_ARTICLES);
articles.value = store.getters.getArticles;

const loadMoreArticles = async () => {
  isMoreLoading.value = true;
  await store.dispatch(GO_TO_NEXT_PAGE);
  articles.value = store.getters.getArticles;
  isMoreLoading.value = false;
};
</script>

<style lang="scss">
#main {
  @include flex-box(column);
  @include flex-gap($spacing-md);
}
</style>
