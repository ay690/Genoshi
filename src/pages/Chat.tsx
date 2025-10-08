import { useEffect } from "react";
import { ChatContainer } from "@/components/ChatContainer";
import { ChatInput } from "@/components/ChatInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addMessage,
  startStreaming,
  appendToMessage,
  addToolCall,
  updateToolCall,
  stopStreaming,
  setAvailableTools,
} from "@/store/slices/chatSlice";
import { streamChat, fetchAvailableTools } from "@/services/chatAPI";
import { Sparkles, Github, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Chat = () => {
  const dispatch = useAppDispatch();
  const isStreaming = useAppSelector((state) => state.chat.isStreaming);

  useEffect(() => {
    fetchAvailableTools()
      .then((tools) => dispatch(setAvailableTools(tools)))
      .catch((error) => {
        console.error("Failed to fetch tools:", error);
        toast("Failed to load available tools");
      });
  }, [dispatch]);

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

    streamChat(
      content,
      (event) => {
        if (event.type === "text" && event.content) {
          dispatch(
            appendToMessage({ id: assistantMessageId, content: event.content })
          );
        } else if (event.type === "tool_call" && event.tool) {
          dispatch(
            addToolCall({
              messageId: assistantMessageId,
              toolCall: {
                id: event.tool.id,
                name: event.tool.name,
                status: event.tool.status,
                result: event.tool.result,
                timestamp: event.timestamp,
              },
            })
          );
        } else if (event.type === "tool_result" && event.tool) {
          dispatch(
            updateToolCall({
              messageId: assistantMessageId,
              toolId: event.tool.id,
              updates: {
                status: event.tool.status,
                result: event.tool.result,
              },
            })
          );
        } else if (event.type === "error") {
          console.error("Stream event error:", event);
          toast(
            event.content ? `Error: ${event.content}` : "An error occurred"
          );
        }
      },
      (error) => {
        console.error("Stream error:", error);
        dispatch(stopStreaming());
        toast("Failed to connect to the AI assistant");
      },
      () => {
        dispatch(stopStreaming());
      }
    );
  };

  return (
    <motion.div
      className="flex flex-col h-screen bg-gradient-to-br from-background via-muted/30 to-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <header className="relative backdrop-blur-lg bg-white/60 dark:bg-gray-900/40 border-b border-gray-300/40 dark:border-gray-700/40 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Left section with floating sparkle */}
          <div className="flex items-center gap-3 relative">
            <motion.div
              className="absolute -right-6 -top-1"
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }}
            >
              <motion.div
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-full p-3 bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg"
              >
                <Sparkles className="h-3 w-3 text-white" />
              </motion.div>
            </motion.div>

            <Link to="/" className="flex items-center gap-3 hover:opacity-80">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-md">
                <ArrowLeft className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Assistant</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Streaming with tool calls
                </p>
              </div>
            </Link>
          </div>

          {/* GitHub Button */}
          <Button
            variant="outline"
            size="sm"
            className="backdrop-blur-md border cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
            onClick={() => window.open("https://github.com/ay690", "_blank")}
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
          <div className="p-6 border-t border-gray-200/20 dark:border-gray-700/20">
            <ChatInput onSend={handleSendMessage} disabled={isStreaming} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
