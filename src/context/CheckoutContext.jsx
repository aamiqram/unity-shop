// context/CheckoutContext.jsx
"use client";

import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingInfo, setBillingInfo] = useState(null);

  return (
    <CheckoutContext.Provider
      value={{
        shippingInfo,
        setShippingInfo,
        paymentMethod,
        setPaymentMethod,
        billingSameAsShipping,
        setBillingSameAsShipping,
        billingInfo,
        setBillingInfo,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);
