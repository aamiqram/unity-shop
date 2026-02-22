// app/messages/page.jsx
"use client";

import { useChat } from "@/context/ChatContext";
import ConversationList from "@/components/chat/ConversationList";
import ChatDetail from "@/components/chat/ChatDetail";
import { useState } from "react";

export default function MessagesPage() {
  const { activeConversationId, setActiveConversationId } = useChat();
  const [showMobileList, setShowMobileList] = useState(true);

  return (
    <div className="h-screen flex">
      {/* Conversation list - hidden on mobile when chat is open */}
      <div
        className={`w-full md:w-80 border-r border-gray-200 bg-white ${
          activeConversationId && !showMobileList ? "hidden md:block" : "block"
        }`}
      >
        <ConversationList />
      </div>
      {/* Chat detail */}
      <div
        className={`flex-1 bg-white ${
          activeConversationId
            ? "block"
            : "hidden md:flex md:items-center md:justify-center"
        }`}
      >
        {activeConversationId ? (
          <ChatDetail onBack={() => setActiveConversationId(null)} />
        ) : (
          <p className="text-gray-400">
            Select a conversation to start messaging
          </p>
        )}
      </div>
    </div>
  );
}
