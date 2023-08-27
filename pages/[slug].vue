<template>
  <article-detail
    :date="article.date"
    :content="article.content.rendered"
    :title="article.title.rendered"
    :author="article.yoast_head_json.author"
  />
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { Article } from "~/interfaces/api";
import { FETCH_ARTICLE } from "~/store/constants";
const store = useStore();

const route = useRoute();
await store.dispatch(FETCH_ARTICLE, route.params.slug);
const article: Article = store.getters.getArticle;
</script>

<style scoped lang="scss"></style>
