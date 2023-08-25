<template>
    <button :class="['btn', btnType]">{{btnText}}</button>
</template>

<script setup>
    const { btnText, btnType } = defineProps(["btnText", "btnType"]);
</script>

<style lang="scss" scoped>
    .btn{
       padding: 1.2rem 5.5rem; 
    }

    .btn-dark{
        color: $white;
        background: $black;
        border: none;
    }
</style>
