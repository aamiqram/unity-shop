// lib/disputeData.js
export const disputeReasons = [
  { value: "not_received", label: "Item not received" },
  { value: "not_as_described", label: "Item not as described" },
  { value: "damaged", label: "Damaged item" },
  { value: "wrong_item", label: "Wrong item received" },
  { value: "quality_issue", label: "Quality issue" },
  { value: "other", label: "Other" },
];

export const disputeStatuses = {
  OPEN: "Open",
  AWAITING_SELLER: "Awaiting Seller Response",
  AWAITING_BUYER: "Awaiting Buyer Response",
  UNDER_REVIEW: "Under Review",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

export const resolutionOptions = [
  { value: "full_refund", label: "Full refund" },
  { value: "partial_refund", label: "Partial refund" },
  { value: "replacement", label: "Replacement" },
  { value: "return_refund", label: "Return & refund" },
];

// Mock disputes data
export const mockDisputes = [
  {
    id: "DSP-1001",
    orderId: "ORD-12345",
    orderDate: "2025-02-15",
    buyerId: "user1",
    buyerName: "John Smith",
    sellerId: "seller1",
    sellerName: "Shenzhen Tech Co.",
    productId: "prod1",
    productName: "Wireless Bluetooth Earbuds",
    productImage:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&auto=format",
    reason: "not_received",
    description:
      "Ordered on Feb 15, tracking shows delivered but I never received the package.",
    amount: 59.98,
    preferredResolution: "full_refund",
    evidence: [
      { name: "screenshot.png", url: "#" },
      { name: "tracking.jpg", url: "#" },
    ],
    status: "Open",
    openedAt: "2025-02-22T10:30:00Z",
    sellerRespondedAt: null,
    resolvedAt: null,
    timeline: [
      {
        action: "opened",
        by: "buyer",
        at: "2025-02-22T10:30:00Z",
        note: "Dispute opened",
      },
    ],
    messages: [],
  },
  {
    id: "DSP-1002",
    orderId: "ORD-12346",
    orderDate: "2025-02-10",
    buyerId: "user2",
    buyerName: "Emma Wilson",
    sellerId: "seller2",
    sellerName: "Guangzhou Fashion Ltd.",
    productId: "prod2",
    productName: "Women's Yoga Pants",
    productImage:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=100&auto=format",
    reason: "quality_issue",
    description:
      "The pants arrived with loose stitching and the fabric is thinner than expected.",
    amount: 45.5,
    preferredResolution: "partial_refund",
    evidence: [{ name: "pants.jpg", url: "#" }],
    status: "Awaiting Seller Response",
    openedAt: "2025-02-21T14:15:00Z",
    sellerRespondedAt: null,
    resolvedAt: null,
    timeline: [
      {
        action: "opened",
        by: "buyer",
        at: "2025-02-21T14:15:00Z",
        note: "Dispute opened",
      },
    ],
    messages: [],
  },
  {
    id: "DSP-1003",
    orderId: "ORD-12347",
    orderDate: "2025-02-05",
    buyerId: "user3",
    buyerName: "Michael Brown",
    sellerId: "seller1",
    sellerName: "Shenzhen Tech Co.",
    productId: "prod3",
    productName: "Smart LED TV",
    productImage:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100&auto=format",
    reason: "damaged",
    description:
      "TV screen is cracked. Box showed no external damage but inside was broken.",
    amount: 320.0,
    preferredResolution: "replacement",
    evidence: [
      { name: "cracked_screen.jpg", url: "#" },
      { name: "box.jpg", url: "#" },
    ],
    status: "Under Review",
    openedAt: "2025-02-18T09:00:00Z",
    sellerRespondedAt: "2025-02-19T11:30:00Z",
    resolvedAt: null,
    timeline: [
      {
        action: "opened",
        by: "buyer",
        at: "2025-02-18T09:00:00Z",
        note: "Dispute opened",
      },
      {
        action: "responded",
        by: "seller",
        at: "2025-02-19T11:30:00Z",
        note: "Seller offered replacement",
      },
      {
        action: "escalated",
        by: "buyer",
        at: "2025-02-20T08:15:00Z",
        note: "Buyer requested admin review",
      },
    ],
    messages: [
      {
        id: 1,
        from: "seller",
        text: "We can send a replacement. Please confirm your address.",
        timestamp: "2025-02-19T11:30:00Z",
      },
      {
        id: 2,
        from: "buyer",
        text: "I'd prefer a refund instead.",
        timestamp: "2025-02-20T08:15:00Z",
      },
    ],
  },
  {
    id: "DSP-1004",
    orderId: "ORD-12348",
    orderDate: "2025-02-01",
    buyerId: "user4",
    buyerName: "Sarah Davis",
    sellerId: "seller3",
    sellerName: "Yiwu Houseware Co.",
    productId: "prod4",
    productName: "Ceramic Coffee Mug Set",
    productImage:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&auto=format",
    reason: "wrong_item",
    description: "Received a set of 4 mugs but ordered 6.",
    amount: 28.5,
    preferredResolution: "partial_refund",
    evidence: [],
    status: "Resolved",
    openedAt: "2025-02-08T16:45:00Z",
    sellerRespondedAt: "2025-02-09T10:00:00Z",
    resolvedAt: "2025-02-10T14:30:00Z",
    timeline: [
      {
        action: "opened",
        by: "buyer",
        at: "2025-02-08T16:45:00Z",
        note: "Dispute opened",
      },
      {
        action: "responded",
        by: "seller",
        at: "2025-02-09T10:00:00Z",
        note: "Seller offered partial refund",
      },
      {
        action: "accepted",
        by: "buyer",
        at: "2025-02-10T14:30:00Z",
        note: "Buyer accepted resolution",
      },
    ],
    messages: [],
  },
];
