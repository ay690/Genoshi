/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = 'https://intern-test-frontend-mbcr.onrender.com';

export interface StreamEvent {
  type: 'text' | 'tool_call' | 'tool_result' | 'error' | 'done';
  content?: string;
  tool?: {
    name: string;
    id: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    result?: any;
  };
  timestamp: string;
}

export const fetchAvailableTools = async () => {
  const response = await fetch(`${API_BASE_URL}/tools`);
  if (!response.ok) {
    throw new Error('Failed to fetch tools');
  }
  return response.json();
};

export const streamChat = async (
  message: string,
  onEvent: (event: StreamEvent) => void,
  onError: (error: Error) => void,
  onComplete: () => void
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        onComplete();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      
      // Keep the last incomplete line in the buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith(':')) continue;

        // Handle both SSE format (data: {...}) and plain JSON ({...})
        let jsonData = trimmedLine;
        if (trimmedLine.startsWith('data: ')) {
          jsonData = trimmedLine.slice(6);
          
          if (jsonData === '[DONE]') {
            onComplete();
            return;
          }
        }

        try {
          const event = JSON.parse(jsonData) as StreamEvent;
          onEvent(event);
        } catch (e) {
          console.error('Failed to parse streaming data:', jsonData, e);
        }
      }
    }
  } catch (error) {
    onError(error as Error);
  }
};
