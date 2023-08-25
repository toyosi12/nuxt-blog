<template>
    <header class="hdr">
        <nav class="hdr__nav">
            <div class="hdr__logo-container">
                <NuxtLink to="/">
                    <Logo />
                </NuxtLink>
            </div>
            <div class="hdr__social-container">
                <SocialBox />
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.hdr{
   &__nav{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $spacing;
        padding: 1rem;
   }
    &__logo-container{
        svg{
            width: 8rem;
        }
    } 
}
</style>