<template>
  <div class="form-group">
    <label class="form-group__label" :for="id">{{ inputLabel }} </label>
    <input
      :id="id"
      class="form-group__input"
      :type="type"
      :value="modelValue"
      @input="updateInput"
    />
  </div>
</template>

<script lang="ts" setup>
import { Event, InputProp } from "~/interfaces/components";

const { id, type, modelValue } = defineProps<InputProp>();
const emits = defineEmits(["update:modelValue"]);

const updateInput = (event: Event) => {
  emits("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped>
.form-group {
  width: 100%;
  margin: 2rem 0;
  &__label {
    display: block;
    margin-bottom: 0.5rem;
    @include text-regular($black-10);
    font-weight: 600;
  }
  &__input {
    width: 100%;
    padding: 0.8rem;
    &:focus {
      outline: 2px solid $black-10;
    }
  }
}
</style>
