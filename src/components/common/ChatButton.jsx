"use client";
import { useState } from "react";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can we help you today?",
      sender: "support",
      time: "10:00 AM",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), text: input, sender: "user", time: "Just now" },
    ]);
    setInput("");
    // Simulate reply after 1 sec
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Thanks for your message. A support agent will be with you shortly.",
          sender: "support",
          time: "Just now",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-orange text-white p-4 rounded-full shadow-lg hover:bg-orange/90 z-50"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border flex flex-col z-50">
          <div className="bg-orange text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">Live Chat</span>
            <button onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-3 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.sender === "user" ? "bg-orange text-white" : "bg-gray-100"}`}
                >
                  {msg.text}
                  <div
                    className={`text-xs mt-1 ${msg.sender === "user" ? "text-orange-100" : "text-gray-400"}`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-2 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-orange text-white px-3 py-2 rounded-r hover:bg-orange/90"
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
