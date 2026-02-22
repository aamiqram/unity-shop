// components/chat/ChatButton.jsx
"use client";

import { useChat } from "@/context/ChatContext";
import { FiMessageSquare } from "react-icons/fi";

export default function ChatButton() {
  const { conversations, setIsOpen } = useChat();
  const totalUnread = conversations.reduce((acc, conv) => acc + conv.unread, 0);

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 z-50 bg-[#FF6600] text-white p-4 rounded-full shadow-lg hover:bg-[#e65c00] transition-colors"
      aria-label="Open chat"
    >
      <FiMessageSquare size={24} />
      {totalUnread > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalUnread}
        </span>
      )}
    </button>
  );
}
