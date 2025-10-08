/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ToolStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface ToolCall {
  id: string;
  name: string;
  status: ToolStatus;
  result?: any;
  timestamp: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: ToolCall[];
  timestamp: string;
  isStreaming?: boolean;
}

interface ChatState {
  messages: Message[];
  isStreaming: boolean;
  currentStreamingMessageId: string | null;
  availableTools: any[];
}

const initialState: ChatState = {
  messages: [],
  isStreaming: false,
  currentStreamingMessageId: null,
  availableTools: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    
    startStreaming: (state, action: PayloadAction<string>) => {
      state.isStreaming = true;
      state.currentStreamingMessageId = action.payload;
      state.messages.push({
        id: action.payload,
        role: 'assistant',
        content: '',
        toolCalls: [],
        timestamp: new Date().toISOString(),
        isStreaming: true,
      });
    },

    appendToMessage: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const message = state.messages.find(m => m.id === action.payload.id);
      if (message) {
        message.content += action.payload.content;
      }
    },

    addToolCall: (state, action: PayloadAction<{ messageId: string; toolCall: ToolCall }>) => {
      const message = state.messages.find(m => m.id === action.payload.messageId);
      if (message) {
        if (!message.toolCalls) {
          message.toolCalls = [];
        }
        const existingTool = message.toolCalls.find(t => t.id === action.payload.toolCall.id);
        if (existingTool) {
          Object.assign(existingTool, action.payload.toolCall);
        } else {
          message.toolCalls.push(action.payload.toolCall);
        }
      }
    },

    updateToolCall: (state, action: PayloadAction<{ messageId: string; toolId: string; updates: Partial<ToolCall> }>) => {
      const message = state.messages.find(m => m.id === action.payload.messageId);
      if (message?.toolCalls) {
        const tool = message.toolCalls.find(t => t.id === action.payload.toolId);
        if (tool) {
          Object.assign(tool, action.payload.updates);
        }
      }
    },

    stopStreaming: (state) => {
      state.isStreaming = false;
      if (state.currentStreamingMessageId) {
        const message = state.messages.find(m => m.id === state.currentStreamingMessageId);
        if (message) {
          message.isStreaming = false;
        }
      }
      state.currentStreamingMessageId = null;
    },

    setAvailableTools: (state, action: PayloadAction<any[]>) => {
      state.availableTools = action.payload;
    },

    clearMessages: (state) => {
      state.messages = [];
      state.isStreaming = false;
      state.currentStreamingMessageId = null;
    },
  },
});

export const {
  addMessage,
  startStreaming,
  appendToMessage,
  addToolCall,
  updateToolCall,
  stopStreaming,
  setAvailableTools,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
