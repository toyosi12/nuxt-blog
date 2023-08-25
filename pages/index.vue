<template>
  <main id="main">
    <hero-section :article="articles[0]" />
    <articles-section :articles="articles.slice(1)" />
    <footer-section />
  </main>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { FETCH_ARTICLES } from "~/store/constants";
const store = useStore();

await store.dispatch(FETCH_ARTICLES);
const articles = store.getters.getArticles;
</script>

<style lang="scss">
#main {
  @include flex-box(column);
  @include flex-gap($spacing-md);
}
</style>
