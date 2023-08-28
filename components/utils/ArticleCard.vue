<template>
  <NuxtLink :to="article.slug">
    <div :class="['card', isHero === true ? 'card--hero' : '']">
      <div class="card__image-container">
        <nuxt-img
          class="card__image"
          loading="lazy"
          :src="article.yoast_head_json.og_image[0].url"
          :alt="article.title.rendered"
        />
      </div>
      <div class="card__content">
        <div class="card__content-top">
          <div class="card__content-category">
            <p>{{ article.primary_category.name }}</p>
          </div>
          <div class="card__content-separator"></div>
          <div class="card__content-date">
            <p>{{ convertToRelativeDate(article.date) }}</p>
          </div>
        </div>
        <div class="card__content-middle">
          <h4
            v-if="isHero === true"
            v-dompurify-html="article.title.rendered"
          ></h4>
          <h5 v-else v-dompurify-html="article.title.rendered"></h5>
          <p v-dompurify-html="article.excerpt.rendered"></p>
        </div>
        <div class="card__content-bottom">
          <div class="card__content-reading-time">
            <p>
              {{ calculateReadingTimeInMins(article.content.rendered) }} Min
              Read
            </p>
          </div>
          <div class="card__content-full">
            <p>Read Full</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { CardProp } from "~/interfaces/components";
import {
  convertToRelativeDate,
  calculateReadingTimeInMins,
} from "~/utils/index";
const { isHero, article } = defineProps<CardProp>();
</script>

<style lang="scss" scoped>
.card {
  @include flex-box(column);
  @include flex-box(column, flex-start, flex-start);
  @include flex-gap(1.2rem);
  overflow: hidden;
  padding: 1rem;
  border-radius: 0.5rem;
  border: solid 0.1rem $gray-10;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  &__image-container {
    width: 100%;
    height: 20rem;
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
  &__content {
    width: 100%;
    @include flex-box(column, flex-start, flex-start);
    @include flex-gap(1.2rem);
  }
  &__content-top {
    @include flex-box(row, flex-start);
    @include flex-gap(0.5rem);
    height: 2rem;
    p {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
  &__content-middle {
    height: 10.6rem;
    overflow: hidden;
    h4,
    h5 {
      @include text-clamp(2);
    }
    p {
      @include text-regular($black-20);
      @include text-clamp(3);
    }
  }
  &__content-bottom {
    height: 2rem;

    @include flex-box(row, space-between);
    width: 100%;
    align-self: baseline;
  }
  &__content-category {
    color: $black-30;
  }
  &__content-date {
    color: $black-20;
  }
  &__content-reading-time {
    p {
      @include text-small($black-20);
    }
  }
  &__content-separator {
    @include separator();
  }
  &__content-full {
    text-align: right;
    p {
      @include text-small-bold($primary-blue);
    }
  }
  h5 {
    color: $black-10;
  }
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &--hero {
    .card__content-middle {
      height: 13rem;
    }
  }
}

@media screen and (min-width: $breakpoint-sm) {
  .card {
    &--hero {
      padding: 0.8rem;
      height: 28rem;
      @include flex-box(row, flex-start, flex-start);
      .card__image-container {
        height: 100%;
        .card__image {
          border-radius: 0;
        }
      }
      .card__content {
        @include flex-box(column, flex-start, flex-start);
        height: 100%;
      }
      .card__content-bottom {
        margin-top: auto;
      }
      h4 {
        font-weight: 900;
      }
    }
  }
}
</style>
