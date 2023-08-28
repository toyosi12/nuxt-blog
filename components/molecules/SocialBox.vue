<template>
  <section class="hdr__socials">
    <template v-for="(social, index) in socials" :key="social.label">
      <div class="hdr__socials-icon">
        <a :href="social.link" :aria-label="social.arialLabel">
          <component :is="getIconComponent(social.icon)" />
        </a>
      </div>
      <div
        v-if="index < socials.length - 1"
        class="hdr__socials-separator"
      ></div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

interface SocialItem {
  arialLabel: string;
  link: string;
  icon: string;
}

const socials: SocialItem[] = [
  {
    arialLabel: "Visit us on Twitter",
    link: "#",
    icon: "IconTwitter",
  },
  {
    arialLabel: "Visit our Dribbble Page",
    link: "#",
    icon: "IconDribbble",
  },
  {
    arialLabel: "Visit our Figma",
    link: "#",
    icon: "IconFigma",
  },
  {
    arialLabel: "Visit our Github page",
    link: "#",
    icon: "IconGithub",
  },
];

const getIconComponent = (icon: string) => {
  return defineAsyncComponent(() => import(`~/components/icons/${icon}.vue`));
};
</script>

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
