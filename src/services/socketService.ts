export type WebSocketMessage = {
  progress?: number;
  message?: string;
  error?: string;
};

class WebSocketService {
  private socket: WebSocket | null = null;

  connect(
    url: string,
    action: string,
    onMessage: (data: WebSocketMessage) => void,
    onError?: (error: Event) => void,
  ) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      // eslint-disable-next-line no-console
      console.log('WebSocket already open, skipping...');
      return;
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.socket?.send(JSON.stringify({ action }));
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(
          event.data as unknown as string,
        ) as WebSocketMessage;
        onMessage(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.socket.onerror = (error) => {
      onError?.(error);
      this.close();
    };

    this.socket.onclose = () => {
      // eslint-disable-next-line no-console
      console.log('WebSocket closed');
      this.socket = null;
    };
  }

  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const socketService = new WebSocketService();
