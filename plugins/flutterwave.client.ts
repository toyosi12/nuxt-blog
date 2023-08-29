import { FlwPaymentOptions } from "interfaces/api";

export default defineNuxtPlugin(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.flutterwave.com/v3.js";
  script.async = true;
  document.head.appendChild(script);

  return {
    provide: {
      flutterwave: (options: FlwPaymentOptions) => {
        return new Promise((resolve, reject) => {
          // @ts-ignore
          const flw = FlutterwaveCheckout({
            ...options,
            callback: (response: any) => {
              if (response.status === "successful") {
                resolve(response);
              } else {
                reject(response);
              }
              setTimeout(() => flw.close(), 10000);
            },
            onClose: () => {
              reject(new Error("Payment closed"));
            },
          });
        });
      },
    },
  };
});
