import { RateLimiter } from '../utils/rateLimiter';
import { InfoAPI } from './info';
import { type CancelOrderResponse } from '../utils/signing';
import { SymbolConversion } from '../utils/symbolConversion';
import { Hyperliquid } from '../index';
import type { ApproveAgentRequest, ApproveBuilderFeeRequest, BulkOrderRequest, CancelOrderRequest, CDepositResponse, ClaimRewardsResponse, CreateSubAccountResponse, CreateVaultResponse, CWithdrawResponse, NoopResponse, Order, OrderRequest, ReserveRequestWeightResponse, SetDisplayNameResponse, SpotUserResponse, SubAccountSpotTransferResponse, SubAccountTransferResponse, TokenDelegateResponse, TwapCancelRequest, TwapCancelResponse, TwapOrder, TwapOrderResponse } from '../types';
export declare class ExchangeAPI {
    private info;
    private wallet;
    private httpApi;
    private symbolConversion;
    private IS_MAINNET;
    private walletAddress;
    private _i;
    private parent;
    private vaultAddress;
    private nonceCounter;
    private lastNonceTimestamp;
    constructor(testnet: boolean, privateKey: string, info: InfoAPI, rateLimiter: RateLimiter, symbolConversion: SymbolConversion, walletAddress: (string | null) | undefined, parent: Hyperliquid, vaultAddress?: string | null);
    private getVaultAddress;
    private getAssetIndex;
    placeOrder(orderRequest: OrderRequest | Order | BulkOrderRequest): Promise<any>;
    cancelOrder(cancelRequests: CancelOrderRequest | CancelOrderRequest[]): Promise<CancelOrderResponse>;
    cancelOrderByCloid(symbol: string, cloid: string): Promise<any>;
    modifyOrder(oid: number | string, orderRequest: Order): Promise<any>;
    batchModifyOrders(modifies: Array<{
        oid: number | string;
        order: Order;
    }>): Promise<any>;
    updateLeverage(symbol: string, leverageMode: string, leverage: number): Promise<any>;
    updateIsolatedMargin(symbol: string, isBuy: boolean, ntli: number): Promise<any>;
    usdTransfer(destination: string, amount: number): Promise<any>;
    /**
     * Transfer SPOT assets to another wallet (doesn't touch bridge, so no fees)
     * @param destination - Destination wallet address
     * @param token - Token in format "TOKEN_NAME:TOKEN_ADDRESS" (e.g., "PURR:0xeb62eee3685fc4c43992febcd9e75443")
     * @param amount - Amount to transfer as string
     * @returns Promise with transfer result
     *
     * @example
     * // Get available tokens first
     * const spotMeta = await sdk.info.spot.getSpotMeta();
     * const purrToken = spotMeta.tokens.find(t => t.name === 'PURR');
     * const tokenFormat = `${purrToken.name}:${purrToken.tokenId}`;
     *
     * // Transfer tokens
     * await sdk.exchange.spotTransfer(
     *   '0x1234567890123456789012345678901234567890',
     *   tokenFormat, // "PURR:0xeb62eee3685fc4c43992febcd9e75443"
     *   '1.0'
     * );
     */
    spotTransfer(destination: string, token: string, amount: string): Promise<any>;
    initiateWithdrawal(destination: string, amount: number): Promise<any>;
    /**
     * Generate a payload for placing an order that can be used with WebSocket POST requests
     * @param orderRequest Order parameters
     * @returns A signed payload that can be used with WebSocket POST requests
     */
    getOrderPayload(orderRequest: OrderRequest | Order | BulkOrderRequest): Promise<any>;
    /**
     * Generate a payload for canceling an order that can be used with WebSocket POST requests
     * @param cancelRequests Cancel order parameters
     * @returns A signed payload that can be used with WebSocket POST requests
     */
    getCancelOrderPayload(cancelRequests: CancelOrderRequest | CancelOrderRequest[]): Promise<any>;
    /**
     * Generate a payload for canceling all orders that can be used with WebSocket POST requests
     * @returns A signed payload that can be used with WebSocket POST requests
     */
    getCancelAllPayload(): Promise<any>;
    transferBetweenSpotAndPerp(usdc: number, toPerp: boolean): Promise<any>;
    scheduleCancel(time: number | null): Promise<any>;
    vaultTransfer(vaultAddress: string, isDeposit: boolean, usd: number): Promise<any>;
    createVault(name: string, description: string, initialUsd: number): Promise<CreateVaultResponse>;
    vaultDistribute(vaultAddress: string, usd: number): Promise<any>;
    vaultModify(vaultAddress: string, allowDeposits: boolean | null, alwaysCloseOnWithdraw: boolean | null): Promise<any>;
    setReferrer(code?: string): Promise<any>;
    registerReferrer(code: string): Promise<any>;
    modifyUserEvm(usingBigBlocks: boolean): Promise<any>;
    placeTwapOrder(orderRequest: TwapOrder): Promise<TwapOrderResponse>;
    cancelTwapOrder(cancelRequest: TwapCancelRequest): Promise<TwapCancelResponse>;
    approveAgent(request: ApproveAgentRequest): Promise<any>;
    approveBuilderFee(request: ApproveBuilderFeeRequest): Promise<any>;
    claimRewards(): Promise<ClaimRewardsResponse>;
    createSubAccount(name: string): Promise<CreateSubAccountResponse>;
    setDisplayName(displayName: string): Promise<SetDisplayNameResponse>;
    spotUser(optOut: boolean): Promise<SpotUserResponse>;
    cDeposit(wei: bigint): Promise<CDepositResponse>;
    cWithdraw(wei: bigint): Promise<CWithdrawResponse>;
    tokenDelegate(validator: string, isUndelegate: boolean, wei: bigint): Promise<TokenDelegateResponse>;
    subAccountSpotTransfer(subAccountUser: string, isDeposit: boolean, token: number, amount: string): Promise<SubAccountSpotTransferResponse>;
    /**
     * Reserve additional actions for 0.0005 USDC per request instead of trading to increase rate limits
     * @param weight The weight to reserve (as a number)
     * @returns Response indicating success or failure
     */
    reserveRequestWeight(weight: number): Promise<ReserveRequestWeightResponse>;
    subAccountTransfer(subAccountUser: string, isDeposit: boolean, usd: number): Promise<SubAccountTransferResponse>;
    /**
     * Invalidate pending nonce (noop)
     * This endpoint can be used to invalidate pending nonces
     * @returns Response indicating success or failure
     */
    noop(): Promise<NoopResponse>;
    /**
     * Generates a unique nonce by using the current timestamp in milliseconds
     * If multiple calls happen in the same millisecond, it ensures the nonce is still increasing
     * @returns A unique nonce value
     */
    private generateUniqueNonce;
}
//# sourceMappingURL=exchange.d.ts.map