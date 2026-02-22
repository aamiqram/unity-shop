// app/rfq/page.jsx
"use client";

import { useState } from "react";
import RFQModal from "@/components/common/RFQModal";

export default function RFQPage() {
  const [isOpen, setIsOpen] = useState(true); // auto-open on page load

  return (
    <div className="container mx-auto px-4 py-8">
      <RFQModal isOpen={isOpen} onClose={() => window.history.back()} />
    </div>
  );
}
