<template>
  <transition name="dialog-fade">
    <div v-show="isDialogOpen" class="dialog">
      <transition name="dialog-fade-inner">
        <div v-show="isDialogOpen" class="dialog__inner">
          <div class="dialog__close-btn-container">
            <button class="dialog__close-btn" @click="closeDialog">X</button>
          </div>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { DialogProp } from "interfaces/components";

const { isDialogOpen, onClose } = defineProps<DialogProp>();

const closeDialog = () => {
  if (onClose) {
    onClose();
  }
};
</script>

<style lang="scss" scoped>
.dialog-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-inner-enter-active {
    transition: all 0.3s;
  }

  &-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }

  &-inner-leave-to {
    transform: scale(0.8);
  }
}
.dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);

  &__inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    box-shadow:
      0 0.4rem 0.4rem -0.1rem rgba(0, 0, 0, 0.1),
      0 0.2rem 0.3rem -0.1rem rgba(0, 0, 0, 0.06);
    background-color: $white;
    padding: 4rem;
  }

  &__close-btn-container {
    width: 100%;
    @include flex-box(row, flex-end);
  }
  &__close-btn {
    border: none;
    background: none;
    font-size: 2.2rem;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
