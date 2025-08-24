// hooks/useWebSocket.ts
import { useEffect, useCallback, useState } from 'react';
import { webSocketService, WebSocketMessage } from '@/services/websocketService';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(webSocketService.getConnectionStatus());

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      webSocketService.connect(token);
    }

    const unsubscribe = webSocketService.onMessage((message) => {
      if (message.type === 'exit_confirmation') {
        // Handle connection status updates
        setIsConnected(webSocketService.getConnectionStatus());
      }
    });

    return () => {
      unsubscribe();
      webSocketService.disconnect();
    };
  }, []);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    return webSocketService.sendMessage(message);
  }, []);

  return {
    isConnected,
    sendMessage,
    onMessage: webSocketService.onMessage.bind(webSocketService)
  };
};