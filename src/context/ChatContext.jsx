// context/ChatContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

// Mock conversations
const mockConversations = [
  {
    id: "conv1",
    participant: {
      id: "supplier1",
      name: "Shenzhen Tech Co.",
      avatar: "https://via.placeholder.com/40x40?text=ST",
      online: true,
    },
    lastMessage: "Yes, we have those in stock.",
    lastMessageTime: "2025-02-22T10:30:00",
    unread: 2,
  },
  {
    id: "conv2",
    participant: {
      id: "supplier2",
      name: "Guangzhou Fashion Ltd.",
      avatar: "https://via.placeholder.com/40x40?text=GF",
      online: false,
    },
    lastMessage: "The shipping cost will be $15.",
    lastMessageTime: "2025-02-21T16:20:00",
    unread: 0,
  },
];

// Mock messages for each conversation
const mockMessages = {
  conv1: [
    {
      id: "m1",
      sender: "supplier1",
      text: "Hello, how can I help you?",
      timestamp: "2025-02-22T09:00:00",
      read: true,
    },
    {
      id: "m2",
      sender: "me",
      text: "Hi, do you have wireless earbuds in black?",
      timestamp: "2025-02-22T09:05:00",
      read: true,
    },
    {
      id: "m3",
      sender: "supplier1",
      text: "Yes, we have those in stock.",
      timestamp: "2025-02-22T10:30:00",
      read: false,
    },
  ],
  conv2: [
    {
      id: "m4",
      sender: "me",
      text: "What's the shipping time to USA?",
      timestamp: "2025-02-21T15:00:00",
      read: true,
    },
    {
      id: "m5",
      sender: "supplier2",
      text: "The shipping cost will be $15.",
      timestamp: "2025-02-21T16:20:00",
      read: true,
    },
  ],
};

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // chat window open state

  const sendMessage = (conversationId, text, attachments = []) => {
    const newMessage = {
      id: `m${Date.now()}`,
      sender: "me",
      text,
      timestamp: new Date().toISOString(),
      read: false,
      attachments,
    };
    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage],
    }));
    // Update last message in conversation list
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: text,
              lastMessageTime: new Date().toISOString(),
            }
          : conv,
      ),
    );
    // Simulate reply after 2 seconds
    setTimeout(() => {
      const reply = {
        id: `m${Date.now() + 1}`,
        sender: conv.participant.id,
        text: "Thanks for your message. We'll get back to you shortly.",
        timestamp: new Date().toISOString(),
        read: false,
      };
      setMessages((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), reply],
      }));
    }, 2000);
  };

  const markAsRead = (conversationId) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unread: 0 } : conv,
      ),
    );
    // Mark messages as read (optional)
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        isOpen,
        setIsOpen,
        sendMessage,
        markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
