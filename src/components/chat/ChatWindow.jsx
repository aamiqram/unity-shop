// components/chat/ChatWindow.jsx
"use client";

import { useChat } from "@/context/ChatContext";
import ConversationList from "./ConversationList";
import ChatDetail from "./ChatDetail";
import { FiX } from "react-icons/fi";

export default function ChatWindow() {
  const { isOpen, setIsOpen, activeConversationId, setActiveConversationId } =
    useChat();

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    setActiveConversationId(null);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold">Messages</h3>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 flex">
        {!activeConversationId ? (
          <ConversationList />
        ) : (
          <ChatDetail onBack={() => setActiveConversationId(null)} />
        )}
      </div>
    </div>
  );
}
