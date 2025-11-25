import { EventEmitter } from 'events';

import * as CONSTANTS from '../types/constants';

interface WSMessage {
  method?: string;
  [key: string]: any;
}

export class WebSocketClient extends EventEmitter {
  private ws: WebSocket | null = null;
  private url: string;
  private pingInterval: NodeJS.Timeout | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private initialReconnectDelay: number = 1000;
  private maxReconnectDelay: number = 30000;
  private messageQueue: WSMessage[] = [];
  private isManuallyClosed: boolean = false;

  constructor(testnet: boolean = false) {
    super();
    this.url = testnet
      ? CONSTANTS.WSS_URLS.TESTNET
      : CONSTANTS.WSS_URLS.PRODUCTION;
  }

  getWebsocketState(): number | undefined {
    return this.ws?.readyState;
  }

  connect(): Promise<void> {
    this.isManuallyClosed = false;
    return new Promise((resolve) => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }
      console.log('this.url: ', this.url);
      this.ws = new WebSocket(this.url);

      const handleOpen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.startPingInterval();
        this.flushMessageQueue();
        resolve();
      };

      const handleMessage = (event: any) => {
        try {
          const message = JSON.parse(event.data.toString());
          this.emit('message', message);
        } catch (error) {
          console.error('JSON Parse Error:', event.data, error);
        }
      };

      const handleError = (error: any) => {
        console.error('WebSocket error:', error);
      };

      const handleClose = () => {
        console.log('WebSocket disconnected');
        this.stopPingInterval();
        cleanup();
        if (!this.isManuallyClosed) this.reconnect();
      };

      const cleanup = () => {
        if (!this.ws) return;
        this.ws.onopen = null;
        this.ws.onmessage = null;
        this.ws.onerror = null;
        this.ws.onclose = null;
      };

      this.ws.onopen = handleOpen;
      this.ws.onmessage = handleMessage;
      this.ws.onerror = handleError;
      this.ws.onclose = handleClose;
    });
  }

  private reconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.emit('maxReconnectAttemptsReached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(
      this.initialReconnectDelay * 2 ** (this.reconnectAttempts - 1),
      this.maxReconnectDelay
    );
    console.log(`Reconnect attempt #${this.reconnectAttempts} in ${delay}ms`);

    if (this.ws) {
      // cleanup listener cũ trước khi reconnect
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
    }

    this.reconnectTimeout = setTimeout(() => {
      this.connect().catch(() => {}); // avoid unhandled promise
    }, delay);
  }

  private startPingInterval(): void {
    this.stopPingInterval();
    this.pingInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.sendMessage({ method: 'ping' });
      }
    }, 15000); // 15s
  }

  private stopPingInterval(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  sendMessage(message: WSMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      // queue if not ready
      this.messageQueue.push(message);
    }
  }

  private flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const msg = this.messageQueue.shift();
      if (msg) this.sendMessage(msg);
    }
  }

  close(): void {
    this.isManuallyClosed = true;
    this.stopPingInterval();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.ws) this.ws.close();
    this.ws = null;
    this.removeAllListeners();
    this.messageQueue = [];
  }
}
