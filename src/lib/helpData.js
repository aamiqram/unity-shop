// lib/helpData.js
export const helpCategories = [
  {
    id: "ordering",
    name: "Ordering & Shopping",
    icon: "🛒",
    description: "How to place orders, payment methods, and order confirmation",
    articleCount: 12,
    articles: [
      {
        id: "place-order",
        title: "How to place an order",
        slug: "place-order",
      },
      {
        id: "payment-methods",
        title: "Payment methods accepted",
        slug: "payment-methods",
      },
      {
        id: "order-confirmation",
        title: "Order confirmation",
        slug: "order-confirmation",
      },
      {
        id: "cancel-order",
        title: "How to cancel an order",
        slug: "cancel-order",
      },
    ],
  },
  {
    id: "shipping",
    name: "Shipping & Delivery",
    icon: "🚚",
    description: "Shipping times, tracking, and delivery issues",
    articleCount: 10,
    articles: [
      { id: "shipping-times", title: "Shipping times", slug: "shipping-times" },
      {
        id: "track-order",
        title: "How to track my order",
        slug: "track-order",
      },
      {
        id: "delivery-issues",
        title: "Delivery issues",
        slug: "delivery-issues",
      },
      { id: "shipping-costs", title: "Shipping costs", slug: "shipping-costs" },
    ],
  },
  {
    id: "returns",
    name: "Returns & Refunds",
    icon: "↩️",
    description: "Return policy, refund process, and how to initiate a return",
    articleCount: 8,
    articles: [
      { id: "return-policy", title: "Return policy", slug: "return-policy" },
      { id: "refund-process", title: "Refund process", slug: "refund-process" },
      {
        id: "initiate-return",
        title: "How to initiate a return",
        slug: "initiate-return",
      },
      {
        id: "return-shipping",
        title: "Return shipping",
        slug: "return-shipping",
      },
    ],
  },
  {
    id: "seller",
    name: "Seller Center",
    icon: "🏪",
    description: "How to become a seller, listing products, seller fees",
    articleCount: 15,
    articles: [
      {
        id: "become-seller",
        title: "How to become a seller",
        slug: "become-seller",
      },
      {
        id: "listing-products",
        title: "Listing products",
        slug: "listing-products",
      },
      { id: "seller-fees", title: "Seller fees", slug: "seller-fees" },
      {
        id: "seller-verification",
        title: "Seller verification",
        slug: "seller-verification",
      },
    ],
  },
  {
    id: "account",
    name: "Account & Security",
    icon: "🔒",
    description: "Account settings, password reset, two-factor authentication",
    articleCount: 9,
    articles: [
      {
        id: "account-settings",
        title: "Account settings",
        slug: "account-settings",
      },
      { id: "password-reset", title: "Password reset", slug: "password-reset" },
      {
        id: "two-factor",
        title: "Two-factor authentication",
        slug: "two-factor",
      },
      { id: "privacy", title: "Privacy settings", slug: "privacy" },
    ],
  },
  {
    id: "payments",
    name: "Payments",
    icon: "💳",
    description: "Payment methods, security, invoices",
    articleCount: 7,
    articles: [
      {
        id: "payment-methods",
        title: "Payment methods accepted",
        slug: "payment-methods",
      },
      {
        id: "payment-security",
        title: "Payment security",
        slug: "payment-security",
      },
      { id: "invoices", title: "Invoices", slug: "invoices" },
    ],
  },
];

export const popularArticles = [
  {
    id: "track-order",
    title: "How to track my order",
    category: "shipping",
    views: 12345,
  },
  {
    id: "return-policy",
    title: "What is your return policy?",
    category: "returns",
    views: 9800,
  },
  {
    id: "payment-methods",
    title: "Payment methods accepted",
    category: "payments",
    views: 8700,
  },
  {
    id: "cancel-order",
    title: "How to cancel an order",
    category: "ordering",
    views: 7600,
  },
  {
    id: "become-seller",
    title: "How to become a seller",
    category: "seller",
    views: 6500,
  },
];

export const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order, find a product you like, click 'Add to Cart', then proceed to checkout. Follow the steps to enter your shipping and payment information, then confirm your order.",
    category: "ordering",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, and bank transfers. You can also pay with cash on delivery in select locations.",
    category: "payments",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order from your account dashboard under 'My Orders'.",
    category: "shipping",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can return most items within 30 days for a full refund. Items must be in original condition. Some exceptions apply (e.g., perishable goods, custom items).",
    category: "returns",
  },
  {
    question: "How do I become a seller?",
    answer:
      "Go to 'Become a Seller' on our website, fill out the application form, and submit your documents. Our team will review and get back to you within 2-3 business days.",
    category: "seller",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page, enter your email, and we'll send you a reset link.",
    category: "account",
  },
];
