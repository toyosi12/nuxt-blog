<template>
  <footer class="footer">
    <p class="footer__text">Join our Team of Writers</p>
    <p class="footer__sub-text">
      On dasdas, writers earn a living doing what they love. Getting started is
      easy. Just pay a one time
      <span class="footer__sub-text--bold"
        >${{ membershipCostInDollars }} fee</span
      >
      and everything is ready to go.
    </p>
    <action-button btn-type="btn-dark">JOIN US</action-button>
  </footer>
</template>

<script lang="ts" setup>
const membershipCostInDollars = 25;
</script>

<style lang="scss" scoped>
.footer {
  @include flex-box(column);
  @include flex-gap(1.5rem);
  width: 70%;
  margin: 7rem 0;
  text-align: center;
  &__text {
    @include text-lg($black-10);
  }
  &__sub-text {
    font-weight: 400;
    font-size: 2.2rem;
    color: $black-20;
    margin-bottom: 2rem;
    &--bold {
      font-weight: 700;
    }
  }
}
</style>
