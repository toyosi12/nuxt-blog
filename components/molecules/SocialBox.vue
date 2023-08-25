<template>
    <section class="hdr__socials">
        <div class="hdr__socials-icon">
            <IconTwitter />
        </div>
        <div class="hdr__socials-separator"></div>
        <div class="hdr__socials-icon">
            <IconDribbble />
        </div>
        <div class="hdr__socials-separator"></div>
        <div class="hdr__socials-icon">
            <IconFigma />
        </div>
        <div class="hdr__socials-separator"></div>
        <div class="hdr__socials-icon">
            <IconGithub />
        </div>
    </section>
</template>


<style lang="scss" scoped>
.hdr__socials{
    @include flex-box(row, space-between, center);
    width: 17rem;
    &-icon{
        svg {
            width: 2.4rem;
        }
    }
    &-separator{
        @include separator()
    }
}
</style>