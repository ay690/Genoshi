import { ChatContainer } from "../components/ChatContainer";
import { ChatInput } from "../components/ChatInput";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Sparkles, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addMessage,
  startStreaming,
  appendToMessage,
  stopStreaming,
} from "../store/slices/chatSlice";

export const Chat = () => {
  const dispatch = useAppDispatch();
  const isStreaming = useAppSelector((state) => state.chat.isStreaming);

  const handleSendMessage = (content: string) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user" as const,
      content,
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(userMessage));
    const assistantMessageId = `assistant-${Date.now()}`;
    dispatch(startStreaming(assistantMessageId));

    // Simulated AI response (replace with actual API later)
    setTimeout(() => {
      dispatch(
        appendToMessage({
          id: assistantMessageId,
          content: "Hi! I’m your AI Assistant 🤖",
        })
      );
      dispatch(stopStreaming());
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/70 dark:bg-gray-800/50 border-b border-gray-300/50 dark:border-gray-700/50 px-6 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Assistant</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Streaming with tool calls
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="backdrop-blur-md border cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-5xl mx-auto flex flex-col">
          <ChatContainer />
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <ChatInput onSend={handleSendMessage} disabled={isStreaming} />
          </div>
        </div>
      </div>
    </div>
  );
};
