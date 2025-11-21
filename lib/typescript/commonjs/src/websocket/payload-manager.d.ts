/**
 * WebSocket Payload Manager
 *
 * This module provides a high-level interface for generating and sending
 * exchange method payloads via WebSocket POST requests. It integrates with
 * the dynamic payload generator and WebSocket subscriptions.
 */
import { ethers } from 'ethers';
import { WebSocketSubscriptions } from './subscriptions';
import { CustomOperations } from '../rest/custom';
import { SymbolConversion } from '../utils/symbolConversion';
import type { TriggerOrderTypeWire } from '../types';
export interface PayloadManagerConfig {
    wallet: ethers.Wallet;
    isMainnet: boolean;
    symbolConversion: SymbolConversion;
    subscriptions: WebSocketSubscriptions;
    vaultAddress?: string | null;
    generateNonce: () => number;
    customOperations: CustomOperations;
}
/**
 * WebSocket Payload Manager
 * Provides a unified interface for all exchange operations via WebSocket POST
 */
export declare class WebSocketPayloadManager {
    private payloadGenerator;
    private subscriptions;
    private symbolConversion;
    private vaultAddress;
    private customOperations;
    constructor(config: PayloadManagerConfig);
    /**
     * Get asset index for a coin symbol
     */
    private getAssetIndex;
    /**
     * Execute any exchange method via WebSocket POST
     * @param methodName The exchange method name
     * @param params The method parameters
     * @param timeout Optional timeout in milliseconds
     * @returns The response from the WebSocket POST request
     */
    executeMethod(methodName: string, params: any, timeout?: number): Promise<any>;
    /**
     * Place an order via WebSocket POST
     */
    placeOrder(orderParams: {
        coin: string;
        is_buy: boolean;
        sz: string | number;
        limit_px: string | number;
        order_type: any;
        reduce_only: boolean;
        cloid?: string;
    }): Promise<any>;
    /**
     * Place multiple orders via WebSocket POST
     */
    placeOrders(orders: any[], grouping?: string): Promise<any>;
    /**
     * Cancel an order via WebSocket POST
     */
    cancelOrder(cancelParams: {
        coin: string;
        o: number | string;
    }): Promise<any>;
    /**
     * Cancel multiple orders via WebSocket POST
     */
    cancelOrders(cancels: any[]): Promise<any>;
    /**
     * Cancel all orders via WebSocket POST
     * This is a custom composite operation that uses native methods
     */
    cancelAllOrders(): Promise<any>;
    /**
     * Modify an order via WebSocket POST
     */
    modifyOrder(modifyParams: {
        oid: number | string;
        order: any;
    }): Promise<any>;
    /**
     * Transfer between spot and perp wallets via WebSocket POST
     */
    transferBetweenSpotAndPerp(amount: number, toPerp: boolean): Promise<any>;
    /**
     * Transfer USDC to another address via WebSocket POST
     */
    usdTransfer(destination: string, amount: number): Promise<any>;
    /**
     * Transfer spot tokens to another address via WebSocket POST
     */
    spotTransfer(destination: string, token: string, amount: string): Promise<any>;
    /**
     * Transfer to/from vault via WebSocket POST
     */
    vaultTransfer(vaultAddress: string, isDeposit: boolean, usd: number): Promise<any>;
    /**
     * Approve an agent via WebSocket POST
     */
    approveAgent(agentAddress: string, agentName: string): Promise<any>;
    /**
     * Approve builder fee via WebSocket POST
     */
    approveBuilderFee(builder: string, maxFeeRate: string): Promise<any>;
    /**
     * Initiate withdrawal via WebSocket POST
     */
    initiateWithdrawal(destination: string, amount: number): Promise<any>;
    /**
     * Place TWAP order via WebSocket POST
     */
    placeTwapOrder(twapParams: {
        coin: string;
        is_buy: boolean;
        sz: number;
        reduce_only: boolean;
        minutes: number;
        randomize: boolean;
    }): Promise<any>;
    /**
     * Schedule cancel via WebSocket POST
     */
    scheduleCancel(time: number | null): Promise<any>;
    /**
     * Deposit into staking via WebSocket POST
     */
    cDeposit(wei: bigint): Promise<any>;
    /**
     * Withdraw from staking via WebSocket POST
     */
    cWithdraw(wei: bigint): Promise<any>;
    /**
     * Delegate/Undelegate for staking via WebSocket POST
     */
    tokenDelegate(wei: bigint, validator: string, isUndelegate: boolean): Promise<any>;
    /**
     * Market buy/sell via WebSocket POST
     * This is a custom composite operation that uses native methods
     */
    marketOpen(symbol: string, isBuy: boolean, size: number, px?: number, triggers?: TriggerOrderTypeWire[], slippage?: number): Promise<any>;
    /**
     * Market close position via WebSocket POST
     * This is a custom composite operation that uses native methods
     */
    marketClose(symbol: string, size?: number, px?: number, slippage?: number, cloid?: string): Promise<any>;
    /**
     * Close all positions via WebSocket POST
     * This is a custom composite operation that uses native methods
     */
    closeAllPositions(slippage?: number): Promise<any>;
    /**
     * Get all available exchange methods
     */
    getAvailableMethods(): string[];
    /**
     * Check if a method is supported
     */
    isMethodSupported(methodName: string): boolean;
    /**
     * Execute a custom method with raw parameters
     * Useful for methods not yet wrapped in convenience functions
     */
    executeCustomMethod(methodName: string, params: any, timeout?: number): Promise<any>;
    /**
     * Generate payload without executing (for testing/debugging)
     */
    generatePayload(methodName: string, params: any): Promise<any>;
    /**
     * Update vault address
     */
    setVaultAddress(vaultAddress: string | null): void;
    /**
     * Get current vault address
     */
    getVaultAddress(): string | null;
}
/**
 * Factory function to create a WebSocket Payload Manager
 */
export declare function createWebSocketPayloadManager(config: PayloadManagerConfig): WebSocketPayloadManager;
//# sourceMappingURL=payload-manager.d.ts.map