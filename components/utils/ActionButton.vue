<template>
  <button
    id="action-btn"
    :class="['btn', btnType]"
    :type="type"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { ButtonProp } from "../../interfaces/components";
const { btnType, onClick, type } = defineProps<ButtonProp>();

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
  &:hover {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
