<template>
  <div class="container">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <NuxtLink to="/">Home Page</NuxtLink>
  </div>
</template>

<script setup>
defineProps(["error"]);
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 7rem;
}

p {
  font-size: 2rem;
}

a {
  font-size: 1.5em;
  margin-top: 2em;
  color: $primary-blue;
}
</style>
