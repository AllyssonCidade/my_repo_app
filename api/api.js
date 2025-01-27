import axios from "axios";
const URL = process.env.EXPO_PUBLIC_HOST;
const api = axios.create({
  baseURL: URL,
  timeout: 5000,
});

export const fetchPaymentSheetParams = async (price, name, email, phone) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_HOST}/payment-sheet`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.floor(price * 100),
        name,
        email,
        phone,
      }),
    }
  );
  const { paymentIntent, ephemeralKey, customer } = await response.json();

  return {
    paymentIntent,
    ephemeralKey,
    customer,
  };
};
