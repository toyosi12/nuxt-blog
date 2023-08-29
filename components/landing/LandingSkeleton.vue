<template>
  <section class="articles">
    <template v-for="(article, index) in articles" :key="index">
      <article-box :is-skeleton="true" :article="article" />
    </template>
  </section>
</template>

<script lang="ts" setup>
import { initialArticle } from "~/store/initials";

const articles = Array.from({ length: 18 }, () => ({ ...initialArticle }));
</script>

<style lang="scss" scoped>
.articles {
  width: 100%;
  @include flex-box(column, flex-start);
  @include flex-wrap(wrap);
  @include flex-gap($spacing-md);
  flex-wrap: wrap;

  .article:first-child {
    width: 100%;
    height: 28rem;
    overflow: hidden;
  }
}

@media screen and (min-width: $breakpoint-sm) {
  .articles {
    @include flex-box(row, space-between);
    &::after {
      content: "";
      flex-basis: calc(33.33% - $spacing-md);
    }
  }
}
</style>
