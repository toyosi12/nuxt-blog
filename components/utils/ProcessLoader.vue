<template>
  <div class="loader"></div>
</template>

<style lang="scss">
.loader {
  border: 4px solid $loader-border-color;
  border-top: 4px solid $black-10;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
