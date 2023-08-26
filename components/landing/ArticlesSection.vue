<template>
  <section class="articles">
    <template v-for="article in articles" :key="article.id">
      <article-box :article="article" />
    </template>
  </section>
</template>

<script lang="ts" setup>
import { Article } from "interfaces/api";

const { articles } = defineProps<{ articles: Article[] }>();
</script>

<style lang="scss" scoped>
.articles {
  width: 100%;
  @include flex-box(column, flex-start);
  @include flex-wrap(wrap);
  @include flex-gap($spacing-md);
  flex-wrap: wrap;
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
