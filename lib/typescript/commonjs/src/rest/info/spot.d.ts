import { HttpApi } from '../../utils/helpers';
import { SymbolConversion } from '../../utils/symbolConversion';
import type { SpotClearinghouseState, SpotMeta, SpotMetaAndAssetCtxs } from '../../types';
export declare class SpotInfoAPI {
    private httpApi;
    private symbolConversion;
    constructor(httpApi: HttpApi, symbolConversion: SymbolConversion);
    getSpotMeta(rawResponse?: boolean): Promise<SpotMeta>;
    getSpotClearinghouseState(user: string, rawResponse?: boolean): Promise<SpotClearinghouseState>;
    getSpotMetaAndAssetCtxs(rawResponse?: boolean): Promise<SpotMetaAndAssetCtxs>;
    getTokenDetails(tokenId: string, rawResponse?: boolean): Promise<any>;
    getSpotDeployState(user: string, rawResponse?: boolean): Promise<any>;
}
//# sourceMappingURL=spot.d.ts.map