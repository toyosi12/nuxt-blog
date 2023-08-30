<template>
  <process-loader v-if="isMoreLoading" data-testid="process-loader" />
  <action-button
    v-else
    class="load-more-btn"
    btn-type="dark"
    :on-click="onClick"
    data-testid="load-more-btn"
    aria-label="load more articles"
    >Load More</action-button
  >
</template>

<script lang="ts" setup>
import { ButtonProp } from "interfaces/components";

const { isMoreLoading, onClick } = defineProps<
  ButtonProp & { isMoreLoading: boolean }
>();
</script>

<style lang="scss" scoped>
.load-more-btn {
  font-size: 1.2rem;
  color: $black;
}
</style>
