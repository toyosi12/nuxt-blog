<template>
  <section>
    <article class="article-detail">
      <section class="article-detail__description">
        <div class="article-detail__writer">
          <p>By {{ author }}</p>
        </div>
        <div class="article-detail__description-separator"></div>
        <div class="article-detail__date">
          <p>{{ convertToRelativeDate(date) }}</p>
        </div>
      </section>
      <section class="article-detail__content">
        <h2 v-dompurify-html="title"></h2>
        <div class="article-detail__placeholder-img-container">
          <nuxt-img
            class="card__image"
            loading="lazy"
            :src="img"
            :alt="title"
          />
        </div>
        <div v-dompurify-html="content"></div>
      </section>
    </article>
    <aside>
      <h4>More Articles</h4>
      <articles-section :articles="articles" />
    </aside>
  </section>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { Article } from "interfaces/api";
import { ArticleDetailProp } from "~/interfaces/components";
import { FETCH_ARTICLES } from "~/store/constants";
import { convertToRelativeDate } from "~/utils/index";

const store = useStore();

const { date, author, title, content, img } = defineProps<ArticleDetailProp>();
const articles = ref<Article[]>([]);

await store.dispatch(FETCH_ARTICLES, { limit: 3, page: 1 });
articles.value = store.state.articles;
</script>

<style lang="scss">
.article-detail {
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
    color: $black-10;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 1.5rem;
    }
    h2 {
      @include text-lg-bolder($black-10);
    }
    p {
      @include text-regular($black-10);
      margin-bottom: 1rem;
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
  &__placeholder-img-container {
    width: 100%;
    @include flex-box(row, center, center);
    margin: 10px 0;
  }
}
</style>
