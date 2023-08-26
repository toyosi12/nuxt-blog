<template>
  <process-loader v-if="isMoreLoading" />
  <action-button v-else btn-type="dark" :on-click="onClick"
    >Load More</action-button
  >
</template>

<script lang="ts" setup>
import { ButtonProp } from "interfaces/components";

const { isMoreLoading, onClick } = defineProps<
  ButtonProp & { isMoreLoading: boolean }
>();
</script>
