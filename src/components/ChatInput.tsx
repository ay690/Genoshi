import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="rounded-2xl border-2 border-gray-200 bg-white/60 p-4 shadow-md backdrop-blur-md">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything or request a tool action..."
          disabled={disabled}
          className={cn(
            "min-h-[60px] max-h-[200px] resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm",
            "placeholder:text-gray-400"
          )}
        />

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {disabled
              ? "Waiting for response..."
              : "Press Enter to send, Shift+Enter for new line"}
          </p>

          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            size="sm"
            className={cn(
              "bg-gradient-to-r from-indigo-500 to-blue-500 text-white cursor-pointer",
              "hover:shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </form>
  );
};
