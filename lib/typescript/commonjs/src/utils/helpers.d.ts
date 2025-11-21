import { RateLimiter } from './rateLimiter';
export declare class HttpApi {
    private client;
    private endpoint;
    private rateLimiter;
    constructor(baseUrl: string, endpoint: string | undefined, rateLimiter: RateLimiter);
    makeRequest<T>(payload: any, weight?: number, endpoint?: string): Promise<T>;
}
//# sourceMappingURL=helpers.d.ts.map