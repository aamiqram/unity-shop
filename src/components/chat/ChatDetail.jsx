// components/chat/ChatDetail.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import Image from "next/image";
import { FiSend, FiPaperclip, FiSmile, FiArrowLeft } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react"; // You'll need to install: npm install emoji-picker-react

export default function ChatDetail({ onBack }) {
  const { activeConversationId, conversations, messages, sendMessage } =
    useChat();
  const [inputText, setInputText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const conversation = conversations.find((c) => c.id === activeConversationId);
  const messageList = messages[activeConversationId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const handleSend = () => {
    if (inputText.trim() || attachments.length > 0) {
      sendMessage(activeConversationId, inputText, attachments);
      setInputText("");
      setAttachments([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const formatTime = (iso) => {
    return new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!conversation) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 flex items-center gap-3">
        <button onClick={onBack} className="lg:hidden">
          <FiArrowLeft size={20} />
        </button>
        <Image
          src={conversation.participant.avatar}
          alt={conversation.participant.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div>
          <h3 className="font-medium text-sm">
            {conversation.participant.name}
          </h3>
          <p className="text-xs text-gray-500">
            {conversation.participant.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messageList.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-2 ${
                msg.sender === "me"
                  ? "bg-[#FF6600] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text && <p className="text-sm">{msg.text}</p>}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mt-1 text-xs">
                  {msg.attachments.map((file, i) => (
                    <div key={i} className="flex items-center gap-1">
                      📎 {file.name}
                    </div>
                  ))}
                </div>
              )}
              <p
                className={`text-xs mt-1 ${msg.sender === "me" ? "text-orange-100" : "text-gray-400"}`}
              >
                {formatTime(msg.timestamp)}
                {msg.sender === "me" && (
                  <span className="ml-1">{msg.read ? "✓✓" : "✓"}</span>
                )}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachments.map((file, idx) => (
              <div
                key={idx}
                className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                📎 {file.name}
                <button
                  onClick={() =>
                    setAttachments(attachments.filter((_, i) => i !== idx))
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-end gap-2">
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 text-gray-500 hover:text-[#FF6600]"
          >
            <FiSmile size={20} />
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            className="p-2 text-gray-500 hover:text-[#FF6600]"
          >
            <FiPaperclip size={20} />
          </button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <textarea
            rows="1"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() && attachments.length === 0}
            className="p-2 bg-[#FF6600] text-white rounded-lg disabled:opacity-50"
          >
            <FiSend size={20} />
          </button>
        </div>
        {showEmoji && (
          <div className="absolute bottom-20 right-4 z-10">
            <EmojiPicker
              onEmojiClick={(emoji) =>
                setInputText((prev) => prev + emoji.emoji)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
