import http, { Response } from '@/utils/http';
import {MerchantInfo} from "@/api/user";

export interface OfflineStoreListResponse {
    accessToken: string;
    merchantInfo: MerchantInfo;
}

const OfflineStoreApi = {
    async getOfflineStoreListByMerchant(): Promise<Response<any>>{
        return await http.get<Response<OfflineStoreListResponse>>('/offline-store/offline-store-by-merchant',);
    }
}

export default OfflineStoreApi;