<template>
  <button
    :class="['btn', btnType]"
    :type="type"
    :aria-label="arialLabel"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { ButtonProp } from "../../interfaces/components";
const { btnType, onClick, type, arialLabel, disabled } =
  defineProps<ButtonProp>();

const handleClick = () => {
  if (onClick) {
    onClick();
  }
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 1.2rem 5.5rem;
  cursor: pointer;
  border: none;
  transition: box-shadow 0.3s;
  font-size: 1.8rem;
  &:hover {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    outline: 2px solid $primary-blue;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn-dark {
  color: $white;
  background: $black;
  border: none;
}

.btn-block {
  width: 100%;
}
</style>
