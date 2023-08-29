<template>
  <div class="home">
    <dialog-box :is-dialog-open="isDialogOpen" :on-close="onClose">
      <div class="modal-content">
        <h2>Pay ${{ MEMBER_COST_IN_DOLLARS }} to become a member</h2>
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

          <action-button
            class="pay-button"
            type="submit"
            btn-type="btn-block"
            aria-label="pay to join"
            :disabled="payBtnDisabled"
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
import { SET_IS_MEMBER, SET_MEMBER_DIALOG } from "~/store/constants";
import { MEMBER_COST_IN_DOLLARS } from "~/constants";

const store = useStore();
const { $flutterwave } = useNuxtApp();

const fullName = ref("");
const email = ref("");

const { onClose } = defineProps<{ onClose: Function }>();

const isDialogOpen = computed(() => store.state.memberDialogOpen);
const config = useRuntimeConfig();

const payBtnDisabled = ref(false);
const payAndAddMember = async (event: Event) => {
  payBtnDisabled.value = true;
  event.preventDefault();
  try {
    const paymentOptions: FlwPaymentOptions = {
      public_key: config.public.flwPublicKey as string,
      tx_ref: Date.now().toString(),
      currency: Currency.USD,
      amount: 10,
      payment_type: PaymentType.CARD,
      customer: {
        email: email.value,
        name: fullName.value,
      },
    };
    const paymentResponse = (await $flutterwave(paymentOptions)) as {
      status: string;
    };
    if (paymentResponse.status === "successfull") {
      store.dispatch(SET_IS_MEMBER, true);
    }
  } catch (error) {
    console.error("Payment error:", error);
  } finally {
    store.dispatch(SET_MEMBER_DIALOG, false);
    payBtnDisabled.value = false;
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
