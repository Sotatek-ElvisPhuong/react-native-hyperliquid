import { HttpApi } from '../../utils/helpers';
import { SymbolConversion } from '../../utils/symbolConversion';
import { Hyperliquid } from '../../index';
import type { ClearinghouseState, FundingHistory, Meta, MetaAndAssetCtxs, PerpDexLimits, PerpsAtOpenInterestCap, PredictedFundings, UserFunding, UserNonFundingLedgerUpdates } from '../../types';
export declare class PerpetualsInfoAPI {
    private httpApi;
    private symbolConversion;
    private parent;
    constructor(httpApi: HttpApi, symbolConversion: SymbolConversion, parent: Hyperliquid);
    getMeta(rawResponse?: boolean): Promise<Meta>;
    getMetaAndAssetCtxs(rawResponse?: boolean): Promise<MetaAndAssetCtxs>;
    getClearinghouseState(user: string, rawResponse?: boolean): Promise<ClearinghouseState>;
    getUserFunding(user: string, startTime: number, endTime?: number, rawResponse?: boolean): Promise<UserFunding>;
    getUserNonFundingLedgerUpdates(user: string, startTime: number, endTime?: number, rawResponse?: boolean): Promise<UserNonFundingLedgerUpdates>;
    getFundingHistory(coin: string, startTime: number, endTime?: number, rawResponse?: boolean): Promise<FundingHistory>;
    getPredictedFundings(rawResponse?: boolean): Promise<PredictedFundings>;
    getPerpsAtOpenInterestCap(rawResponse?: boolean): Promise<PerpsAtOpenInterestCap>;
    getPerpDexLimits(dex: string, rawResponse?: boolean): Promise<PerpDexLimits>;
}
//# sourceMappingURL=perpetuals.d.ts.map