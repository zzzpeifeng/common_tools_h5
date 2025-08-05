
import { defineStore } from 'pinia';
import {MerchantState} from "@/store/interfaces";
import { ref } from 'vue';
import piniaPersistConfig from "@/store/piniaPersist";

export const useMerchantStore = defineStore('merchantInfo',{
    state: () => {
        return {
            token: ref(''),
            merchant: {
                name: '',
                email: '',
                phone: '',
                address: '',
            } as MerchantState,
            }
        },
    getters: {
        getToken: (state) => state.token,
        getMerchant: (state) => state.merchant,
    },
    actions: {
        setMerchantToken(token: string){
            console.log('token',token);
            this.token = token;
        },

        setMerchantInfo(merchant: MerchantState){
            console.log('merchant',merchant)
            this.merchant = merchant;
        }
    },
    persist: [
        piniaPersistConfig('merchantInfo')
    ]
})