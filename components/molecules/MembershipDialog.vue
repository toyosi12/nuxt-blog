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
import { useToast } from "vue-toastification";
import { PaymentType } from "~/enums/payment-types";
import { PaymentStatus } from "~/enums/payment-statuses";
import { Currency } from "~/enums/currencies";
import { FlwPaymentOptions } from "~/interfaces/api";
import { SET_IS_MEMBER, SET_MEMBER_DIALOG } from "~/store/constants";
import { MEMBER_COST_IN_DOLLARS } from "~/constants";

const store = useStore();
const toast = useToast();
const isDialogOpen = computed(() => store.state.memberDialogOpen);
const config = useRuntimeConfig();
const { onClose } = defineProps<{ onClose: Function }>();

const fullName = ref("");
const email = ref("");

const payBtnDisabled = ref(false);
const payAndAddMember = async (event: Event) => {
  payBtnDisabled.value = true;
  event.preventDefault();
  try {
    const paymentOptions: FlwPaymentOptions = {
      public_key: config.public.flwPublicKey as string,
      tx_ref: Date.now().toString(),
      currency: Currency.USD,
      amount: MEMBER_COST_IN_DOLLARS,
      payment_type: PaymentType.CARD,
      customer: {
        email: email.value,
        name: fullName.value,
      },
      onclose: () => {
        store.dispatch(SET_MEMBER_DIALOG, false);
      },
    };

    await loadFlw();
    const paymentResponse = await useFlw(paymentOptions);
    if (paymentResponse.status === PaymentStatus.SUCCESSFUL) {
      store.dispatch(SET_IS_MEMBER, true);
    }
  } catch (error) {
    toast.error("could not process your payment");
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
  font-weight: 500;
  font-size: 1.5rem;
}
</style>
