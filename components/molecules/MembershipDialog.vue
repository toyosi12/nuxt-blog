<template>
  <div class="home">
    <dialog-box :is-dialog-open="isDialogOpen" :on-close="onClose">
      <div class="modal-content">
        <h1>Pay {{ "$25" }} to become a member</h1>
        <form @submit="payAndAddMember">
          <input-box
            id="fullName"
            v-model="fullName"
            type="text"
            input-label="Full Name"
          />

          <input-box
            id="email"
            v-model="email"
            type="email"
            input-label="Email"
          />

          <action-button class="pay-button" type="submit" btn-type="btn-block"
            >Pay and Join</action-button
          >
        </form>
      </div>
    </dialog-box>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { PaymentType } from "~/enums/payment-types";
import { Currency } from "~/enums/currencies";
import { FlwPaymentOptions } from "~/interfaces/api";
import { SET_MEMBER_DIALOG } from "~/store/constants";

const store = useStore();
const { $flutterwave } = useNuxtApp();

const fullName = ref("");
const email = ref("");

const { onClose } = defineProps<{ onClose: Function }>();

const isDialogOpen = computed(() => store.state.memberDialogOpen);

const payAndAddMember = async (event: any) => {
  event.preventDefault();

  try {
    store.dispatch(SET_MEMBER_DIALOG, false);

    const paymentOptions: FlwPaymentOptions = {
      public_key: "FLWPUBK_TEST-ac1328a5926811d408cec83ba36b5202-X",
      tx_ref: Date.now().toString(),
      currency: Currency.USD,
      amount: 10,
      payment_type: PaymentType.CARD,
      customer: {
        email: email.value,
        name: fullName.value,
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
.pay-button {
  background-color: $black-10;
  color: $white;
  font-weight: 600;
}
</style>
