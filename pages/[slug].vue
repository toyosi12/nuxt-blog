<template>
  <article-detail
    v-if="!isPageLoading"
    :date="article.date"
    :content="article.content.rendered"
    :title="article.title.rendered"
    :author="article.yoast_head_json.author"
    :img="article.yoast_head_json.og_image[0].url"
    :page-title="article.yoast_head_json.title"
    :slug="slug"
  />
  <detail-skeleton v-else />
</template>

<script lang="ts" setup>
import { useStore } from "vuex";

import { initialArticle } from "~/store/initials";
import { Article } from "~/interfaces/api";
import { FETCH_ARTICLE } from "~/store/constants";
const store = useStore();
const route = useRoute();

const slug = route.params.slug;

const isPageLoading = ref(true);
const article = ref<Article>(initialArticle);
const fetchArticle = async () => {
  try {
    await store.dispatch(FETCH_ARTICLE, route.params.slug);
    article.value = store.getters.getArticle;
  } catch (err) {
  } finally {
    isPageLoading.value = false;
  }
};

onMounted(() => {
  fetchArticle();
});
</script>

<style scoped lang="scss"></style>
