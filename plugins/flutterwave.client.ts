export default defineNuxtPlugin(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.flutterwave.com/v3.js";
  script.async = true;
  document.head.appendChild(script);

  return {
    provide: {
      flutterwave: (options: any) => {
        return new Promise((resolve, reject) => {
          // @ts-ignore
          FlutterwaveCheckout({
            ...options,
            callback: (response: any) => {
              if (response.status === "successful") {
                resolve(response);
              } else {
                reject(response);
              }
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