<template>
  <process-loader v-if="isMoreLoading" data-testid="process-loader" />
  <action-button
    v-else
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
