<template>
  <section>
    <article class="article">
      <section class="article__description">
        <div class="article__writer">
          <p>By {{ author }}</p>
        </div>
        <div class="article__description-separator"></div>
        <div class="article__date">
          <p>{{ convertToRelativeDate(date) }}</p>
        </div>
      </section>
      <section class="article__content">
        <h3>{{ title }}</h3>
        <p v-dompurify-html="content"></p>
      </section>
    </article>
    <aside>
      <h4>More Articles</h4>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { ArticleDetailProp } from "interfaces/components";
import { convertToRelativeDate } from "~/utils/index";

const { date, author, title, content } = defineProps<ArticleDetailProp>();
</script>

<style lang="scss" scoped>
.article {
  @include flex-box(column, flex-start, flex-start);
  @include flex-gap(2rem);
  width: 80%;
  margin: 5rem auto;
  &__description {
    @include flex-box(row, flex-start, center);
    @include flex-gap(0.5rem);
    &-separator {
      @include separator();
    }
  }
  &__writer {
    p {
      @include text-small($black-30);
    }
  }
  &__content {
    @include flex-box(column, flex-start, flex-start);
    h3 {
      @include text-lg-bolder($black-10);
    }
    p {
      @include text-regular($black-20);
    }
  }
  &__image-container {
    width: 100%;
    @include flex-box(row, center, center);
    margin: 3rem 0;
  }
  &__image {
    width: 60%;
    height: auto;
  }
  &__date {
    @include text-small($black-20);
  }
}
</style>
