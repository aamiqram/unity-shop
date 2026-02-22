// components/chat/ConversationList.jsx
"use client";

import { useChat } from "@/context/ChatContext";
import Image from "next/image";

export default function ConversationList() {
  const { conversations, setActiveConversationId, markAsRead } = useChat();

  const formatTime = (iso) => {
    const date = new Date(iso);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-200 font-semibold">Messages</div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => {
              setActiveConversationId(conv.id);
              markAsRead(conv.id);
            }}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
          >
            <div className="relative">
              <Image
                src={conv.participant.avatar}
                alt={conv.participant.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              {conv.participant.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm truncate">
                  {conv.participant.name}
                </span>
                <span className="text-xs text-gray-400">
                  {formatTime(conv.lastMessageTime)}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {conv.lastMessage}
              </p>
            </div>
            {conv.unread > 0 && (
              <span className="bg-[#FF6600] text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                {conv.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
