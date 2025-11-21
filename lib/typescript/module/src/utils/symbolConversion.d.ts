export declare class SymbolConversion {
    private assetToIndexMap;
    private exchangeToInternalNameMap;
    private httpApi;
    private refreshIntervalMs;
    private refreshInterval;
    private initialized;
    private consecutiveFailures;
    private maxConsecutiveFailures;
    private disableAssetMapRefresh;
    constructor(baseURL: string, rateLimiter: any, disableAssetMapRefresh?: boolean, refreshIntervalMs?: number);
    initialize(): Promise<void>;
    private ensureInitialized;
    getInternalName(exchangeName: string): Promise<string | undefined>;
    private startPeriodicRefresh;
    private checkMaxFailures;
    stopPeriodicRefresh(): void;
    enablePeriodicRefresh(): void;
    disablePeriodicRefresh(): void;
    isRefreshEnabled(): boolean;
    getRefreshInterval(): number;
    setRefreshInterval(intervalMs: number): void;
    private refreshAssetMaps;
    getExchangeName(internalName: string): Promise<string | undefined>;
    getAssetIndex(assetSymbol: string): Promise<number | undefined>;
    getAllAssets(): Promise<{
        perp: string[];
        spot: string[];
    }>;
    convertSymbol(symbol: string, mode?: string, symbolMode?: string): Promise<string>;
    convertSymbolsInObject(obj: any, symbolsFields?: Array<string>, symbolMode?: string): Promise<any>;
    convertToNumber(value: any): any;
    static convertToUint64(value: bigint): number;
    convertResponse(response: any, symbolsFields?: string[], symbolMode?: string): Promise<any>;
}
//# sourceMappingURL=symbolConversion.d.ts.map