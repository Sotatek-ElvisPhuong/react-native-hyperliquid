/**
 * Dynamic payload generator for WebSocket POST requests
 *
 * This module provides a unified way to generate signed payloads for all exchange methods
 * without hardcoding each method in the exchange.ts file. It dynamically creates payloads
 * based on method configurations and handles signing automatically.
 */
import { ethers } from 'ethers';
import { ExchangeType } from '../types/constants';
export interface PayloadMethodConfig {
    /** Exchange method type */
    type: ExchangeType;
    /** Signing method to use */
    signingMethod: 'l1Action' | 'userSignedAction' | 'agent' | 'usdTransfer';
    /** For userSignedAction: the types array for EIP-712 signing */
    signatureTypes?: Array<{
        name: string;
        type: string;
    }>;
    /** For userSignedAction: the primary type name */
    primaryType?: string;
    /** Whether this method requires asset index conversion */
    requiresAssetIndex?: boolean;
    /** Whether this method requires vault address */
    requiresVaultAddress?: boolean;
    /** Custom payload transformer function */
    payloadTransformer?: (params: any, context: PayloadGenerationContext) => any | Promise<any>;
    /** Whether to include hyperliquidChain and signatureChainId */
    includeChainInfo?: boolean;
}
export interface PayloadGenerationContext {
    isMainnet: boolean;
    generateNonce: () => number;
    getAssetIndex: (coin: string) => Promise<number>;
    getVaultAddress: () => string | null;
    wallet: ethers.Wallet;
}
/**
 * Configuration for all exchange methods
 */
export declare const EXCHANGE_METHOD_CONFIGS: Record<string, PayloadMethodConfig>;
/**
 * Dynamic payload generator class
 */
export declare class PayloadGenerator {
    private context;
    constructor(context: PayloadGenerationContext);
    /**
     * Generate a signed payload for any exchange method
     * @param methodName The name of the exchange method
     * @param params The parameters for the method
     * @returns A signed payload ready for WebSocket POST
     */
    generatePayload(methodName: string, params: any): Promise<any>;
    /**
     * Get available exchange methods
     */
    getAvailableMethods(): string[];
    /**
     * Check if a method is supported
     */
    isMethodSupported(methodName: string): boolean;
}
//# sourceMappingURL=payload-generator.d.ts.map