<template>
  <button :class="['btn', btnType]">{{ btnText }}</button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { ButtonProp } from "../../interfaces/components";
const { btnText, btnType } = defineProps<ButtonProp>();
</script>

<style lang="scss" scoped>
.btn {
  padding: 1.2rem 5.5rem;
  cursor: pointer;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }
}

.btn-dark {
  color: $white;
  background: $black;
  border: none;
}
</style>
