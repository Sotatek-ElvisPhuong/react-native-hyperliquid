export declare class RateLimiter {
    private tokens;
    private lastRefill;
    private readonly capacity;
    private readonly refillRate;
    constructor();
    private refillTokens;
    waitForToken(weight?: number): Promise<void>;
}
//# sourceMappingURL=rateLimiter.d.ts.map