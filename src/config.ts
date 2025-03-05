const API_URL: string =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const WEBSOCKET_URL: string =
  (import.meta.env.VITE_WEBSOCKET_URL as string) || 'ws://localhost:8080/crawl';

export const config = {
  API_URL,
  WEBSOCKET_URL,
};
