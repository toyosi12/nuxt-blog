<template>
  <section>
    <Head>
      <Title>{{ pageTitle }}</Title>
    </Head>
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
        <nuxt-img
          v-if="img"
          class="card__image"
          loading="lazy"
          :src="img"
          :alt="title"
        />
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

const { date, author, title, content, img, pageTitle, slug } =
  defineProps<ArticleDetailProp>();
const articles = ref<Article[]>([]);

const fetchRecentArticles = async () => {
  await store.dispatch(FETCH_ARTICLES, { limit: 4, page: 1 });
  let _articles: Article[] = store.state.articles;
  _articles = _articles.filter((_article) => _article.slug !== slug);
  articles.value = _articles.slice(0, 3);
};

onMounted(() => {
  fetchRecentArticles();
});
</script>

<style lang="scss">
.article-detail {
  width: calc(100% - 2.4rem);
  margin: $spacing auto 5rem;
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
    color: $black-10;

    h2 {
      @include text-lg-bolder($black-10);
    }
    p {
      @include text-regular($black-10);
      margin-bottom: 1rem;
    }
    img {
      width: 100%;
      height: auto;
      margin: 0 0 1.5rem;
    }

    div {
      width: 100% !important;
      display: block;
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

@media screen and (min-width: $breakpoint-sm) {
  .article-detail {
    width: 80%;
    max-width: 80%;
    &__content {
      img {
        width: 80%;
        margin: 0 10% 1.5rem;
      }
    }
  }
}
</style>
