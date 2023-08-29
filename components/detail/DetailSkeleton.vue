<template>
  <div class="skeleton-container">
    <div v-for="index in 2" :key="index" class="detail-skeleton" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.skeleton-container {
  width: 80%;
  max-width: 80%;
  margin: 5rem auto;
}
.detail-skeleton {
  background-color: $gray-10;
  width: 100%;
  height: 15rem;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, $gray-20 25%, $gray-30 50%, $gray-20 75%);
  background-size: 200% 100%;
  animation: skeletonWave 4s infinite;
}
</style>
