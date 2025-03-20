'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { SuinsClient, SuinsTransaction } from '@mysten/suins';
import { MIST_PER_SUI } from '@mysten/sui/utils';
import { coinWithBalance, Transaction } from "@mysten/sui/transactions";

interface SuiContextType {
    registerName: (name: string, years: 1 | 2 | 3 | 4 | 5) => Promise<any>;
}

const SuiContext = createContext<SuiContextType | undefined>(undefined);

export const SuiNsProvider = ({ children }: { children: ReactNode }) => {
    const client = useSuiClient();
    const account = useCurrentAccount();
    const suinsClient = new SuinsClient({ client, network: 'testnet' });
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();    

    const registerName = async (name: string, years: 1 | 2 | 3 | 4 | 5) => {
        if (!account) throw new Error('No account connected');
        if (name.length < 3 || name.length > 12 || !/^[a-zA-Z0-9]*$/.test(name)) {
            throw new Error('Invalid name: Must be 3-12 alphanumeric characters.');
        }

        try {
            const tx = new Transaction();
            const coinConfig = suinsClient.config.coins['SUI'];
            const priceInfoObjectId = coinConfig !== suinsClient.config.coins.USDC
                ? (await suinsClient.getPriceInfoObject(tx as any, coinConfig.feed))[0]
                : null;

            const suinsTx = new SuinsTransaction(suinsClient, tx);
            const [coin] = suinsTx.transaction.splitCoins(suinsTx.transaction.gas, [coinWithBalance({balance: 5n * MIST_PER_SUI})]);



            const nft = suinsTx.register({
                domain: `${name}.sui`,
                years,
                coinConfig,
                coin,
                priceInfoObjectId,
            });

            suinsTx.setTargetAddress({ nft, address: account.address });
            suinsTx.transaction.transferObjects([nft], account.address);

            return await signAndExecute({ transaction: suinsTx.transaction });
        } catch (e) {
            console.error('Error registering name:', e);
            throw e;
        }
    };

    return <SuiContext.Provider value={{ registerName }}>{children}</SuiContext.Provider>;
};

export const useSuiNs = () => {
    const context = useContext(SuiContext);
    if (!context) {
      console.warn("Warning: useSuiNs is being used outside of SuiNsProvider.");
      return { registerName: async () => {} }; 
    }
    return context;
  };
  
