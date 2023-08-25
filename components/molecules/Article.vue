<template>
    <article class="article">
        <Card />
    </article>
</template>

<style lang="scss" scoped>
    @media screen and (min-width: $breakpoint-sm) {
        .article {
            width: calc(33.33% - $spacing-md);
        }
    }
</style>