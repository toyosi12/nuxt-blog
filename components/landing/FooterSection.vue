<template>
  <footer class="footer">
    <p class="footer__text">Join our Team of Writers</p>
    <p class="footer__sub-text">
      On dasdas, writers earn a living doing what they love. Getting started is
      easy. Just pay a one time
      <span class="footer__sub-text--bold"
        >${{ MEMBER_COST_IN_DOLLARS }} fee</span
      >
      and everything is ready to go.
    </p>
    <action-button
      v-if="!isMember"
      btn-type="btn-dark"
      :on-click="handleJoin"
      arial-label="join us"
      >JOIN US</action-button
    >
    <p v-else class="footer__member-badge">You are a member!</p>
  </footer>
  <membership-dialog :on-close="onDialogClose" />
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { SET_MEMBER_DIALOG } from "~/store/constants";
import { MEMBER_COST_IN_DOLLARS } from "~/constants";

const store = useStore();

const isMember = computed(() => store.state.isMember);

const onDialogClose = () => {
  store.dispatch(SET_MEMBER_DIALOG, false);
};

const handleJoin = () => {
  store.dispatch(SET_MEMBER_DIALOG, true);
};
</script>

<style lang="scss" scoped>
.footer {
  @include flex-box(column);
  @include flex-gap(1.5rem);
  width: 70%;
  margin: 7rem 0;
  text-align: center;
  &__text {
    @include text-lg($black-10);
  }
  &__sub-text {
    font-weight: 400;
    font-size: 2.2rem;
    color: $black-20;
    margin-bottom: 2rem;
    &--bold {
      font-weight: 700;
    }
  }
  &__member-badge {
    background-color: $member-green;
    padding: 1rem;
    border-radius: 1.5rem;
    @include text-regular($white);
  }
}
</style>
