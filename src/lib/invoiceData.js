// lib/invoiceData.js
export const mockInvoices = [
  {
    id: "INV-2025-001",
    orderId: "ORD-12345",
    orderDate: "2025-02-15",
    dueDate: "2025-03-17",
    status: "paid",
    seller: {
      name: "Shenzhen Tech Co., Ltd.",
      address: "123 Tech Park, Shenzhen, Guangdong, China",
      taxId: "CN123456789",
      email: "billing@sztech.com",
      phone: "+86 755 1234 5678",
    },
    buyer: {
      name: "John Smith",
      address: "123 Main St, Apt 4B, New York, NY 10001, USA",
      email: "john.smith@example.com",
    },
    items: [
      {
        name: "Wireless Bluetooth Earbuds",
        sku: "EAR-BT-001",
        quantity: 2,
        unitPrice: 29.99,
        total: 59.98,
      },
      {
        name: "USB-C Charging Cable",
        sku: "CBL-UC-002",
        quantity: 1,
        unitPrice: 9.99,
        total: 9.99,
      },
    ],
    subtotal: 69.97,
    discount: 5.0,
    shipping: 5.99,
    tax: 7.0,
    total: 77.96,
    paymentMethod: "Credit Card",
    paymentDate: "2025-02-15",
    notes: "Thank you for your business!",
  },
  {
    id: "INV-2025-002",
    orderId: "ORD-12346",
    orderDate: "2025-02-10",
    dueDate: "2025-03-12",
    status: "paid",
    seller: {
      name: "Guangzhou Fashion Ltd.",
      address: "456 Fashion Ave, Guangzhou, Guangdong, China",
      taxId: "CN987654321",
      email: "finance@gzfashion.com",
      phone: "+86 20 8765 4321",
    },
    buyer: {
      name: "Emma Wilson",
      address: "456 Oak Ave, Los Angeles, CA 90001, USA",
      email: "emma.w@example.com",
    },
    items: [
      {
        name: "Women's Yoga Pants",
        sku: "APP-YOGA-01",
        quantity: 2,
        unitPrice: 29.99,
        total: 59.98,
      },
    ],
    subtotal: 59.98,
    discount: 0,
    shipping: 4.99,
    tax: 6.0,
    total: 70.97,
    paymentMethod: "PayPal",
    paymentDate: "2025-02-10",
    notes: "",
  },
  {
    id: "INV-2025-003",
    orderId: "ORD-12347",
    orderDate: "2025-02-05",
    dueDate: "2025-03-07",
    status: "unpaid",
    seller: {
      name: "Yiwu Houseware Co.",
      address: "789 Market Rd, Yiwu, Zhejiang, China",
      taxId: "CN456789123",
      email: "accounts@yiwuhouse.com",
      phone: "+86 579 1234 5678",
    },
    buyer: {
      name: "Michael Brown",
      address: "789 Pine St, Chicago, IL 60601, USA",
      email: "michael.b@example.com",
    },
    items: [
      {
        name: "Ceramic Coffee Mug Set (6 pcs)",
        sku: "HOM-MUG-006",
        quantity: 1,
        unitPrice: 34.99,
        total: 34.99,
      },
    ],
    subtotal: 34.99,
    discount: 0,
    shipping: 5.99,
    tax: 3.5,
    total: 44.48,
    paymentMethod: "Bank Transfer",
    paymentDate: null,
    notes: "Please pay within 30 days.",
  },
];

export const getInvoiceById = (id) => mockInvoices.find((inv) => inv.id === id);

export const getInvoicesByBuyer = (buyerEmail) =>
  mockInvoices.filter((inv) => inv.buyer.email === buyerEmail);

export const getInvoicesBySeller = (sellerName) =>
  mockInvoices.filter((inv) => inv.seller.name === sellerName);

export const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
