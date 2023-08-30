<template>
  <main v-if="!isPageLoading" id="main">
    <hero-section :article="articles[0]" />
    <articles-section :articles="articles.slice(1)" />
    <load-more-btn
      :on-click="loadMoreArticles"
      :is-more-loading="isMoreLoading"
    />
    <footer-section />
  </main>
  <landing-skeleton v-else />
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { FETCH_ARTICLES } from "~/store/constants";
import { Article } from "~/interfaces/api";

const store = useStore();
const articles = ref<Article[]>([]);
const isPageLoading = ref<boolean>(true);
const isMoreLoading = ref<boolean>(false);

const fetchArticles = async () => {
  isPageLoading.value = true;
  if (store.state.articles?.length > 0) {
    articles.value = store.state.articles;
  } else {
    await store.dispatch(FETCH_ARTICLES, {
      page: store.state.currentPage || 1,
    });
    articles.value = store.state.articles;
  }
  isPageLoading.value = false;
};

onMounted(() => {
  fetchArticles();
});

const loadMoreArticles = async () => {
  const currentPage = store.state.currentPage;
  isMoreLoading.value = true;
  try {
    await store.dispatch(FETCH_ARTICLES, { page: currentPage + 1 });
    articles.value = store.state.articles;
  } catch {
  } finally {
    isMoreLoading.value = false;
  }
};

useHead({
  title: "TechCrunch | Startup and Technology",
  meta: [
    {
      name: "description",
      content:
        "TechCrunch | Reporting on the business of technology, startups, venture capital funding, and Silicon Valley",
    },
  ],
});
</script>

<style lang="scss">
#main {
  @include flex-box(column);
  @include flex-gap($spacing-md);
}
</style>
