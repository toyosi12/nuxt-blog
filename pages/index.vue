<template>
    <main id="main">
        <Hero />
        <Articles />
        <Footer />
    </main>
</template>

<style lang="scss">
    #main{
        @include flex-box(column);
        @include flex-gap($spacing-md);
    }
</style>