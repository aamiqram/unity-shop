// app/dashboard/invoices/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import InvoiceTemplate from "@/components/invoices/InvoiceTemplate";
import { getInvoiceById } from "@/lib/invoiceData";
import { FiArrowLeft, FiDownload, FiMail } from "react-icons/fi";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In real app, fetch from API
    setTimeout(() => {
      const inv = getInvoiceById(params.id);
      setInvoice(inv);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleDownloadPDF = () => {
    // In real app, generate PDF (e.g., with jsPDF or html2canvas + jsPDF)
    // For now, just simulate
    alert(`Downloading invoice ${params.id} as PDF...`);
    // You could also trigger a print-friendly version
    window.print();
  };

  const handleEmailInvoice = () => {
    alert(`Emailing invoice ${params.id}...`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  if (!invoice) {
    return (
      <DashboardLayout>
        <div>Invoice not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <Link
          href="/dashboard/invoices"
          className="inline-flex items-center text-gray-600 hover:text-[#FF6600] mb-4"
        >
          <FiArrowLeft className="mr-1" /> Back to Invoices
        </Link>

        {/* Actions */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
          >
            <FiDownload size={16} />
            Download PDF
          </button>
          <button
            onClick={handleEmailInvoice}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FiMail size={16} />
            Email Invoice
          </button>
        </div>

        {/* Invoice display */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 print:p-0 print:border-0">
          <InvoiceTemplate invoice={invoice} />
        </div>
      </div>
    </DashboardLayout>
  );
}
