"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderReview from "@/components/checkout/OrderReview";
import { FiCheck } from "react-icons/fi";

// Mock cart data – in real app get from context/state
const mockCart = {
  items: [
    {
      id: "p1",
      name: "Wireless Earbuds",
      price: 29.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=100",
    },
    {
      id: "p2",
      name: "Smart Watch",
      price: 49.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
    },
  ],
  subtotal: 109.97,
  shipping: 10,
  tax: 8.8,
  total: 128.77,
};

const steps = [
  { id: 1, name: "Shipping" },
  { id: 2, name: "Payment" },
  { id: 3, name: "Review" },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const router = useRouter();

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    setCurrentStep(3);
  };

  const handlePlaceOrder = () => {
    // Here you would send the order to your backend
    console.log("Order placed!", { shippingData, paymentData, cart: mockCart });
    // Redirect to order confirmation page
    router.push("/order/success?orderId=ORD-123456");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>Home</span> &gt; <span>Cart</span> &gt;{" "}
        <span className="text-gray-800">Checkout</span>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step.id < currentStep
                    ? "bg-orange text-white"
                    : step.id === currentStep
                      ? "border-2 border-orange text-orange"
                      : "border-2 border-gray-300 text-gray-400"
                }`}
              >
                {step.id < currentStep ? <FiCheck /> : step.id}
              </div>
              <span
                className={`ml-2 hidden sm:inline ${
                  step.id === currentStep
                    ? "font-medium text-gray-800"
                    : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
              {step.id < steps.length && (
                <div className="w-12 h-0.5 mx-2 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main form area */}
        <div className="lg:w-2/3">
          {currentStep === 1 && (
            <ShippingForm
              onSubmit={handleShippingSubmit}
              initialData={shippingData}
            />
          )}
          {currentStep === 2 && (
            <PaymentForm
              onSubmit={handlePaymentSubmit}
              onBack={() => setCurrentStep(1)}
              initialData={paymentData}
            />
          )}
          {currentStep === 3 && (
            <OrderReview
              shippingData={shippingData}
              paymentData={paymentData}
              cart={mockCart}
              onBack={() => setCurrentStep(2)}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
        </div>

        {/* Sticky summary sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg border sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              {mockCart.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded mr-2"
                    />
                    <span className="line-clamp-1">
                      {item.name} × {item.quantity}
                    </span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${mockCart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${mockCart.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${mockCart.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span className="text-orange">
                    ${mockCart.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 flex items-center">
              <FiCheck className="text-green-600 mr-1" /> Secure SSL encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
