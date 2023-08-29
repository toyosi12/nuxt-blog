<template>
  <NuxtLink :to="article.slug">
    <div
      :class="[
        'card',
        isHero === true ? 'card--hero' : '',
        isSkeleton === true ? 'card--skeleton' : '',
      ]"
    >
      <div class="card__image-container">
        <nuxt-img
          v-if="!isSkeleton"
          class="card__image"
          loading="lazy"
          :src="article.yoast_head_json.og_image[0].url"
          :alt="article.title.rendered"
        />
      </div>
      <div class="card__content">
        <div class="card__content-top">
          <div class="card__content-category">
            <p v-if="!isSkeleton">{{ article.primary_category.name }}</p>
          </div>
          <div class="card__content-separator"></div>
          <div class="card__content-date">
            <p v-if="!isSkeleton">{{ convertToRelativeDate(article.date) }}</p>
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
            <p v-if="!isSkeleton">
              {{ calculateReadingTimeInMins(article.content.rendered) }} Min
              Read
            </p>
          </div>
          <div class="card__content-full">
            <p v-if="!isSkeleton">Read Full →</p>
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
const { isHero, article, isSkeleton } = defineProps<CardProp>();
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
  cursor: pointer;
  transition:
    transform 0.2s,
    opacity 0.2s;
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
    p {
      color: $black-30;
      font-weight: 700;
    }
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
    opacity: 0.6;
  }

  &--hero {
    .card__content-middle {
      height: 13rem;
    }
  }

  &--skeleton {
    border: none;
    .card__image-container,
    .card__content-category,
    .card__content-middle,
    .card__content-date,
    .card__content-top,
    .card__content-bottom,
    .card__content-full {
      width: 100%;
      background-color: $gray-10;
      cursor: auto;
      background: linear-gradient(
        90deg,
        $gray-20 25%,
        $gray-30 50%,
        $gray-20 75%
      );
      background-size: 200% 100%;
      animation: skeletonWave 4s infinite;
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
