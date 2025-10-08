import {
  Cloud,
  Calculator,
  Image,
  Database,
  FileText,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type ToolCall } from "@/store/slices/chatSlice";

interface ToolCallCardProps {
  toolCall: ToolCall;
}

const toolConfig = {
  weather: {
    icon: Cloud,
    color: "text-blue-500",
    gradient: "bg-gradient-to-br from-blue-100 to-blue-50",
    border: "border-blue-200",
    label: "Weather",
  },
  calculator: {
    icon: Calculator,
    color: "text-green-500",
    gradient: "bg-gradient-to-br from-green-100 to-green-50",
    border: "border-green-200",
    label: "Calculator",
  },
  image_generator: {
    icon: Image,
    color: "text-purple-500",
    gradient: "bg-gradient-to-br from-purple-100 to-purple-50",
    border: "border-purple-200",
    label: "Image Generator",
  },
  database: {
    icon: Database,
    color: "text-orange-500",
    gradient: "bg-gradient-to-br from-orange-100 to-orange-50",
    border: "border-orange-200",
    label: "Database",
  },
  file_operations: {
    icon: FileText,
    color: "text-pink-500",
    gradient: "bg-gradient-to-br from-pink-100 to-pink-50",
    border: "border-pink-200",
    label: "File Operations",
  },
};

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    color: "text-gray-500",
    animate: "",
  },
  running: {
    icon: Loader2,
    label: "Running",
    color: "text-blue-500",
    animate: "animate-spin",
  },
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    color: "text-green-600",
    animate: "",
  },
  failed: {
    icon: XCircle,
    label: "Failed",
    color: "text-red-500",
    animate: "",
  },
};

export const ToolCallCard = ({ toolCall }: ToolCallCardProps) => {
  const config = toolConfig[toolCall.name as keyof typeof toolConfig] || toolConfig.database;
  const statusInfo = statusConfig[toolCall.status];
  const ToolIcon = config.icon;
  const StatusIcon = statusInfo.icon;

  return (
    <div
      className={cn(
        "rounded-xl p-4 border-2 transition-all duration-500 shadow-md",
        config.gradient,
        config.border,
        toolCall.status === "running" && "animate-pulse"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "p-2 rounded-lg border",
            config.gradient,
            config.border
          )}
        >
          <ToolIcon className={cn("h-5 w-5", config.color)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="font-semibold text-sm">{config.label}</h4>
            <div
              className={cn(
                "flex items-center gap-1.5 text-xs",
                statusInfo.color
              )}
            >
              <StatusIcon className={cn("h-3.5 w-3.5", statusInfo.animate)} />
              <span>{statusInfo.label}</span>
            </div>
          </div>

          {toolCall.result && toolCall.status === "completed" && (
            <div className="mt-2 p-3 rounded-lg bg-white/60 border border-gray-200">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words">
                {typeof toolCall.result === "string"
                  ? toolCall.result
                  : JSON.stringify(toolCall.result, null, 2)}
              </pre>
            </div>
          )}

          {toolCall.status === "failed" && (
            <p className="text-xs text-red-500 mt-2">Tool execution failed</p>
          )}
        </div>
      </div>
    </div>
  );
};
