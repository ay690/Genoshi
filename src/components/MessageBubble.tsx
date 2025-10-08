import { type Message } from "@/store/slices/chatSlice";
import { ToolCallCard } from "./ToolCallCard";
import { User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center shadow-md",
          isUser
            ? "bg-gradient-to-br from-indigo-500 to-blue-500 text-white"
            : "bg-white/70 backdrop-blur-md border-2 border-gray-200"
        )}
      >
        {isUser ? (
          <User className="h-5 w-5" />
        ) : (
          <Sparkles className="h-5 w-5 text-blue-500" />
        )}
      </div>

      <div
        className={cn("flex-1 space-y-3", isUser ? "items-end" : "items-start")}
      >
        {message.content && (
          <div
            className={cn(
              "inline-block rounded-2xl px-4 py-3 max-w-[85%] shadow-sm",
              isUser
                ? "bg-gradient-to-br from-indigo-500 to-blue-500 text-white ml-auto"
                : "bg-white/70 backdrop-blur-md border border-gray-200"
            )}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
            {message.isStreaming && (
              <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
            )}
          </div>
        )}

        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="space-y-2 max-w-[85%]">
            {message.toolCalls.map((toolCall) => (
              <ToolCallCard key={toolCall.id} toolCall={toolCall} />
            ))}
          </div>
        )}

        <p className={cn("text-xs text-gray-400 px-2", isUser && "text-right")}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
