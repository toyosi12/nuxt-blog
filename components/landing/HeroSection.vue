<template>
  <section class="hero">
    <article-card :is-hero="true" :article="article" :is-skeleton="false" />
  </section>
</template>

<script setup lang="ts">
import { Article } from "interfaces/api";

const { article } = defineProps<{ article: Article }>();
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
}
</style>
