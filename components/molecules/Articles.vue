<template>
    <section class="articles">
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />    
    </section>
</template>

<style lang="scss" scoped>

.articles{
    width: 100%;
    @include flex-box(column, flex-start);
    @include flex-wrap(wrap);
    @include flex-gap($spacing-md);
}

@media screen and (min-width: $breakpoint-sm) {
    .articles{
        @include flex-box(row, flex-start);

    }
}
</style>