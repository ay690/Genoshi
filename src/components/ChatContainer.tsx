import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { useAppSelector } from "@/store/hooks";
import { Sparkles } from "lucide-react";

export const ChatContainer = () => {
  const messages = useAppSelector((state) => state.chat.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="inline-flex p-6 rounded-3xl bg-white/70 backdrop-blur-md border-2 border-gray-200 shadow-md">
            <Sparkles className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
            AI Assistant Ready
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Start a conversation and watch as the assistant uses various tools
            to help you. Try asking about weather, calculations, image
            generation, or data queries!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
