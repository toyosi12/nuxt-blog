import { PaymentStatus } from "~/enums/payment-statuses";
import { FlwPaymentOptions, FlwPaymentResponse } from "~/interfaces/api";

const flwLink = "https://checkout.flutterwave.com/v3.js";

const loadedScripts = new Set<string>();

export const loadFlw = (): Promise<void> => {
  if (!loadedScripts.has(flwLink)) {
    loadedScripts.add(flwLink);
    return new Promise((resolve) => {
      const script = window.document.createElement("script");
      window.document.head.appendChild(script);
      const onLoadFunc = () => {
        script.removeEventListener("load", onLoadFunc);
        resolve();
      };

      script.addEventListener("load", onLoadFunc);
      script.setAttribute("src", flwLink);
    });
  }

  return Promise.resolve();
};

export const useFlw = (
  options: FlwPaymentOptions,
): Promise<FlwPaymentResponse> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const flw = FlutterwaveCheckout({
      ...options,
      callback: (response: FlwPaymentResponse) => {
        if (response.status === PaymentStatus.SUCCESSFUL) {
          resolve(response);
        } else {
          reject(response);
        }
        setTimeout(() => flw.close(), 10000);
      },
    });
  });
};
