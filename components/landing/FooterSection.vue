<template>
  <footer class="footer">
    <p class="footer__text">Join our Team of Writers</p>
    <p class="footer__sub-text">
      On dasdas, writers earn a living doing what they love. Getting started is
      easy. Just pay a one time
      <span class="footer__sub-text--bold"
        >${{ membershipCostInDollars }} fee</span
      >
      and everything is ready to go.
    </p>
    <action-button btn-type="btn-dark" :on-click="handleJoin"
      >JOIN US</action-button
    >
  </footer>
</template>

<script lang="ts" setup>
const { $flutterwave } = useNuxtApp();

const membershipCostInDollars = 25;

const handleJoin = async () => {
  try {
    const paymentOptions: any = {
      public_key: "FLWPUBK_TEST-ac1328a5926811d408cec83ba36b5202-X",
      tx_ref: "fasdfasdf",
      amount: 10,
      currency: "USD",
      payment_type: "card",
      customer: {
        email: "user@example.com",
        phone_number: "user_phone_number",
        name: "John Doe",
      },
    };

    const paymentResponse = await $flutterwave(paymentOptions);
    console.log("Payment successful:", paymentResponse);
  } catch (error) {
    console.error("Payment error:", error);
  }
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
}
</style>
