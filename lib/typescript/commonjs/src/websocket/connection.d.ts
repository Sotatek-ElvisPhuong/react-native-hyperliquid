import { EventEmitter } from 'events';
interface WSMessage {
    method?: string;
    [key: string]: any;
}
export declare class WebSocketClient extends EventEmitter {
    private ws;
    private url;
    private pingInterval;
    private reconnectTimeout;
    private reconnectAttempts;
    private maxReconnectAttempts;
    private initialReconnectDelay;
    private maxReconnectDelay;
    private messageQueue;
    private isManuallyClosed;
    constructor(testnet?: boolean);
    getWebsocketState(): number | undefined;
    connect(): Promise<void>;
    private reconnect;
    private startPingInterval;
    private stopPingInterval;
    sendMessage(message: WSMessage): void;
    private flushMessageQueue;
    close(): void;
}
export {};
//# sourceMappingURL=connection.d.ts.map