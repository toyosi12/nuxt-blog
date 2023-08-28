<template>
  <article class="article">
    <article-card :article="article" />
  </article>
</template>

<script lang="ts" setup>
import { Article } from "interfaces/api";

const { article } = defineProps<{ article: Article }>();
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
}

@media screen and (min-width: $breakpoint-sm) {
  .article {
    width: calc(50% - $spacing-md);
  }
}

@media screen and (min-width: $breakpoint-lg) {
  .article {
    width: calc(33.33% - $spacing-md);
  }
}
</style>
