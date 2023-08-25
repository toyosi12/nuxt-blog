<template>
  <section class="hdr__socials">
    <div class="hdr__socials-icon">
      <icon-twitter />
    </div>
    <div class="hdr__socials-separator"></div>
    <div class="hdr__socials-icon">
      <icon-dribbble />
    </div>
    <div class="hdr__socials-separator"></div>
    <div class="hdr__socials-icon">
      <icon-figma />
    </div>
    <div class="hdr__socials-separator"></div>
    <div class="hdr__socials-icon">
      <icon-github />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hdr__socials {
  @include flex-box(row, space-between, center);
  width: 17rem;
  &-icon {
    svg {
      width: 2.4rem;
    }
  }
  &-separator {
    @include separator();
  }
}
</style>
